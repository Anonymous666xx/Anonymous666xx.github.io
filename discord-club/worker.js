// Discord Club - Cloudflare Worker
// Requires KV namespaces: DISCORD_CLUB_KV
// Requires R2 bucket: DISCORD_CLUB_R2

var CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400'
};

var JWT_SECRET = 'discord-club-jwt-secret-change-me'; // CHANGE THIS in production

addEventListener('fetch', function(event) {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response('', { status: 204, headers: CORS_HEADERS });
  }

  var url = new URL(request.url);
  var path = url.pathname;

  try {
    // WebSocket upgrade
    if (path === '/ws') {
      return handleWebSocket(request);
    }

    // Auth
    if (path === '/api/register' && request.method === 'POST') return handleRegister(request);
    if (path === '/api/login' && request.method === 'POST') return handleLogin(request);
    if (path === '/api/me' && request.method === 'GET') return handleMe(request);

    // Profile
    if (path === '/api/profile' && request.method === 'PUT') return handleUpdateProfile(request);

    // Messages
    if (path.match(/^\/api\/channels\/([^\/]+)\/messages$/)) {
      var channelMatch = path.match(/^\/api\/channels\/([^\/]+)\/messages$/);
      if (request.method === 'GET') return handleGetMessages(request, channelMatch[1]);
      if (request.method === 'POST') return handleSendMessage(request, channelMatch[1]);
    }

    // Friends
    if (path === '/api/friends' && request.method === 'GET') return handleGetFriends(request);
    if (path === '/api/friends/request' && request.method === 'POST') return handleFriendRequest(request);
    if (path === '/api/friends/accept' && request.method === 'POST') return handleAcceptFriend(request);
    if (path === '/api/friends/reject' && request.method === 'POST') return handleRejectFriend(request);
    if (path === '/api/friends/requests' && request.method === 'GET') return handleGetPendingRequests(request);
    if (path.match(/^\/api\/friends\/([^\/]+)$/) && request.method === 'DELETE') {
      var friendMatch = path.match(/^\/api\/friends\/([^\/]+)$/);
      return handleRemoveFriend(request, friendMatch[1]);
    }

    // File upload
    if (path === '/api/upload' && request.method === 'POST') return handleUpload(request);

    return jsonResponse({ error: 'Not found' }, 404);
  } catch(e) {
    return jsonResponse({ error: e.message || 'Internal error' }, 500);
  }
}

// ==================== JWT ====================
async function createToken(user) {
  var header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  var payload = btoa(JSON.stringify({ sub: user.id, username: user.username, iat: Math.floor(Date.now()/1000), exp: Math.floor(Date.now()/1000) + 86400 * 7 }));
  var data = header + '.' + payload;
  var key = await crypto.subtle.importKey('raw', new TextEncoder().encode(JWT_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  var sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  var signature = btoa(String.fromCharCode.apply(null, new Uint8Array(sig)));
  return data + '.' + signature;
}

async function verifyToken(token) {
  try {
    var parts = token.split('.');
    if (parts.length !== 3) return null;
    var key = await crypto.subtle.importKey('raw', new TextEncoder().encode(JWT_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    var valid = await crypto.subtle.verify('HMAC', key, Uint8Array.from(atob(parts[2]), function(c) { return c.charCodeAt(0); }), new TextEncoder().encode(parts[0] + '.' + parts[1]));
    if (!valid) return null;
    var payload = JSON.parse(atob(parts[1]));
    if (payload.exp < Math.floor(Date.now()/1000)) return null;
    return payload;
  } catch(e) { return null; }
}

// ==================== AUTH HANDLERS ====================
async function handleRegister(request) {
  var body = await request.json();
  var username = (body.username || '').trim().toLowerCase();
  var password = body.password || '';

  if (!username || username.length < 2) return jsonResponse({ error: 'Username must be at least 2 characters.' }, 400);
  if (!password || password.length < 4) return jsonResponse({ error: 'Password must be at least 4 characters.' }, 400);

  var existing = await DISCORD_CLUB_KV.get('users:' + username);
  if (existing) return jsonResponse({ error: 'Username already taken.' }, 409);

  var userId = crypto.randomUUID();
  var passwordHash = await hashPassword(password);
  var user = { id: userId, username: username, displayName: username, bio: '', passwordHash: passwordHash, createdAt: Date.now() };

  await DISCORD_CLUB_KV.put('users:' + username, JSON.stringify(user));
  await DISCORD_CLUB_KV.put('users:byId:' + userId, username);

  var token = await createToken(user);
  return jsonResponse({ token: token, user: stripSensitive(user) });
}

async function handleLogin(request) {
  var body = await request.json();
  var username = (body.username || '').trim().toLowerCase();
  var password = body.password || '';

  var data = await DISCORD_CLUB_KV.get('users:' + username);
  if (!data) return jsonResponse({ error: 'Invalid username or password.' }, 401);

  var user = JSON.parse(data);
  var valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return jsonResponse({ error: 'Invalid username or password.' }, 401);

  var token = await createToken(user);
  return jsonResponse({ token: token, user: stripSensitive(user) });
}

async function handleMe(request) {
  var user = await authenticate(request);
  if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);
  return jsonResponse({ user: user });
}

async function handleUpdateProfile(request) {
  var user = await authenticate(request);
  if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);

  var body = await request.json();
  if (body.displayName) user.displayName = body.displayName;
  if (body.bio !== undefined) user.bio = body.bio;

  await DISCORD_CLUB_KV.put('users:' + user.username, JSON.stringify(user));
  return jsonResponse({ user: stripSensitive(user) });
}

// ==================== MESSAGE HANDLERS ====================
async function handleGetMessages(request, channelId) {
  var user = await authenticate(request);
  if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);

  var data = await DISCORD_CLUB_KV.get('messages:' + channelId);
  var messages = data ? JSON.parse(data) : [];
  // Return last 100 messages
  return jsonResponse(messages.slice(-100));
}

async function handleSendMessage(request, channelId) {
  var user = await authenticate(request);
  if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);

  var body = await request.json();
  var content = (body.content || '').trim();
  if (!content) return jsonResponse({ error: 'Message cannot be empty.' }, 400);

  var data = await DISCORD_CLUB_KV.get('messages:' + channelId);
  var messages = data ? JSON.parse(data) : [];

  var msg = {
    id: crypto.randomUUID(),
    author: user.displayName || user.username,
    authorId: user.id,
    content: content,
    channel: channelId,
    timestamp: Date.now()
  };

  messages.push(msg);
  await DISCORD_CLUB_KV.put('messages:' + channelId, JSON.stringify(messages));

  // Broadcast to WebSocket clients in this channel
  broadcast({ type: 'message', channel: channelId, id: msg.id, author: msg.author, content: msg.content, timestamp: msg.timestamp });

  return jsonResponse(msg);
}

// ==================== FRIEND HANDLERS ====================
async function handleGetFriends(request) {
  var user = await authenticate(request);
  if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);

  var data = await DISCORD_CLUB_KV.get('friends:' + user.id);
  var friends = data ? JSON.parse(data) : [];
  var accepted = friends.filter(function(f) { return f.status === 'accepted'; });

  // Enrich with display names
  var enriched = [];
  for (var i = 0; i < accepted.length; i++) {
    var friendData = await DISCORD_CLUB_KV.get('users:byId:' + accepted[i].friendId);
    if (friendData) {
      var fu = await DISCORD_CLUB_KV.get('users:' + friendData);
      if (fu) {
        var fuj = JSON.parse(fu);
        enriched.push({ id: accepted[i].friendId, username: fuj.username, displayName: fuj.displayName });
      }
    }
  }
  return jsonResponse(enriched);
}

async function handleGetPendingRequests(request) {
  var user = await authenticate(request);
  if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);

  var data = await DISCORD_CLUB_KV.get('friends:' + user.id);
  var friends = data ? JSON.parse(data) : [];
  var pending = friends.filter(function(f) { return f.status === 'pending'; });

  var enriched = [];
  for (var i = 0; i < pending.length; i++) {
    var friendData = await DISCORD_CLUB_KV.get('users:byId:' + pending[i].friendId);
    if (friendData) {
      var fu = await DISCORD_CLUB_KV.get('users:' + friendData);
      if (fu) {
        var fuj = JSON.parse(fu);
        enriched.push({ id: pending[i].friendId, username: fuj.username, displayName: fuj.displayName });
      }
    }
  }
  return jsonResponse(enriched);
}

async function handleFriendRequest(request) {
  var user = await authenticate(request);
  if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);

  var body = await request.json();
  var targetUsername = (body.username || '').trim().toLowerCase();
  if (!targetUsername) return jsonResponse({ error: 'Username required.' }, 400);
  if (targetUsername === user.username) return jsonResponse({ error: 'Cannot add yourself.' }, 400);

  var targetData = await DISCORD_CLUB_KV.get('users:' + targetUsername);
  if (!targetData) return jsonResponse({ error: 'User not found.' }, 404);

  var target = JSON.parse(targetData);

  // Add to sender's list
  var senderData = await DISCORD_CLUB_KV.get('friends:' + user.id);
  var senderFriends = senderData ? JSON.parse(senderData) : [];
  senderFriends.push({ friendId: target.id, status: 'requested', createdAt: Date.now() });
  await DISCORD_CLUB_KV.put('friends:' + user.id, JSON.stringify(senderFriends));

  // Add to recipient's list as pending
  var recipientData = await DISCORD_CLUB_KV.get('friends:' + target.id);
  var recipientFriends = recipientData ? JSON.parse(recipientData) : [];
  recipientFriends.push({ friendId: user.id, status: 'pending', createdAt: Date.now() });
  await DISCORD_CLUB_KV.put('friends:' + target.id, JSON.stringify(recipientFriends));

  // Notify recipient if online
  sendToUser(target.id, { type: 'friend_request', from: user.displayName || user.username, fromId: user.id });

  return jsonResponse({ success: true });
}

async function handleAcceptFriend(request) {
  var user = await authenticate(request);
  if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);

  var body = await request.json();
  var requesterId = body.id;

  // Update recipient's friend status
  var recipientData = await DISCORD_CLUB_KV.get('friends:' + user.id);
  var recipientFriends = recipientData ? JSON.parse(recipientData) : [];
  for (var i = 0; i < recipientFriends.length; i++) {
    if (recipientFriends[i].friendId === requesterId && recipientFriends[i].status === 'pending') {
      recipientFriends[i].status = 'accepted';
    }
  }
  await DISCORD_CLUB_KV.put('friends:' + user.id, JSON.stringify(recipientFriends));

  // Update requester's friend status
  var requesterData = await DISCORD_CLUB_KV.get('friends:' + requesterId);
  var requesterFriends = requesterData ? JSON.parse(requesterData) : [];
  for (var j = 0; j < requesterFriends.length; j++) {
    if (requesterFriends[j].friendId === user.id && requesterFriends[j].status === 'requested') {
      requesterFriends[j].status = 'accepted';
    }
  }
  await DISCORD_CLUB_KV.put('friends:' + requesterId, JSON.stringify(requesterFriends));

  sendToUser(requesterId, { type: 'friend_accepted', from: user.displayName || user.username });

  return jsonResponse({ success: true });
}

async function handleRejectFriend(request) {
  var user = await authenticate(request);
  if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);

  var body = await request.json();
  var requesterId = body.id;

  // Remove from recipient's list
  var recipientData = await DISCORD_CLUB_KV.get('friends:' + user.id);
  var recipientFriends = recipientData ? JSON.parse(recipientData) : [];
  recipientFriends = recipientFriends.filter(function(f) { return f.friendId !== requesterId; });
  await DISCORD_CLUB_KV.put('friends:' + user.id, JSON.stringify(recipientFriends));

  // Remove from requester's list
  var requesterData = await DISCORD_CLUB_KV.get('friends:' + requesterId);
  var requesterFriends = requesterData ? JSON.parse(requesterData) : [];
  requesterFriends = requesterFriends.filter(function(f) { return f.friendId !== user.id; });
  await DISCORD_CLUB_KV.put('friends:' + requesterId, JSON.stringify(requesterFriends));

  return jsonResponse({ success: true });
}

async function handleRemoveFriend(request, friendId) {
  var user = await authenticate(request);
  if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);

  // Remove from user's list
  var userData = await DISCORD_CLUB_KV.get('friends:' + user.id);
  var userFriends = userData ? JSON.parse(userData) : [];
  userFriends = userFriends.filter(function(f) { return f.friendId !== friendId; });
  await DISCORD_CLUB_KV.put('friends:' + user.id, JSON.stringify(userFriends));

  // Remove from friend's list
  var friendData = await DISCORD_CLUB_KV.get('friends:' + friendId);
  var friendFriends = friendData ? JSON.parse(friendData) : [];
  friendFriends = friendFriends.filter(function(f) { return f.friendId !== user.id; });
  await DISCORD_CLUB_KV.put('friends:' + friendId, JSON.stringify(friendFriends));

  sendToUser(friendId, { type: 'friend_removed', by: user.id });

  return jsonResponse({ success: true });
}

// ==================== FILE UPLOAD ====================
async function handleUpload(request) {
  var user = await authenticate(request);
  if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);

  var formData = await request.formData();
  var file = formData.get('file');
  if (!file) return jsonResponse({ error: 'No file provided.' }, 400);

  var key = 'uploads/' + crypto.randomUUID() + '-' + file.name;
  await DISCORD_CLUB_R2.put(key, file.body, { httpMetadata: { contentType: file.type } });

  var publicUrl = request.url.replace('/api/upload', '/files/' + key);
  return jsonResponse({ url: publicUrl, key: key });
}

// ==================== WEBSOCKET ====================
var sessions = {};

function handleWebSocket(request) {
  var url = new URL(request.url);
  var token = url.searchParams.get('token');
  if (!token) return new Response('Unauthorized', { status: 401 });

  var pair = new WebSocketPair();
  var client = pair[1];

  // We'll verify after opening
  acceptWebSocket(client);

  (async function() {
    try {
      var payload = await verifyToken(token);
      if (!payload) { client.close(4001, 'Invalid token'); return; }

      var userId = payload.sub;
      var userData = await DISCORD_CLUB_KV.get('users:byId:' + userId);
      var user = userData ? JSON.parse(await DISCORD_CLUB_KV.get('users:' + userData)) : null;
      if (!user) { client.close(4001, 'User not found'); return; }

      sessions[userId] = { ws: client, username: user.displayName || user.username };
      broadcast({ type: 'presence', userId: userId, username: user.displayName || user.username, online: true });

      client.addEventListener('message', function(e) {
        try {
          var msg = JSON.parse(e.data);
          if (msg.type === 'call_offer' && msg.to) {
            msg.from = userId;
            msg.fromName = user.displayName || user.username;
            sendToUser(msg.to, msg);
          } else if (msg.type === 'call_answer' && msg.to) {
            msg.from = userId;
            sendToUser(msg.to, msg);
          } else if (msg.type === 'call_ice' && msg.to) {
            msg.from = userId;
            sendToUser(msg.to, msg);
          } else if (msg.type === 'call_end' && msg.to) {
            msg.from = userId;
            sendToUser(msg.to, msg);
          }
        } catch(ex) {}
      });

      client.addEventListener('close', function() {
        delete sessions[userId];
        broadcast({ type: 'presence', userId: userId, online: false });
      });
    } catch(e) {
      client.close(4001, 'Invalid token');
    }
  })();

  return new Response(null, { status: 101, webSocket: pair[0] });
}

function sendToUser(userId, data) {
  var session = sessions[userId];
  if (session && session.ws.readyState === 1) {
    session.ws.send(JSON.stringify(data));
  }
}

function broadcast(data) {
  for (var id in sessions) {
    if (sessions[id].ws.readyState === 1) {
      sessions[id].ws.send(JSON.stringify(data));
    }
  }
}

// ==================== HELPERS ====================
async function authenticate(request) {
  var auth = request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  var token = auth.slice(7);
  var payload = await verifyToken(token);
  if (!payload) return null;
  var userData = await DISCORD_CLUB_KV.get('users:' + payload.username);
  if (!userData) return null;
  var user = JSON.parse(userData);
  return stripSensitive(user);
}

function stripSensitive(user) {
  return { id: user.id, username: user.username, displayName: user.displayName, bio: user.bio, createdAt: user.createdAt };
}

async function hashPassword(password) {
  var encoder = new TextEncoder();
  var data = encoder.encode(password + 'discord-club-salt');
  var hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(hash)));
}

async function verifyPassword(password, hash) {
  var computed = await hashPassword(password);
  return computed === hash;
}

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
  });
}

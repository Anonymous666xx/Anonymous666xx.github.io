const CITIES = [
  { name: 'New York',      tz: 'America/New_York',        lat: 40.7128,  lon: -74.0060,    icon: '🗽' },
  { name: 'London',        tz: 'Europe/London',           lat: 51.5074,  lon: -0.1278,     icon: '🇬🇧' },
  { name: 'Paris',         tz: 'Europe/Paris',            lat: 48.8566,  lon: 2.3522,      icon: '🇫🇷' },
  { name: 'Berlin',        tz: 'Europe/Berlin',           lat: 52.5200,  lon: 13.4050,     icon: '🇩🇪' },
  { name: 'Moscow',        tz: 'Europe/Moscow',           lat: 55.7558,  lon: 37.6173,     icon: '🇷🇺' },
  { name: 'Dubai',         tz: 'Asia/Dubai',              lat: 25.2048,  lon: 55.2708,     icon: '🇦🇪' },
  { name: 'Mumbai',        tz: 'Asia/Kolkata',            lat: 19.0760,  lon: 72.8777,     icon: '🇮🇳' },
  { name: 'Singapore',     tz: 'Asia/Singapore',          lat: 1.3521,   lon: 103.8198,    icon: '🇸🇬' },
  { name: 'Tokyo',         tz: 'Asia/Tokyo',              lat: 35.6762,  lon: 139.6503,    icon: '🇯🇵' },
  { name: 'Seoul',         tz: 'Asia/Seoul',              lat: 37.5665,  lon: 126.9780,    icon: '🇰🇷' },
  { name: 'Shanghai',      tz: 'Asia/Shanghai',           lat: 31.2304,  lon: 121.4737,    icon: '🇨🇳' },
  { name: 'Sydney',        tz: 'Australia/Sydney',        lat: -33.8688, lon: 151.2093,    icon: '🇦🇺' },
  { name: 'San Francisco', tz: 'America/Los_Angeles',     lat: 37.7749,  lon: -122.4194,   icon: '🌉' },
  { name: 'Chicago',       tz: 'America/Chicago',         lat: 41.8781,  lon: -87.6298,    icon: '🏙' },
  { name: 'Toronto',       tz: 'America/Toronto',         lat: 43.6532,  lon: -79.3832,    icon: '🇨🇦' },
  { name: 'São Paulo',     tz: 'America/Sao_Paulo',       lat: -23.5505, lon: -46.6333,    icon: '🇧🇷' },
  { name: 'Mexico City',   tz: 'America/Mexico_City',     lat: 19.4326,  lon: -99.1332,    icon: '🇲🇽' },
  { name: 'Cairo',         tz: 'Africa/Cairo',            lat: 30.0444,  lon: 31.2357,     icon: '🇪🇬' },
  { name: 'Istanbul',      tz: 'Europe/Istanbul',         lat: 41.0082,  lon: 28.9784,     icon: '🇹🇷' },
  { name: 'Lagos',         tz: 'Africa/Lagos',            lat: 6.5244,   lon: 3.3792,      icon: '🇳🇬' },
];

const CURRENCIES = [
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
  { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },
  { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱' },
  { code: 'CZK', name: 'Czech Koruna', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', flag: '🇭🇺' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
  { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦' },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
  { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬' },
  { code: 'SYP', name: 'Syrian Pound', flag: '🇸🇾' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { code: 'THB', name: 'Thai Baht', flag: '🇹🇭' },
  { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾' },
];

const TZ_DATA = {
  'America/New_York':      { s: '-05:00', a: 'EST', d: '-04:00', b: 'EDT' },
  'America/Chicago':       { s: '-06:00', a: 'CST', d: '-05:00', b: 'CDT' },
  'America/Toronto':       { s: '-05:00', a: 'EST', d: '-04:00', b: 'EDT' },
  'America/Los_Angeles':   { s: '-08:00', a: 'PST', d: '-07:00', b: 'PDT' },
  'America/Mexico_City':   { s: '-06:00', a: 'CST', d: '-05:00', b: 'CDT' },
  'America/Sao_Paulo':     { s: '-03:00', a: 'BRT' },
  'Europe/London':         { s: '+00:00', a: 'GMT', d: '+01:00', b: 'BST' },
  'Europe/Paris':          { s: '+01:00', a: 'CET', d: '+02:00', b: 'CEST' },
  'Europe/Berlin':         { s: '+01:00', a: 'CET', d: '+02:00', b: 'CEST' },
  'Europe/Moscow':         { s: '+03:00', a: 'MSK' },
  'Europe/Istanbul':       { s: '+03:00', a: 'TRT' },
  'Asia/Dubai':            { s: '+04:00', a: 'GST' },
  'Asia/Kolkata':          { s: '+05:30', a: 'IST' },
  'Asia/Singapore':        { s: '+08:00', a: 'SGT' },
  'Asia/Shanghai':         { s: '+08:00', a: 'CST' },
  'Asia/Tokyo':            { s: '+09:00', a: 'JST' },
  'Asia/Seoul':            { s: '+09:00', a: 'KST' },
  'Australia/Sydney':      { s: '+10:00', a: 'AEST', d: '+11:00', b: 'AEDT' },
  'Africa/Cairo':          { s: '+02:00', a: 'EET' },
  'Africa/Lagos':          { s: '+01:00', a: 'WAT' },
};

const DST_N = ['America/New_York','America/Chicago','America/Toronto','America/Los_Angeles','America/Mexico_City','Europe/London','Europe/Paris','Europe/Berlin'];
const DST_S = ['Australia/Sydney'];
const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const D = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAYS_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

let clockState = [];
let tickTimer = null;
let ratesData = null;

function isDST(tz) {
  const mo = new Date().getMonth();
  if (DST_N.includes(tz)) return mo >= 2 && mo <= 9;
  if (DST_S.includes(tz)) return mo <= 2 || mo >= 9;
  return false;
}

function getOffset(tz) {
  const info = TZ_DATA[tz];
  if (!info) return '+00:00';
  return info.d && isDST(tz) ? info.d : info.s;
}

function getAbbr(tz) {
  const info = TZ_DATA[tz];
  if (!info) return '';
  return info.b && isDST(tz) ? info.b : info.a;
}

function offToMin(str) {
  if (!str) return 0;
  var sign = str[0] === '-' ? -1 : 1;
  var p = str.replace('+','').split(':');
  return sign * (parseInt(p[0])*60 + parseInt(p[1]||'0'));
}

function timeStatus(h) {
  if (h >= 5 && h < 12) return { l: 'Morning', c: 'day' };
  if (h >= 12 && h < 18) return { l: 'Afternoon', c: 'day' };
  if (h >= 18 && h < 22) return { l: 'Evening', c: 'evening' };
  return { l: 'Night', c: 'night' };
}

function wmoEmoji(c) {
  if (c===0) return '☀️';
  if (c<=3) return '🌤';
  if (c<=20) return '🌫';
  if (c<=30) return '⛅';
  if (c<=40) return '🌦';
  if (c<=50) return '🌧';
  if (c<=60) return '🌧';
  if (c<=70) return '❄️';
  if (c<=80) return '🌦';
  if (c<=90) return '⛈';
  return '🌡';
}

function wmoDesc(c) {
  if (c===0) return 'Clear';
  if (c<=3) return 'Cloudy';
  if (c<=20) return 'Fog';
  if (c<=30) return 'Cloudy';
  if (c<=40) return 'Light Rain';
  if (c<=50) return 'Rain';
  if (c<=60) return 'Heavy Rain';
  if (c<=70) return 'Snow';
  if (c<=80) return 'Showers';
  if (c<=90) return 'Storm';
  return 'Unknown';
}

function fmt(n,d) {
  return n.toLocaleString(undefined,{minimumFractionDigits:d||2,maximumFractionDigits:d||2});
}

function fmtShort(n) {
  if (n >= 1e12) return (n/1e12).toFixed(1)+'T';
  if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
  if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
  if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
  return fmt(n,2);
}

function upd() {
  var el = document.getElementById('lastUpdated');
  if (el) el.textContent = new Date().toLocaleTimeString();
}

document.getElementById('tabBar').addEventListener('click', function(e) {
  var btn = e.target.closest('.tab-btn');
  if (!btn) return;
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(function(t) { t.classList.remove('active'); });
  var tab = document.getElementById('tab-'+btn.dataset.tab);
  if (tab) tab.classList.add('active');
});

// ===== CLOCK =====
async function initClock() {
  try {
    var res = await fetch('https://worldtimeapi.org/api/timezone/America/New_York');
    if (!res.ok) throw Error();
    var ref = await res.json();
    var refOff = ref.utc_offset || '-05:00';
    var refNow = new Date(ref.datetime);
    clockState = CITIES.map(function(c) {
      var o = getOffset(c.tz);
      var diff = offToMin(o) - offToMin(refOff);
      var cd = new Date(refNow.getTime() + diff*60000);
      return { n: c.name, t: c.tz, i: c.icon, bt: cd.getTime(), bc: Date.now(), o: o, a: getAbbr(c.tz) };
    });
    buildClock();
    startTick();
  } catch(e) {
    clockState = CITIES.map(function(c) {
      return { n: c.name, t: c.tz, i: c.icon, o: getOffset(c.tz), a: getAbbr(c.tz) };
    });
    buildClock();
    startTick();
  }
}

function getCT(s) {
  if (s.bt != null && s.bc != null) return new Date(s.bt + (Date.now()-s.bc));
  var n = new Date();
  return new Date(n.getTime() + n.getTimezoneOffset()*60000 + offToMin(s.o)*60000);
}

function buildClock() {
  var grid = document.getElementById('clockGrid');
  if (!grid) return;
  var h = '';
  for (var i=0; i<clockState.length; i++) {
    var s = clockState[i];
    var d = getCT(s);
    var hh = d.getHours(), h12 = hh%12||12;
    var mm = String(d.getMinutes()).padStart(2,'0'), ss = String(d.getSeconds()).padStart(2,'0');
    var a = hh>=12?'PM':'AM';
    var ds = DAYS_FULL[d.getDay()]+', '+M[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
    var st = timeStatus(hh);
    var ab = s.a ? s.a+' \u00b7 ' : '';
    h += '<div class="card" data-ci="'+i+'"><div class="card-content"><div class="city">'
      +'<div class="city-icon">'+s.i+'</div><div><div class="city-name">'+s.n+'</div>'
      +'<div class="timezone-label">'+ab+s.t.replace(/_/g,' ')+'</div></div></div>'
      +'<div class="time">'+h12+':'+mm+':'+ss+' <span class="am-pm">'+a+'</span></div>'
      +'<div class="date">'+ds+'</div>'
      +'<div class="card-footer"><span class="utc-offset">UTC'+s.o+'</span>'
      +'<span class="time-status '+st.c+'">'+st.l+'</span></div></div></div>';
  }
  grid.innerHTML = h;
  var cnt = document.getElementById('clockCount');
  if (cnt) cnt.textContent = clockState.length+' cities';
  upd();
}

function tick() {
  var cards = document.querySelectorAll('#tab-clock .card');
  for (var i=0; i<cards.length; i++) {
    var idx = parseInt(cards[i].dataset.ci);
    if (isNaN(idx) || !clockState[idx]) continue;
    var d = getCT(clockState[idx]);
    var hh = d.getHours(), h12 = hh%12||12;
    var mm = String(d.getMinutes()).padStart(2,'0'), ss = String(d.getSeconds()).padStart(2,'0');
    var a = hh>=12?'PM':'AM';
    var te = cards[i].querySelector('.time');
    if (te) te.innerHTML = h12+':'+mm+':'+ss+' <span class="am-pm">'+a+'</span>';
    var st = timeStatus(hh);
    var se = cards[i].querySelector('.time-status');
    if (se) { se.className = 'time-status '+st.c; se.textContent = st.l; }
  }
}

function startTick() {
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = setInterval(tick, 1000);
}

// ===== WEATHER =====
async function initWeather() {
  var grid = document.getElementById('weatherGrid');
  if (!grid) return;
  try {
    var results = await Promise.allSettled(
      CITIES.map(function(c) {
        return fetch('https://api.open-meteo.com/v1/forecast?latitude='+c.lat+'&longitude='+c.lon
          +'&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m'
          +'&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=3&timezone=auto')
          .then(function(r) { return r.json(); })
          .then(function(d) { return {c:c,data:d}; });
      })
    );
    var h = '';
    for (var ri=0; ri<results.length; ri++) {
      var r = results[ri];
      if (r.status !== 'fulfilled' || !r.value.data) continue;
      var c = r.value.c, cur = r.value.data.current, daily = r.value.data.daily;
      if (!cur) continue;
      h += '<div class="card"><div class="card-content">'
        +'<div class="city"><div class="city-icon">'+c.icon+'</div><div><div class="city-name">'+c.name+'</div></div></div>'
        +'<div class="weather-icon-main">'+wmoEmoji(cur.weather_code)+'</div>'
        +'<div class="weather-temp">'+Math.round(cur.temperature_2m)+'<span class="deg">°C</span></div>'
        +'<div class="weather-desc">'+wmoDesc(cur.weather_code)+'</div>'
        +'<div class="weather-detail">'
        +'<span>Feels <strong>'+Math.round(cur.apparent_temperature)+'°C</strong></span>'
        +'<span>💧 <strong>'+cur.relative_humidity_2m+'%</strong></span>'
        +'<span>💨 <strong>'+Math.round(cur.wind_speed_10m)+'</strong></span></div>';
      if (daily) {
        h += '<div class="weather-forecast">';
        for (var di=1; di<=2; di++) {
          if (!daily.time[di]) continue;
          var dt = new Date(daily.time[di]+'T12:00:00');
          var dn = D[dt.getDay()];
          var hi = daily.temperature_2m_max[di];
          var lo = daily.temperature_2m_min[di];
          var wc = daily.weather_code[di];
          h += '<div class="forecast-day"><div class="day-name">'+dn+'</div>'
            +'<div class="day-icon">'+wmoEmoji(wc)+'</div>'
            +'<div class="day-temp">'+Math.round(hi)+'° / '+Math.round(lo)+'°</div></div>';
        }
        h += '</div>';
      }
      h += '</div></div>';
    }
    grid.innerHTML = h || '<div class="error-state">No weather data</div>';
    var cnt = document.getElementById('weatherCount');
    if (cnt) cnt.textContent = results.filter(function(r){return r.status==='fulfilled'&&r.value.data?.current;}).length+' cities';
    upd();
  } catch(e) {
    grid.innerHTML = '<div class="error-state">Failed to load weather</div>';
  }
}

// ===== CURRENCY =====
async function initCurrency() {
  var grid = document.getElementById('currencyGrid');
  if (!grid) return;
  try {
    var res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!res.ok) throw Error();
    var data = await res.json();
    ratesData = data.rates;
    buildCurrency('');
    setupConverter();

    var sb = document.getElementById('currencySearch');
    if (sb) {
      sb.addEventListener('input', function() {
        buildCurrency(this.value.toLowerCase());
      });
    }
    upd();
  } catch(e) {
    grid.innerHTML = '<div class="error-state">Failed to load rates</div>';
  }
}

function buildCurrency(q) {
  var grid = document.getElementById('currencyGrid');
  if (!grid) return;
  var h = '';
  var count = 0;
  for (var i=0; i<CURRENCIES.length; i++) {
    var c = CURRENCIES[i];
    var rate = ratesData[c.code];
    if (!rate) continue;
    if (q && c.code.toLowerCase().indexOf(q)===-1 && c.name.toLowerCase().indexOf(q)===-1) continue;
    count++;
    h += '<div class="currency-card">'
      +'<div class="currency-code">'+c.flag+' '+c.code+'</div>'
      +'<div class="currency-name">'+c.name+'</div>'
      +'<div class="currency-rate">'+fmt(rate)+'</div></div>';
  }
  grid.innerHTML = h || '<div class="error-state">No matches</div>';
}

function setupConverter() {
  var ce = document.getElementById('convFrom');
  var te = document.getElementById('convTo');
  var ae = document.getElementById('convAmount');
  var re = document.getElementById('convResult');
  if (!ce||!te||!ae||!re) return;

  var all = [{code:'USD',name:'US Dollar',flag:'🇺🇸'}].concat(CURRENCIES);
  var o = '';
  for (var i=0; i<all.length; i++) {
    o += '<option value="'+all[i].code+'">'+all[i].flag+' '+all[i].code+' - '+all[i].name+'</option>';
  }
  ce.innerHTML = o;
  te.innerHTML = o;
  ce.value = 'USD';
  te.value = 'EUR';

  function conv() {
    var amt = parseFloat(ae.value)||0;
    var from = ce.value;
    var to = te.value;
    if (!ratesData) { re.textContent = '—'; return; }
    var result;
    if (from === 'USD') result = amt * (ratesData[to]||0);
    else if (to === 'USD') result = amt / (ratesData[from]||1);
    else result = amt * (ratesData[to]||0) / (ratesData[from]||1);
    re.textContent = isNaN(result) ? '—' : fmt(result)+' '+to;
  }

  ae.addEventListener('input', conv);
  ce.addEventListener('change', conv);
  te.addEventListener('change', conv);
  conv();
}

// ===== MARKETS =====
async function initMarkets() {
  var grid = document.getElementById('marketsGrid');
  if (!grid) return;
  try {
    var res = await fetch('https://api.metals.live/v1/spot/gold');
    var goldPrice = null, silverPrice = null;
    if (res.ok) {
      try {
        var g = await res.json();
        if (Array.isArray(g)) {
          for (var i=0; i<g.length; i++) {
            if (g[i].metal === 'XAU') goldPrice = g[i].price;
            if (g[i].metal === 'XAG') silverPrice = g[i].price;
          }
        } else {
          goldPrice = g.spotPrice || g.price;
        }
      } catch(e) {}
    }
    var html = '';
    if (goldPrice) {
      html += '<div class="market-card"><div class="market-icon">🥇</div>'
        +'<div class="market-label">Gold</div>'
        +'<div class="market-price gold">$'+fmt(goldPrice,0)+'</div>'
        +'<div class="market-label" style="margin-top:0.25rem;font-size:0.6rem;">per troy oz</div></div>';
    }
    if (silverPrice) {
      html += '<div class="market-card"><div class="market-icon">🥈</div>'
        +'<div class="market-label">Silver</div>'
        +'<div class="market-price gold">$'+fmt(silverPrice,2)+'</div>'
        +'<div class="market-label" style="margin-top:0.25rem;font-size:0.6rem;">per troy oz</div></div>';
    }
    if (!goldPrice && !silverPrice) {
      html += '<div class="market-card"><div class="market-icon">🥇</div>'
        +'<div class="market-label">Gold</div>'
        +'<div class="market-price gold">$2,350.00</div>'
        +'<div class="market-label" style="margin-top:0.25rem;font-size:0.6rem;">per troy oz (ref)</div></div>'
        +'<div class="market-card"><div class="market-icon">🥈</div>'
        +'<div class="market-label">Silver</div>'
        +'<div class="market-price gold">$33.42</div>'
        +'<div class="market-label" style="margin-top:0.25rem;font-size:0.6rem;">per troy oz (ref)</div></div>';
    }
    grid.innerHTML = html;
    upd();
  } catch(e) {
    grid.innerHTML = '<div class="error-state">Failed to load</div>';
  }
}

// ===== CRYPTO =====
async function initCrypto() {
  var grid = document.getElementById('cryptoGrid');
  if (!grid) return;
  try {
    var res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,cardano,dogecoin&vs_currencies=usd&include_24hr_change=true');
    if (!res.ok) throw Error();
    var data = await res.json();

    var coins = [
      { id: 'bitcoin',    label: 'Bitcoin',    icon: '₿' },
      { id: 'ethereum',   label: 'Ethereum',   icon: '⟠' },
      { id: 'solana',     label: 'Solana',     icon: '◎' },
      { id: 'ripple',     label: 'XRP',        icon: '✕' },
      { id: 'cardano',    label: 'Cardano',    icon: '₳' },
      { id: 'dogecoin',   label: 'Dogecoin',   icon: 'Ð' },
    ];

    var html = '';
    for (var i=0; i<coins.length; i++) {
      var c = coins[i];
      var info = data[c.id];
      if (!info) continue;
      var price = info.usd;
      var chg = info.usd_24h_change;
      var cls = 'green';
      if (chg < 0) cls = 'red';
      html += '<div class="market-card"><div class="market-icon" style="font-weight:700;">'+c.icon+'</div>'
        +'<div class="market-label">'+c.label+'</div>'
        +'<div class="market-price '+cls+'">$'+fmt(price, price>100?0:price>1?2:4)+'</div>'
        +'<div class="market-change '+cls+'">'+(chg>0?'+':'')+chg.toFixed(2)+'%</div>'
        +'<div class="market-time">24h change</div></div>';
    }
    grid.innerHTML = html || '<div class="error-state">No crypto data</div>';
    upd();
  } catch(e) {
    grid.innerHTML = '<div class="error-state">Failed to load crypto</div>';
  }
}

// ===== GAMES =====
var currentGame = null;
var gameAnimId = null;
var canvas = document.getElementById('gameCanvas');
var ctx = canvas ? canvas.getContext('2d') : null;
var scoreLabel = document.getElementById('gameScoreLabel');
var hint = document.getElementById('gameHint');

function initGames() {
  document.querySelectorAll('.game-select-card').forEach(function(card) {
    card.addEventListener('click', function() {
      launchGame(this.dataset.game);
    });
  });
  document.getElementById('gameBackBtn').addEventListener('click', exitGame);
}

function launchGame(game) {
  currentGame = game;
  document.getElementById('gameMenu').style.display = 'none';
  document.getElementById('gamePlay').style.display = 'block';
  canvas.width = 400;
  canvas.height = 500;
  switch (game) {
    case 'bird': initFlappy(); break;
    case 'car': initCar(); break;
    case 'snake': initSnake(); break;
    case 'tetris': initTetris(); break;
    case 'pong': initPong(); break;
    case 'click': initClickGame(); break;
  }
}

function exitGame() {
  if (gameAnimId) { cancelAnimationFrame(gameAnimId); gameAnimId = null; }
  document.onkeydown = null;
  document.onkeyup = null;
  canvas.onclick = null;
  canvas.onmousemove = null;
  currentGame = null;
  document.getElementById('gameMenu').style.display = 'block';
  document.getElementById('gamePlay').style.display = 'none';
}

// ========== FLAPPY BIRD ==========
function initFlappy() {
  var bird = { x: 80, y: 200, vy: 0, size: 12 };
  var pipes = [];
  var score = 0;
  var gameOver = false;
  var started = false;
  var frame = 0;
  var pipeGap = 120;
  var pipeW = 35;
  var gravity = 0.4;
  var jump = -6;
  hint.textContent = 'Press SPACE or click to start';

  function reset() {
    bird.y = 200; bird.vy = 0; pipes = []; score = 0; gameOver = false; started = false;
    hint.textContent = 'Press SPACE or click to start';
  }

  function addPipe() {
    var topH = 40 + Math.random() * 200;
    pipes.push({ x: canvas.width, top: topH, bottom: topH + pipeGap, scored: false });
  }

  function update() {
    if (!started) return;
    frame++;
    bird.vy += gravity;
    bird.y += bird.vy;

    if (frame % 55 === 0) addPipe();

    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].x -= 2.5;
      if (pipes[i].x + pipeW < 0) { pipes.splice(i, 1); continue; }
      if (!pipes[i].scored && pipes[i].x + pipeW < bird.x) {
        pipes[i].scored = true; score++;
        scoreLabel.textContent = 'Score: ' + score;
      }
    }

    if (bird.y < 0 || bird.y > canvas.height) gameOver = true;

    for (var j = 0; j < pipes.length; j++) {
      var p = pipes[j];
      if (bird.x + bird.size > p.x && bird.x - bird.size < p.x + pipeW) {
        if (bird.y - bird.size < p.top || bird.y + bird.size > p.bottom) gameOver = true;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(20, 20, 40, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < pipes.length; i++) {
      var p = pipes[i];
      ctx.fillStyle = '#4a8a5c';
      ctx.fillRect(p.x, 0, pipeW, p.top);
      ctx.fillRect(p.x, p.bottom, pipeW, canvas.height - p.bottom);
      ctx.fillStyle = '#5aaa6c';
      ctx.fillRect(p.x - 3, p.top - 20, pipeW + 6, 20);
      ctx.fillRect(p.x - 3, p.bottom, pipeW + 6, 20);
    }

    ctx.fillStyle = '#f0d040';
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e8b820';
    ctx.beginPath();
    ctx.arc(bird.x - 4, bird.y - 4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(bird.x - 5, bird.y - 5, 2, 0, Math.PI * 2);
    ctx.fill();

    if (!started && !gameOver) {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '18px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Flappy Bird', canvas.width/2, 80);
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f06060';
      ctx.font = 'bold 28px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width/2, canvas.height/2 - 20);
      ctx.fillStyle = '#b0b0d0';
      ctx.font = '18px Inter';
      ctx.fillText('Score: ' + score, canvas.width/2, canvas.height/2 + 20);
      ctx.fillStyle = '#686888';
      ctx.font = '14px Inter';
      ctx.fillText('Click or SPACE to restart', canvas.width/2, canvas.height/2 + 55);
    }
  }

  function loop() {
    if (currentGame !== 'bird') return;
    update();
    draw();
    if (!gameOver || !started) gameAnimId = requestAnimationFrame(loop);
    else {
      gameAnimId = requestAnimationFrame(function() { draw(); gameAnimId = requestAnimationFrame(loop); });
    }
  }

  function onAction(e) {
    if (e) e.preventDefault();
    if (gameOver) { reset(); return; }
    if (!started) { started = true; scoreLabel.textContent = 'Score: 0'; }
    bird.vy = jump;
  }

  document.onkeydown = function(e) {
    if (e.code === 'Space') { e.preventDefault(); onAction(); }
  };
  canvas.onclick = onAction;

  scoreLabel.textContent = 'Score: 0';
  loop();
}

// ========== CAR DODGE ==========
function initCar() {
  var player = { x: 175, y: 400, w: 40, h: 60 };
  var obstacles = [];
  var score = 0;
  var gameOver = false;
  var frame = 0;
  var speed = 3;
  var keys = { left: false, right: false };
  hint.textContent = 'Arrow keys to move';

  function reset() {
    player.x = 175; obstacles = []; score = 0; gameOver = false; frame = 0; speed = 3;
  }

  function addObstacle() {
    var lane = Math.floor(Math.random() * 3);
    var x = lane * 120 + 30;
    obstacles.push({ x: x, y: -80, w: 45, h: 70 });
  }

  function update() {
    if (gameOver) return;
    frame++; speed = 3 + Math.floor(score / 5) * 0.5;

    if (keys.left) player.x -= 4;
    if (keys.right) player.x += 4;
    player.x = Math.max(10, Math.min(canvas.width - player.w - 10, player.x));

    if (frame % 40 === 0) addObstacle();

    for (var i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].y += speed;
      if (obstacles[i].y > canvas.height) { obstacles.splice(i, 1); score++; scoreLabel.textContent = 'Score: ' + score; continue; }
      if (obstacles[i].x < player.x + player.w && obstacles[i].x + 45 > player.x &&
          obstacles[i].y < player.y + player.h && obstacles[i].y + 70 > player.y) gameOver = true;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 3; i++) {
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fillRect(i * 120 + 15, 0, 80, canvas.height);
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 20]);
    for (var j = 0; j < 2; j++) {
      ctx.beginPath();
      ctx.moveTo((j+1) * 120 + 40, 0);
      ctx.lineTo((j+1) * 120 + 40, canvas.height);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.fillStyle = '#e04040';
    ctx.fillRect(obstacles.length > 0 ? obstacles[0].x : 0, -100, 45, 70);
    for (var k = 0; k < obstacles.length; k++) {
      var o = obstacles[k];
      ctx.fillStyle = ['#e04040','#e06040','#d03050'][k % 3];
      ctx.fillRect(o.x, o.y, 45, 70);
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(o.x + 8, o.y + 10, 8, 15);
      ctx.fillRect(o.x + 28, o.y + 10, 8, 15);
    }

    ctx.fillStyle = '#4080e0';
    ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(player.x + 8, player.y + 10, 8, 15);
    ctx.fillRect(player.x + 24, player.y + 10, 8, 15);

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f06060';
      ctx.font = 'bold 28px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Crash!', canvas.width/2, canvas.height/2 - 20);
      ctx.fillStyle = '#b0b0d0';
      ctx.font = '18px Inter';
      ctx.fillText('Score: ' + score, canvas.width/2, canvas.height/2 + 20);
      ctx.fillStyle = '#686888';
      ctx.font = '14px Inter';
      ctx.fillText('Click to restart', canvas.width/2, canvas.height/2 + 55);
    }
  }

  function loop() {
    if (currentGame !== 'car') return;
    update(); draw();
    gameAnimId = requestAnimationFrame(loop);
  }

  document.onkeydown = function(e) {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    e.preventDefault();
  };
  document.onkeyup = function(e) {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
  };
  canvas.onclick = function() { if (gameOver) { reset(); scoreLabel.textContent = 'Score: 0'; } };

  scoreLabel.textContent = 'Score: 0';
  loop();
}

// ========== SNAKE ==========
function initSnake() {
  var size = 15;
  var snake = [{x:10, y:10}];
  var dir = {x:1, y:0};
  var nextDir = {x:1, y:0};
  var food = {x:15, y:10};
  var score = 0;
  var gameOver = false;
  var cols = Math.floor(canvas.width / size);
  var rows = Math.floor(canvas.height / size);
  hint.textContent = 'Arrow keys to move';

  function reset() {
    snake = [{x:10, y:10}]; dir = {x:1, y:0}; nextDir = {x:1, y:0};
    food = {x:15, y:10}; score = 0; gameOver = false;
  }

  function spawnFood() {
    do {
      food = {x: Math.floor(Math.random()*cols), y: Math.floor(Math.random()*rows)};
    } while (snake.some(function(s) { return s.x===food.x && s.y===food.y; }));
  }

  function update() {
    if (gameOver) return;
    dir = {x: nextDir.x, y: nextDir.y};
    var head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) { gameOver = true; return; }
    for (var i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) { gameOver = true; return; }
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) { score++; scoreLabel.textContent = 'Score: '+score; spawnFood(); }
    else snake.pop();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < snake.length; i++) {
      var g = 200 - (i / snake.length) * 120;
      ctx.fillStyle = 'rgb(40,'+Math.floor(g)+',60)';
      ctx.fillRect(snake[i].x*size+1, snake[i].y*size+1, size-2, size-2);
    }

    ctx.fillStyle = '#f04040';
    ctx.beginPath();
    ctx.arc(food.x*size+size/2, food.y*size+size/2, size/2-2, 0, Math.PI*2);
    ctx.fill();

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f06060';
      ctx.font = 'bold 28px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width/2, canvas.height/2 - 20);
      ctx.fillStyle = '#b0b0d0';
      ctx.font = '18px Inter';
      ctx.fillText('Score: '+score, canvas.width/2, canvas.height/2+20);
      ctx.fillStyle = '#686888';
      ctx.font = '14px Inter';
      ctx.fillText('Click or SPACE to restart', canvas.width/2, canvas.height/2+55);
    }
  }

  var lastUpdate = 0;
  function loop(time) {
    if (currentGame !== 'snake') return;
    if (time - lastUpdate > 120) { update(); lastUpdate = time; }
    draw();
    gameAnimId = requestAnimationFrame(loop);
  }

  document.onkeydown = function(e) {
    if (e.key === 'ArrowUp' && dir.y !== 1) nextDir = {x:0, y:-1};
    if (e.key === 'ArrowDown' && dir.y !== -1) nextDir = {x:0, y:1};
    if (e.key === 'ArrowLeft' && dir.x !== 1) nextDir = {x:-1, y:0};
    if (e.key === 'ArrowRight' && dir.x !== -1) nextDir = {x:1, y:0};
    if (e.key === ' ' && gameOver) { reset(); scoreLabel.textContent = 'Score: 0'; }
    e.preventDefault();
  };
  canvas.onclick = function() { if (gameOver) { reset(); scoreLabel.textContent = 'Score: 0'; } };

  scoreLabel.textContent = 'Score: 0';
  gameAnimId = requestAnimationFrame(loop);
}

// ========== TETRIS ==========
function initTetris() {
  var cols = 10, rows = 20, size = 20;
  var board = [];
  for (var r = 0; r < rows; r++) { board[r] = []; for (var c = 0; c < cols; c++) board[r][c] = 0; }
  var pieces = [
    { shape: [[1,1,1,1]], color: '#40e0d0' },
    { shape: [[1,1],[1,1]], color: '#f0d040' },
    { shape: [[1,0],[1,0],[1,1]], color: '#e040a0' },
    { shape: [[0,1],[0,1],[1,1]], color: '#40a0e0' },
    { shape: [[1,1,0],[0,1,1]], color: '#50e050' },
    { shape: [[0,1,1],[1,1,0]], color: '#e06040' },
    { shape: [[1,1,1],[0,1,0]], color: '#a060e0' },
  ];
  var current = null;
  var score = 0;
  var gameOver = false;
  var dropTimer = 0;
  hint.textContent = 'Arrow keys: move/rotate, SPACE: hard drop';

  function spawn() {
    var p = pieces[Math.floor(Math.random()*pieces.length)];
    current = { shape: p.shape, color: p.color, x: Math.floor((cols-p.shape[0].length)/2), y: 0 };
    for (var i = 0; i < current.shape.length; i++) {
      for (var j = 0; j < current.shape[i].length; j++) {
        if (current.shape[i][j] && board[current.y+i][current.x+j]) { gameOver = true; return; }
      }
    }
  }

  function rotateShape(s) {
    var r = [];
    for (var i = 0; i < s[0].length; i++) { r[i] = []; for (var j = s.length-1; j >= 0; j--) r[i].push(s[j][i]); }
    return r;
  }

  function isValid(s, ox, oy) {
    for (var i = 0; i < s.length; i++) {
      for (var j = 0; j < s[i].length; j++) {
        if (!s[i][j]) continue;
        var nx = ox + j, ny = oy + i;
        if (nx < 0 || nx >= cols || ny >= rows || (ny >= 0 && board[ny][nx])) return false;
      }
    }
    return true;
  }

  function lock() {
    for (var i = 0; i < current.shape.length; i++) {
      for (var j = 0; j < current.shape[i].length; j++) {
        if (current.shape[i][j] && current.y+i >= 0) board[current.y+i][current.x+j] = current.color;
      }
    }
    var cleared = 0;
    for (var r = rows-1; r >= 0; r--) {
      var full = true;
      for (var c = 0; c < cols; c++) { if (!board[r][c]) { full = false; break; } }
      if (full) { board.splice(r,1); board.unshift(new Array(cols).fill(0)); cleared++; r++; }
    }
    if (cleared) { score += [0,100,300,500,800][cleared]; scoreLabel.textContent = 'Score: '+score; }
    spawn();
  }

  function update() {
    if (gameOver) return;
    if (!current) { spawn(); return; }
    if (isValid(current.shape, current.x, current.y+1)) current.y++;
    else lock();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a0a15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        if (board[r][c]) { ctx.fillStyle = board[r][c]; ctx.fillRect(c*size, r*size, size-1, size-1); }
      }
    }

    if (current) {
      for (var i = 0; i < current.shape.length; i++) {
        for (var j = 0; j < current.shape[i].length; j++) {
          if (current.shape[i][j]) {
            ctx.fillStyle = current.color;
            ctx.fillRect((current.x+j)*size, (current.y+i)*size, size-1, size-1);
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            ctx.fillRect((current.x+j)*size+2, (current.y+i)*size+2, size-5, size-5);
          }
        }
      }
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f06060';
      ctx.font = 'bold 28px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width/2, canvas.height/2-20);
      ctx.fillStyle = '#b0b0d0';
      ctx.font = '18px Inter';
      ctx.fillText('Score: '+score, canvas.width/2, canvas.height/2+20);
      ctx.fillStyle = '#686888';
      ctx.font = '14px Inter';
      ctx.fillText('Click to restart', canvas.width/2, canvas.height/2+55);
    }
  }

  var tLast = 0;
  function loop(time) {
    if (currentGame !== 'tetris') return;
    if (time - tLast > 400) { update(); tLast = time; }
    draw();
    gameAnimId = requestAnimationFrame(loop);
  }

  document.onkeydown = function(e) {
    if (!current || gameOver) return;
    if (e.key === 'ArrowLeft' && isValid(current.shape, current.x-1, current.y)) current.x--;
    if (e.key === 'ArrowRight' && isValid(current.shape, current.x+1, current.y)) current.x++;
    if (e.key === 'ArrowDown') update();
    if (e.key === 'ArrowUp') { var r = rotateShape(current.shape); if (isValid(r, current.x, current.y)) current.shape = r; }
    if (e.key === ' ') { while(isValid(current.shape, current.x, current.y+1)) current.y++; update(); }
    e.preventDefault();
  };
  canvas.onclick = function() { if (gameOver) { board = []; for (var rr=0; rr<rows; rr++) { board[rr]=[]; for (var cc=0; cc<cols; cc++) board[rr][cc]=0; } score=0; gameOver=false; scoreLabel.textContent='Score: 0'; spawn(); } };

  scoreLabel.textContent = 'Score: 0';
  spawn();
  gameAnimId = requestAnimationFrame(loop);
}

// ========== PONG ==========
function initPong() {
  var pw = 10, ph = 60;
  var ball = { x: 200, y: 250, vx: 4, vy: 3, r: 6 };
  var player = { y: 220, score: 0 };
  var ai = { y: 220, score: 0 };
  var gameOver = false;
  var maxScore = 5;
  hint.textContent = 'Move mouse up/down to control paddle';

  function reset() {
    ball.x = 200; ball.y = 250; ball.vx = 4 * (Math.random()>0.5?1:-1);
    ball.vy = 3 * (Math.random()>0.5?1:-1); gameOver = false;
  }

  function update() {
    if (gameOver) return;
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) ball.vy *= -1;

    if (ball.x - ball.r < 20 && ball.y > player.y && ball.y < player.y + ph) { ball.vx = Math.abs(ball.vx); ball.vx += 0.3; }
    if (ball.x + ball.r > canvas.width - 20 && ball.y > ai.y && ball.y < ai.y + ph) { ball.vx = -Math.abs(ball.vx); ball.vx -= 0.3; }

    if (ball.x - ball.r < 0) { ai.score++; if (ai.score >= maxScore) gameOver=true; else reset(); }
    if (ball.x + ball.r > canvas.width) { player.score++; if (player.score >= maxScore) gameOver=true; else reset(); }

    var aiTarget = ball.y - ph/2;
    ai.y += (aiTarget - ai.y) * 0.06;
    ai.y = Math.max(0, Math.min(canvas.height - ph, ai.y));

    scoreLabel.textContent = player.score + ' - ' + ai.score;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a0a15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0); ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#70a8f0';
    ctx.fillRect(10, player.y, pw, ph);
    ctx.fillStyle = '#f07070';
    ctx.fillRect(canvas.width-20, ai.y, pw, ph);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
    ctx.fill();

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f0d040';
      ctx.font = 'bold 28px Inter';
      ctx.textAlign = 'center';
      ctx.fillText((player.score>ai.score?'You Win!':'AI Wins!'), canvas.width/2, canvas.height/2-20);
      ctx.fillStyle = '#b0b0d0';
      ctx.font = '18px Inter';
      ctx.fillText(player.score+' - '+ai.score, canvas.width/2, canvas.height/2+20);
      ctx.fillStyle = '#686888';
      ctx.font = '14px Inter';
      ctx.fillText('Click to restart', canvas.width/2, canvas.height/2+55);
    }
  }

  function loop() {
    if (currentGame !== 'pong') return;
    update(); draw();
    gameAnimId = requestAnimationFrame(loop);
  }

  canvas.onmousemove = function(e) {
    var rect = canvas.getBoundingClientRect();
    var scaleY = canvas.height / rect.height;
    player.y = (e.clientY - rect.top) * scaleY - ph/2;
    player.y = Math.max(0, Math.min(canvas.height-ph, player.y));
  };
  canvas.onclick = function() { if (gameOver) { player.score=0; ai.score=0; reset(); } };

  scoreLabel.textContent = '0 - 0';
  loop();
}

// ========== CLICK SPEED ==========
function initClickGame() {
  var count = 0;
  var running = false;
  var timer = null;
  hint.textContent = 'Click the canvas! 10 seconds';

  function start() {
    count = 0; running = true;
    scoreLabel.textContent = 'Clicks: 0';
    hint.textContent = 'GO GO GO! 🔥';
    timer = setTimeout(function() {
      running = false;
      var stars = count>20?'🔥🔥🔥':count>12?'🔥🔥':count>5?'🔥':'';
      hint.textContent = 'Time! '+count+' clicks '+stars;
      scoreLabel.textContent = 'Final: ' + count;
    }, 10000);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = running ? 'rgba(74,200,100,0.05)' : 'rgba(255,255,255,0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.font = '60px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(count, canvas.width/2, canvas.height/2+20);
    if (!running) {
      ctx.fillStyle = '#585878';
      ctx.font = '16px Inter';
      ctx.fillText('Click to start!', canvas.width/2, canvas.height/2+80);
    }
  }

  canvas.onclick = function() {
    if (!running) { start(); draw(); return; }
    count++; scoreLabel.textContent = 'Clicks: '+count;
    draw();
  };
  canvas.onmousemove = null;

  scoreLabel.textContent = 'Click to play';
  draw();
}

initClock();
initWeather();
initCurrency();
initMarkets();
initCrypto();
initGames();

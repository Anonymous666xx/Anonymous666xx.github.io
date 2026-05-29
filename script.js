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

initClock();
initWeather();
initCurrency();
initMarkets();
initCrypto();

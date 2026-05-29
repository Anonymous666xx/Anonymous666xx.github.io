const CITIES = [
  { name: 'New York',      tz: 'America/New_York',        lat: 40.7128,  lon: -74.0060,    icon: '🗽' },
  { name: 'London',        tz: 'Europe/London',           lat: 51.5074,  lon: -0.1278,     icon: '🇬🇧' },
  { name: 'Paris',         tz: 'Europe/Paris',            lat: 48.8566,  lon: 2.3522,      icon: '🇫🇷' },
  { name: 'Moscow',        tz: 'Europe/Moscow',           lat: 55.7558,  lon: 37.6173,     icon: '🇷🇺' },
  { name: 'Dubai',         tz: 'Asia/Dubai',              lat: 25.2048,  lon: 55.2708,     icon: '🇦🇪' },
  { name: 'Mumbai',        tz: 'Asia/Kolkata',            lat: 19.0760,  lon: 72.8777,     icon: '🇮🇳' },
  { name: 'Singapore',     tz: 'Asia/Singapore',          lat: 1.3521,   lon: 103.8198,    icon: '🇸🇬' },
  { name: 'Tokyo',         tz: 'Asia/Tokyo',              lat: 35.6762,  lon: 139.6503,    icon: '🇯🇵' },
  { name: 'Sydney',        tz: 'Australia/Sydney',        lat: -33.8688, lon: 151.2093,    icon: '🇦🇺' },
  { name: 'San Francisco', tz: 'America/Los_Angeles',     lat: 37.7749,  lon: -122.4194,   icon: '🌉' },
  { name: 'Berlin',        tz: 'Europe/Berlin',           lat: 52.5200,  lon: 13.4050,     icon: '🇩🇪' },
  { name: 'São Paulo',     tz: 'America/Sao_Paulo',       lat: -23.5505, lon: -46.6333,    icon: '🇧🇷' },
];

const CURRENCIES = [
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
  { code: 'SYP', name: 'Syrian Pound', flag: '🇸🇾' },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
  { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
  { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
  { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
];

const TZ_DATA = {
  'America/New_York':      { stdOffset: '-05:00', stdAbbr: 'EST', dstOffset: '-04:00', dstAbbr: 'EDT' },
  'America/Los_Angeles':   { stdOffset: '-08:00', stdAbbr: 'PST', dstOffset: '-07:00', dstAbbr: 'PDT' },
  'America/Sao_Paulo':     { stdOffset: '-03:00', stdAbbr: 'BRT' },
  'Europe/London':         { stdOffset: '+00:00', stdAbbr: 'GMT', dstOffset: '+01:00', dstAbbr: 'BST' },
  'Europe/Paris':          { stdOffset: '+01:00', stdAbbr: 'CET', dstOffset: '+02:00', dstAbbr: 'CEST' },
  'Europe/Berlin':         { stdOffset: '+01:00', stdAbbr: 'CET', dstOffset: '+02:00', dstAbbr: 'CEST' },
  'Europe/Moscow':         { stdOffset: '+03:00', stdAbbr: 'MSK' },
  'Asia/Dubai':            { stdOffset: '+04:00', stdAbbr: 'GST' },
  'Asia/Kolkata':          { stdOffset: '+05:30', stdAbbr: 'IST' },
  'Asia/Singapore':        { stdOffset: '+08:00', stdAbbr: 'SGT' },
  'Asia/Tokyo':            { stdOffset: '+09:00', stdAbbr: 'JST' },
  'Australia/Sydney':      { stdOffset: '+10:00', stdAbbr: 'AEST', dstOffset: '+11:00', dstAbbr: 'AEDT' },
};

const DST_NORTH = ['America/New_York','America/Los_Angeles','Europe/London','Europe/Paris','Europe/Berlin'];
const DST_SOUTH = ['Australia/Sydney'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

let clockState = [];
let tickTimer = null;
let ratesData = null;

function offsetToMinutes(str) {
  if (!str) return 0;
  const sign = str.startsWith('-') ? -1 : 1;
  const p = str.replace('+', '').split(':');
  return sign * (parseInt(p[0]) * 60 + parseInt(p[1] || '0'));
}

function isDST(tz) {
  const m = new Date().getMonth();
  if (DST_NORTH.includes(tz)) return m >= 2 && m <= 9;
  if (DST_SOUTH.includes(tz)) return m <= 2 || m >= 9;
  return false;
}

function getOffset(tz) {
  const info = TZ_DATA[tz];
  if (!info) return '+00:00';
  return info.dstOffset && isDST(tz) ? info.dstOffset : info.stdOffset;
}

function getAbbr(tz) {
  const info = TZ_DATA[tz];
  if (!info) return '';
  return info.dstAbbr && isDST(tz) ? info.dstAbbr : info.stdAbbr;
}

function getTimeStatus(h) {
  if (h >= 5 && h < 12) return { label: 'Morning', cls: 'day' };
  if (h >= 12 && h < 18) return { label: 'Afternoon', cls: 'day' };
  if (h >= 18 && h < 22) return { label: 'Evening', cls: 'evening' };
  return { label: 'Night', cls: 'night' };
}

function getWeatherEmoji(code) {
  if (code >= 200 && code < 300) return '⛈';
  if (code >= 300 && code < 400) return '🌦';
  if (code >= 500 && code < 600) return '🌧';
  if (code >= 600 && code < 700) return '❄️';
  if (code >= 700 && code < 800) return '🌫';
  if (code === 800) return '☀️';
  if (code === 801) return '🌤';
  if (code === 802) return '⛅';
  if (code >= 803) return '☁️';
  return '🌡';
}

function getWeatherDesc(code) {
  if (code >= 200 && code < 300) return 'Thunderstorm';
  if (code >= 300 && code < 400) return 'Drizzle';
  if (code >= 500 && code < 600) return 'Rain';
  if (code >= 600 && code < 700) return 'Snow';
  if (code >= 700 && code < 800) return 'Foggy';
  if (code === 800) return 'Clear';
  if (code === 801) return 'Mostly Clear';
  if (code === 802) return 'Partly Cloudy';
  if (code >= 803) return 'Cloudy';
  return 'Unknown';
}

function formatNum(n, d) {
  return n.toLocaleString(undefined, { minimumFractionDigits: d || 2, maximumFractionDigits: d || 2 });
}

function setUpdated() {
  const el = document.getElementById('lastUpdated');
  if (el) el.textContent = new Date().toLocaleTimeString();
}

document.getElementById('tabBar').addEventListener('click', e => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  const tab = document.getElementById('tab-' + btn.dataset.tab);
  if (tab) tab.classList.add('active');
});

async function initClock() {
  try {
    const res = await fetch('https://worldtimeapi.org/api/timezone/America/New_York');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const ref = await res.json();
    const refOffset = ref.utc_offset || '-05:00';
    const refNow = new Date(ref.datetime);

    clockState = CITIES.map(c => {
      const cityOffset = getOffset(c.tz);
      const diff = offsetToMinutes(cityOffset) - offsetToMinutes(refOffset);
      const cityDate = new Date(refNow.getTime() + diff * 60000);
      return { ...c, baseTime: cityDate.getTime(), baseClock: Date.now(), offsetStr: cityOffset, abbr: getAbbr(c.tz) };
    });
    buildClocks();
    startTick();
  } catch (e) {
    clockState = CITIES.map(c => ({ ...c, offsetStr: getOffset(c.tz), abbr: getAbbr(c.tz) }));
    buildClocks();
    startTick();
  }
}

function getCityTime(s) {
  if (s.baseTime != null && s.baseClock != null) {
    return new Date(s.baseTime + (Date.now() - s.baseClock));
  }
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + offsetToMinutes(s.offsetStr) * 60000);
}

function buildClocks() {
  const grid = document.getElementById('clockGrid');
  if (!grid) return;
  grid.innerHTML = clockState.map((s, idx) => {
    const d = getCityTime(s);
    const h = d.getHours(), h12 = h % 12 || 12;
    const m = String(d.getMinutes()).padStart(2, '0'), sec = String(d.getSeconds()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const dateStr = DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    const st = getTimeStatus(h);
    const abbr = s.abbr ? s.abbr + ' · ' : '';
    return '<div class="card" data-idx="' + idx + '">'
      + '<div class="card-content">'
      + '<div class="city">'
      + '<div class="city-icon">' + s.icon + '</div>'
      + '<div><div class="city-name">' + s.name + '</div>'
      + '<div class="timezone-label">' + abbr + s.tz.replace(/_/g, ' ') + '</div></div></div>'
      + '<div class="time">' + h12 + ':' + m + ':' + sec + ' <span class="am-pm">' + ampm + '</span></div>'
      + '<div class="date">' + dateStr + '</div>'
      + '<div class="card-footer">'
      + '<span class="utc-offset">UTC' + s.offsetStr + '</span>'
      + '<span class="time-status ' + st.cls + '">' + st.label + '</span></div></div></div>';
  }).join('');
  setUpdated();
}

function tick() {
  document.querySelectorAll('#tab-clock .card').forEach(card => {
    const idx = parseInt(card.dataset.idx);
    if (isNaN(idx) || !clockState[idx]) return;
    const d = getCityTime(clockState[idx]);
    const h = d.getHours(), h12 = h % 12 || 12;
    const m = String(d.getMinutes()).padStart(2, '0'), sec = String(d.getSeconds()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const timeEl = card.querySelector('.time');
    if (timeEl) timeEl.innerHTML = h12 + ':' + m + ':' + sec + ' <span class="am-pm">' + ampm + '</span>';
    const st = getTimeStatus(h);
    const stEl = card.querySelector('.time-status');
    if (stEl) { stEl.className = 'time-status ' + st.cls; stEl.textContent = st.label; }
  });
}

function startTick() {
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = setInterval(tick, 1000);
}

async function initWeather() {
  const grid = document.getElementById('weatherGrid');
  if (!grid) return;
  try {
    const results = await Promise.allSettled(
      CITIES.map(c =>
        fetch('https://api.open-meteo.com/v1/forecast?latitude=' + c.lat + '&longitude=' + c.lon + '&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto')
          .then(r => r.json())
          .then(d => ({ ...c, data: d }))
      )
    );
    let html = '';
    for (const r of results) {
      if (r.status !== 'fulfilled' || !r.value.data) continue;
      const c = r.value, cur = c.data.current;
      if (!cur) continue;
      html += '<div class="card"><div class="card-content">'
        + '<div class="city"><div class="city-icon">' + c.icon + '</div><div><div class="city-name">' + c.name + '</div></div></div>'
        + '<div class="weather-icon">' + getWeatherEmoji(cur.weather_code) + '</div>'
        + '<div class="weather-temp">' + Math.round(cur.temperature_2m) + '<span class="deg">°C</span></div>'
        + '<div class="weather-desc">' + getWeatherDesc(cur.weather_code) + '</div>'
        + '<div class="weather-detail">'
        + '<span>🌡 Feels <strong>' + Math.round(cur.apparent_temperature) + '°C</strong></span>'
        + '<span>💧 Humidity <strong>' + cur.relative_humidity_2m + '%</strong></span>'
        + '<span>💨 Wind <strong>' + Math.round(cur.wind_speed_10m) + ' km/h</strong></span></div></div></div>';
    }
    grid.innerHTML = html || '<div class="error-state">No weather data available</div>';
    setUpdated();
  } catch (e) {
    grid.innerHTML = '<div class="error-state">Failed to load weather data</div>';
  }
}

async function initCurrency() {
  const grid = document.getElementById('currencyGrid');
  if (!grid) return;
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    ratesData = data.rates;
    let html = '';
    for (const c of CURRENCIES) {
      const rate = ratesData[c.code];
      if (!rate) continue;
      html += '<div class="currency-card">'
        + '<div class="currency-code">' + c.flag + ' ' + c.code + '</div>'
        + '<div class="currency-name">' + c.name + '</div>'
        + '<div class="currency-rate">' + formatNum(rate) + '</div></div>';
    }
    grid.innerHTML = html || '<div class="error-state">No rates available</div>';
    setupConverter();
    setUpdated();
  } catch (e) {
    grid.innerHTML = '<div class="error-state">Failed to load exchange rates</div>';
  }
}

function setupConverter() {
  const convFromEl = document.getElementById('convFrom');
  const convToEl = document.getElementById('convTo');
  const convAmountEl = document.getElementById('convAmount');
  const convResultEl = document.getElementById('convResult');
  if (!convFromEl || !convToEl || !convAmountEl || !convResultEl) return;

  const all = [{ code: 'USD', name: 'US Dollar', flag: '🇺🇸' }, ...CURRENCIES];
  let opts = '';
  for (const c of all) opts += '<option value="' + c.code + '">' + c.flag + ' ' + c.code + ' - ' + c.name + '</option>';
  convFromEl.innerHTML = opts;
  convToEl.innerHTML = opts;
  convFromEl.value = 'USD';
  convToEl.value = 'EUR';

  function doConvert() {
    const amt = parseFloat(convAmountEl.value) || 0;
    const from = convFromEl.value;
    const to = convToEl.value;
    if (!ratesData) { convResultEl.textContent = '—'; return; }
    var result;
    if (from === 'USD') result = amt * (ratesData[to] || 0);
    else if (to === 'USD') result = amt / (ratesData[from] || 1);
    else result = amt * (ratesData[to] || 0) / (ratesData[from] || 1);
    convResultEl.textContent = isNaN(result) ? '—' : formatNum(result) + ' ' + to;
  }

  convAmountEl.addEventListener('input', doConvert);
  convFromEl.addEventListener('change', doConvert);
  convToEl.addEventListener('change', doConvert);
  doConvert();
}

async function initMarkets() {
  const grid = document.getElementById('marketsGrid');
  if (!grid) return;
  try {
    const btcRes = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
    let html = '';
    if (btcRes.ok) {
      const btc = await btcRes.json();
      const price = parseFloat(btc.bpi.USD.rate.replace(/,/g, ''));
      html += '<div class="market-card">'
        + '<div class="market-icon">₿</div>'
        + '<div class="market-label">Bitcoin</div>'
        + '<div class="market-price">$' + formatNum(price, 0) + '</div>'
        + '<div class="market-time">' + btc.time.updated + '</div></div>';
    }
    html += '<div class="market-card">'
      + '<div class="market-icon">🥇</div>'
      + '<div class="market-label">Gold (per oz)</div>'
      + '<div class="market-price">$2,350.00</div>'
      + '<div class="market-time">Reference price</div></div>'
      + '<div class="market-card">'
      + '<div class="market-icon">🥈</div>'
      + '<div class="market-label">Silver (per oz)</div>'
      + '<div class="market-price">$33.42</div>'
      + '<div class="market-time">Reference price</div></div>';
    grid.innerHTML = html;
    setUpdated();
  } catch (e) {
    grid.innerHTML = '<div class="error-state">Failed to load market data</div>';
  }
}

initClock();
initWeather();
initCurrency();
initMarkets();

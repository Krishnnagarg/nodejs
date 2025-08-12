// script.js

// Helpers
const $ = (sel) => document.querySelector(sel);
const qs = (sel) => document.querySelectorAll(sel);


const form = $('#shorten-form');
const urlInput = $('#url');
const shortInput = $('#shortCode');
const listEl = $('#shortened-urls');

const STORAGE_KEY = 'shortener_links_v1';
const BASE_URL = window.location.origin + '/'; // change if you want a different base

// Load from localStorage
function loadLinks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Save to localStorage
function saveLinks(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

// tiny url code generator (6 chars)
function genCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let s = '';
  for (let i = 0; i < length; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return s;
}

// Validate URL (simple)
function isValidUrl(value) {
  try {
    const u = new URL(value);
    // only allow http/https
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

// Ensure unique code
function ensureUniqueCode(desired, list) {
  let code = desired;
  const exists = (c) => list.some(item => item.code === c);
  if (!code) {
    do { code = genCode(); } while (exists(code));
    return code;
  }

  // sanitize desired code: allow alnum and - _
  code = code.replace(/[^a-zA-Z0-9-_]/g, '').slice(0, 20);
  if (!code) {
    // fallback to random
    return ensureUniqueCode('', list);
  }
  if (exists(code)) {
    // append random suffix until unique
    let suffix = 1;
    while (exists(code + suffix)) suffix++;
    return code + suffix;
  }
  return code;
}

// Render UI
function renderList() {
  const list = loadLinks();
  listEl.innerHTML = '';

  if (list.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No shortened URLs yet.';
    li.style.opacity = '0.7';
    listEl.appendChild(li);
    return;
  }

  // render newest first
  [...list].reverse().forEach(item => {
    const li = document.createElement('li');
    li.className = 'short-item';
    li.style.display = 'flex';
    li.style.flexDirection = 'column';
    li.style.alignItems = 'center';
    li.style.gap = '6px';

    const original = document.createElement('div');
    original.textContent = item.original;
    original.style.fontSize = '0.9rem';
    original.style.opacity = '0.9';
    original.style.wordBreak = 'break-word';
    original.style.textAlign = 'center';
    original.style.width = '100%';

    const shortRow = document.createElement('div');
    shortRow.style.display = 'flex';
    shortRow.style.gap = '8px';
    shortRow.style.alignItems = 'center';

    const shortLink = document.createElement('a');
    shortLink.href = item.original; // keep anchor to original so clicking opens original
    shortLink.target = '_blank';
    shortLink.rel = 'noopener noreferrer';
    shortLink.textContent = BASE_URL + item.code;
    shortLink.style.fontWeight = '600';
    shortLink.style.textDecoration = 'none';
    shortLink.style.color = '#0077b6';

    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.style.cursor = 'pointer';
    copyBtn.style.padding = '6px 8px';
    copyBtn.style.borderRadius = '6px';
    copyBtn.style.border = 'none';
    copyBtn.style.background = '#0077b6';
    copyBtn.style.color = '#fff';
    copyBtn.style.fontSize = '0.85rem';
    copyBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(BASE_URL + item.code);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
      } catch {
        alert('Copy failed — your browser may block clipboard access.');
      }
    };

    const openBtn = document.createElement('button');
    openBtn.textContent = 'Open';
    openBtn.style.cursor = 'pointer';
    openBtn.style.padding = '6px 8px';
    openBtn.style.borderRadius = '6px';
    openBtn.style.border = '1px solid #0077b6';
    openBtn.style.background = '#fff';
    openBtn.style.color = '#0077b6';
    openBtn.style.fontSize = '0.85rem';
    openBtn.onclick = () => window.open(item.original, '_blank');

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.style.cursor = 'pointer';
    delBtn.style.padding = '6px 8px';
    delBtn.style.borderRadius = '6px';
    delBtn.style.border = 'none';
    delBtn.style.background = '#e63946';
    delBtn.style.color = '#fff';
    delBtn.style.fontSize = '0.85rem';
    delBtn.onclick = () => {
      if (!confirm('Delete this shortened URL?')) return;
      const remaining = loadLinks().filter(x => x.code !== item.code);
      saveLinks(remaining);
      renderList();
    };

    // buttons group
    const btnGroup = document.createElement('div');
    btnGroup.style.display = 'flex';
    btnGroup.style.gap = '6px';
    btnGroup.appendChild(openBtn);
    btnGroup.appendChild(copyBtn);
    btnGroup.appendChild(delBtn);

    shortRow.appendChild(shortLink);
    li.appendChild(original);
    li.appendChild(shortRow);
    li.appendChild(btnGroup);

    listEl.appendChild(li);
  });
}

// Form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const original = urlInput.value.trim();
  const desired = shortInput.value.trim();

  if (!original) {
    alert('Please enter a URL.');
    return;
  }

  if (!isValidUrl(original)) {
    alert('Please enter a valid URL (must start with http:// or https://).');
    return;
  }

  const list = loadLinks();
  const code = ensureUniqueCode(desired, list);

  const item = {
    code,
    original,
    createdAt: new Date().toISOString()
  };

  list.push(item);
  saveLinks(list);

  // reset form
  urlInput.value = '';
  shortInput.value = '';

  renderList();
});

// initialize
renderList();



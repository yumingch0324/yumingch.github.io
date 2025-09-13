// Year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
// Theme toggle
document.querySelectorAll('.theme-toggle').forEach(btn=>btn.addEventListener('click',()=>{
  const cur = document.documentElement.dataset.theme;
  const next = cur==='light' ? 'dark' : cur==='dark' ? '' : 'light';
  document.documentElement.dataset.theme = next;
}));
// Side-nav highlight
(function(){
  const page = location.pathname.split('/').pop() || 'index.html';
  const map = { 'index.html':'about','research.html':'research','projects.html':'projects','publications.html':'publications','contact.html':'contact' };
  const key = map[page];
  if (!key) return;
  document.querySelectorAll('.side-nav a').forEach(a => {
    if (a.dataset.nav === key) a.classList.add('active');
  });
})();
// Simple news & pubs rendering from JSON (optional)
async function loadJSON(path){ try { const r = await fetch(path); return await r.json(); } catch { return null; } }
(async function initNews(){
  const el = document.getElementById('news'); if (!el) return;
  const data = await loadJSON('data/news.json') || [];
  if (!data.length){ el.innerHTML = '<li>New site launched. More updates soon.</li>'; return; }
  el.innerHTML = data.map(n => `<li><strong>${n.date}</strong> — ${n.text}</li>`).join('');
})();
(async function initPubs(){
  if (!document.getElementById('pub-list')) return;
  const src = window.PUBS_JSON || 'data/publications.json';
  const pubs = await loadJSON(src) || [];
  const list = document.getElementById('pub-list');
  const yearSel = document.getElementById('pub-year');
  const search = document.getElementById('pub-search');
  const years = Array.from(new Set(pubs.map(p => p.year))).sort((a,b)=>b-a);
  years.forEach(y => { const o = document.createElement('option'); o.value = y; o.textContent = y; yearSel.appendChild(o); });
  function render(){
    const q = (search.value||'').toLowerCase();
    const y = yearSel.value;
    const rows = pubs.filter(p => (!y || String(p.year)===String(y)) && (!q || (p.title+p.venue+p.authors).toLowerCase().includes(q)));
    list.innerHTML = rows.map(p => `<li><strong>${p.authors}</strong> (${p.year}). <em>${p.title}</em>. ${p.venue}. ${p.links?.pdf?`<a class="link" href="${p.links.pdf}">pdf</a>`:''} ${p.links?.code?`· <a class="link" href="${p.links.code}">code</a>`:''}</li>`).join('');
  }
  search.addEventListener('input', render); yearSel.addEventListener('change', render); render();
})();
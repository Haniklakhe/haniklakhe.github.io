/* shared.js — all pages */

/* ── Active nav ── */
(function(){
  const p = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    if(a.getAttribute('href') === p) a.classList.add('active');
    if(p === '' && a.getAttribute('href') === 'index.html') a.classList.add('active');
  });
})();

/* ── Mobile burger ── */
const burger = document.getElementById('burger');
const drawer = document.getElementById('navDrawer');
if(burger && drawer){
  burger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    burger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    burger.querySelectorAll('span')[1].style.opacity = open ? '0' : '1';
    burger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));
}

/* ═══════════════════════════════
   SECRET OWNER UNLOCK
   • Konami code: ↑↑↓↓←→←→BA
   • Click footer copyright 5× fast
   • URL param: ?owner=hanik2026
═══════════════════════════════ */
const OWNER_KEY = 'hl_owner_2026';
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki = 0;
document.addEventListener('keydown', e => {
  ki = (e.key === KONAMI[ki]) ? ki+1 : (e.key===KONAMI[0] ? 1 : 0);
  if(ki===KONAMI.length){ ki=0; unlockOwner(); }
});

let fc=0, ft;
document.querySelector('.footer-copy')?.addEventListener('click', () => {
  fc++; clearTimeout(ft);
  if(fc>=5){fc=0;unlockOwner();}
  else ft=setTimeout(()=>fc=0, 2000);
});

if(new URLSearchParams(location.search).get('owner')==='hanik2026') unlockOwner();
if(sessionStorage.getItem(OWNER_KEY)) restoreOwner();

function unlockOwner(){ sessionStorage.setItem(OWNER_KEY,'1'); restoreOwner(); showToast('🔓 Owner mode active'); }
function restoreOwner(){
  const fab=document.getElementById('ownerFab');
  if(fab) fab.style.display='flex';
  activatePhotos(); loadSaved();
}
function lockOwner(){
  sessionStorage.removeItem(OWNER_KEY);
  document.getElementById('ownerFab').style.display='none';
  document.getElementById('ownerPanel')?.classList.remove('open');
  document.body.classList.remove('edit-mode');
  setEditable(false); showToast('🔒 Edit mode closed');
}
function toggleOwnerPanel(){ document.getElementById('ownerPanel')?.classList.toggle('open'); }

/* text edit */
let editOn=false;
function toggleTextEdit(){
  editOn=!editOn; setEditable(editOn);
  document.body.classList.toggle('edit-mode',editOn);
  showToast(editOn ? '✎ Click any text to edit it' : '✓ Text editing paused');
}
function setEditable(on){
  document.querySelectorAll('[contenteditable]').forEach(el=>el.setAttribute('contenteditable',on?'true':'false'));
}

/* save / load */
function saveContent(){
  const pg=location.pathname.split('/').pop()||'index';
  const d={};
  document.querySelectorAll('[contenteditable]').forEach((el,i)=>d[i]=el.innerHTML);
  localStorage.setItem('hl_'+pg, JSON.stringify(d));
  showToast('💾 Saved — restores on next visit');
}
function loadSaved(){
  const pg=location.pathname.split('/').pop()||'index';
  const s=localStorage.getItem('hl_'+pg);
  if(!s) return;
  const d=JSON.parse(s);
  document.querySelectorAll('[contenteditable]').forEach((el,i)=>{if(d[i]!==undefined)el.innerHTML=d[i];});
}
function clearContent(){
  if(!confirm('Reset this page to default?')) return;
  localStorage.removeItem('hl_'+(location.pathname.split('/').pop()||'index'));
  location.reload();
}

/* export */
function exportPage(){
  const c=document.documentElement.cloneNode(true);
  c.querySelector('#ownerFab')?.remove();
  c.querySelector('.edit-mode-badge')?.remove();
  c.querySelector('#toast')?.remove();
  c.querySelectorAll('[contenteditable]').forEach(el=>el.setAttribute('contenteditable','false'));
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob(['<!DOCTYPE html>\n'+c.outerHTML],{type:'text/html'}));
  a.download=location.pathname.split('/').pop()||'index.html';
  a.click(); showToast('⬇ Downloading page...');
}

/* photos */
function activatePhotos(){
  document.querySelectorAll('.photo-ph').forEach(el=>{
    el.classList.add('editable');
    const inp=el.querySelector('input[type=file]');
    if(inp) inp.style.display='block';
  });
}
function loadPhoto(input, wrapId, shape){
  const file=input.files?.[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=e=>{
    const url=e.target.result;
    const wrap=document.getElementById(wrapId); if(!wrap) return;
    if(shape==='circle'){
      wrap.innerHTML=`<div style="position:relative;width:200px;height:200px">
        <div style="position:absolute;inset:-6px;border-radius:50%;border:2px solid var(--teal-lt2)"></div>
        <img src="${url}" style="width:200px;height:200px;border-radius:50%;object-fit:cover;border:3px solid var(--teal);display:block">
        <button class="photo-change-btn" style="display:block" onclick="resetCircle('${wrapId}')">↺ Change</button></div>`;
    } else if(shape==='portrait'){
      wrap.innerHTML=`<div style="position:relative;width:100%;height:100%">
        <img src="${url}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;display:block">
        <button class="photo-change-btn" style="display:block" onclick="resetPortrait('${wrapId}')">↺ Change</button></div>`;
    } else {
      const tag=wrap.dataset.tag||'';
      wrap.innerHTML=`<img src="${url}" style="width:100%;height:100%;object-fit:cover;display:block">
        <span class="proj-tag-overlay">${tag}</span>
        <button class="photo-change-btn" style="display:block" onclick="resetProj('${wrapId}','${tag}')">↺ Change</button>`;
    }
  };
  reader.readAsDataURL(file);
}
function resetCircle(id){
  document.getElementById(id).innerHTML=`<div class="photo-ph editable" style="width:200px;height:200px;border-radius:50%"><input type="file" accept="image/*" onchange="loadPhoto(this,'${id}','circle')" style="display:block"><svg width="32" height="32" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg><span>Your photo</span></div>`;
}
function resetPortrait(id){
  document.getElementById(id).innerHTML=`<div class="photo-ph editable" style="width:100%;height:100%"><input type="file" accept="image/*" onchange="loadPhoto(this,'${id}','portrait')" style="display:block"><svg width="36" height="36" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg><span>Upload photo</span></div>`;
}
function resetProj(id,tag){
  document.getElementById(id).innerHTML=`<div class="photo-ph editable" style="width:100%;height:100%"><input type="file" accept="image/*" onchange="loadPhoto(this,'${id}','proj')" style="display:block"><svg width="28" height="28" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span>Add photo</span></div><span class="proj-tag-overlay">${tag}</span>`;
}

/* toast */
let tt;
function showToast(msg){
  let t=document.getElementById('toast');
  if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t);}
  t.textContent=msg; t.style.opacity='1';
  clearTimeout(tt); tt=setTimeout(()=>t.style.opacity='0',3000);
}

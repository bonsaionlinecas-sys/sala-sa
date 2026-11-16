const normalize=s=>s.normalize('NFD').replace(/[\u064b-\u065f\u0670]/g,'').replace(/[إأآٱ]/g,'ا').replace(/ى/g,'ي').toLowerCase().trim();
const input=document.querySelector('#library-search'),cards=[...document.querySelectorAll('[data-entry]')],status=document.querySelector('#search-status');
let situation='all';
function filter(){
 const query=normalize(input?.value||'');let visible=0;
 for(const card of cards){const show=(situation==='all'||card.dataset.situation===situation)&&normalize(card.textContent).includes(query);card.hidden=!show;if(show)visible++;}
 status.textContent=visible?'عدد النصوص المعروضة: '+new Intl.NumberFormat('ar-SA').format(visible):'لم يظهر نص مطابق. جرّب كلمة أخرى أو اختر «الكل».';
}
input?.addEventListener('input',filter);
document.querySelectorAll('[data-situation-filter]').forEach(b=>b.addEventListener('click',()=>{
 situation=b.dataset.situationFilter;
 document.querySelectorAll('[data-situation-filter]').forEach(p=>p.setAttribute('aria-pressed',String(p===b)));filter();
}));
let size=1.5;
document.querySelectorAll('[data-font-size]').forEach(b=>b.addEventListener('click',()=>{
 size=Math.max(1.1,Math.min(2.1,size+Number(b.dataset.fontSize)));
 document.documentElement.style.setProperty('--quote-size',size+'rem');
 document.querySelector('#reading-status').textContent='حجم النص: '+Math.round(size/1.5*100)+'٪';
}));
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{
 const area=document.getElementById(b.dataset.copy),result=document.querySelector('#copy-status');
 try{await navigator.clipboard.writeText(area.innerText);result.textContent='نُسخ النص مع مرجعه.';}catch{result.textContent='تعذّر النسخ التلقائي؛ يمكنك تحديد النص ونسخه.';}
}));
document.querySelectorAll('[data-guide-jump]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.guideJump)?.scrollIntoView({behavior:'smooth',block:'start'})));
const checks=[...document.querySelectorAll('.checklist input[type=checkbox]')];
for(const c of checks)c.addEventListener('change',()=>{
 const out=document.querySelector('#checklist-status');
 if(out)out.textContent='راجعت '+new Intl.NumberFormat('ar-SA').format(checks.filter(c=>c.checked).length)+' من '+new Intl.NumberFormat('ar-SA').format(checks.length)+' تذكيرات. هذه متابعة شخصية وليست حكماً على العبادة.';
});
const phases={subhan:0,hamd:0,takbir:0},counter=document.querySelector('#counter-value');
function updateCounter(){
 if(!counter)return;const phase=document.querySelector('#counter-phase').value;
 counter.textContent=phases[phase]+' / 33';
 const total=Object.values(phases).reduce((a,b)=>a+b,0),final=document.querySelector('#counter-final');
 final.disabled=total<99;
 if(total<99)final.checked=false;
 document.querySelector('#counter-status').textContent='المجموع: '+(total+(final.checked?1:0))+' / 100';
}
document.querySelector('#counter-add')?.addEventListener('click',()=>{const p=document.querySelector('#counter-phase').value;phases[p]=Math.min(33,phases[p]+1);updateCounter();});
document.querySelector('#counter-reset')?.addEventListener('click',()=>{for(const p in phases)phases[p]=0;updateCounter();});
document.querySelector('#counter-phase')?.addEventListener('change',updateCounter);
document.querySelector('#counter-final')?.addEventListener('change',updateCounter);
document.querySelector('#print-page')?.addEventListener('click',()=>window.print());
filter();updateCounter();document.querySelectorAll('button, #library-search, #counter-phase').forEach(b=>b.disabled=false);

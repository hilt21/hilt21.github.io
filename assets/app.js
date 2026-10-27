const tools=document.querySelector('.directory-tools');
const rows=[...document.querySelectorAll('.project-row')];
const buttons=[...document.querySelectorAll('[data-filter]')];
const search=document.querySelector('#search');
let selected='all';
function render(){let count=0;const term=search.value.toLowerCase().trim();for(const row of rows){const show=(selected==='all'||row.dataset.category===selected)&&row.dataset.search.includes(term);row.hidden=!show;if(show)count++;}for(const b of buttons){const active=b.dataset.filter===selected;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}document.querySelector('#empty-state').hidden=count>0;document.querySelector('.results').textContent=`显示 ${count} / ${rows.length} 个项目`;}
for(const b of buttons)b.addEventListener('click',()=>{selected=b.dataset.filter;render();});
search.addEventListener('input',render);
document.querySelector('#reset').addEventListener('click',()=>{selected='all';search.value='';render();search.focus();});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){event.preventDefault();search.focus();}if(event.key==='Escape'&&document.activeElement===search){search.value='';render();search.blur();}});
document.querySelector('#back-top').addEventListener('click',event=>{event.preventDefault();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
tools.hidden=false;

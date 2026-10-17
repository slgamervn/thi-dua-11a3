(()=>{'use strict';
const $=id=>document.getElementById(id);
const STORAGE='thi-dua-11a3-demo-v1';
const base=()=>({events:[],scores:{1:350,2:350,3:350,4:350}});
let state;
try{state=JSON.parse(localStorage.getItem(STORAGE))||base()}catch{state=base()}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=()=>{try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch{}};
function toast(s){const el=$('toast');el.textContent=s;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
function weekNo(){const now=new Date(),start=new Date(now.getFullYear(),0,1);return Math.ceil((((now-start)/86400000)+start.getDay()+1)/7)}
function render(){
 const totals={1:350,2:350,3:350,4:350};
 state.events.filter(e=>e.status==='approved').forEach(e=>{totals[e.group]=(totals[e.group]||350)+Number(e.points)});
 const sorted=Object.entries(totals).sort((a,b)=>b[1]-a[1]);
 $('leader').textContent='Tổ '+sorted[0][0];$('leader-score').textContent=sorted[0][1]+' điểm';
 $('pending').textContent=state.events.filter(e=>e.status==='pending').length;
 $('count').textContent=state.events.length;$('week').textContent=weekNo();
 const high=Math.max(350,...Object.values(totals));
 $('ranking').innerHTML=sorted.map(([g,score],i)=>'<div class="rank"><strong>'+(i===0?'★ ':'')+'Tổ '+g+'</strong><span>'+score+' điểm</span><div class="bar"><i style="width:'+Math.max(4,Math.min(100,score/high*100))+'%"></i></div></div>').join('');
 const events=[...state.events].reverse();
 $('events').innerHTML=events.length?events.map(e=>'<article class="event"><div class="event-top"><strong>Tổ '+e.group+' · '+(e.points>0?'+':'')+e.points+' điểm</strong><span class="status '+(e.status==='approved'?'approved':'')+'">'+(e.status==='approved'?'Đã duyệt':e.status==='rejected'?'Từ chối':'Chờ duyệt')+'</span></div><small>'+esc(e.date)+' · '+esc(e.scope==='student'?'Cá nhân (chưa gán học sinh)':'Cả tổ')+'</small><div>'+esc(e.note||e.label)+'</div>'+(e.status==='pending'?'<div class="event-actions"><button data-action="approve" data-id="'+e.id+'">Duyệt</button><button class="reject" data-action="reject" data-id="'+e.id+'">Từ chối</button></div>':'')+'</article>').join(''):'<div class="empty">Chưa có sự kiện nào. Hãy ghi nhận sự kiện đầu tiên.</div>';
}
$('event-form').addEventListener('submit',e=>{e.preventDefault();const group=Number($('group').value),opt=$('criterion').selectedOptions[0],points=Number($('criterion').value),note=$('note').value.trim();state.events.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),group,scope:$('scope').value,points,label:opt.textContent,note,date:new Date().toLocaleDateString('sv-SE'),status:'pending'});save();render();e.target.reset();toast('Đã lưu sự kiện ở trạng thái chờ duyệt.')});
$('events').addEventListener('click',e=>{const b=e.target.closest('button[data-action]');if(!b)return;const item=state.events.find(x=>x.id===b.dataset.id);if(!item||item.status!=='pending')return;if(b.dataset.action==='approve'){item.status='approved';toast('Đã duyệt trong bản nháp.')}else{item.status='rejected';toast('Đã từ chối sự kiện trong bản nháp.')}save();render()});
$('reset').addEventListener('click',()=>{if(!confirm('Xóa toàn bộ sự kiện nháp trên trình duyệt này?'))return;state=base();save();render();toast('Đã xóa dữ liệu nháp.')});
render();
})();
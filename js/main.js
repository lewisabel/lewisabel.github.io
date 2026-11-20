/* ===== Isabel Lew portfolio =====
   Content lives in /data/*.json (see README.md). This file turns that data into the page. */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* icons for project tiles (use the key in projects.json "icon") */
const D={bms:'M25 26h100a5 5 0 0 1 5 5v42a5 5 0 0 1-5 5H25a5 5 0 0 1-5-5V31a5 5 0 0 1 5-5zM38 26V16h14v10M98 26V16h14v10M36 52h18M96 52h18M105 43v18M80 34L66 54H75L70 70L85 49H76Z',rob:'M25 20h100v38H25zM34 66a11 11 0 1 0 22 0a11 11 0 1 0-22 0M94 66a11 11 0 1 0 22 0a11 11 0 1 0-22 0M75 20V6',str:'M10 20h130M10 45h130M10 70h130M30 10v70M60 10v70M90 10v70M120 10v70M20 80l50-40 60-26',ind:'M10 60C10 20 30 20 30 60S50 100 50 60 70 20 70 60 90 100 90 60 110 20 110 60 130 100 130 60',gyr:'M75 11a34 34 0 1 0 .1 0M15 45a60 14 0 1 0 120 0a60 14 0 1 0-120 0M75 5v80',par:'M40 30h56v30H40zM48 30V20h40v10M48 60v10h40V60M104 36c8 3 8 15 0 18M112 30c12 5 12 25 0 30',daq:'M50 20h50v50H50zM12 16h24v14H12zM114 16h24v14h-24zM12 60h24v14H12zM114 60h24v14h-24zM36 23h14M100 23h14M36 67h14M100 67h14',tc:'M62 20a10 10 0 0 1 20 0v30a15 15 0 1 1-20 0zM72 30V58M100 40h40M100 56h40',car:'M20 62h110v8H20zM34 62l12-20h46l18 20M40 72a9 9 0 1 0 18 0a9 9 0 1 0-18 0M92 72a9 9 0 1 0 18 0a9 9 0 1 0-18 0M126 40c8-6 8-16 0-22M136 44c12-8 12-26 0-34',pz:'M75 10v32M62 30l13 13 13-13M20 66h110v8H20zM36 66c10-14 68-14 78 0'};
const sv=(k,w=120)=>`<svg aria-hidden="true" width="${w}" height="${w*.6}" viewBox="0 0 150 90" fill="none" stroke="currentColor" stroke-width="3"><path d="${D[k]}"/></svg>`;
/* bench tools (use the key in bench.json "type") */
const T={
breadboard:"<svg style=\"@@\" width=\"330\" height=\"110\" viewBox=\"0 0 360 120\"><defs><pattern id=\"d\" width=\"12\" height=\"12\" patternUnits=\"userSpaceOnUse\"><circle cx=\"6\" cy=\"6\" r=\"2\" fill=\"#7a735f\"/></pattern></defs><rect x=\"2\" y=\"2\" width=\"356\" height=\"116\" rx=\"6\" fill=\"#ffe9d6\" stroke=\"#111\" stroke-width=\"3\"/><rect x=\"8\" y=\"8\" width=\"344\" height=\"104\" fill=\"url(#d)\"/><rect x=\"8\" y=\"54\" width=\"344\" height=\"12\" fill=\"#d9ccb6\"/><path d=\"M12 14H348\" stroke=\"#d6322b\" stroke-width=\"3\"/><path d=\"M12 106H348\" stroke=\"#1f5fd0\" stroke-width=\"3\"/><path d=\"M60 40C90 10 140 10 170 40\" stroke=\"#2a9d4a\" stroke-width=\"4\" fill=\"none\"/><circle cx=\"250\" cy=\"40\" r=\"9\" fill=\"#ff3b30\"/><path d=\"M200 82H290\" stroke=\"#111\" stroke-width=\"5\"/></svg>",
coin:"<svg style=\"@@\" width=\"60\" height=\"60\" viewBox=\"0 0 60 60\"><circle cx=\"30\" cy=\"30\" r=\"28\" fill=\"#d9dde0\" stroke=\"#111\" stroke-width=\"2\"/><circle cx=\"30\" cy=\"30\" r=\"21\" fill=\"none\" stroke=\"#aab2b8\" stroke-width=\"2\"/><text x=\"30\" y=\"34\" text-anchor=\"middle\" font-family=\"IBM Plex Mono\" font-size=\"9\" fill=\"#333\">CR2032</text></svg>",
cutters:"<svg style=\"@@\" width=\"190\" height=\"80\" viewBox=\"0 0 190 80\"><path d=\"M8 18L100 38V42L8 62\" fill=\"none\" stroke=\"#1f5fd0\" stroke-width=\"12\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M100 36L150 31L162 40L150 49L100 44Z\" fill=\"#aab2b8\" stroke=\"#111\" stroke-width=\"2\"/><circle cx=\"100\" cy=\"40\" r=\"7\" fill=\"#555\"/></svg>",
dcap:"<svg style=\"@@\" width=\"50\" height=\"74\" viewBox=\"0 0 50 74\"><path d=\"M18 42L14 72M32 42L36 72\" stroke=\"#ccc\" stroke-width=\"3\"/><circle cx=\"25\" cy=\"24\" r=\"20\" fill=\"#e8a33a\" stroke=\"#111\" stroke-width=\"2\"/><text x=\"25\" y=\"29\" text-anchor=\"middle\" font-family=\"IBM Plex Mono\" font-size=\"13\" fill=\"#111\">104</text></svg>",
dip:"<svg style=\"@@\" width=\"110\" height=\"54\" viewBox=\"0 0 110 54\"><path d=\"M14 3H96M14 51H96\" stroke=\"#c9d0d6\" stroke-width=\"6\" stroke-dasharray=\"6 14\"/><rect x=\"6\" y=\"8\" width=\"98\" height=\"38\" rx=\"3\" fill=\"#222\" stroke=\"#000\" stroke-width=\"2\"/><path d=\"M6 21a6 6 0 0 1 0 12\" fill=\"none\" stroke=\"#666\" stroke-width=\"2\"/><text x=\"58\" y=\"31\" text-anchor=\"middle\" font-family=\"IBM Plex Mono\" font-size=\"9\" fill=\"#aaa\">SAMD51</text></svg>",
ecap:"<svg style=\"@@\" width=\"46\" height=\"74\" viewBox=\"0 0 46 74\"><path d=\"M15 50V72M31 50V72\" stroke=\"#ccc\" stroke-width=\"3\"/><rect x=\"6\" y=\"8\" width=\"34\" height=\"46\" rx=\"3\" fill=\"#1f5fd0\" stroke=\"#111\" stroke-width=\"2\"/><rect x=\"29\" y=\"10\" width=\"9\" height=\"42\" fill=\"#dfe7f5\"/><path d=\"M30 20h5M30 30h5M30 40h5\" stroke=\"#111\" stroke-width=\"2\"/><ellipse cx=\"23\" cy=\"9\" rx=\"17\" ry=\"5\" fill=\"#c9d0d6\" stroke=\"#111\" stroke-width=\"2\"/></svg>",
esp32:"<svg style=\"@@\" width=\"250\" height=\"100\" viewBox=\"0 0 250 100\"><rect x=\"2\" y=\"2\" width=\"246\" height=\"96\" rx=\"6\" fill=\"#1b2a41\" stroke=\"#111\" stroke-width=\"3\"/><rect x=\"60\" y=\"20\" width=\"110\" height=\"60\" fill=\"#c9d0d6\" stroke=\"#111\" stroke-width=\"2\"/><text x=\"115\" y=\"54\" text-anchor=\"middle\" font-family=\"VT323,IBM Plex Mono,monospace\" font-size=\"13\" letter-spacing=\"1\" fill=\"#6b7680\">ESP32</text><path d=\"M178 36h10v12h10V36h10v12h10V36h10\" stroke=\"#e0b050\" fill=\"none\" stroke-width=\"3\"/><rect x=\"-4\" y=\"38\" width=\"24\" height=\"24\" fill=\"#aab2b8\" stroke=\"#111\" stroke-width=\"2\"/><path d=\"M28 9H236M28 91H236\" stroke=\"#e0b050\" stroke-width=\"6\" stroke-dasharray=\"4 6\"/></svg>",
jumpers:"<svg style=\"@@\" width=\"150\" height=\"64\" viewBox=\"0 0 150 64\"><path d=\"M5 12C45 12 40 48 80 48S120 12 145 20\" fill=\"none\" stroke=\"#d6322b\" stroke-width=\"4\" stroke-linecap=\"round\"/><path d=\"M5 30C45 30 50 58 90 54S125 24 145 36\" fill=\"none\" stroke=\"#ffd84d\" stroke-width=\"4\" stroke-linecap=\"round\"/></svg>",
multimeter:"<svg style=\"@@\" width=\"76\" height=\"104\" viewBox=\"0 0 76 104\"><rect x=\"2\" y=\"2\" width=\"72\" height=\"100\" rx=\"10\" fill=\"#ffc21a\" stroke=\"#111\" stroke-width=\"3\"/><rect x=\"8\" y=\"8\" width=\"60\" height=\"26\" rx=\"3\" fill=\"#2a2a2a\"/><rect x=\"11\" y=\"11\" width=\"54\" height=\"20\" fill=\"#c3d1a8\"/><text x=\"62\" y=\"28\" text-anchor=\"end\" font-family=\"VT323,IBM Plex Mono,monospace\" font-size=\"20\" fill=\"#222\">0.00</text><circle cx=\"38\" cy=\"62\" r=\"23\" fill=\"none\" stroke=\"#111\" stroke-width=\"3\" stroke-dasharray=\"2 7\"/><circle cx=\"38\" cy=\"62\" r=\"18\" fill=\"#2a2a2a\" stroke=\"#111\" stroke-width=\"2\"/><circle cx=\"38\" cy=\"62\" r=\"10\" fill=\"#444\"/><path d=\"M38 62V49\" stroke=\"#ffc21a\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"18\" cy=\"92\" r=\"5\" fill=\"#111\" stroke=\"#fff\" stroke-width=\"1.5\"/><circle cx=\"38\" cy=\"92\" r=\"5\" fill=\"#111\" stroke=\"#d6322b\" stroke-width=\"1.5\"/><circle cx=\"58\" cy=\"92\" r=\"5\" fill=\"#111\" stroke=\"#fff\" stroke-width=\"1.5\"/></svg>",
pliers:"<svg style=\"@@\" width=\"190\" height=\"80\" viewBox=\"0 0 200 80\"><path d=\"M8 18L100 38V42L8 62\" fill=\"none\" stroke=\"#d6322b\" stroke-width=\"12\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M100 36L172 30L190 40L172 50L100 44Z\" fill=\"#aab2b8\" stroke=\"#111\" stroke-width=\"2\"/><circle cx=\"100\" cy=\"40\" r=\"7\" fill=\"#555\"/></svg>",
screwdriver:"<svg style=\"@@\" width=\"190\" height=\"40\" viewBox=\"0 0 190 40\"><rect x=\"2\" y=\"6\" width=\"70\" height=\"28\" rx=\"12\" fill=\"#f2b705\" stroke=\"#111\" stroke-width=\"2\"/><rect x=\"72\" y=\"17\" width=\"110\" height=\"6\" fill=\"#c8ced3\" stroke=\"#111\" stroke-width=\"2\"/></svg>",
spool:"<svg style=\"@@\" width=\"80\" height=\"80\" viewBox=\"0 0 80 80\"><circle cx=\"40\" cy=\"40\" r=\"38\" fill=\"#c9d0d6\" stroke=\"#111\" stroke-width=\"2\"/><circle cx=\"40\" cy=\"40\" r=\"28\" fill=\"#9aa3ab\" stroke=\"#111\" stroke-width=\"2\"/><circle cx=\"40\" cy=\"40\" r=\"28\" fill=\"none\" stroke=\"#d9dde0\" stroke-width=\"3\" stroke-dasharray=\"3 5\"/><circle cx=\"40\" cy=\"40\" r=\"9\" fill=\"#ffe9d6\" stroke=\"#111\" stroke-width=\"2\"/></svg>",
tweezers:"<svg style=\"@@\" width=\"160\" height=\"30\" viewBox=\"0 0 160 30\"><path d=\"M2 6L152 14M2 22L152 16\" stroke=\"#aab2b8\" stroke-width=\"4\" stroke-linecap=\"round\"/><path d=\"M2 6V22\" stroke=\"#6b7680\" stroke-width=\"5\" stroke-linecap=\"round\"/></svg>"};
function tool(o){
 const pos=(o.left!=null?'left:'+o.left+'%':'right:'+(o.right||0)+'%')+';top:'+o.y+'%;transform:rotate('+(o.rotate||0)+'deg)';
 if(o.type==='ruler')return `<div style="${pos};width:340px;height:44px;background:#ffcc1f;border:2px solid #111;background-image:repeating-linear-gradient(90deg,#111 0 2px,transparent 2px 10px);background-size:100% 14px;background-repeat:repeat-x"></div>`;
 if(o.type==='resistor'){const b=o.bands||['#8b4513','#111','#d6322b','#d4af37'];return `<svg style="${pos}" width="90" height="30" viewBox="0 0 90 30"><path d="M0 15H20M70 15H90" stroke="#ccc" stroke-width="3"/><rect x="20" y="4" width="50" height="22" rx="10" fill="#e4c99a" stroke="#111" stroke-width="2"/>${[30,38,46,58].map((x,i)=>`<path d="M${x} 4V26" stroke="${esc(b[i]||'#111')}" stroke-width="4"/>`).join('')}</svg>`}
 if(o.type==='led'){const c=esc(o.color||'#ff3b30');return `<svg style="${pos}" width="40" height="70" viewBox="0 0 40 70"><path d="M14 44V68M26 44V62" stroke="#ccc" stroke-width="3"/><path d="M8 44V22a12 12 0 0 1 24 0V44Z" fill="${c}" stroke="#111" stroke-width="2"/><rect x="5" y="42" width="30" height="5" rx="2" fill="${c}" stroke="#111" stroke-width="2"/><path d="M14 26V18" stroke="#fff" stroke-width="3" opacity=".6" stroke-linecap="round"/></svg>`}
 if(!T[o.type]){console.warn('bench.json: unknown type "'+o.type+'"');return ''}
 return T[o.type].replace('@@',pos);
}
/* data loading */
const jget=async f=>{const r=await fetch('data/'+f,{cache:'no-cache'});if(!r.ok)throw new Error('HTTP '+r.status);return r.json()};
const oops=(box,f,e)=>{console.error(f,e);box.insertAdjacentHTML('afterbegin',`<p class="err">Couldn’t load <b>data/${esc(f)}</b> (${esc(e.message)}). If you opened index.html straight from your computer, run a local server instead (see README.md).</p>`)};
const load=(f,fn,box)=>jget(f).then(fn).catch(e=>oops(box,f,e));
/* projects: tiles are laid out automatically in staggered rows of 3, 2, 3, 2... */
let P=[];
const lbl=p=>p.status==='soon'?'Coming soon':(p.skills&&p.skills.length?p.skills.join(' / '):'Details coming soon');
function card(p,i,x,y,a,t){const l=esc(lbl(p)).toUpperCase(),n=String(i+1).padStart(2,'0');
 return `<button type="button" class="card" data-i="${i}" style="--r:${t}deg;--x:${x}%;--y:${y}px;--rot:${a}deg" aria-label="${esc(p.title)}. Open project details"><span class="in"><span class="f${p.status==='soon'?' s':''}"><span class="m">${n} · ${l}</span>${sv(p.icon)}<b>${esc(p.title)}</b></span><span class="b"><span class="m" style="color:#1d6a50">${n} · ${l}</span><span>${esc(p.blurb)}</span><i>Open project +</i></span></span></button>`}
function renderProjects(list){
 P=list;const rows=[[5,37.5,70],[21,54.5]],jit=[[0,55,5],[0,-10]],rot=[-5,3,5,4,-4,-3,2,4,-4,3],tilt=[-1.5,1.5,-1,2,-2,1,-1.5,2,-1,1.5];
 let i=0,r=0,maxY=0,html='';
 while(i<P.length){rows[r%2].forEach((x,c)=>{const p=P[i];if(!p)return;
  const X=p.x??x,Y=p.y??10+r*315+jit[r%2][c],A=p.rotate??rot[i%rot.length];
  maxY=Math.max(maxY,Y);html+=card(p,i,X,Y,A,tilt[i%tilt.length]);i++});r++}
 $('#cd').innerHTML=html;$('.bench').style.setProperty('--bh',(maxY+250)+'px')}
/* fun page */
const pol=h=>`<button type="button" class="pol" style="--r:${h.rotate||0}deg;--tp:${esc(h.color||'#ff7a3d')}"><span class="in"><span class="f"><span class="ph m">${h.image?'[PHOTO]<img src="'+esc(h.image)+'" alt="'+esc(h.title)+'" onerror="this.remove()">':'photo coming soon'}</span><span class="hw" style="font-size:24px;line-height:1">${esc(h.title)}</span></span><span class="b hw" style="font-size:${(h.story||'').length>100?18:21}px;line-height:1.05">${esc(h.story)}<br><span class="m" style="font-size:11px">${esc(h.when).toUpperCase()}</span></span></span></button>`;
function renderFun(f){const n=f.split??2,L=f.polaroids||[];
 $('#p1').innerHTML=L.slice(0,n).map(pol).join('');$('#p2').innerHTML=L.slice(n).map(pol).join('');
 $('#idx').innerHTML='<b>currently:</b>'+(f.currently||[]).map(c=>'<br>'+esc(c.label)+': '+esc(c.value)).join('');
 $('#tk').innerHTML='ADMIT ONE<br>'+esc(f.ticket);$('#sn').textContent='fun fact: '+f.funFact}
/* about page notes */
function renderAbout(list){$('#notes').innerHTML=list.map(n=>`<div class="n${n.wide?' w2':''}" style="--r:${n.rotate||0}deg;--nb:${esc(n.color||'#ffe27a')};--pin:${esc(n.pin||'#d6322b')}"><h3${n.wide?' style="font-size:26px"':''}>${esc(n.title)}</h3>${n.text?esc(n.text):''}${n.items?'<ul>'+n.items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':''}</div>`).join('')}
/* contact + resume path */
function renderSite(s){if(s.resume)RES=s.resume;
 $('#nm').innerHTML=esc(s.name).split(' ').join('<br>');$('#sb').textContent=s.subtitle;$('#em').textContent=s.email;
 const g=$('#gh'),l=$('#li'),bare=u=>u.replace(/^https?:\/\//,'');
 g.href=s.github;g.textContent='GITHUB ↗ '+bare(s.github);l.href=s.linkedin;l.textContent='LINKEDIN ↗ '+bare(s.linkedin)}
/* modal */
let last;const md=$('#md');
let RES='assets/Isabel_Lew_Resume_2028.pdf',PJ='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';let pj;
const loadPJ=()=>pj||(pj=new Promise((ok,no)=>{const s=document.createElement('script');s.src=PJ+'pdf.min.js';s.onload=()=>{pdfjsLib.GlobalWorkerOptions.workerSrc=PJ+'pdf.worker.min.js';ok(pdfjsLib)};s.onerror=no;document.head.appendChild(s)}));
async function showPDF(box){try{const doc=await(await loadPJ()).getDocument(RES).promise;const w=box.clientWidth||600,r=devicePixelRatio||1;box.textContent='';for(let n=1;n<=doc.numPages;n++){const pg=await doc.getPage(n),sc=w/pg.getViewport({scale:1}).width,vp=pg.getViewport({scale:sc*r}),cv=document.createElement('canvas');cv.width=vp.width;cv.height=vp.height;cv.setAttribute('role','img');cv.setAttribute('aria-label','Resume, page '+n);box.appendChild(cv);await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise}}catch(e){box.innerHTML='<p class="m" style="padding:24px">Couldn’t load the preview. Use the buttons above to download or open the resume.</p>'}}
function open(i){last=document.activeElement;const p=P[i];
 if(p){const ic=sv(p.icon,220);$('#ma').innerHTML=p.image?`<img src="${esc(p.image)}" alt="${esc(p.alt||p.title)}">`:ic;if(p.image)$('#ma img').addEventListener('error',()=>{$('#ma').innerHTML=ic});
  $('#mg').textContent=(p.company||(p.status==='soon'?'Coming soon':'')).toUpperCase();$('#mt').textContent=p.title;
  $('#mb').innerHTML=`<p>${esc(p.description)}</p>`+((p.bullets||[]).length?`<ul>${p.bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'')}
 else{$('#ma').innerHTML='';$('#mg').textContent='RESUME · PDF';$('#mt').textContent='Isabel Lew';$('#mb').innerHTML=`<div class="acts"><a class="btn" href="${RES}" download>Download PDF</a><a class="btn l" href="${RES}" target="_blank" rel="noopener">Open in new tab</a></div><div class="doc"><div class="sheet" id="sh"><p class="m" style="padding:24px">Loading resume...</p></div></div>`}
 $('.pn').classList.toggle('rs',!p);
 md.hidden=false;$('#mx').focus();if(!p)showPDF($('#sh'))}
function shut(){md.hidden=true;$('#mb').innerHTML='';if(last)last.focus()}
$('#cd').onclick=e=>{const c=e.target.closest('.card');if(c)open(+c.dataset.i)};
['#rs','#rs2','#rs3'].forEach(s=>$(s).onclick=()=>open(-1));
$('#mx').onclick=shut;md.onclick=e=>{if(e.target===md)shut()};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!md.hidden)shut()});
/* contact */
$('#cp').onclick=async()=>{try{await navigator.clipboard.writeText($('#em').textContent);$('#ok').textContent='· copied!'}catch(e){$('#ok').textContent='· press and hold to copy'}};
/* go! */
load('projects.json',renderProjects,$('#v-portfolio'));
load('bench.json',b=>{$('#tools').innerHTML=b.map(tool).join('')},$('#v-portfolio'));
load('fun.json',renderFun,$('#v-fun'));
load('about.json',renderAbout,$('#v-about'));
load('site.json',renderSite,$('#v-contact'));
/* router */
const V=['portfolio','about','fun','contact'];
function route(){let h=location.hash.slice(1);if(!V.includes(h))h='portfolio';document.body.dataset.v=h;V.forEach(v=>$('#v-'+v).classList.toggle('on',v===h));$$('header a[data-v]').forEach(a=>a.dataset.v===h?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));scrollTo(0,0)}
addEventListener('hashchange',route);route();
/* loader */
const ld=$('#ld');try{if(sessionStorage.getItem('ld'))ld.hidden=true}catch(e){}
if(!ld.hidden){let n=0;const iv=setInterval(()=>{n=Math.min(100,n+Math.ceil(Math.random()*7));$('#pc').textContent=n;$('#bar').style.width=n+'%';if(n>=100){clearInterval(iv);$('#go').hidden=false;$('#go').focus()}},90)}
$('#go').onclick=()=>{ld.hidden=true;try{sessionStorage.setItem('ld','1')}catch(e){}};

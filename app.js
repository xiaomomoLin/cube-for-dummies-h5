/* 三阶魔方浏览器界面。GPL-3.0-or-later. */
(()=>{
  'use strict';
  const C=Cube3,$=id=>document.getElementById(id),storageKey='cube-studio-three-v1';
  let values=Object.fromEntries([...C.FACES].map(f=>[f,'????'+C.DEFAULT[f]+'????']));
  let brush='W',tokens=[],states=[],centers={...C.DEFAULT},step=0,worker=null,workerURL=null,timer=null,busy=false;
  const colorName=c=>C.COLORS[c]?.name||'待填';
  const dot=c=>`<i class="color-dot" style="background:${C.COLORS[c]?.hex||'#eee'}"></i>`;
  function status(message,type=''){$('status').textContent=message;$('status').className='status '+type;}
  function persist(){try{localStorage.setItem(storageKey,JSON.stringify(values));}catch{/* 本地文件或隐私模式可以禁用存储，页面仍可使用。 */}}
  function validObject(data){return data&&typeof data==='object'&&!Array.isArray(data)&&[...C.FACES].every(f=>typeof data[f]==='string'&&data[f].length<200);}
  function switchTab(which){const guide=which==='guide';$('input-panel').hidden=guide;$('guide-panel').hidden=!guide;for(const id of ['input','guide']){$('tab-'+id).classList.toggle('active',id===which);$('tab-'+id).setAttribute('aria-selected',String(id===which));}}
  function releaseWorker(){if(worker)worker.terminate();worker=null;if(workerURL)URL.revokeObjectURL(workerURL);workerURL=null;clearTimeout(timer);timer=null;}
  function setBusy(value){busy=value;$('solve').disabled=value;$('solve').textContent=value?'正在计算，请稍候…':'计算复原步骤 →';$('cancel').hidden=!value;document.querySelectorAll('#faces button,#faces input,#palette button,#demo,#save,#load,#clear').forEach(el=>el.disabled=value);}
  function invalidate(){releaseWorker();setBusy(false);tokens=[];states=[];step=0;$('step-badge').textContent='';$('guide-content').hidden=true;$('empty-guide').hidden=false;}
  function changed(message='配色已修改，请核对后计算。'){invalidate();refreshInput();persist();status(message);}
  function buildInput(){
    for(const [code,color]of Object.entries(C.COLORS)){
      const b=document.createElement('button');b.type='button';b.className='paint';b.textContent=color.name;b.style.background=color.hex;b.setAttribute('aria-label','画笔：'+color.name+'色');b.setAttribute('aria-pressed',String(code===brush));
      b.onclick=()=>{brush=code;document.querySelectorAll('.paint').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));};$('palette').append(b);
    }
    for(const f of C.FACES){
      const card=document.createElement('article');card.className='face-card';
      card.innerHTML=`<h2 class="face-title"><span id="title-${f}"></span><span class="face-id">${C.NAMES[f]}面 ${f}</span></h2><p class="orientation" id="orientation-${f}"></p><div class="cube-grid" id="input-grid-${f}"></div><input id="input-${f}" class="face-input" type="text" maxlength="100" spellcheck="false" aria-label="${C.NAMES[f]}面九格颜色" placeholder="输入九格颜色"><div class="rotate-row"><button type="button" id="rotate-left-${f}" title="只旋转录入图案，不是拧实物">↶ 图案左转</button><button type="button" id="rotate-right-${f}" title="只旋转录入图案，不是拧实物">图案右转 ↷</button></div>`;
      $('faces').append(card);
      for(let i=0;i<9;i++){
        const b=document.createElement('button');b.type='button';b.className='sticker';b.setAttribute('aria-label',`${C.NAMES[f]}面第${Math.floor(i/3)+1}排第${i%3+1}格${i===4?'中心':''}`);
        b.onclick=()=>{const a=C.normalize(values[f]).padEnd(9,'?').slice(0,9).split('');a[i]=brush;values[f]=a.join('');$('input-'+f).value=readable(values[f]);changed();};$('input-grid-'+f).append(b);
      }
      $('input-'+f).oninput=e=>{values[f]=e.target.value;changed();};
      for(const [name,n]of [['left',3],['right',1]])$('rotate-'+name+'-'+f).onclick=()=>{try{let v=values[f];for(let i=0;i<n;i++)v=C.rotateFace(v);values[f]=v;syncEntries();changed('已旋转录入图案。请确认与实物的拿法一致。');}catch(e){status(e.message,'error');}};
    }
  }
  function readable(raw){return [...C.normalize(raw)].map(c=>C.COLORS[c]?.name||c).join('');}
  function syncEntries(){for(const f of C.FACES)$('input-'+f).value=readable(values[f]);}
  function refreshInput(){
    const current=C.centersOf(values),all=Object.values(values).map(C.normalize).join('');
    for(const f of C.FACES){
      const a=C.normalize(values[f]),o=C.orientation(f,current);
      $('title-'+f).textContent=colorName(current[f])+'色中心正对你';
      $('orientation-'+f).innerHTML=`<strong>上方 ${colorName(o.up)}色中心</strong><br>左 ${colorName(o.left)} · 右 ${colorName(o.right)}<br>下 ${colorName(o.down)} · 背面 ${colorName(o.back)}`;
      [...$('input-grid-'+f).children].forEach((b,i)=>{const c=a[i];b.style.background=C.COLORS[c]?.hex||'#efefe8';b.classList.toggle('unknown',!C.COLORS[c]);b.textContent=C.COLORS[c]?.name||'?';if(i===4){const small=document.createElement('small');small.textContent='中心';b.append(small);}b.title=`${C.NAMES[f]}面第${Math.floor(i/3)+1}排第${i%3+1}格：${colorName(c)}`;});
    }
    const validCenters=Object.values(current).every(c=>C.COLORS[c])&&new Set(Object.values(current)).size===6;
    const o=C.orientation('F',current);
    $('setup').textContent=validCenters?`起始拿法：${colorName(o.front)}色中心朝前，${colorName(o.up)}色中心朝上。左${colorName(o.left)}、右${colorName(o.right)}、下${colorName(o.down)}、背面${colorName(o.back)}。`:'请先设置六个不同的中心颜色，方向提示会自动更新。';
    $('counts').innerHTML=Object.keys(C.COLORS).map(c=>{const n=[...all].filter(x=>x===c).length;return `<div class="count ${n>9?'over':''}">${dot(c)} ${colorName(c)} ${n}/9</div>`;}).join('');
  }
  function drawGrid(container,state,f,{target=null,active=null}={}){
    container.replaceChildren();const indices=target?C.cornerLocation(state,target).indices:[],a=C.face(state,f);
    for(let i=0;i<9;i++){
      const cell=document.createElement('div'),index=C.FACES.indexOf(f)*9+i,c=centers[a[i]];cell.className='sticker';cell.style.background=C.COLORS[c].hex;cell.textContent=colorName(c);
      if(indices.includes(index)){const star=document.createElement('span');star.className='star';star.textContent='★';cell.append(star);}
      cell.setAttribute('aria-label',`${C.NAMES[f]}面第${Math.floor(i/3)+1}排第${i%3+1}格：${colorName(c)}${indices.includes(index)?'，跟踪角块':''}`);
      if(active&&C.dot(C.geometry[index].p,C.NORMAL[active])===1)cell.classList.add('affected');
      container.append(cell);
    }
  }
  function renderGuide(){
    if(!states.length)return;
    const done=step===tokens.length,token=tokens[step],before=states[step],after=done?before:states[step+1],target=$('corner-select').value||'URF';
    $('empty-guide').hidden=true;$('guide-content').hidden=false;
    const o=C.orientation('F',centers);
    $('hold').textContent=`${colorName(o.front)}色中心朝前，${colorName(o.up)}色中心朝上`;
    $('hold-sides').textContent=`左${colorName(o.left)} · 右${colorName(o.right)} · 下${colorName(o.down)} · 背面${colorName(o.back)}`;
    $('progress-text').textContent=done?'已完成 / '+tokens.length+' 步':`第 ${step+1} 步 / 共 ${tokens.length} 步`;
    $('notation').textContent=done?'✓':token;$('progress-fill').style.width=(tokens.length?step/tokens.length*100:100)+'%';
    if(done){$('move-title').textContent=tokens.length?'复原完成。':'魔方已经复原。';$('move-detail').textContent='六个面现在应当各自同色。';$('move-layer').textContent='可以回看步骤，观察角块是如何移动的。';$('move-note').textContent='回看只切换画面，不会撤销实物上的转动。';}
    else{const ins=C.instruction(token,centers);$('move-title').textContent=ins.title;$('move-detail').textContent=ins.detail;$('move-layer').textContent=ins.layer;$('move-note').textContent=ins.note;}
    drawGrid($('before-grid'),before,'F',{target,active:token?.[0]});drawGrid($('after-grid'),after,'F',{target});
    const observation=C.observe(before,after,target,centers);
    $('corner-home').textContent=observation.target;$('corner-route').textContent=observation.from+' → '+observation.to;$('corner-facing').textContent=observation.facing;$('corner-status').textContent=observation.status;
    $('prev').disabled=step===0;$('next').disabled=done;$('next').textContent=done?'六面已复原 ✓':step===tokens.length-1?'已拧完，核对完成 ✓':'已拧完并核对一致 →';
    $('net').replaceChildren();const locations={U:[2,1],L:[1,2],F:[2,2],R:[3,2],B:[4,2],D:[2,3]};
    for(const f of C.FACES){const box=document.createElement('div');box.className='net-face';box.style.gridColumn=locations[f][0];box.style.gridRow=locations[f][1];const label=document.createElement('p');label.className='net-label';label.textContent=`${C.NAMES[f]} ${f} · ${colorName(centers[f])}中心`;const grid=document.createElement('div');grid.className='cube-grid';drawGrid(grid,after,f,{target});box.append(label,grid);$('net').append(box);}
  }
  function start(){
    if(busy)return;
    let parsed;try{parsed=C.validate(values);}catch(e){status(e.message,'error');return;}
    invalidate();centers=parsed.centers;const initial=parsed.state;
    function accept(result){
      try{
        if(!Array.isArray(result)||result.length>100)throw Error('求解结果格式不正确。');
        const replay=[initial];for(const token of result)replay.push(C.move(replay.at(-1),token));
        if(replay.at(-1)!==C.SOLVED)throw Error('求解步骤未通过独立配色模拟校验，已停止。');
        tokens=result;states=replay;step=0;$('step-badge').textContent=tokens.length?'· '+tokens.length+'步':'· 已复原';
        $('corner-select').replaceChildren();for(const target of Object.keys(C.CORNERS)){const option=document.createElement('option');option.value=target;option.textContent=[...target].map(f=>colorName(centers[f])).join(' / ')+'角块';$('corner-select').append(option);}
        renderGuide();switchTab('guide');status(`已完成计算，共 ${tokens.length} 步；全部步骤已验证能复原六面。`);window.scrollTo({top:0,behavior:'smooth'});
      }catch(e){status(e.message,'error');}finally{releaseWorker();setBusy(false);}
    }
    if(initial===C.SOLVED){accept([]);return;}
    try{
      setBusy(true);status('正在浏览器内计算复原步骤。首次计算需要初始化，请稍候……','busy');
      if(typeof SOLVER_SOURCE!=='string')throw Error('求解文件缺失。请将 index.html、core.js、app.js、style.css、solver-source.js 放在同一个文件夹。');
      workerURL=URL.createObjectURL(new Blob([SOLVER_SOURCE],{type:'text/javascript'}));worker=new Worker(workerURL);
      worker.onmessage=e=>{if(e.data.error){status(e.data.error,'error');releaseWorker();setBusy(false);}else accept(e.data.tokens);};
      worker.onerror=e=>{status('求解器加载失败：'+(e.message||'请使用 Edge 或 Chrome 打开 index.html。'),'error');releaseWorker();setBusy(false);};
      worker.postMessage({state:initial});timer=setTimeout(()=>{releaseWorker();setBusy(false);status('计算超过两分钟，已停止。请检查配色，也可以重新尝试。','error');},120000);
    }catch(e){releaseWorker();setBusy(false);status(e.message,'error');}
  }
  function download(text,name,type){const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
  function gridText(state,f){const a=[...C.face(state,f)].map(x=>colorName(centers[x]));return [0,3,6].map(i=>a.slice(i,i+3).join(' ')).join('\n');}
  function exportGuide(){
    if(!states.length)return;const target=$('corner-select').value;
    const lines=['三阶魔方 · 固定视角复原指导',`全程保持${colorName(centers.F)}色中心朝前、${colorName(centers.U)}色中心朝上。只拧层，不转整个魔方。`,'整体求解算法不保证逐角归位；角块跟踪供观察。',''];
    tokens.forEach((t,i)=>{const ins=C.instruction(t,centers),o=C.observe(states[i],states[i+1],target,centers);lines.push(`第 ${i+1}/${tokens.length} 步 · ${t}`,ins.title+'（'+ins.layer+'）',ins.detail,ins.note,'操作前（固定正面）：',gridText(states[i],'F'),'操作后（固定正面）：',gridText(states[i+1],'F'),`所选角块：${o.from} → ${o.to}；目标 ${o.target}；${o.status}；${o.facing}`,'操作后六面（各面读图方向同录入时）：',...[...C.FACES].map(f=>`${C.NAMES[f]}面，上方是${colorName(centers[C.TOP[f]])}色中心：\n${gridText(states[i+1],f)}`),'');});
    lines.push('复原完成：六面各自同色。');download('\ufeff'+lines.join('\n'),'三阶魔方复原步骤.txt','text/plain;charset=utf-8');
  }
  buildInput();
  try{const saved=JSON.parse(localStorage.getItem(storageKey));if(validObject(saved)){values=Object.fromEntries([...C.FACES].map(f=>[f,saved[f]]));status('已恢复上次录入的配色。请确认与当前实物一致，再计算。');}}catch{}
  syncEntries();refreshInput();
  $('tab-input').onclick=()=>switchTab('input');$('tab-guide').onclick=()=>switchTab('guide');$('back-input').onclick=()=>switchTab('input');
  $('solve').onclick=start;$('cancel').onclick=()=>{releaseWorker();setBusy(false);status('计算已停止，可以修改配色或重新计算。');};
  $('demo').onclick=()=>{const s=C.apply(C.SOLVED,"R U F2 L' D B R2 U' F D2".split(' '));values=C.colorFaces(s,C.DEFAULT);syncEntries();changed('已载入演示打乱，仅供体验。真实魔方请录入真实配色。');};
  $('clear').onclick=()=>{const c=C.centersOf(values);values=Object.fromEntries([...C.FACES].map(f=>[f,'????'+(C.COLORS[c[f]]?c[f]:C.DEFAULT[f])+'????']));syncEntries();changed('已清空其余色块，保留中心颜色。');};
  $('save').onclick=()=>download(JSON.stringify(Object.fromEntries([...C.FACES].map(f=>[f,readable(values[f])])),null,2),'魔方配色.json','application/json');
  $('load').onclick=()=>$('file-input').click();$('file-input').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>20000)throw Error('配色文件过大，请选择本程序导出的 JSON 文件。');const data=JSON.parse((await file.text()).replace(/^\ufeff/,''));if(!validObject(data))throw Error('JSON 应包含 U R F D L B 六个配色字符串。');values=Object.fromEntries([...C.FACES].map(f=>[f,data[f]]));syncEntries();changed('配色已加载（兼容 Python 版 JSON），请核对后计算。');}catch(error){status('加载失败：'+error.message,'error');}e.target.value='';};
  $('prev').onclick=()=>{if(step>0){step--;renderGuide();}};$('next').onclick=()=>{if(step<tokens.length){step++;renderGuide();}};
  $('corner-select').onchange=renderGuide;$('export').onclick=exportGuide;
  window.addEventListener('beforeunload',releaseWorker);
})();

/* 三阶魔方贴纸模型、配色解析和固定视角指导。GPL-3.0-or-later. */
(function(root){
  'use strict';
  const t=(key,...args)=>root.CubeI18n?root.CubeI18n.t(key,...args):key.replace(/\{(\d+)\}/g,(_,i)=>args[i]);
  const FACES='URFDLB',NAMES={U:'上',R:'右',F:'前',D:'下',L:'左',B:'后'};
  const COLORS={W:{name:'白',hex:'#fafaf7'},R:{name:'红',hex:'#e77969'},G:{name:'绿',hex:'#58b792'},Y:{name:'黄',hex:'#f2d269'},O:{name:'橙',hex:'#efa45d'},B:{name:'蓝',hex:'#7aa9df'}};
  const DEFAULT={U:'W',R:'R',F:'G',D:'Y',L:'O',B:'B'},TOP={U:'B',R:'U',F:'U',D:'F',L:'U',B:'U'};
  const NORMAL={U:[0,1,0],R:[1,0,0],F:[0,0,1],D:[0,-1,0],L:[-1,0,0],B:[0,0,-1]};
  const RIGHT={U:[1,0,0],R:[0,0,-1],F:[1,0,0],D:[1,0,0],L:[0,0,1],B:[-1,0,0]};
  const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const clockwise=(v,a)=>{const c=cross(a,v),d=dot(a,v);return a.map((x,i)=>x*d-c[i]);};
  const geometry=[];
  for(const f of FACES)for(let row=0;row<3;row++)for(let col=0;col<3;col++){
    geometry.push({f,row,col,n:NORMAL[f],p:NORMAL[f].map((x,i)=>x+(col-1)*RIGHT[f][i]+(1-row)*NORMAL[TOP[f]][i])});
  }
  const key=(p,n)=>p.join(',')+'|'+n.join(',');
  const lookup=new Map(geometry.map((g,i)=>[key(g.p,g.n),i]));
  const SOLVED=[...FACES].map(f=>f.repeat(9)).join(''),cache=new Map();
  function parseMove(token){const m=/^([URFDLB])(2|')?$/.exec(token);if(!m)throw Error(t('未知转动：')+token);return {f:m[1],turns:m[2]==='2'?2:m[2]==="'"?3:1};}
  function permutation(token){
    if(cache.has(token))return cache.get(token);
    const {f,turns}=parseMove(token),axis=NORMAL[f];
    const perm=geometry.map((g,i)=>{let p=g.p,n=g.n;if(dot(p,axis)===1)for(let t=0;t<turns;t++){p=clockwise(p,axis);n=clockwise(n,axis);}return lookup.get(key(p,n));});
    cache.set(token,perm);return perm;
  }
  function move(state,token){if(state.length!==54)throw Error(t('魔方需要 54 个色块。'));const out=[];permutation(token).forEach((d,i)=>out[d]=state[i]);return out.join('');}
  function apply(state,tokens){return tokens.reduce((s,t)=>move(s,t),state);}
  function face(state,f){return state.slice(FACES.indexOf(f)*9,FACES.indexOf(f)*9+9);}
  function normalize(raw){const aliases=Object.fromEntries(Object.entries(COLORS).map(([k,v])=>[v.name,k]));return [...raw.toUpperCase().replace(/[\s,，;；/|]/g,'')].map(c=>aliases[c]||c).join('');}
  function centersOf(values){return Object.fromEntries([...FACES].map(f=>[f,normalize(values[f]||'')[4]||'?']));}
  function validate(values){
    const norm={};for(const f of FACES){norm[f]=normalize(values[f]||'');if(norm[f].length!==9||[...norm[f]].some(c=>!COLORS[c]))throw Error(t("{0}面需要 9 个颜色，可用汉字或 W R G Y O B。",t(NAMES[f])));}
    const centers=centersOf(norm);if(new Set(Object.values(centers)).size!==6)throw Error(t('六个面的中心颜色必须互不相同。'));
    const all=Object.values(norm).join(''),counts=Object.fromEntries(Object.keys(COLORS).map(c=>[c,[...all].filter(x=>x===c).length]));
    if(Object.values(counts).some(n=>n!==9))throw Error(t('每种颜色应有 9 格。当前：')+Object.entries(counts).map(([c,n])=>t(COLORS[c].name)+' '+n+t('格')).join('，'));
    const reverse=Object.fromEntries(Object.entries(centers).map(([f,c])=>[c,f]));
    return {state:[...FACES].map(f=>[...norm[f]].map(c=>reverse[c]).join('')).join(''),centers};
  }
  function orientation(f,centers){
    const neg=v=>v.map(x=>-x),faceOf=v=>[...FACES].find(x=>NORMAL[x].join()===v.join());
    return Object.fromEntries(Object.entries({front:NORMAL[f],up:NORMAL[TOP[f]],left:neg(RIGHT[f]),right:RIGHT[f],down:neg(NORMAL[TOP[f]]),back:neg(NORMAL[f])}).map(([k,v])=>[k,centers[faceOf(v)]]));
  }
  function instruction(token,centers){
    const {f,turns}=parseMove(token),directions={R:[t('正面最右列向上翻'),t('正面最右列向下翻')],L:[t('正面最左列向下翻'),t('正面最左列向上翻')],U:[t('正面最上排向左移'),t('正面最上排向右移')],D:[t('正面最下排向右移'),t('正面最下排向左移')],F:[t('正面顺时针转，顶边向右'),t('正面逆时针转，顶边向左')],B:[t('后层顶边向你的左手侧移动'),t('后层顶边向你的右手侧移动')]};
    return {title:t("只拧{0}层 · {1}",t(NAMES[f]),turns===2?'180°':'90°'),detail:directions[f][turns===3?1:0]+(turns===2?t('，连续转两次四分之一圈。'):t('，转四分之一圈。')),layer:t("{0}色中心所在的最外一层",t(COLORS[centers[f]].name)),note:f==='B'?t('后层离你最远，按你当前的左右判断；转后层时，正面九宫格不变。'):t('内层不动，整个魔方保持拿法不变。')};
  }
  const CORNERS={URF:'右前上角',UFL:'左前上角',ULB:'左后上角',UBR:'右后上角',DFR:'右前下角',DLF:'左前下角',DBL:'左后下角',DRB:'右后下角'};
  const cornerIndices=Object.fromEntries(Object.keys(CORNERS).map(k=>[k,geometry.map((g,i)=>g.p.every((v,a)=>v===[...k].reduce((s,f)=>s+NORMAL[f][a],0))?i:-1).filter(i=>i>=0)]));
  function cornerLocation(state,target){const id=[...target].sort().join('');for(const [position,indices]of Object.entries(cornerIndices))if(indices.map(i=>state[i]).sort().join('')===id)return {position,indices};throw Error(t('找不到所选角块，请检查配色。'));}
  function observe(before,after,target,centers){const old=cornerLocation(before,target),next=cornerLocation(after,target),solved=next.indices.every(i=>after[i]===FACES[Math.floor(i/9)]);return {from:t(CORNERS[old.position]),to:t(CORNERS[next.position]),target:t(CORNERS[target]),status:solved?t('位置和方向都正确'):next.position===target?t('位置正确，方向还未对齐'):t('尚未到目标位置'),facing:next.indices.map(i=>t(COLORS[centers[after[i]]].name)+t('朝')+t(NAMES[FACES[Math.floor(i/9)]])).join(' · ')};}
  function rotateFace(raw){const a=normalize(raw);if(a.length!==9)throw Error(t('先填满这一面的 9 格，再旋转图案。'));return [6,3,0,7,4,1,8,5,2].map(i=>a[i]).join('');}
  function colorFaces(state,centers){return Object.fromEntries([...FACES].map(f=>[f,[...face(state,f)].map(x=>centers[x]).join('')]));}
  const api={FACES,NAMES,COLORS,DEFAULT,TOP,NORMAL,RIGHT,geometry,SOLVED,dot,clockwise,parseMove,permutation,move,apply,face,normalize,centersOf,validate,orientation,instruction,CORNERS,cornerIndices,cornerLocation,observe,rotateFace,colorFaces};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Cube3=api;
})(globalThis);

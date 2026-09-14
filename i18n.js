/* UI translations. GPL-3.0-or-later. */
(function(root){
  'use strict';
  const english={
  "待填": "Unfilled",
  "正在计算，请稍候…": "Calculating, please wait…",
  "计算复原步骤 →": "Calculate steps →",
  "配色已修改，请核对后计算。": "Colors changed. Check them before calculating.",
  "画笔：": "Brush: ",
  "色": "",
  "已旋转录入图案。请确认与实物的拿法一致。": "Grid rotated. Check that it matches how you are holding your cube.",
  "色中心正对你": " center facing you",
  "中心": "Center",
  "请先设置六个不同的中心颜色，方向提示会自动更新。": "Set six different center colors first. Orientation hints will update automatically.",
  "，跟踪角块": ", tracked corner",
  "已完成 / ": "Completed / ",
  " 步": " steps",
  "复原完成。": "Cube solved.",
  "魔方已经复原。": "Your cube is already solved.",
  "六个面现在应当各自同色。": "Each of the six faces should now be a single color.",
  "可以回看步骤，观察角块是如何移动的。": "Review the steps to see how the corner moved.",
  "回看只切换画面，不会撤销实物上的转动。": "Reviewing only changes the display. It does not undo physical turns.",
  "六面已复原 ✓": "All six faces solved ✓",
  "已拧完，核对完成 ✓": "Turn done and checked ✓",
  "已拧完并核对一致 →": "Turn done and checked →",
  "求解结果格式不正确。": "Invalid solver result format.",
  "求解步骤未通过独立配色模拟校验，已停止。": "The solution failed independent sticker verification. Stopped.",
  "步": " steps",
  "· 已复原": "· Solved",
  "角块": " corner",
  "正在浏览器内计算复原步骤。首次计算需要初始化，请稍候……": "Calculating in your browser. The first solve requires initialization; please wait…",
  "求解文件缺失。请将 index.html、core.js、app.js、style.css、solver-source.js 放在同一个文件夹。": "Solver file missing. Keep index.html, i18n.js, core.js, app.js, style.css and solver-source.js in the same folder.",
  "求解器加载失败：": "Solver failed to load: ",
  "请使用 Edge 或 Chrome 打开 index.html。": "Please open index.html in Edge or Chrome.",
  "计算超过两分钟，已停止。请检查配色，也可以重新尝试。": "Stopped after two minutes. Check your colors and try again.",
  "三阶魔方 · 固定视角复原指导": "3×3 Cube · Fixed-orientation solve guide",
  "整体求解算法不保证逐角归位；角块跟踪供观察。": "This solver does not solve corners one by one. Corner tracking is for observation.",
  "操作前（固定正面）：": "Before (fixed front face):",
  "操作后（固定正面）：": "After (fixed front face):",
  "操作后六面（各面读图方向同录入时）：": "All six faces after the move (same reading orientation as input):",
  "复原完成：六面各自同色。": "Solved: each face is a single color.",
  "三阶魔方复原步骤.txt": "cube-solution.txt",
  "已恢复上次录入的配色。请确认与当前实物一致，再计算。": "Restored your saved colors. Check them against your physical cube before calculating.",
  "计算已停止，可以修改配色或重新计算。": "Calculation stopped. You can edit colors or calculate again.",
  "已载入演示打乱，仅供体验。真实魔方请录入真实配色。": "Demo scramble loaded. Enter your actual colors to solve your physical cube.",
  "已清空其余色块，保留中心颜色。": "Cleared stickers and kept the center colors.",
  "魔方配色.json": "cube-colors.json",
  "配色文件过大，请选择本程序导出的 JSON 文件。": "File too large. Select a JSON file exported by this app.",
  "JSON 应包含 U R F D L B 六个配色字符串。": "JSON must contain six color strings: U R F D L B.",
  "配色已加载（兼容 Python 版 JSON），请核对后计算。": "Colors loaded (Python JSON supported). Check them before calculating.",
  "加载失败：": "Failed to load: ",
  "上": "Top",
  "右": "Right",
  "前": "Front",
  "下": "Bottom",
  "左": "Left",
  "后": "Back",
  "白": "White",
  "红": "Red",
  "绿": "Green",
  "黄": "Yellow",
  "橙": "Orange",
  "蓝": "Blue",
  "未知转动：": "Unknown move: ",
  "魔方需要 54 个色块。": "A cube needs 54 stickers.",
  "六个面的中心颜色必须互不相同。": "All six center colors must be different.",
  "每种颜色应有 9 格。当前：": "Each color needs 9 stickers. Current counts: ",
  "格": " stickers",
  "正面最右列向上翻": "Move the front face’s rightmost column up",
  "正面最右列向下翻": "Move the front face’s rightmost column down",
  "正面最左列向下翻": "Move the front face’s leftmost column down",
  "正面最左列向上翻": "Move the front face’s leftmost column up",
  "正面最上排向左移": "Move the front face’s top row left",
  "正面最上排向右移": "Move the front face’s top row right",
  "正面最下排向右移": "Move the front face’s bottom row right",
  "正面最下排向左移": "Move the front face’s bottom row left",
  "正面顺时针转，顶边向右": "Turn the front face clockwise, with its top edge moving right",
  "正面逆时针转，顶边向左": "Turn the front face counterclockwise, with its top edge moving left",
  "后层顶边向你的左手侧移动": "Move the back layer’s top edge toward your left hand",
  "后层顶边向你的右手侧移动": "Move the back layer’s top edge toward your right hand",
  "，连续转两次四分之一圈。": ", making two quarter turns (180°).",
  "，转四分之一圈。": ", making one quarter turn (90°).",
  "后层离你最远，按你当前的左右判断；转后层时，正面九宫格不变。": "The back layer is furthest from you. Use your current left and right; the front grid stays unchanged.",
  "内层不动，整个魔方保持拿法不变。": "Keep the inner layers still and hold the whole cube in the same orientation.",
  "右前上角": "Top-front-right corner",
  "左前上角": "Top-front-left corner",
  "左后上角": "Top-back-left corner",
  "右后上角": "Top-back-right corner",
  "右前下角": "Bottom-front-right corner",
  "左前下角": "Bottom-front-left corner",
  "左后下角": "Bottom-back-left corner",
  "右后下角": "Bottom-back-right corner",
  "找不到所选角块，请检查配色。": "Selected corner not found. Check your colors.",
  "位置和方向都正确": "Correct position and orientation",
  "位置正确，方向还未对齐": "Correct position, orientation not yet aligned",
  "尚未到目标位置": "Not yet in its home position",
  "朝": " facing ",
  "先填满这一面的 9 格，再旋转图案。": "Fill all 9 stickers on this face before rotating the grid.",
  "{0}面第{1}排第{2}格{3}": "{0} face, row {1}, column {2} {3}",
  "<strong>上方 {0}色中心</strong><br>左 {1} · 右 {2}<br>下 {3} · 背面 {4}": "<strong>Top: {0} center</strong><br>Left: {1} · Right: {2}<br>Bottom: {3} · Back: {4}",
  "{0}面第{1}排第{2}格：{3}": "{0} face, row {1}, column {2}: {3}",
  "起始拿法：{0}色中心朝前，{1}色中心朝上。左{2}、右{3}、下{4}、背面{5}。": "Starting grip: {0} center facing you, {1} center on top. Left: {2}, right: {3}, bottom: {4}, back: {5}.",
  "{0}面第{1}排第{2}格：{3}{4}": "{0} face, row {1}, column {2}: {3}{4}",
  "{0}色中心朝前，{1}色中心朝上": "{0} center facing you, {1} center on top",
  "左{0} · 右{1} · 下{2} · 背面{3}": "Left: {0} · Right: {1} · Bottom: {2} · Back: {3}",
  "第 {0} 步 / 共 {1} 步": "Step {0} / {1}",
  "{0} {1} · {2}中心": "{0} {1} · {2} center",
  "已完成计算，共 {0} 步；全部步骤已验证能复原六面。": "Calculated {0} steps. The complete solution has been verified to solve all six faces.",
  "全程保持{0}色中心朝前、{1}色中心朝上。只拧层，不转整个魔方。": "Keep the {0} center facing you and the {1} center on top throughout. Turn layers only; do not rotate the whole cube.",
  "第 {0}/{1} 步 · {2}": "Step {0}/{1} · {2}",
  "所选角块：{0} → {1}；目标 {2}；{3}；{4}": "Selected corner: {0} → {1}; home: {2}; {3}; {4}",
  "{0}面，上方是{1}色中心：\n{2}": "{0} face, {1} center on top:\n{2}",
  "{0}面需要 9 个颜色，可用汉字或 W R G Y O B。": "{0} face needs 9 colors. Use W R G Y O B or Chinese color characters.",
  "只拧{0}层 · {1}": "Turn only the {0} layer · {1}",
  "{0}色中心所在的最外一层": "The outermost layer with the {0} center",
  "<h2 class=\"face-title\"><span id=\"title-{0}\"></span><span class=\"face-id\">{1}面 {2}</span></h2><p class=\"orientation\" id=\"orientation-{3}\"></p><div class=\"cube-grid\" id=\"input-grid-{4}\"></div><input id=\"input-{5}\" class=\"face-input\" type=\"text\" maxlength=\"100\" spellcheck=\"false\" aria-label=\"{6}面九格颜色\" placeholder=\"输入九格颜色\"><div class=\"rotate-row\"><button type=\"button\" id=\"rotate-left-{7}\" title=\"只旋转录入图案，不是拧实物\">↶ 图案左转</button><button type=\"button\" id=\"rotate-right-{8}\" title=\"只旋转录入图案，不是拧实物\">图案右转 ↷</button></div>": "<h2 class=\"face-title\"><span id=\"title-{0}\"></span><span class=\"face-id\">{1} face {2}</span></h2><p class=\"orientation\" id=\"orientation-{3}\"></p><div class=\"cube-grid\" id=\"input-grid-{4}\"></div><input id=\"input-{5}\" class=\"face-input\" type=\"text\" maxlength=\"100\" spellcheck=\"false\" aria-label=\"{6} face: 9 color codes\" placeholder=\"Enter 9 codes: WRGYOB\"><div class=\"rotate-row\"><button type=\"button\" id=\"rotate-left-{7}\" title=\"Rotate the entered grid only, not the physical cube\">↶ Grid left</button><button type=\"button\" id=\"rotate-right-{8}\" title=\"Rotate the entered grid only, not the physical cube\">Grid right ↷</button></div>",
  "一面一面 · 三阶魔方助手": "Cube Studio · 3×3 Cube Solver",
  "一面一面": "Cube Studio",
  "本地计算 · 无需联网": "Local computation · Works offline",
  "3 × 3 / 三阶魔方": "3 × 3 / RUBIK’S CUBE",
  "保持拿法，一步一步复原。": "Keep your grip. Solve step by step.",
  "填入你的配色，跟着固定视角操作，也可以观察一个角块的旅程。": "Enter your colors, follow moves from a fixed viewpoint, and track a corner’s journey.",
  "工作区": "Workspace",
  "01　录入配色": "01　Enter colors",
  "02　逐步复原": "02　Solve step by step",
  "选择画笔颜色": "Choose a brush color",
  "再点击九宫格填色，中心格也能修改": "Then click the grid to paint. Centers can be changed too.",
  "画笔颜色": "Brush colors",
  "先把魔方拿好": "SET YOUR STARTING GRIP",
  "先看中心，再填颜色。": "Check centers, then fill colors.",
  "先核对六个中心格，按实物修改。": "Check all six centers and match them to your physical cube.",
  "照各卡片的颜色提示调整拿法，从左上到右下录入。": "Hold the cube as each card indicates. Enter colors from top-left to bottom-right.",
  "上方、左边等提示都指那一面的": "Top, left and other hints refer to that face’s ",
  "中心颜色": "center color",
  "。": ".",
  "录入时只转整个魔方观察，不拧层。计算后再回到固定拿法。": "While entering colors, rotate the whole cube to view it; do not turn layers. Return to the starting grip after calculating.",
  "颜色数量": "Color counts",
  "每色 9 格": "9 per color",
  "计算复原步骤": "Calculate steps",
  "停止计算": "Stop calculation",
  "试试演示打乱": "Try demo scramble",
  "保存配色": "Save colors",
  "加载配色": "Load colors",
  "清空色块，保留中心": "Clear stickers, keep centers",
  "先给魔方一份配色。": "Start by entering your cube’s colors.",
  "计算完成后，这里会显示每一步的拿法、转动和颜色变化。": "After calculation, see the grip, turn and color changes for every step here.",
  "去录入配色": "Enter colors",
  "全程固定拿法": "KEEP THE SAME GRIP",
  "只拧层，不转整个魔方": "Turn layers only; keep the cube’s orientation",
  "操作前 · 固定正面": "Before · Fixed front face",
  "操作后 · 固定正面": "After · Fixed front face",
  "← 上一条（回看）": "← Previous (review)",
  "“回看”只切换画面，不会撤销实物操作。不一致时先停下，必要时重新录入当前配色。": "Review only changes the display, not your physical cube. Stop if the colors differ, and enter the current colors again if needed.",
  "跟踪一个角块": "TRACK A CORNER",
  "看看它去了哪里。": "See where it goes.",
  "按角块的三种颜色选择": "Select a corner by its three colors",
  "标星的三个贴纸属于同一角块": "The three starred stickers belong to the same corner",
  "它的家": "Home position",
  "本步移动": "This move",
  "操作后朝向": "Orientation after the move",
  "角块去到后面时，正面可能看不到星标，可在下方展开图找它。": "When the corner moves to the back, its stars may disappear from the front. Find it in the unfolded map below.",
  "这是整体求解算法，不是逐角教学公式；已归位的块也可能暂时被移走。": "This is a full-cube solver, not a corner-by-corner teaching method. Solved pieces may temporarily move away.",
  "导出全部文字步骤": "Export all steps as text",
  "操作后的完整配色": "ALL COLORS AFTER THE MOVE",
  "六个面，始终在同一个位置。": "Six faces, always in the same places.",
  "各面读图方向同录入时": "Same reading orientation as input",
  "先核对中心颜色，再填入其余 48 格。也可以载入演示试用。": "Check the center colors, then fill the other 48 stickers. Or try the demo scramble.",
  "一面一面 / 固定视角魔方助手": "Cube Studio / Fixed-orientation cube solver",
  "求解引擎": "Solver engine",
  "配色格式不正确。": "Invalid color format.",
  "每种颜色必须恰好 9 格": "Each color must have exactly 9 stickers",
  "棱块颜色组合不正确或重复": "Invalid or duplicate edge color combinations",
  "存在不合法的棱块翻转": "An edge is flipped illegally",
  "角块颜色组合不正确或重复": "Invalid or duplicate corner color combinations",
  "存在不合法的角块扭转": "A corner is twisted illegally",
  "角块或棱块的排列奇偶性不正确": "Invalid corner or edge permutation parity",
  "当前搜索深度内未找到解": "No solution found within the current search depth",
  "搜索次数达到上限，请重试": "Search limit reached; please try again",
  "配色无法组成可复原的三阶魔方：": "These colors cannot form a solvable 3×3 cube: ",
  "求解未完成：": "Solution incomplete: ",
  "。请核对各面的录入方向和贴纸位置。": ". Check the input orientation and sticker positions of every face."
};
  const storageKey='cube-studio-language';
  let language='zh-CN';
  try { const saved=localStorage.getItem(storageKey); if(saved==='en'||saved==='zh-CN')language=saved; } catch {}
  const messages=new Map();
  function t(key,...args){
    const text=(language==='en'?(english[key]??key):key).replace(/\{(\d+)\}/g,(_,i)=>args[i]??'');
    if(args.length){messages.set(text,{key,args});if(messages.size>1000)messages.delete(messages.keys().next().value);}
    return text;
  }
  function translateMessage(text,previousLanguage){
    const recipe=messages.get(text);
    if(recipe)return t(recipe.key,...recipe.args.map(value=>typeof value==='string'?translateMessage(value,previousLanguage):value));
    const entries=Object.entries(english).map(([zh,en])=>previousLanguage==='en'?[en,zh]:[zh,en]).filter(([from,to])=>from&&from!==to).sort((a,b)=>b[0].length-a[0].length);
    // A single pass avoids translating replacement text a second time.
    const pattern=new RegExp(entries.map(([from])=>from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
    const replacements=new Map(entries);
    return text.replace(pattern,match=>replacements.get(match));
  }
  function apply(){
    document.documentElement.lang=language;
    document.title=t('一面一面 · 三阶魔方助手');
    document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAriaLabel)));
    const button=document.getElementById('language-toggle');
    button.textContent=language==='en'?'中文':'English';
    button.lang=language==='en'?'zh-CN':'en';
    button.setAttribute('aria-label',language==='en'?'切换为中文':'Switch to English');
  }
  function setLanguage(next){
    if(next!=='en'&&next!=='zh-CN')return;
    const previous=language;language=next;
    try{localStorage.setItem(storageKey,next);}catch{}
    apply();
    document.dispatchEvent(new CustomEvent('cube-language-change',{detail:{previous}}));
  }
  root.CubeI18n={t,apply,setLanguage,translateMessage,get language(){return language;}};
})(globalThis);

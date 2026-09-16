# 3x3 Cube Web Solver (三阶魔方网页版)

[中文](#中文说明) | [English](#english-instructions)

> 🧩 A beginner-friendly, purely front-end 3x3 Rubik's Cube solver and tutorial. 
> 一个专为零基础设计的纯前端三阶魔方求解与复原指导工具。

---

<a name="中文说明"></a>
## 🇨🇳 中文说明

### 📦 快速开始
双击 `index.html`，使用 Edge 或 Chrome 打开即可。
**无需安装依赖、无需启动服务器**。求解过程完全在浏览器本地完成，**绝不上传您的魔方配色数据**，保护隐私。

请确保以下文件放在同一文件夹中：
`index.html`、`style.css`、`core.js`、`app.js`、`solver-source.js`。
*(注：`min2phase.js` 是求解器原始源码，`LICENSE-csTimer.txt` 是开源许可。)*

### 🎨 录入配色
1. **核对中心色**：默认白上、绿前、红右、黄下、橙左、蓝后，可按实物修改中心格。
2. **填色**：选择画笔颜色点击格子；也可直接输入 9 个汉字或字母（W R G Y O B 代表 白红绿黄橙蓝），支持空格、逗号、斜杠分隔。
3. **观察方向**：观察每面时，按卡片的具体中心颜色提示拿好魔方，从左上到右下录入。提示的“上方、左边、背面”均指对应面的**中心颜色**，不是边缘小格。
4. **旋转九宫格**：“图案左转 / 右转”只旋转屏幕上的九宫格，**不是让你拧实物**。如果录入方向转反，可用它修正。
5. **校验与计算**：每种颜色应各 9 格，六个中心必须不同。确认无误后点击“计算复原步骤”。

💡 *提示：可点击“试试演示打乱”体验，它不代表你的实物状态。“清空色块”会保留六个中心。若浏览器允许本地存储，页面会记住上次录入；恢复后请先核对实物。*

### 🛠️ 固定拿法复原
计算完成后，按顶部的颜色提示回到**起始拿法**（例如绿色中心朝前、白色中心朝上）。**整个复原过程保持这个方向，只拧提示的一层。**

- **右层向上翻**：从正面看，最右列向上翻 90°。
- **上层向左移**：从正面看，最上排向左移 90°。
- **后层顶边向左**：离你最远那层的顶边向你左手侧移动（不需要把后面拿到前面看）。
- **180°**：按提示方向连续转两次四分之一圈，共半圈。

**UI 说明**：左右大九宫格始终展示同一个正面的“操作前”和“操作后”。转后层时正面不变，可在下方六面展开图核对其余面（读图方向与录入时一致）。
**操作建议**：先核对“操作前”，拧完核对“操作后”，一致再点击下一步。上一条仅用于回看，不会撤销实物转动。若不一致请停下，必要时重新录入当前配色求解。

### 👁️ 观察角块
选择一个三色角块，图中用 **★** 标记它的三个贴纸。侧栏显示它的目标位置、本步移动路径、操作后各颜色朝向，以及是否已归位。
*(注：算法是整体求解，不是初学者层先法，不保证按角块逐个归位，也不保证最少步。已归位的块有时会暂时被移走。角块跟踪仅用于观察，不能代替分阶段教学。)*

### 💾 保存、导入和导出
- **保存配色**：下载六面 JSON 文件。
- **导出全部文字步骤**：包含固定拿法、每步操作、正面前后配色、角块观察和操作后的完整六面配色。


### 📜 源码与许可
页面和贴纸模型分别位于 `index.html`、`style.css`、`app.js`、`core.js`。
求解算法使用 [csTimer](https://github.com/cs0x7f/cstimer) 项目的 JavaScript `min2phase`（两阶段算法）：
- 上游文件：[min2phase.js](https://github.com/cs0x7f/cstimer/blob/master/src/js/lib/min2phase.js) (取得日期：2026-09-09)
- 随包保留源码及 **GPL-3.0** 许可。
- `solver-source.js` 包含原始源码和 Worker 消息适配器，以 **Blob Worker** 运行，完美绕过本地文件 `fetch` / `importScripts` 的跨域限制。
- **安全校验**：每次求解都由独立的 54 贴纸模型重放全部步骤，确认六面复原后才显示指导。

**测试覆盖**：已检查 18 种转动、40 组随机打乱（1000 次打乱动作）、角块跟踪、中文 JSON、无效配色和页面元素绑定。*(注：当前自动化浏览器不允许本地文件页面，未进行真实浏览器界面自动验收。)*

---

<a name="english-instructions"></a>
## 🇬🇧 English Instructions

### 📦 Quick Start
Simply double-click `index.html` and open it in Edge or Chrome. 
**No dependencies to install, no server required.** The solving process runs entirely locally in your browser. **Your cube data is never uploaded**, ensuring complete privacy.

Please ensure the following files are in the same directory:
`index.html`, `style.css`, `i18n.js`, `core.js`, `app.js`, `solver-source.js`.
*(Note: `min2phase.js` is the original solver source code, and `LICENSE-csTimer.txt` is the open-source license.)*

### 🎨 Inputting Colors
1. **Check Centers**: The default scheme is White-Top, Green-Front, Red-Right, Yellow-Bottom, Orange-Left, Blue-Back. Modify the center pieces to match your physical cube.
2. **Fill Colors**: Select a brush color and click the cells, or directly type 9 characters (W R G Y O B for White, Red, Green, Yellow, Orange, Blue). Spaces, commas, and slashes are supported as separators.
3. **Orientation**: When observing each face, hold your cube according to the center color hints on the card. Input from top-left to bottom-right. "Top, Left, Back" refer to the **center colors** of those faces, not the edge stickers.
4. **Rotate Grid**: "Rotate Grid Left/Right" only rotates the 3x3 grid on the screen, **not your physical cube**. Use this to correct input orientation.
5. **Validate & Solve**: Each color must have exactly 9 cells, and the 6 centers must be unique. Click "Calculate Steps" when ready.

💡 *Tip: Click "Try Demo Scramble" for a quick test (does not represent your physical cube). "Clear Colors" keeps the centers intact. If local storage is allowed, the page remembers your last input; always verify with your physical cube upon reloading.*

### 🛠️ Solving with Fixed Orientation
After calculation, return to the **starting orientation** indicated at the top (e.g., Green center facing you, White center on top). **Maintain this orientation throughout the entire solve; only turn the layer indicated.**

- **Right layer up**: From the front view, turn the rightmost column up 90°.
- **Top layer left**: From the front view, shift the top row to the left 90°.
- **Back layer top edge left**: The top edge of the furthest layer moves to your left (no need to rotate the cube to see the back).
- **180°**: Turn the layer twice in the indicated direction (half a turn).

**UI Guide**: The large left/right grids always show the "Before" and "After" states of the front face. When turning the back layer, the front face remains unchanged; verify other faces using the unfolded map below.
**Workflow**: Verify the "Before" state, make the move, verify the "After" state, then click "Next". The previous step is for review only and won't undo physical moves. If states mismatch, stop and re-input the current colors if necessary.

### 👁️ Observing Corner Pieces
Select a 3-color corner piece, marked with **★** on its stickers. The sidebar shows its target position, current path, post-move orientation, and whether it's solved.
*(Note: The algorithm uses a full 3D solve, not the beginner Layer-by-Layer method. It doesn't guarantee solving corner-by-corner or the absolute minimum moves. Solved pieces may be temporarily moved. Corner tracking is for observation only.)*

### 💾 Save, Import, and Export
- **Save**: Download the 6 faces as a JSON file.
- **Load**: Compatible with U/R/F/D/L/B strings exported by the original thon script. Supports both English letters and Chinese characters.
- **Export All Steps**: Exports a text file including fixed orientation, moves, front face before/after states, corner tracking, and full 6-face colors after each move.


### 📜 Source Code & License
UI and sticker models are in `index.html`, `style.css`, `app.js`, and `core.js`.
The solving algorithm uses the JavaScript `min2phase` (Two-Phase Algorithm) from the [csTimer](https://github.com/cs0x7f/cstimer) project:
- Upstream file: [min2phase.js](https://github.com/cs0x7f/cstimer/blob/master/src/js/lib/min2phase.js) (Retrieved: 2026-09-09)
- Source code and **GPL-3.0** license are included in this package.
- `solver-source.js` wraps the original code with a Worker adapter, running as a **Blob Worker** to bypass local file `fetch` / `importScripts` CORS restrictions.
- **Validation**: Every solve is replayed on an independent 54-sticker model to verify the solved state before displaying instructions.

**Testing**: Verified 18 move types, 40 random scrambles (1000 moves each), corner tracking, Chinese JSON, invalid inputs, and UI bindings. *(Note: Automated browser testing for local `file://` protocols is restricted; real-browser UI automated acceptance testing was not performed.)*
### 语言切换 / Language switch

点击页面右上角 **English / 中文** 切换界面语言，选择会保存在当前浏览器。配色、当前步骤和所选角块会保留。英文模式用 W/R/G/Y/O/B 显示贴纸及输入框，仍兼容中文配色 JSON；文字步骤按当前语言导出。

Use **English / 中文** in the top-right corner to switch languages. Your choice is saved in this browser. Colors, the current step and the selected corner are preserved. English mode uses W/R/G/Y/O/B on stickers and in color inputs, accepts Chinese color JSON, and exports step-by-step instructions in the selected language. Keep `i18n.js` alongside the other app files.

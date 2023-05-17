import mainPage from './pages/MainPage.js';
import { replaceChildren } from './tools/elementTools.js';
import { setLoadEventForCss } from './tools/fileTools.js';
import { startMonitoring } from './tools/loadingTools.js';
const root = document.getElementById('root');

setLoadEventForCss(root, './tools/tooltip.css', 'css/tooltip');
setLoadEventForCss(root, './tools/expandCollapseTool.css', 'css/ExpandCollapse');

startMonitoring(()=>{
	replaceChildren(root, mainPage);
});
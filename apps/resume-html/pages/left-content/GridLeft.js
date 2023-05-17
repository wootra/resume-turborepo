import { createElement } from '../../tools/elementTools.js';
import { setLoadEventForCss } from '../../tools/fileTools.js';
import Achievements from './achievements/Achievements.js';
import Careers from './careers/Careers.js';
import Introduction from './introduction/Introduction.js';

const GridLeft = createElement(
	'div',
	{ className: 'grid-left' },
	[Introduction, Careers, Achievements]
);

setLoadEventForCss(GridLeft, './pages/left-content/GridLeft.css', 'css/GridLeft');
setLoadEventForCss(GridLeft, './pages/left-content/Title.css', 'css/Title');
setLoadEventForCss(GridLeft, './pages/left-content/NormalDesc.css', 'css/NormalDesc');

export default GridLeft;
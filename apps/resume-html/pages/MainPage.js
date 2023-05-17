import { createElement } from '../tools/elementTools.js';
import { setLoadEventForCss } from '../tools/fileTools.js';
import GridColContainer from './GridContainer.js';

const MainPage = createElement(
	'div',
	{ className: 'main-page' },
	GridColContainer
);

setLoadEventForCss(MainPage, './pages/MainPage.css', 'css/MainPage');

export default MainPage;
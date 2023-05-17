import { createElement } from '../tools/elementTools.js';
import GridTop from './top-content/GridTop.js';
import GridLeft from './left-content/GridLeft.js';
import GridRight from './right-content/GridRight.js';
import { setLoadEventForCss } from '../tools/fileTools.js';

const GridContainer = createElement(
	'div',
	{ className: 'grid-container' },
	[GridTop, GridLeft, GridRight]
);

setLoadEventForCss(GridContainer, './pages/GridContainer.css', 'css/GridContainer');

export default GridContainer;
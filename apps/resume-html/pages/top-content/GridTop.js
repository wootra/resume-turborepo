import { createElement } from '../../tools/elementTools.js';
import ProfilePhoto from './ProfilePhoto.js';
import ProfileInfo from './ProfileInfo.js';
import { setLoadEventForCss } from '../../tools/fileTools.js';

const PhotoArea = createElement(
	'div',
	{ className: 'grid-top-photo' },
	ProfilePhoto
);

const InfoArea = createElement(
	'div',
	{ className: 'grid-top-info' },
	ProfileInfo
);

const GridTop = createElement(
	'div',
	{ className: 'grid-top' },
	[PhotoArea, InfoArea]
);

setLoadEventForCss(GridTop, './pages/top-content/GridTop.css', 'css/GridTop');

export default GridTop;
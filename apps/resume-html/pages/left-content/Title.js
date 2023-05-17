import { createElement } from '../../tools/elementTools.js';

export default title => createElement(
	'h1',
	{ className: 'title' },
	document.createTextNode(title)
);

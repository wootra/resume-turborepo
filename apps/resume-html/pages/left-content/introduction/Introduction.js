import { createElement } from '../../../tools/elementTools.js';
import { setLoadEventForCss } from '../../../tools/fileTools.js';
import { LeftContents } from '../../contentLoader.js';
import NormalDesc from '../NormalDesc.js';
import Title from '../Title.js';

const Introduction = createElement(
	'div',
	{ className: 'section introduction' },
	[
		Title(LeftContents.Introduction.TITLE),
		...NormalDesc(LeftContents.Introduction.DESC)
	]	
);

setLoadEventForCss(Introduction, './pages/left-content/introduction/Introduction.css', 'css/Introduction');

export default Introduction;
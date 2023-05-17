import { createElement } from '../../tools/elementTools.js';
import { setLoadEventForCss } from '../../tools/fileTools.js';
import Authority from './authority/Authority.js';
import Awards from './awards/Awards.js';
import Educations from './educations/Educations.js';
import SkillLevels from './skills/SkillLevels.js';
import Volunteers from './volunteers/Volunteers.js';

const GridRight = createElement(
	'div',
	{ className: 'grid-right' },
	[SkillLevels, Volunteers, Educations, Awards, Authority]
);

setLoadEventForCss(GridRight, './pages/right-content/GridRight.css', 'css/GridRight');

export default GridRight;
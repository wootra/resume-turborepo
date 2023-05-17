import Title from '../../left-content/Title.js';
import { createElement } from '../../../tools/elementTools.js';
import { setLoadEventForCss } from '../../../tools/fileTools.js';
import { RightContents } from '../../contentLoader.js';
import SkillGuage from "./SkillGuage.js";
import ExpandCollapseTool from '../../../tools/expandCollapseTool.js';

const SkillGroup = (groupName) => 
	ExpandCollapseTool(groupName, 
		(groupName)=>
			RightContents.skillLevels[groupName].map(
				obj=>SkillGuage(obj.skillName, obj.levelNo)
			));

const SkillList = createElement('div',{className: 'skill-list'}, 
	Object.keys(RightContents.skillLevels).map(group=>SkillGroup(group))
)

const SkillLevels = createElement(
	'div',
	{ 
		className: 'skill-levels',
	},
	[Title("Skill Levels"), SkillList]
);

setLoadEventForCss(SkillLevels, './pages/right-content/skills/SkillLevels.css', 'css/SkillLevels');

export default SkillLevels;
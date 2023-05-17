import Title from '../Title.js';
import { createElement } from '../../../tools/elementTools.js';
import { setLoadEventForCss } from '../../../tools/fileTools.js';
import { RightContents } from '../../contentLoader.js';
import ExpandCollapseTool from '../../../tools/expandCollapseTool.js';

const AchievementItem = ({name, desc, myPart, businessValue})=>createElement('div', 
	{
		className: 'achievement-item', 
		"data-desc": desc
	},  
	[
		createElement('div', {
			className: "achievement-name",
			"data-tooltip": "Achivement Name",
		}, name),
		createElement('div', {
			className: "achievement-business-value",
			"data-tooltip": "Business Value",
		}, businessValue),
		createElement('div', {
			className: "achievement-my-part",
			"data-tooltip": "I worked on:",
		}, myPart),
		createElement('div', {
			className: "achievement-desc",
			"data-tooltip": "more description",
		}, desc),
	]
)

const AchievementList = RightContents.achievements.map(
	item=>ExpandCollapseTool(item.company, 
		()=>createElement('ul',
			{className: 'achievement-for-company'}, 
			item.items.map(item=>
				createElement('li', {}, AchievementItem(item))
			)
		)
	)
);

const Achievements = createElement(
	'div',
	{ 
		className: 'achievements',
	},
	[Title("More Achievements"), ...AchievementList]
);

setLoadEventForCss(Achievements, './pages/left-content/achievements/Achievements.css', 'css/Achievements');

export default Achievements;
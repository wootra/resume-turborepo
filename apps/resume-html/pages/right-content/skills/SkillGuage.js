import { createElement } from '../../../tools/elementTools.js';
import { setLoadEventForCss } from '../../../tools/fileTools.js';

const SkillGuage = (skillName, skillPt) => {

	const intNum = parseInt(skillPt);
	let pointsTxt = "";
	for(let i=0; i<intNum; i++) pointsTxt+="🟢";

	const skillGuage = createElement('div', {className: 'skill-guage'}, 
		[
			createElement('div', {
				className: 'skill-name', 
				"data-tooltip": skillName, 
				"data-tooltip_pos":"right"
			}, skillName),
			createElement('div', {className: 'skill-points'}, pointsTxt)
		]
	);
	setLoadEventForCss(skillGuage, './pages/right-content/skills/SkillGuage.css', 'css/SkillGuage');
	return skillGuage;
}

export default SkillGuage;
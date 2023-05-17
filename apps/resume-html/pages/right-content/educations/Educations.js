import Title from '../../left-content/Title.js';
import { createElement } from '../../../tools/elementTools.js';
import { setLoadEventForCss } from '../../../tools/fileTools.js';
import { RightContents } from '../../contentLoader.js';

const EducationList = createElement('ul',{className: 'education-list'}, 
	RightContents.educations.map(edu=>{
		const schoolLink = createElement('a', 
			{ 
				className: "education-school",
				href: edu.school.url, 
				target: "_blank", 
				ariaLabel: `open a new window to go to ${edu.school.name}`
			}, 
			edu.school.name
		);

		return createElement("li", 
			{
				"data-tooltip_after": `link to ${edu.school.name}`
			}, 
			[
				schoolLink,
				createElement('ul',{className: 'education-degree-list'},
					edu.degrees.map(({degree, major, year})=>createElement(
						'li', 
						{},
						`${degree} in ${major} (${year})`
					)) 
				)
				
			]
		)
	})
)

const Educations = createElement(
	'div',
	{ 
		className: 'educations',
	},
	[Title("Educations "), EducationList]
);

setLoadEventForCss(Educations, './pages/right-content/educations/Educations.css', 'css/Educations');

export default Educations;
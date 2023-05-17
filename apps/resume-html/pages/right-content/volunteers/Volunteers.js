import Title from '../../left-content/Title.js';
import { createElement } from '../../../tools/elementTools.js';
import { setLoadEventForCss } from '../../../tools/fileTools.js';
import { RightContents } from '../../contentLoader.js';

const VolunteerList = createElement('ul',{className: 'volunteer-list'}, 
	RightContents.volunteers.map(vol=>
		createElement("li", 
			{
				"data-tooltip_after": `at ${vol.where}`
			}, 
			createElement('a', 
				{ 
					href: vol.url, 
					target: "_blank", 
					ariaLabel: `open a new window to go to ${vol.where}`
				}, 
				vol.role
			)
		)
	)
)

const Volunteers = createElement(
	'div',
	{ 
		className: 'volunteers',
	},
	[Title("Volunteer Exp. or Leadership"), VolunteerList]
);

setLoadEventForCss(Volunteers, './pages/right-content/volunteers/Volunteers.css', 'css/Volunteers');

export default Volunteers;
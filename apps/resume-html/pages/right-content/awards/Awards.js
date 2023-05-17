import Title from '../../left-content/Title.js';
import { createElement } from '../../../tools/elementTools.js';
import { setLoadEventForCss } from '../../../tools/fileTools.js';
import { RightContents } from '../../contentLoader.js';

const AwardList = createElement("ul", 
		{
			className: `award-list`
		}, 
		RightContents.awards.map(award=>
			createElement('li', {}, `${award.award} (${award.year})`),
	)
)

const Awards = createElement(
	'div',
	{ 
		className: 'awards',
	},
	[Title("Awards"), AwardList]
);

setLoadEventForCss(Awards, './pages/right-content/awards/Awards.css', 'css/Awards');

export default Awards;
import Title from '../../left-content/Title.js';
import { createElement } from '../../../tools/elementTools.js';
import { setLoadEventForCss } from '../../../tools/fileTools.js';
import { RightContents } from '../../contentLoader.js';

const AuthorityList = createElement("ul", 
		{
			className: `authority-list`
		}, 
		RightContents.authority.map(authority=>
			createElement('li', {}, `${authority}`),
	)
)

const Authority = createElement(
	'div',
	{ 
		className: 'authority',
	},
	[Title("Work Authority"), AuthorityList]
);

setLoadEventForCss(Authority, './pages/right-content/authority/Authority.css', 'css/Authority');

export default Authority;
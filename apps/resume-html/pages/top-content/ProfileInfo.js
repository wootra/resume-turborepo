import { createElement, createImage } from '../../tools/elementTools.js';
import { setLoadEventForCss } from '../../tools/fileTools.js';
import { TopContents } from '../contentLoader.js';

const Name = createElement('h1', {className: 'profile-name'}, TopContents.name);
const Address = createElement('h3', {className: 'profile-address'}, TopContents.address);
const Position = createElement('h2', {className: 'profile-position'}, TopContents.position);

const Phone = createElement('div', {className: 'profile-phone'}, 
	[
		createImage('phone-icon.svg', {className: 'profile-phone-icon'}), 
		createElement('a', 
			{
				href: `tel:+1${TopContents.contact.phone.replace(/[\(\)-]/g,"")}`, 
				"data-tooltip": `please call me`,
			},
			TopContents.contact.phone
		)
		
	]);
const Email = createElement('div', {className: 'profile-email'}, 
	[
		createImage('email-icon.svg', {className: 'profile-email-icon'}), 
		createElement('a', {
				href: `mailto:${TopContents.contact.email}?subject=Songhyeon, We are interested in you!`, 
				"data-tooltip": `please send me an email`,
			},
			TopContents.contact.email
		)
	]);
const Contact = createElement('div', {className: 'profile-contacts'}, 
	[Email, Phone]
);

const createLinkDiv = (url,className,content, iconFile, iconClass) => createElement('div', {className}, 
	[
		createImage(iconFile, {className: iconClass}), 
		createElement(
			'a', {
				href: `${url}`, 
				target: "_blank",
				"data-tooltip": `move to ${url}`
			},
			content.replace("https://","").replace("http://","")
		)
	])

const GitHub = createLinkDiv(TopContents.website.github, 'profile-github', TopContents.website.github, 'github-icon.svg', 'profile-github-icon');
const HomePage = createLinkDiv(TopContents.website.homepage, 'profile-homepage', TopContents.website.homepage, 'home-icon.svg', 'profile-home-icon');

const WebSites = createElement('div', {className: 'profile-websites'}, 
	[GitHub, HomePage]
);

const ProfileInfo = createElement(
	'div',
	{ className: 'name-address-container' },
	[Name, Address, Position, Contact, WebSites]
);

setLoadEventForCss(ProfileInfo, './pages/top-content/ProfileInfo.css', 'css/ProfileInfo');

export default ProfileInfo;
import { createElement } from '../../tools/elementTools.js';

/**
 * create a normal p tag from text. if it includes linefeed, create multiple p tags.
 * all result will be wrapped with an array.
 * @param {string} desc 
 * @returns {[Element]}
 */
const NormalDesc = desc => {
	if(desc.includes('\n')){
		return desc.split('\n').filter(t=>t).map(line=>createElement(
			'p',
			{ className: 'normal-desc' },
			document.createTextNode(line)
		));

	}
	return [createElement(
		'p',
		{ className: 'normal-desc' },
		document.createTextNode(desc)
	)];
}

export default NormalDesc;
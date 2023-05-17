import { createElement, replaceChildren } from "./elementTools.js";

const expandCollapsePanelName = groupName => `expand-collapse-tool-panel-for-${groupName}`;

/**
 * 
 * @param {string} groupName 
 * @param {Element} headerElement 
 * @returns {Element}
 */
const GroupHeader = (groupName, headerElement=undefined) => createElement('div', 
	{
		className: `expand-collapse-tool-header expand-collapse-tool-header-for-${groupName}`,
	},
	headerElement || groupName
)

/**
 * 
 * @param {string} groupName 
 * @returns {Element}
 */
const GroupPanel = (groupName)=>{
	return createElement('div', {className: "expand-collapse-tool-panel", id:expandCollapsePanelName(groupName)})
}

/**
 * 
 * @param {string} groupName 
 * @param {function(string):[Element]} elementsCreator 
 * @param {{headerElement: Element}} config
 * @returns 
 */
const ExpandCollapseTool = (groupName, elementsCreator, config={}) => createElement('div', 
	{
		className: `expand-collapse-tool expand-collapse-tool-for-${groupName} shrunk`,
		onclick : (e)=>{
			e.target.classList.toggle('shrunk');
            if(!e.target.classList.contains('shrunk')){
                const panel = document.getElementById(expandCollapsePanelName(groupName));
                const newElements = elementsCreator(groupName);
                replaceChildren(panel, newElements)
            }
		}
	}, 
	[GroupHeader(groupName, config.headerElement), GroupPanel(groupName)]
)

export default ExpandCollapseTool;
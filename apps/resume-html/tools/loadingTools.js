// import { getElementBySelector } from "./elementTools.js";

const { getElementBySelector } = await import('./elementTools.js');
/**
 * @type {{value: Object.<string, [function]>}}
 */
const loadingQueue = {
    value: {},
};

/**
 * @type {{value: Object.<string, [function]>}}
 */
const loadingQueueOnce = {
    value: {},
};

/**
 * this function has very limited functionality only for id and class definitions.
 * do not use this for the general purpose.
 *
 * @param {Element} element
 * @returns
 */
const getUniqInfo = element => {
    if (element.id) return '#' + element.id;
    if (element.className) {
        const classSelector =
            '.' +
            element.className
                .replace(/[ ]{2,}/g, ' ')
                .split(' ')
                .join('.');
        return classSelector;
    }
};

/**
 * register the callback for onLoadCallback
 * @param {Element} element
 * @param {function(Element)} onLoadCallback
 */
export const registerLoadEvent = (element, onLoadCallback) => {
    const selector = getUniqInfo(element);
    if (!loadingQueue.value[selector]) {
        loadingQueue.value[selector] = []; //create a list.
    }

    //when no same callback existing in the array, add one.
    loadingQueue.value[selector].filter(callback => callback === onLoadCallback)
        .length === 0 && loadingQueue.value[selector].push(onLoadCallback);
};

var __widthChangeHandlerId = -1;
var __savedInnerWidth = -1;

let __monitoringStarted = false;

const mutationCallback = (mutationsList, observer) => {
    const loadingQueueValue = loadingQueue.value;
    for (const selector in loadingQueueValue) {
        // const selector = getUniqInfo(element);
        if (!(loadingQueueValue[selector]?.length > 0)) continue;

        const elements = getElementBySelector(selector);

        if (elements.length > 0) {
            loadingQueueValue[selector].forEach(evHandler => {
                evHandler(elements);
            });
            while (loadingQueueValue[selector].length > 0)
                loadingQueueValue[selector].pop();
        }
    }
    const emptyQueues = Object.keys(loadingQueueValue).filter(
        s => loadingQueueValue[s].length === 0
    );
    if (emptyQueues.length > 0) {
        const newObj = {};
        for (const selector in loadingQueueValue) {
            if (!emptyQueues.includes(selector))
                newObj[selector] = loadingQueue.value[selector];
        }
        loadingQueue.value = newObj;
    }
};

var __windowMutationObserver = new MutationObserver(mutationCallback);

const config = { attributes: true, childList: true, subtree: true };
__windowMutationObserver.observe(document, config);

export const startMonitoring = initPageCallback => {
    if (__monitoringStarted) {
        throw new Error('startMonitoring should be called only once');
    }
    __monitoringStarted = true;

    window.addEventListener('resize', () => {
        if (__widthChangeHandlerId < 0) {
            __widthChangeHandlerId = setTimeout(() => {
                if (window.innerWidth !== __savedInnerWidth) {
                    __savedInnerWidth = window.innerWidth;
                    mutationCallback();
                }
                __widthChangeHandlerId = -1;
            }, 250);
        }
    });

    initPageCallback();
};

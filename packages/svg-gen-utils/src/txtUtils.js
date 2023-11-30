import { createElementInfo } from './renderUtils';

const validateTextObj = txtObj => {
    if (
        (txtObj.type !== 'linkObj' && txtObj.type !== 'txtObj') ||
        typeof txtObj.txt !== 'string' ||
        txtObj.name === undefined
    ) {
        throw new Error(
            'only {type, name, props, txt} type can be acceptable. use createLinkObj or createTextObj function. received : ' +
                JSON.stringify(txtObj)
        );
    }
};

const getTextLineSpaceObj = (textObj, defaultTxtConfig) => {
    if (typeof textObj === 'object') {
        validateTextObj(textObj);
    }
    return {
        txt: textObj.txt || textObj,
        fontSize: textObj.fontSize || defaultTxtConfig.fontSize || 8,
        spaceBetweenLine:
            textObj.spaceBetweenLine || defaultTxtConfig.spaceBetweenLine || 1,
    };
};

const getTextOffsetY = textInfoArr => {
    const totalHeight = textInfoArr.reduce((prev, curr) => {
        return prev + curr.fontSize + curr.spaceBetweenLine;
    }, 0);
    const firstLine = textInfoArr[0]
        ? textInfoArr[0]
        : { fontSize: 0, spaceBetweenLine: 0, txt: '' };

    const doesFirstlineHaveCapitals = /A-Z/.exec(firstLine.txt);

    const firstLineAcsendSpace = doesFirstlineHaveCapitals
        ? firstLine.fontSize / 8
        : firstLine.fontSize / 4;
    return -(totalHeight / 2.0) - firstLineAcsendSpace;
};

export function createLinkObj(
    txt,
    fontSize = 8,
    spaceBetweenLine = 1,
    color = 'black',
    url = null,
    linkProps = {},
    textProps = {}
) {
    return {
        type: 'linkObj',
        name: 'a',
        txt,
        fontSize,
        color,
        txtProps: textProps,
        spaceBetweenLine,
        linkProps:
            url === null || url === undefined
                ? {
                      'xlink:href': '#0',
                      ...linkProps,
                  }
                : {
                      href: url,
                      ...linkProps,
                  },
    };
}

export function createTextObj(
    txt,
    fontSize = 8,
    spaceBetweenLine = 1,
    color = 'black',
    props = {}
) {
    return {
        type: 'txtObj',
        name: 'no-name',
        txt,
        fontSize,
        color,
        txtProps: props,
        spaceBetweenLine,
    };
}

export function createDefaultOption(
    fontSize = 8,
    spaceBetweenLine = 1,
    color = 'black',
    props = {}
) {
    return {
        fontSize,
        color,
        props,
        spaceBetweenLine,
    };
}

export function drawCenterTexts(
    textArr = [],
    offsetPt = { x: 0, y: 0 },
    defaultTxtConfig = {}
) {
    const textInfoArr = textArr.map(obj =>
        getTextLineSpaceObj(obj, defaultTxtConfig)
    );
    const textOffsetY = getTextOffsetY(textInfoArr);
    let currDy = textOffsetY;

    const addDy = textInfo => {
        const dy = currDy + textInfo.fontSize + textInfo.spaceBetweenLine;
        currDy = dy;
        return dy;
    };
    return textArr.map((txtOrg, idx) => {
        let txt = txtOrg;
        if (typeof txt === 'string') {
            txt = createTextObj(
                txt,
                defaultTxtConfig.fontSize || 8,
                defaultTxtConfig.spaceBetweenLine || 1,
                defaultTxtConfig.color || 'black',
                defaultTxtConfig.props || {}
            );
        }
        validateTextObj(txt);
        const dy = addDy(txt);
        let txtProps = {
            ...txt.txtProps,
            key: 'text-' + idx,
            x: offsetPt.x,
            y: dy + offsetPt.y,
            fill: txt.color,
            textAnchor: 'middle',
            fontSize: txt.fontSize,
        };

        if (txt.type === 'linkObj') {
            txtProps = {
                ...txtProps,
                tabIndex: 0,
                focusable: 'true',
                'data-tabindex': 0,
                'data-Name': 'txt-' + idx,
            };
            const txtElement = createElementInfo('text', txtProps, txt.txt);
            return createElementInfo(txt.name, txt.linkProps, [txtElement]);
        } else {
            return createElementInfo('text', txtProps, txt.txt);
        }
    });
}

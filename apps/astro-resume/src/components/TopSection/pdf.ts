import { TopContents } from 'common-data';
import {
    convertImgToBase64ServerSide,
    getGithubSvg,
    getLineSvg,
} from '../../server-utils/imageHandlers';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
const { name, address, contact, position, website } = TopContents;
import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export async function createPdfMake() {
    const lineSvg = getLineSvg();
    const profileImage = await convertImgToBase64ServerSide(
        __dirname + '/profile-photo150.png',
        'png'
    );
    const doc: TDocumentDefinitions = {
        pageSize: 'LETTER',

        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'portrait',

        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [20, 10],
        content: [
            {
                columns: [
                    {
                        width: 'auto',
                        stack: [
                            {
                                image: 'profileImage',
                                width: 120,
                                height: 120,
                            },
                        ],
                    },
                    {
                        width: '*',
                        stack: [
                            {
                                text: name,
                                fontSize: 30,
                                font: 'RobotoCondensed',
                                bold: true,
                                alignment: 'right',
                            },
                            {
                                text: address,
                                fontSize: 10,
                                alignment: 'right',
                            },
                            {
                                text: position,
                                fontSize: 20,
                                alignment: 'right',
                            },
                            {
                                ...lineSvg,
                                width: 400,
                                height: 10,
                                fit: [400, 10],
                                alignment: 'right',
                            },
                            {
                                text: [
                                    {
                                        text: '📞',
                                        font: 'Emoji',
                                        fontSize: 12,
                                    },
                                    '+1' + contact.phone,
                                    { text: '\t' },
                                    {
                                        text: '📩',
                                        font: 'Emoji',
                                        fontSize: 12,
                                    },
                                    contact.email,
                                ],
                                alignment: 'right',
                            },
                            {
                                columns: [
                                    { text: '', width: '*' },
                                    {
                                        ...getGithubSvg(),
                                        width: 15,
                                        height: 12,
                                    },
                                    {
                                        text: [
                                            {
                                                text: website.github,
                                            },
                                            { text: '\t' },
                                            {
                                                text: '🏠',
                                                font: 'Emoji',
                                                fontSize: 12,
                                            },
                                            {
                                                text: website.homepage,
                                            },
                                        ],
                                        alignment: 'right',
                                        width: 'auto',
                                    },
                                ],
                                alignment: 'right',
                            },
                        ],
                    },
                ],
            },
        ],
        images: {
            profileImage: profileImage,
        },
    };
    return doc;
}

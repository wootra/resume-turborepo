import { TopContents } from 'common-data';
import {
    convertImgBlobToBase64,
    getGithubSvg,
    getLineSvg,
} from '../../../server-utils/imageHandlers';
import path from 'node:path';
import fs from 'fs/promises';
import fetch from 'node-fetch';
import type { Content } from 'pdfmake/interfaces';
const { name, address, contact, position, website } = TopContents;
import { getHost } from '../../../server-utils/host';
export const getImageMap = async () => {
    // const image = await fetch(`${getHost()}/profile-photo150.png`).then(res =>
    //     res.blob()
    // );
    const imagePath = path.join(
        process.cwd(),
        import.meta.env.DEV ? 'assets/textures' : 'assets/textures',
        'profile-photo150.png'
    );
    const imageBuffer = await fs.readFile(imagePath);
    // const imageBuffer = Buffer.from(await image.arrayBuffer());
    const profileImage = convertImgBlobToBase64('png', imageBuffer);
    return {
        profileImage: profileImage,
    };
};
export async function createPdfMake() {
    const lineSvg = getLineSvg();

    const doc: Content[] = [
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
        {
            text: '',
            margin: [0, 0, 0, 10],
        },
    ];
    return doc;
}

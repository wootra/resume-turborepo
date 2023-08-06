import { createTitle } from './../../server-utils/pdf-utils';
import { LeftContents } from 'common-data';
import {
    convertImgToBase64ServerSide,
    getGithubSvg,
    getLineSvg,
} from '../../server-utils/imageHandlers';
import type { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
const { Introduction, Careers, achievements } = LeftContents;
const { DESC, TITLE } = LeftContents.Introduction;
import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
export const getImageMap = async () => {
    return {};
};
export async function createPdfMake() {
    const doc: Content[] = [
        createTitle(Introduction.TITLE),
        {
            text: Introduction.DESC,
            fontSize: 12,
        },
    ];
    return doc;
}

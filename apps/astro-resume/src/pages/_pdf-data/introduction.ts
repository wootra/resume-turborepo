import { createTitle } from '../../server-utils/pdf-utils';
import { LeftContents } from 'common-data';
import type { Content } from 'pdfmake/interfaces';
import { INDENT_SIZE } from './consts';
const { Introduction } = LeftContents;
export const getImageMap = async () => {
    return {};
};
export async function createPdfMake() {
    const doc: Content[] = [
        createTitle(Introduction.TITLE),
        {
            text: Introduction.DESC,
            fontSize: 12,
            margin: [INDENT_SIZE, 0, 0, 0],
        },
    ];
    return doc;
}

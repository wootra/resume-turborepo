import { createTitle } from '../../server-utils/pdf-utils';
import { RightContents } from 'common-data';
import type { Content } from 'pdfmake/interfaces';
import { INDENT_SIZE } from './consts';
const { educations, authority, volunteers } = RightContents;
export const getImageMap = async () => {
    return {};
};
export async function createPdfMake() {
    const doc: Content[] = [
        createTitle('Education'),
        ...educations.map(education => {
            return {
                stack: [
                    buildSchoolInfo(education),
                    ...buildDegreeInfo(education),
                ],
                margin: [INDENT_SIZE, 0, 0, 0],
            } as Content;
        }),

        createTitle('Work Authorization'),
        {
            text: authority.join(', '),
            margin: [INDENT_SIZE, 0, 0, 0],
        },
    ];
    return doc;
}

const buildSchoolInfo = (education: (typeof educations)[0]): Content => {
    return {
        text: education.school.name,
        link: education.school.url,
        fontSize: 14,
        font: 'RobotoCondensed',
        bold: true,
        margin: [0, 0, 0, 6],
    };
};

const buildDegreeInfo = (education: (typeof educations)[0]): Content[] => {
    return education.degrees.map(degree => ({
        text: `${degree.degree} in ${degree.major} (${degree.year})`,
        fontSize: 10,
        font: 'RobotoCondensed',
        margin: [INDENT_SIZE, 0, 0, 2],
    }));
};

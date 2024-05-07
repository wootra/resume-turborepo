import { createTitle } from '../../../server-utils/pdf-utils';
import { LeftContents } from 'common-data';
import type { Content } from 'pdfmake/interfaces';
import { COLORS, INDENT_SIZE } from './consts';
import data from './data-loader';

const { achievements } = LeftContents;
export const getImageMap = async () => {
    return {};
};
export async function createPdfMake() {
    const doc: Content[] = [
        createTitle('More Achievements'),
        ...achievements.map(achievement => {
            return {
                stack: [
                    {
                        text: achievement.company,
                        font: 'RobotoCondensed',
                        color: COLORS.COMPANY_NAME,
                        fontSize: 14,
                        bold: true,
                    },
                    ...achievement.items
                        .map((item, idx) => {
                            return [
                                {
                                    text: `#${idx + 1} ${item.name}`,
                                    font: 'RobotoCondensed',
                                    fontSize: 12,
                                    color: COLORS.ACHIEVEMENT_NAME,
                                    bold: true,
                                    margin: [INDENT_SIZE, 0, 0, 0],
                                },
                                {
                                    stack: [
                                        item.desc && {
                                            text: `${item.desc.replace(
                                                '\n',
                                                ' '
                                            )}`,
                                            margin: [0, 0, 0, 5],
                                        },
                                        item.myPart && {
                                            columns: [
                                                {
                                                    width: 100,
                                                    text: `MY ROLE:`,
                                                    color: '#aaaaaa',
                                                    alignment: 'right',
                                                    margin: [0, 0, 6, 0],
                                                },
                                                {
                                                    width: '*',
                                                    text: item.myPart,
                                                },
                                            ],
                                            margin: [0, 0, 0, 5],
                                        },
                                        item.businessValue && {
                                            columns: [
                                                {
                                                    width: 100,
                                                    text: `BUSINESS VALUE:`,
                                                    alignment: 'right',
                                                    color: '#aaaaaa',
                                                    margin: [0, 0, 6, 0],
                                                },
                                                {
                                                    width: '*',
                                                    text: item.businessValue,
                                                },
                                            ],
                                            margin: [0, 0, 0, 5],
                                        },
                                    ],
                                    margin: [INDENT_SIZE * 2, 0, 0, 0],
                                },
                                { text: '', fontSize: 0, margin: [0, 0, 0, 5] },
                            ] as Content[];
                        })
                        .flat(),
                ],
                margin: [0, 0, 0, 10],
            } as Content;
        }),
    ];
    return doc;
}

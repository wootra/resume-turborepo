import { createTitle } from '../../server-utils/pdf-utils';
import { LeftContents } from 'common-data';
import type { Column, Content } from 'pdfmake/interfaces';
import {
    COLORS,
    INDENT_SIZE,
    NEXT_PAGE,
    TITLE_WID,
    buildTitle,
} from './consts';
const { Careers } = LeftContents;
export const getImageMap = async () => {
    return {};
};
export async function createPdfMake() {
    const doc: Content[] = [
        createTitle(Careers.TITLE),
        {
            stack: Careers.CAREERS.map((career, idx) => {
                return [
                    {
                        stack: [
                            buildCompanyInfo(career),
                            buildRoleInfo(career),
                            buildIndustryAndPosition(career),
                            buildTechStack(career),
                            buildAchievements(career),
                        ],
                        margin: [0, 0, 0, 15],
                    },
                    idx === 1 ? NEXT_PAGE : null,
                ].filter(v => v) as Content[];
            }).flat(),
            margin: [INDENT_SIZE, 0, 0, 0],
        },
    ];
    return doc;
}

const buildAchievements = (career: (typeof Careers.CAREERS)[0]): Content => {
    return {
        columns: [
            buildTitle('achievements', 4),
            {
                width: '*',
                stack: career.achievements.map(a => {
                    return {
                        columns: [
                            {
                                text: '★',
                                font: 'Emoji',
                                fontSize: 10,
                                width: 15,
                                alignment: 'right',
                            },
                            {
                                text: '',
                                width: 3,
                            },
                            {
                                text: a,
                                fontSize: 10,
                                width: '*',
                            },
                        ],
                    };
                }),
            },
        ],
    };
};

const buildTechStack = (career: (typeof Careers.CAREERS)[0]): Content => {
    return {
        columns: [
            buildTitle('skill set', 4),
            {
                width: '*',
                text: career.techStacks.join(', '),
                color: '#475569',
                fontSize: 10,
                margin: [0, 2, 0, 4],
            },
        ],
    };
};

const buildIndustryAndPosition = (
    career: (typeof Careers.CAREERS)[0]
): Content => {
    return {
        columns: [
            {
                width: 'auto',
                columns: [
                    buildTitle('job title', 4),
                    {
                        width: '*',
                        text: career.jobTitle,
                        color: COLORS.JOB_TITLE,
                        fontSize: 14,
                    },
                ],
            },
            {
                width: 10,
                text: ' ',
            },
            {
                columns: [
                    buildTitle('industry', 4),
                    {
                        width: '*',
                        text: career.industry,
                        color: COLORS.INDUSTRY,
                        fontSize: 12,
                        margin: [0, 2, 0, 0],
                    },
                ],
            },
        ],
    };
};

const buildRoleInfo = (career: (typeof Careers.CAREERS)[0]): Content => {
    return {
        columns: [
            buildTitle('role', 2),
            {
                width: '*',
                text: career.role,
                color: '#475569',
                fontSize: 12,
            },
        ],
    };
};
const getMonthYear = (
    yearMonthArr: [number, number] | null,
    fromOrTo: string
) => {
    if (yearMonthArr === null) return `${fromOrTo}: CURRENT`;
    const [year, month] = yearMonthArr;
    return `${fromOrTo}: ${month}/${year}`;
};
const buildCompanyInfo = (career: (typeof Careers.CAREERS)[0]): Content => {
    return {
        columns: [
            {
                width: 'auto',
                stack: [
                    {
                        columns: [
                            buildTitle('company', 6),
                            {
                                width: '*',
                                // width: 'auto',
                                text: `${career.companyName}`,
                                fontSize: 16,
                                color: COLORS.COMPANY_NAME,
                                font: 'RobotoCondensed',
                                bold: true,
                            },
                        ],
                    },
                    {
                        // width: '*',
                        fontSize: 10,
                        text: career.url,
                        margin: [TITLE_WID, 0, 0, 0],
                        color: '#16afc4',
                    },
                ],
            },
            {
                width: '*',
                stack: [
                    {
                        // width: '*',
                        fontSize: 13,
                        text: `${getMonthYear(career.start, 'From')}`,
                        color: '#5c94a8',
                        // margin: [0, 4, 0, 0],
                        alignment: 'right',
                    },
                    {
                        // width: '*',
                        fontSize: 13,
                        text: `${getMonthYear(career.end, 'To')}`,
                        color: '#5c94a8',
                        // margin: [0, 4, 0, 0],
                        alignment: 'right',
                    },
                ],
            },
        ],
        margin: [0, 0, 0, 5],
    };
};

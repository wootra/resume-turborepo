import { createTitle } from '../../server-utils/pdf-utils';
import { LeftContents } from 'common-data';
import type { Content } from 'pdfmake/interfaces';
import { COLORS, CONTINUE_IN_NEXT_PAGE, INDENT_SIZE } from './consts';
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
                    idx === 1 ? CONTINUE_IN_NEXT_PAGE : null,
                ].filter(v => v) as Content[];
            }).flat(),
            margin: [INDENT_SIZE, 0, 0, 0],
        },
    ];
    return doc;
}

const buildAchievements = (career: (typeof Careers.CAREERS)[0]): Content => {
    return {
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
    };
};

const buildTechStack = (career: (typeof Careers.CAREERS)[0]): Content => {
    return {
        text: career.techStacks.join(', '),
        color: '#475569',
        fontSize: 10,
        margin: [0, 2, 0, 4],
    };
};

const buildIndustryAndPosition = (
    career: (typeof Careers.CAREERS)[0]
): Content => {
    return {
        columns: [
            {
                width: 'auto',
                text: career.jobTitle,
                color: COLORS.JOB_TITLE,
                fontSize: 14,
            },
            {
                width: 10,
                text: ' ',
            },
            {
                width: '*',
                text: career.industry,
                color: COLORS.INDUSTRY,
                fontSize: 12,
                margin: [0, 2, 0, 0],
            },
        ],
    };
};

const buildRoleInfo = (career: (typeof Careers.CAREERS)[0]): Content => {
    return {
        text: career.role,
        color: '#475569',
        fontSize: 12,
    };
};

const buildCompanyInfo = (career: (typeof Careers.CAREERS)[0]): Content => {
    return {
        columns: [
            {
                width: 'auto',
                text: career.companyName,
                fontSize: 16,
                color: COLORS.COMPANY_NAME,
                font: 'RobotoCondensed',
                bold: true,
            },
            {
                width: '*',
                fontSize: 10,
                text: career.url,
                margin: [3, 6, 0, 0],
                color: '#16afc4',
            },
            {
                width: 100,
                fontSize: 13,
                text: `${career.start?.map(v => `${v}`).join('.')} - ${
                    career.end?.map(v => `${v}`).join('.') ?? 'CURRENT'
                }`,
                color: '#5c94a8',
                margin: [0, 4, 0, 0],
                alignment: 'right',
            },
        ],
    };
};

import type {
    Column,
    Content,
    ContentColumns,
    ContentStack,
    ContentText,
} from 'pdfmake/interfaces';

export const INDENT_SIZE = 10;
export const COLORS = {
    JOB_TITLE: '#0369a1',
    INDUSTRY: '#d97706',
    SKILL_CATEGORY: '#0369a1',
    SKILL: '#d97706',
    COMPANY_NAME: '#c59700',
    PERIOD: '#5c94a8',
    ACHIEVEMENT_NAME: '#003300',
} as const;

export const CONTINUE_IN_NEXT_PAGE = {
    text: '...continue in the next page',
    pageBreak: 'after',
    fontSize: 10,
    margin: [0, 20, 0, 0],
} as Content;

export const NEXT_PAGE = {
    pageBreak: 'after',
    fontSize: 0,
    text: '',
} as Content;

export const TITLE_WID = 70;
export const buildTitle = (title: string, topMargin: number = 6): Column => ({
    width: TITLE_WID,
    text: `${title.toUpperCase()}:`,
    fontSize: 10,
    color: '#bbbbbb',
    // margin: [3, 6, 0, 0],
    alignment: 'right',
    margin: [0, topMargin, 6, 0],
});

export const buildTitleWithContent = (
    title: string,
    topMargin: number = 6,
    content: ContentText | ContentStack | ContentColumns
): ContentColumns => ({
    columns: [
        {
            width: TITLE_WID,
            text: `${title.toUpperCase()}:`,
            fontSize: 10,
            color: '#bbbbbb',
            // margin: [3, 6, 0, 0],
            alignment: 'right',
            margin: [0, topMargin, 6, 0],
        },
        {
            width: '*',
            ...content,
        },
    ],
});

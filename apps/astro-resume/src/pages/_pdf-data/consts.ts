import type { Content } from 'pdfmake/interfaces';

export const INDENT_SIZE = 10;
export const COLORS = {
    JOB_TITLE: '#0369a1',
    INDUSTRY: '#d97706',
    SKILL_CATEGORY: '#0369a1',
    SKILL: '#d97706',
    COMPANY_NAME: '#c59700',
    ACHIEVEMENT_NAME: '#003300',
} as const;

export const CONTINUE_IN_NEXT_PAGE = {
    text: '...continue in the next page',
    pageBreak: 'after',
    fontSize: 10,
    margin: [0, 20, 0, 0],
} as Content;

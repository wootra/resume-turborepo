import { createTitle } from '../../../server-utils/pdf-utils';
import type { Content } from 'pdfmake/interfaces';
import { COLORS, INDENT_SIZE } from './consts';
import data from './data-loader';
const { skillLevels } = data;
export const getImageMap = async () => {
    return {};
};
export async function createPdfMake() {
    const doc: Content[] = [
        createTitle('Skill Levels (1-5)'),
        ...Object.keys(skillLevels)
            .map(category => {
                return {
                    columns: [
                        {
                            width: 140,
                            text: category,
                            bold: true,
                            fontSize: 14,
                            color: COLORS.SKILL_CATEGORY,
                        },
                        {
                            width: 430 - INDENT_SIZE,
                            text: skillLevels[
                                category as keyof typeof skillLevels
                            ]
                                .sort((v1, v2) => v2.levelNo - v1.levelNo)
                                .map(
                                    skill =>
                                        `${skill.skillName} (${skill.levelNo})`
                                )
                                .join(', '),
                            fontSize: 10,
                            color: COLORS.SKILL,
                            margin: [0, 4, 0, 0],
                        },
                        { text: '', fontSize: 0, margin: [0, 0, 0, 5] },
                    ] as Content[],
                    margin: [INDENT_SIZE, 0, 0, 10],
                } as Content;
            })
            .flat(),
    ];
    return doc;
}

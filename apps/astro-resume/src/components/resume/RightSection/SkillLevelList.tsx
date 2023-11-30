import { ExpandPanel, ExpandPanelProvider } from 'react-ui';
import { RightContents } from 'common-data';
const { skillLevels } = RightContents;

export const SkillLevlList = () => {
    return (
        <ExpandPanelProvider>
            {Object.keys(skillLevels).map((category, idx) => (
                <ExpandPanel
                    key={category}
                    title={category}
                    className='bg-cyan-950 rounded-md px-2 text-sm'
                    group='skill-level'
                    isInitiallyExpanded={idx === 0}
                    data-tooltip='max skill level is 🟢🟢🟢🟢🟢'
                    allowCollapseFromBody={true}
                >
                    <ul className='flex flex-col gap-2 text-gray-light py-2'>
                        {skillLevels[category].map(({ skillName, levelNo }) => (
                            <li
                                key={skillName}
                                className='flex flex-row pl-2 text-xs leading-5 bg-slate-700 rounded-md'
                            >
                                <span className='grow text-left text-slate-300'>
                                    {skillName}
                                </span>
                                <span className='text-right my-auto'>
                                    {new Array(levelNo).fill('🟢').join('')}
                                </span>
                            </li>
                        ))}
                    </ul>
                </ExpandPanel>
            ))}
        </ExpandPanelProvider>
    );
};

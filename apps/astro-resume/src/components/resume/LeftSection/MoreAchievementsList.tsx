import { LeftContents } from 'common-data';
import { ExpandPanel, ExpandPanelProvider } from 'react-ui';

const { achievements } = LeftContents;

export const MoreAchievementsList = () => {
    return (
        <ExpandPanelProvider>
            {achievements.map(a => (
                <ExpandPanel
                    key={a.company}
                    title={a.company}
                    className='bg-slate-200 rounded-md p-2'
                    maxHeight='300px'
                    allowCollapseFromBody={true}
                >
                    <ul className='flex flex-col gap-4 pt-4'>
                        {a.items.map(item => (
                            <li className='flex flex-col' key={item.name}>
                                <header>{item.name}</header>
                                <p
                                    className='business-value text-sm text-cyan-600'
                                    data-tooltip='Business Values'
                                >
                                    {item.businessValue}
                                </p>
                                <p
                                    className='my-part text-sm text-amber-900'
                                    data-tooltip='My Contribution'
                                >
                                    {item.myPart}
                                </p>
                                {item.desc && (
                                    <p
                                        className='desc text-sm text-neutral-700'
                                        data-tooltip='More Description'
                                    >
                                        {item.desc}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </ExpandPanel>
            ))}
        </ExpandPanelProvider>
    );
};

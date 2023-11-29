import { BannerProps } from 'resume-types';
import 'resume-css/banner/banner.css';
import 'resume-css/link/animate-underline.css';
import { bannerLinks } from 'common-data';

function onSelect(target: HTMLSelectElement) {
    const selected = target.value as keyof typeof bannerLinks;
    const selectedLink = bannerLinks[selected];
    window.location.href = selectedLink;
}

export const BannerBase = ({
    description,
    currentLabel,
    links,
    sourceLinks,
}: BannerProps) => {
    return (
        <div className='top-banner'>
            <div>
                <span>{description}</span>
                {links && currentLabel && (
                    <select
                        onChange={e => onSelect(e.currentTarget)}
                        value={currentLabel}
                    >
                        {Object.keys(links).map(label => (
                            <option
                                key={label}
                                // selected={currentLabel === label}
                                value={label}
                            >
                                {label}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            {sourceLinks && (
                <div>
                    {Object.keys(sourceLinks).map(label => (
                        <a
                            key={label}
                            className='animate-underline'
                            href={sourceLinks[label]}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

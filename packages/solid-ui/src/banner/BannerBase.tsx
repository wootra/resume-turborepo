import { BannerProps } from 'resume-types';
import 'resume-css/banner/banner.css';
import 'resume-css/link/animate-underline.css';
import { Component, For } from 'solid-js';
import { bannerLinks } from 'common-data';

function onSelect(target: HTMLSelectElement) {
    const selected = target.value as keyof typeof bannerLinks;
    const selectedLink = bannerLinks[selected];
    window.location.href = selectedLink;
}

export const BannerBase: Component<BannerProps> = ({
    description,
    currentLabel,
    links,
    sourceLinks,
}) => {
    return (
        <div class='top-banner'>
            <div>
                <span>{description}</span>
                {links && currentLabel && (
                    <select onChange={e => onSelect(e.currentTarget)}>
                        <For each={Object.keys(links)}>
                            {label => (
                                <option
                                    selected={currentLabel === label}
                                    value={label}
                                >
                                    {label}
                                </option>
                            )}
                        </For>
                    </select>
                )}
            </div>
            {sourceLinks && (
                <div>
                    <For each={Object.keys(sourceLinks)}>
                        {label => (
                            <a
                                class='animate-underline'
                                href={sourceLinks[label]}
                            >
                                {label}
                            </a>
                        )}
                    </For>
                </div>
            )}
        </div>
    );
};

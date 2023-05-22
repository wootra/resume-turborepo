import { FrameworkNoticeBannerProps } from 'resume-types';
import 'resume-css/banner/banner.css';
import { Component, For } from 'solid-js';
import { bannerLinks } from 'common-data';
import { BannerBase } from './BannerBase';

export const FrameworkNoticeBanner: Component<
    FrameworkNoticeBannerProps<typeof bannerLinks>
> = ({ description, currentLabel, sourceLinks }) => {
    return (
        <BannerBase
            description={description}
            currentLabel={currentLabel}
            links={bannerLinks}
            sourceLinks={sourceLinks}
        />
    );
};

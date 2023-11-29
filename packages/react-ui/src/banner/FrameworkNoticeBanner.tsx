import { FrameworkNoticeBannerProps } from 'resume-types';
import 'resume-css/banner/banner.css';
import { bannerLinks } from 'common-data';
import { BannerBase } from './BannerBase';

export const FrameworkNoticeBanner = ({
    description,
    currentLabel,
    sourceLinks,
}: FrameworkNoticeBannerProps<typeof bannerLinks>) => {
    return (
        <BannerBase
            description={description}
            currentLabel={currentLabel}
            links={bannerLinks}
            sourceLinks={sourceLinks}
        />
    );
};

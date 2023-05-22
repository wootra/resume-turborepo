export type LinkMap = Readonly<{
    [key: string]: string;
}>;

export interface BannerProps {
    description: string;
    currentLabel: string;
    links: LinkMap;
}

export interface FrameworkNoticeBannerProps<T extends LinkMap> {
    description: string;
    currentLabel: keyof T;
}

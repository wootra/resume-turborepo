export type LinkMap = Readonly<{
    [key: string]: string;
}>;

export interface BannerProps {
    description: any;
    currentLabel?: string;
    links?: LinkMap;
    sourceLinks?: LinkMap;
}

export interface FrameworkNoticeBannerProps<T extends LinkMap> {
    description: any;
    currentLabel?: keyof T;
    sourceLinks?: LinkMap;
}

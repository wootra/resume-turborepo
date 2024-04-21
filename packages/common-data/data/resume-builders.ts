export type YearMonth = [number, number] | null;

export const buildCareer = (
    companyName: string,
    url: string,
    start: YearMonth,
    end: YearMonth,
    role: string,
    industry: string,
    jobTitle: string,
    techStacks: string[],
    achievements: string[] = []
) => ({
    companyName,
    url,
    start,
    end,
    role,
    industry,
    jobTitle,
    techStacks,
    achievements,
});

export type CareerType = ReturnType<typeof buildCareer>;

export const buildSkillLevel = (skillName: string, levelNo: number) => ({
    dataType: 'skillLevel',
    skillName,
    levelNo,
});
export type SkillLevelObj = ReturnType<typeof buildSkillLevel>;

export const buildVolunteer = (role: string, where: string, url: string) => ({
    dataType: 'volunteer',
    role,
    where,
    url,
});
export type VolunteerObj = ReturnType<typeof buildVolunteer>;

export const buildSchool = (name: string, url: string) => ({ name, url });
export type SchoolObj = ReturnType<typeof buildSchool>;

export const buildDegree = (major: string, degree: string, year: number) => ({
    dataType: 'schoolDegree',
    major,
    degree,
    year: year,
});
export type DegreeObj = ReturnType<typeof buildDegree>;

export const buildEducation = (school: SchoolObj, degrees: DegreeObj[]) => ({
    dataType: 'education',
    school,
    degrees,
});
export type EducationObj = ReturnType<typeof buildEducation>;

export const buildAward = (award: string, year: number) => ({ award, year });
export type AwardObj = ReturnType<typeof buildAward>;

export const buildAchievementItem = (
    name: string,
    businessValue: string,
    myPart: string,
    desc?: string
) => ({
    dataType: 'achievement-item',
    name,
    businessValue,
    myPart,
    desc,
});

export type AchievementItemObj = ReturnType<typeof buildAchievementItem>;

export const buildAchievement = (
    company: string,
    items: AchievementItemObj[]
) => ({
    dataType: 'achievement-in-company',
    company,
    items,
});

export type AchievementObj = ReturnType<typeof buildAchievement>;

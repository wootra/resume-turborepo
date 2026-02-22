const {
	LeftContents: __LeftContents,
	TopContents: __TopContents,
	RightContents: __RightContents,
} = await import('./consts.js?' + getVariant());

/**
 * LeftContents
 * @type {{
 *  Introduction: {TITLE:string, DESC:string},
 *  Careers: {TITLE:string, CAREERS:[CareerType] }
 * }}
 */
export const LeftContents = __LeftContents;

export const TopContents = __TopContents;

/**
 * @type {{
 * skillLevels: Object<string, [SkillObj]>,
 * volunteers: [VolunteerObj],
 * educations: [EducationObj],
 * awards: [AwardObj],
 * authority: [string],
 * achievements: [{company:string, items:[AchievementObj]}]
 * }}
 */
export const RightContents = __RightContents;

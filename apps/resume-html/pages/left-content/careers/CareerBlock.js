import { createElement } from '../../../tools/elementTools.js';

/**
 * @typedef {[number, number]} YearMonth [year, month]
 */

const assignDigits = (num, digits) => {
    digits--;
    let addStr = '';
    while (digits > 0 && num < Math.pow(10, digits)) {
        addStr += '0';
        digits--;
    }
    return addStr + num;
};

const CompanyTitle = (companyName, url) =>
    createElement(
        'h3',
        { className: 'company-title' },
        createElement(
            'a',
            {
                href: url,
                target: '_blank',
                ariaLabel: `link to ${companyName}`,
                'data-url': `(${url})`,
                'data-tooltip': `link to ${companyName} - ${url}`,
                tooltip: `link to ${companyName}`,
            },
            [companyName]
        )
    );
const CareerSpan = (start, end) => {
    const endTxt = (end && `${end[0]}.${assignDigits(end[1], 2)}`) || 'CURRENT';
    return createElement(
        'span',
        { className: 'career-span' },
        `${start[0]}.${assignDigits(start[1], 2)}-${endTxt}`
    );
};
const Role = role =>
    createElement(
        'p',
        { className: 'career-role', 'data-tooltip': 'Career role' },
        role
    );
const Industry = ind =>
    createElement(
        'p',
        { className: 'career-industry', 'data-tooltip': 'industry' },
        ind
    );
const JobTitle = title =>
    createElement(
        'p',
        { className: 'career-job-title', 'data-tooltip': 'job title' },
        title
    );
const TechStacks = techs =>
    createElement(
        'p',
        { className: 'career-tech-stack', 'data-tooltip': 'tech stacks' },
        techs.join(' / ')
    );

/**
 *
 * @param {[string]} achievements
 * @returns {Element}
 */
const Achievements = achievements =>
    createElement(
        'ul',
        {
            className: 'career-achievements',
            'data-tooltip_after': 'achievements',
        },
        achievements.map(ach => createElement('li', {}, ach))
    );

/**
 *
 * @param {CareerType} info
 */
export const CareerBlock = info => {
    return createElement('div', { className: 'career-block' }, [
        CompanyTitle(info.companyName, info.url),
        CareerSpan(info.start, info.end),
        Role(info.role),
        createElement('div', { className: 'career-industry-title' }, [
            Industry(info.industry),
            JobTitle(info.jobTitle),
        ]),
        TechStacks(info.techStacks),
        Achievements(info.achievements),
    ]);
};

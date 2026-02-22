/**
 *
 * @param {string} companyName
 * @param {string} url
 * @param {YearMonth} start
 * @param {YearMonth} end
 * @param {string} role
 * @param {string} industry
 * @param {string} jobTitle
 * @param {[string]} techStacks
 * @param {[string]} achievements
 * @returns {CareerType}
 */
const buildCareer = (companyName, url, start, end, role, industry, jobTitle, techStacks, achievements = []) => ({
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

/**
 * LeftContents
 * @type {{
 *  Introduction: {TITLE:string, DESC:string},
 *  Careers: {TITLE:string, CAREERS:[CareerType] }
 * }}
 */
export const LeftContents = Object.freeze({
	Introduction: Object.freeze({
		TITLE: 'Introduction',
		DESC: `I am a team lead who values every team member's gifts. I believe a team is created not by their individual skills or efforts alone, but by the synergy of the team as a whole.
 I have been leading teams for 5 years, while I have been a software engineer for 13 years. My wide range of experience in various industries such as financial, defense, and aerospace have been helping for me to be flexible and adaptable, and I am always eager to learn new technologies. I am also a strong advocate for agile methodologies and continuous improvement.
 I am looking for a company that values teamwork, innovation, and continuous learning. I am excited to contribute my skills and experience to a team that is passionate about creating great products and making a positive impact on the world.`,
	}),
	Careers: Object.freeze({
		TITLE: 'Careers',
		CAREERS: [
			buildCareer(
				'NBH Bank',
				'https://www.nbhbank.com/',
				[2024, 10],
				null,
				`As a team lead of the full-stack team in NBH Bank. I have been leading the mobile/web upgrade project, managing and upgrading existing Nest.js BE. I have been improving the performance of the development team by improving multiple development processes and technical architecture.`,
				'Financial',
				'Lead Fullstack engineer',
				[
					'React',
					'React Native(0.70-0.81.5)',
					'Expo',
					'Nest.js',
					'Typescript',
					'Azure',
					'MSSql',
					'Event-driven architecture',
					'AppInsight',
					'Google Analytics',
					'Firebase',
					'Auth0',
				],
				[
					'Plan and lead the upgrade of React Native project from 0.70 to 0.81.5',
					'POC of migration from React Native CLI to Expo project.(custom plugins, migration of native code, minimal code changes)',
					'Upgrade eslint configuration from json to js for the latest eslint features and to support the latest eslint plugins as well as typescript supports',
					'Convert loose typescript code base to full strict typescript code base',
					'Conceptualize the performance-first testing strategy and removing noop tests and flaky tests',
					'Conceptualize GIT strategy to migrate into trunk based development and to minimize the code conflicts',
					'Improve Nuxeo based CMS Taxonomy architecture to handle broader amount of teams in common standard',
					'Improve Google Analytics and AppInsight logging system to handle user-specific events and to give more insights to the business team',
					'Re-architecture React Native navigation and remove flickering on navigations',
				],
			),
			buildCareer(
				'Dimensional Fund Advisors (DFA)',
				'https://dimensional.com/',
				[2022, 8],
				[2022, 10],
				'Maintain & Improve Financial Readiness/Wellness app, Small Business Insurance app',
				'Financial / Insurance',
				'SW Engineer Senior (Team Lead)',
				[
					'React (class, functional)',
					'Redux',
					'Router(v5/v6)',
					'Java8',
					'Javascript(vanilla/ES6~2021)',
					'RESTful API(JBoss/Spring boot/Node.js & Express)',
					'Openshift',
					'gitlab-ci',
					'Mocha',
					'Jest',
					'Enzyme',
					'Cypress',
					'RTL(React Testing Library)',
					'Spock',
					'Mockito',
					'JUnit(4/5)',
					'Kafka',
				],
				[
					'Improvement of Small business Insurance Experience',
					'Mordernization of Financial Readiness site (Talon/New Web)',
					'Improve performance/reliability of the Financial Readiness app',
					'Involved to overall applications except for batch process',
					'Leading the dev team',
				],
			),
			buildCareer(
				'USAA',
				'https://usaa.com/',
				[2018, 9],
				[2022, 8],
				'Maintain & Improve Financial Readiness/Wellness app, Small Business Insurance app',
				'Financial / Insurance',
				'SW Engineer Senior (Team Lead)',
				[
					'React (class, functional)',
					'Redux',
					'Router(v5/v6)',
					'Java8',
					'Javascript(vanilla/ES6~2021)',
					'RESTful API(JBoss/Spring boot/Node.js & Express)',
					'Openshift',
					'gitlab-ci',
					'Mocha',
					'Jest',
					'Enzyme',
					'Cypress',
					'RTL(React Testing Library)',
					'Spock',
					'Mockito',
					'JUnit(4/5)',
					'Kafka',
				],
				[
					'Improvement of Small business Insurance Experience',
					'Mordernization of Financial Readiness site (Talon/New Web)',
					'Improve performance/reliability of the Financial Readiness app',
					'Involved to overall applications except for batch process',
					'Leading the dev team',
				],
			),
			buildCareer(
				'Eonic Korea',
				'http://eonic.co.kr/',
				[2016, 7],
				[2018, 3],
				'Signal Analysis, Architecutre, Development',
				'Sonar / Defense systems',
				'Lead SW Engineer',
				['C', 'C++', 'Socket communication', 'Labview', 'Intel IPP/TBB', 'Linux', 'Lab Windows/CVI', 'GIT/SVN'],
				[
					'Development of Habor defense system',
					'Development of sonar system in a submarine(Jangbogo)',
					'Software team lead',
					'Software architecture, analyze sonar footprints',
				],
			),
			buildCareer(
				'Realtimewave',
				'http://realtimewave.com/',
				[2011, 2],
				[2016, 6],
				'Development of Automated/Manual Test Solutions for real time devices such as UAV and Guided Missile Systems',
				'Aero / Defense systems',
				'SW Engineer',
				[
					'C/C++',
					'MFC',
					'C#.Net',
					'RT/Java',
					'LUA',
					'Python',
					'Socket',
					'XML',
					'OpenGL',
					'Python',
					'MATLAB',
					'VxWorks',
					'Linux',
					'QT',
				],
				[
					'Initiate / Develop TestNgine™ - RT testing tool',
					'Participate developing RTNgine™ - RT simulator',
					'Initiate Packet management and automated scenario software',
					'Initiate Realtime scenario management software',
				],
			),
		],
	}),
});

export const TopContents = Object.freeze({
	name: 'Songhyeon Jun',
	address: 'Melissa, TX, 75454',
	position: 'Lead Fullstack Engineer',
	contact: {
		phone: '(512)919-6009',
		email: 'shjeon0730@gmail.com',
	},
	website: {
		homepage: 'https://www.sh-jun.com',
		github: 'https://github.com/wootra',
	},
});

/**
 *
 * @param {string} skillName
 * @param {number} levelNo
 * @returns {SkillObj}
 */
const buildSkillLevel = (skillName, levelNo) => ({ skillName, levelNo });

/**
 *
 * @param {string} role
 * @param {string} where
 * @param {string} url
 * @returns {VolunteerObj}
 */
const buildVolunteer = (role, where, url) => ({ role, where, url });

/**
 *
 * @param {string} name
 * @param {string} url
 * @returns {SchoolObj}
 */
const buildSchool = (name, url) => ({ name, url });

/**
 *
 * @param {string} major
 * @param {string} degree
 * @param {number} year
 * @returns {DegreeObj}
 */
const buildDegree = (major, degree, year) => ({ major, degree, year: year });

/**
 *
 * @param {SchoolObj} school
 * @param {[DegreeObj]} degrees
 * @returns {EducationObj}
 */
const buildEducation = (school, degrees) => ({ school, degrees });

/**
 *
 * @param {string} award
 * @param {number} year
 * @returns {AwardObj}
 */
const buildAward = (award, year) => ({ award, year });

/**
 *
 * @param {string} name
 * @param {string} businessValue
 * @param {string} myPart
 * @param {string} desc
 * @returns {AchievementObj}
 */
const buildAchievementItem = (name, businessValue, myPart, desc) => ({
	name,
	businessValue,
	myPart,
	desc,
});

/**
 *
 * @param {string} company
 * @param {[AchievementObj]} items
 * @returns {{company:string, items:[AchievementObj]}}
 */
const buildAchievement = (company, items) => ({ company, items });

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
export const RightContents = Object.freeze({
	skillLevels: {
		'Programming Languages': [
			buildSkillLevel('Typescript', 5),
			buildSkillLevel('Javascript', 5),
			buildSkillLevel('Java', 5),
			buildSkillLevel('Python', 5),
			buildSkillLevel('C#.Net', 5),
			buildSkillLevel('C/C++', 5),
			buildSkillLevel('LUA', 3),
			buildSkillLevel('Rust', 3),
			buildSkillLevel('Dart', 3),
			buildSkillLevel('Go', 3),
		],
		'Descriptive Languages': [buildSkillLevel('YAML', 5), buildSkillLevel('XML', 5), buildSkillLevel('SVG', 5)],
		'Etc Languages': [buildSkillLevel('SQL', 4)],
		'Frameworks(FE/Fullstack)': [
			buildSkillLevel('React.js', 5),
			buildSkillLevel('React Native', 5),
			buildSkillLevel('Next.js', 5),
			buildSkillLevel('Astro.js', 5),
			buildSkillLevel('Solid.js', 4),

			buildSkillLevel('Svelte', 3),
			buildSkillLevel('JQuery', 3),
			buildSkillLevel('Angular 6', 2),
		],
		Analytics: [
			buildSkillLevel('Elastic Search', 3),
			buildSkillLevel('Google Analytics', 3),
			buildSkillLevel('App Insight', 3),
			buildSkillLevel('Azure Non Sentinel', 3),
		],
		'Libraries(Core)': [
			buildSkillLevel('Rxjs', 4),
			buildSkillLevel('jotai', 5),
			buildSkillLevel('zustand', 5),
			buildSkillLevel('RTK', 5),
			buildSkillLevel('Pdf Make', 5),
		],
		Security: [buildSkillLevel('Auth0', 5), buildSkillLevel('NextAuth', 4)],
		A11y: [buildSkillLevel('WCAG 2.1 AA', 4)],
		'Frameworks(BE)': [
			buildSkillLevel('Node.js', 5),
			buildSkillLevel('Express', 5),
			buildSkillLevel('Jax-RS', 4),
			buildSkillLevel('Spring Boot', 4),
			buildSkillLevel('Kafka', 2),
		],
		'Frameworks(DB)': [
			buildSkillLevel('GraphQL', 4),
			buildSkillLevel('Prisma', 4),
			buildSkillLevel('Flask', 4),
			buildSkillLevel('SQL Alchemy', 4),
			buildSkillLevel('Firebase/firestore', 4),
			buildSkillLevel('supabase', 4),
			buildSkillLevel('JPA', 3),
		],
		database: [
			buildSkillLevel('MS-SQL', 4),
			buildSkillLevel('Postgres', 4),
			buildSkillLevel('My-SQL', 4),
			buildSkillLevel('DB2', 4),
			buildSkillLevel('Mongo DB', 4),
		],
		UX: [
			buildSkillLevel('CSS3/SASS/LESS/SCSS', 5),
			buildSkillLevel('TailwindCSS', 5),
			buildSkillLevel('CSS Module', 5),
			buildSkillLevel('StyledComponent', 5),
			buildSkillLevel('StyleX', 3),
		],
		Design: [buildSkillLevel('Figma', 3), buildSkillLevel('Photoshop', 3), buildSkillLevel('Illustrator', 3)],
		'Bundler/Task Runner': [
			buildSkillLevel('Vite', 5),
			buildSkillLevel('Npm.js', 5),
			buildSkillLevel('Npm', 5),
			buildSkillLevel('pnpm', 5),
			buildSkillLevel('yarn', 4),
			buildSkillLevel('bun', 3),
			buildSkillLevel('gulp', 3),
			buildSkillLevel('Rollup', 2),
			buildSkillLevel('Webpack', 2),
		],
		'Mono repo': [buildSkillLevel('Turbo repo', 5), buildSkillLevel('Nx Repo', 3), buildSkillLevel('Rush Repo', 2)],
		'Shell Scripts': [buildSkillLevel('bash', 4), buildSkillLevel('cmd-sh', 3)],
		'Test Framework': [
			buildSkillLevel('RTL', 5),
			buildSkillLevel('Jest', 5),
			buildSkillLevel('Vitest', 5),
			buildSkillLevel('Playwright', 5),
			buildSkillLevel('Cypress', 5),
			buildSkillLevel('Mocha', 5),
			buildSkillLevel('Enzyme', 5),
			buildSkillLevel('sinon', 5),
			buildSkillLevel('Mockito', 5),
			buildSkillLevel('Pytest', 4),
			buildSkillLevel('Selenium', 3),
			buildSkillLevel('Spock', 3),
		],

		'Dev Ops': [
			buildSkillLevel('Azure DevOps', 5),
			buildSkillLevel('Gialb-ci', 5),
			buildSkillLevel('Jenkins', 5),
			buildSkillLevel('Docker', 4),
			buildSkillLevel('Kubernetes', 4),
			buildSkillLevel('Openshift', 3),
		],
		AI: [
			buildSkillLevel('OpenAI API', 5),
			buildSkillLevel('Jupiter Notebook', 4),
			buildSkillLevel('Pandas', 4),
			buildSkillLevel('Numpy', 4),
			buildSkillLevel('Matplotlib', 4),
			buildSkillLevel('TensorFlow/Keras', 3),
			buildSkillLevel('Scikit-learn', 3),
		],
		'Analysis Tools(HW)': [
			buildSkillLevel('Lab Windows/CVI', 5),
			buildSkillLevel('Matlab', 4),
			buildSkillLevel('Labview', 3),
		],
		Documentation: [buildSkillLevel('JsDocs', 5), buildSkillLevel('ReadMe(md)', 5), buildSkillLevel('Mermaid', 5)],
		'Project Management': [
			buildSkillLevel('Agile/Jira', 5),
			buildSkillLevel('SAFE', 5),
			buildSkillLevel('SDLC', 5),
		],
		'Network(HW)': [
			buildSkillLevel('TCP/IP, UDP', 5),
			buildSkillLevel('RS-232/RS-422/MIL1553', 4),
			buildSkillLevel('Analog/Discrete', 4),
			buildSkillLevel('GPS/GNSS', 3),
			buildSkillLevel('I2C', 3),
		],
		'Multimedia/Office': [
			buildSkillLevel('Flash/Action Script', 5),
			buildSkillLevel('Photoshop', 4),
			buildSkillLevel('Illustrator', 4),
			buildSkillLevel('Excel', 4),
			buildSkillLevel('PowerPoint', 4),
			buildSkillLevel('Word', 3),
		],
	},
	volunteers: [
		buildVolunteer(
			'Korean Language Teacher',
			'San Antonio Korean School',
			'https://www.facebook.com/SanAntonioKoreanSchool/',
		),
		buildVolunteer(
			'Vice President',
			'GonAPus ( Amateur Astronomy Club ) in GNU',
			'https://www.facebook.com/GonApus/',
		),
		buildVolunteer('Training Helper', 'Youth traning center', 'http://www.gnyouthtc.or.kr/'),
	],
	educations: [
		buildEducation(buildSchool('Gyeongsang National Univ', 'https://www.gnu.ac.kr/'), [
			buildDegree('Computer Science', 'BC', 2005),
			buildDegree('Mechanical Engineering', 'BE', 2005),
		]),
	],
	awards: [buildAward('3D-Scanner using 3-color layers', 2004)],
	authority: ['Permanent Residence(Green Card)'],
	achievements: [
		buildAchievement('NBH Bank', [
			buildAchievementItem(
				'Upgrade React Native from 0.70 to 0.81.5',
				'Improve performance, reliability, and security',
				'Plan, leading and guiding, configuration, architecture design on navigation and typescript, fixing typescript/eslint/unit test errors and defects',
				'The upgrade of React Native was a big project since the existing code base was not fully typescript and there were a lot of dependencies that were not compatible with the latest version of React Native. Also google playstore and apple app store restriction exposed the company a critical risk on business. I have planned the upgrade process, guided the team through the upgrade, and fixed all the errors and defects that came up during the upgrade. The upgrade improved performance, reliability, and security of the application, and also the dev experience for the further development is dramatically improved.',
			),
			buildAchievementItem(
				'POC of migration from React Native CLI to Expo project',
				'Providing a guideline for the migration, finding out potential issues and solutions, and leading the team to start the migration project',
				'Plan, leading, creating custom plugins, building the project, setting up debug tools.',
				'while the existing react-native project was written with old, outdated dependencies, there was opportunity to migrate the project to Expo project which can give us better dev experience and easier maintenance. I have created a POC branch for the migration with custom plugins and minimal code changes to make sure the migration is possible and to find out the potential issues that we can face during the migration. This led the team to start mobile upgrade project and put me as the leading role with the massive impact. The only reason we could not use the project as it is was because of failure of existing unit tests that are not well written, lack of automation test, and lack of capacity in the team to push it. However, the POC was a great success to give us confidence to start the migration project and to give us a guideline for the migration.',
			),
			buildAchievementItem(
				'CMS taxonomy improvement',
				'Improve the taxonomy architecture to handle broader amount of teams in common standard',
				'Analyze the existing taxonomy architecture, design the new taxonomy architecture, and implement the new taxonomy architecture',
				'The existing CMS taxonomy architecture was overly verbose and complex, and did not match with the UI structure. This caused a lot of confusion which does not have in common idea to make it or to manage it by developers and PMs. I have analyzed the existing taxonomy architecture, designed the new taxonomy architecture to match with the UI structure and to be more intuitive, and implemented the new taxonomy architecture. The new taxonomy architecture improved the manageability and usability of the CMS for the content creators and PMs, and also improved the development experience for the developers.',
			),
			buildAchievementItem(
				'Improve Google Analytics and AppInsight logging system',
				'Improve Analytics ability for more business insights and allow faster fix for service interference issues',
				'Collaborate with the analytics team, design the new logging system, and implement the new logging system',
				`The existing logging system did not provide unique user-specific events that made hard to identify the user's actual intreaction flows to analyze issues. I have collaborated with analytics team to analyze the existing loggin system, and improved the logging systems as well as implementing DebugView experience on Firebase Analytics Dashboard. The new logging system provided more insights to the business team and also improved the debugging experience for the developers.`,
			),
			buildAchievementItem(
				'Re-architecture React Native navigation and remove flickering on navigations',
				'Improving company reputation by improving user experience',
				'Analyze the existing navigation architecture, design the new navigation architecture, and lead the implementation of the new navigation architecture',
				'The existing react-native-navigation based navigation was not well architectured causing flickering, not-existing route issues. I have analyzed the issues and found it was caused because of redundancy and deep-nesting navigation structure that was made out of the lack of understanding on the library. I have designed the new navigation architecture to be more flat and modularized, and lead the implementation of the new navigation architecture. The new navigation architecture removed the flickering on navigations and also improved the stability of the application.',
			),
			buildAchievementItem(
				'Git strategy for trunk based development',
				'Improve reliability and minimize the governance risk on management of versions',
				'Design the git strategy, and lead the team to follow the git strategy',
				'To migrate into trunk based development, I have designed the git strategy to minimize the code conflicts and to make it easier for the developers to follow. The git strategy includes using feature branches for development, and one-directional merging flow to the trunk branch. To resolve conflicts from "hot-fix" commits, I have designed the multi-tagging strategy to makes the commits transparent from each starting points, instead of using 3-way merging or rebasing that can cause disruption of the commit history. The new git strategy improved the reliability of the code and also minimized the governance risk on management of versions.',
			),
		]),
		buildAchievement('Dimensional Fund Advisors', [
			buildAchievementItem(
				'Refactor legacy code in fund/model center',
				`plan, documentation, coding, testing(React, Typescript, Jotai 2.0)`,
				`the existing code in model center and fund center was written 2000+ lines of class components
                 with a lot of prop-drilling which makes code reusability and readability bad. 
                 I refactored the code using Jotai 2.0 deleting a lot of prop drilling improving code readability and reusability.
                 While refactoring I converted javascript code to typescript code as well as creating a lot of types 
                 to reduce human errors in the future.`,
			),
			buildAchievementItem(
				'Improve disclosure position on PDF using PDFMake',
				`research on PDFMake, create new disclosure manager(React, Pdfmake)`,
				`Disclosure on the PDF make in DFA is dynamic in size, 
                so making it on the bottom of the document is touch subject. 
                I made disclosure manager to save all the disclosure data attached 
                to the subjects that should be added to the page first, 
                and made the disclosure based on the subject added in the page 
                to decide which disclosure should be added. 
                Also measured the size of the disclosure 
                before it is added to calculate if it fits in the page.`,
			),
		]),
		buildAchievement('USAA', [
			buildAchievementItem(
				'Improve Pipeline performance of Small Business Insurance App',
				`script modification`,
				`improved pipeline speed by running the integration test scripts (cypress) conditionally depending on which development process (develop, feature, stage)`,
			),
			buildAchievementItem(
				'Improve Performance of Small Business Insurance App(FE)',
				'architecture, code, leading, documentation',
				`architecture designs for the frontend taking advantage of react context and hooks. Code is modularized and categorized.`,
			),
			buildAchievementItem(
				'Improve Performance of Small Business Insurance App(BE)',
				'architecture, code, leading, analyzations, documentation',
				`introducing microservice architecture on the backend, removing unncessary service calls. imporoved performance from >30sec to <20sec. The system was leaning on 3rd party service which was spending most of times, so the improvement was limited.`,
			),
			buildAchievementItem('Bug fixes on Small Business Insurance App', 'analyzations, code, leading'),
			buildAchievementItem(
				'Predicted Card Experience (Talon/New Web)',
				`show members predicted profiles instead of making members to start over for all the questionnaire to start to use Financial Wellness Tool`,
				`involved to the architecture design for the services and gave insights as a developer of existing services, update member home code and unit/functional tests, created and lead UI development from the base to the top using React Hooks/ Router/ Reducer  (Jax-RS/React/OpenL/Spring/NodeJs/DB2)`,
				`I have merged existing FRS questionnaire application and dashboard application and created a new router structure to make them compatible to each other. 
            Also, wrote multiple scripts to make the pipelines to leave proper evidence from the new projects. 
            I have consulted and made sure the new service follow micro-service concept and would make calls effectively between services.
            `,
			),
			buildAchievementItem(
				'Trust the member(Debt and Spending) (Talon/New Web)',
				`Improve member's experience, give member more specialized guideline adding more steps, show visual information about where the member is in the debt spending journey `,
				`co-lead the team with the team lead, code review and debug, add horseshoe chart, lead the team, technical consult to the offshore teams, code reviews and debug(Jax-RS/React/OpenL/Spring/NodeJs/DB2)`,
				'',
			),
			buildAchievementItem(
				'Trust the member(Emergency Fund) (Talon/New Web)',
				`Improve member's experience, give member ability to add their own EF values, show visual information about where the member is in the savings journey`,
				`Create service architecture, design DB, Write Flow Diagrams, Add visual sign on the card, Introduce TDD concept, add scenario system to handle the complex card transition, add flip card effect (Jax-RS/React/OpenL/Spring/NodeJs/DB2)`,
				'',
			),
			buildAchievementItem(
				'Upgrade Pipelines to use compliant modules ',
				`meet compliant policy, improve reliability`,
				'implement x-ray, sonarqube, move repository to the managed repository(Gitlab-ci/bash/YAML)',
				'',
			),
			buildAchievementItem(
				'Improve performance/reliability of the Financial Readiness app',
				`meet compliant policy, improve reliability`,
				'Found multiple possible sytem errors and fixed such as failure occured by timing issues and version mismatch of network cache and jackson (Java/gradle/Jax-RS)',
				'I have reviewed the source code occationally and found possible bugs. Also, I have participated to fix the errors found by other testers',
			),
			buildAchievementItem(
				'Create EasyUnit',
				'save extra time to make unit tests for resource objects',
				'created easy-unit, introduce it to the team(Java/Mockito)',
				`
                Resource Objects are used overall server-client model. 
                lombok covers a lot, but it does not create unit test. 
                Easyunit create unit test and its vanilla java code.
            `,
			),
			buildAchievementItem(
				'OpenL validation tool',
				'reduce human error when converting ActivityList from ERDC table(web) to OpenL(excel) by creating validation process',
				'created the validation tool, use it to validate the new file(Excel/Javascript)',
				`
            When converting activity list to openl, it was enumours amount of data and multiple people worked on it. 
            We didn't have a way to validate them so I have created parsers using excel and confirmed if the converted tables are equivalent to the original formula.
            `,
			),
			buildAchievementItem(
				'Mordernization of Financial Readiness site (Talon/New Web)',
				`improve performance, reliability and maintainability`,
				'worked as a team member on RESTful API and database',
				'The legacy FRS(Financial Readiness Score) tool was built with Wicket, so we converted it using modern technology such as React/Jax-RS.',
			),
		]),

		buildAchievement('Eonic Korea', [
			buildAchievementItem(
				'Create Circuit boards Test Solution',
				`Reduce the time to create similar tests`,
				'creator of the software(Lab Windows/CVI, C/C++)',
			),
			buildAchievementItem(
				'Harbor defense system',
				`Create Korean first active sonar with LIG Nex1`,
				'Analyze the sonar data to detect multiple objects, create a UI to visualize the objects (Labview, FFT, Lab Windows, C/C++)',
			),
			buildAchievementItem(
				'Passive sonar sytem for Submarine',
				`Create passive sonar and store the sonar data with LIG Nex1`,
				'Develop high performing storage system',
			),
			buildAchievementItem(
				'Sonar signal monitoring system',
				`handle high load data`,
				'design the architecture, lead the sw team(Java/Javascript/C/C++/Intel IPP)',
				'To achieve the performance requirement, I have create an architecture of multiple platforms/languages',
			),
		]),
		buildAchievement('Realtimewave', [
			buildAchievementItem(
				'Create TestNgine',
				"Being sold as Company's new product",
				'creator of the software, created UI and participate on the service in the Realtime-OS.',
				`TestNetConnector is evolved to the product version`,
			),
			buildAchievementItem(
				'Create NetConnector',
				`boost working efficiency at least 300%`,
				'creator of the software(C#/C/Python)',
				'replace most of integration test with hardware with software test using NetConnector',
			),
			buildAchievementItem(
				'Panel builder',
				`give abilities to create a custom UI having multiple panels and network connections`,
				'creator of the software(C++/LUA)',
				'',
			),
			buildAchievementItem(
				'Warning system in the nuclear power plant',
				`built a reliable warning system overall nuclear power plants`,
				'developer of the network system(C/bash)',
				'',
			),
			buildAchievementItem(
				'Research',
				`Research of RT-Java, GPS/GNSS monitoring, encoding intra-red video`,
				'research of various area to evaluate the technical enability',
				'perform as a researcher',
			),
		]),
		buildAchievement('Personal Projects', [
			buildAchievementItem(
				'Setting up mono repo for Resume Project',
				`Setup Turborepo, Test typescript/vitest test, Test Next.js app with test, Convert pure html project to Vite project`,
				'Personal Project(Turborepo, Vite, Vanilla JS/CSS/HTML), typescript, vitest, Next.js',
				`To make the project more maintainable before making next version of resume app, 
                I have converted the project to Vite project living in the monorepo. 
                I have tried Nx repo before using turbo repo, but typescript support with vitest test 
                was not working as expected in the library. Turbo repo is a lot easier to set up the local packages.
                It also supported vitest test using typescript source files. Converting html into vite project was smooth.`,
			),
			buildAchievementItem(
				'Menu App(QR in Menu)',
				`Created Production level application from A-Z as a solo developer.`,
				'Personal Project(Next.js, Astro.js, React, TailwindCSS, Supabase, GraphQL, Typescript, Cloudflare Image, SalesTax)',
				`Created Production level of application from planing to development. I have tried to make it using Next.js 13.0 which was 
                still beta creating client side using Supabase, GraphQL, Typescript, TailwindCSS, Cloudflare Image, and SalesTax open source 
                library. While Next.js 13.0 was still on beta status, error messages was not very clear. At the similar time,
                Astro 2.0 is released. For the admin tool of the menu app, I started using Astro 2.0. The development 
                environment is very good, especially the truth that I can use multiple javascript framework including 
                shvelt and solid.js. Could not release the production since the project team is finished for the personal 
                reason, but it was a great experience to learn a lot of tech stacks and schedule management.`,
			),
			buildAchievementItem(
				"Diagnositics of Parkinson's Desease",
				`Found new patient with 90% of accuracy`,
				'personal contract(Python/TensorFlow/Keras/Jupiter Notebook/Deep Learning)',
				`
            It was request from a Doctor(Yongsuk-Yang) in Korea and he wanted to know if Diagnositics using Deep Learning for the Parkinson's Desease using Blood analysis.
            I received the results of blood analysis and proceed learning 3 levels of DNN after pre-processing.
            the input node was 56, and output was 1 with percentage. after post processing, I could get meaningful result which find new patient as 90% accuracy.
            `,
			),
			buildAchievementItem(
				'Horseshoe',
				'small size SVG based chart software with no external dependencies (Opensource)',
				'personal project(javascript/SVG)',
				'used for FRS debt and spending card',
			),
			buildAchievementItem(
				'Multi-domain redux',
				'enable users to use multi-domain of reducer',
				'personal project',
				'it was before react hook comes out when I develop this. Now it can be replaced with React hooks reducer/context',
			),
		]),
		buildAchievement('GNU', [
			buildAchievementItem(
				'White board',
				`small chatting application with drawing ability`,
				'pair programming',
				'Instead of boring chatting, I gave the drawing functionality adding a fun factor.',
			),
			buildAchievementItem(
				'Circuit simulator',
				`give an ability to draw/simulate circuit design`,
				'pair programming(Java/applet)',
				'add AND/OR/XOR/NOT block in the board and give any signal by user to simulate the behavior of the circuit',
			),
			buildAchievementItem(
				'3D scanner',
				`create a 3D image based on 2 pictures.`,
				'graduation paper project, perform as the sw programmer',
				'',
			),
		]),
	],
});

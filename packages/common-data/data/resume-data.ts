import {
    AchievementObj,
    AwardObj,
    EducationObj,
    SkillLevelObj,
    VolunteerObj,
    buildAchievement,
    buildAchievementItem,
    buildAward,
    buildCareer,
    buildDegree,
    buildEducation,
    buildSchool,
    buildSkillLevel,
    buildVolunteer,
} from './resume-builders';
export type CareerType = ReturnType<typeof buildCareer>;
type LeftContentsType = {
    Introduction: {
        TITLE: string;
        DESC: string;
    };
    Careers: {
        TITLE: string;
        CAREERS: CareerType[];
    };
    achievements: AchievementObj[];
};
export const LeftContents: LeftContentsType = Object.freeze({
    Introduction: Object.freeze({
        TITLE: 'Introduction',
        DESC: `A strong problem solver from Fast and deep focusing with dynamic programming method.
         An enthusiastic performance improver. A patient mentor. An Addict on High performance.
         A careful proposer. 
         Recently interested in the trend on frontend technology crossing over backend area.`,
    }),
    Careers: Object.freeze({
        TITLE: 'Careers',
        CAREERS: [
            buildCareer(
                'Dimensional Fund Advisors (DFA)',
                'https://dimensional.com/',
                [2022, 8],
                null,
                'Maintain, Debug & Improve for SMA, Model Center, Fund Center, and other applications',
                'Financial / Investment / Asset Management',
                'SW Engineer Senior',
                [
                    'React (class, functional)',
                    'jotai 1/2',
                    'Javascript(vanilla/ES6~2022)',
                    'Jenkins',
                    'Jest',
                    'Monorepo(Rush repo)',
                    'Git',
                    'Playwright',
                    'RTL(React Testing Library)',
                ],
                [
                    'Created BDD testing process using Playwright and Playwright-BDD library',
                    'Improvement and management of SMA center, Model Center, Fund Center app',
                    'Refactor large legacy class components to modularized function components',
                    'upgrade legacy project to modernized project including typescript, vite, jotai2',
                    'Upgrade testing environments including jest, RTL, Playwright, jest-preview, react profiler',
                    'Create/Improve logic for PDF generation(PDFMake)',
                    'Create new disclosure manager',
                    'Create general purpose libraries including tooltip, local atom handler,  jotai libraries for general purpose',
                ]
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
                ]
            ),
            buildCareer(
                'Eonic Korea',
                'http://eonic.co.kr/',
                [2016, 7],
                [2018, 3],
                'Signal Analysis, Architecutre, Development',
                'Sonar / Defense systems',
                'Lead SW Engineer',
                [
                    'C',
                    'C++',
                    'Socket communication',
                    'Labview',
                    'Intel IPP/TBB',
                    'Linux',
                    'Lab Windows/CVI',
                    'GIT/SVN',
                ],
                [
                    'Development of Habor defense system',
                    'Development of sonar system in a submarine(Jangbogo)',
                    'Software team lead',
                    'Software architecture, analyze sonar footprints',
                ]
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
                ]
            ),
        ],
    }),
    achievements: [
        buildAchievement('Dimensional Fund Advisors', [
            buildAchievementItem(
                'Toggle Feature From UI',
                'participating design and architecture, and implement the features',
                `React, typescript`,
                `Suggesting an accessible way of toggle feature from UI and expandable and upgradable feature on backend.
                implemented automatic upgradable feature on the backend and frontend.`
            ),
            buildAchievementItem(
                'Playwright BDD testing',
                'introducing BDD style regression test',
                `Playwright, typescript, playwright-bdd`,
                `creating a new project to support BDD style of testing that uses common language for tester and business owners.
                It improves the communication between developers and business owners.
                The tough part was playwright-bdd was not well known library and it did not support
                multiple fixtures that uses the same step description. I had to make a custom library to modularize the tests
                taking advantage of class inheritance to make the step language as simple as possible.`
            ),
            buildAchievementItem(
                'Refactor legacy code in fund/model center',
                'improve developer experience, code readability, reusability, and maintainability',
                `plan, documentation, coding, testing(React, Typescript, Jotai 2.0)`,
                `the existing code in model center and fund center was written 2000+ lines of class components
with a lot of prop-drilling which makes code reusability and readability bad. 
I refactored the code using Jotai 2.0 deleting a lot of prop drilling improving code readability and reusability.
While refactoring I converted javascript code to typescript code as well as creating a lot of types 
to reduce human errors in the future.`
            ),
            buildAchievementItem(
                'Improve disclosure position on PDF using PDFMake',
                'improve user experience, code maintainability',
                `research on PDFMake, create new disclosure manager(React, Pdfmake)`,
                `
Disclosure on the PDF make in DFA is dynamic in size, so making it on the bottom of the document is touch subject. 
I made disclosure manager to save all the disclosure data attached 
to the subjects that should be added to the page first, 
and made the disclosure based on the subject added in the page 
to decide which disclosure should be added. 
Also measured the size of the disclosure 
before it is added to calculate if it fits in the page.`
            ),
        ]),
        buildAchievement('USAA', [
            buildAchievementItem(
                'Improve Pipeline performance of Small Business Insurance App',
                'Improve Performance',
                `script modification`,
                `improved pipeline speed by running the integration test scripts (cypress) conditionally depending on which development process (develop, feature, stage)`
            ),
            buildAchievementItem(
                'Improve Response time of Small Business Insurance App(FE)',
                'Improve Performance',
                'architecture, code, leading, documentation',
                `architecture designs for the frontend taking advantage of react context and hooks. Code is modularized and categorized.`
            ),
            buildAchievementItem(
                'Improve Response time of Small Business Insurance App(BE)',
                'Improve Performance',
                'architecture, code, leading, analyzations, documentation',
                `introducing microservice architecture on the backend, removing unncessary service calls. imporoved performance from >30sec to <20sec. The system was leaning on 3rd party service which was spending most of times, so the improvement was limited.`
            ),
            buildAchievementItem(
                'Bug fixes on Small Business Insurance App',
                'stablize the app',
                'analyzations, code, leading'
            ),
            buildAchievementItem(
                'Predicted Card Experience (Talon/New Web)',
                `show members predicted profiles instead of making members to start over for all the questionnaire to start to use Financial Wellness Tool`,
                `involved to the architecture design for the services and gave insights as a developer of existing services, update member home code and unit/functional tests, created and lead UI development from the base to the top using React Hooks/ Router/ Reducer  (Jax-RS/React/OpenL/Spring/NodeJs/DB2)`,
                `I have merged existing FRS questionnaire application and dashboard application and created a new router structure to make them compatible to each other. 
Also, wrote multiple scripts to make the pipelines to leave proper evidence from the new projects. 
I have consulted and made sure the new service follow micro-service concept and would make calls effectively between services.
            `
            ),
            buildAchievementItem(
                'Trust the member(Debt and Spending) (Talon/New Web)',
                `Improve member's experience, give member more specialized guideline adding more steps, show visual information about where the member is in the debt spending journey `,
                `co-lead the team with the team lead, code review and debug, add horseshoe chart, lead the team, technical consult to the offshore teams, code reviews and debug(Jax-RS/React/OpenL/Spring/NodeJs/DB2)`,
                ''
            ),
            buildAchievementItem(
                'Trust the member(Emergency Fund) (Talon/New Web)',
                `Improve member's experience, give member ability to add their own EF values, show visual information about where the member is in the savings journey`,
                `Create service architecture, design DB, Write Flow Diagrams, Add visual sign on the card, Introduce TDD concept, add scenario system to handle the complex card transition, add flip card effect (Jax-RS/React/OpenL/Spring/NodeJs/DB2)`,
                ''
            ),
            buildAchievementItem(
                'Upgrade Pipelines to use compliant modules ',
                `meet compliant policy, improve reliability`,
                'implement x-ray, sonarqube, move repository to the managed repository(Gitlab-ci/bash/YAML)',
                ''
            ),
            buildAchievementItem(
                'Improve performance/reliability of the Financial Readiness app',
                `meet compliant policy, improve reliability`,
                'Found multiple possible sytem errors and fixed such as failure occured by timing issues and version mismatch of network cache and jackson (Java/gradle/Jax-RS)',
                'I have reviewed the source code occationally and found possible bugs. Also, I have participated to fix the errors found by other testers'
            ),
            buildAchievementItem(
                'Create EasyUnit',
                'save extra time to make unit tests for resource objects',
                'created easy-unit, introduce it to the team(Java/Mockito)',
                `
Resource Objects are used overall server-client model. 
lombok covers a lot, but it does not create unit test. 
Easyunit create unit test and its vanilla java code.
            `
            ),
            buildAchievementItem(
                'OpenL validation tool',
                'reduce human error when converting ActivityList from ERDC table(web) to OpenL(excel) by creating validation process',
                'created the validation tool, use it to validate the new file(Excel/Javascript)',
                `
When converting activity list to openl, it was enumours amount of data and multiple people worked on it. 
We didn't have a way to validate them so I have created parsers using excel and confirmed if the converted tables are equivalent to the original formula.
            `
            ),
            buildAchievementItem(
                'Mordernization of Financial Readiness site (Talon/New Web)',
                `improve performance, reliability and maintainability`,
                'worked as a team member on RESTful API and database',
                'The legacy FRS(Financial Readiness Score) tool was built with Wicket, so we converted it using modern technology such as React/Jax-RS.'
            ),
        ]),

        buildAchievement('Eonic Korea', [
            buildAchievementItem(
                'Create Circuit boards Test Solution',
                `Reduce the time to create similar tests`,
                'creator of the software(Lab Windows/CVI, C/C++)'
            ),
            buildAchievementItem(
                'Harbor defense system',
                `Create Korean first active sonar with LIG Nex1`,
                'Analyze the sonar data to detect multiple objects, create a UI to visualize the objects (Labview, FFT, Lab Windows, C/C++)'
            ),
            buildAchievementItem(
                'Passive sonar sytem for Submarine',
                `Create passive sonar and store the sonar data with LIG Nex1`,
                'Develop high performing storage system'
            ),
            buildAchievementItem(
                'Sonar signal monitoring system',
                `handle high load data`,
                'design the architecture, lead the sw team(Java/Javascript/C/C++/Intel IPP)',
                'To achieve the performance requirement, I have create an architecture of multiple platforms/languages'
            ),
        ]),
        buildAchievement('Realtimewave', [
            buildAchievementItem(
                'Create TestNgine',
                "Being sold as Company's new product. Boost test process dramatically by removing the coding process by using drag&drop based UI",
                'creator of the software, created UI and participate on the service in the Realtime-OS.',
                `TestNgine is a military level realtime test application which is upgraded from TestNetConnector that I have created and shared with the company members.
This can download network test scenario to the real test object from drag&drop based application.`
            ),
            buildAchievementItem(
                'Create NetConnector',
                `boost working efficiency at least 300%`,
                'creator of the software(C#/C/Python)',
                'replace most of integration test with hardware with software test using NetConnector'
            ),
            buildAchievementItem(
                'Panel builder',
                `give abilities to create a custom UI having multiple panels and network connections`,
                'creator of the software(C++/LUA)',
                'generating LUA code automatically for the new avionics panels to generate a simulators.'
            ),
            buildAchievementItem(
                'Warning system in the nuclear power plant',
                `built a reliable warning system overall nuclear power plants`,
                'developer of the network system(C/bash)',
                'Korean nuclear power plant has a warning system which is connected to the nuclear power plant. upgraded existing analog based warning system to the digital version.'
            ),
            buildAchievementItem(
                'Research',
                `Research of RT-Java, GPS/GNSS monitoring, encoding intra-red video`,
                'research of various area to evaluate the technical enability',
                'perform as a researcher'
            ),
        ]),
        buildAchievement('Personal Projects', [
            buildAchievementItem(
                'Setting up mono repo for Resume Project',
                `Setup Turborepo, Test typescript/vitest test, Test Next.js app with test, Convert pure html project to Vite project`,
                'Personal Project(Turborepo, Vite, Vanilla JS/CSS/HTML), typescript, vitest, Next.js, PDF-Make, Solid-js',
                `To make the project more maintainable before making next version of resume app, 
I have converted the project to Vite project living in the monorepo. 
I have tried Nx repo before using turbo repo, but typescript support with vitest test 
was not working as expected in the library. Turbo repo is a lot easier to set up the local packages.
It also supported vitest test using typescript source files. Converting html into vite project was smooth.
When I implement automatic PDF generation, It was hard to make it happen in server side generation since the file creation in monorepo is not common use case.
Eventually figured out by creating temporary endpoint that can give me multiple inner system information until I remove it to prevent security bleach.`
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
reason, but it was a great experience to learn a lot of tech stacks and schedule management.`
            ),
            buildAchievementItem(
                "Diagnositics of Parkinson's Desease",
                `Found new patient with 90% of accuracy`,
                'personal contract(Python/TensorFlow/Keras/Jupiter Notebook/Deep Learning)',
                `
            It was request from a Doctor(Yongsuk-Yang) in Korea and he wanted to know if Diagnositics using Deep Learning for the Parkinson's Desease using Blood analysis.
            I received the results of blood analysis and proceed learning 3 levels of DNN after pre-processing.
            the input node was 56, and output was 1 with percentage. after post processing, I could get meaningful result which find new patient as 90% accuracy.
            `
            ),
            buildAchievementItem(
                'SVG Designer',
                'A Simple svg drawer supporting React style svg file export',
                'personal project(javascript/React/SVG)',
                'Open Source (git@github.com:wootra/react-svg-designer.git)'
            ),
            buildAchievementItem(
                'Horseshoe',
                'small size SVG based chart software with no external dependencies (Opensource)',
                'personal project(javascript/SVG)',
                'used for FRS debt and spending card'
            ),
            buildAchievementItem(
                'Multi-domain redux',
                'enable users to use multi-domain of reducer',
                'personal project',
                'it was before react hook comes out when I develop this. Now it can be replaced with React hooks reducer/context'
            ),
        ]),
        buildAchievement('GNU', [
            buildAchievementItem(
                'White board',
                `small chatting application with drawing ability`,
                'pair programming',
                'Instead of boring chatting, I gave the drawing functionality adding a fun factor.'
            ),
            buildAchievementItem(
                'Circuit simulator',
                `give an ability to draw/simulate circuit design`,
                'pair programming(Java/applet)',
                'add AND/OR/XOR/NOT block in the board and give any signal by user to simulate the behavior of the circuit'
            ),
            buildAchievementItem(
                '3D scanner',
                `create a 3D image based on 2 pictures.`,
                'graduation paper project, perform as the sw programmer',
                ''
            ),
        ]),
    ],
});

type TopContentsType = {
    name: string;
    address: string;
    position: string;
    contact: {
        phone: string;
        email: string;
    };
    website: {
        homepage: string;
        github: string;
    };
};
export const TopContents: TopContentsType = Object.freeze({
    name: 'Songhyeon Jun',
    address: 'San Antonio, TX, 78261',
    position: 'Fullstack SW Engineer',
    contact: {
        phone: '(512)919-6009',
        email: 'shjeon0730@gmail.com',
    },
    website: {
        homepage: 'https://www.sh-jun.com',
        github: 'https://github.com/wootra',
    },
});

type RightContentsType = Readonly<{
    skillLevels: {
        [key: string]: SkillLevelObj[];
    };
    volunteers: VolunteerObj[];
    educations: EducationObj[];
    awards: AwardObj[];
    authority: string[];
}>;
export const RightContents: RightContentsType = Object.freeze({
    skillLevels: {
        'Languages(FE)': [
            buildSkillLevel('Javascript', 5),
            buildSkillLevel('TypeScript', 5),
            buildSkillLevel('HTML', 5),
            buildSkillLevel('CSS/3', 5),
            buildSkillLevel('SASS/LESS/SCSS', 5),
        ],
        'Languages(Etc)': [
            buildSkillLevel('Java', 5),
            buildSkillLevel('YAML', 5),
            buildSkillLevel('SASS/LESS', 5),
            buildSkillLevel('NodeJs', 4),
            buildSkillLevel('C#.Net', 3),
            buildSkillLevel('Python', 3),
            buildSkillLevel('XML', 3),
            buildSkillLevel('LUA', 3),
            buildSkillLevel('C/C++', 3),
            buildSkillLevel('Rust', 2),
            buildSkillLevel('Dart', 2),
            buildSkillLevel('Go', 2),
            buildSkillLevel('JPA', 3),
        ],
        'Frameworks(FE)': [
            buildSkillLevel('React.js', 5),
            buildSkillLevel('Astro.js', 4),
            buildSkillLevel('Next.js', 4),
            buildSkillLevel('Svelte', 3),
            buildSkillLevel('Solid.js', 4),
            buildSkillLevel('JQuery', 3),
            buildSkillLevel('Angular 6', 2),
        ],
        'Backend skills': [
            buildSkillLevel('Node.js', 5),
            buildSkillLevel('Express', 5),
            buildSkillLevel('Jax-RS', 4),
            buildSkillLevel('Spring Boot', 4),
            buildSkillLevel('GraphQL', 4),
            buildSkillLevel('Firebase/firestore', 4),
            buildSkillLevel('NextAuth', 4),
            buildSkillLevel('supabase', 4),
            buildSkillLevel('.Net', 3),
            buildSkillLevel('Elastic Search', 3),
            buildSkillLevel('Kafka', 2),
        ],
        'Pakcage Management': [
            buildSkillLevel('Vite', 5),
            buildSkillLevel('Turbo repo', 5),
            buildSkillLevel('Npm.js', 5),
            buildSkillLevel('Npm', 5),
            buildSkillLevel('pnpm', 5),
            buildSkillLevel('yarn', 4),
            buildSkillLevel('Nx Repo', 3),
            buildSkillLevel('Rush Repo', 2),
            buildSkillLevel('Rollup', 2),
            buildSkillLevel('Webpack', 2),
        ],
        'State Libraries': [
            buildSkillLevel('jotai', 5),
            buildSkillLevel('zustand', 5),
            buildSkillLevel('Redux/Toolkit', 5),
            buildSkillLevel('React Context', 5),
            buildSkillLevel('React Hooks', 5),
        ],
        'Shell Scripts': [
            buildSkillLevel('bash-sh', 4),
            buildSkillLevel('cmd-sh', 3),
        ],
        'Test Framework': [
            buildSkillLevel('Jest', 5),
            buildSkillLevel('Mocha', 5),
            buildSkillLevel('TestingLibrary', 5),
            buildSkillLevel('Enzyme', 5),
            buildSkillLevel('sinon', 5),
            buildSkillLevel('Mockito', 5),
            buildSkillLevel('Cypress', 5),
            buildSkillLevel('Vitest', 4),
            buildSkillLevel('Selenium', 3),
            buildSkillLevel('Spock', 3),
        ],
        database: [
            buildSkillLevel('My-SQL', 4),
            buildSkillLevel('MS-SQL', 4),
            buildSkillLevel('DB2', 4),
            buildSkillLevel('Mongo DB', 3),
            buildSkillLevel('Postgres', 3),
        ],
        'Dev Ops': [
            buildSkillLevel('Gialb-ci', 4),
            buildSkillLevel('Jenkins', 3),
            buildSkillLevel('Docker', 3),
            buildSkillLevel('Openshift', 3),
            buildSkillLevel('github-actions', 2),
        ],
        'Machine Learning': [
            buildSkillLevel('TensorFlow/Keras', 3),
            buildSkillLevel('Jupiter Notebook', 3),
        ],
        'Analysis Tools': [
            buildSkillLevel('Lab Windows/CVI', 5),
            buildSkillLevel('Matlab', 4),
            buildSkillLevel('Labview', 3),
        ],
        Documentation: [
            buildSkillLevel('JsDocs', 5),
            buildSkillLevel('ReadMe(md)', 3),
        ],
        'Project Management': [
            buildSkillLevel('Agile/Jira', 5),
            buildSkillLevel('SAFE', 5),
            buildSkillLevel('SDLC', 5),
        ],
        Network: [
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
            'Vice President',
            'GonAPus ( Amateur Astronomy Club ) in GNU',
            'https://www.facebook.com/GonApus/'
        ),
        buildVolunteer(
            'Training Helper',
            'Youth traning center',
            'http://www.gnyouthtc.or.kr/'
        ),
    ],
    educations: [
        buildEducation(
            buildSchool('Gyeongsang National Univ', 'https://www.gnu.ac.kr/'),
            [
                buildDegree('Computer Science', 'BC', 2005),
                buildDegree('Mechanical Engineering', 'BE', 2005),
            ]
        ),
    ],
    awards: [buildAward('3D-Scanner using 3-color layers', 2004)],
    authority: ['Permanent Residence(Green Card)'],
});

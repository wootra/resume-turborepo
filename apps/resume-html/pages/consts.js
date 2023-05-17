
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
const buildCareer = (companyName, url, start, end, role, industry, jobTitle, techStacks, achievements=[]) => ({
    companyName, url, start, end, role, industry, jobTitle, techStacks, achievements
})

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
        DESC: `I am good at problem solving and enjoy learning new technology as well as trying fresh approach using the technologies.
        From the recent experience, I am confident at React hooks, Jest, CSS for front end, and Java, JAX-RS, Mockito for backend.`
    }),
    Careers: Object.freeze({
        TITLE: "Careers",
        CAREERS: [
            buildCareer('USAA', 'http://usaa.com/', 
            [2018,9], null, 
            'Maintain & Improve Financial Readiness/Wellness app', 
            'Financial / Insurance', 
            'SW Engineer Senior', 
            [
                'React', 'React Hooks', 'Redux', 'Router(v5/v6)', 'Java8', 'Javascript(vanilla/ES6~2021)',
                'RESTful API(JBoss/Spring boot/Node.js & Express)',
                'Openshift',   'gitlab-ci',
                'Mocha', 'Jest', 'Enzyme', 'Cypress', 'RTL(React Testing Library)',
                'Spock', 'Mockito', 'JUnit(4/5)', 
                'Kafka',
            ],
            [
                "Improvement of Small business Insurance Experience",
                "Mordernization of Financial Readiness site (Talon/New Web)",
                "Improve performance/reliability of the Financial Readiness app",
                "Involved to overall applications except for batch process",
                "Leading the dev team"
            ]
            ),
            buildCareer('Eonic Korea', 'http://eonic.co.kr/', 
            [2016,7], [2018,3], 
            'Signal Analysis, Architecutre, Development', 
            'Sonar / Defense systems', 
            'Lead SW Engineer', 
            [
                'C', 'C++',
                'Socket communication', 'Labview',
                'Intel IPP/TBB',   'Linux',
                'Lab Windows/CVI', "GIT/SVN"
            ],
            [
                "Development of Habor defense system",
                "Development of sonar system in a submarine(Jangbogo)",
                "Software team lead",
                "Software architecture, analyze sonar footprints"
            ]
            ),
            buildCareer('Realtimewave', 'http://realtimewave.com/', 
            [2011,2], [2016,6], 
            'Development of Automated/Manual Test Solutions for real time devices such as UAV and Guided Missile Systems', 
            'Aero / Defense systems', 
            'SW Engineer', 
            [
                'C/C++',       'MFC',
                'C#.Net',      "RT/Java",
                'LUA',         'Python',
                'Socket',      'XML',
                'OpenGL',      'Python',
                'MATLAB',      'VxWorks',
                'Linux',       'QT', 
            ],
            [
                "Initiate / Develop TestNgine™ - RT testing tool",
                "Participate developing RTNgine™ - RT simulator",
                "Initiate Packet management and automated scenario software",
                "Initiate Realtime scenario management software"
            ]
            ),
        ]
    })
});


export const TopContents = Object.freeze({
    name: 'Songhyeon Jun',
    address: 'San Antonio, TX, 78261',
    position: 'Fullstack SW Engineer',
    contact: {
        phone: '(512)919-6009',
        email: 'shjeon0730@gmail.com'
    }, 
    website: {
        homepage: 'https://www.sh-jun.com',
        github: 'https://github.com/wootra',
    }
})

/**
 * 
 * @param {string} skillName 
 * @param {number} levelNo 
 * @returns {SkillObj}
 */
const buildSkillLevel = (skillName, levelNo) => ({skillName, levelNo});

/**
 * 
 * @param {string} role 
 * @param {string} where 
 * @param {string} url 
 * @returns {VolunteerObj}
 */
const buildVolunteer = (role, where, url) => ({role, where, url});

/**
 * 
 * @param {string} name 
 * @param {string} url
 * @returns {SchoolObj}
 */
 const buildSchool = (name, url) => ({name,url});

/**
 * 
 * @param {string} major 
 * @param {string} degree 
 * @param {number} year 
 * @returns {DegreeObj}
 */
const buildDegree = (major, degree, year) => ({major, degree, year:year});

/**
 * 
 * @param {SchoolObj} school 
 * @param {[DegreeObj]} degrees 
 * @returns {EducationObj}
 */
const buildEducation = (school, degrees) => ({school, degrees});

/**
 * 
 * @param {string} award 
 * @param {number} year 
 * @returns {AwardObj}
 */
const buildAward = (award, year)=>({award, year})

/**
 * 
 * @param {string} name 
 * @param {string} businessValue
 * @param {string} myPart
 * @param {string} desc 
 * @returns {AchievementObj}
 */
const buildAchievementItem = (name, businessValue, myPart, desc) => ({name, businessValue, myPart, desc})

/**
 * 
 * @param {string} company 
 * @param {[AchievementObj]} items 
 * @returns {{company:string, items:[AchievementObj]}}
 */
const buildAchievement = (company, items) => ({company, items})

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
        languages: [
            buildSkillLevel("Javascript", 5),
            buildSkillLevel("HTML", 5),
            buildSkillLevel("CSS", 5),
            buildSkillLevel("Java", 5),
            buildSkillLevel("C/C++", 5),
            buildSkillLevel("C#.Net", 5),
            buildSkillLevel("Python", 5),
            buildSkillLevel("YAML", 5),
            buildSkillLevel("XML", 5),
            buildSkillLevel("NodeJs", 4),
            buildSkillLevel("LUA", 3),
            buildSkillLevel("TypeScript", 3),
            buildSkillLevel("JPA", 3),
            buildSkillLevel("SASS/LESS", 3),
        ],
        ShellScripts:[
            buildSkillLevel("bash-sh", 4),
            buildSkillLevel("cmd-sh", 3),
        ],
        "Multimedia/Office":[
            buildSkillLevel("Flash/Action Script", 5),
            buildSkillLevel("Photoshop", 4),
            buildSkillLevel("Illustrator", 4),
            buildSkillLevel("Excel", 4),
            buildSkillLevel("PowerPoint", 4),
            buildSkillLevel("Word", 3),
        ],
        AnalysisTools: [
            buildSkillLevel("Lab Windows/CVI", 5),
            buildSkillLevel("Matlab", 4),
            buildSkillLevel("TemsorFlow/Keras", 3),
            buildSkillLevel("Jupiter Notebook", 3),
            buildSkillLevel("Labview", 3),
        ],
        frameworks: [
            buildSkillLevel("React Hooks", 5),
            buildSkillLevel("React/Redux", 5),
            buildSkillLevel(".Net", 4),
            buildSkillLevel("Jax-RS", 4),
            buildSkillLevel("Spring Boot", 3),
            buildSkillLevel("JQuery", 3),
            buildSkillLevel("Angular 6", 2),
            buildSkillLevel("Kafka", 2),
        ],
        "Test Framework": [
            buildSkillLevel("Jest", 5),
            buildSkillLevel("Mocha", 5),
            buildSkillLevel("Enzyme", 5),
            buildSkillLevel("sinon", 5),
            buildSkillLevel("Mockito", 5),
            buildSkillLevel("cypress", 5),
            buildSkillLevel("Selenium", 4),
            buildSkillLevel("Spock", 3),
        ],
        database: [
            buildSkillLevel("My-SQL", 4),
            buildSkillLevel("MS-SQL", 4),
            buildSkillLevel("DB2", 4),
            buildSkillLevel("Mongo DB", 3),
        ],
        DevOps: [
            buildSkillLevel("Gialb-ci", 4),
            buildSkillLevel("Docker", 3),
            buildSkillLevel("Openshift", 3),
        ],
        Documentation: [
            buildSkillLevel("JsDocs", 5),
            buildSkillLevel("ReadMe", 3),
        ],
        "Project Management": [
            buildSkillLevel("Agile/Jira", 4),
            buildSkillLevel("SAFE", 4),
            buildSkillLevel("SDLC", 3),
        ],
        Network: [
            buildSkillLevel("TCP/IP, UDP", 5),
            buildSkillLevel("RS-232/RS-422/MIL1553", 4),
            buildSkillLevel("Analog/Discrete", 4),
            buildSkillLevel("GPS/GNSS", 3),
            buildSkillLevel("I2C", 3),
        ],
    },
    volunteers: [
        buildVolunteer("Vice President", "GonAPus ( Amateur Astronomy Club ) in GNU", "https://www.facebook.com/GonApus/"),
        buildVolunteer("Training Helper", "Youth traning center", "http://www.gnyouthtc.or.kr/")
    ],
    educations: [
        buildEducation(
            buildSchool("Gyeongsang National Univ","https://www.gnu.ac.kr/"), 
            [
                buildDegree( "Computer Science", "BC", 2005),
                buildDegree("Mechanical Engineering", "BE", 2005)
            ]
        )
    ],
    awards: [
        buildAward("3D-Scanner using 3-color layers", 2004)
    ],
    authority: ["Green Card"],
    achievements: [
        buildAchievement("USAA", [
            buildAchievementItem("Predicted Card Experience (Talon/New Web)", 
            `show members predicted profiles instead of making members to start over for all the questionnaire to start to use Financial Wellness Tool`, 
            `involved to the architecture design for the services and gave insights as a developer of existing services, update member home code and unit/functional tests, created and lead UI development from the base to the top using React Hooks/ Router/ Reducer  (Jax-RS/React/OpenL/Spring/NodeJs/DB2)`,
            `I have merged existing FRS questionnaire application and dashboard application and created a new router structure to make them compatible to each other. 
            Also, wrote multiple scripts to make the pipelines to leave proper evidence from the new projects. 
            I have consulted and made sure the new service follow micro-service concept and would make calls effectively between services.
            `),
            buildAchievementItem("Trust the member(Debt and Spending) (Talon/New Web)", 
            `Improve member's experience, give member more specialized guideline adding more steps, show visual information about where the member is in the debt spending journey `, 
            `co-lead the team with the team lead, code review and debug, add horseshoe chart, lead the team, technical consult to the offshore teams, code reviews and debug(Jax-RS/React/OpenL/Spring/NodeJs/DB2)`,
            ""),
            buildAchievementItem("Trust the member(Emergency Fund) (Talon/New Web)", 
            `Improve member's experience, give member ability to add their own EF values, show visual information about where the member is in the savings journey`, 
            `Create service architecture, design DB, Write Flow Diagrams, Add visual sign on the card, Introduce TDD concept, add scenario system to handle the complex card transition, add flip card effect (Jax-RS/React/OpenL/Spring/NodeJs/DB2)`,
            ""),
            buildAchievementItem("Upgrade Pipelines to use compliant modules ",
             `meet compliant policy, improve reliability`, 
             "implement x-ray, sonarqube, move repository to the managed repository(Gitlab-ci/bash/YAML)",
             ""),
             buildAchievementItem("Improve performance/reliability of the Financial Readiness app",
             `meet compliant policy, improve reliability`, 
             "Found multiple possible sytem errors and fixed such as failure occured by timing issues and version mismatch of network cache and jackson (Java/gradle/Jax-RS)",
             "I have reviewed the source code occationally and found possible bugs. Also, I have participated to fix the errors found by other testers"),
            buildAchievementItem("Create EasyUnit", 
            "save extra time to make unit tests for resource objects",
            "created easy-unit, introduce it to the team(Java/Mockito)",
            `
                Resource Objects are used overall server-client model. 
                lombok covers a lot, but it does not create unit test. 
                Easyunit create unit test and its vanilla java code.
            `),
            buildAchievementItem("OpenL validation tool", 
            "reduce human error when converting ActivityList from ERDC table(web) to OpenL(excel) by creating validation process",
            "created the validation tool, use it to validate the new file(Excel/Javascript)",
            `
            When converting activity list to openl, it was enumours amount of data and multiple people worked on it. 
            We didn't have a way to validate them so I have created parsers using excel and confirmed if the converted tables are equivalent to the original formula.
            `),
            buildAchievementItem("Mordernization of Financial Readiness site (Talon/New Web)", 
            `improve performance, reliability and maintainability`, 
            "worked as a team member on RESTful API and database",
            "The legacy FRS(Financial Readiness Score) tool was built with Wicket, so we converted it using modern technology such as React/Jax-RS."),
        ]),
        
        buildAchievement("Eonic Korea", [
            buildAchievementItem("Create Circuit boards Test Solution", 
                `Reduce the time to create similar tests`,
                 "creator of the software(Lab Windows/CVI, C/C++)"),
            buildAchievementItem("Harbor defense system", 
                `Create Korean first active sonar with LIG Nex1`,
                "Analyze the sonar data to detect multiple objects, create a UI to visualize the objects (Labview, FFT, Lab Windows, C/C++)"),
            buildAchievementItem("Passive sonar sytem for Submarine", 
                `Create passive sonar and store the sonar data with LIG Nex1`,
                "Develop high performing storage system"),
            buildAchievementItem("Sonar signal monitoring system", 
                 `handle high load data`,
                  "design the architecture, lead the sw team(Java/Javascript/C/C++/Intel IPP)",
                  "To achieve the performance requirement, I have create an architecture of multiple platforms/languages"),
        ]),
        buildAchievement("Realtimewave", [
            buildAchievementItem("Create TestNgine", 
                "Being sold as Company's new product",
                "creator of the software, created UI and participate on the service in the Realtime-OS.",
                `TestNetConnector is evolved to the product version`
            ),
            buildAchievementItem("Create NetConnector", 
                `boost working efficiency at least 300%`, 
                "creator of the software(C#/C/Python)", 
                "replace most of integration test with hardware with software test using NetConnector"
            ),
            buildAchievementItem("Panel builder", 
                `give abilities to create a custom UI having multiple panels and network connections`, 
                "creator of the software(C++/LUA)", 
                ""
            ),
            buildAchievementItem("Warning system in the nuclear power plant", 
                `built a reliable warning system overall nuclear power plants`, 
                "developer of the network system(C/bash)", 
                ""
            ),
            buildAchievementItem("Research", 
                `Research of RT-Java, GPS/GNSS monitoring, encoding intra-red video`, 
                "research of various area to evaluate the technical enability", 
                "perform as a researcher"
            ),
        ]),
        buildAchievement("Personal Projects", [
            buildAchievementItem("Diagnositics of Parkinson's Desease", 
            `Found new patient with 90% of accuracy`, 
            "personal contract(Python/TensorFlow/Keras/Jupiter Notebook/Deep Learning)", 
            `
            It was request from a Doctor(Yongsuk-Yang) in Korea and he wanted to know if Diagnositics using Deep Learning for the Parkinson's Desease using Blood analysis.
            I received the results of blood analysis and proceed learning 3 levels of DNN after pre-processing.
            the input node was 56, and output was 1 with percentage. after post processing, I could get meaningful result which find new patient as 90% accuracy.
            `),
            buildAchievementItem("Horseshoe",
                "small size SVG based chart software with no external dependencies (Opensource)",
                "personal project(javascript/SVG)",
                "used for FRS debt and spending card"
            ),
            buildAchievementItem("Multi-domain redux", 
                "enable users to use multi-domain of reducer",
                "personal project",
                "it was before react hook comes out when I develop this. Now it can be replaced with React hooks reducer/context"
            ),
            
        ]),
        buildAchievement("GNU", [
            buildAchievementItem("White board", 
                `small chatting application with drawing ability`, 
                "pair programming",
                "Instead of boring chatting, I gave the drawing functionality adding a fun factor."),
            buildAchievementItem("Circuit simulator", 
                `give an ability to draw/simulate circuit design`, 
                "pair programming(Java/applet)",
                "add AND/OR/XOR/NOT block in the board and give any signal by user to simulate the behavior of the circuit"),
            buildAchievementItem("3D scanner", 
                `create a 3D image based on 2 pictures.`, 
                "graduation paper project, perform as the sw programmer",
                ""),
        ]),
        
        
    ]
        
})

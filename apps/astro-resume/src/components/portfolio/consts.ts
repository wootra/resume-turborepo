import { twMerge } from 'tailwind-merge';

export const colorThemes = [
	[
		twMerge('from-slate-700/70 to-slate-500/50'),
		twMerge('bg-slate-200/50'),
		twMerge('to-slate-700/50 from-slate-500/30'),
	],
	[twMerge('from-red-700/70 to-red-500/50'), twMerge('bg-red-200/50'), twMerge('to-red-700/50 from-red-500/30')],
	[twMerge('from-cyan-700/70 to-cyan-500/50'), twMerge('bg-cyan-200/50'), twMerge('to-cyan-700/50 from-cyan-500/30')],
	[twMerge('from-lime-700/70 to-lime-500/50'), twMerge('bg-lime-200/50'), twMerge('to-lime-700/50 from-lime-500/30')],
];

export const bgThemes = ['gray', 'rgb(206, 157, 199)', 'rgb(166, 173, 188)', 'rgb(174, 161, 19)'];

export const portfolios = [
	{
		id: 'container-break-points',
		title: 'container-break-points',
		github: 'https://github.com/wootra/container-break-points',
		gitlab: '',
		npm: 'https://www.npmjs.com/package/container-breakpoints-react',
		techStacks: 'Typescript, React.js(Context, Ref, State, Memo), Javascript(CustomEvent)',
		desc: `break point manager that is highly optimized using CustomEvent and React.js. It minimized updating rendering like state managers (i.e. Jotai, Redux, etc.). It is perfect to manage container query with javascript. It also fully support custom typing using type inferring system to help programming.`,
		myRole: 'A-Z',
		href: 'https://www.npmjs.com/package/container-breakpoints-react',
		src: '/images/app-screenshots/container-breakpoints-react.png',
	},
	{
		id: 'svg-table',
		title: '@shjeon0730/svg-table',
		github: 'https://github.com/wootra/svg-table/tree/main/apps/docs',
		gitlab: '',
		npm: 'https://www.npmjs.com/package/@shjeon0730/svg-table',
		techStacks: 'Typescript, Astro.js(SSG, SSR, SPA), React.js, SVG, Rollup, Typescript, TurboRepo',
		desc: `An opensource project for SVG table. I motivated a work that needed to convert HTML table to SVG talbe image. 
        I realized that it is not that easy and time consuming, and if this kind of librar exists, it would be very easy.`,
		myRole: 'A-Z',
		href: 'https://svg-table.vercel.app/',
		src: '/images/app-screenshots/svg-table.png',
	},
	{
		id: 'sh-jun-dot-com',
		title: 'sh-jun.com',
		github: 'https://github.com/wootra/resume-turborepo/tree/main/apps/astro-resume',
		gitlab: '',
		npm: '',
		techStacks:
			'Astro.js(SSG, SSR, SPA), React.js, Solid.js, TailwindCSS, CSS, Prisma, Typescript, TurboRepo, PDFMake',
		desc: `My Homepage that introduces my portfolio, Resume, and personal projects.
        Astro.js is the base application living in Turborepo to pull all the custom components 
        managed in the other folders in turborepo. 
        Highly optimized using Astro's latest functionality.
        Using both Solid.js and React.js, It supports mutlipel framework to show off
        multiple projects. `,
		myRole: 'A-Z',
		href: 'https://github.com/wootra/resume-turborepo',
		src: '/images/app-screenshots/sh-jun.com.png',
	},
	{
		id: 'san-antonio-korean-school',
		title: 'San Antonio Korean School Homepage',
		github: 'https://github.com/wootra/sa-korean-school',
		gitlab: '',
		npm: '',
		techStacks: 'Next.js 14(app router), Tailwindcss, shadcn/ui, Stripe, Google Sheet API',
		desc: ` San Antonio Korean School wanted to improve existing homepage.
        Implemented SSG first pages using Google Sheets API for the contents update.
        Full server side generated Navigation system, payment system using stripe API.`,
		myRole: 'A-Z, Design / Architecture / Implementation / Testing ',
		href: 'https://sa-korean-school.vercel.app',
		src: '/images/app-screenshots/sakr-home.png',
	},
	{
		id: 'dimensional-fund-center',
		title: 'Dimensional Fund Center / Model Center / SMA Center',
		techStacks: 'React.js 16~18, React Router 5, D3, PDFMake, Express.js, Sitecore-CMS, Jotai 1/2',
		devTechStacks: 'Vite, Jest, RTL, Playwright, Docker, Bitbucket/Github, Jenkins',
		desc: 'For the fund advisors, DFA offers multiple ways of analyzation and visualization.',
		myRole: `Development/Debug/Testing over Fund Center & Model Center & SMA Center.
        Leading Unit/e2e/Manual testing process / Code Review
        Optimizations on performance, readability, management`,
		href: 'https://www.dimensional.com/us-en/funds/dcor/us-core-equity-1-etf',
		src: '/images/app-screenshots/fund-center.png',
	},
	{
		id: 'small-business-insurance',
		title: 'Small Business Insurance',
		techStacks: 'React.js 16(Hook, Context), ReduxToolkit, React Router 5, Guidewire, Java',
		devTechStacks: 'Chai, Mocha, sinon, RTL, Storybook, Cypress, Mockito, Spring Framework',
		desc: 'Created the join/maintain process of Small business Insurance',
		myRole: 'Leading Frontend team, Cowork with BE team as co-leader.',
		href: 'https://www.usaa.com/insurance/small-business',
		src: '/images/app-screenshots/small-business-insurance.png',
	},
	{
		id: 'financial-readiness',
		title: 'USAA Financial Readiness Assessments',
		techStacks: 'React.js 15,16(Class, Hook), Redux, React Router 4, MS-DB2, Java',
		devTechStacks: 'Chai, Mocha, sinon, Enzyme, Selenium, Mockito, Spock, Jax-RS(RestAPI)',
		desc: 'Created a process for Financial Readiness Assessment and analyzations',
		myRole: 'Develop/Debug/Architecture on both FE and BE',
		href: 'https://mobile.usaa.com/advice/financial-readiness?akredirect=true',
		src: '/images/app-screenshots/usaa-financial-readiness.png',
	},
];

export const portfoliosInKr = [
	{
		id: 'lightening',
		title: 'Project Bungae (Lightniing) - UAV Operation Panel',
		techStacks: 'C#.Net, Flash/Action Script, XML, TCP/UDP, Serial(RS-232)',
		desc: `A Visualization and control panel for UAV(Unmanned Aviation Vehicle).
		It satisfied Korean Army department for the beautiful animation and smooth visualization.
		Created All the panels and charts with Flash, all number parts with C#.Net panels,
		With realtime data using UDP communication.`,
		src: '/images/app-screenshots/ligntening.png',
		myRole: 'Design/Architecture/Development on Client Application',
		github: '',
		gitlab: '',
		npm: '',
	},
	{
		id: 'global-report',
		title: 'Global Report (Report generation tool)',
		techStacks: 'HTML/CSS/Javascript/C#/PDF',
		desc: `Converting manual reporting process to automated report process
		reducing reporting time dramatically.
		Introducing MV model (Model/View)
		View/Print/PDF generation`,
		github: 'https://github.com/wootra/GlobalReporter',
		href: 'https://github.com/wootra/GlobalReporter',
		src: ['/images/app-screenshots/global-report.png', '/images/app-screenshots/global-report2.png'],
		myRole: 'A-Z, Plan, Introducing MV concept, Architecture, Design, Implement',
	},
	{
		id: 'ifcc-dev-test-sw',
		title: 'IFCC Device Test SW',
		techStacks: 'C#.Net, Custom components, OpenGL, TCP/UDP, Serial(RS-232/RS-422), Can',
		desc: `Automated testing software for IFCC device including data integrity, communication, and smoke test.
		Before this software, all test had to be manually created in each project, but this software allowed to skip 
		massive amount of redundant work. It also allowed injecting errors by easy UI, so improved testability dramatically.`,
		src: '/images/app-screenshots/ifcc-testngine.png',
		href: 'https://github.com/wootra/TestNetConnector',
		myRole: `This project started from TestNetConnector which I made to improve manual testability for the team.
		I used a lot of existing logic for this project and ended up as a new product of the company.(https://www.realtimewave.com/machate).
		`,
	},
	{
		id: 'testngine-1-0',
		title: 'TestNgine 1.0',
		techStacks: 'C#.Net, WCF, TCP/UDP, C, VxWorks(RTOS), Python(for loop), XML',
		desc: `Connecting with high-powered Realtime OS(VxWorks), this application allowed creation, edit, and execution of dynamic testing scenarios by easy accessible UI.
		Also allowing multi-depth scenario managed by XML which made it possible to be modularized.
		PDF, Excel report
		`,
		src: '/images/app-screenshots/testngine1-0.png',
		myRole: 'Initiated the project, Architecture, Implementation',
	},
	{
		id: 'igte',
		title: 'IGTE',
		techStacks: 'C#.Net, WCF, TCP/UDP, C, VxWorks(RTOS), XML, MS-SQL',
		desc: `Managing 6-DOF avionics models with database while developing Missiles to boost testing process`,
		src: ['/images/app-screenshots/igte-1.png', '/images/app-screenshots/igte-2.png'],
		myRole: 'Client SW development.',
	},
	{
		id: 'f1-simulator',
		title: 'F1 Simulator(UAV attack simulator)',
		techStacks: 'MFC',
		desc: `This project is a simple project to make the custom component library I made into a projection level. 
		this project evelved to panel builder project`,
		src: '/images/app-screenshots/f1-sim.png',
		myRole: 'Client SW development, Custom component development',
	},
	{
		id: 'smc-ste',
		title: 'SMC-STE Test SW',
		techStacks: 'MFC, XML',
		desc: `This project is an advanced project from F1 simulator and proved the reusability of existing custom components.
		Even though it is not pretty, this allowed customizing testability by placing pre-made custom components
		as well as XML meta data. By accepting idea of this project, Panel Builder project can be started.`,
		src: '/images/app-screenshots/smc-ste.png',
		myRole: 'introducing POC of the reusable components mixing with XML meta data',
	},
	{
		id: 'scenario-maker',
		title: 'Scenario Maker',
		techStacks: 'MFC, C, VxWorks',
		desc: `improving TestNgine 1.0, this project enhanced real-time testability, timeline-based timing configuration, 
		and low-level structure generator to parse data into C struct.`,
		src: '/images/app-screenshots/scenario-maker.png',
		href: 'https://www.realtimewave.com/systembridge',
		myRole: `Client development, Embedded code architecuture and leading, and Development of embedeed core module. 
		Giving the motivation of System Bridge(https://www.realtimewave.com/systembridge)`,
	},
	{
		id: 'panel-builder',
		title: 'Panel Builder(beta, 0.5)',
		techStacks: 'MFC, XML, OpenGL, LUA, BCG Library, Air manager library',
		desc: `Allow generation of hardware control/visualization dashboard.`,
		src: '/images/app-screenshots/panel-builder-beta.png',
		href: 'https://www.realtimewave.com/rpb',
		myRole: 'Initiated panel builder project.',
	},
	{
		id: 'active-sonar-simulator',
		title: 'Active Sonar TX/RX Simulator',
		techStacks: 'C++, Lab Windows/CVI, FFT algorithm',
		desc: `simulate active sonar server to test initial stage of sonar development.
		this software generated multiple frequency of wave, coding and decoding of frequency using FFT algorithm.`,
		src: '/images/app-screenshots/active-sonar-sim.png',
		myRole: 'requested to analyze the raw data signal. Analyzed the raw data, parsed the signal to remove header of encryption, generated chart.',
	},
	{
		id: 'active-sonar-controller',
		title: 'Active Sonar Test SW',
		techStacks: 'C++, Lab Windows/CVI, FFT algorithm, multi-thread(Intel TBB)',
		desc: `Performed actual testing for active-sonar using this application. 
		Visualization of sonar signals, active status of each sensors, Beam patterns and high resolution frequencies.`,
		src: [
			'/images/app-screenshots/active-sonar-controller-1.png',
			'/images/app-screenshots/active-sonar-controller-2.png',
		],
		myRole: `Tested 40 TX channel and 128 RX channel concurrently powered by IntelTBB multithread API and Intel multi-core CPU.
		Debugged actual hardware issues using this software.`,
	},
];

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            spacing: {
                '8xl': '96rem',
                '9xl': '128rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            backgroundColor: {
                'back-blue': 'rgb(0, 87, 114)',
            },
            colors: {
                'profile-photo': 'rgb(39, 104, 158)',
                title: '#70ad47',
                desc: 'black',
                'title-bottom': 'rgb(12, 138, 40)',
                'section-back': 'rgb(245, 245, 245)',
                'light-lime': 'rgb(219, 218, 163)',
                'skill-group-back': 'rgb(0, 68, 88)',
                'skill-gauge-back': 'rgba(187, 187, 187, 0.253)',
                'right-grid-link': 'rgb(197, 228, 241)',
                'right-grid-link-hover': 'rgb(238, 233, 143)',
                'expand-collapse-tool-back': 'rgb(0, 68, 88)',
                'link-color': 'rgb(0, 68, 88)',
                'link-hover-color': 'rgb(0, 158, 206)',
                blue: '#1fb6ff',
                purple: '#7e5bef',
                pink: '#ff49db',
                orange: '#ff7849',
                green: '#13ce66',
                yellow: '#ffc82c',
                'gray-dark': '#273444',
                gray: '#8492a6',
                'gray-light': '#d3dce6',
            },
            fontFamily: {
                sans: ['Graphik', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
            keyframes: {
                'scroll-x': {
                    from: {
                        marginLeft: '0',
                        width: 'calc(var(--itemCount,2) * 200%)',
                    },
                    to: {
                        marginLeft: 'calc(var(--itemCount,2) * 100% * -1)',
                        width: 'calc(var(--itemCount,2) * 200%)',
                    },
                },
                'ping-bounce': {
                    '0%, 100%': {
                        transform: 'translateY(-25%)',
                        animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
                        opacity: '0.3',
                    },
                    '50%': {
                        transform: 'none',
                        animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
                        transform: 'scale(2)',
                        opacity: '1',
                    },
                },
            },
            animation: {
                'scroll-x': 'scroll-x 10s linear infinite',
                'ping-bounce':
                    'ping-bounce 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
};

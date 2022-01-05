module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            flex: {
                0.7: '0.7 1 0%',
            },
            textColor: {
                lightGray: '#F1EFEE',
                primary: '#FAFAFA',
                secColor: '#efefef',
                navColor: '#BEBEBE',
                blackColor: '#292929',
            },
            backgroundColor: {
                mainColor: '#FBF8F9',
                secondaryColor: '#F0F0F0',
                blackOverlay: 'rgba(0, 0 ,0 ,0.1)',
            },
            keyframes: {
                'slide-in': {
                    '0%': {
                        '-webkit-transform': 'translateX(-200px)',
                        transform: 'translateX(-200px)',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0px)',
                        transform: 'translateX(0px)',
                    },
                },

                'slide-fwd': {
                    '0%': {
                        '-webkit-transform': 'translateZ(0px)',
                        transform: 'translateZ(0px)',
                    },
                    '100%': {
                        '-webkit-transform': 'translateZ(160px)',
                        transform: 'translateZ(160px)',
                    },
                },
            },
            animation: {
                'slide-in': 'slide-in 0.5s ease-out',
                'slide-fwd':
                    ' slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
            },
            transitionProperty: {
                height: 'height',
            },
        },
    },
    variants: {
        // backgroundColor: ['active'],
        extend: {},
    },
    plugins: [],
};

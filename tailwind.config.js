const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.liquid'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            rotate: {
                25: '25deg',
            },
            colors: {
                ...colors,
            },
            fontFamily: {
                sans: ['"Inter"'],
                mono: ['"Fira Code"'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}

module.exports = {
    task: {
        build: {
            'build-js': {
                module: './gulp/task-js.js',
                src: './src/js/**/*.js',
                watch: './src/js/**/*.js',
                dest: './',
                option: {}
            }
        },
        dev: {
            'local-server': {
                module: './gulp/task-server.js',
                src: './docs/',
                watch: './docs/**/**',
                option: {}
            },
            'sass': {
                module: './gulp/task-sass.js',
                src: [
                    './src/sass/**/*.scss',
                    '!./src/sass/`**/_*.scss'
                ],
                watch: './src/sass/**/*.scss',
                dest: './docs/css/',
                option: {
                    sass: {
                        'outputStyle': 'expanded'
                    },
                    minify: false,
                    csscomb: true,
                    mqpacker: true,
                    autoprefixer: [
                        'ie >= 11',
                        'Android >= 5.1',
                        'iOS >= 8'
                    ]
                }
            },
            'js': {
                module: './gulp/task-js.js',
                src: './src/js/**/*.js',
                watch: './src/js/**/*.js',
                dest: './docs/js/',
                option: {}
            }
        }
    }
};

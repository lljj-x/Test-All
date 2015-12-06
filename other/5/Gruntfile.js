module.exports = function(grunt) {

	var sitename = '测试Title';

	var version = new Date - 0;

	var copyPath = 'src/assets';

	grunt.initConfig({

		// css 压缩合并
		less: {
			debug: {
				files: [{
					expand: true,
					cwd: 'src/less',
					src: ['**/*.less', '!_*/*.less'],
					dest: 'debug/css',
					ext: '.css'
				}]
			},
			build: {
				options: {
					compress: true
				},
				files: [{
					expand: true,
					cwd: 'src/less',
					src: ['**/*.less', '!_*/*.less'],
					dest: 'dist/css',
					ext: '.css'
				}]
			}
		},

		// 组合js以及html include
		includereplace: {
			js: {
				files: [{
					expand: true,
					cwd: 'src/js',
					src: ['**/*.js', '!_*/*.js'],
					dest: 'debug/js'
				}]
			},
			html: {
				files: [{
					expand: true,
					cwd: 'src/tpl',
					src: ['**/*.html', '!_*/*.html'],
					dest: 'debug'
				}]
			}
		},

		// 静态文件生成替换相关变量
		replace: {
			html: {
				options: {
					variables: {
						'sitename': sitename,
						'version': version
					}
				},
				files: [{
					expand: true,
					cwd: 'debug',
					src: ['**/*.html', '!_*/*.html'],
					dest: 'debug'
				}]
			}
		},

		// 压缩并输出最终html文件
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			all: {
				files: [{
					expand: true,
					cwd: 'debug',
					src: '**/*.html',
					dest: 'dist'
				}]
			}
		},
		
		
		// css 自动前缀
		autoprefixer : {
		   debug : {
				files: [{
					expand: true,
					cwd: 'debug',
					src: '**/*.css',
					dest: 'debug'
				}]
			},
			build: {
				options: {
					compress: true
				},
				files: [{
					expand: true,
					cwd: 'dist',
					src: '**/*.css',
					dest: 'dist'
				}]
			}
		},

		// js压缩
		uglify: {
			js: {
				files: [{
					expand: true,
					cwd: 'debug/js',
					src: '**/*.js',
					dest: 'dist/js'
				}]
			}
		},

		// copy静态文件
		copy: {
			debug: {
				files: [{
					expand: true,
					cwd: copyPath,
					src: '**/*.*',
					dest: 'debug/assets'
				}]
			},
			build: {
				files: [{
					expand: true,
					cwd: copyPath,
					src: '**/*.*',
					dest: 'dist/assets'
				}]
			}
		},

		// 文件监听
		watch: {
			html: {
				options: {
					debounceDelay: 250
				},
				files: ['src/tpl/**/*.html'],
				tasks: ['includereplace:html', 'replace', 'htmlmin']
			},
			css: {
				options: {
					debounceDelay: 250
				},
				files: ['src/less/**/*.less'],
				tasks: ['less']
			},
			js: {
				options: {
					debounceDelay: 250
				},
				files: ['src/js/**/*.js'],
				tasks: ['includereplace:js', 'uglify']
			},
			incHtml: {
				options: {
					debounceDelay: 250
				},
				files: ['src/inc/**/*.html'],
				tasks: ['includereplace:html', 'replace', 'htmlmin']
			},
			
			
			// 监听静态文件复制
			staticFileCopy :{
					options: {
						debounceDelay: 250
					},
					files: ['src/assets/**/*.*'],
					tasks : ['copy']
			},
			
			// 监听编译后css
			styles : {
					options: {
						debounceDelay: 250
					},
					files: ['src/less/**/*.less'],
					// files : ['debug/css/**/*.css','dist/css/**/*.css'],
					tasks : ['autoprefixer' ]
			 }
		}

	});

	grunt.registerTask('clear', function() {

		console.log('删除 debug 文件...');

		grunt.file.delete('debug');

		console.log('删除 dist 文件...');

		grunt.file.delete('dist');

	});

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-include-replace');

	grunt.loadNpmTasks('grunt-replace');

	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('default', ['clear', 'less', 'includereplace', 'replace', 'htmlmin', 'autoprefixer','uglify', 'copy']);

	grunt.registerTask('listen', ['watch']);
	
	grunt.registerTask('empty', ['clear']);
};
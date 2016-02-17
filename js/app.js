'use strict';

// settings app
var App = {
	// variables
	current_hour: null,
	current_language: null,
	current_minutes: null,
	current_seconds: null,
	container_currentDate : null,

	// settings
	settings: {
		theme: null,
		size: null,
		language: null,
	},

	// translate
	language: {
		english: {
			words: {
				current_time: [
					'Current Time',
					'Day Week',
					'Year'
				],
				day_week: [
					'Sunday',
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday'
				],
				menu_config: {
					theme: [
						'Theme',
						'Radioactive',
						'Node JS',
						'Classic',
						'HTML'
					],
					size: [
						'Size',
						'Small',
						'Medium',
						'Big'
					],
					language: [
						'Language',
						'English',
						'Spanish'
					]
				},
				help:{
					title: "Shortcuts Keyboards",
					theme: {
						title: 'Themes Clock',
						1: [
							"numpad '1'",
							"Theme Radioactive"
						],
						2: [
							"numpad '2'",
							"Theme Node JS"
						],
						3: [
							"numpad '3'",
							"Theme Classic"
						],
						4: [
							"numpad '4'",
							"Theme HTML"
						]
					},
					size: {
						title: 'Sizes Clock',
						1: [
							"Combination 'shift + a'",
							"Small"
						],
						2: [
							"Combination 'shift + m'",
							"Medium"
						],
						3: [
							"Combination 'shift + b'",
							"Big"
						]
					},
					language: {
						title: 'Language',
						1: [
							"Letter 'e'",
							"English"
						],
						2: [
							"Letter 's'",
							"Spanish"
						],
					},
					help: {
						title: 'Help',
						1: [
							"Letter 'h'",
							"Help Popup"
						]

					}
				}
			}
		},
		spanish: {
			words: {
				current_time: [
					'Tiempo Actual',
					'Dia de la Semana',
					'Año'
				],
				day_week: [
					'Domingo',
					'Lunes',
					'Martes',
					'Miercoles',
					'Jueves',
					'Viernes',
					'Sabado'
				],
				menu_config: {
					theme: [
						'Tema',
						'Radioactivo',
						'Node JS',
						'Clásico',
						'HTML'
					],
					size: [
						'Tamaño',
						'Pequeño',
						'Mediano',
						'Grande'
					],
					language: [
						'Idioma',
						'Ingles',
						'Español'
					],
				},
				help:{
					title: "Atajos de Teclado",
					theme: {
						title: 'Temas Reloj',
						1: [
							"Teclado Númerico '1'",
							"Tema Radioactivo"
						],
						2: [
							"Teclado Númerico '2'",
							"Tema Node JS"
						],
						3: [
							"Teclado Númerico '3'",
							"Tema Clásico"
						],
						4: [
							"Teclado Númerico '4'",
							"Tema HTML"
						]
					},
					size: {
						title: 'Tamaños Reloj',
						1: [
							"Combinación de Teclas 'shift + a'",
							"Pequeño"
						],
						2: [
							"Combinación de Teclas 'shift + m'",
							"Mediano"
						],
						3: [
							"Combinación de Teclas 'shift + b'",
							"Grande"
						]
					},
					language: {
						title: 'Idioma',
						1: [
							"Letra 'e'",
							"Inglés"
						],
						2: [
							"Letra 's'",
							"Español"
						],

					},
					help: {
						title: 'Ayuda',
						1: [
							"Letra 'h'",
							"Popup Ayuda"
						]

					}
				}
			}
		}
	},

	// intervals
	intervals: {
		clock: null,
		loader: null
	},

	// initializacion App
	init: function(){

		// function to manage the loader
		this.loader();

		// initializacion container Current Date
		this.container_currentDate = $('.current_date');

		this.cache();

		this.events.screenSizeValidation();

		this.events.time();
	},
	loader: function(){
		var progress = 0;

		App.intervals.loader = setInterval(function(){
			// increments
			progress++;

			// show the change in number
			$('.loader .porcentage span').text(progress+'%');

			if(progress == 100){ // end progress
				clearInterval(App.intervals.loader); // stop interval
				$('.loader').addClass('loaded'); // animation loader

				setTimeout(function(){
					$('.loader').fadeOut('500'); // hide the loader

					// call events
					App.events.buttons();
					App.events.windowPress();
				},400);
			}
		}, 30);
	},
	cache: function(){
		// settings prev configure
		if(localStorage.getItem('settings') != undefined){ // if exist prev configuration

			this.settings = JSON.parse(localStorage.getItem('settings')); // initialization

			// add theme to body page
			$('body').addClass(this.settings.theme);

			// add size to click
			$('.clock').addClass(this.settings.size);

			// configure the language prev set
			this.translate_app(this.settings.language);

			if(this.settings.theme != undefined) { // if isn't null
				this.change_favicon(this.settings.theme); // change the favicon

				// add the menu themes item active
				$('.config ul.theme li:not(.header)').removeClass('active');
				$('.config ul.theme li[theme="' + this.settings.theme.slice(-1) + '"]').addClass('active');
			}

			if(this.settings.size != undefined) { // if isn't null
				// add the menu sizes item active
				$('.config ul.size li:not(.header)').removeClass('active');
				$('.config ul.size li[size="' + this.settings.size + '"]').addClass('active');
			} 
			if(this.settings.language != undefined){ // if isn't null
				// add the menu language item active
				$('.config ul.language li:not(.header)').removeClass('active');
				$('.config ul.language li[language="' + this.settings.language + '"]').addClass('active');
			} 
		}else
			App.current_language = 'english';
	},
	change_favicon: function(theme){
		if(theme != "theme1")
			$('#favicon').attr('href', 'img/favicon_'+theme+'.png');
		else
			$('#favicon').attr('href', 'img/favicon.png');
	},
	translate_app: function(lan){
		if(lan == "spanish"){ // if the language is spanish
			this.current_language = "spanish"; // change the current language
			this.events.block_translate();
		}else{ // if the language is english
			this.current_language = "english"; // change the current language
			this.events.block_translate();
		}
	},
	events: {
		// block what translate the text of the page
		block_translate: function(){
			// tranlate de container current date
			App.container_currentDate.find('.hour').prev().html(App.language[App.current_language].words.current_time[0]);				
			App.container_currentDate.find('.day_week').prev().html(App.language[App.current_language].words.current_time[1]);				
			App.container_currentDate.find('.year').prev().html(App.language[App.current_language].words.current_time[2]);

			// translate the container menu theme
			$('.config ul.theme li').each(function(i,o){
				$(o).text(App.language[App.current_language].words.menu_config.theme[i]);
			});	

			// translate the container menu size
			$('.config ul.size li').each(function(i,o){
				$(o).text(App.language[App.current_language].words.menu_config.size[i]);
			});	

			// translate the container menu language
			$('.config ul.language li').each(function(i,o){
				$(o).text(App.language[App.current_language].words.menu_config.language[i]);
			});	

			// tranlate popup help
			$('.popup.help h1').text(App.language[App.current_language].words.help.title);	
			$('.popup.help ul.themes li').each(function(i,o){
				if(i == 0){
					$(o).text(App.language[App.current_language].words.help.theme.title);
				}else{
					$(o).find('em').text(App.language[App.current_language].words.help.theme[i][0]);
					$(o).find('span').text(App.language[App.current_language].words.help.theme[i][1]);
				}
			});	
			$('.popup.help ul.sizes li').each(function(i,o){
				if(i == 0){
					$(o).text(App.language[App.current_language].words.help.size.title);
				}else{
					$(o).find('em').text(App.language[App.current_language].words.help.size[i][0]);
					$(o).find('span').text(App.language[App.current_language].words.help.size[i][1]);
				}
			});	
			$('.popup.help ul.language li').each(function(i,o){
				if(i == 0){
					$(o).text(App.language[App.current_language].words.help.language.title);
				}else{
					$(o).find('em').text(App.language[App.current_language].words.help.language[i][0]);
					$(o).find('span').text(App.language[App.current_language].words.help.language[i][1]);
				}
			});	
			$('.popup.help ul.help li').each(function(i,o){
				if(i == 0){
					$(o).text(App.language[App.current_language].words.help.help.title);
				}else{
					$(o).find('em').text(App.language[App.current_language].words.help.help[i][0]);
					$(o).find('span').text(App.language[App.current_language].words.help.help[i][1]);
				}
			});	
		},

		// event window when press keyboards
		windowPress: function(){
			$(document).keydown(function(event){
				var code = event.keyCode; // get the code

				var theme = null;
				var language = null;
				var size = null;

				if(code == 49) // num 1
					theme = "theme1"; 
				else if(code == 50) // num 2
					theme = "theme2"; 
				else if(code == 51) // num 3
					theme = theme = "theme3"; 
				else if(code == 52) // num 4
					theme = "theme4"; 
				else if(code == 83) // s
					language = "spanish"; 
				else if(code == 69) // e
					language = "english"; 
				else if(code == 83) // shift + s
					size = "small"; 
				else if(code == 77) // shift + m
					size = "medium"; 
				else if(code == 66){  // shift + b
					if ($(window).width() > 600) size = "big"; 
					else size = null;
				}
				else if(code == 72) // h
					$('.popup.help').toggleClass('open');
				else{ // others letters
					theme = null;
					size = null;
					language = null;
				}

				if(theme != null){
					App.settings.theme = theme;
					localStorage.setItem('settings', JSON.stringify(App.settings)); // save configuration

					App.change_favicon(theme);

					$('body').removeClass('theme1 theme2 theme3 theme4');
					$('body').addClass(theme);

					$('.config ul.theme li:not(.header)').removeClass('active');
					$('.config ul.theme li[theme="' + App.settings.theme.slice(-1) + '"]').addClass('active');
				}
				if(language != null){
					App.settings.language = language;
					localStorage.setItem('settings', JSON.stringify(App.settings)); // save configuration

					App.translate_app(language);

					if(App.settings.language != undefined){
						$('.config ul.language li:not(.header)').removeClass('active');
						$('.config ul.language li[language="' + App.settings.language + '"]').addClass('active');
					}
				}
				if(size != null){
					App.settings.size = size;
					localStorage.setItem('settings', JSON.stringify(App.settings)); // save configuration

					$('.clock').removeClass('small medium big');
					$('.clock').addClass(size);

					if(App.settings.size != undefined) {
						$('.config ul.size li:not(.header)').removeClass('active');
						$('.config ul.size li[size="' + App.settings.size + '"]').addClass('active');
					} 
				}
			});
		},

		// events buttons container .config
		buttons: function(){
			// click on the list differents clocks
			$('.config ul.theme li:not(.header)').unbind('click').click(function(){
				$('.config ul.theme li:not(.header)').removeClass('active');
				$(this).addClass('active');

				var theme = "theme"+$(this).attr('theme'); 

				App.settings.theme = theme;
				localStorage.setItem('settings', JSON.stringify(App.settings));

				App.change_favicon(theme);

				$('body').removeClass('theme1 theme2 theme3 theme4');
				$('body').addClass(theme);
			});

			// click on the list differents sizes clocks
			$('.config ul.size li:not(.header)').unbind('click').click(function(){
				$('.config ul.size li:not(.header)').removeClass('active');
				$(this).addClass('active');

				var size = $(this).attr('size');

				App.settings.size = size;
				localStorage.setItem('settings', JSON.stringify(App.settings));

				$('.clock').removeClass('small medium big');
				$('.clock').addClass(size);
			});

			// click on the list languages
			$('.config ul.language li:not(.header)').unbind('click').click(function(){
				$('.config ul.language li:not(.header)').removeClass('active');
				$(this).addClass('active');

				var language = $(this).attr('language');

				App.settings.language = language;
				localStorage.setItem('settings', JSON.stringify(App.settings));

				App.translate_app(language);
			});

			// click help icon
			$('.item.help').unbind('click').click(function(){
				$('.popup.help').addClass('open');
			});

			// click to close popup
			$('.popup.help .close').unbind('click').click(function(){
				$('.popup.help').removeClass('open');
			});
		},

		// validate screen size
		screenSizeValidation: function(){
			// if the screen is < 600 pixels
			if ($(window).width() < 600) {
				$('.clock').removeClass('big medium').addClass("small");
				$('.config ul.size li:not(.header)').removeClass('active').eq(0).addClass('active'); // add class active item small list size
			}

			// event resize window
			$(window).resize(function(){
				if ($(window).width() < 600) {
					$('.clock').removeClass('big medium').addClass("small");
					$('.config ul.size li:not(.header)').removeClass('active').eq(0).addClass('active'); // add class active item small list size
				}
			});
		},

		// function to set current time
		time: function(){
			var $seconds = $('.seconds');
			var $minutes = $('.minutes');
			var $hours = $('.hours');
			var initial = true;
			var step_seconds = 0, step_minutes = 0, step_hours = 30;

			App.intervals.clock = setInterval(function(){

				var date = new Date(); // get current time with class Date
				App.current_hour = date.getHours();
				App.current_minutes = date.getMinutes();
				App.current_seconds = date.getSeconds();
				
				// update container current date
				App.container_currentDate.find('.hour').html(App.current_hour);
				App.container_currentDate.find('.minute').html(App.current_minutes);
				App.container_currentDate.find('.second').html(App.current_seconds);				
				App.container_currentDate.find('.day_week').html(App.language[App.current_language].words.day_week[date.getDay()]);
				App.container_currentDate.find('.year').html(date.getFullYear());				

				// set position each pointer only one time
				if(initial){
					step_minutes = App.current_minutes * 6;
					// move cursor minutes
					$minutes.css({		
						'transform': 'translate3d(0, -50%, 0) rotate('+step_minutes+'deg)'
					});	

					step_hours = App.current_hour * 30;
					// move cursor minutes
					$hours.css({		
						'transform': 'translate3d(0, -50%, 0) rotate('+step_hours+'deg)'
					});	
					initial = false;

					step_seconds = App.current_seconds * 6;
				}

				// end seconds
				if(step_seconds == 360){
					step_seconds = 0;

					// increment
					step_minutes = step_minutes + 6;

					// move cursor minutes
					$minutes.css({		
						'transform': 'translate3d(0, -50%, 0) rotate('+step_minutes+'deg)'
					});	

					if(step_minutes == 360){
						step_minutes = 0;

						// move cursor hours
						$hours.css({		
							'transform': 'translate3d(0, -50%, 0) rotate('+step_hours+'deg)'
						});	

						// increment
						step_hours = step_hours + 30;
					}

					step_minutes = App.current_minutes * 6;
				}

				// move cursor seconds
				$seconds.css({		
					'transform': 'translate3d(0, -50%, 0) rotate('+step_seconds+'deg)'
				});	

				// increment
				step_seconds = step_seconds + 6;
			}, 1000); 
		}
	},
}

// when the document is ready
$().ready(function(){
	App.init(); // initialization Application
});
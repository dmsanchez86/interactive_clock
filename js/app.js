
var App = {
	current_hour: null,
	current_language: null,
	current_minutes: null,
	current_seconds: null,
	settings: {
		theme: null,
		size: null,
		language: null,
	},
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
	}
}

$().ready(function(){

	// function to manage the loader
	loader();

	var $current_date = $('.current_date');

	// settings prev configure
	if(localStorage.getItem('settings') != undefined){

		App.settings = JSON.parse(localStorage.getItem('settings'));

		change_favicon(App.settings.theme);

		$('body').removeClass('theme1 theme2 theme3 theme4');
		$('body').addClass(App.settings.theme);

		$('.clock').removeClass('small medium big');
		$('.clock').addClass(App.settings.size);

		translate_app(App.settings.language);

		$('.config ul.theme li:not(.header)').removeClass('active');
		$('.config ul.theme li[theme="' + App.settings.theme.slice(-1) + '"]').addClass('active');

		if(App.settings.size != undefined) {
			$('.config ul.size li:not(.header)').removeClass('active');
			$('.config ul.size li[size="' + App.settings.size + '"]').addClass('active');
		} 
		if(App.settings.language != undefined){
			$('.config ul.language li:not(.header)').removeClass('active');
			$('.config ul.language li[language="' + App.settings.language + '"]').addClass('active');
		} 
	}

	var $seconds = $('.seconds');
	var $minutes = $('.minutes');
	var $hours = $('.hours');
	var initial = true;
	var step_seconds = 0, step_minutes = 0, step_hours = 30;

	if ($(window).width() < 500) {
		$('.clock').addClass("small");
		$('.config ul.size li:not(.header)').removeClass('active');
		$('.config ul.size li:not(.header)').eq(0).addClass('active');
	}

	App.current_language = 'english';
	//$current_date.html(new Date);

	setInterval(function(){

		var date = new Date();
		App.current_hour = date.getHours();
		App.current_minutes = date.getMinutes();
		App.current_seconds = date.getSeconds();
		
		$current_date.find('.hour').html(App.current_hour);
		$current_date.find('.minute').html(App.current_minutes);
		$current_date.find('.second').html(App.current_seconds);				
		$current_date.find('.day_week').html(App.language[App.current_language].words.day_week[date.getDay()]);				
		$current_date.find('.year').html(date.getFullYear());				

		// set position each pointer
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

		step_seconds = App.current_seconds * 6;

		// move cursor seconds
		$seconds.css({		
			'transform': 'translate3d(0, -50%, 0) rotate('+step_seconds+'deg)'
		});	

		// increment
		step_seconds = step_seconds + 6;
	
	}, 1000); 

	setTimeout(function(){
		$('.current_date').addClass('active');
	}, 1000);

	// click on the list differents clocks
	$('.config ul.theme li:not(.header)').unbind('click').click(function(){
		$('.config ul.theme li:not(.header)').removeClass('active');
		$(this).addClass('active');

		var theme = "theme"+$(this).attr('theme'); 

		App.settings.theme = theme;
		localStorage.setItem('settings', JSON.stringify(App.settings));

		change_favicon(theme);

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

		translate_app(language);
	});

	// click help icon
	$('.item.help').unbind('click').click(function(){
		$('.popup.help').addClass('open');
	});

	// click to close popup
	$('.popup.help .close').unbind('click').click(function(){
		$('.popup.help').removeClass('open');
	});

	$(window).unbind('keypress').keypress(function(e){
		var code = e.keyCode;
		console.log(code);

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
		else if(code == 115) // s
			language = "spanish"; 
		else if(code == 101) // e
			language = "english"; 
		else if(code == 83) // shift + s
			size = "small"; 
		else if(code == 77) // shift + m
			size = "medium"; 
		else if(code == 66) // shift + b
			size = "big"; 
		else if(code == 104) // h
			$('.popup.help').toggleClass('open');
		else{
			theme = null;
			size = null;
			language = null;
		}

		if(theme != null){
			App.settings.theme = theme;
			localStorage.setItem('settings', JSON.stringify(App.settings));

			change_favicon(theme);

			$('body').removeClass('theme1 theme2 theme3 theme4');
			$('body').addClass(theme);
		}
		if(language != null){

			App.settings.language = language;
			localStorage.setItem('settings', JSON.stringify(App.settings));

			translate_app(language);
		}
		if(size != null){
			App.settings.size = size;
			localStorage.setItem('settings', JSON.stringify(App.settings));

			$('.clock').removeClass('small medium big');
			$('.clock').addClass(size);
		}
	});

	function change_favicon(theme){
		if(theme != "theme1")
			$('#favicon').attr('href', 'img/favicon_'+theme+'.png');
		else
			$('#favicon').attr('href', 'img/favicon.png');
	}

	function translate_app(lan){
		if(lan == "spanish"){
			App.current_language = "spanish";

			// translate the container current time
			$current_date.find('.hour').prev().html(App.language[App.current_language].words.current_time[0]);				
			$current_date.find('.day_week').prev().html(App.language[App.current_language].words.current_time[1]);				
			$current_date.find('.year').prev().html(App.language[App.current_language].words.current_time[2]);	

			// translate the container menu theme
			$('.config ul.theme li').each(function(i,o){
				var $elem = $(o);
				$elem.text(App.language[App.current_language].words.menu_config.theme[i]);
			});	

			// translate the container menu size
			$('.config ul.size li').each(function(i,o){
				var $elem = $(o);
				$elem.text(App.language[App.current_language].words.menu_config.size[i]);
			});	

			// translate the container menu language
			$('.config ul.language li').each(function(i,o){
				var $elem = $(o);
				$elem.text(App.language[App.current_language].words.menu_config.language[i]);
			});			

			// tranlate popup help
			$('.popup.help h1').text(App.language[App.current_language].words.help.title);
			$('.popup.help ul.themes li').each(function(i,o){
				var $elem = $(o);
				if(i == 0){
					$elem.text(App.language[App.current_language].words.help.theme.title);
				}else{
					$elem.find('em').text(App.language[App.current_language].words.help.theme[i][0]);
					$elem.find('span').text(App.language[App.current_language].words.help.theme[i][1]);
				}
			});	
			$('.popup.help ul.sizes li').each(function(i,o){
				var $elem = $(o);
				if(i == 0){
					$elem.text(App.language[App.current_language].words.help.size.title);
				}else{
					$elem.find('em').text(App.language[App.current_language].words.help.size[i][0]);
					$elem.find('span').text(App.language[App.current_language].words.help.size[i][1]);
				}
			});	
			$('.popup.help ul.language li').each(function(i,o){
				var $elem = $(o);
				if(i == 0){
					$elem.text(App.language[App.current_language].words.help.language.title);
				}else{
					$elem.find('em').text(App.language[App.current_language].words.help.language[i][0]);
					$elem.find('span').text(App.language[App.current_language].words.help.language[i][1]);
				}
			});	
			$('.popup.help ul.help li').each(function(i,o){
				var $elem = $(o);
				if(i == 0){
					$elem.text(App.language[App.current_language].words.help.title);
				}else{
					$elem.find('em').text(App.language[App.current_language].words.help.help[i][0]);
					$elem.find('span').text(App.language[App.current_language].words.help.help[i][1]);
				}
			});	
		}else{
			App.current_language = "english";

			$current_date.find('.hour').prev().html(App.language[App.current_language].words.current_time[0]);				
			$current_date.find('.day_week').prev().html(App.language[App.current_language].words.current_time[1]);				
			$current_date.find('.year').prev().html(App.language[App.current_language].words.current_time[2]);

			// translate the container menu theme
			$('.config ul.theme li').each(function(i,o){
				var $elem = $(o);
				$elem.text(App.language[App.current_language].words.menu_config.theme[i]);
			});	

			// translate the container menu size
			$('.config ul.size li').each(function(i,o){
				var $elem = $(o);
				$elem.text(App.language[App.current_language].words.menu_config.size[i]);
			});	

			// translate the container menu language
			$('.config ul.language li').each(function(i,o){
				var $elem = $(o);
				$elem.text(App.language[App.current_language].words.menu_config.language[i]);
			});	

			// tranlate popup help
			$('.popup.help h1').text(App.language[App.current_language].words.help.title);	
			$('.popup.help ul.themes li').each(function(i,o){
				var $elem = $(o);
				if(i == 0){
					$elem.text(App.language[App.current_language].words.help.theme.title);
				}else{
					$elem.find('em').text(App.language[App.current_language].words.help.theme[i][0]);
					$elem.find('span').text(App.language[App.current_language].words.help.theme[i][1]);
				}
			});	
			$('.popup.help ul.sizes li').each(function(i,o){
				var $elem = $(o);
				if(i == 0){
					$elem.text(App.language[App.current_language].words.help.size.title);
				}else{
					$elem.find('em').text(App.language[App.current_language].words.help.size[i][0]);
					$elem.find('span').text(App.language[App.current_language].words.help.size[i][1]);
				}
			});	
			$('.popup.help ul.language li').each(function(i,o){
				var $elem = $(o);
				if(i == 0){
					$elem.text(App.language[App.current_language].words.help.language.title);
				}else{
					$elem.find('em').text(App.language[App.current_language].words.help.language[i][0]);
					$elem.find('span').text(App.language[App.current_language].words.help.language[i][1]);
				}
			});	
			$('.popup.help ul.help li').each(function(i,o){
				var $elem = $(o);
				if(i == 0){
					$elem.text(App.language[App.current_language].words.help.help.title);
				}else{
					$elem.find('em').text(App.language[App.current_language].words.help.help[i][0]);
					$elem.find('span').text(App.language[App.current_language].words.help.help[i][1]);
				}
			});	
		}
	}

	function loader(){
		var progress = 0, progress_size = 100;

		var interval = setInterval(function(){
			progress++;
			progress_size++;
			$('.loader .porcentage span').text(progress+'%');
			

			if(progress == 100){
				clearInterval(interval);
				$('.loader').addClass('loaded');

				setTimeout(function(){
					$('.loader').fadeOut('500');
				},700);
			}
		}, 10);
	}
});

var App = {
	current_hour: null,
	current_language: null,
	current_minutes: null,
	current_seconds: null,
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
				}
			}
		}
	}
}

$().ready(function(){

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

	var $current_date = $('.current_date');
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

		$('body').removeClass('theme1 theme2 theme3 theme4');
		$('body').addClass(theme);
	});

	// click on the list differents sizes clocks
	$('.config ul.size li:not(.header)').unbind('click').click(function(){
		$('.config ul.size li:not(.header)').removeClass('active');
		$(this).addClass('active');

		var size = $(this).attr('size');

		$('.clock').removeClass('small medium big');
		$('.clock').addClass(size);
	});
	

	// click on the list languages
	$('.config ul.language li:not(.header)').unbind('click').click(function(){
		$('.config ul.language li:not(.header)').removeClass('active');
		$(this).addClass('active');

		var language = $(this).attr('language');

		translate_app(language);
	});

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
		}
	}
});

var App = {
	current_hour: null,
	current_minutes: null,
	current_seconds: null,
	day_week: [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	],
};

$().ready(function(){

	var $seconds = $('.seconds');
	var $minutes = $('.minutes');
	var $hours = $('.hours');
	var initial = true;
	var step_seconds = 0, step_minutes = 0, step_hours = 30;

	var $current_date = $('.current_date');
	//$current_date.html(new Date);

	setInterval(function(){

		var date = new Date();
		App.current_hour = date.getHours();
		App.current_minutes = date.getMinutes();
		App.current_seconds = date.getSeconds();
		
		$current_date.find('.hour').html(App.current_hour);
		$current_date.find('.minute').html(App.current_minutes);
		$current_date.find('.second').html(App.current_seconds);				
		$current_date.find('.day_week').html(App.day_week[date.getDay()]);				
		$current_date.find('.year').html(date.getFullYear());				

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

	// click on the list differents clocks
	$('.config ul li').unbind('click').click(function(){
		$('.config ul li').removeClass('active');
		$(this).addClass('active');

		var theme = "theme"+$(this).attr('theme');

		$('body').removeClass('theme1 theme2 theme3 theme4');
		$('body').addClass(theme);
	});

});
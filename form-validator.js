<script>

	/* Делаем чтоб всякие бичи не могли оставлять заявку в форму не раньше чем через пол часа */

	<?php 

		$ip_adress = $_SERVER["REMOTE_ADDR"];

		echo "var ip_adress = '". $ip_adress . "';"; // Сохраняем IP адрес в переменную  

	?>

	/* Функция позволяет получить конкретный пункт куки */ 
		
	function getCookie(name) {  // 
			var cookie = " " + document.cookie;
			var search = " " + name + "=";
			var setStr = null;
			var offset = 0;
			var end = 0;
			
		if (cookie.length > 0) {
			offset = cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				end = cookie.indexOf(";", offset)
				if (end == -1) {
					end = cookie.length;
				}
				setStr = unescape(cookie.substring(offset, end));
			}
		}
		return(setStr);
	}	

	var myIpAdress = getCookie("username"); // Получили из куки айпи адрес 

	
	


	function Ajax_send_form (clicked_button_name, required_input_name, form_id) {
		//document.getElementById(clicked_button_name).onclick = function() {
			if(document.getElementById(required_input_name).value.replace(/\s+/g, '').length) { // Если не пустая строка

	

				if ( myIpAdress == null ) { // Если это первый визит

					

					jQuery.ajax({
	        			url:     'submit.php', //Адрес подгружаемой страницы
	        			type:     "POST", //Тип запроса
	        			data: jQuery('#'+form_id).serialize(), 
	        			success: function(response) { //Если все нормально
	        					$(".place-for-popups").load('ajax/popup/thanks.php');


	        					// Записали в куки айпи адрес посетителя, куки будут жить пол часа 
	        					var d = new Date();
    							d.setTime(d.getTime() + (1800*1000));
    							var expires = d.toUTCString();

	        					document.cookie =  "username" + "=" + ip_adress + "; expires=" + expires; // Сохранили в куки айпи 

	        					console.log('Cookie saved 🔥🔥🐰🔥🔥');


	            				jQuery.ajax({
	                					url:     '../testa/handler.php', //Адрес подгружаемой страницы
	                					type:     "POST", //Тип запроса
	                					dataType: "html", //Тип данных
	                					data: jQuery('#'+form_id).serialize(), 
	                					success: function(response) { //Если все нормально
	                    
	                					}                            
	            				});

	            				document.getElementById(form_id).reset();

	        			}
	
			    	});	

				} else {
					alert('Мы свяжемся с Вами в ближайшее время! Пожалуйста, дождитесь нашего звонка, либо позвоните +7 (812) 426-10-20');
				}

			} else {
				alert('Пожалуйста, введите телефон');
			    $('#' + required_input_name).css('border', '1px solid red');
			    $('#' + required_input_name).addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
		     	$(this).removeClass('animated shake');
					});
				}
		};

</script>
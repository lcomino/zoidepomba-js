(function(){
	'use strict';
	var bannersAnuncio = document.getElementsByClassName('banner-anuncio');

	for(var i = 0, j = bannersAnuncio.length; i < j; i++){
	    bannersAnuncio[i].addEventListener('click', function(e){
	        ga('send', 'event', {
	          'eventCategory': this.getAttribute('data-banner-posicao'),
	          'eventAction': 'Click',
	          'eventLabel': this.getAttribute('data-cliente')
	        });
	    });
	}
})();


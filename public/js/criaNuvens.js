$(window).load(function(){
	ajustaTamanhoCeu("#ceu");
	duplicaElemento("#ceu", "#nuvens0");
});
/**
 * 
 * Cria o movimento das nuvens;
 * 
 * @param elementoPai
 * @param elementoEach
 * 
 */
function criaElementosComMovimento(elementoPai, elementoEach){	
	var framesPorSegundo = 1000/30;
	
	$(elementoEach, elementoPai).each(function(){
		var elementoAtual = $(this);
		var velocidade = Math.random()*2 - 1;
		var lEspacoTotalElemento = parseInt($(window).width());
		var hEspacoTotalElemento = parseInt($("body").height());
		var leftInicial = parseInt(Math.random()*lEspacoTotalElemento);
		var topInicial = parseInt(Math.random()*hEspacoTotalElemento);
		var larguraInicial = parseInt(Math.random()*100 + 50);
		var alturaInicial = (100*larguraInicial) / 150;
		var leftAtual = leftInicial;
		
		elementoAtual.css({left: leftAtual + "px", top: topInicial + "px", width: larguraInicial + "px", height: alturaInicial + "px", display: "block"});
		
		setInterval(function(){
			elementoAtual.css({left: leftAtual + "px"});
			leftAtual = leftAtual + velocidade;
			
			if(leftAtual > $(window).width()) leftAtual = -(elementoAtual.width()) + velocidade;
			if(leftAtual < -(elementoAtual.width())) leftAtual = $(window).width() + velocidade;
		
		}, framesPorSegundo);
	});
}

/**
 * Duplica as nuvens;
 * 
 * @param elementoPai
 * @param elementoClone
 */
function duplicaElemento(elementoPai, elementoClone) {
    var cont = 1;
    var limit = parseInt(Math.random()*10 + 10);

    while (cont < limit) {
        $(elementoPai).append($(elementoClone).clone().attr({ id: "nuvens" + cont }));
        $("img", "#nuvens" + cont).attr({ src: "http://www.zoidepomba.com.br/wp-content/themes/zoidepomba/images/nuvem"+parseInt(Math.random()*3 + 1)+".png" });
        cont++;
    }

    criaElementosComMovimento("#ceu", ".nuvens");
}

function ajustaTamanhoCeu(elementoCeu){
	
	var alturaCeu = window.innerHeight-80;
	
	$(elementoCeu).height(alturaCeu);
	
}

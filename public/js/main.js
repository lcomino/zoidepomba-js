"use strict";function criaElementosComMovimento(a,b){var c=1e3/30;$(b,a).each(function(){var a=$(this),b=2*Math.random()-1,d=parseInt($(window).width()),e=parseInt($("body").height()),f=parseInt(Math.random()*d),g=parseInt(Math.random()*e),h=parseInt(100*Math.random()+50),i=100*h/150,j=f;a.css({left:j+"px",top:g+"px",width:h+"px",height:i+"px",display:"block"}),setInterval(function(){a.css({left:j+"px"}),j+=b,j>$(window).width()&&(j=-a.width()+b),j<-a.width()&&(j=$(window).width()+b)},c)})}function duplicaElemento(a,b){for(var c=1,d=parseInt(10*Math.random()+10);d>c;)$(a).append($(b).clone().attr({id:"nuvens"+c})),$("img","#nuvens"+c).attr({src:"http://www.zoidepomba.com.br/wp-content/themes/zoidepomba/images/nuvem"+parseInt(3*Math.random()+1)+".png"}),c++;criaElementosComMovimento("#ceu",".nuvens")}function ajustaTamanhoCeu(a){var b=window.innerHeight-80;$(a).height(b)}$(window).load(function(){ajustaTamanhoCeu("#ceu"),duplicaElemento("#ceu","#nuvens0")}),Object.extend=function(a){a=a||{};for(var b=1;b<arguments.length;b++)if(arguments[b])for(var c in arguments[b])arguments[b].hasOwnProperty(c)&&(a[c]=arguments[b][c]);return a},Object.bind=function(a,b){a=a||{};for(var c in b)a.hasOwnProperty(c)&&(a[c]=b[c]);return a};var prop=document.querySelectorAll(".anuncio-topo"),prop=prop[0],anunciantes={Motorando:{link:"http://www.motorando.com.br",title:"Motorando Classificados Grátis de Veículos"}};console.log(anunciantes);
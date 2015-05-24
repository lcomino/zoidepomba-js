$(document).ready(function(){
	
	var nuvem = $(".nuvens");


var n = $(".nuvem1").css("left");
n = n.replace("px", "");
var n2 = $(".nuvem2").css("left");
n2 = n2.replace("px", "");
var n3 = $(".nuvem3").css("left");
n3 = n3.replace("px", "");
var n4 = $(".nuvem4").css("left");
n4 = n4.replace("px", "");
var n5 = $(".nuvem5").css("left");
n5 = n5.replace("px", "");

nuvem1 = setInterval(function(data){
	$(".nuvem1").css({'left' : n});
	n++;
	
	if(n > $(window).width()){
		n = -200;
	}

},25);

nuvem2 = setInterval(function(data){
	$(".nuvem2").css({'left' : n2});
	n2++;
	
	if(n2 > $(window).width()){
		n2 = -250;
	}

},15);

nuvem3 = setInterval(function(data){
	$(".nuvem3").css({'left' : n3});
	n3++;
	
	if(n3 > $(window).width()){
		n3 = -250;
	}

},11);

nuvem4 = setInterval(function(data){
	$(".nuvem4").css({'left' : n4});
	n4++;
	
	if(n4 > $(window).width()){
		n4 = -250;
	}

},50);

nuvem5 = setInterval(function(data){
	$(".nuvem5").css({'left' : n5});
	n5++;
	
	if(n5 > $(window).width()){
		n5 = -250;
	}

},20);

})

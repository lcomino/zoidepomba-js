var buscar = (function(){
  var buscar = {};
  var btnBuscar;
  var btnInput;
  buscar.init = function(){
    btnBuscar = document.getElementById('btn-buscar');
    btnInput = document.getElementById('input-buscar');
    btnBuscar.addEventListener('click', function(e){
      e.preventDefault();
      buscar.go();
    });
  };

  buscar.go = function(){
    var value = btnInput.value;
    if(value === ""){
      alert("Digite algo para buscar né..");
      return false;
    }


    var words = value.replace(' ', '+');
    window.location ='/buscar/'+words;
  };
  return buscar;
}());


window.onload = function(){
  buscar.init();
};

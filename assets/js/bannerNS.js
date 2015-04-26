var NSBanners = function() {

this.banner = 1;

this.link = function(lnk, liClass, aClass){
	return "<a href=\"http://www.naosalvo.com.br/\" target=\"_blank\" class=\"ns-banners b"+this.banner+"\"></a>";
};


this.domain = function(){
	var loc = location.href;
	loc = loc.replace("http://","");
	loc = loc.replace("https://","");
	var parts = loc.split("/");
	var domain = parts[0];
	return domain;
};


this.html = function(){
	var html = this.style;
	html += this.link();
	return html;
};


this.style = "<style type=\"text/css\">";
this.style += "a.ns-banners { margin: 0; padding: 0; border: 0; width: 120px; height: 50px; clear: none; display: block; overflow: hidden; background: transparent url(http://naosalvo.com.br/wp-content/themes/naosalvo/images/naosalvo-icons.jpg) no-repeat 0 0;  }";
this.style += "a.ns-banners.b1 { background-position: 0 0; }";
this.style += "a.ns-banners.b2 { background-position: 0 -50px; }";
this.style += "a.ns-banners.b3 { background-position: -120px 0; }";
this.style += "a.ns-banners.b4 { background-position: -120px -50px; }";
this.style += "</style>";

this.init = function(aBanner){
	if (aBanner != undefined && aBanner != null){ this.banner = aBanner; }
	document.write(this.html());
};
//this.init();
		


};

var bannersNS = new NSBanners();
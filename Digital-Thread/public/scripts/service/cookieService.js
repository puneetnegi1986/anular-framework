/*global define */
define(['angular', 'services-module'], function (angular, services) {
	'use strict';
	services.factory('cookieService',function(){
		return{
			setCookie:function(cname, cvalue, exdays){
			var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = this.getCookie("current_user")+ "-" +cname + "=" + cvalue + "; " + expires;
	},
	getCookie:function(cname){
		if(cname!="current_user"){
			cname=this.getCookie("current_user")+"-"+cname;
		}
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	},
	checkCookie:function(cname){
		return this.getCookie(cname)!="";
	}
	};
	});
	return services;
});

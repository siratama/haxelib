package com.dango_itimi.cgi.geolocation;
import com.dango_itimi.geolocation.Geolocation;
class GeolocationForCGI {

	//example.html?pos=N35.40.8.35E139.41.25.15&x-acr=3&
	public static function parseParameterPositionForSoftbank(position:String):Geolocation{

		var latitudeText = "";
		var longitudeText = "";

		var r = ~/([N|S])(.+)([W|E])(.+)/;
		r.match(position);

		latitudeText = r.matched(2);
		if(r.matched(1) == "S") latitudeText = "-" + latitudeText;
		else  latitudeText = "+" + latitudeText;

		longitudeText = r.matched(4);
		if(r.matched(3) == "W") longitudeText = "-" + longitudeText;
		else longitudeText = "+" + longitudeText;

		return Geolocation.create(latitudeText, longitudeText);
	}
}

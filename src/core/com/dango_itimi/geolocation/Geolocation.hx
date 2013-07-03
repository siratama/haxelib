package com.dango_itimi.geolocation;
class Geolocation {

	public static inline var LATITUDE_OF_ONE_METER:Float = 0.000008983148616;

	// latitude; 緯度(-180～180)
	// longitude; 軽度(-90～90)
	public var latitude(default, null):Float;
	public var longitude(default, null):Float;

	public static function create(latitudeText:String, longitudeText:String):Geolocation{

		return new Geolocation(convert(latitudeText), convert(longitudeText));
	}
	private static function convert(text:String){

		var data:Float;

		var arr = text.split(".");
		var degree:Float = Std.parseFloat(arr[0]);
		var minute:Float = Std.parseFloat(arr[1]);
		var second:Float = Std.parseFloat(arr[2] + "." + arr[3]);

		if(degree >= 0){
			data = ((second / 60) + minute) / 60 + degree;
		}else{
			data = ((second / 60) + minute) / 60 + (degree * -1);
			data = -1 * data;
		}
		return data;
	}

	public function new(latitude:Float, longitude:Float){
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public static function getLongitudeOfOneMeter(latitude:Float):Float{

		var cf = Math.cos(latitude / 180 * Math.PI) * 2 * Math.PI * 6378150;
		var second = cf / (360 * 60 * 60);
		var longitudeOfOneMeter = (1 / 60 / 60) / second;
		return longitudeOfOneMeter;
	}
}


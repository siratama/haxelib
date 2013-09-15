package com.milkmangames.nativeextensions;
import flash.geom.Rectangle;
extern class AdMobAdType {
	public static inline var BANNER:String = "BANNER";
	public static inline var IAB_MRECT:String = "IAB_MRECT";
	public static inline var IAB_BANNER:String = "IAB_BANNER";
	public static inline var IAB_LEADERBOARD:String = "IAB_LEADERBOARD";
	public static function getPixelSize(adType:String):Rectangle;
}

package com.dango_itimi.utils;

class ClassUtil {

	public static function getPackageNamesWithInstance(instance:Dynamic):Array<String>{
		
		var cls:Class<Dynamic> = Type.getClass(instance);
		return getPackageNamesWithClass(cls);
	}
	public static function getPackageNamesWithClass(cls:Class<Dynamic>):Array<String>{
		
		var className = Type.getClassName(cls);
		var packageNames = className.split(".");
		packageNames.pop();
		return packageNames;
	}
}

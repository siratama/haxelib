package com.dango_itimi.utils;

using com.dango_itimi.utils.TypeUtil;

class TypeUtil
{
	public static function isAbstract(cls:Class<Dynamic>):Bool
	{
		//return Lambda.has(Type.getClassFields(cls), "_new");
		var array = Type.getClassFields(cls);
		for (string in array)
		{
			if(string == "_new") return true;
		}
		return false;
	}
	//cls contains abstract class
	public static function createInstance<T>(cls:Class<T>, args:Array<Dynamic>):T
	{
		return !cls.isAbstract() ?
			Type.createInstance(cast cls, args):
			Type.createInstance(cast cls, args)._new();
	}
}

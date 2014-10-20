package com.dango_itimi.utils;

using com.dango_itimi.utils.TypeUtil;

class TypeUtil
{
	public static inline function isAbstract(cls:Class<Dynamic>):Bool
	{
		return Lambda.has(Type.getClassFields(cls), "_new");
	}
	//cls contains abstract class
	public static function createInstance<T>(cls:Class<T>, args:Array<Dynamic>):T
	{
		return !cls.isAbstract() ?
			Type.createInstance(cast cls, args):
			Type.createInstance(cast cls, args)._new();
	}
}

package com.dango_itimi.utils;

class RectangleUtil {

	public var height:Float;
	public var width:Float;
	public var x:Float;
	public var y:Float;
	
	public var bottom:Float;
	public var right:Float;

    public function new(x:Float, y:Float, width:Float, height:Float):Void{
		
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		
		right = x + width;
		bottom = y + height;
	}
	public static function convert(rect:Dynamic):RectangleUtil{
		return new RectangleUtil(rect.x, rect.y, rect.width, rect.height);
	}
	public function clone():RectangleUtil{
		return new RectangleUtil(x, y, width, height);
	}
	public function toString():String{
		return "w:" + width + ", h:" + height + ", x:" + x + ", y:" + y;
	}
	
	public function addX(addedX:Float){
		
		this.x += addedX;
		right += addedX;
	}
	public function addY(addedY:Float){
		
		this.y += addedY;
		bottom += addedY;
	}
	public function hitTestPoint(nx:Float, ny:Float):Bool{
		
		return (x <= nx && y <= ny && right >= nx && bottom >= ny);
	}
	public function hitTestObject(checkedRectangle:RectangleUtil):Bool{

		if(x > checkedRectangle.right) return false;
		if(right < checkedRectangle.x) return false;
		if(y > checkedRectangle.bottom) return false;
		if(bottom < checkedRectangle.y) return false;

		return true;
	}

}

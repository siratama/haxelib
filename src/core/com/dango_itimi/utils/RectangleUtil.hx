package com.dango_itimi.utils;

class RectangleUtil {

	public var height:Float;
	public var width:Float;
	public var x:Float;
	public var y:Float;
	
	public var bottom:Float;
	public var right:Float;

    public function new(x:Float, y:Float, width:Float, height:Float):Void{
		
		this.width = width;
		this.height = height;
		setPosition(x, y);
	}
	public static function convert(rect:{var x:Float; var y:Float; var width:Float; var height:Float;}):RectangleUtil{
		return new RectangleUtil(rect.x, rect.y, rect.width, rect.height);
	}
	public function clone():RectangleUtil{
		return new RectangleUtil(x, y, width, height);
	}
	public function toString():String{
		return "w:" + width + ", h:" + height + ", x:" + x + ", y:" + y;
	}

	public function setPosition(x:Float, y:Float){
		setX(x);
		setY(y);
	}
	public function setX(x:Float){
		this.x = x;
		right = x + width;
	}
	public function setY(y:Float){
		this.y = y;
		bottom = y + height;
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

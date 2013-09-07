package com.dango_itimi.box2d.view;

import com.dango_itimi.utils.RectangleUtil;
import box2D.common.math.B2Vec2;
import box2D.dynamics.B2FilterData;
import box2D.dynamics.B2World;
import box2D.dynamics.B2Body;
import box2D.dynamics.B2FixtureDef;
import box2D.dynamics.B2BodyDef;
import box2D.collision.shapes.B2Shape;
import com.dango_itimi.box2d.userdata.UserData;

class View {

	private static inline var POINT_MC_HEAD_NAME:String = "p";

	private var baseShape:BaseShape;

	private var bodyType:Bool;
	private var restitution:Float;
	private var friction:Float;
	private var shape:B2Shape;
	private var bodyDefPosX:Float;
	private var bodyDefPosY:Float;

	public var body(default, null):B2Body;
	public var key(default, null):String;
	public var fixtureDef(default, null):B2FixtureDef;

	private var bodyDef:B2BodyDef;
	private var fixedRotation:Bool;
	private var userData:UserData;
	private var angle:Float;
	private var density:Float;
	private var groupIndex:Int;
	private var firstVisible:Bool;
	private var bullet:Bool;
	private var chunkSetId:Int;
	private var mcHeadName:String;
	private var id:Int;
	private var categoryBits:Int;
	private var maskBits:Int;

	public function initialize(
		chunkSetId:Int,
		mcHeadName:String,
		id:Int,
		bodyType:Bool,
		bullet:Bool,
		restitution:Float,
		friction:Float,
		density:Float,
		fixedRotation:Bool,
		userData:UserData,
		groupIndex:Int,
		categoryBits:Int,
		maskBits:Int,
		firstVisible:Bool,
		?clonedId:Int = -1
	) {
		this.maskBits = maskBits;
		this.categoryBits = categoryBits;
		this.id = id;
		this.mcHeadName = mcHeadName;
		this.chunkSetId = chunkSetId;
		this.bullet = bullet;
		this.firstVisible = firstVisible;
		this.groupIndex = groupIndex;
		this.fixedRotation = fixedRotation;
		this.friction = friction;
		this.restitution = restitution;
		this.density = density;
		this.bodyType = bodyType;
		this.userData = userData;

		key = Type.getClassName(Type.getClass(this)) + chunkSetId + "_" + mcHeadName + "_" + id;

		if(clonedId != -1)
			key = key + "_" + clonedId;

		if(userData.key != null)
			trace("Error! Dont set up userData.key");

		userData.key = key;

		initializeChild();
	}
	private function initializeChild() {
	}

	public function toString():String{
		return key;
	}

	public function clone(clonedId:Int):View {

		var viewClass = Type.getClass(this);
		var view:View = Type.createInstance(viewClass, []);
		var clonedUserData:UserData = userData.clone();
		cloneChild(view);
		view.initialize(chunkSetId, mcHeadName, id, bodyType, bullet, restitution, friction, density, fixedRotation, clonedUserData, groupIndex, categoryBits, maskBits, firstVisible, clonedId);
		return view;
	}
	private function cloneChild(view:View){
	}

	/**
	 *
	 */
	public function createBox2D(b2World:B2World, scale:Float) {

		setBodyDefPosition(scale);
		createBodyDef();
		createShape(scale);
		createFixtureDef();

		if(firstVisible)
			createB2Body(b2World);
	}
	private function setBodyDefPosition(scale:Float) {

		bodyDefPosX = baseShape.centerX / scale;
		bodyDefPosY = baseShape.centerY / scale;
	}
	private function createBodyDef() {

		bodyDef = new B2BodyDef();
		bodyDef.position.set(bodyDefPosX, bodyDefPosY);

		if(bodyType){
			bodyDef.type = B2Body.b2_dynamicBody;
			if(bullet){
				bodyDef.bullet = true;
			}
		}

		bodyDef.angle = angle;
		bodyDef.fixedRotation = fixedRotation;

		bodyDef.userData = userData;
	}
	private function createShape(scale:Float) {
	}
	private function createFixtureDef(){

		fixtureDef = new B2FixtureDef();
		fixtureDef.shape = shape;
		fixtureDef.density = density;
		fixtureDef.restitution = restitution;
		fixtureDef.friction = friction;

		var filter:B2FilterData = new B2FilterData();
		filter.groupIndex = groupIndex;
		filter.categoryBits = categoryBits;
		filter.maskBits = maskBits;
		fixtureDef.filter = filter;
	}
	public function createB2Body(b2World:B2World) {

		body = b2World.createBody(bodyDef);
		body.createFixture(fixtureDef);
	}
	public function destroyB2Body(b2World:B2World) {

		b2World.destroyBody(body);
		body = null;
	}


	/**
	 *
	 */
	public function applyImpulseToBodyCenter(impulseX:Float, impulseY:Float) {
		body.applyImpulse(new B2Vec2(impulseX, impulseY), body.getLocalCenter());
	}
	public function setPosition(x:Float, y:Float) {
		body.setPosition(new B2Vec2(x, y));
	}
	public function setLinearVelocity(x:Float = 0, y:Float = 0) {
		body.setLinearVelocity(new B2Vec2(x, y));
	}
	public function applyImpulseForAntiGravity(gravityY:Float) {
		body.applyForce(new B2Vec2(0, body.getMass() * -gravityY), body.getLocalCenter());
	}
	public function getFreeFallSpeed():B2Vec2{
		return body.getLinearVelocity();
	}

	/**
	 *
	 */
	public function getAngle():Float {
		return angle;
	}
	public function setAngle(angle:Float) {
		this.angle = angle;
	}
	public function getBaseShapeWidth():Float{
		return 0;
	}
	public function getBaseShapeHeight():Float{
		return 0;
	}

	public function createShapeRectangle(box2dScale:Float):ShapeRectangle{

		var position = body.getPosition();
		var centerPositionX = position.x * box2dScale;
		var centerPositionY = position.y * box2dScale;

		var halfWidth = getBaseShapeWidth() / 2;
		var halfHeight = getBaseShapeHeight() / 2;

		return new ShapeRectangle(
			centerPositionX, centerPositionY,
			centerPositionX - halfWidth,
			centerPositionX + halfWidth,
			centerPositionY - halfHeight,
			centerPositionY + halfHeight
		);
	}
}

class ShapeRectangle{

	public var x(default, null):Float;
	public var y(default, null):Float;
	public var left(default, null):Float;
	public var right(default, null):Float;
	public var top(default, null):Float;
	public var bottom(default, null):Float;

	public function new(x:Float, y:Float, left:Float, right:Float, top:Float, bottom:Float){
		this.x = x;
		this.y = y;
		this.left = left;
		this.right = right;
		this.top = top;
		this.bottom = bottom;
	}
}

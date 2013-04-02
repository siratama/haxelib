package com.dango_itimi.box2d.view;

import box2D.common.math.B2Vec2;
import box2D.dynamics.B2FilterData;
import box2D.dynamics.B2World;
import box2D.dynamics.B2Body;
import box2D.dynamics.B2FixtureDef;
import box2D.dynamics.B2BodyDef;
import box2D.collision.shapes.B2Shape;
import com.dango_itimi.box2d.userdata.UserData;

class View {

	private var baseShape:BaseShape;

	private var bodyType:Bool;
	private var restitution:Float;
	private var friction:Float;
	private var shape:B2Shape;
	private var bodyDefPosX:Float;
	private var bodyDefPosY:Float;

	private var bodyDef:B2BodyDef;
	private var fixtureDef:B2FixtureDef;
	private var body:B2Body;
	private var fixedRotation:Bool;
	private var userData:UserData;
	private var key:String;
	private var angle:Float;
	private var density:Float;
	private var groupIndex:Int;
	private var firstVisible:Bool;
	private var bullet:Bool;
	private var materialId:Int;
	private var mcHeadName:String;
	private var id:Int;
	private var categoryBits:Int;
	private var maskBits:Int;

	public function initialize(
		materialId:Int,
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
		this.materialId = materialId;
		this.bullet = bullet;
		this.firstVisible = firstVisible;
		this.groupIndex = groupIndex;
		this.fixedRotation = fixedRotation;
		this.friction = friction;
		this.restitution = restitution;
		this.density = density;
		this.bodyType = bodyType;
		this.userData = userData;

		key = Type.getClassName(Type.getClass(this)) + materialId + "_" + mcHeadName + "_" + id;

		if(clonedId != -1)
			key = key + "_" + clonedId;

		if(userData.key != null)
			trace("Error! Dont set up userData.key");

		userData.key = key;

		initializeChild();
	}
	private function initializeChild() {
	}

	public function toString() {

		trace('key: ' + (key));
		trace('bodyType: ' + (bodyType));
		trace('restitution: ' + (restitution));
		trace('friction: ' + (friction));
		trace('fixedRotation: ' + (fixedRotation));
		trace('userData: ' + (userData));
	}

	public function clone(clonedId:Int):View {

		var viewClass = Type.getClass(this);
		var view:View = Type.createInstance(viewClass, []);
		var clonedUserData:UserData = userData.clone();
		cloneChild(view);
		view.initialize(materialId, mcHeadName, id, bodyType, bullet, restitution, friction, density, fixedRotation, clonedUserData, groupIndex, categoryBits, maskBits, firstVisible, clonedId);
		return view;
	}
	private function cloneChild(view:View){
	}

	/**
	 *
	 */
	public function createBox2D(world:B2World, scale:Float) {

		setBodyDefPosition(scale);
		createBodyDef();
		createShape(scale);
		createFixtureDef();

		if(firstVisible)
			createB2Body(world);
	}
	private function setBodyDefPosition(scale:Float) {

		bodyDefPosX = baseShape.getCenterX() / scale;
		bodyDefPosY = baseShape.getCenterY() / scale;
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
	public function createB2Body(world:B2World) {

		body = world.createBody(bodyDef);
		body.createFixture(fixtureDef);
	}
	public function destroyB2Body(world:B2World) {

		world.destroyBody(body);
		body = null;
	}


	/**
	 *
	 */
	public function applyImpulse(vec:B2Vec2, pos:B2Vec2 = null) {

		if(pos == null)
			pos = body.getPosition();

		body.applyImpulse(vec, pos);
	}
	public function setLinearVelocity(vec:B2Vec2) {

		if(!body.isAwake())
			body.setAwake(true);

		body.setLinearVelocity(vec);
	}
	public function applyImpulseForAntiGravity(gravityY:Float) {

		body.applyForce(new B2Vec2(0, body.getMass() * -gravityY), body.getPosition());
	}

	/**
	 *
	 */
	public function getBody():B2Body {
		return body;
	}

	public function getKey():String {
		return key;
	}

	public function getAngle():Float {
		return angle;
	}

	public function setAngle(angle:Float) {
		this.angle = angle;
	}

	public function getFixtureDef():B2FixtureDef {
		return fixtureDef;
	}
}

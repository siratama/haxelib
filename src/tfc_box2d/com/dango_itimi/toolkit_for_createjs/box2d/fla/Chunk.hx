package com.dango_itimi.toolkit_for_createjs.box2d.fla;
import com.dango_itimi.toolkit_for_createjs.box2d.userdata.UserData;
import createjs.easeljs.MovieClip;
class Chunk {

	public static inline var CHUNK_MC_HEAD_NAME_FOR_OPTIONAL:String = "c";
	public static inline var CHUNK_MC_HEAD_NAME_FOR_AUTO:String = "instance";

	public var restitution:Float;
	public var friction:Float;
	public var density:Float;
	public var bodyType:Bool;
	public var fixedRotation:Bool;
	public var groupIndex:Int;
	public var firstVisible:Bool;
	public var bullet:Bool;
	private var chunkSprite:MovieClip;
	private var userDataSet:Array<UserData>;

	public function new(
		chunkSprite:MovieClip,
		?bodyType:Bool = false,
		?bullet:Bool = false,
		?restitution:Float = 0,
		?friction:Float = 1.0,
		?density:Float = 1.0,
		?fixedRotation:Bool = false,
		?groupIndex:Int = 0,
		?firstVisible:Bool = true
	) {
		this.bullet = bullet;
		this.chunkSprite = chunkSprite;
		this.firstVisible = firstVisible;
		this.groupIndex = groupIndex;
		this.fixedRotation = fixedRotation;
		this.density = density;
		this.friction = friction;
		this.restitution = restitution;
		this.bodyType = bodyType;

		userDataSet = new Array<UserData>();
	}
	public function setUserData(optionalChunkId:Int, userData:UserData) {

		userDataSet[optionalChunkId] = userData;
	}
	public function getUserData(optionalChunkId:Int):UserData {

		return userDataSet[optionalChunkId];
	}
	public function getUserDataSetLength():Int {

		return userDataSet.length;
	}
	public function getChunkSprite():MovieClip {

		return chunkSprite;
	}
}

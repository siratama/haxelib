package com.dango_itimi.box2d.fla;
import com.dango_itimi.box2d.userdata.UserData;
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
	private var userDataSet:Array<UserData>;

	public function new() {

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
}

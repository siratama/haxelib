package com.dango_itimi.box2d.fla;
class ChunkMap {

	public var boxSet(default, null):Array<Chunk>;
	public var circleSet(default, null):Array<Chunk>;
	public var polygonSet(default, null):Array<Chunk>;

	private var chunkClass:Class<Chunk>;

	public function new(){

		boxSet = new Array<Chunk>();
		circleSet = new Array<Chunk>();
		polygonSet = new Array<Chunk>();

		initializeForBox();
		initializeForCircle();
		initializeForPolygon();
	}
	private function initializeForBox() {
	}
	private function initializeForCircle() {
	}
	private function initializeForPolygon() {
	}

	private function createBox(
		chunkSetId:Int,
		chunkSpriteClass:Dynamic,
		?bodyType:Bool = false,
		?bullet:Bool = false,
		?restitution:Float = 0,
		?friction:Float = 1.0,
		?density:Float = 1.0,
		?fixedRotation:Bool = false,
		?groupIndex:Int = 0,
		?categoryBits:Int = 0x0001,
		?maskBits:Int = 0xffff,
		?firstVisible:Bool = true
	):Chunk {
		return createChunkFromClass(boxSet, chunkSetId, chunkSpriteClass, bodyType, bullet, restitution, friction, density, fixedRotation, groupIndex, categoryBits, maskBits, firstVisible);
	}
	private function createCircle(
		chunkSetId:Int,
		chunkSpriteClass:Dynamic,
		?bodyType:Bool = false,
		?bullet:Bool = false,
		?restitution:Float = 0,
		?friction:Float = 1.0,
		?density:Float = 1.0,
		?fixedRotation:Bool = false,
		?groupIndex:Int = 0,
		?categoryBits:Int = 0x0001,
		?maskBits:Int = 0xffff,
		?firstVisible:Bool = true
	):Chunk {
		return createChunkFromClass(circleSet, chunkSetId, chunkSpriteClass, bodyType, bullet, restitution, friction, density, fixedRotation, groupIndex, categoryBits, maskBits, firstVisible);
	}
	private function createPolygon(
		chunkSetId:Int,
		chunkSpriteClass:Dynamic,
		?bodyType:Bool = false,
		?bullet:Bool = false,
		?restitution:Float = 0,
		?friction:Float = 1.0,
		?density:Float = 1.0,
		?fixedRotation:Bool = false,
		?groupIndex:Int = 0,
		?categoryBits:Int = 0x0001,
		?maskBits:Int = 0xffff,
		?firstVisible:Bool = true
	):Chunk {
		return createChunkFromClass(polygonSet, chunkSetId, chunkSpriteClass, bodyType, bullet, restitution, friction, density, fixedRotation, groupIndex, categoryBits, maskBits, firstVisible);
	}
	private function createChunkFromClass(
		chunkSet:Array<Chunk>,
		chunkSetId:Int,
		chunkSpriteClass:Dynamic,
		?bodyType:Bool = false,
		?bullet:Bool = false,
		?restitution:Float = 0,
		?friction:Float = 1.0,
		?density:Float = 1.0,
		?fixedRotation:Bool = false,
		?groupIndex:Int = 0,
		?categoryBits:Int = 0x0001,
		?maskBits:Int = 0xffff,
		?firstVisible:Bool = true
	):Chunk {

		var chunkSprite = Type.createInstance(chunkSpriteClass, []);
		return createChunk(chunkSet, chunkSetId, chunkSprite, bodyType, bullet, restitution, friction, density, fixedRotation, groupIndex, categoryBits, maskBits, firstVisible);
	}
	private function createChunk(
		chunkSet:Array<Chunk>,
		chunkSetId:Int,
		chunkSprite:Dynamic,
		?bodyType:Bool = false,
		?bullet:Bool = false,
		?restitution:Float = 0,
		?friction:Float = 1.0,
		?density:Float = 1.0,
		?fixedRotation:Bool = false,
		?groupIndex:Int = 0,
		?categoryBits:Int = 0x0001,
		?maskBits:Int = 0xffff,
		?firstVisible:Bool = true
	):Chunk {

		var chunk:Chunk = new Chunk(chunkSprite, bodyType, bullet, restitution, friction, density, fixedRotation, groupIndex, categoryBits, maskBits, firstVisible);
		chunkSet[chunkSetId] = chunk;
		return chunk;
	}
}

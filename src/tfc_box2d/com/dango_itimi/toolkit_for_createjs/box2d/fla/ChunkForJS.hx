package com.dango_itimi.toolkit_for_createjs.box2d.fla;

import com.dango_itimi.box2d.fla.Chunk;
import com.dango_itimi.box2d.userdata.UserData;
import createjs.easeljs.MovieClip;
class ChunkForJS extends Chunk{

	private var chunkSprite:MovieClip;

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

		super();
	}
	public function getChunkSprite():MovieClip {
		return chunkSprite;
	}
}

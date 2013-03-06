package;

import com.dango_itimi.toolkit_for_createjs.box2d.view.View;
import box2D.dynamics.B2DebugDraw;
import box2D.common.math.B2Vec2;
import box2D.dynamics.B2World;
import createjs.easeljs.MovieClip;
import createjs.easeljs.Stage;
import createjs.easeljs.Ticker;
import createjs.easeljs.Container;
import com.dango_itimi.toolkit_for_createjs.Instance;
import com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverter;
import js.Lib;
import tfc_box2d.MyChunkMap;

class Main {

	private static inline var GRAVITY_Y:Float = 20;
	private static inline var BOX2D_SCALE:Float = 10;
	private static inline var FRAME_RATE:Int = 24;

	private var mainFunction:Void->Void;
	private var stage:Stage;
	private var b2World:B2World;
	private var flashToBox2dConverter:FlashToBox2dConverter;

	public static function main() {
		new Main();
	}
	public function new(){

		Lib.window.onload = initialize;
	}
	private function initialize(event){

		stage = new Stage(js.Lib.document.getElementById("canvas"));

		Ticker.useRAF = true;
		Ticker.setFPS(FRAME_RATE);
		Ticker.addEventListener("tick", run);

		initializeToPlay();
	}
	private function run(){

		mainFunction();
	}

	/**
	*
	**/
	private function initializeToPlay(){

		initializeBox2D();
		initializeTest();
		initializeBox2DDebug();

		mainFunction = play;
	}
	private function initializeBox2D(){

		b2World = new B2World(new B2Vec2(0, GRAVITY_Y), true);

		var chunkMapContainer:MovieClip = Instance.createWithSamePackageClass("ChunkMapContainer", MyChunkMap);
		var myChunkMap = new MyChunkMap();
		myChunkMap.initialize(chunkMapContainer);

		flashToBox2dConverter = new FlashToBox2dConverter(myChunkMap);
		flashToBox2dConverter.execute(b2World, BOX2D_SCALE);
	}
	private function initializeTest() {

		//character = flashToBox2dConverter.getBox(MyChunkMap.ID_CHARACTER, 0);
		//flipper = flashToBox2dConverter.getPolygon(MyChunkMap.ID_FLIPPER, 0);
	}
	private function initializeBox2DDebug() {

		var debugDraw:B2DebugDraw = new B2DebugDraw();
		debugDraw.setCanvas(js.Lib.document.getElementById("canvas"));
		debugDraw.setDrawScale(BOX2D_SCALE);
		debugDraw.setLineThickness(2);
		debugDraw.setAlpha(1);
		debugDraw.setFillAlpha(0);
		debugDraw.setFlags(B2DebugDraw.e_shapeBit);
		//debugDraw.setFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);
		b2World.setDebugDraw(debugDraw);
	}
	private function play(){

		//trace(flipper.getBody().getPosition());

		stage.update();
		b2World.step(1 / FRAME_RATE, 10, 2);
		b2World.clearForces();
		b2World.drawDebugData();
	}
}

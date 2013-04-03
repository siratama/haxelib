package;

import com.dango_itimi.box2d.view.View;
import com.dango_itimi.box2d.FlashToBox2dConverter;
import box2D.dynamics.B2DebugDraw;
import box2D.common.math.B2Vec2;
import box2D.dynamics.B2World;
import box2d.MyChunkMap;

class Main {

	private static inline var GRAVITY_Y:Float = 20;
	private static inline var BOX2D_SCALE:Float = 10;
	private static inline var FRAME_RATE:Int = 24;

	private var mainFunction:Void->Void;
	private var b2World:B2World;

	private var flashToBox2dConverterClass:Class<FlashToBox2dConverter>;
	private var flashToBox2dConverter:FlashToBox2dConverter;

	public function new(){
	}
	private function run(event){

		mainFunction();
	}
	private function initialize(event){

		initializeBox2D();
		initializeBox2DDebug();

		mainFunction = play;
	}
	private function initializeBox2D(){

		b2World = new B2World(new B2Vec2(0, GRAVITY_Y), true);

		var myChunkMap = new MyChunkMap();
		flashToBox2dConverter = Type.createInstance(flashToBox2dConverterClass, [myChunkMap]);
		flashToBox2dConverter.execute(b2World, BOX2D_SCALE);

		//test
		var character:View = flashToBox2dConverter.getBox(MyChunkMap.ID_CHARACTER, 0);
		var flipper:View = flashToBox2dConverter.getPolygon(MyChunkMap.ID_FLIPPER, 0);
	}
	private function initializeBox2DDebug() {

		var debugDraw:B2DebugDraw = new B2DebugDraw();
		debugDraw.setDrawScale(BOX2D_SCALE);
		debugDraw.setLineThickness(2);
		debugDraw.setAlpha(1);
		debugDraw.setFillAlpha(0);
		debugDraw.setFlags(B2DebugDraw.e_shapeBit);
		initializeBox2DDebugChild(debugDraw);

		b2World.setDebugDraw(debugDraw);
	}
	private function initializeBox2DDebugChild(debugDraw:B2DebugDraw) {
	}
	private function play(){

		b2World.step(1 / FRAME_RATE, 10, 2);
		b2World.clearForces();
		b2World.drawDebugData();
	}
}

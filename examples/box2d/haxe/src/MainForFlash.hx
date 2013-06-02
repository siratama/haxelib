package;

import com.dango_itimi.as3.box2d.FlashToBox2dConverterForFlash;
import box2D.dynamics.B2DebugDraw;
import flash.events.Event;
import flash.display.Sprite;

class MainForFlash extends Main{

	private var stage:Sprite;

	public static function main() {

		new MainForFlash();
	}
	public function new() {

		flashToBox2dConverterClass = FlashToBox2dConverterForFlash;

		super();
		initialize({});
	}
	override private function initialize(event){

		stage = flash.Lib.current;
		stage.addEventListener(Event.ENTER_FRAME, run);

		super.initialize(event);
	}
	override private function initializeBox2DDebugChild(debugDraw:B2DebugDraw) {

		debugDraw.setSprite(stage);
	}
}

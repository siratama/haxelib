package ;

import com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS;
import box2D.dynamics.B2DebugDraw;
import createjs.easeljs.Stage;
import createjs.easeljs.Ticker;

class MainForJS extends Main{

	private var stage:Stage;

	public static function main() {
		new MainForJS();
	}
	public function new() {

		flashToBox2dConverterClass = FlashToBox2dConverterForJS;

		js.Lib.window.onload = initialize;
		super();
	}
	override private function initialize(event){

		stage = new Stage(js.Lib.document.getElementById("canvas"));

		Ticker.useRAF = true;
		Ticker.setFPS(Main.FRAME_RATE);
		Ticker.addEventListener("tick", run);

		super.initialize(event);
	}
	override private function initializeBox2DDebugChild(debugDraw:B2DebugDraw) {

		debugDraw.setCanvas(js.Lib.document.getElementById("canvas"));
	}
	override private function play(){

		stage.update();
		super.play();
	}
}

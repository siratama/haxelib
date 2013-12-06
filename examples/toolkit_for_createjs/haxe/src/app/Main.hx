package;

import createjs.easeljs.Stage;
import createjs.easeljs.Ticker;
import createjs.easeljs.Container;
import js.Browser;
import com.dango_itimi.toolkit_for_createjs.Instance;
import com.dango_itimi.toolkit_for_createjs.TFCLoader;
import com.dango_itimi.toolkit_for_createjs.SoundPlayer;
import shooting.player.Player;
import shooting.se.SoundMixer;

class Main {
	
	private var mainFunction:Void->Void;
	private var stage:Stage;
	private var tfcLoader:TFCLoader;
	private var player:Player;

	public static function main() {
		new Main();
	}
	public function new(){
		
		Browser.window.onload = initialize;
	}
	private function initialize(event){

		stage = new Stage(Browser.document.getElementById("canvas"));

		tfcLoader = new TFCLoader("tfc", "tfc_sounds", true);
		tfcLoader.addMaterialDirectory("lib", "view");

		Ticker.setFPS(tfcLoader.getFps());
		Ticker.addEventListener("tick", run);

		mainFunction = loadTFC;
	}
	private function run(){

		mainFunction();
	}
	private function loadTFC(){

		tfcLoader.run();
		if(tfcLoader.isFinished())
			mainFunction = initializeToGameScene;
	}
	private function test(){
	}


	private function initializeToGameScene(){

		SoundPlayer.initialize();

		player = new Player();
		player.addChildToLayer(stage);

		SoundMixer.initialize();
		SoundMixer.playForBgm();

		mainFunction = runForGameScene;
	}
	private function runForGameScene(){

		player.run();
		SoundPlayer.soundEffectMap.run();
		stage.update();
	}
}


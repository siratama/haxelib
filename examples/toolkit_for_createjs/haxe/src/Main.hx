package;

import shooting.se.SoundMixer;
import shooting.player.Player;
import createjs.easeljs.Stage;
import createjs.easeljs.Ticker;
import createjs.easeljs.Container;
import js.Lib;
import com.dango_itimi.toolkit_for_createjs.Instance;
import com.dango_itimi.toolkit_for_createjs.TFCLoader;
import com.dango_itimi.toolkit_for_createjs.SoundPlayer;

class Main {
	
	private var mainFunction:Void->Void;
	private var stage:Stage;
	private var tfcLoader:TFCLoader;
	private var player:Player;

	public static function main() {
		new Main();
	}
	public function new(){
		
		Lib.window.onload = initialize;
	}
	private function initialize(event){

		Ticker.useRAF = true;
		Ticker.setFPS(24);
		Ticker.addEventListener("tick", run);

		stage = new Stage(js.Lib.document.getElementById("canvas"));

		initializeToLoadTFC();
	}
	private function run(){

		mainFunction();
	}
	private function initializeToLoadTFC(){

		tfcLoader = new TFCLoader("tfc", "tfc_sounds", true);
		tfcLoader.addMaterialDirectory("view");
		mainFunction = loadTFC;
	}
	private function loadTFC(){

		tfcLoader.run();
		if(tfcLoader.isFinished())
			mainFunction = initializeToGameScene;
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


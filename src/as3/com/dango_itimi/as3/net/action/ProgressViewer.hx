package com.dango_itimi.as3.net.action;

class ProgressViewer extends LoadAction {

	private var progressMain:Void->Void;
	private var progressPercentage:Int;

	public function new() {

		progressMain = checkViewed;
	}
	override public function watchProgress(progressPercentage:Int) {

		this.progressPercentage = progressPercentage;
		if(progressMain != null) progressMain();
	}
	private function checkViewed(){

		if(progressPercentage == -1) return;

		if(progressPercentage == 100)

			progressMain = finish;

		else{
			viewFirst();
			progressMain = view;
		}
	}
	//for override
	private function viewFirst() {
	}
	private function view(){

		viewProgress();
		if(progressPercentage == 100) progressMain = finish;
	}
	private function viewProgress() {
	}
	private function finish(){
	}
}


function Index(){

	this.init.apply(this, arguments);
}
Index.prototype.init = function(){

    this.mainFunction = null;

    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(24);
    createjs.Ticker.addEventListener("tick", createjs.proxy(this.run, this));

    this.canvas = document.getElementById("canvas");
    this.stage = new createjs.Stage(this.canvas);

    this.initializeToLoadTFC();
};
Index.prototype.run = function(){

    this.mainFunction();
};
Index.prototype.initializeToLoadTFC = function(){

    this.tfcLoader = new com.dango_itimi.toolkit_for_createjs.TFCLoader("tfc", "tfc_sounds", true);
    this.tfcLoader.addMaterialDirectory("view");
    this.mainFunction = this.loadTFC;
};
Index.prototype.loadTFC = function(){

    this.tfcLoader.run();
    if(this.tfcLoader.isFinished())
        this.initializeToPlay();
};
Index.prototype.initializeToPlay = function(){

    com.dango_itimi.toolkit_for_createjs.SoundPlayer.initialize();

    this.playerView = new lib.shootingplayerView();
    this.playerView.setTransform(52,195);
    this.stage.addChild(this.playerView);

    this.mainFunction = this.play;
};
Index.prototype.play = function(){

    this.playerView.x += 1;
    this.stage.update();
};

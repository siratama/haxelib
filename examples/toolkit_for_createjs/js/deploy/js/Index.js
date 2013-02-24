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

    this.player = new Player();
    this.player.addChildToLayer(this.stage);

    SoundMixer.initialize();
    SoundMixer.playForBgm();

    this.mainFunction = this.play;
};
Index.prototype.play = function(){

    this.player.run();
    this.stage.update();
};

/**
 *
 */
function Player(){

    this.init.apply(this, arguments);
}
Player.prototype.init = function(){

    this.view = new lib.shootingplayerView();
    this.view.x = 52;
    this.view.y = 195;

    this.nominalBounds = com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getNominalBounds(this.view);
    //console.log(this.nominalBounds);
};
Player.prototype.addChildToLayer = function(layer){

    layer.addChild(this.view);
};
Player.prototype.run = function(){

    this.view.x += 1;
};

/**
 *
 */
function SoundMixer(){
}
SoundMixer.initialize = function(){

    SoundMixer.SOUND_PACKAGE = ["shooting", "se"].join("");
};
SoundMixer.play = function(soundClassName, volume, delay, offset, loop){

    com.dango_itimi.toolkit_for_createjs.SoundPlayer.getSoundEffectMap().play(
        SoundMixer.SOUND_PACKAGE + soundClassName,
        createjs.Sound.INTERRUPT_EARLY, delay, offset, loop, volume
    );
};
SoundMixer.playForBgm = function(){
    SoundMixer.play("Bgm", 1, 0, 0, -1);
};


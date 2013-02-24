(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.view = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.shootingplayerView();
	this.instance.setTransform(70,212,1,1,0,0,0,18,17);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(52,195,36,34);


// symbols:
(lib._0 = function() {
	this.initialize(img._0);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._1 = function() {
	this.initialize(img._1);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._2 = function() {
	this.initialize(img._2);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);








(lib._3_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._2_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_1 = new lib._2();

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._1_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_2 = new lib._1();

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._0_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_3 = new lib._0();

	this.addChild(this.instance_3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib.shootingplayerView = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// timeline functions:
	this.frame_2 = function() {
		playSound("shootingseShot");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(5));

	// player.psd
	this.instance_4 = new lib._0_1();
	this.instance_4.setTransform(18,17,1,1,0,0,0,18,17);

	this.instance_5 = new lib._1_1();
	this.instance_5.setTransform(18,17,1,1,0,0,0,18,17);

	this.instance_6 = new lib._2_1();
	this.instance_6.setTransform(18,17,1,1,0,0,0,18,17);

	this.instance_7 = new lib._3_1();
	this.instance_7.setTransform(18,17,1,1,0,0,0,18,17);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_7}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
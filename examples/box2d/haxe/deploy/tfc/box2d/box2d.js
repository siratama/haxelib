(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.box2d = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


// symbols:
(lib.pt = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#66CC00").s().p("AAOgNQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGIAAAA").cp();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-1.9,-1.9,4,4);


(lib.circle = function() {
	this.initialize();

	// レイヤー 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF6600").s().p("AAjgiQAPAOAAAUQAAAUgPAPQgPAPgUAAQgTAAgPgPQgPgPAAgUQAAgUAPgOQAPgPATAAQAUAAAPAPIAAAA").cp();

	this.addChild(this.shape_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-4.9,-4.9,10,10);


(lib.box = function() {
	this.initialize();

	// レイヤー 1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#3399FF").s().p("AAKAKIgTAAIAAgTIATAAIAAAT").cp();

	this.addChild(this.shape_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-0.9,-0.9,2,2);


(lib._1 = function() {
	this.initialize();

	// レイヤー 1
	this.p3 = new lib.pt();
	this.p3.setTransform(23,51);

	this.p2 = new lib.pt();
	this.p2.setTransform(81,27);

	this.p1 = new lib.pt();
	this.p1.setTransform(60,0);

	this.p0 = new lib.pt();

	this.addChild(this.p0,this.p1,this.p2,this.p3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-1.9,-1.9,85,55);


(lib._0 = function() {
	this.initialize();

	// レイヤー 1
	this.p3_1 = new lib.pt();
	this.p3_1.setTransform(20,38);

	this.p2_1 = new lib.pt();
	this.p2_1.setTransform(51,27);

	this.p4 = new lib.pt();
	this.p4.setTransform(-3.9,19);

	this.p1_1 = new lib.pt();
	this.p1_1.setTransform(60,0);

	this.p0_1 = new lib.pt();

	this.addChild(this.p0_1,this.p1_1,this.p4,this.p2_1,this.p3_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-5.9,-1.9,68,42);


(lib.box2dpolygonFlipper = function() {
	this.initialize();

	// レイヤー 1
	this.c1 = new lib._1();
	this.c1.setTransform(370,310.1);

	this.c0 = new lib._0();
	this.c0.setTransform(268,357);

	this.addChild(this.c0,this.c1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(262,308.1,191,88.9);


(lib.box2dcircleCircleTest2 = function() {
	this.initialize();

	// レイヤー 2
	this.instance = new lib.circle();
	this.instance.setTransform(75.6,36,1.835,1.835);

	this.instance_1 = new lib.circle();
	this.instance_1.setTransform(392,273,1.835,1.835);

	this.instance_2 = new lib.circle();
	this.instance_2.setTransform(135,324,1.835,1.835);

	// レイヤー 1
	this.c0_1 = new lib.circle();
	this.c0_1.setTransform(333,184,1.835,1.835);

	this.c2 = new lib.circle();
	this.c2.setTransform(219,184,1.835,1.835);

	this.c1_1 = new lib.circle();
	this.c1_1.setTransform(94,239,1.835,1.835);

	this.addChild(this.c1_1,this.c2,this.c0_1,this.instance_2,this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(66.4,26.8,334.8,306.4);


(lib.box2dcircleCircleTest = function() {
	this.initialize();

	// レイヤー 2
	this.instance_3 = new lib.circle();
	this.instance_3.setTransform(219,258,1.835,1.835);

	this.instance_4 = new lib.circle();
	this.instance_4.setTransform(256,281,1.835,1.835);

	this.instance_5 = new lib.circle();
	this.instance_5.setTransform(216,300,1.835,1.835);

	// レイヤー 1
	this.c0_2 = new lib.circle();
	this.c0_2.setTransform(88,122,1.835,1.835);

	this.c2_1 = new lib.circle();
	this.c2_1.setTransform(88,80,1.835,1.835);

	this.c1_2 = new lib.circle();
	this.c1_2.setTransform(50,103,1.835,1.835);

	this.addChild(this.c1_2,this.c2_1,this.c0_2,this.instance_5,this.instance_4,this.instance_3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(40.8,70.8,224.4,238.4);


(lib.box2dboxCharacter = function() {
	this.initialize();

	// レイヤー 1
	this.c0_3 = new lib.box();
	this.c0_3.setTransform(199,106.1,26,26);

	this.addChild(this.c0_3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(173,80.1,52,52);


(lib.box2dboxBoxBackground = function() {
	this.initialize();

	// レイヤー 2
	this.instance_6 = new lib.box();
	this.instance_6.setTransform(73,363.7,12,28.701,-21.1);
	this.instance_6.alpha = 0.398;

	this.instance_7 = new lib.box();
	this.instance_7.setTransform(321,41.8,49.999,71.754,24.5);
	this.instance_7.alpha = 0.398;

	this.instance_8 = new lib.box();
	this.instance_8.setTransform(490,154.4,5,88.987,-44.9);
	this.instance_8.alpha = 0.398;

	//  
	this.c3 = new lib.box();
	this.c3.setTransform(6,138.8,5,358.776);
	this.c3.alpha = 0.398;

	this.c1_3 = new lib.box();
	this.c1_3.setTransform(591,143.4,5,355.953);
	this.c1_3.alpha = 0.398;

	this.c2_2 = new lib.box();
	this.c2_2.setTransform(287.1,436,386.045,4.995);
	this.c2_2.alpha = 0.398;

	this.addChild(this.c2_2,this.c1_3,this.c3,this.instance_8,this.instance_7,this.instance_6);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-98.9,-220,772.1,719.3);


(lib.box2dChunkMapContainer = function() {
	this.initialize();

	// flipper
	this.flipper = new lib.box2dpolygonFlipper();

	// circleTest2
	this.circleTest2 = new lib.box2dcircleCircleTest2();

	// circleTest
	this.circleTest = new lib.box2dcircleCircleTest();

	// char
	this.character = new lib.box2dboxCharacter();

	// background
	this.boxBackground = new lib.box2dboxBoxBackground();

	this.addChild(this.boxBackground,this.character,this.circleTest,this.circleTest2,this.flipper);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-98.9,-220,772.1,719.4);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var TFCLib = function() { }
TFCLib.main = function() {
}
var com = com || {}
if(!com.dango_itimi) com.dango_itimi = {}
if(!com.dango_itimi.as3_and_createjs) com.dango_itimi.as3_and_createjs = {}
if(!com.dango_itimi.as3_and_createjs.sound) com.dango_itimi.as3_and_createjs.sound = {}
com.dango_itimi.as3_and_createjs.sound.SoundEffect = function() { }
com.dango_itimi.as3_and_createjs.sound.SoundEffect.prototype = {
	stop: function() {
	}
	,playChild: function() {
	}
}
if(!com.dango_itimi.createjs) com.dango_itimi.createjs = {}
if(!com.dango_itimi.createjs.sound) com.dango_itimi.createjs.sound = {}
com.dango_itimi.createjs.sound.SoundEffectForJS = function() { }
com.dango_itimi.createjs.sound.SoundEffectForJS.__super__ = com.dango_itimi.as3_and_createjs.sound.SoundEffect;
com.dango_itimi.createjs.sound.SoundEffectForJS.prototype = $extend(com.dango_itimi.as3_and_createjs.sound.SoundEffect.prototype,{
	stop: function() {
		if(this.soundInstance != null) this.soundInstance.stop();
	}
	,playChild: function() {
		if(this.soundInstance == null) this.soundInstance = createjs.Sound.play(this.id,this.interrupt,this.delay,this.offset,this.loop); else this.soundInstance.play();
		this.soundInstance.setVolume(this.volume);
		this.soundInstance.setPan(this.pan);
	}
});
var js = js || {}
js.Lib = function() { }
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
TFCLib.main();

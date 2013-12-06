(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Main = function() {
	js.Browser.window.onload = $bind(this,this.initialize);
};
Main.__name__ = ["Main"];
Main.main = function() {
	new Main();
}
Main.prototype = {
	runForGameScene: function() {
		this.player.run();
		com.dango_itimi.toolkit_for_createjs.SoundPlayer.soundEffectMap.run();
		this.stage.update();
	}
	,initializeToGameScene: function() {
		com.dango_itimi.toolkit_for_createjs.SoundPlayer.initialize();
		this.player = new shooting.player.Player();
		this.player.addChildToLayer(this.stage);
		shooting.se.SoundMixer.initialize();
		shooting.se.SoundMixer.playForBgm();
		this.mainFunction = $bind(this,this.runForGameScene);
	}
	,test: function() {
	}
	,loadTFC: function() {
		this.tfcLoader.run();
		if(this.tfcLoader.isFinished()) this.mainFunction = $bind(this,this.initializeToGameScene);
	}
	,run: function() {
		this.mainFunction();
	}
	,initialize: function(event) {
		this.stage = new createjs.Stage(js.Browser.document.getElementById("canvas"));
		this.tfcLoader = new com.dango_itimi.toolkit_for_createjs.TFCLoader("tfc","tfc_sounds",true);
		this.tfcLoader.addMaterialDirectory("lib","view");
		createjs.Ticker.setFPS(this.tfcLoader.getFps());
		createjs.Ticker.addEventListener("tick",$bind(this,this.run));
		this.mainFunction = $bind(this,this.loadTFC);
	}
	,__class__: Main
}
var IMap = function() { }
IMap.__name__ = ["IMap"];
var Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
var Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
var com = {}
com.dango_itimi = {}
com.dango_itimi.as3_and_createjs = {}
com.dango_itimi.as3_and_createjs.sound = {}
com.dango_itimi.as3_and_createjs.sound.SoundEffect = function(id,intervalFrame,volume,pan,loop) {
	this.id = id;
	this.intervalFrame = intervalFrame;
	this.volume = volume;
	this.pan = pan;
	this.loop = loop;
	this.interval = 0;
	this.mainFunction = $bind(this,this.finish);
};
com.dango_itimi.as3_and_createjs.sound.SoundEffect.__name__ = ["com","dango_itimi","as3_and_createjs","sound","SoundEffect"];
com.dango_itimi.as3_and_createjs.sound.SoundEffect.prototype = {
	stop: function() {
		this.interval = 0;
		this.mainFunction = $bind(this,this.finish);
	}
	,decrementInterval: function() {
		if(this.interval > 0) this.interval--; else this.mainFunction = $bind(this,this.finish);
	}
	,playChild: function() {
	}
	,play: function() {
		if(this.interval > 0) return;
		this.playChild();
		this.interval = this.intervalFrame;
		this.mainFunction = $bind(this,this.decrementInterval);
	}
	,isFinished: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.finish));
	}
	,finish: function() {
	}
	,run: function() {
		this.mainFunction();
	}
	,__class__: com.dango_itimi.as3_and_createjs.sound.SoundEffect
}
com.dango_itimi.as3_and_createjs.sound.SoundEffectMap = function() {
	this.playingSoundEffectMap = new haxe.ds.StringMap();
	this.soundEffectMap = new haxe.ds.StringMap();
	this.mute = false;
};
com.dango_itimi.as3_and_createjs.sound.SoundEffectMap.__name__ = ["com","dango_itimi","as3_and_createjs","sound","SoundEffectMap"];
com.dango_itimi.as3_and_createjs.sound.SoundEffectMap.prototype = {
	stop: function(soundEffectId) {
		var soundEffect = this.soundEffectMap.get(soundEffectId);
		soundEffect.stop();
		if(this.playingSoundEffectMap.exists(soundEffectId)) this.playingSoundEffectMap.remove(soundEffectId);
	}
	,play: function(soundEffectId) {
		if(this.mute) return;
		if(this.playingSoundEffectMap.exists(soundEffectId)) return;
		var soundEffect = this.soundEffectMap.get(soundEffectId);
		soundEffect.play();
		this.playingSoundEffectMap.set(soundEffectId,soundEffect);
	}
	,run: function() {
		var $it0 = this.playingSoundEffectMap.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var soundEffect = this.playingSoundEffectMap.get(key);
			soundEffect.run();
			if(soundEffect.isFinished()) this.playingSoundEffectMap.remove(key);
		}
	}
	,__class__: com.dango_itimi.as3_and_createjs.sound.SoundEffectMap
}
com.dango_itimi.createjs = {}
com.dango_itimi.createjs.net = {}
com.dango_itimi.createjs.net.LoaderWithLoadQueue = function(useXHR,plugin) {
	if(useXHR == null) useXHR = false;
	this.loadedEventSet = [];
	this.initialize(useXHR,plugin);
};
com.dango_itimi.createjs.net.LoaderWithLoadQueue.__name__ = ["com","dango_itimi","createjs","net","LoaderWithLoadQueue"];
com.dango_itimi.createjs.net.LoaderWithLoadQueue.prototype = {
	getLoadQueue: function() {
		return this.loadQueue;
	}
	,isError: function() {
		return this.error;
	}
	,isFinished: function() {
		return this.loadQueue.loaded;
	}
	,onComplete: function(event) {
	}
	,onFileError: function(event) {
		this.error = true;
	}
	,onFileLoad: function(event) {
		this.loadedEventSet.push(event);
	}
	,loadManifest: function(manifest) {
		this.loadQueue.loadManifest(manifest);
	}
	,loadFile: function(url) {
		this.loadQueue.loadFile(url);
	}
	,removeEventListener: function() {
		this.loadQueue.removeEventListener("fileload",$bind(this,this.onFileLoad));
		this.loadQueue.removeEventListener("error",$bind(this,this.onFileError));
		this.loadQueue.removeEventListener("complete",$bind(this,this.onComplete));
	}
	,initialize: function(useXHR,plugin) {
		if(useXHR == null) useXHR = false;
		this.loadQueue = new createjs.LoadQueue(useXHR);
		this.loadQueue.addEventListener("fileload",$bind(this,this.onFileLoad));
		this.loadQueue.addEventListener("error",$bind(this,this.onFileError));
		this.loadQueue.addEventListener("complete",$bind(this,this.onComplete));
		if(plugin != null) this.loadQueue.installPlugin(plugin);
	}
	,__class__: com.dango_itimi.createjs.net.LoaderWithLoadQueue
}
com.dango_itimi.createjs.sound = {}
com.dango_itimi.createjs.sound.SoundEffectForJS = function(id,intervalFrame,interrupt,delay,offset,loop,volume,pan) {
	this.interrupt = interrupt;
	this.delay = delay;
	this.offset = offset;
	com.dango_itimi.as3_and_createjs.sound.SoundEffect.call(this,id,intervalFrame,volume,pan,loop);
};
com.dango_itimi.createjs.sound.SoundEffectForJS.__name__ = ["com","dango_itimi","createjs","sound","SoundEffectForJS"];
com.dango_itimi.createjs.sound.SoundEffectForJS.__super__ = com.dango_itimi.as3_and_createjs.sound.SoundEffect;
com.dango_itimi.createjs.sound.SoundEffectForJS.prototype = $extend(com.dango_itimi.as3_and_createjs.sound.SoundEffect.prototype,{
	stop: function() {
		if(this.soundInstance != null) this.soundInstance.stop();
		com.dango_itimi.as3_and_createjs.sound.SoundEffect.prototype.stop.call(this);
	}
	,playChild: function() {
		if(this.soundInstance == null) this.soundInstance = createjs.Sound.play(this.id,this.interrupt,this.delay,this.offset,this.loop); else this.soundInstance.play(this.interrupt,this.delay,this.offset,this.loop);
		this.soundInstance.setVolume(this.volume);
		this.soundInstance.setPan(this.pan);
	}
	,__class__: com.dango_itimi.createjs.sound.SoundEffectForJS
});
com.dango_itimi.createjs.sound.SoundEffectMapForJS = function() {
	com.dango_itimi.as3_and_createjs.sound.SoundEffectMap.call(this);
};
com.dango_itimi.createjs.sound.SoundEffectMapForJS.__name__ = ["com","dango_itimi","createjs","sound","SoundEffectMapForJS"];
com.dango_itimi.createjs.sound.SoundEffectMapForJS.__super__ = com.dango_itimi.as3_and_createjs.sound.SoundEffectMap;
com.dango_itimi.createjs.sound.SoundEffectMapForJS.prototype = $extend(com.dango_itimi.as3_and_createjs.sound.SoundEffectMap.prototype,{
	playForFrameSound: function(id,loop) {
		if(loop == null) loop = 0;
		if(!this.soundEffectMap.exists(id)) this.register(id,0,"early",0,0,loop);
		var soundEffect = this.soundEffectMap.get(id);
		soundEffect.play();
	}
	,register: function(id,intervalFrame,interrupt,delay,offset,loop,volume,pan) {
		if(pan == null) pan = 0;
		if(volume == null) volume = 1.0;
		if(loop == null) loop = 0;
		if(offset == null) offset = 0;
		if(delay == null) delay = 0;
		if(interrupt == null) interrupt = "early";
		if(intervalFrame == null) intervalFrame = 5;
		var soundEffect = new com.dango_itimi.createjs.sound.SoundEffectForJS(id,intervalFrame,interrupt,delay,offset,loop,volume,pan);
		this.soundEffectMap.set(id,soundEffect);
		return id;
	}
	,__class__: com.dango_itimi.createjs.sound.SoundEffectMapForJS
});
com.dango_itimi.toolkit_for_createjs = {}
com.dango_itimi.toolkit_for_createjs.Instance = function() { }
com.dango_itimi.toolkit_for_createjs.Instance.__name__ = ["com","dango_itimi","toolkit_for_createjs","Instance"];
com.dango_itimi.toolkit_for_createjs.Instance.createWithSamePackageInstance = function(createdClassName,samePackageInstance,symbolNameSpace) {
	var packageNames = com.dango_itimi.utils.ClassUtil.getPackageNamesWithInstance(samePackageInstance);
	return com.dango_itimi.toolkit_for_createjs.Instance.create(createdClassName,packageNames,symbolNameSpace);
}
com.dango_itimi.toolkit_for_createjs.Instance.createWithSamePackageClass = function(createdClassName,samePackageClass,symbolNameSpace) {
	var packageNames = com.dango_itimi.utils.ClassUtil.getPackageNamesWithClass(samePackageClass);
	return com.dango_itimi.toolkit_for_createjs.Instance.create(createdClassName,packageNames,symbolNameSpace);
}
com.dango_itimi.toolkit_for_createjs.Instance.create = function(createdClassName,packageNames,symbolNameSpace) {
	if(symbolNameSpace == null) symbolNameSpace = "lib";
	return eval(["new ",symbolNameSpace,".",packageNames.join(""),createdClassName,"()"].join(""));
}
com.dango_itimi.toolkit_for_createjs.MaterialURI = function(baseDirectoryName,baseSoundsDirectoryName,usedSoundOgg) {
	if(usedSoundOgg == null) usedSoundOgg = false;
	if(baseSoundsDirectoryName == null) baseSoundsDirectoryName = "";
	this.baseDirectory = baseDirectoryName + "/";
	this.baseSoundsDirectory = baseSoundsDirectoryName != ""?baseSoundsDirectoryName + "/":"";
	this.usedSoundOgg = usedSoundOgg;
};
com.dango_itimi.toolkit_for_createjs.MaterialURI.__name__ = ["com","dango_itimi","toolkit_for_createjs","MaterialURI"];
com.dango_itimi.toolkit_for_createjs.MaterialURI.prototype = {
	convertSrc: function(materialDirectory,soundsDirectory,src) {
		if(src.indexOf(".mp3") == -1) return materialDirectory + src; else {
			var oggSrc = this.usedSoundOgg?"|" + soundsDirectory + src.split(".")[0] + ".ogg":"";
			return soundsDirectory + src + oggSrc;
		}
	}
	,addUriToImgSrcMap: function(imgSrcMap,materialDirectoryName) {
		var materialDirectory = this.getMaterialDirectory(materialDirectoryName);
		var soundsDirectory = this.getSoundsDirectory(materialDirectoryName);
		var fields = Reflect.fields(imgSrcMap);
		var _g = 0;
		while(_g < fields.length) {
			var propertyName = fields[_g];
			++_g;
			var src = this.convertSrc(materialDirectory,soundsDirectory,Reflect.field(imgSrcMap,propertyName));
			imgSrcMap[propertyName] = src;
		}
	}
	,addUri: function(manifest,materialDirectoryName) {
		var materialDirectory = this.getMaterialDirectory(materialDirectoryName);
		var soundsDirectory = this.getSoundsDirectory(materialDirectoryName);
		var _g1 = 0, _g = manifest.length;
		while(_g1 < _g) {
			var i = _g1++;
			manifest[i].src = this.convertSrc(materialDirectory,soundsDirectory,manifest[i].src);
		}
	}
	,getSoundsDirectory: function(materialDirectoryName) {
		var soundsDirectory = this.baseSoundsDirectory == ""?this.baseDirectory:this.baseSoundsDirectory;
		return soundsDirectory + materialDirectoryName + "/";
	}
	,getMaterialDirectory: function(materialDirectoryName) {
		return this.baseDirectory + materialDirectoryName + "/";
	}
	,getTemplateHtmlUri: function(materialDirectoryName) {
		return this.baseDirectory + materialDirectoryName + "/" + materialDirectoryName + ".html";
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.MaterialURI
}
com.dango_itimi.toolkit_for_createjs.SoundPlayer = function() { }
com.dango_itimi.toolkit_for_createjs.SoundPlayer.__name__ = ["com","dango_itimi","toolkit_for_createjs","SoundPlayer"];
com.dango_itimi.toolkit_for_createjs.SoundPlayer.initialize = function() {
	com.dango_itimi.toolkit_for_createjs.SoundPlayer.soundEffectMap = new com.dango_itimi.createjs.sound.SoundEffectMapForJS();
	var className = Type.getClassName(com.dango_itimi.toolkit_for_createjs.SoundPlayer);
	eval("window.playSound = function(name, loop){ " + className + ".playForFrameSound(name, loop); }");
	return com.dango_itimi.toolkit_for_createjs.SoundPlayer.soundEffectMap;
}
com.dango_itimi.toolkit_for_createjs.SoundPlayer.playForFrameSound = function(soundId,loop) {
	if(loop == null) loop = 0;
	com.dango_itimi.toolkit_for_createjs.SoundPlayer.soundEffectMap.playForFrameSound(soundId,loop);
}
com.dango_itimi.toolkit_for_createjs.TFCLoader = function(baseDirectoryName,baseSoundsDirectoryName,usedSoundOgg) {
	if(usedSoundOgg == null) usedSoundOgg = false;
	if(baseSoundsDirectoryName == null) baseSoundsDirectoryName = "";
	this.materialURI = new com.dango_itimi.toolkit_for_createjs.MaterialURI(baseDirectoryName,baseSoundsDirectoryName,usedSoundOgg);
	this.materialDirectorySet = [];
	this.propertiesSet = [];
	this.mainFunction = $bind(this,this.parseManifest);
};
com.dango_itimi.toolkit_for_createjs.TFCLoader.__name__ = ["com","dango_itimi","toolkit_for_createjs","TFCLoader"];
com.dango_itimi.toolkit_for_createjs.TFCLoader.prototype = {
	isError: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.error));
	}
	,error: function() {
	}
	,isFinished: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.finish));
	}
	,finish: function() {
	}
	,loadMaterial: function() {
		this.materialLoader.run();
		if(this.materialLoader.isFinished()) this.mainFunction = $bind(this,this.finish);
	}
	,initializeToLoadMaterial: function(manifest) {
		this.materialLoader = new com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader(manifest);
		this.materialLoader.load();
		this.mainFunction = $bind(this,this.loadMaterial);
	}
	,parseManifest: function() {
		var manifest = [];
		var _g1 = 0, _g = this.materialDirectorySet.length;
		while(_g1 < _g) {
			var i = _g1++;
			var materialDirectoryName = this.materialDirectorySet[i];
			var properties = this.propertiesSet[i];
			this.materialURI.addUri(properties.manifest,materialDirectoryName);
			manifest = manifest.concat(properties.manifest);
		}
		this.initializeToLoadMaterial(manifest);
	}
	,run: function() {
		this.mainFunction();
	}
	,getFps: function(elementIndex) {
		if(elementIndex == null) elementIndex = 0;
		return this.propertiesSet[elementIndex].fps;
	}
	,addMaterialDirectory: function(symbolNameSpace,materialDirectoryName) {
		var properties = eval("window." + symbolNameSpace + ".properties");
		this.propertiesSet.push(properties);
		this.materialDirectorySet.push(materialDirectoryName);
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.TFCLoader
}
com.dango_itimi.toolkit_for_createjs.loader = {}
com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader = function(manifest) {
	this.manifest = manifest;
	this.images = eval("window.images||{}");
	this.loader = new com.dango_itimi.createjs.net.LoaderWithLoadQueue(false,createjs.Sound);
};
com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader.__name__ = ["com","dango_itimi","toolkit_for_createjs","loader","MaterialLoader"];
com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader.prototype = {
	isFinished: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.finish));
	}
	,finish: function() {
	}
	,setImages: function() {
		var _g1 = 0, _g = this.manifest.length;
		while(_g1 < _g) {
			var i = _g1++;
			var id = this.manifest[i].src;
			var result = this.loader.getLoadQueue().getResult(id);
			var item = this.loader.getLoadQueue().getItem(id);
			if(result != null && item.type == "image") this.images[item.id] = result;
		}
		this.mainFunction = $bind(this,this.finish);
	}
	,waitToFinishLoaded: function() {
		if(this.loader.isFinished()) this.setImages();
	}
	,load: function() {
		this.loader.loadManifest(this.manifest);
		this.mainFunction = $bind(this,this.waitToFinishLoaded);
	}
	,run: function() {
		this.mainFunction();
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader
}
com.dango_itimi.toolkit_for_createjs.utils = {}
com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil = function() { }
com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.__name__ = ["com","dango_itimi","toolkit_for_createjs","utils","ContainerUtil"];
com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getNominalBounds = function(container) {
	var rect = container.nominalBounds;
	return com.dango_itimi.utils.RectangleUtil.convert(rect);
}
com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getProperty = function(container,propertyStr) {
	var property = Reflect.field(container,propertyStr);
	if(property != null) return property;
	var fields = Reflect.fields(container);
	var _g = 0;
	while(_g < fields.length) {
		var prop = fields[_g];
		++_g;
		if(prop.indexOf(propertyStr) == -1) continue;
		var arr = prop.split("_");
		var checkedStr = arr[arr.length - 1];
		if(!Math.isNaN(checkedStr)) return Reflect.field(container,prop);
	}
	return null;
}
com.dango_itimi.utils = {}
com.dango_itimi.utils.ClassUtil = function() { }
com.dango_itimi.utils.ClassUtil.__name__ = ["com","dango_itimi","utils","ClassUtil"];
com.dango_itimi.utils.ClassUtil.getPackageNamesWithInstance = function(instance) {
	var cls = Type.getClass(instance);
	return com.dango_itimi.utils.ClassUtil.getPackageNamesWithClass(cls);
}
com.dango_itimi.utils.ClassUtil.getPackageNamesWithClass = function(cls) {
	var className = Type.getClassName(cls);
	var packageNames = className.split(".");
	packageNames.pop();
	return packageNames;
}
com.dango_itimi.utils.RectangleUtil = function(x,y,width,height) {
	this.width = width;
	this.height = height;
	this.setPosition(x,y);
};
com.dango_itimi.utils.RectangleUtil.__name__ = ["com","dango_itimi","utils","RectangleUtil"];
com.dango_itimi.utils.RectangleUtil.convert = function(rect) {
	return new com.dango_itimi.utils.RectangleUtil(rect.x,rect.y,rect.width,rect.height);
}
com.dango_itimi.utils.RectangleUtil.prototype = {
	hitTestObject: function(checkedRectangle) {
		if(this.x > checkedRectangle.right) return false;
		if(this.right < checkedRectangle.x) return false;
		if(this.y > checkedRectangle.bottom) return false;
		if(this.bottom < checkedRectangle.y) return false;
		return true;
	}
	,hitTestPoint: function(nx,ny) {
		return this.x <= nx && this.y <= ny && this.right >= nx && this.bottom >= ny;
	}
	,addY: function(addedY) {
		this.y += addedY;
		this.bottom += addedY;
	}
	,addX: function(addedX) {
		this.x += addedX;
		this.right += addedX;
	}
	,setY: function(y) {
		this.y = y;
		this.bottom = y + this.height;
	}
	,setX: function(x) {
		this.x = x;
		this.right = x + this.width;
	}
	,setPosition: function(x,y) {
		this.setX(x);
		this.setY(y);
	}
	,toString: function() {
		return "w:" + this.width + ", h:" + this.height + ", x:" + this.x + ", y:" + this.y;
	}
	,clone: function() {
		return new com.dango_itimi.utils.RectangleUtil(this.x,this.y,this.width,this.height);
	}
	,__class__: com.dango_itimi.utils.RectangleUtil
}
var haxe = {}
haxe.ds = {}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Browser = function() { }
js.Browser.__name__ = ["js","Browser"];
var shooting = {}
shooting.player = {}
shooting.player.Player = function() {
	this.view = com.dango_itimi.toolkit_for_createjs.Instance.createWithSamePackageInstance("View",this);
	this.view.x = 52;
	this.view.y = 195;
	this.nominalBounds = com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getNominalBounds(this.view);
};
shooting.player.Player.__name__ = ["shooting","player","Player"];
shooting.player.Player.prototype = {
	run: function() {
		this.view.x += 1;
	}
	,addChildToLayer: function(layer) {
		layer.addChild(this.view);
	}
	,__class__: shooting.player.Player
}
shooting.se = {}
shooting.se.SoundMixer = function() { }
shooting.se.SoundMixer.__name__ = ["shooting","se","SoundMixer"];
shooting.se.SoundMixer.initialize = function() {
	shooting.se.SoundMixer.SOUND_PACKAGE = com.dango_itimi.utils.ClassUtil.getPackageNamesWithClass(shooting.se.SoundMixer).join("");
	shooting.se.SoundMixer.bgmId = shooting.se.SoundMixer.register("Bgm",1,0,0,-1);
}
shooting.se.SoundMixer.register = function(soundClassName,volume,delay,offset,loop) {
	if(loop == null) loop = 0;
	if(offset == null) offset = 0;
	if(delay == null) delay = 0;
	if(volume == null) volume = 1;
	return com.dango_itimi.toolkit_for_createjs.SoundPlayer.soundEffectMap.register(shooting.se.SoundMixer.SOUND_PACKAGE + soundClassName,0,"early",delay,offset,loop,volume);
}
shooting.se.SoundMixer.playForBgm = function() {
	com.dango_itimi.toolkit_for_createjs.SoundPlayer.soundEffectMap.play(shooting.se.SoundMixer.bgmId);
}
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.prototype.__class__ = Array;
Array.__name__ = ["Array"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
com.dango_itimi.toolkit_for_createjs.Instance.NAMESPACE_SYMBOL = "lib";
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_HTML = ".html";
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_MP3 = ".mp3";
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_OGG = ".ogg";
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
Main.main();
})();

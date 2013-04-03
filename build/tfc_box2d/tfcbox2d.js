var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var Hash = $hxClasses["Hash"] = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
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
	,h: null
	,__class__: Hash
}
var HxOverrides = $hxClasses["HxOverrides"] = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,max: null
	,min: null
	,__class__: IntIter
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
var TFCBox2D = $hxClasses["TFCBox2D"] = function() { }
TFCBox2D.__name__ = ["TFCBox2D"];
TFCBox2D.main = function() {
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var box2D = box2D || {}
if(!box2D.collision) box2D.collision = {}
box2D.collision.B2AABB = $hxClasses["box2D.collision.B2AABB"] = function() {
	this.lowerBound = new box2D.common.math.B2Vec2();
	this.upperBound = new box2D.common.math.B2Vec2();
};
box2D.collision.B2AABB.__name__ = ["box2D","collision","B2AABB"];
box2D.collision.B2AABB.prototype = {
	upperBound: null
	,lowerBound: null
	,combine: function(aabb1,aabb2) {
		this.lowerBound.x = Math.min(aabb1.lowerBound.x,aabb2.lowerBound.x);
		this.lowerBound.y = Math.min(aabb1.lowerBound.y,aabb2.lowerBound.y);
		this.upperBound.x = Math.max(aabb1.upperBound.x,aabb2.upperBound.x);
		this.upperBound.y = Math.max(aabb1.upperBound.y,aabb2.upperBound.y);
	}
	,testOverlap: function(other) {
		var d1X = other.lowerBound.x - this.upperBound.x;
		var d1Y = other.lowerBound.y - this.upperBound.y;
		var d2X = this.lowerBound.x - other.upperBound.x;
		var d2Y = this.lowerBound.y - other.upperBound.y;
		if(d1X > 0.0 || d1Y > 0.0) return false;
		if(d2X > 0.0 || d2Y > 0.0) return false;
		return true;
	}
	,rayCast: function(output,input) {
		var tmin = -Number.MAX_VALUE;
		var tmax = Number.MAX_VALUE;
		var pX = input.p1.x;
		var pY = input.p1.y;
		var dX = input.p2.x - input.p1.x;
		var dY = input.p2.y - input.p1.y;
		var absDX = Math.abs(dX);
		var absDY = Math.abs(dY);
		var normal = output.normal;
		var inv_d;
		var t1;
		var t2;
		var t3;
		var s;
		if(absDX < Number.MIN_VALUE) {
			if(pX < this.lowerBound.x || this.upperBound.x < pX) return false;
		} else {
			inv_d = 1.0 / dX;
			t1 = (this.lowerBound.x - pX) * inv_d;
			t2 = (this.upperBound.x - pX) * inv_d;
			s = -1.0;
			if(t1 > t2) {
				t3 = t1;
				t1 = t2;
				t2 = t3;
				s = 1.0;
			}
			if(t1 > tmin) {
				normal.x = s;
				normal.y = 0;
				tmin = t1;
			}
			tmax = Math.min(tmax,t2);
			if(tmin > tmax) return false;
		}
		if(absDY < Number.MIN_VALUE) {
			if(pY < this.lowerBound.y || this.upperBound.y < pY) return false;
		} else {
			inv_d = 1.0 / dY;
			t1 = (this.lowerBound.y - pY) * inv_d;
			t2 = (this.upperBound.y - pY) * inv_d;
			s = -1.0;
			if(t1 > t2) {
				t3 = t1;
				t1 = t2;
				t2 = t3;
				s = 1.0;
			}
			if(t1 > tmin) {
				normal.y = s;
				normal.x = 0;
				tmin = t1;
			}
			tmax = Math.min(tmax,t2);
			if(tmin > tmax) return false;
		}
		output.fraction = tmin;
		return true;
	}
	,contains: function(aabb) {
		var result = true;
		result = result && this.lowerBound.x <= aabb.lowerBound.x;
		result = result && this.lowerBound.y <= aabb.lowerBound.y;
		result = result && aabb.upperBound.x <= this.upperBound.x;
		result = result && aabb.upperBound.y <= this.upperBound.y;
		return result;
	}
	,getExtents: function() {
		return new box2D.common.math.B2Vec2((this.upperBound.x - this.lowerBound.x) / 2,(this.upperBound.y - this.lowerBound.y) / 2);
	}
	,getCenter: function() {
		return new box2D.common.math.B2Vec2((this.lowerBound.x + this.upperBound.x) / 2,(this.lowerBound.y + this.upperBound.y) / 2);
	}
	,isValid: function() {
		var dX = this.upperBound.x - this.lowerBound.x;
		var dY = this.upperBound.y - this.lowerBound.y;
		var valid = dX >= 0.0 && dY >= 0.0;
		valid = valid && this.lowerBound.isValid() && this.upperBound.isValid();
		return valid;
	}
	,__class__: box2D.collision.B2AABB
}
if(!box2D.common) box2D.common = {}
if(!box2D.common.math) box2D.common.math = {}
box2D.common.math.B2Vec2 = $hxClasses["box2D.common.math.B2Vec2"] = function(x_,y_) {
	if(y_ == null) y_ = 0;
	if(x_ == null) x_ = 0;
	this.x = x_;
	this.y = y_;
};
box2D.common.math.B2Vec2.__name__ = ["box2D","common","math","B2Vec2"];
box2D.common.math.B2Vec2.make = function(x_,y_) {
	return new box2D.common.math.B2Vec2(x_,y_);
}
box2D.common.math.B2Vec2.prototype = {
	y: null
	,x: null
	,isValid: function() {
		return box2D.common.math.B2Math.isValid(this.x) && box2D.common.math.B2Math.isValid(this.y);
	}
	,normalize: function() {
		var length = Math.sqrt(this.x * this.x + this.y * this.y);
		if(length < Number.MIN_VALUE) return 0.0;
		var invLength = 1.0 / length;
		this.x *= invLength;
		this.y *= invLength;
		return length;
	}
	,lengthSquared: function() {
		return this.x * this.x + this.y * this.y;
	}
	,length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,abs: function() {
		if(this.x < 0) this.x = -this.x;
		if(this.y < 0) this.y = -this.y;
	}
	,maxV: function(b) {
		this.x = this.x > b.x?this.x:b.x;
		this.y = this.y > b.y?this.y:b.y;
	}
	,minV: function(b) {
		this.x = this.x < b.x?this.x:b.x;
		this.y = this.y < b.y?this.y:b.y;
	}
	,crossFV: function(s) {
		var tX = this.x;
		this.x = -s * this.y;
		this.y = s * tX;
	}
	,crossVF: function(s) {
		var tX = this.x;
		this.x = s * this.y;
		this.y = -s * tX;
	}
	,mulTM: function(A) {
		var tX = box2D.common.math.B2Math.dot(this,A.col1);
		this.y = box2D.common.math.B2Math.dot(this,A.col2);
		this.x = tX;
	}
	,mulM: function(A) {
		var tX = this.x;
		this.x = A.col1.x * tX + A.col2.x * this.y;
		this.y = A.col1.y * tX + A.col2.y * this.y;
	}
	,multiply: function(a) {
		this.x *= a;
		this.y *= a;
	}
	,subtract: function(v) {
		this.x -= v.x;
		this.y -= v.y;
	}
	,add: function(v) {
		this.x += v.x;
		this.y += v.y;
	}
	,copy: function() {
		return new box2D.common.math.B2Vec2(this.x,this.y);
	}
	,negativeSelf: function() {
		this.x = -this.x;
		this.y = -this.y;
	}
	,getNegative: function() {
		return new box2D.common.math.B2Vec2(-this.x,-this.y);
	}
	,setV: function(v) {
		this.x = v.x;
		this.y = v.y;
	}
	,set: function(x_,y_) {
		if(y_ == null) y_ = 0;
		if(x_ == null) x_ = 0;
		this.x = x_;
		this.y = y_;
	}
	,setZero: function() {
		this.x = 0.0;
		this.y = 0.0;
	}
	,__class__: box2D.common.math.B2Vec2
}
box2D.collision.ClipVertex = $hxClasses["box2D.collision.ClipVertex"] = function() {
	this.v = new box2D.common.math.B2Vec2();
	this.id = new box2D.collision.B2ContactID();
};
box2D.collision.ClipVertex.__name__ = ["box2D","collision","ClipVertex"];
box2D.collision.ClipVertex.prototype = {
	id: null
	,v: null
	,set: function(other) {
		this.v.setV(other.v);
		this.id.set(other.id);
	}
	,__class__: box2D.collision.ClipVertex
}
box2D.collision.B2ContactID = $hxClasses["box2D.collision.B2ContactID"] = function() {
	this.features = new box2D.collision.Features();
	this.features._m_id = this;
};
box2D.collision.B2ContactID.__name__ = ["box2D","collision","B2ContactID"];
box2D.collision.B2ContactID.prototype = {
	_key: null
	,features: null
	,setKey: function(value) {
		this._key = value;
		this.features._referenceEdge = this._key & 255;
		this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
		this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
		this.features._flip = (this._key & -16777216) >> 24 & 255;
		return this._key;
	}
	,getKey: function() {
		return this._key;
	}
	,key: null
	,copy: function() {
		var id = new box2D.collision.B2ContactID();
		id.setKey(this.getKey());
		return id;
	}
	,set: function(id) {
		this.setKey(id._key);
	}
	,__class__: box2D.collision.B2ContactID
	,__properties__: {set_key:"setKey",get_key:"getKey"}
}
box2D.collision.Features = $hxClasses["box2D.collision.Features"] = function() {
};
box2D.collision.Features.__name__ = ["box2D","collision","Features"];
box2D.collision.Features.prototype = {
	_m_id: null
	,_flip: null
	,setFlip: function(value) {
		this._flip = value;
		this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & -16777216;
		return value;
	}
	,getFlip: function() {
		return this._flip;
	}
	,flip: null
	,_incidentVertex: null
	,setIncidentVertex: function(value) {
		this._incidentVertex = value;
		this._m_id._key = this._m_id._key & -16711681 | this._incidentVertex << 16 & 16711680;
		return value;
	}
	,getIncidentVertex: function() {
		return this._incidentVertex;
	}
	,incidentVertex: null
	,_incidentEdge: null
	,setIncidentEdge: function(value) {
		this._incidentEdge = value;
		this._m_id._key = this._m_id._key & -65281 | this._incidentEdge << 8 & 65280;
		return value;
	}
	,getIncidentEdge: function() {
		return this._incidentEdge;
	}
	,incidentEdge: null
	,_referenceEdge: null
	,setReferenceEdge: function(value) {
		this._referenceEdge = value;
		this._m_id._key = this._m_id._key & -256 | this._referenceEdge & 255;
		return value;
	}
	,getReferenceEdge: function() {
		return this._referenceEdge;
	}
	,referenceEdge: null
	,__class__: box2D.collision.Features
	,__properties__: {set_referenceEdge:"setReferenceEdge",get_referenceEdge:"getReferenceEdge",set_incidentEdge:"setIncidentEdge",get_incidentEdge:"getIncidentEdge",set_incidentVertex:"setIncidentVertex",get_incidentVertex:"getIncidentVertex",set_flip:"setFlip",get_flip:"getFlip"}
}
box2D.collision.B2Collision = $hxClasses["box2D.collision.B2Collision"] = function() { }
box2D.collision.B2Collision.__name__ = ["box2D","collision","B2Collision"];
box2D.collision.B2Collision.clipSegmentToLine = function(vOut,vIn,normal,offset) {
	var cv;
	var numOut = 0;
	cv = vIn[0];
	var vIn0 = cv.v;
	cv = vIn[1];
	var vIn1 = cv.v;
	var distance0 = normal.x * vIn0.x + normal.y * vIn0.y - offset;
	var distance1 = normal.x * vIn1.x + normal.y * vIn1.y - offset;
	if(distance0 <= 0.0) vOut[numOut++].set(vIn[0]);
	if(distance1 <= 0.0) vOut[numOut++].set(vIn[1]);
	if(distance0 * distance1 < 0.0) {
		var interp = distance0 / (distance0 - distance1);
		cv = vOut[numOut];
		var tVec = cv.v;
		tVec.x = vIn0.x + interp * (vIn1.x - vIn0.x);
		tVec.y = vIn0.y + interp * (vIn1.y - vIn0.y);
		cv = vOut[numOut];
		var cv2;
		if(distance0 > 0.0) {
			cv2 = vIn[0];
			cv.id = cv2.id;
		} else {
			cv2 = vIn[1];
			cv.id = cv2.id;
		}
		++numOut;
	}
	return numOut;
}
box2D.collision.B2Collision.edgeSeparation = function(poly1,xf1,edge1,poly2,xf2) {
	var count1 = poly1.m_vertexCount;
	var vertices1 = poly1.m_vertices;
	var normals1 = poly1.m_normals;
	var count2 = poly2.m_vertexCount;
	var vertices2 = poly2.m_vertices;
	var tMat;
	var tVec;
	tMat = xf1.R;
	tVec = normals1[edge1];
	var normal1WorldX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	var normal1WorldY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	tMat = xf2.R;
	var normal1X = tMat.col1.x * normal1WorldX + tMat.col1.y * normal1WorldY;
	var normal1Y = tMat.col2.x * normal1WorldX + tMat.col2.y * normal1WorldY;
	var index = 0;
	var minDot = Number.MAX_VALUE;
	var _g = 0;
	while(_g < count2) {
		var i = _g++;
		tVec = vertices2[i];
		var dot = tVec.x * normal1X + tVec.y * normal1Y;
		if(dot < minDot) {
			minDot = dot;
			index = i;
		}
	}
	tVec = vertices1[edge1];
	tMat = xf1.R;
	var v1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var v1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tVec = vertices2[index];
	tMat = xf2.R;
	var v2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var v2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	v2X -= v1X;
	v2Y -= v1Y;
	var separation = v2X * normal1WorldX + v2Y * normal1WorldY;
	return separation;
}
box2D.collision.B2Collision.findMaxSeparation = function(edgeIndex,poly1,xf1,poly2,xf2) {
	var count1 = poly1.m_vertexCount;
	var normals1 = poly1.m_normals;
	var tVec;
	var tMat;
	tMat = xf2.R;
	tVec = poly2.m_centroid;
	var dX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var dY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tMat = xf1.R;
	tVec = poly1.m_centroid;
	dX -= xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	dY -= xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	var dLocal1X = dX * xf1.R.col1.x + dY * xf1.R.col1.y;
	var dLocal1Y = dX * xf1.R.col2.x + dY * xf1.R.col2.y;
	var edge = 0;
	var maxDot = -Number.MAX_VALUE;
	var _g = 0;
	while(_g < count1) {
		var i = _g++;
		tVec = normals1[i];
		var dot = tVec.x * dLocal1X + tVec.y * dLocal1Y;
		if(dot > maxDot) {
			maxDot = dot;
			edge = i;
		}
	}
	var s = box2D.collision.B2Collision.edgeSeparation(poly1,xf1,edge,poly2,xf2);
	var prevEdge = edge - 1 >= 0?edge - 1:count1 - 1;
	var sPrev = box2D.collision.B2Collision.edgeSeparation(poly1,xf1,prevEdge,poly2,xf2);
	var nextEdge = edge + 1 < count1?edge + 1:0;
	var sNext = box2D.collision.B2Collision.edgeSeparation(poly1,xf1,nextEdge,poly2,xf2);
	var bestEdge;
	var bestSeparation;
	var increment;
	if(sPrev > s && sPrev > sNext) {
		increment = -1;
		bestEdge = prevEdge;
		bestSeparation = sPrev;
	} else if(sNext > s) {
		increment = 1;
		bestEdge = nextEdge;
		bestSeparation = sNext;
	} else {
		edgeIndex[0] = edge;
		return s;
	}
	while(true) {
		if(increment == -1) edge = bestEdge - 1 >= 0?bestEdge - 1:count1 - 1; else edge = bestEdge + 1 < count1?bestEdge + 1:0;
		s = box2D.collision.B2Collision.edgeSeparation(poly1,xf1,edge,poly2,xf2);
		if(s > bestSeparation) {
			bestEdge = edge;
			bestSeparation = s;
		} else break;
	}
	edgeIndex[0] = bestEdge;
	return bestSeparation;
}
box2D.collision.B2Collision.findIncidentEdge = function(c,poly1,xf1,edge1,poly2,xf2) {
	var count1 = poly1.m_vertexCount;
	var normals1 = poly1.m_normals;
	var count2 = poly2.m_vertexCount;
	var vertices2 = poly2.m_vertices;
	var normals2 = poly2.m_normals;
	var tMat;
	var tVec;
	tMat = xf1.R;
	tVec = normals1[edge1];
	var normal1X = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	var normal1Y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	tMat = xf2.R;
	var tX = tMat.col1.x * normal1X + tMat.col1.y * normal1Y;
	normal1Y = tMat.col2.x * normal1X + tMat.col2.y * normal1Y;
	normal1X = tX;
	var index = 0;
	var minDot = Number.MAX_VALUE;
	var _g = 0;
	while(_g < count2) {
		var i = _g++;
		tVec = normals2[i];
		var dot = normal1X * tVec.x + normal1Y * tVec.y;
		if(dot < minDot) {
			minDot = dot;
			index = i;
		}
	}
	var tClip;
	var i1 = index;
	var i2 = i1 + 1 < count2?i1 + 1:0;
	tClip = c[0];
	tVec = vertices2[i1];
	tMat = xf2.R;
	tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tClip.id.features.setReferenceEdge(edge1);
	tClip.id.features.setIncidentEdge(i1);
	tClip.id.features.setIncidentVertex(0);
	tClip = c[1];
	tVec = vertices2[i2];
	tMat = xf2.R;
	tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tClip.id.features.setReferenceEdge(edge1);
	tClip.id.features.setIncidentEdge(i2);
	tClip.id.features.setIncidentVertex(1);
}
box2D.collision.B2Collision.makeClipPointVector = function() {
	var r = new Array();
	r[0] = new box2D.collision.ClipVertex();
	r[1] = new box2D.collision.ClipVertex();
	return r;
}
box2D.collision.B2Collision.collidePolygons = function(manifold,polyA,xfA,polyB,xfB) {
	var cv;
	manifold.m_pointCount = 0;
	var totalRadius = polyA.m_radius + polyB.m_radius;
	var edgeA = 0;
	box2D.collision.B2Collision.s_edgeAO[0] = edgeA;
	var separationA = box2D.collision.B2Collision.findMaxSeparation(box2D.collision.B2Collision.s_edgeAO,polyA,xfA,polyB,xfB);
	edgeA = box2D.collision.B2Collision.s_edgeAO[0];
	if(separationA > totalRadius) return;
	var edgeB = 0;
	box2D.collision.B2Collision.s_edgeBO[0] = edgeB;
	var separationB = box2D.collision.B2Collision.findMaxSeparation(box2D.collision.B2Collision.s_edgeBO,polyB,xfB,polyA,xfA);
	edgeB = box2D.collision.B2Collision.s_edgeBO[0];
	if(separationB > totalRadius) return;
	var poly1;
	var poly2;
	var xf1;
	var xf2;
	var edge1;
	var flip;
	var k_relativeTol = 0.98;
	var k_absoluteTol = 0.001;
	var tMat;
	if(separationB > k_relativeTol * separationA + k_absoluteTol) {
		poly1 = polyB;
		poly2 = polyA;
		xf1 = xfB;
		xf2 = xfA;
		edge1 = edgeB;
		manifold.m_type = box2D.collision.B2Manifold.e_faceB;
		flip = 1;
	} else {
		poly1 = polyA;
		poly2 = polyB;
		xf1 = xfA;
		xf2 = xfB;
		edge1 = edgeA;
		manifold.m_type = box2D.collision.B2Manifold.e_faceA;
		flip = 0;
	}
	var incidentEdge = box2D.collision.B2Collision.s_incidentEdge;
	box2D.collision.B2Collision.findIncidentEdge(incidentEdge,poly1,xf1,edge1,poly2,xf2);
	var count1 = poly1.m_vertexCount;
	var vertices1 = poly1.m_vertices;
	var local_v11 = vertices1[edge1];
	var local_v12;
	if(edge1 + 1 < count1) local_v12 = vertices1[edge1 + 1 | 0]; else local_v12 = vertices1[0];
	var localTangent = box2D.collision.B2Collision.s_localTangent;
	localTangent.set(local_v12.x - local_v11.x,local_v12.y - local_v11.y);
	localTangent.normalize();
	var localNormal = box2D.collision.B2Collision.s_localNormal;
	localNormal.x = localTangent.y;
	localNormal.y = -localTangent.x;
	var planePoint = box2D.collision.B2Collision.s_planePoint;
	planePoint.set(0.5 * (local_v11.x + local_v12.x),0.5 * (local_v11.y + local_v12.y));
	var tangent = box2D.collision.B2Collision.s_tangent;
	tMat = xf1.R;
	tangent.x = tMat.col1.x * localTangent.x + tMat.col2.x * localTangent.y;
	tangent.y = tMat.col1.y * localTangent.x + tMat.col2.y * localTangent.y;
	var tangent2 = box2D.collision.B2Collision.s_tangent2;
	tangent2.x = -tangent.x;
	tangent2.y = -tangent.y;
	var normal = box2D.collision.B2Collision.s_normal;
	normal.x = tangent.y;
	normal.y = -tangent.x;
	var v11 = box2D.collision.B2Collision.s_v11;
	var v12 = box2D.collision.B2Collision.s_v12;
	v11.x = xf1.position.x + (tMat.col1.x * local_v11.x + tMat.col2.x * local_v11.y);
	v11.y = xf1.position.y + (tMat.col1.y * local_v11.x + tMat.col2.y * local_v11.y);
	v12.x = xf1.position.x + (tMat.col1.x * local_v12.x + tMat.col2.x * local_v12.y);
	v12.y = xf1.position.y + (tMat.col1.y * local_v12.x + tMat.col2.y * local_v12.y);
	var frontOffset = normal.x * v11.x + normal.y * v11.y;
	var sideOffset1 = -tangent.x * v11.x - tangent.y * v11.y + totalRadius;
	var sideOffset2 = tangent.x * v12.x + tangent.y * v12.y + totalRadius;
	var clipPoints1 = box2D.collision.B2Collision.s_clipPoints1;
	var clipPoints2 = box2D.collision.B2Collision.s_clipPoints2;
	var np;
	np = box2D.collision.B2Collision.clipSegmentToLine(clipPoints1,incidentEdge,tangent2,sideOffset1);
	if(np < 2) return;
	np = box2D.collision.B2Collision.clipSegmentToLine(clipPoints2,clipPoints1,tangent,sideOffset2);
	if(np < 2) return;
	manifold.m_localPlaneNormal.setV(localNormal);
	manifold.m_localPoint.setV(planePoint);
	var pointCount = 0;
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
	while(_g1 < _g) {
		var i = _g1++;
		cv = clipPoints2[i];
		var separation = normal.x * cv.v.x + normal.y * cv.v.y - frontOffset;
		if(separation <= totalRadius) {
			var cp = manifold.m_points[pointCount];
			tMat = xf2.R;
			var tX = cv.v.x - xf2.position.x;
			var tY = cv.v.y - xf2.position.y;
			cp.m_localPoint.x = tX * tMat.col1.x + tY * tMat.col1.y;
			cp.m_localPoint.y = tX * tMat.col2.x + tY * tMat.col2.y;
			cp.m_id.set(cv.id);
			cp.m_id.features.setFlip(flip);
			++pointCount;
		}
	}
	manifold.m_pointCount = pointCount;
}
box2D.collision.B2Collision.collideCircles = function(manifold,circle1,xf1,circle2,xf2) {
	manifold.m_pointCount = 0;
	var tMat;
	var tVec;
	tMat = xf1.R;
	tVec = circle1.m_p;
	var p1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var p1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tMat = xf2.R;
	tVec = circle2.m_p;
	var p2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var p2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	var dX = p2X - p1X;
	var dY = p2Y - p1Y;
	var distSqr = dX * dX + dY * dY;
	var radius = circle1.m_radius + circle2.m_radius;
	if(distSqr > radius * radius) return;
	manifold.m_type = box2D.collision.B2Manifold.e_circles;
	manifold.m_localPoint.setV(circle1.m_p);
	manifold.m_localPlaneNormal.setZero();
	manifold.m_pointCount = 1;
	manifold.m_points[0].m_localPoint.setV(circle2.m_p);
	manifold.m_points[0].m_id.setKey(0);
}
box2D.collision.B2Collision.collidePolygonAndCircle = function(manifold,polygon,xf1,circle,xf2) {
	manifold.m_pointCount = 0;
	var tPoint;
	var dX;
	var dY;
	var positionX;
	var positionY;
	var tVec;
	var tMat;
	tMat = xf2.R;
	tVec = circle.m_p;
	var cX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var cY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	dX = cX - xf1.position.x;
	dY = cY - xf1.position.y;
	tMat = xf1.R;
	var cLocalX = dX * tMat.col1.x + dY * tMat.col1.y;
	var cLocalY = dX * tMat.col2.x + dY * tMat.col2.y;
	var dist;
	var normalIndex = 0;
	var separation = -Number.MAX_VALUE;
	var radius = polygon.m_radius + circle.m_radius;
	var vertexCount = polygon.m_vertexCount;
	var vertices = polygon.m_vertices;
	var normals = polygon.m_normals;
	var _g = 0;
	while(_g < vertexCount) {
		var i = _g++;
		tVec = vertices[i];
		dX = cLocalX - tVec.x;
		dY = cLocalY - tVec.y;
		tVec = normals[i];
		var s = tVec.x * dX + tVec.y * dY;
		if(s > radius) return;
		if(s > separation) {
			separation = s;
			normalIndex = i;
		}
	}
	var vertIndex1 = normalIndex;
	var vertIndex2 = vertIndex1 + 1 < vertexCount?vertIndex1 + 1:0;
	var v1 = vertices[vertIndex1];
	var v2 = vertices[vertIndex2];
	if(separation < Number.MIN_VALUE) {
		manifold.m_pointCount = 1;
		manifold.m_type = box2D.collision.B2Manifold.e_faceA;
		manifold.m_localPlaneNormal.setV(normals[normalIndex]);
		manifold.m_localPoint.x = 0.5 * (v1.x + v2.x);
		manifold.m_localPoint.y = 0.5 * (v1.y + v2.y);
		manifold.m_points[0].m_localPoint.setV(circle.m_p);
		manifold.m_points[0].m_id.setKey(0);
		return;
	}
	var u1 = (cLocalX - v1.x) * (v2.x - v1.x) + (cLocalY - v1.y) * (v2.y - v1.y);
	var u2 = (cLocalX - v2.x) * (v1.x - v2.x) + (cLocalY - v2.y) * (v1.y - v2.y);
	if(u1 <= 0.0) {
		if((cLocalX - v1.x) * (cLocalX - v1.x) + (cLocalY - v1.y) * (cLocalY - v1.y) > radius * radius) return;
		manifold.m_pointCount = 1;
		manifold.m_type = box2D.collision.B2Manifold.e_faceA;
		manifold.m_localPlaneNormal.x = cLocalX - v1.x;
		manifold.m_localPlaneNormal.y = cLocalY - v1.y;
		manifold.m_localPlaneNormal.normalize();
		manifold.m_localPoint.setV(v1);
		manifold.m_points[0].m_localPoint.setV(circle.m_p);
		manifold.m_points[0].m_id.setKey(0);
	} else if(u2 <= 0) {
		if((cLocalX - v2.x) * (cLocalX - v2.x) + (cLocalY - v2.y) * (cLocalY - v2.y) > radius * radius) return;
		manifold.m_pointCount = 1;
		manifold.m_type = box2D.collision.B2Manifold.e_faceA;
		manifold.m_localPlaneNormal.x = cLocalX - v2.x;
		manifold.m_localPlaneNormal.y = cLocalY - v2.y;
		manifold.m_localPlaneNormal.normalize();
		manifold.m_localPoint.setV(v2);
		manifold.m_points[0].m_localPoint.setV(circle.m_p);
		manifold.m_points[0].m_id.setKey(0);
	} else {
		var faceCenterX = 0.5 * (v1.x + v2.x);
		var faceCenterY = 0.5 * (v1.y + v2.y);
		separation = (cLocalX - faceCenterX) * normals[vertIndex1].x + (cLocalY - faceCenterY) * normals[vertIndex1].y;
		if(separation > radius) return;
		manifold.m_pointCount = 1;
		manifold.m_type = box2D.collision.B2Manifold.e_faceA;
		manifold.m_localPlaneNormal.x = normals[vertIndex1].x;
		manifold.m_localPlaneNormal.y = normals[vertIndex1].y;
		manifold.m_localPlaneNormal.normalize();
		manifold.m_localPoint.set(faceCenterX,faceCenterY);
		manifold.m_points[0].m_localPoint.setV(circle.m_p);
		manifold.m_points[0].m_id.setKey(0);
	}
}
box2D.collision.B2Collision.testOverlap = function(a,b) {
	var t1 = b.lowerBound;
	var t2 = a.upperBound;
	var d1X = t1.x - t2.x;
	var d1Y = t1.y - t2.y;
	t1 = a.lowerBound;
	t2 = b.upperBound;
	var d2X = t1.x - t2.x;
	var d2Y = t1.y - t2.y;
	if(d1X > 0.0 || d1Y > 0.0) return false;
	if(d2X > 0.0 || d2Y > 0.0) return false;
	return true;
}
box2D.collision.B2ContactPoint = $hxClasses["box2D.collision.B2ContactPoint"] = function() {
	this.position = new box2D.common.math.B2Vec2();
	this.velocity = new box2D.common.math.B2Vec2();
	this.normal = new box2D.common.math.B2Vec2();
	this.id = new box2D.collision.B2ContactID();
};
box2D.collision.B2ContactPoint.__name__ = ["box2D","collision","B2ContactPoint"];
box2D.collision.B2ContactPoint.prototype = {
	id: null
	,restitution: null
	,friction: null
	,separation: null
	,normal: null
	,velocity: null
	,position: null
	,shape2: null
	,shape1: null
	,__class__: box2D.collision.B2ContactPoint
}
box2D.collision.B2Simplex = $hxClasses["box2D.collision.B2Simplex"] = function() {
	this.m_v1 = new box2D.collision.B2SimplexVertex();
	this.m_v2 = new box2D.collision.B2SimplexVertex();
	this.m_v3 = new box2D.collision.B2SimplexVertex();
	this.m_vertices = new Array();
	this.m_vertices[0] = this.m_v1;
	this.m_vertices[1] = this.m_v2;
	this.m_vertices[2] = this.m_v3;
};
box2D.collision.B2Simplex.__name__ = ["box2D","collision","B2Simplex"];
box2D.collision.B2Simplex.prototype = {
	m_count: null
	,m_vertices: null
	,m_v3: null
	,m_v2: null
	,m_v1: null
	,solve3: function() {
		var w1 = this.m_v1.w;
		var w2 = this.m_v2.w;
		var w3 = this.m_v3.w;
		var e12 = box2D.common.math.B2Math.subtractVV(w2,w1);
		var w1e12 = box2D.common.math.B2Math.dot(w1,e12);
		var w2e12 = box2D.common.math.B2Math.dot(w2,e12);
		var d12_1 = w2e12;
		var d12_2 = -w1e12;
		var e13 = box2D.common.math.B2Math.subtractVV(w3,w1);
		var w1e13 = box2D.common.math.B2Math.dot(w1,e13);
		var w3e13 = box2D.common.math.B2Math.dot(w3,e13);
		var d13_1 = w3e13;
		var d13_2 = -w1e13;
		var e23 = box2D.common.math.B2Math.subtractVV(w3,w2);
		var w2e23 = box2D.common.math.B2Math.dot(w2,e23);
		var w3e23 = box2D.common.math.B2Math.dot(w3,e23);
		var d23_1 = w3e23;
		var d23_2 = -w2e23;
		var n123 = box2D.common.math.B2Math.crossVV(e12,e13);
		var d123_1 = n123 * box2D.common.math.B2Math.crossVV(w2,w3);
		var d123_2 = n123 * box2D.common.math.B2Math.crossVV(w3,w1);
		var d123_3 = n123 * box2D.common.math.B2Math.crossVV(w1,w2);
		if(d12_2 <= 0.0 && d13_2 <= 0.0) {
			this.m_v1.a = 1.0;
			this.m_count = 1;
			return;
		}
		if(d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
			var inv_d12 = 1.0 / (d12_1 + d12_2);
			this.m_v1.a = d12_1 * inv_d12;
			this.m_v2.a = d12_2 * inv_d12;
			this.m_count = 2;
			return;
		}
		if(d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
			var inv_d13 = 1.0 / (d13_1 + d13_2);
			this.m_v1.a = d13_1 * inv_d13;
			this.m_v3.a = d13_2 * inv_d13;
			this.m_count = 2;
			this.m_v2.set(this.m_v3);
			return;
		}
		if(d12_1 <= 0.0 && d23_2 <= 0.0) {
			this.m_v2.a = 1.0;
			this.m_count = 1;
			this.m_v1.set(this.m_v2);
			return;
		}
		if(d13_1 <= 0.0 && d23_1 <= 0.0) {
			this.m_v3.a = 1.0;
			this.m_count = 1;
			this.m_v1.set(this.m_v3);
			return;
		}
		if(d23_1 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
			var inv_d23 = 1.0 / (d23_1 + d23_2);
			this.m_v2.a = d23_1 * inv_d23;
			this.m_v3.a = d23_2 * inv_d23;
			this.m_count = 2;
			this.m_v1.set(this.m_v3);
			return;
		}
		var inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
		this.m_v1.a = d123_1 * inv_d123;
		this.m_v2.a = d123_2 * inv_d123;
		this.m_v3.a = d123_3 * inv_d123;
		this.m_count = 3;
	}
	,solve2: function() {
		var w1 = this.m_v1.w;
		var w2 = this.m_v2.w;
		var e12 = box2D.common.math.B2Math.subtractVV(w2,w1);
		var d12_2 = -(w1.x * e12.x + w1.y * e12.y);
		if(d12_2 <= 0.0) {
			this.m_v1.a = 1.0;
			this.m_count = 1;
			return;
		}
		var d12_1 = w2.x * e12.x + w2.y * e12.y;
		if(d12_1 <= 0.0) {
			this.m_v2.a = 1.0;
			this.m_count = 1;
			this.m_v1.set(this.m_v2);
			return;
		}
		var inv_d12 = 1.0 / (d12_1 + d12_2);
		this.m_v1.a = d12_1 * inv_d12;
		this.m_v2.a = d12_2 * inv_d12;
		this.m_count = 2;
	}
	,getMetric: function() {
		switch(this.m_count) {
		case 0:
			box2D.common.B2Settings.b2Assert(false);
			return 0.0;
		case 1:
			return 0.0;
		case 2:
			return box2D.common.math.B2Math.subtractVV(this.m_v1.w,this.m_v2.w).length();
		case 3:
			return box2D.common.math.B2Math.crossVV(box2D.common.math.B2Math.subtractVV(this.m_v2.w,this.m_v1.w),box2D.common.math.B2Math.subtractVV(this.m_v3.w,this.m_v1.w));
		default:
			box2D.common.B2Settings.b2Assert(false);
			return 0.0;
		}
	}
	,getWitnessPoints: function(pA,pB) {
		switch(this.m_count) {
		case 0:
			box2D.common.B2Settings.b2Assert(false);
			break;
		case 1:
			pA.setV(this.m_v1.wA);
			pB.setV(this.m_v1.wB);
			break;
		case 2:
			pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
			pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
			pB.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
			pB.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
			break;
		case 3:
			pB.x = pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
			pB.y = pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
			break;
		default:
			box2D.common.B2Settings.b2Assert(false);
		}
	}
	,getClosestPoint: function() {
		switch(this.m_count) {
		case 0:
			box2D.common.B2Settings.b2Assert(false);
			return new box2D.common.math.B2Vec2();
		case 1:
			return this.m_v1.w;
		case 2:
			return new box2D.common.math.B2Vec2(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x,this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
		default:
			box2D.common.B2Settings.b2Assert(false);
			return new box2D.common.math.B2Vec2();
		}
	}
	,getSearchDirection: function() {
		switch(this.m_count) {
		case 1:
			return this.m_v1.w.getNegative();
		case 2:
			var e12 = box2D.common.math.B2Math.subtractVV(this.m_v2.w,this.m_v1.w);
			var sgn = box2D.common.math.B2Math.crossVV(e12,this.m_v1.w.getNegative());
			if(sgn > 0.0) return box2D.common.math.B2Math.crossFV(1.0,e12); else return box2D.common.math.B2Math.crossVF(e12,1.0);
			break;
		default:
			box2D.common.B2Settings.b2Assert(false);
			return new box2D.common.math.B2Vec2();
		}
	}
	,writeCache: function(cache) {
		cache.metric = this.getMetric();
		cache.count = this.m_count | 0;
		var vertices = this.m_vertices;
		var _g1 = 0, _g = this.m_count;
		while(_g1 < _g) {
			var i = _g1++;
			cache.indexA[i] = vertices[i].indexA | 0;
			cache.indexB[i] = vertices[i].indexB | 0;
		}
	}
	,readCache: function(cache,proxyA,transformA,proxyB,transformB) {
		box2D.common.B2Settings.b2Assert(0 <= cache.count && cache.count <= 3);
		var wALocal;
		var wBLocal;
		this.m_count = cache.count;
		var vertices = this.m_vertices;
		var v;
		var _g1 = 0, _g = this.m_count;
		while(_g1 < _g) {
			var i = _g1++;
			v = vertices[i];
			v.indexA = cache.indexA[i];
			v.indexB = cache.indexB[i];
			wALocal = proxyA.getVertex(v.indexA);
			wBLocal = proxyB.getVertex(v.indexB);
			v.wA = box2D.common.math.B2Math.mulX(transformA,wALocal);
			v.wB = box2D.common.math.B2Math.mulX(transformB,wBLocal);
			v.w = box2D.common.math.B2Math.subtractVV(v.wB,v.wA);
			v.a = 0;
		}
		if(this.m_count > 1) {
			var metric1 = cache.metric;
			var metric2 = this.getMetric();
			if(metric2 < .5 * metric1 || 2.0 * metric1 < metric2 || metric2 < Number.MIN_VALUE) this.m_count = 0;
		}
		if(this.m_count == 0) {
			v = vertices[0];
			v.indexA = 0;
			v.indexB = 0;
			wALocal = proxyA.getVertex(0);
			wBLocal = proxyB.getVertex(0);
			v.wA = box2D.common.math.B2Math.mulX(transformA,wALocal);
			v.wB = box2D.common.math.B2Math.mulX(transformB,wBLocal);
			v.w = box2D.common.math.B2Math.subtractVV(v.wB,v.wA);
			this.m_count = 1;
		}
	}
	,__class__: box2D.collision.B2Simplex
}
box2D.collision.B2SimplexVertex = $hxClasses["box2D.collision.B2SimplexVertex"] = function() {
};
box2D.collision.B2SimplexVertex.__name__ = ["box2D","collision","B2SimplexVertex"];
box2D.collision.B2SimplexVertex.prototype = {
	indexB: null
	,indexA: null
	,a: null
	,w: null
	,wB: null
	,wA: null
	,set: function(other) {
		this.wA.setV(other.wA);
		this.wB.setV(other.wB);
		this.w.setV(other.w);
		this.a = other.a;
		this.indexA = other.indexA;
		this.indexB = other.indexB;
	}
	,__class__: box2D.collision.B2SimplexVertex
}
box2D.collision.B2Distance = $hxClasses["box2D.collision.B2Distance"] = function() { }
box2D.collision.B2Distance.__name__ = ["box2D","collision","B2Distance"];
box2D.collision.B2Distance.b2_gjkCalls = null;
box2D.collision.B2Distance.b2_gjkIters = null;
box2D.collision.B2Distance.b2_gjkMaxIters = null;
box2D.collision.B2Distance.distance = function(output,cache,input) {
	++box2D.collision.B2Distance.b2_gjkCalls;
	var proxyA = input.proxyA;
	var proxyB = input.proxyB;
	var transformA = input.transformA;
	var transformB = input.transformB;
	var simplex = box2D.collision.B2Distance.s_simplex;
	simplex.readCache(cache,proxyA,transformA,proxyB,transformB);
	var vertices = simplex.m_vertices;
	var k_maxIters = 20;
	var saveA = box2D.collision.B2Distance.s_saveA;
	var saveB = box2D.collision.B2Distance.s_saveB;
	var saveCount = 0;
	var closestPoint = simplex.getClosestPoint();
	var distanceSqr1 = closestPoint.lengthSquared();
	var distanceSqr2 = distanceSqr1;
	var i;
	var p;
	var iter = 0;
	while(iter < k_maxIters) {
		saveCount = simplex.m_count;
		var _g = 0;
		while(_g < saveCount) {
			var i1 = _g++;
			saveA[i1] = vertices[i1].indexA;
			saveB[i1] = vertices[i1].indexB;
		}
		switch(simplex.m_count) {
		case 1:
			break;
		case 2:
			simplex.solve2();
			break;
		case 3:
			simplex.solve3();
			break;
		default:
			box2D.common.B2Settings.b2Assert(false);
		}
		if(simplex.m_count == 3) break;
		p = simplex.getClosestPoint();
		distanceSqr2 = p.lengthSquared();
		if(distanceSqr2 > distanceSqr1) {
		}
		distanceSqr1 = distanceSqr2;
		var d = simplex.getSearchDirection();
		if(d.lengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) break;
		var vertex = vertices[simplex.m_count];
		vertex.indexA = proxyA.getSupport(box2D.common.math.B2Math.mulTMV(transformA.R,d.getNegative())) | 0;
		vertex.wA = box2D.common.math.B2Math.mulX(transformA,proxyA.getVertex(vertex.indexA));
		vertex.indexB = proxyB.getSupport(box2D.common.math.B2Math.mulTMV(transformB.R,d)) | 0;
		vertex.wB = box2D.common.math.B2Math.mulX(transformB,proxyB.getVertex(vertex.indexB));
		vertex.w = box2D.common.math.B2Math.subtractVV(vertex.wB,vertex.wA);
		++iter;
		++box2D.collision.B2Distance.b2_gjkIters;
		var duplicate = false;
		var _g = 0;
		while(_g < saveCount) {
			var i1 = _g++;
			if(vertex.indexA == saveA[i1] && vertex.indexB == saveB[i1]) {
				duplicate = true;
				break;
			}
		}
		if(duplicate) break;
		++simplex.m_count;
	}
	box2D.collision.B2Distance.b2_gjkMaxIters = box2D.common.math.B2Math.max(box2D.collision.B2Distance.b2_gjkMaxIters,iter) | 0;
	simplex.getWitnessPoints(output.pointA,output.pointB);
	output.distance = box2D.common.math.B2Math.subtractVV(output.pointA,output.pointB).length();
	output.iterations = iter;
	simplex.writeCache(cache);
	if(input.useRadii) {
		var rA = proxyA.m_radius;
		var rB = proxyB.m_radius;
		if(output.distance > rA + rB && output.distance > Number.MIN_VALUE) {
			output.distance -= rA + rB;
			var normal = box2D.common.math.B2Math.subtractVV(output.pointB,output.pointA);
			normal.normalize();
			output.pointA.x += rA * normal.x;
			output.pointA.y += rA * normal.y;
			output.pointB.x -= rB * normal.x;
			output.pointB.y -= rB * normal.y;
		} else {
			p = new box2D.common.math.B2Vec2();
			p.x = .5 * (output.pointA.x + output.pointB.x);
			p.y = .5 * (output.pointA.y + output.pointB.y);
			output.pointA.x = output.pointB.x = p.x;
			output.pointA.y = output.pointB.y = p.y;
			output.distance = 0.0;
		}
	}
}
box2D.collision.B2DistanceInput = $hxClasses["box2D.collision.B2DistanceInput"] = function() {
};
box2D.collision.B2DistanceInput.__name__ = ["box2D","collision","B2DistanceInput"];
box2D.collision.B2DistanceInput.prototype = {
	useRadii: null
	,transformB: null
	,transformA: null
	,proxyB: null
	,proxyA: null
	,__class__: box2D.collision.B2DistanceInput
}
box2D.collision.B2DistanceOutput = $hxClasses["box2D.collision.B2DistanceOutput"] = function() {
	this.pointA = new box2D.common.math.B2Vec2();
	this.pointB = new box2D.common.math.B2Vec2();
};
box2D.collision.B2DistanceOutput.__name__ = ["box2D","collision","B2DistanceOutput"];
box2D.collision.B2DistanceOutput.prototype = {
	iterations: null
	,distance: null
	,pointB: null
	,pointA: null
	,__class__: box2D.collision.B2DistanceOutput
}
box2D.collision.B2DistanceProxy = $hxClasses["box2D.collision.B2DistanceProxy"] = function() {
	this.m_vertices = new Array();
};
box2D.collision.B2DistanceProxy.__name__ = ["box2D","collision","B2DistanceProxy"];
box2D.collision.B2DistanceProxy.prototype = {
	m_radius: null
	,m_count: null
	,m_vertices: null
	,getVertex: function(index) {
		box2D.common.B2Settings.b2Assert(0 <= index && index < this.m_count);
		return this.m_vertices[index];
	}
	,getVertexCount: function() {
		return this.m_count;
	}
	,getSupportVertex: function(d) {
		var bestIndex = 0;
		var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
		var _g1 = 1, _g = this.m_count;
		while(_g1 < _g) {
			var i = _g1++;
			var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
			if(value > bestValue) {
				bestIndex = i;
				bestValue = value;
			}
		}
		return this.m_vertices[bestIndex];
	}
	,getSupport: function(d) {
		var bestIndex = 0;
		var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
		var _g1 = 1, _g = this.m_count;
		while(_g1 < _g) {
			var i = _g1++;
			var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
			if(value > bestValue) {
				bestIndex = i;
				bestValue = value;
			}
		}
		return bestIndex;
	}
	,set: function(shape) {
		switch(shape.getType()) {
		case box2D.collision.shapes.B2Shape.e_circleShape:
			var circle = js.Boot.__cast(shape , box2D.collision.shapes.B2CircleShape);
			this.m_vertices = new Array();
			this.m_vertices[0] = circle.m_p;
			this.m_count = 1;
			this.m_radius = circle.m_radius;
			break;
		case box2D.collision.shapes.B2Shape.e_polygonShape:
			var polygon = js.Boot.__cast(shape , box2D.collision.shapes.B2PolygonShape);
			this.m_vertices = polygon.m_vertices;
			this.m_count = polygon.m_vertexCount;
			this.m_radius = polygon.m_radius;
			break;
		default:
			box2D.common.B2Settings.b2Assert(false);
		}
	}
	,__class__: box2D.collision.B2DistanceProxy
}
box2D.collision.B2DynamicTree = $hxClasses["box2D.collision.B2DynamicTree"] = function() {
	this.m_root = null;
	this.m_freeList = null;
	this.m_path = 0;
	this.m_insertionCount = 0;
};
box2D.collision.B2DynamicTree.__name__ = ["box2D","collision","B2DynamicTree"];
box2D.collision.B2DynamicTree.prototype = {
	m_insertionCount: null
	,m_path: null
	,m_freeList: null
	,m_root: null
	,removeLeaf: function(leaf) {
		if(leaf == this.m_root) {
			this.m_root = null;
			return;
		}
		var node2 = leaf.parent;
		var node1 = node2.parent;
		var sibling;
		if(node2.child1 == leaf) sibling = node2.child2; else sibling = node2.child1;
		if(node1 != null) {
			if(node1.child1 == node2) node1.child1 = sibling; else node1.child2 = sibling;
			sibling.parent = node1;
			this.freeNode(node2);
			while(node1 != null) {
				var oldAABB = node1.aabb;
				node1.aabb = new box2D.collision.B2AABB();
				node1.aabb.combine(node1.child1.aabb,node1.child2.aabb);
				if(oldAABB.contains(node1.aabb)) break;
				node1 = node1.parent;
			}
		} else {
			this.m_root = sibling;
			sibling.parent = null;
			this.freeNode(node2);
		}
	}
	,insertLeaf: function(leaf) {
		++this.m_insertionCount;
		if(this.m_root == null) {
			this.m_root = leaf;
			this.m_root.parent = null;
			return;
		}
		var center = leaf.aabb.getCenter();
		var sibling = this.m_root;
		if(sibling.isLeaf() == false) do {
			var child1 = sibling.child1;
			var child2 = sibling.child2;
			var norm1 = Math.abs((child1.aabb.lowerBound.x + child1.aabb.upperBound.x) / 2 - center.x) + Math.abs((child1.aabb.lowerBound.y + child1.aabb.upperBound.y) / 2 - center.y);
			var norm2 = Math.abs((child2.aabb.lowerBound.x + child2.aabb.upperBound.x) / 2 - center.x) + Math.abs((child2.aabb.lowerBound.y + child2.aabb.upperBound.y) / 2 - center.y);
			if(norm1 < norm2) sibling = child1; else sibling = child2;
		} while(sibling.isLeaf() == false);
		var node1 = sibling.parent;
		var node2 = this.allocateNode();
		node2.parent = node1;
		node2.userData = null;
		node2.aabb.combine(leaf.aabb,sibling.aabb);
		if(node1 != null) {
			if(sibling.parent.child1 == sibling) node1.child1 = node2; else node1.child2 = node2;
			node2.child1 = sibling;
			node2.child2 = leaf;
			sibling.parent = node2;
			leaf.parent = node2;
			do {
				if(node1.aabb.contains(node2.aabb)) break;
				node1.aabb.combine(node1.child1.aabb,node1.child2.aabb);
				node2 = node1;
				node1 = node1.parent;
			} while(node1 != null);
		} else {
			node2.child1 = sibling;
			node2.child2 = leaf;
			sibling.parent = node2;
			leaf.parent = node2;
			this.m_root = node2;
		}
	}
	,freeNode: function(node) {
		node.parent = this.m_freeList;
		this.m_freeList = node;
	}
	,allocateNode: function() {
		if(this.m_freeList != null) {
			var node = this.m_freeList;
			this.m_freeList = node.parent;
			node.parent = null;
			node.child1 = null;
			node.child2 = null;
			return node;
		}
		return new box2D.collision.B2DynamicTreeNode();
	}
	,rayCast: function(callbackMethod,input) {
		if(this.m_root == null) return;
		var p1 = input.p1;
		var p2 = input.p2;
		var r = box2D.common.math.B2Math.subtractVV(p1,p2);
		r.normalize();
		var v = box2D.common.math.B2Math.crossFV(1.0,r);
		var abs_v = box2D.common.math.B2Math.absV(v);
		var maxFraction = input.maxFraction;
		var segmentAABB = new box2D.collision.B2AABB();
		var tX;
		var tY;
		tX = p1.x + maxFraction * (p2.x - p1.x);
		tY = p1.y + maxFraction * (p2.y - p1.y);
		segmentAABB.lowerBound.x = Math.min(p1.x,tX);
		segmentAABB.lowerBound.y = Math.min(p1.y,tY);
		segmentAABB.upperBound.x = Math.max(p1.x,tX);
		segmentAABB.upperBound.y = Math.max(p1.y,tY);
		var stack = new Array();
		var count = 0;
		stack[count++] = this.m_root;
		while(count > 0) {
			var node = stack[--count];
			if(node.aabb.testOverlap(segmentAABB) == false) continue;
			var c = node.aabb.getCenter();
			var h = node.aabb.getExtents();
			var separation = Math.abs(v.x * (p1.x - c.x) + v.y * (p1.y - c.y)) - abs_v.x * h.x - abs_v.y * h.y;
			if(separation > 0.0) continue;
			if(node.isLeaf()) {
				var subInput = new box2D.collision.B2RayCastInput();
				subInput.p1 = input.p1;
				subInput.p2 = input.p2;
				subInput.maxFraction = input.maxFraction;
				maxFraction = callbackMethod(subInput,node);
				if(maxFraction == 0.0) return;
				tX = p1.x + maxFraction * (p2.x - p1.x);
				tY = p1.y + maxFraction * (p2.y - p1.y);
				segmentAABB.lowerBound.x = Math.min(p1.x,tX);
				segmentAABB.lowerBound.y = Math.min(p1.y,tY);
				segmentAABB.upperBound.x = Math.max(p1.x,tX);
				segmentAABB.upperBound.y = Math.max(p1.y,tY);
			} else {
				stack[count++] = node.child1;
				stack[count++] = node.child2;
			}
		}
	}
	,query: function(callbackMethod,aabb) {
		if(this.m_root == null) return;
		var stack = new Array();
		var count = 0;
		stack[count++] = this.m_root;
		while(count > 0) {
			var node = stack[--count];
			if(node.aabb.testOverlap(aabb)) {
				if(node.isLeaf()) {
					var proceed = callbackMethod(node);
					if(!proceed) return;
				} else {
					stack[count++] = node.child1;
					stack[count++] = node.child2;
				}
			}
		}
	}
	,getUserData: function(proxy) {
		return proxy.userData;
	}
	,getFatAABB: function(proxy) {
		return proxy.aabb;
	}
	,rebalance: function(iterations) {
		if(this.m_root == null) return;
		var _g = 0;
		while(_g < iterations) {
			var i = _g++;
			var node = this.m_root;
			var bit = 0;
			while(node.isLeaf() == false) {
				node = (this.m_path >> bit & 1) != 0?node.child2:node.child1;
				bit = bit + 1 & 31;
			}
			++this.m_path;
			this.removeLeaf(node);
			this.insertLeaf(node);
		}
	}
	,moveProxy: function(proxy,aabb,displacement) {
		box2D.common.B2Settings.b2Assert(proxy.isLeaf());
		if(proxy.aabb.contains(aabb)) return false;
		this.removeLeaf(proxy);
		var extendX = box2D.common.B2Settings.b2_aabbExtension + box2D.common.B2Settings.b2_aabbMultiplier * (displacement.x > 0?displacement.x:-displacement.x);
		var extendY = box2D.common.B2Settings.b2_aabbExtension + box2D.common.B2Settings.b2_aabbMultiplier * (displacement.y > 0?displacement.y:-displacement.y);
		proxy.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
		proxy.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
		proxy.aabb.upperBound.x = aabb.upperBound.x + extendX;
		proxy.aabb.upperBound.y = aabb.upperBound.y + extendY;
		this.insertLeaf(proxy);
		return true;
	}
	,destroyProxy: function(proxy) {
		this.removeLeaf(proxy);
		this.freeNode(proxy);
	}
	,createProxy: function(aabb,userData) {
		var node = this.allocateNode();
		var extendX = box2D.common.B2Settings.b2_aabbExtension;
		var extendY = box2D.common.B2Settings.b2_aabbExtension;
		node.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
		node.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
		node.aabb.upperBound.x = aabb.upperBound.x + extendX;
		node.aabb.upperBound.y = aabb.upperBound.y + extendY;
		node.userData = userData;
		this.insertLeaf(node);
		return node;
	}
	,__class__: box2D.collision.B2DynamicTree
}
box2D.collision.IBroadPhase = $hxClasses["box2D.collision.IBroadPhase"] = function() { }
box2D.collision.IBroadPhase.__name__ = ["box2D","collision","IBroadPhase"];
box2D.collision.IBroadPhase.prototype = {
	rebalance: null
	,validate: null
	,rayCast: null
	,query: null
	,updatePairs: null
	,getProxyCount: null
	,getFatAABB: null
	,getUserData: null
	,testOverlap: null
	,moveProxy: null
	,destroyProxy: null
	,createProxy: null
	,__class__: box2D.collision.IBroadPhase
}
box2D.collision.B2DynamicTreeBroadPhase = $hxClasses["box2D.collision.B2DynamicTreeBroadPhase"] = function() {
	this.m_tree = new box2D.collision.B2DynamicTree();
	this.m_moveBuffer = new Array();
	this.m_pairBuffer = new Array();
	this.m_pairCount = 0;
};
box2D.collision.B2DynamicTreeBroadPhase.__name__ = ["box2D","collision","B2DynamicTreeBroadPhase"];
box2D.collision.B2DynamicTreeBroadPhase.__interfaces__ = [box2D.collision.IBroadPhase];
box2D.collision.B2DynamicTreeBroadPhase.prototype = {
	m_pairCount: null
	,m_pairBuffer: null
	,m_moveBuffer: null
	,m_proxyCount: null
	,m_tree: null
	,comparePairs: function(pair1,pair2) {
		return 0;
	}
	,unBufferMove: function(proxy) {
		HxOverrides.remove(this.m_moveBuffer,proxy);
	}
	,bufferMove: function(proxy) {
		this.m_moveBuffer[this.m_moveBuffer.length] = proxy;
	}
	,rebalance: function(iterations) {
		this.m_tree.rebalance(iterations);
	}
	,validate: function() {
	}
	,rayCast: function(callbackMethod,input) {
		this.m_tree.rayCast(callbackMethod,input);
	}
	,query: function(callbackMethod,aabb) {
		this.m_tree.query(callbackMethod,aabb);
	}
	,updatePairs: function(callbackMethod) {
		var _g2 = this;
		this.m_pairCount = 0;
		var _g = 0, _g1 = this.m_moveBuffer;
		while(_g < _g1.length) {
			var queryProxy = [_g1[_g]];
			++_g;
			var queryCallback = (function(queryProxy) {
				return function(proxy) {
					if(proxy == queryProxy[0]) return true;
					if(_g2.m_pairCount == _g2.m_pairBuffer.length) _g2.m_pairBuffer[_g2.m_pairCount] = new box2D.collision.B2DynamicTreePair();
					var pair = _g2.m_pairBuffer[_g2.m_pairCount];
					if(proxy.id < queryProxy[0].id) {
						pair.proxyA = proxy;
						pair.proxyB = queryProxy[0];
					} else {
						pair.proxyA = queryProxy[0];
						pair.proxyB = proxy;
					}
					++_g2.m_pairCount;
					return true;
				};
			})(queryProxy);
			var fatAABB = this.m_tree.getFatAABB(queryProxy[0]);
			this.m_tree.query(queryCallback,fatAABB);
		}
		this.m_moveBuffer = new Array();
		var pairing = true;
		var i = 0;
		while(pairing) if(i >= this.m_pairCount) pairing = false; else {
			var primaryPair = this.m_pairBuffer[i];
			var userDataA = this.m_tree.getUserData(primaryPair.proxyA);
			var userDataB = this.m_tree.getUserData(primaryPair.proxyB);
			callbackMethod(userDataA,userDataB);
			++i;
			while(i < this.m_pairCount) {
				var pair = this.m_pairBuffer[i];
				if(pair.proxyA != primaryPair.proxyA || pair.proxyB != primaryPair.proxyB) break;
				++i;
			}
		}
	}
	,getProxyCount: function() {
		return this.m_proxyCount;
	}
	,getFatAABB: function(proxy) {
		return this.m_tree.getFatAABB(proxy);
	}
	,getUserData: function(proxy) {
		return this.m_tree.getUserData(proxy);
	}
	,testOverlap: function(proxyA,proxyB) {
		var aabbA = this.m_tree.getFatAABB(proxyA);
		var aabbB = this.m_tree.getFatAABB(proxyB);
		return aabbA.testOverlap(aabbB);
	}
	,moveProxy: function(proxy,aabb,displacement) {
		var buffer = this.m_tree.moveProxy(proxy,aabb,displacement);
		if(buffer) this.bufferMove(proxy);
	}
	,destroyProxy: function(proxy) {
		this.unBufferMove(proxy);
		--this.m_proxyCount;
		this.m_tree.destroyProxy(proxy);
	}
	,createProxy: function(aabb,userData) {
		var proxy = this.m_tree.createProxy(aabb,userData);
		++this.m_proxyCount;
		this.bufferMove(proxy);
		return proxy;
	}
	,__class__: box2D.collision.B2DynamicTreeBroadPhase
}
box2D.collision.B2DynamicTreeNode = $hxClasses["box2D.collision.B2DynamicTreeNode"] = function() {
	this.aabb = new box2D.collision.B2AABB();
	this.id = box2D.collision.B2DynamicTreeNode.currentID++;
};
box2D.collision.B2DynamicTreeNode.__name__ = ["box2D","collision","B2DynamicTreeNode"];
box2D.collision.B2DynamicTreeNode.prototype = {
	child2: null
	,child1: null
	,parent: null
	,aabb: null
	,userData: null
	,isLeaf: function() {
		return this.child1 == null;
	}
	,id: null
	,__class__: box2D.collision.B2DynamicTreeNode
}
box2D.collision.B2DynamicTreePair = $hxClasses["box2D.collision.B2DynamicTreePair"] = function() {
};
box2D.collision.B2DynamicTreePair.__name__ = ["box2D","collision","B2DynamicTreePair"];
box2D.collision.B2DynamicTreePair.prototype = {
	proxyB: null
	,proxyA: null
	,__class__: box2D.collision.B2DynamicTreePair
}
box2D.collision.B2Manifold = $hxClasses["box2D.collision.B2Manifold"] = function() {
	this.m_pointCount = 0;
	this.m_points = new Array();
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
	while(_g1 < _g) {
		var i = _g1++;
		this.m_points[i] = new box2D.collision.B2ManifoldPoint();
	}
	this.m_localPlaneNormal = new box2D.common.math.B2Vec2();
	this.m_localPoint = new box2D.common.math.B2Vec2();
};
box2D.collision.B2Manifold.__name__ = ["box2D","collision","B2Manifold"];
box2D.collision.B2Manifold.prototype = {
	m_pointCount: null
	,m_type: null
	,m_localPoint: null
	,m_localPlaneNormal: null
	,m_points: null
	,copy: function() {
		var copy = new box2D.collision.B2Manifold();
		copy.set(this);
		return copy;
	}
	,set: function(m) {
		this.m_pointCount = m.m_pointCount;
		var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_points[i].set(m.m_points[i]);
		}
		this.m_localPlaneNormal.setV(m.m_localPlaneNormal);
		this.m_localPoint.setV(m.m_localPoint);
		this.m_type = m.m_type;
	}
	,reset: function() {
		var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_points[i].reset();
		}
		this.m_localPlaneNormal.setZero();
		this.m_localPoint.setZero();
		this.m_type = 0;
		this.m_pointCount = 0;
	}
	,__class__: box2D.collision.B2Manifold
}
box2D.collision.B2ManifoldPoint = $hxClasses["box2D.collision.B2ManifoldPoint"] = function() {
	this.m_localPoint = new box2D.common.math.B2Vec2();
	this.m_id = new box2D.collision.B2ContactID();
	this.reset();
};
box2D.collision.B2ManifoldPoint.__name__ = ["box2D","collision","B2ManifoldPoint"];
box2D.collision.B2ManifoldPoint.prototype = {
	m_id: null
	,m_tangentImpulse: null
	,m_normalImpulse: null
	,m_localPoint: null
	,set: function(m) {
		this.m_localPoint.setV(m.m_localPoint);
		this.m_normalImpulse = m.m_normalImpulse;
		this.m_tangentImpulse = m.m_tangentImpulse;
		this.m_id.set(m.m_id);
	}
	,reset: function() {
		this.m_localPoint.setZero();
		this.m_normalImpulse = 0.0;
		this.m_tangentImpulse = 0.0;
		this.m_id.setKey(0);
	}
	,__class__: box2D.collision.B2ManifoldPoint
}
box2D.collision.B2OBB = $hxClasses["box2D.collision.B2OBB"] = function() {
	this.R = new box2D.common.math.B2Mat22();
	this.center = new box2D.common.math.B2Vec2();
	this.extents = new box2D.common.math.B2Vec2();
};
box2D.collision.B2OBB.__name__ = ["box2D","collision","B2OBB"];
box2D.collision.B2OBB.prototype = {
	extents: null
	,center: null
	,R: null
	,__class__: box2D.collision.B2OBB
}
box2D.collision.B2RayCastInput = $hxClasses["box2D.collision.B2RayCastInput"] = function(p1,p2,maxFraction) {
	if(maxFraction == null) maxFraction = 1;
	this.p1 = new box2D.common.math.B2Vec2();
	this.p2 = new box2D.common.math.B2Vec2();
	if(p1 != null) this.p1.setV(p1);
	if(p2 != null) this.p2.setV(p2);
	this.maxFraction = maxFraction;
};
box2D.collision.B2RayCastInput.__name__ = ["box2D","collision","B2RayCastInput"];
box2D.collision.B2RayCastInput.prototype = {
	maxFraction: null
	,p2: null
	,p1: null
	,__class__: box2D.collision.B2RayCastInput
}
box2D.collision.B2RayCastOutput = $hxClasses["box2D.collision.B2RayCastOutput"] = function() {
	this.normal = new box2D.common.math.B2Vec2();
};
box2D.collision.B2RayCastOutput.__name__ = ["box2D","collision","B2RayCastOutput"];
box2D.collision.B2RayCastOutput.prototype = {
	fraction: null
	,normal: null
	,__class__: box2D.collision.B2RayCastOutput
}
box2D.collision.B2SeparationFunction = $hxClasses["box2D.collision.B2SeparationFunction"] = function() {
	this.m_localPoint = new box2D.common.math.B2Vec2();
	this.m_axis = new box2D.common.math.B2Vec2();
};
box2D.collision.B2SeparationFunction.__name__ = ["box2D","collision","B2SeparationFunction"];
box2D.collision.B2SeparationFunction.prototype = {
	m_axis: null
	,m_localPoint: null
	,m_type: null
	,m_proxyB: null
	,m_proxyA: null
	,evaluate: function(transformA,transformB) {
		var axisA;
		var axisB;
		var localPointA;
		var localPointB;
		var pointA;
		var pointB;
		var seperation;
		var normal;
		switch(this.m_type) {
		case box2D.collision.B2SeparationFunction.e_points:
			axisA = box2D.common.math.B2Math.mulTMV(transformA.R,this.m_axis);
			axisB = box2D.common.math.B2Math.mulTMV(transformB.R,this.m_axis.getNegative());
			localPointA = this.m_proxyA.getSupportVertex(axisA);
			localPointB = this.m_proxyB.getSupportVertex(axisB);
			pointA = box2D.common.math.B2Math.mulX(transformA,localPointA);
			pointB = box2D.common.math.B2Math.mulX(transformB,localPointB);
			seperation = (pointB.x - pointA.x) * this.m_axis.x + (pointB.y - pointA.y) * this.m_axis.y;
			return seperation;
		case box2D.collision.B2SeparationFunction.e_faceA:
			normal = box2D.common.math.B2Math.mulMV(transformA.R,this.m_axis);
			pointA = box2D.common.math.B2Math.mulX(transformA,this.m_localPoint);
			axisB = box2D.common.math.B2Math.mulTMV(transformB.R,normal.getNegative());
			localPointB = this.m_proxyB.getSupportVertex(axisB);
			pointB = box2D.common.math.B2Math.mulX(transformB,localPointB);
			seperation = (pointB.x - pointA.x) * normal.x + (pointB.y - pointA.y) * normal.y;
			return seperation;
		case box2D.collision.B2SeparationFunction.e_faceB:
			normal = box2D.common.math.B2Math.mulMV(transformB.R,this.m_axis);
			pointB = box2D.common.math.B2Math.mulX(transformB,this.m_localPoint);
			axisA = box2D.common.math.B2Math.mulTMV(transformA.R,normal.getNegative());
			localPointA = this.m_proxyA.getSupportVertex(axisA);
			pointA = box2D.common.math.B2Math.mulX(transformA,localPointA);
			seperation = (pointA.x - pointB.x) * normal.x + (pointA.y - pointB.y) * normal.y;
			return seperation;
		default:
			box2D.common.B2Settings.b2Assert(false);
			return 0.0;
		}
	}
	,initialize: function(cache,proxyA,transformA,proxyB,transformB) {
		this.m_proxyA = proxyA;
		this.m_proxyB = proxyB;
		var count = cache.count;
		box2D.common.B2Settings.b2Assert(0 < count && count < 3);
		var localPointA = new box2D.common.math.B2Vec2();
		var localPointA1;
		var localPointA2;
		var localPointB = new box2D.common.math.B2Vec2();
		var localPointB1;
		var localPointB2;
		var pointAX;
		var pointAY;
		var pointBX;
		var pointBY;
		var normalX;
		var normalY;
		var tMat;
		var tVec;
		var s;
		var sgn;
		if(count == 1) {
			this.m_type = box2D.collision.B2SeparationFunction.e_points;
			localPointA = this.m_proxyA.getVertex(cache.indexA[0]);
			localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
			tVec = localPointA;
			tMat = transformA.R;
			pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tVec = localPointB;
			tMat = transformB.R;
			pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			this.m_axis.x = pointBX - pointAX;
			this.m_axis.y = pointBY - pointAY;
			this.m_axis.normalize();
		} else if(cache.indexB[0] == cache.indexB[1]) {
			this.m_type = box2D.collision.B2SeparationFunction.e_faceA;
			localPointA1 = this.m_proxyA.getVertex(cache.indexA[0]);
			localPointA2 = this.m_proxyA.getVertex(cache.indexA[1]);
			localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
			this.m_localPoint.x = 0.5 * (localPointA1.x + localPointA2.x);
			this.m_localPoint.y = 0.5 * (localPointA1.y + localPointA2.y);
			this.m_axis = box2D.common.math.B2Math.crossVF(box2D.common.math.B2Math.subtractVV(localPointA2,localPointA1),1.0);
			this.m_axis.normalize();
			tVec = this.m_axis;
			tMat = transformA.R;
			normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tVec = this.m_localPoint;
			tMat = transformA.R;
			pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tVec = localPointB;
			tMat = transformB.R;
			pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			s = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
			if(s < 0.0) this.m_axis.negativeSelf();
		} else if(cache.indexA[0] == cache.indexA[0]) {
			this.m_type = box2D.collision.B2SeparationFunction.e_faceB;
			localPointB1 = this.m_proxyB.getVertex(cache.indexB[0]);
			localPointB2 = this.m_proxyB.getVertex(cache.indexB[1]);
			localPointA = this.m_proxyA.getVertex(cache.indexA[0]);
			this.m_localPoint.x = 0.5 * (localPointB1.x + localPointB2.x);
			this.m_localPoint.y = 0.5 * (localPointB1.y + localPointB2.y);
			this.m_axis = box2D.common.math.B2Math.crossVF(box2D.common.math.B2Math.subtractVV(localPointB2,localPointB1),1.0);
			this.m_axis.normalize();
			tVec = this.m_axis;
			tMat = transformB.R;
			normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tVec = this.m_localPoint;
			tMat = transformB.R;
			pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tVec = localPointA;
			tMat = transformA.R;
			pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			s = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
			if(s < 0.0) this.m_axis.negativeSelf();
		} else {
			localPointA1 = this.m_proxyA.getVertex(cache.indexA[0]);
			localPointA2 = this.m_proxyA.getVertex(cache.indexA[1]);
			localPointB1 = this.m_proxyB.getVertex(cache.indexB[0]);
			localPointB2 = this.m_proxyB.getVertex(cache.indexB[1]);
			var pA = box2D.common.math.B2Math.mulX(transformA,localPointA);
			var dA = box2D.common.math.B2Math.mulMV(transformA.R,box2D.common.math.B2Math.subtractVV(localPointA2,localPointA1));
			var pB = box2D.common.math.B2Math.mulX(transformB,localPointB);
			var dB = box2D.common.math.B2Math.mulMV(transformB.R,box2D.common.math.B2Math.subtractVV(localPointB2,localPointB1));
			var a = dA.x * dA.x + dA.y * dA.y;
			var e = dB.x * dB.x + dB.y * dB.y;
			var r = box2D.common.math.B2Math.subtractVV(dB,dA);
			var c = dA.x * r.x + dA.y * r.y;
			var f = dB.x * r.x + dB.y * r.y;
			var b = dA.x * dB.x + dA.y * dB.y;
			var denom = a * e - b * b;
			s = 0.0;
			if(denom != 0.0) s = box2D.common.math.B2Math.clamp((b * f - c * e) / denom,0.0,1.0);
			var t = (b * s + f) / e;
			if(t < 0.0) {
				t = 0.0;
				s = box2D.common.math.B2Math.clamp((b - c) / a,0.0,1.0);
			}
			localPointA = new box2D.common.math.B2Vec2();
			localPointA.x = localPointA1.x + s * (localPointA2.x - localPointA1.x);
			localPointA.y = localPointA1.y + s * (localPointA2.y - localPointA1.y);
			localPointB = new box2D.common.math.B2Vec2();
			localPointB.x = localPointB1.x + s * (localPointB2.x - localPointB1.x);
			localPointB.y = localPointB1.y + s * (localPointB2.y - localPointB1.y);
			if(s == 0.0 || s == 1.0) {
				this.m_type = box2D.collision.B2SeparationFunction.e_faceB;
				this.m_axis = box2D.common.math.B2Math.crossVF(box2D.common.math.B2Math.subtractVV(localPointB2,localPointB1),1.0);
				this.m_axis.normalize();
				this.m_localPoint = localPointB;
				tVec = this.m_axis;
				tMat = transformB.R;
				normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
				normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
				tVec = this.m_localPoint;
				tMat = transformB.R;
				pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				tVec = localPointA;
				tMat = transformA.R;
				pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				sgn = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
				if(s < 0.0) this.m_axis.negativeSelf();
			} else {
				this.m_type = box2D.collision.B2SeparationFunction.e_faceA;
				this.m_axis = box2D.common.math.B2Math.crossVF(box2D.common.math.B2Math.subtractVV(localPointA2,localPointA1),1.0);
				this.m_localPoint = localPointA;
				tVec = this.m_axis;
				tMat = transformA.R;
				normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
				normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
				tVec = this.m_localPoint;
				tMat = transformA.R;
				pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				tVec = localPointB;
				tMat = transformB.R;
				pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				sgn = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
				if(s < 0.0) this.m_axis.negativeSelf();
			}
		}
	}
	,__class__: box2D.collision.B2SeparationFunction
}
box2D.collision.B2SimplexCache = $hxClasses["box2D.collision.B2SimplexCache"] = function() {
	this.indexA = new Array();
	this.indexB = new Array();
};
box2D.collision.B2SimplexCache.__name__ = ["box2D","collision","B2SimplexCache"];
box2D.collision.B2SimplexCache.prototype = {
	indexB: null
	,indexA: null
	,count: null
	,metric: null
	,__class__: box2D.collision.B2SimplexCache
}
box2D.collision.B2TOIInput = $hxClasses["box2D.collision.B2TOIInput"] = function() {
	this.proxyA = new box2D.collision.B2DistanceProxy();
	this.proxyB = new box2D.collision.B2DistanceProxy();
	this.sweepA = new box2D.common.math.B2Sweep();
	this.sweepB = new box2D.common.math.B2Sweep();
};
box2D.collision.B2TOIInput.__name__ = ["box2D","collision","B2TOIInput"];
box2D.collision.B2TOIInput.prototype = {
	tolerance: null
	,sweepB: null
	,sweepA: null
	,proxyB: null
	,proxyA: null
	,__class__: box2D.collision.B2TOIInput
}
box2D.common.math.B2Transform = $hxClasses["box2D.common.math.B2Transform"] = function(pos,r) {
	this.position = new box2D.common.math.B2Vec2();
	this.R = new box2D.common.math.B2Mat22();
	if(pos != null) {
		this.position.setV(pos);
		this.R.setM(r);
	}
};
box2D.common.math.B2Transform.__name__ = ["box2D","common","math","B2Transform"];
box2D.common.math.B2Transform.prototype = {
	R: null
	,position: null
	,getAngle: function() {
		return Math.atan2(this.R.col1.y,this.R.col1.x);
	}
	,set: function(x) {
		this.position.setV(x.position);
		this.R.setM(x.R);
	}
	,setIdentity: function() {
		this.position.setZero();
		this.R.setIdentity();
	}
	,initialize: function(pos,r) {
		this.position.setV(pos);
		this.R.setM(r);
	}
	,__class__: box2D.common.math.B2Transform
}
box2D.common.math.B2Mat22 = $hxClasses["box2D.common.math.B2Mat22"] = function() {
	this.col1 = new box2D.common.math.B2Vec2(0,1.0);
	this.col2 = new box2D.common.math.B2Vec2(0,1.0);
};
box2D.common.math.B2Mat22.__name__ = ["box2D","common","math","B2Mat22"];
box2D.common.math.B2Mat22.fromAngle = function(angle) {
	var mat = new box2D.common.math.B2Mat22();
	mat.set(angle);
	return mat;
}
box2D.common.math.B2Mat22.fromVV = function(c1,c2) {
	var mat = new box2D.common.math.B2Mat22();
	mat.setVV(c1,c2);
	return mat;
}
box2D.common.math.B2Mat22.prototype = {
	col2: null
	,col1: null
	,abs: function() {
		this.col1.abs();
		this.col2.abs();
	}
	,solve: function(out,bX,bY) {
		var a11 = this.col1.x;
		var a12 = this.col2.x;
		var a21 = this.col1.y;
		var a22 = this.col2.y;
		var det = a11 * a22 - a12 * a21;
		if(det != 0.0) det = 1.0 / det;
		out.x = det * (a22 * bX - a12 * bY);
		out.y = det * (a11 * bY - a21 * bX);
		return out;
	}
	,getInverse: function(out) {
		var a = this.col1.x;
		var b = this.col2.x;
		var c = this.col1.y;
		var d = this.col2.y;
		var det = a * d - b * c;
		if(det != 0.0) det = 1.0 / det;
		out.col1.x = det * d;
		out.col2.x = -det * b;
		out.col1.y = -det * c;
		out.col2.y = det * a;
		return out;
	}
	,getAngle: function() {
		return Math.atan2(this.col1.y,this.col1.x);
	}
	,setZero: function() {
		this.col1.x = 0.0;
		this.col2.x = 0.0;
		this.col1.y = 0.0;
		this.col2.y = 0.0;
	}
	,setIdentity: function() {
		this.col1.x = 1.0;
		this.col2.x = 0.0;
		this.col1.y = 0.0;
		this.col2.y = 1.0;
	}
	,addM: function(m) {
		this.col1.x += m.col1.x;
		this.col1.y += m.col1.y;
		this.col2.x += m.col2.x;
		this.col2.y += m.col2.y;
	}
	,setM: function(m) {
		this.col1.setV(m.col1);
		this.col2.setV(m.col2);
	}
	,copy: function() {
		var mat = new box2D.common.math.B2Mat22();
		mat.setM(this);
		return mat;
	}
	,setVV: function(c1,c2) {
		this.col1.setV(c1);
		this.col2.setV(c2);
	}
	,set: function(angle) {
		var c = Math.cos(angle);
		var s = Math.sin(angle);
		this.col1.x = c;
		this.col2.x = -s;
		this.col1.y = s;
		this.col2.y = c;
	}
	,__class__: box2D.common.math.B2Mat22
}
box2D.collision.B2TimeOfImpact = $hxClasses["box2D.collision.B2TimeOfImpact"] = function() { }
box2D.collision.B2TimeOfImpact.__name__ = ["box2D","collision","B2TimeOfImpact"];
box2D.collision.B2TimeOfImpact.timeOfImpact = function(input) {
	++box2D.collision.B2TimeOfImpact.b2_toiCalls;
	var proxyA = input.proxyA;
	var proxyB = input.proxyB;
	var sweepA = input.sweepA;
	var sweepB = input.sweepB;
	box2D.common.B2Settings.b2Assert(sweepA.t0 == sweepB.t0);
	box2D.common.B2Settings.b2Assert(1.0 - sweepA.t0 > Number.MIN_VALUE);
	var radius = proxyA.m_radius + proxyB.m_radius;
	var tolerance = input.tolerance;
	var alpha = 0.0;
	var k_maxIterations = 1000;
	var iter = 0;
	var target = 0.0;
	box2D.collision.B2TimeOfImpact.s_cache.count = 0;
	box2D.collision.B2TimeOfImpact.s_distanceInput.useRadii = false;
	while(true) {
		sweepA.getTransform(box2D.collision.B2TimeOfImpact.s_xfA,alpha);
		sweepB.getTransform(box2D.collision.B2TimeOfImpact.s_xfB,alpha);
		box2D.collision.B2TimeOfImpact.s_distanceInput.proxyA = proxyA;
		box2D.collision.B2TimeOfImpact.s_distanceInput.proxyB = proxyB;
		box2D.collision.B2TimeOfImpact.s_distanceInput.transformA = box2D.collision.B2TimeOfImpact.s_xfA;
		box2D.collision.B2TimeOfImpact.s_distanceInput.transformB = box2D.collision.B2TimeOfImpact.s_xfB;
		box2D.collision.B2Distance.distance(box2D.collision.B2TimeOfImpact.s_distanceOutput,box2D.collision.B2TimeOfImpact.s_cache,box2D.collision.B2TimeOfImpact.s_distanceInput);
		if(box2D.collision.B2TimeOfImpact.s_distanceOutput.distance <= 0.0) {
			alpha = 1.0;
			break;
		}
		box2D.collision.B2TimeOfImpact.s_fcn.initialize(box2D.collision.B2TimeOfImpact.s_cache,proxyA,box2D.collision.B2TimeOfImpact.s_xfA,proxyB,box2D.collision.B2TimeOfImpact.s_xfB);
		var separation = box2D.collision.B2TimeOfImpact.s_fcn.evaluate(box2D.collision.B2TimeOfImpact.s_xfA,box2D.collision.B2TimeOfImpact.s_xfB);
		if(separation <= 0.0) {
			alpha = 1.0;
			break;
		}
		if(iter == 0) {
			if(separation > radius) target = box2D.common.math.B2Math.max(radius - tolerance,0.75 * radius); else target = box2D.common.math.B2Math.max(separation - tolerance,0.02 * radius);
		}
		if(separation - target < 0.5 * tolerance) {
			if(iter == 0) {
				alpha = 1.0;
				break;
			}
			break;
		}
		var newAlpha = alpha;
		var x1 = alpha;
		var x2 = 1.0;
		var f1 = separation;
		sweepA.getTransform(box2D.collision.B2TimeOfImpact.s_xfA,x2);
		sweepB.getTransform(box2D.collision.B2TimeOfImpact.s_xfB,x2);
		var f2 = box2D.collision.B2TimeOfImpact.s_fcn.evaluate(box2D.collision.B2TimeOfImpact.s_xfA,box2D.collision.B2TimeOfImpact.s_xfB);
		if(f2 >= target) {
			alpha = 1.0;
			break;
		}
		var rootIterCount = 0;
		while(true) {
			var x;
			if((rootIterCount & 1) != 0) x = x1 + (target - f1) * (x2 - x1) / (f2 - f1); else x = 0.5 * (x1 + x2);
			sweepA.getTransform(box2D.collision.B2TimeOfImpact.s_xfA,x);
			sweepB.getTransform(box2D.collision.B2TimeOfImpact.s_xfB,x);
			var f = box2D.collision.B2TimeOfImpact.s_fcn.evaluate(box2D.collision.B2TimeOfImpact.s_xfA,box2D.collision.B2TimeOfImpact.s_xfB);
			if(box2D.common.math.B2Math.abs(f - target) < 0.025 * tolerance) {
				newAlpha = x;
				break;
			}
			if(f > target) {
				x1 = x;
				f1 = f;
			} else {
				x2 = x;
				f2 = f;
			}
			++rootIterCount;
			++box2D.collision.B2TimeOfImpact.b2_toiRootIters;
			if(rootIterCount == 50) break;
		}
		box2D.collision.B2TimeOfImpact.b2_toiMaxRootIters = box2D.common.math.B2Math.max(box2D.collision.B2TimeOfImpact.b2_toiMaxRootIters,rootIterCount) | 0;
		if(newAlpha < (1.0 + 100.0 * Number.MIN_VALUE) * alpha) break;
		alpha = newAlpha;
		iter++;
		++box2D.collision.B2TimeOfImpact.b2_toiIters;
		if(iter == k_maxIterations) break;
	}
	box2D.collision.B2TimeOfImpact.b2_toiMaxIters = box2D.common.math.B2Math.max(box2D.collision.B2TimeOfImpact.b2_toiMaxIters,iter) | 0;
	return alpha;
}
box2D.collision.B2WorldManifold = $hxClasses["box2D.collision.B2WorldManifold"] = function() {
	this.m_normal = new box2D.common.math.B2Vec2();
	this.m_points = new Array();
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
	while(_g1 < _g) {
		var i = _g1++;
		this.m_points[i] = new box2D.common.math.B2Vec2();
	}
};
box2D.collision.B2WorldManifold.__name__ = ["box2D","collision","B2WorldManifold"];
box2D.collision.B2WorldManifold.prototype = {
	m_points: null
	,m_normal: null
	,initialize: function(manifold,xfA,radiusA,xfB,radiusB) {
		if(manifold.m_pointCount == 0) return;
		var i;
		var tVec;
		var tMat;
		var normalX;
		var normalY;
		var planePointX;
		var planePointY;
		var clipPointX;
		var clipPointY;
		switch(manifold.m_type) {
		case box2D.collision.B2Manifold.e_circles:
			tMat = xfA.R;
			tVec = manifold.m_localPoint;
			var pointAX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			var pointAY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = xfB.R;
			tVec = manifold.m_points[0].m_localPoint;
			var pointBX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			var pointBY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			var dX = pointBX - pointAX;
			var dY = pointBY - pointAY;
			var d2 = dX * dX + dY * dY;
			if(d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
				var d = Math.sqrt(d2);
				this.m_normal.x = dX / d;
				this.m_normal.y = dY / d;
			} else {
				this.m_normal.x = 1;
				this.m_normal.y = 0;
			}
			var cAX = pointAX + radiusA * this.m_normal.x;
			var cAY = pointAY + radiusA * this.m_normal.y;
			var cBX = pointBX - radiusB * this.m_normal.x;
			var cBY = pointBY - radiusB * this.m_normal.y;
			this.m_points[0].x = 0.5 * (cAX + cBX);
			this.m_points[0].y = 0.5 * (cAY + cBY);
			break;
		case box2D.collision.B2Manifold.e_faceA:
			tMat = xfA.R;
			tVec = manifold.m_localPlaneNormal;
			normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = xfA.R;
			tVec = manifold.m_localPoint;
			planePointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			planePointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			this.m_normal.x = normalX;
			this.m_normal.y = normalY;
			var _g1 = 0, _g = manifold.m_pointCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				tMat = xfB.R;
				tVec = manifold.m_points[i1].m_localPoint;
				clipPointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
				clipPointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
				this.m_points[i1].x = clipPointX + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalX;
				this.m_points[i1].y = clipPointY + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalY;
			}
			break;
		case box2D.collision.B2Manifold.e_faceB:
			tMat = xfB.R;
			tVec = manifold.m_localPlaneNormal;
			normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = xfB.R;
			tVec = manifold.m_localPoint;
			planePointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			planePointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			this.m_normal.x = -normalX;
			this.m_normal.y = -normalY;
			var _g1 = 0, _g = manifold.m_pointCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				tMat = xfA.R;
				tVec = manifold.m_points[i1].m_localPoint;
				clipPointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
				clipPointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
				this.m_points[i1].x = clipPointX + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalX;
				this.m_points[i1].y = clipPointY + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalY;
			}
			break;
		}
	}
	,__class__: box2D.collision.B2WorldManifold
}
if(!box2D.collision.shapes) box2D.collision.shapes = {}
box2D.collision.shapes.B2Shape = $hxClasses["box2D.collision.shapes.B2Shape"] = function() {
	this.m_type = box2D.collision.shapes.B2Shape.e_unknownShape;
	this.m_radius = box2D.common.B2Settings.b2_linearSlop;
};
box2D.collision.shapes.B2Shape.__name__ = ["box2D","collision","shapes","B2Shape"];
box2D.collision.shapes.B2Shape.testOverlap = function(shape1,transform1,shape2,transform2) {
	return true;
}
box2D.collision.shapes.B2Shape.prototype = {
	m_radius: null
	,m_type: null
	,computeSubmergedArea: function(normal,offset,xf,c) {
		return 0;
	}
	,computeMass: function(massData,density) {
	}
	,computeAABB: function(aabb,xf) {
	}
	,rayCast: function(output,input,transform) {
		return false;
	}
	,testPoint: function(xf,p) {
		return false;
	}
	,getType: function() {
		return this.m_type;
	}
	,set: function(other) {
		this.m_radius = other.m_radius;
	}
	,copy: function() {
		return null;
	}
	,__class__: box2D.collision.shapes.B2Shape
}
box2D.collision.shapes.B2CircleShape = $hxClasses["box2D.collision.shapes.B2CircleShape"] = function(radius) {
	if(radius == null) radius = 0;
	box2D.collision.shapes.B2Shape.call(this);
	this.m_p = new box2D.common.math.B2Vec2();
	this.m_type = box2D.collision.shapes.B2Shape.e_circleShape;
	this.m_radius = radius;
};
box2D.collision.shapes.B2CircleShape.__name__ = ["box2D","collision","shapes","B2CircleShape"];
box2D.collision.shapes.B2CircleShape.__super__ = box2D.collision.shapes.B2Shape;
box2D.collision.shapes.B2CircleShape.prototype = $extend(box2D.collision.shapes.B2Shape.prototype,{
	m_p: null
	,setRadius: function(radius) {
		this.m_radius = radius;
	}
	,getRadius: function() {
		return this.m_radius;
	}
	,setLocalPosition: function(position) {
		this.m_p.setV(position);
	}
	,getLocalPosition: function() {
		return this.m_p;
	}
	,computeSubmergedArea: function(normal,offset,xf,c) {
		var p = box2D.common.math.B2Math.mulX(xf,this.m_p);
		var l = -(box2D.common.math.B2Math.dot(normal,p) - offset);
		if(l < -this.m_radius + Number.MIN_VALUE) return 0;
		if(l > this.m_radius) {
			c.setV(p);
			return Math.PI * this.m_radius * this.m_radius;
		}
		var r2 = this.m_radius * this.m_radius;
		var l2 = l * l;
		var area = r2 * (Math.asin(l / this.m_radius) + Math.PI / 2) + l * Math.sqrt(r2 - l2);
		var com = -2 / 3 * Math.pow(r2 - l2,1.5) / area;
		c.x = p.x + normal.x * com;
		c.y = p.y + normal.y * com;
		return area;
	}
	,computeMass: function(massData,density) {
		massData.mass = density * box2D.common.B2Settings.b2_pi * this.m_radius * this.m_radius;
		massData.center.setV(this.m_p);
		massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y));
	}
	,computeAABB: function(aabb,transform) {
		var tMat = transform.R;
		var pX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
		var pY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
		aabb.lowerBound.set(pX - this.m_radius,pY - this.m_radius);
		aabb.upperBound.set(pX + this.m_radius,pY + this.m_radius);
	}
	,rayCast: function(output,input,transform) {
		var tMat = transform.R;
		var positionX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
		var positionY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
		var sX = input.p1.x - positionX;
		var sY = input.p1.y - positionY;
		var b = sX * sX + sY * sY - this.m_radius * this.m_radius;
		var rX = input.p2.x - input.p1.x;
		var rY = input.p2.y - input.p1.y;
		var c = sX * rX + sY * rY;
		var rr = rX * rX + rY * rY;
		var sigma = c * c - rr * b;
		if(sigma < 0.0 || rr < Number.MIN_VALUE) return false;
		var a = -(c + Math.sqrt(sigma));
		if(0.0 <= a && a <= input.maxFraction * rr) {
			a /= rr;
			output.fraction = a;
			output.normal.x = sX + a * rX;
			output.normal.y = sY + a * rY;
			output.normal.normalize();
			return true;
		}
		return false;
	}
	,testPoint: function(transform,p) {
		var tMat = transform.R;
		var dX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
		var dY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
		dX = p.x - dX;
		dY = p.y - dY;
		return dX * dX + dY * dY <= this.m_radius * this.m_radius;
	}
	,set: function(other) {
		box2D.collision.shapes.B2Shape.prototype.set.call(this,other);
		if(js.Boot.__instanceof(other,box2D.collision.shapes.B2CircleShape)) {
			var other2 = js.Boot.__cast(other , box2D.collision.shapes.B2CircleShape);
			this.m_p.setV(other2.m_p);
		}
	}
	,copy: function() {
		var s = new box2D.collision.shapes.B2CircleShape();
		s.set(this);
		return s;
	}
	,__class__: box2D.collision.shapes.B2CircleShape
});
box2D.collision.shapes.B2EdgeShape = $hxClasses["box2D.collision.shapes.B2EdgeShape"] = function(v1,v2) {
	box2D.collision.shapes.B2Shape.call(this);
	this.s_supportVec = new box2D.common.math.B2Vec2();
	this.m_v1 = new box2D.common.math.B2Vec2();
	this.m_v2 = new box2D.common.math.B2Vec2();
	this.m_coreV1 = new box2D.common.math.B2Vec2();
	this.m_coreV2 = new box2D.common.math.B2Vec2();
	this.m_normal = new box2D.common.math.B2Vec2();
	this.m_direction = new box2D.common.math.B2Vec2();
	this.m_cornerDir1 = new box2D.common.math.B2Vec2();
	this.m_cornerDir2 = new box2D.common.math.B2Vec2();
	this.m_type = box2D.collision.shapes.B2Shape.e_edgeShape;
	this.m_prevEdge = null;
	this.m_nextEdge = null;
	this.m_v1 = v1;
	this.m_v2 = v2;
	this.m_direction.set(this.m_v2.x - this.m_v1.x,this.m_v2.y - this.m_v1.y);
	this.m_length = this.m_direction.normalize();
	this.m_normal.set(this.m_direction.y,-this.m_direction.x);
	this.m_coreV1.set(-box2D.common.B2Settings.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x,-box2D.common.B2Settings.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y);
	this.m_coreV2.set(-box2D.common.B2Settings.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x,-box2D.common.B2Settings.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y);
	this.m_cornerDir1 = this.m_normal;
	this.m_cornerDir2.set(-this.m_normal.x,-this.m_normal.y);
};
box2D.collision.shapes.B2EdgeShape.__name__ = ["box2D","collision","shapes","B2EdgeShape"];
box2D.collision.shapes.B2EdgeShape.__super__ = box2D.collision.shapes.B2Shape;
box2D.collision.shapes.B2EdgeShape.prototype = $extend(box2D.collision.shapes.B2Shape.prototype,{
	m_prevEdge: null
	,m_nextEdge: null
	,m_cornerConvex2: null
	,m_cornerConvex1: null
	,m_cornerDir2: null
	,m_cornerDir1: null
	,m_direction: null
	,m_normal: null
	,m_length: null
	,m_coreV2: null
	,m_coreV1: null
	,m_v2: null
	,m_v1: null
	,setNextEdge: function(edge,core,cornerDir,convex) {
		this.m_nextEdge = edge;
		this.m_coreV2 = core;
		this.m_cornerDir2 = cornerDir;
		this.m_cornerConvex2 = convex;
	}
	,setPrevEdge: function(edge,core,cornerDir,convex) {
		this.m_prevEdge = edge;
		this.m_coreV1 = core;
		this.m_cornerDir1 = cornerDir;
		this.m_cornerConvex1 = convex;
	}
	,support: function(xf,dX,dY) {
		var tMat = xf.R;
		var v1X = xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y);
		var v1Y = xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y);
		var v2X = xf.position.x + (tMat.col1.x * this.m_coreV2.x + tMat.col2.x * this.m_coreV2.y);
		var v2Y = xf.position.y + (tMat.col1.y * this.m_coreV2.x + tMat.col2.y * this.m_coreV2.y);
		if(v1X * dX + v1Y * dY > v2X * dX + v2Y * dY) {
			this.s_supportVec.x = v1X;
			this.s_supportVec.y = v1Y;
		} else {
			this.s_supportVec.x = v2X;
			this.s_supportVec.y = v2Y;
		}
		return this.s_supportVec;
	}
	,s_supportVec: null
	,getPrevEdge: function() {
		return this.m_prevEdge;
	}
	,getNextEdge: function() {
		return this.m_nextEdge;
	}
	,getFirstVertex: function(xf) {
		var tMat = xf.R;
		return new box2D.common.math.B2Vec2(xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y),xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y));
	}
	,corner2IsConvex: function() {
		return this.m_cornerConvex2;
	}
	,corner1IsConvex: function() {
		return this.m_cornerConvex1;
	}
	,getCorner2Vector: function() {
		return this.m_cornerDir2;
	}
	,getCorner1Vector: function() {
		return this.m_cornerDir1;
	}
	,getDirectionVector: function() {
		return this.m_direction;
	}
	,getNormalVector: function() {
		return this.m_normal;
	}
	,getCoreVertex2: function() {
		return this.m_coreV2;
	}
	,getCoreVertex1: function() {
		return this.m_coreV1;
	}
	,getVertex2: function() {
		return this.m_v2;
	}
	,getVertex1: function() {
		return this.m_v1;
	}
	,getLength: function() {
		return this.m_length;
	}
	,computeSubmergedArea: function(normal,offset,xf,c) {
		var v0 = new box2D.common.math.B2Vec2(normal.x * offset,normal.y * offset);
		var v1 = box2D.common.math.B2Math.mulX(xf,this.m_v1);
		var v2 = box2D.common.math.B2Math.mulX(xf,this.m_v2);
		var d1 = box2D.common.math.B2Math.dot(normal,v1) - offset;
		var d2 = box2D.common.math.B2Math.dot(normal,v2) - offset;
		if(d1 > 0) {
			if(d2 > 0) return 0; else {
				v1.x = -d2 / (d1 - d2) * v1.x + d1 / (d1 - d2) * v2.x;
				v1.y = -d2 / (d1 - d2) * v1.y + d1 / (d1 - d2) * v2.y;
			}
		} else if(d2 > 0) {
			v2.x = -d2 / (d1 - d2) * v1.x + d1 / (d1 - d2) * v2.x;
			v2.y = -d2 / (d1 - d2) * v1.y + d1 / (d1 - d2) * v2.y;
		} else {
		}
		c.x = (v0.x + v1.x + v2.x) / 3;
		c.y = (v0.y + v1.y + v2.y) / 3;
		return 0.5 * ((v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x));
	}
	,computeMass: function(massData,density) {
		massData.mass = 0;
		massData.center.setV(this.m_v1);
		massData.I = 0;
	}
	,computeAABB: function(aabb,transform) {
		var tMat = transform.R;
		var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
		var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
		var v2X = transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y);
		var v2Y = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y);
		if(v1X < v2X) {
			aabb.lowerBound.x = v1X;
			aabb.upperBound.x = v2X;
		} else {
			aabb.lowerBound.x = v2X;
			aabb.upperBound.x = v1X;
		}
		if(v1Y < v2Y) {
			aabb.lowerBound.y = v1Y;
			aabb.upperBound.y = v2Y;
		} else {
			aabb.lowerBound.y = v2Y;
			aabb.upperBound.y = v1Y;
		}
	}
	,rayCast: function(output,input,transform) {
		var tMat;
		var rX = input.p2.x - input.p1.x;
		var rY = input.p2.y - input.p1.y;
		tMat = transform.R;
		var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
		var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
		var nX = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y) - v1Y;
		var nY = -(transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y) - v1X);
		var k_slop = 100.0 * Number.MIN_VALUE;
		var denom = -(rX * nX + rY * nY);
		if(denom > k_slop) {
			var bX = input.p1.x - v1X;
			var bY = input.p1.y - v1Y;
			var a = bX * nX + bY * nY;
			if(0.0 <= a && a <= input.maxFraction * denom) {
				var mu2 = -rX * bY + rY * bX;
				if(-k_slop * denom <= mu2 && mu2 <= denom * (1.0 + k_slop)) {
					a /= denom;
					output.fraction = a;
					var nLen = Math.sqrt(nX * nX + nY * nY);
					output.normal.x = nX / nLen;
					output.normal.y = nY / nLen;
					return true;
				}
			}
		}
		return false;
	}
	,testPoint: function(transform,p) {
		return false;
	}
	,__class__: box2D.collision.shapes.B2EdgeShape
});
box2D.collision.shapes.B2MassData = $hxClasses["box2D.collision.shapes.B2MassData"] = function() {
	this.mass = 0.0;
	this.center = new box2D.common.math.B2Vec2(0,0);
	this.I = 0.0;
};
box2D.collision.shapes.B2MassData.__name__ = ["box2D","collision","shapes","B2MassData"];
box2D.collision.shapes.B2MassData.prototype = {
	I: null
	,center: null
	,mass: null
	,__class__: box2D.collision.shapes.B2MassData
}
box2D.collision.shapes.B2PolygonShape = $hxClasses["box2D.collision.shapes.B2PolygonShape"] = function() {
	box2D.collision.shapes.B2Shape.call(this);
	this.m_type = box2D.collision.shapes.B2Shape.e_polygonShape;
	this.m_centroid = new box2D.common.math.B2Vec2();
	this.m_vertices = new Array();
	this.m_normals = new Array();
};
box2D.collision.shapes.B2PolygonShape.__name__ = ["box2D","collision","shapes","B2PolygonShape"];
box2D.collision.shapes.B2PolygonShape.asArray = function(vertices,vertexCount) {
	var polygonShape = new box2D.collision.shapes.B2PolygonShape();
	polygonShape.setAsArray(vertices,vertexCount);
	return polygonShape;
}
box2D.collision.shapes.B2PolygonShape.asVector = function(vertices,vertexCount) {
	var polygonShape = new box2D.collision.shapes.B2PolygonShape();
	polygonShape.setAsVector(vertices,vertexCount);
	return polygonShape;
}
box2D.collision.shapes.B2PolygonShape.asBox = function(hx,hy) {
	var polygonShape = new box2D.collision.shapes.B2PolygonShape();
	polygonShape.setAsBox(hx,hy);
	return polygonShape;
}
box2D.collision.shapes.B2PolygonShape.asOrientedBox = function(hx,hy,center,angle) {
	if(angle == null) angle = 0.0;
	var polygonShape = new box2D.collision.shapes.B2PolygonShape();
	polygonShape.setAsOrientedBox(hx,hy,center,angle);
	return polygonShape;
}
box2D.collision.shapes.B2PolygonShape.asEdge = function(v1,v2) {
	var polygonShape = new box2D.collision.shapes.B2PolygonShape();
	polygonShape.setAsEdge(v1,v2);
	return polygonShape;
}
box2D.collision.shapes.B2PolygonShape.computeCentroid = function(vs,count) {
	var c = new box2D.common.math.B2Vec2();
	var area = 0.0;
	var p1X = 0.0;
	var p1Y = 0.0;
	var inv3 = 1.0 / 3.0;
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		var p2 = vs[i];
		var p3 = i + 1 < count?vs[i + 1 | 0]:vs[0];
		var e1X = p2.x - p1X;
		var e1Y = p2.y - p1Y;
		var e2X = p3.x - p1X;
		var e2Y = p3.y - p1Y;
		var D = e1X * e2Y - e1Y * e2X;
		var triangleArea = 0.5 * D;
		area += triangleArea;
		c.x += triangleArea * inv3 * (p1X + p2.x + p3.x);
		c.y += triangleArea * inv3 * (p1Y + p2.y + p3.y);
	}
	c.x *= 1.0 / area;
	c.y *= 1.0 / area;
	return c;
}
box2D.collision.shapes.B2PolygonShape.computeOBB = function(obb,vs,count) {
	var i;
	var p = new Array();
	var _g = 0;
	while(_g < count) {
		var i1 = _g++;
		p[i1] = vs[i1];
	}
	p[count] = p[0];
	var minArea = Number.MAX_VALUE;
	var _g1 = 1, _g = count + 1;
	while(_g1 < _g) {
		var i1 = _g1++;
		var root = p[i1 - 1 | 0];
		var uxX = p[i1].x - root.x;
		var uxY = p[i1].y - root.y;
		var length = Math.sqrt(uxX * uxX + uxY * uxY);
		uxX /= length;
		uxY /= length;
		var uyX = -uxY;
		var uyY = uxX;
		var lowerX = Number.MAX_VALUE;
		var lowerY = Number.MAX_VALUE;
		var upperX = -Number.MAX_VALUE;
		var upperY = -Number.MAX_VALUE;
		var _g2 = 0;
		while(_g2 < count) {
			var j = _g2++;
			var dX = p[j].x - root.x;
			var dY = p[j].y - root.y;
			var rX = uxX * dX + uxY * dY;
			var rY = uyX * dX + uyY * dY;
			if(rX < lowerX) lowerX = rX;
			if(rY < lowerY) lowerY = rY;
			if(rX > upperX) upperX = rX;
			if(rY > upperY) upperY = rY;
		}
		var area = (upperX - lowerX) * (upperY - lowerY);
		if(area < 0.95 * minArea) {
			minArea = area;
			obb.R.col1.x = uxX;
			obb.R.col1.y = uxY;
			obb.R.col2.x = uyX;
			obb.R.col2.y = uyY;
			var centerX = 0.5 * (lowerX + upperX);
			var centerY = 0.5 * (lowerY + upperY);
			var tMat = obb.R;
			obb.center.x = root.x + (tMat.col1.x * centerX + tMat.col2.x * centerY);
			obb.center.y = root.y + (tMat.col1.y * centerX + tMat.col2.y * centerY);
			obb.extents.x = 0.5 * (upperX - lowerX);
			obb.extents.y = 0.5 * (upperY - lowerY);
		}
	}
}
box2D.collision.shapes.B2PolygonShape.__super__ = box2D.collision.shapes.B2Shape;
box2D.collision.shapes.B2PolygonShape.prototype = $extend(box2D.collision.shapes.B2Shape.prototype,{
	m_vertexCount: null
	,m_normals: null
	,m_vertices: null
	,m_centroid: null
	,reserve: function(count) {
		var _g = this.m_vertices.length;
		while(_g < count) {
			var i = _g++;
			this.m_vertices[i] = new box2D.common.math.B2Vec2();
			this.m_normals[i] = new box2D.common.math.B2Vec2();
		}
	}
	,validate: function() {
		return false;
	}
	,getSupportVertex: function(d) {
		var bestIndex = 0;
		var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
		var _g1 = 1, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
			if(value > bestValue) {
				bestIndex = i;
				bestValue = value;
			}
		}
		return this.m_vertices[bestIndex];
	}
	,getSupport: function(d) {
		var bestIndex = 0;
		var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
		var _g1 = 1, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
			if(value > bestValue) {
				bestIndex = i;
				bestValue = value;
			}
		}
		return bestIndex;
	}
	,getNormals: function() {
		return this.m_normals;
	}
	,getVertices: function() {
		return this.m_vertices;
	}
	,getVertexCount: function() {
		return this.m_vertexCount;
	}
	,computeSubmergedArea: function(normal,offset,xf,c) {
		var normalL = box2D.common.math.B2Math.mulTMV(xf.R,normal);
		var offsetL = offset - box2D.common.math.B2Math.dot(normal,xf.position);
		var depths = new Array();
		var diveCount = 0;
		var intoIndex = -1;
		var outoIndex = -1;
		var lastSubmerged = false;
		var i;
		var _g1 = 0, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			depths[i1] = box2D.common.math.B2Math.dot(normalL,this.m_vertices[i1]) - offsetL;
			var isSubmerged = depths[i1] < -Number.MIN_VALUE;
			if(i1 > 0) {
				if(isSubmerged) {
					if(!lastSubmerged) {
						intoIndex = i1 - 1;
						diveCount++;
					}
				} else if(lastSubmerged) {
					outoIndex = i1 - 1;
					diveCount++;
				}
			}
			lastSubmerged = isSubmerged;
		}
		switch(diveCount) {
		case 0:
			if(lastSubmerged) {
				var md = new box2D.collision.shapes.B2MassData();
				this.computeMass(md,1);
				c.setV(box2D.common.math.B2Math.mulX(xf,md.center));
				return md.mass;
			} else return 0;
			break;
		case 1:
			if(intoIndex == -1) intoIndex = this.m_vertexCount - 1; else outoIndex = this.m_vertexCount - 1;
			break;
		}
		var intoIndex2 = (intoIndex + 1) % this.m_vertexCount;
		var outoIndex2 = (outoIndex + 1) % this.m_vertexCount;
		var intoLamdda = (0 - depths[intoIndex]) / (depths[intoIndex2] - depths[intoIndex]);
		var outoLamdda = (0 - depths[outoIndex]) / (depths[outoIndex2] - depths[outoIndex]);
		var intoVec = new box2D.common.math.B2Vec2(this.m_vertices[intoIndex].x * (1 - intoLamdda) + this.m_vertices[intoIndex2].x * intoLamdda,this.m_vertices[intoIndex].y * (1 - intoLamdda) + this.m_vertices[intoIndex2].y * intoLamdda);
		var outoVec = new box2D.common.math.B2Vec2(this.m_vertices[outoIndex].x * (1 - outoLamdda) + this.m_vertices[outoIndex2].x * outoLamdda,this.m_vertices[outoIndex].y * (1 - outoLamdda) + this.m_vertices[outoIndex2].y * outoLamdda);
		var area = 0;
		var center = new box2D.common.math.B2Vec2();
		var p2 = this.m_vertices[intoIndex2];
		var p3;
		i = intoIndex2;
		while(i != outoIndex2) {
			i = (i + 1) % this.m_vertexCount;
			if(i == outoIndex2) p3 = outoVec; else p3 = this.m_vertices[i];
			var triangleArea = 0.5 * ((p2.x - intoVec.x) * (p3.y - intoVec.y) - (p2.y - intoVec.y) * (p3.x - intoVec.x));
			area += triangleArea;
			center.x += triangleArea * (intoVec.x + p2.x + p3.x) / 3;
			center.y += triangleArea * (intoVec.y + p2.y + p3.y) / 3;
			p2 = p3;
		}
		center.multiply(1 / area);
		c.setV(box2D.common.math.B2Math.mulX(xf,center));
		return area;
	}
	,computeMass: function(massData,density) {
		if(this.m_vertexCount == 2) {
			massData.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x);
			massData.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y);
			massData.mass = 0.0;
			massData.I = 0.0;
			return;
		}
		var centerX = 0.0;
		var centerY = 0.0;
		var area = 0.0;
		var I = 0.0;
		var p1X = 0.0;
		var p1Y = 0.0;
		var k_inv3 = 1.0 / 3.0;
		var _g1 = 0, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			var p2 = this.m_vertices[i];
			var p3 = i + 1 < this.m_vertexCount?this.m_vertices[i + 1 | 0]:this.m_vertices[0];
			var e1X = p2.x - p1X;
			var e1Y = p2.y - p1Y;
			var e2X = p3.x - p1X;
			var e2Y = p3.y - p1Y;
			var D = e1X * e2Y - e1Y * e2X;
			var triangleArea = 0.5 * D;
			area += triangleArea;
			centerX += triangleArea * k_inv3 * (p1X + p2.x + p3.x);
			centerY += triangleArea * k_inv3 * (p1Y + p2.y + p3.y);
			var px = p1X;
			var py = p1Y;
			var ex1 = e1X;
			var ey1 = e1Y;
			var ex2 = e2X;
			var ey2 = e2Y;
			var intx2 = k_inv3 * (0.25 * (ex1 * ex1 + ex2 * ex1 + ex2 * ex2) + (px * ex1 + px * ex2)) + 0.5 * px * px;
			var inty2 = k_inv3 * (0.25 * (ey1 * ey1 + ey2 * ey1 + ey2 * ey2) + (py * ey1 + py * ey2)) + 0.5 * py * py;
			I += D * (intx2 + inty2);
		}
		massData.mass = density * area;
		centerX *= 1.0 / area;
		centerY *= 1.0 / area;
		massData.center.set(centerX,centerY);
		massData.I = density * I;
	}
	,computeAABB: function(aabb,xf) {
		var tMat = xf.R;
		var tVec = this.m_vertices[0];
		var lowerX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
		var lowerY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
		var upperX = lowerX;
		var upperY = lowerY;
		var _g1 = 1, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			tVec = this.m_vertices[i];
			var vX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			var vY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			lowerX = lowerX < vX?lowerX:vX;
			lowerY = lowerY < vY?lowerY:vY;
			upperX = upperX > vX?upperX:vX;
			upperY = upperY > vY?upperY:vY;
		}
		aabb.lowerBound.x = lowerX - this.m_radius;
		aabb.lowerBound.y = lowerY - this.m_radius;
		aabb.upperBound.x = upperX + this.m_radius;
		aabb.upperBound.y = upperY + this.m_radius;
	}
	,rayCast: function(output,input,transform) {
		var lower = 0.0;
		var upper = input.maxFraction;
		var tX;
		var tY;
		var tMat;
		var tVec;
		tX = input.p1.x - transform.position.x;
		tY = input.p1.y - transform.position.y;
		tMat = transform.R;
		var p1X = tX * tMat.col1.x + tY * tMat.col1.y;
		var p1Y = tX * tMat.col2.x + tY * tMat.col2.y;
		tX = input.p2.x - transform.position.x;
		tY = input.p2.y - transform.position.y;
		tMat = transform.R;
		var p2X = tX * tMat.col1.x + tY * tMat.col1.y;
		var p2Y = tX * tMat.col2.x + tY * tMat.col2.y;
		var dX = p2X - p1X;
		var dY = p2Y - p1Y;
		var index = -1;
		var _g1 = 0, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			tVec = this.m_vertices[i];
			tX = tVec.x - p1X;
			tY = tVec.y - p1Y;
			tVec = this.m_normals[i];
			var numerator = tVec.x * tX + tVec.y * tY;
			var denominator = tVec.x * dX + tVec.y * dY;
			if(denominator == 0.0) {
				if(numerator < 0.0) return false;
			} else if(denominator < 0.0 && numerator < lower * denominator) {
				lower = numerator / denominator;
				index = i;
			} else if(denominator > 0.0 && numerator < upper * denominator) upper = numerator / denominator;
			if(upper < lower - Number.MIN_VALUE) return false;
		}
		if(index >= 0) {
			output.fraction = lower;
			tMat = transform.R;
			tVec = this.m_normals[index];
			output.normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			output.normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			return true;
		}
		return false;
	}
	,testPoint: function(xf,p) {
		var tVec;
		var tMat = xf.R;
		var tX = p.x - xf.position.x;
		var tY = p.y - xf.position.y;
		var pLocalX = tX * tMat.col1.x + tY * tMat.col1.y;
		var pLocalY = tX * tMat.col2.x + tY * tMat.col2.y;
		var _g1 = 0, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			tVec = this.m_vertices[i];
			tX = pLocalX - tVec.x;
			tY = pLocalY - tVec.y;
			tVec = this.m_normals[i];
			var dot = tVec.x * tX + tVec.y * tY;
			if(dot > 0.0) return false;
		}
		return true;
	}
	,setAsEdge: function(v1,v2) {
		this.m_vertexCount = 2;
		this.reserve(2);
		this.m_vertices[0].setV(v1);
		this.m_vertices[1].setV(v2);
		this.m_centroid.x = 0.5 * (v1.x + v2.x);
		this.m_centroid.y = 0.5 * (v1.y + v2.y);
		this.m_normals[0] = box2D.common.math.B2Math.crossVF(box2D.common.math.B2Math.subtractVV(v2,v1),1.0);
		this.m_normals[0].normalize();
		this.m_normals[1].x = -this.m_normals[0].x;
		this.m_normals[1].y = -this.m_normals[0].y;
	}
	,setAsOrientedBox: function(hx,hy,center,angle) {
		if(angle == null) angle = 0.0;
		this.m_vertexCount = 4;
		this.reserve(4);
		this.m_vertices[0].set(-hx,-hy);
		this.m_vertices[1].set(hx,-hy);
		this.m_vertices[2].set(hx,hy);
		this.m_vertices[3].set(-hx,hy);
		this.m_normals[0].set(0.0,-1.0);
		this.m_normals[1].set(1.0,0.0);
		this.m_normals[2].set(0.0,1.0);
		this.m_normals[3].set(-1.0,0.0);
		this.m_centroid = center;
		var xf = new box2D.common.math.B2Transform();
		xf.position = center;
		xf.R.set(angle);
		var _g1 = 0, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_vertices[i] = box2D.common.math.B2Math.mulX(xf,this.m_vertices[i]);
			this.m_normals[i] = box2D.common.math.B2Math.mulMV(xf.R,this.m_normals[i]);
		}
	}
	,setAsBox: function(hx,hy) {
		this.m_vertexCount = 4;
		this.reserve(4);
		this.m_vertices[0].set(-hx,-hy);
		this.m_vertices[1].set(hx,-hy);
		this.m_vertices[2].set(hx,hy);
		this.m_vertices[3].set(-hx,hy);
		this.m_normals[0].set(0.0,-1.0);
		this.m_normals[1].set(1.0,0.0);
		this.m_normals[2].set(0.0,1.0);
		this.m_normals[3].set(-1.0,0.0);
		this.m_centroid.setZero();
	}
	,setAsVector: function(vertices,vertexCount) {
		if(vertexCount == null) vertexCount = 0;
		if(vertexCount == 0) vertexCount = vertices.length;
		box2D.common.B2Settings.b2Assert(2 <= vertexCount);
		this.m_vertexCount = vertexCount | 0;
		this.reserve(vertexCount | 0);
		var i;
		var _g1 = 0, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			this.m_vertices[i1].setV(vertices[i1]);
		}
		var _g1 = 0, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			var i11 = i1;
			var i2 = i1 + 1 < this.m_vertexCount?i1 + 1:0;
			var edge = box2D.common.math.B2Math.subtractVV(this.m_vertices[i2],this.m_vertices[i11]);
			box2D.common.B2Settings.b2Assert(edge.lengthSquared() > Number.MIN_VALUE);
			this.m_normals[i1].setV(box2D.common.math.B2Math.crossVF(edge,1.0));
			this.m_normals[i1].normalize();
		}
		this.m_centroid = box2D.collision.shapes.B2PolygonShape.computeCentroid(this.m_vertices,this.m_vertexCount);
	}
	,setAsArray: function(vertices,vertexCount) {
		if(vertexCount == null) vertexCount = 0;
		var v = new Array();
		var _g = 0;
		while(_g < vertices.length) {
			var tVec = vertices[_g];
			++_g;
			v.push(tVec);
		}
		this.setAsVector(v,vertexCount);
	}
	,set: function(other) {
		box2D.collision.shapes.B2Shape.prototype.set.call(this,other);
		if(js.Boot.__instanceof(other,box2D.collision.shapes.B2PolygonShape)) {
			var other2 = js.Boot.__cast(other , box2D.collision.shapes.B2PolygonShape);
			this.m_centroid.setV(other2.m_centroid);
			this.m_vertexCount = other2.m_vertexCount;
			this.reserve(this.m_vertexCount);
			var _g1 = 0, _g = this.m_vertexCount;
			while(_g1 < _g) {
				var i = _g1++;
				this.m_vertices[i].setV(other2.m_vertices[i]);
				this.m_normals[i].setV(other2.m_normals[i]);
			}
		}
	}
	,copy: function() {
		var s = new box2D.collision.shapes.B2PolygonShape();
		s.set(this);
		return s;
	}
	,__class__: box2D.collision.shapes.B2PolygonShape
});
box2D.common.B2Color = $hxClasses["box2D.common.B2Color"] = function(rr,gg,bb) {
	this._r = 255 * box2D.common.math.B2Math.clamp(rr,0.0,1.0) | 0;
	this._g = 255 * box2D.common.math.B2Math.clamp(gg,0.0,1.0) | 0;
	this._b = 255 * box2D.common.math.B2Math.clamp(bb,0.0,1.0) | 0;
};
box2D.common.B2Color.__name__ = ["box2D","common","B2Color"];
box2D.common.B2Color.prototype = {
	_b: null
	,_g: null
	,_r: null
	,getColor: function() {
		return this._r << 16 | this._g << 8 | this._b;
	}
	,setB: function(bb) {
		return this._b = 255 * box2D.common.math.B2Math.clamp(bb,0.0,1.0) | 0;
	}
	,setG: function(gg) {
		return this._g = 255 * box2D.common.math.B2Math.clamp(gg,0.0,1.0) | 0;
	}
	,setR: function(rr) {
		return this._r = 255 * box2D.common.math.B2Math.clamp(rr,0.0,1.0) | 0;
	}
	,color: null
	,b: null
	,g: null
	,r: null
	,set: function(rr,gg,bb) {
		this._r = 255 * box2D.common.math.B2Math.clamp(rr,0.0,1.0) | 0;
		this._g = 255 * box2D.common.math.B2Math.clamp(gg,0.0,1.0) | 0;
		this._b = 255 * box2D.common.math.B2Math.clamp(bb,0.0,1.0) | 0;
	}
	,__class__: box2D.common.B2Color
	,__properties__: {set_r:"setR",set_g:"setG",set_b:"setB",get_color:"getColor"}
}
box2D.common.B2Settings = $hxClasses["box2D.common.B2Settings"] = function() { }
box2D.common.B2Settings.__name__ = ["box2D","common","B2Settings"];
box2D.common.B2Settings.b2MixFriction = function(friction1,friction2) {
	return Math.sqrt(friction1 * friction2);
}
box2D.common.B2Settings.b2MixRestitution = function(restitution1,restitution2) {
	return restitution1 > restitution2?restitution1:restitution2;
}
box2D.common.B2Settings.b2Assert = function(a) {
	if(!a) throw "Assertion Failed";
}
box2D.common.math.B2Mat33 = $hxClasses["box2D.common.math.B2Mat33"] = function(c1,c2,c3) {
	this.col1 = new box2D.common.math.B2Vec3();
	this.col2 = new box2D.common.math.B2Vec3();
	this.col3 = new box2D.common.math.B2Vec3();
	if(c1 == null && c2 == null && c3 == null) {
		this.col1.setZero();
		this.col2.setZero();
		this.col3.setZero();
	} else {
		this.col1.setV(c1);
		this.col2.setV(c2);
		this.col3.setV(c3);
	}
};
box2D.common.math.B2Mat33.__name__ = ["box2D","common","math","B2Mat33"];
box2D.common.math.B2Mat33.prototype = {
	col3: null
	,col2: null
	,col1: null
	,solve33: function(out,bX,bY,bZ) {
		var a11 = this.col1.x;
		var a21 = this.col1.y;
		var a31 = this.col1.z;
		var a12 = this.col2.x;
		var a22 = this.col2.y;
		var a32 = this.col2.z;
		var a13 = this.col3.x;
		var a23 = this.col3.y;
		var a33 = this.col3.z;
		var det = a11 * (a22 * a33 - a32 * a23) + a21 * (a32 * a13 - a12 * a33) + a31 * (a12 * a23 - a22 * a13);
		if(det != 0.0) det = 1.0 / det;
		out.x = det * (bX * (a22 * a33 - a32 * a23) + bY * (a32 * a13 - a12 * a33) + bZ * (a12 * a23 - a22 * a13));
		out.y = det * (a11 * (bY * a33 - bZ * a23) + a21 * (bZ * a13 - bX * a33) + a31 * (bX * a23 - bY * a13));
		out.z = det * (a11 * (a22 * bZ - a32 * bY) + a21 * (a32 * bX - a12 * bZ) + a31 * (a12 * bY - a22 * bX));
		return out;
	}
	,solve22: function(out,bX,bY) {
		var a11 = this.col1.x;
		var a12 = this.col2.x;
		var a21 = this.col1.y;
		var a22 = this.col2.y;
		var det = a11 * a22 - a12 * a21;
		if(det != 0.0) det = 1.0 / det;
		out.x = det * (a22 * bX - a12 * bY);
		out.y = det * (a11 * bY - a21 * bX);
		return out;
	}
	,setZero: function() {
		this.col1.x = 0.0;
		this.col2.x = 0.0;
		this.col3.x = 0.0;
		this.col1.y = 0.0;
		this.col2.y = 0.0;
		this.col3.y = 0.0;
		this.col1.z = 0.0;
		this.col2.z = 0.0;
		this.col3.z = 0.0;
	}
	,setIdentity: function() {
		this.col1.x = 1.0;
		this.col2.x = 0.0;
		this.col3.x = 0.0;
		this.col1.y = 0.0;
		this.col2.y = 1.0;
		this.col3.y = 0.0;
		this.col1.z = 0.0;
		this.col2.z = 0.0;
		this.col3.z = 1.0;
	}
	,addM: function(m) {
		this.col1.x += m.col1.x;
		this.col1.y += m.col1.y;
		this.col1.z += m.col1.z;
		this.col2.x += m.col2.x;
		this.col2.y += m.col2.y;
		this.col2.z += m.col2.z;
		this.col3.x += m.col3.x;
		this.col3.y += m.col3.y;
		this.col3.z += m.col3.z;
	}
	,setM: function(m) {
		this.col1.setV(m.col1);
		this.col2.setV(m.col2);
		this.col3.setV(m.col3);
	}
	,copy: function() {
		return new box2D.common.math.B2Mat33(this.col1,this.col2,this.col3);
	}
	,setVVV: function(c1,c2,c3) {
		this.col1.setV(c1);
		this.col2.setV(c2);
		this.col3.setV(c3);
	}
	,__class__: box2D.common.math.B2Mat33
}
box2D.common.math.B2Math = $hxClasses["box2D.common.math.B2Math"] = function() { }
box2D.common.math.B2Math.__name__ = ["box2D","common","math","B2Math"];
box2D.common.math.B2Math.isValid = function(x) {
	if(Math.isNaN(x) || x == Math.NEGATIVE_INFINITY || x == Math.POSITIVE_INFINITY) return false;
	return true;
}
box2D.common.math.B2Math.dot = function(a,b) {
	return a.x * b.x + a.y * b.y;
}
box2D.common.math.B2Math.crossVV = function(a,b) {
	return a.x * b.y - a.y * b.x;
}
box2D.common.math.B2Math.crossVF = function(a,s) {
	var v = new box2D.common.math.B2Vec2(s * a.y,-s * a.x);
	return v;
}
box2D.common.math.B2Math.crossFV = function(s,a) {
	var v = new box2D.common.math.B2Vec2(-s * a.y,s * a.x);
	return v;
}
box2D.common.math.B2Math.mulMV = function(A,v) {
	var u = new box2D.common.math.B2Vec2(A.col1.x * v.x + A.col2.x * v.y,A.col1.y * v.x + A.col2.y * v.y);
	return u;
}
box2D.common.math.B2Math.mulTMV = function(A,v) {
	var u = new box2D.common.math.B2Vec2(box2D.common.math.B2Math.dot(v,A.col1),box2D.common.math.B2Math.dot(v,A.col2));
	return u;
}
box2D.common.math.B2Math.mulX = function(T,v) {
	var a = box2D.common.math.B2Math.mulMV(T.R,v);
	a.x += T.position.x;
	a.y += T.position.y;
	return a;
}
box2D.common.math.B2Math.mulXT = function(T,v) {
	var a = box2D.common.math.B2Math.subtractVV(v,T.position);
	var tX = a.x * T.R.col1.x + a.y * T.R.col1.y;
	a.y = a.x * T.R.col2.x + a.y * T.R.col2.y;
	a.x = tX;
	return a;
}
box2D.common.math.B2Math.addVV = function(a,b) {
	var v = new box2D.common.math.B2Vec2(a.x + b.x,a.y + b.y);
	return v;
}
box2D.common.math.B2Math.subtractVV = function(a,b) {
	var v = new box2D.common.math.B2Vec2(a.x - b.x,a.y - b.y);
	return v;
}
box2D.common.math.B2Math.distance = function(a,b) {
	var cX = a.x - b.x;
	var cY = a.y - b.y;
	return Math.sqrt(cX * cX + cY * cY);
}
box2D.common.math.B2Math.distanceSquared = function(a,b) {
	var cX = a.x - b.x;
	var cY = a.y - b.y;
	return cX * cX + cY * cY;
}
box2D.common.math.B2Math.mulFV = function(s,a) {
	var v = new box2D.common.math.B2Vec2(s * a.x,s * a.y);
	return v;
}
box2D.common.math.B2Math.addMM = function(A,B) {
	var C = box2D.common.math.B2Mat22.fromVV(box2D.common.math.B2Math.addVV(A.col1,B.col1),box2D.common.math.B2Math.addVV(A.col2,B.col2));
	return C;
}
box2D.common.math.B2Math.mulMM = function(A,B) {
	var C = box2D.common.math.B2Mat22.fromVV(box2D.common.math.B2Math.mulMV(A,B.col1),box2D.common.math.B2Math.mulMV(A,B.col2));
	return C;
}
box2D.common.math.B2Math.mulTMM = function(A,B) {
	var c1 = new box2D.common.math.B2Vec2(box2D.common.math.B2Math.dot(A.col1,B.col1),box2D.common.math.B2Math.dot(A.col2,B.col1));
	var c2 = new box2D.common.math.B2Vec2(box2D.common.math.B2Math.dot(A.col1,B.col2),box2D.common.math.B2Math.dot(A.col2,B.col2));
	var C = box2D.common.math.B2Mat22.fromVV(c1,c2);
	return C;
}
box2D.common.math.B2Math.abs = function(a) {
	return a > 0.0?a:-a;
}
box2D.common.math.B2Math.absV = function(a) {
	var b = new box2D.common.math.B2Vec2(box2D.common.math.B2Math.abs(a.x),box2D.common.math.B2Math.abs(a.y));
	return b;
}
box2D.common.math.B2Math.absM = function(A) {
	var B = box2D.common.math.B2Mat22.fromVV(box2D.common.math.B2Math.absV(A.col1),box2D.common.math.B2Math.absV(A.col2));
	return B;
}
box2D.common.math.B2Math.min = function(a,b) {
	return a < b?a:b;
}
box2D.common.math.B2Math.minV = function(a,b) {
	var c = new box2D.common.math.B2Vec2(box2D.common.math.B2Math.min(a.x,b.x),box2D.common.math.B2Math.min(a.y,b.y));
	return c;
}
box2D.common.math.B2Math.max = function(a,b) {
	return a > b?a:b;
}
box2D.common.math.B2Math.maxV = function(a,b) {
	var c = new box2D.common.math.B2Vec2(box2D.common.math.B2Math.max(a.x,b.x),box2D.common.math.B2Math.max(a.y,b.y));
	return c;
}
box2D.common.math.B2Math.clamp = function(a,low,high) {
	return a < low?low:a > high?high:a;
}
box2D.common.math.B2Math.clampV = function(a,low,high) {
	return box2D.common.math.B2Math.maxV(low,box2D.common.math.B2Math.minV(a,high));
}
box2D.common.math.B2Math.swap = function(a,b) {
	var tmp = a[0];
	a[0] = b[0];
	b[0] = tmp;
}
box2D.common.math.B2Math.random = function() {
	return Math.random() * 2 - 1;
}
box2D.common.math.B2Math.randomRange = function(lo,hi) {
	var r = Math.random();
	r = (hi - lo) * r + lo;
	return r;
}
box2D.common.math.B2Math.nextPowerOfTwo = function(x) {
	x |= x >> 1 & 2147483647;
	x |= x >> 2 & 1073741823;
	x |= x >> 4 & 268435455;
	x |= x >> 8 & 16777215;
	x |= x >> 16 & 65535;
	return x + 1;
}
box2D.common.math.B2Math.isPowerOfTwo = function(x) {
	var result = x > 0 && (x & x - 1) == 0;
	return result;
}
box2D.common.math.B2Sweep = $hxClasses["box2D.common.math.B2Sweep"] = function() {
	this.localCenter = new box2D.common.math.B2Vec2();
	this.c0 = new box2D.common.math.B2Vec2();
	this.c = new box2D.common.math.B2Vec2();
};
box2D.common.math.B2Sweep.__name__ = ["box2D","common","math","B2Sweep"];
box2D.common.math.B2Sweep.prototype = {
	t0: null
	,a: null
	,a0: null
	,c: null
	,c0: null
	,localCenter: null
	,advance: function(t) {
		if(this.t0 < t && 1.0 - this.t0 > Number.MIN_VALUE) {
			var alpha = (t - this.t0) / (1.0 - this.t0);
			this.c0.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
			this.c0.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
			this.a0 = (1.0 - alpha) * this.a0 + alpha * this.a;
			this.t0 = t;
		}
	}
	,getTransform: function(xf,alpha) {
		xf.position.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
		xf.position.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
		var angle = (1.0 - alpha) * this.a0 + alpha * this.a;
		xf.R.set(angle);
		var tMat = xf.R;
		xf.position.x -= tMat.col1.x * this.localCenter.x + tMat.col2.x * this.localCenter.y;
		xf.position.y -= tMat.col1.y * this.localCenter.x + tMat.col2.y * this.localCenter.y;
	}
	,copy: function() {
		var copy = new box2D.common.math.B2Sweep();
		copy.localCenter.setV(this.localCenter);
		copy.c0.setV(this.c0);
		copy.c.setV(this.c);
		copy.a0 = this.a0;
		copy.a = this.a;
		copy.t0 = this.t0;
		return copy;
	}
	,set: function(other) {
		this.localCenter.setV(other.localCenter);
		this.c0.setV(other.c0);
		this.c.setV(other.c);
		this.a0 = other.a0;
		this.a = other.a;
		this.t0 = other.t0;
	}
	,__class__: box2D.common.math.B2Sweep
}
box2D.common.math.B2Vec3 = $hxClasses["box2D.common.math.B2Vec3"] = function(x,y,z) {
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.z = z;
};
box2D.common.math.B2Vec3.__name__ = ["box2D","common","math","B2Vec3"];
box2D.common.math.B2Vec3.prototype = {
	z: null
	,y: null
	,x: null
	,multiply: function(a) {
		this.x *= a;
		this.y *= a;
		this.z *= a;
	}
	,subtract: function(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
	}
	,add: function(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
	}
	,copy: function() {
		return new box2D.common.math.B2Vec3(this.x,this.y,this.z);
	}
	,negativeSelf: function() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
	}
	,getNegative: function() {
		return new box2D.common.math.B2Vec3(-this.x,-this.y,-this.z);
	}
	,setV: function(v) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
	}
	,set: function(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	,setZero: function() {
		this.x = this.y = this.z = 0.0;
	}
	,__class__: box2D.common.math.B2Vec3
}
if(!box2D.dynamics) box2D.dynamics = {}
box2D.dynamics.B2Body = $hxClasses["box2D.dynamics.B2Body"] = function(bd,world) {
	this.m_xf = new box2D.common.math.B2Transform();
	this.m_sweep = new box2D.common.math.B2Sweep();
	this.m_linearVelocity = new box2D.common.math.B2Vec2();
	this.m_force = new box2D.common.math.B2Vec2();
	this.m_flags = 0;
	if(bd.bullet) this.m_flags |= box2D.dynamics.B2Body.e_bulletFlag;
	if(bd.fixedRotation) this.m_flags |= box2D.dynamics.B2Body.e_fixedRotationFlag;
	if(bd.allowSleep) this.m_flags |= box2D.dynamics.B2Body.e_allowSleepFlag;
	if(bd.awake) this.m_flags |= box2D.dynamics.B2Body.e_awakeFlag;
	if(bd.active) this.m_flags |= box2D.dynamics.B2Body.e_activeFlag;
	this.m_world = world;
	this.m_xf.position.setV(bd.position);
	this.m_xf.R.set(bd.angle);
	this.m_sweep.localCenter.setZero();
	this.m_sweep.t0 = 1.0;
	this.m_sweep.a0 = this.m_sweep.a = bd.angle;
	var tMat = this.m_xf.R;
	var tVec = this.m_sweep.localCenter;
	this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	this.m_sweep.c.x += this.m_xf.position.x;
	this.m_sweep.c.y += this.m_xf.position.y;
	this.m_sweep.c0.setV(this.m_sweep.c);
	this.m_jointList = null;
	this.m_controllerList = null;
	this.m_contactList = null;
	this.m_controllerCount = 0;
	this.m_prev = null;
	this.m_next = null;
	this.m_linearVelocity.setV(bd.linearVelocity);
	this.m_angularVelocity = bd.angularVelocity;
	this.m_linearDamping = bd.linearDamping;
	this.m_angularDamping = bd.angularDamping;
	this.m_force.set(0.0,0.0);
	this.m_torque = 0.0;
	this.m_sleepTime = 0.0;
	this.m_type = bd.type;
	if(this.m_type == box2D.dynamics.B2Body.b2_dynamicBody) {
		this.m_mass = 1.0;
		this.m_invMass = 1.0;
	} else {
		this.m_mass = 0.0;
		this.m_invMass = 0.0;
	}
	this.m_I = 0.0;
	this.m_invI = 0.0;
	this.m_inertiaScale = bd.inertiaScale;
	this.m_userData = bd.userData;
	this.m_fixtureList = null;
	this.m_fixtureCount = 0;
};
box2D.dynamics.B2Body.__name__ = ["box2D","dynamics","B2Body"];
box2D.dynamics.B2Body.prototype = {
	m_userData: null
	,m_sleepTime: null
	,m_angularDamping: null
	,m_linearDamping: null
	,m_inertiaScale: null
	,m_invI: null
	,m_I: null
	,m_invMass: null
	,m_mass: null
	,m_contactList: null
	,m_jointList: null
	,m_controllerCount: null
	,m_controllerList: null
	,m_fixtureCount: null
	,m_fixtureList: null
	,m_next: null
	,m_prev: null
	,m_world: null
	,m_torque: null
	,m_force: null
	,m_angularVelocity: null
	,m_linearVelocity: null
	,m_sweep: null
	,m_xf: null
	,m_islandIndex: null
	,m_type: null
	,m_flags: null
	,advance: function(t) {
		this.m_sweep.advance(t);
		this.m_sweep.c.setV(this.m_sweep.c0);
		this.m_sweep.a = this.m_sweep.a0;
		this.synchronizeTransform();
	}
	,shouldCollide: function(other) {
		if(this.m_type != box2D.dynamics.B2Body.b2_dynamicBody && other.m_type != box2D.dynamics.B2Body.b2_dynamicBody) return false;
		var jn = this.m_jointList;
		while(jn != null) {
			if(jn.other == other) {
				if(jn.joint.m_collideConnected == false) return false;
			}
			jn = jn.next;
		}
		return true;
	}
	,synchronizeTransform: function() {
		this.m_xf.R.set(this.m_sweep.a);
		var tMat = this.m_xf.R;
		var tVec = this.m_sweep.localCenter;
		this.m_xf.position.x = this.m_sweep.c.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
		this.m_xf.position.y = this.m_sweep.c.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	}
	,synchronizeFixtures: function() {
		var xf1 = box2D.dynamics.B2Body.s_xf1;
		xf1.R.set(this.m_sweep.a0);
		var tMat = xf1.R;
		var tVec = this.m_sweep.localCenter;
		xf1.position.x = this.m_sweep.c0.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
		xf1.position.y = this.m_sweep.c0.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
		var f;
		var broadPhase = this.m_world.m_contactManager.m_broadPhase;
		f = this.m_fixtureList;
		while(f != null) {
			f.synchronize(broadPhase,xf1,this.m_xf);
			f = f.m_next;
		}
	}
	,getWorld: function() {
		return this.m_world;
	}
	,setUserData: function(data) {
		this.m_userData = data;
	}
	,getUserData: function() {
		return this.m_userData;
	}
	,getNext: function() {
		return this.m_next;
	}
	,getContactList: function() {
		return this.m_contactList;
	}
	,getControllerList: function() {
		return this.m_controllerList;
	}
	,getJointList: function() {
		return this.m_jointList;
	}
	,getFixtureList: function() {
		return this.m_fixtureList;
	}
	,isSleepingAllowed: function() {
		return (this.m_flags & box2D.dynamics.B2Body.e_allowSleepFlag) == box2D.dynamics.B2Body.e_allowSleepFlag;
	}
	,isActive: function() {
		return (this.m_flags & box2D.dynamics.B2Body.e_activeFlag) == box2D.dynamics.B2Body.e_activeFlag;
	}
	,setActive: function(flag) {
		if(flag == this.isActive()) return;
		var broadPhase;
		var f;
		if(flag) {
			this.m_flags |= box2D.dynamics.B2Body.e_activeFlag;
			broadPhase = this.m_world.m_contactManager.m_broadPhase;
			f = this.m_fixtureList;
			while(f != null) {
				f.createProxy(broadPhase,this.m_xf);
				f = f.m_next;
			}
		} else {
			this.m_flags &= ~box2D.dynamics.B2Body.e_activeFlag;
			broadPhase = this.m_world.m_contactManager.m_broadPhase;
			f = this.m_fixtureList;
			while(f != null) {
				f.destroyProxy(broadPhase);
				f = f.m_next;
			}
			var ce = this.m_contactList;
			while(ce != null) {
				var ce0 = ce;
				ce = ce.next;
				this.m_world.m_contactManager.destroy(ce0.contact);
			}
			this.m_contactList = null;
		}
	}
	,isFixedRotation: function() {
		return (this.m_flags & box2D.dynamics.B2Body.e_fixedRotationFlag) == box2D.dynamics.B2Body.e_fixedRotationFlag;
	}
	,setFixedRotation: function(fixed) {
		if(fixed) this.m_flags |= box2D.dynamics.B2Body.e_fixedRotationFlag; else this.m_flags &= ~box2D.dynamics.B2Body.e_fixedRotationFlag;
		this.resetMassData();
	}
	,isAwake: function() {
		return (this.m_flags & box2D.dynamics.B2Body.e_awakeFlag) == box2D.dynamics.B2Body.e_awakeFlag;
	}
	,setAwake: function(flag) {
		if(flag) {
			this.m_flags |= box2D.dynamics.B2Body.e_awakeFlag;
			this.m_sleepTime = 0.0;
		} else {
			this.m_flags &= ~box2D.dynamics.B2Body.e_awakeFlag;
			this.m_sleepTime = 0.0;
			this.m_linearVelocity.setZero();
			this.m_angularVelocity = 0.0;
			this.m_force.setZero();
			this.m_torque = 0.0;
		}
	}
	,setSleepingAllowed: function(flag) {
		if(flag) this.m_flags |= box2D.dynamics.B2Body.e_allowSleepFlag; else {
			this.m_flags &= ~box2D.dynamics.B2Body.e_allowSleepFlag;
			this.setAwake(true);
		}
	}
	,isBullet: function() {
		return (this.m_flags & box2D.dynamics.B2Body.e_bulletFlag) == box2D.dynamics.B2Body.e_bulletFlag;
	}
	,setBullet: function(flag) {
		if(flag) this.m_flags |= box2D.dynamics.B2Body.e_bulletFlag; else this.m_flags &= ~box2D.dynamics.B2Body.e_bulletFlag;
	}
	,getType: function() {
		return this.m_type;
	}
	,setType: function(type) {
		if(this.m_type == type) return;
		this.m_type = type;
		this.resetMassData();
		if(this.m_type == box2D.dynamics.B2Body.b2_staticBody) {
			this.m_linearVelocity.setZero();
			this.m_angularVelocity = 0.0;
		}
		this.setAwake(true);
		this.m_force.setZero();
		this.m_torque = 0.0;
		var ce = this.m_contactList;
		while(ce != null) {
			ce.contact.flagForFiltering();
			ce = ce.next;
		}
	}
	,setAngularDamping: function(angularDamping) {
		this.m_angularDamping = angularDamping;
	}
	,getAngularDamping: function() {
		return this.m_angularDamping;
	}
	,setLinearDamping: function(linearDamping) {
		this.m_linearDamping = linearDamping;
	}
	,getLinearDamping: function() {
		return this.m_linearDamping;
	}
	,getLinearVelocityFromLocalPoint: function(localPoint) {
		var A = this.m_xf.R;
		var worldPoint = new box2D.common.math.B2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y,A.col1.y * localPoint.x + A.col2.y * localPoint.y);
		worldPoint.x += this.m_xf.position.x;
		worldPoint.y += this.m_xf.position.y;
		return new box2D.common.math.B2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y),this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
	}
	,getLinearVelocityFromWorldPoint: function(worldPoint) {
		return new box2D.common.math.B2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y),this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
	}
	,getLocalVector: function(worldVector) {
		return box2D.common.math.B2Math.mulTMV(this.m_xf.R,worldVector);
	}
	,getLocalPoint: function(worldPoint) {
		return box2D.common.math.B2Math.mulXT(this.m_xf,worldPoint);
	}
	,getWorldVector: function(localVector) {
		return box2D.common.math.B2Math.mulMV(this.m_xf.R,localVector);
	}
	,getWorldPoint: function(localPoint) {
		var A = this.m_xf.R;
		var u = new box2D.common.math.B2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y,A.col1.y * localPoint.x + A.col2.y * localPoint.y);
		u.x += this.m_xf.position.x;
		u.y += this.m_xf.position.y;
		return u;
	}
	,resetMassData: function() {
		this.m_mass = 0.0;
		this.m_invMass = 0.0;
		this.m_I = 0.0;
		this.m_invI = 0.0;
		this.m_sweep.localCenter.setZero();
		if(this.m_type == box2D.dynamics.B2Body.b2_staticBody || this.m_type == box2D.dynamics.B2Body.b2_kinematicBody) return;
		var center = box2D.common.math.B2Vec2.make(0,0);
		var f = this.m_fixtureList;
		while(f != null) {
			if(f.m_density == 0.0) continue;
			var massData = f.getMassData();
			this.m_mass += massData.mass;
			center.x += massData.center.x * massData.mass;
			center.y += massData.center.y * massData.mass;
			this.m_I += massData.I;
			f = f.m_next;
		}
		if(this.m_mass > 0.0) {
			this.m_invMass = 1.0 / this.m_mass;
			center.x *= this.m_invMass;
			center.y *= this.m_invMass;
		} else {
			this.m_mass = 1.0;
			this.m_invMass = 1.0;
		}
		if(this.m_I > 0.0 && (this.m_flags & box2D.dynamics.B2Body.e_fixedRotationFlag) == 0) {
			this.m_I -= this.m_mass * (center.x * center.x + center.y * center.y);
			this.m_I *= this.m_inertiaScale;
			box2D.common.B2Settings.b2Assert(this.m_I > 0);
			this.m_invI = 1.0 / this.m_I;
		} else {
			this.m_I = 0.0;
			this.m_invI = 0.0;
		}
		var oldCenter = this.m_sweep.c.copy();
		this.m_sweep.localCenter.setV(center);
		this.m_sweep.c0.setV(box2D.common.math.B2Math.mulX(this.m_xf,this.m_sweep.localCenter));
		this.m_sweep.c.setV(this.m_sweep.c0);
		this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - oldCenter.y);
		this.m_linearVelocity.y += this.m_angularVelocity * (this.m_sweep.c.x - oldCenter.x);
	}
	,setMassData: function(massData) {
		box2D.common.B2Settings.b2Assert(this.m_world.isLocked() == false);
		if(this.m_world.isLocked() == true) return;
		if(this.m_type != box2D.dynamics.B2Body.b2_dynamicBody) return;
		this.m_invMass = 0.0;
		this.m_I = 0.0;
		this.m_invI = 0.0;
		this.m_mass = massData.mass;
		if(this.m_mass <= 0.0) this.m_mass = 1.0;
		this.m_invMass = 1.0 / this.m_mass;
		if(massData.I > 0.0 && (this.m_flags & box2D.dynamics.B2Body.e_fixedRotationFlag) == 0) {
			this.m_I = massData.I - this.m_mass * (massData.center.x * massData.center.x + massData.center.y * massData.center.y);
			this.m_invI = 1.0 / this.m_I;
		}
		var oldCenter = this.m_sweep.c.copy();
		this.m_sweep.localCenter.setV(massData.center);
		this.m_sweep.c0.setV(box2D.common.math.B2Math.mulX(this.m_xf,this.m_sweep.localCenter));
		this.m_sweep.c.setV(this.m_sweep.c0);
		this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - oldCenter.y);
		this.m_linearVelocity.y += this.m_angularVelocity * (this.m_sweep.c.x - oldCenter.x);
	}
	,getMassData: function(data) {
		data.mass = this.m_mass;
		data.I = this.m_I;
		data.center.setV(this.m_sweep.localCenter);
	}
	,getInertia: function() {
		return this.m_I;
	}
	,getMass: function() {
		return this.m_mass;
	}
	,merge: function(other) {
		var f;
		f = other.m_fixtureList;
		var body1 = this;
		var body2 = other;
		while(f != null) {
			var next = f.m_next;
			other.m_fixtureCount--;
			f.m_next = this.m_fixtureList;
			this.m_fixtureList = f;
			this.m_fixtureCount++;
			f.m_body = body2;
			f = next;
		}
		body1.m_fixtureCount = 0;
		var center1 = body1.getWorldCenter();
		var center2 = body2.getWorldCenter();
		var velocity1 = body1.getLinearVelocity().copy();
		var velocity2 = body2.getLinearVelocity().copy();
		var angular1 = body1.getAngularVelocity();
		var angular = body2.getAngularVelocity();
		body1.resetMassData();
		this.synchronizeFixtures();
	}
	,split: function(callbackMethod) {
		var linearVelocity = this.getLinearVelocity().copy();
		var angularVelocity = this.getAngularVelocity();
		var center = this.getWorldCenter();
		var body1 = this;
		var body2 = this.m_world.createBody(this.getDefinition());
		var prev = null;
		var f = body1.m_fixtureList;
		while(f != null) if(callbackMethod(f)) {
			var next = f.m_next;
			if(prev != null) prev.m_next = next; else body1.m_fixtureList = next;
			body1.m_fixtureCount--;
			f.m_next = body2.m_fixtureList;
			body2.m_fixtureList = f;
			body2.m_fixtureCount++;
			f.m_body = body2;
			f = next;
		} else {
			prev = f;
			f = f.m_next;
		}
		body1.resetMassData();
		body2.resetMassData();
		var center1 = body1.getWorldCenter();
		var center2 = body2.getWorldCenter();
		var velocity1 = box2D.common.math.B2Math.addVV(linearVelocity,box2D.common.math.B2Math.crossFV(angularVelocity,box2D.common.math.B2Math.subtractVV(center1,center)));
		var velocity2 = box2D.common.math.B2Math.addVV(linearVelocity,box2D.common.math.B2Math.crossFV(angularVelocity,box2D.common.math.B2Math.subtractVV(center2,center)));
		body1.setLinearVelocity(velocity1);
		body2.setLinearVelocity(velocity2);
		body1.setAngularVelocity(angularVelocity);
		body2.setAngularVelocity(angularVelocity);
		body1.synchronizeFixtures();
		body2.synchronizeFixtures();
		return body2;
	}
	,applyImpulse: function(impulse,point) {
		if(this.m_type != box2D.dynamics.B2Body.b2_dynamicBody) return;
		if(this.isAwake() == false) this.setAwake(true);
		this.m_linearVelocity.x += this.m_invMass * impulse.x;
		this.m_linearVelocity.y += this.m_invMass * impulse.y;
		this.m_angularVelocity += this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x);
	}
	,applyTorque: function(torque) {
		if(this.m_type != box2D.dynamics.B2Body.b2_dynamicBody) return;
		if(this.isAwake() == false) this.setAwake(true);
		this.m_torque += torque;
	}
	,applyForce: function(force,point) {
		if(this.m_type != box2D.dynamics.B2Body.b2_dynamicBody) return;
		if(this.isAwake() == false) this.setAwake(true);
		this.m_force.x += force.x;
		this.m_force.y += force.y;
		this.m_torque += (point.x - this.m_sweep.c.x) * force.y - (point.y - this.m_sweep.c.y) * force.x;
	}
	,getDefinition: function() {
		var bd = new box2D.dynamics.B2BodyDef();
		bd.type = this.getType();
		bd.allowSleep = (this.m_flags & box2D.dynamics.B2Body.e_allowSleepFlag) == box2D.dynamics.B2Body.e_allowSleepFlag;
		bd.angle = this.getAngle();
		bd.angularDamping = this.m_angularDamping;
		bd.angularVelocity = this.m_angularVelocity;
		bd.fixedRotation = (this.m_flags & box2D.dynamics.B2Body.e_fixedRotationFlag) == box2D.dynamics.B2Body.e_fixedRotationFlag;
		bd.bullet = (this.m_flags & box2D.dynamics.B2Body.e_bulletFlag) == box2D.dynamics.B2Body.e_bulletFlag;
		bd.awake = (this.m_flags & box2D.dynamics.B2Body.e_awakeFlag) == box2D.dynamics.B2Body.e_awakeFlag;
		bd.linearDamping = this.m_linearDamping;
		bd.linearVelocity.setV(this.getLinearVelocity());
		bd.position = this.getPosition();
		bd.userData = this.getUserData();
		return bd;
	}
	,getAngularVelocity: function() {
		return this.m_angularVelocity;
	}
	,setAngularVelocity: function(omega) {
		if(this.m_type == box2D.dynamics.B2Body.b2_staticBody) return;
		this.m_angularVelocity = omega;
	}
	,getLinearVelocity: function() {
		return this.m_linearVelocity;
	}
	,setLinearVelocity: function(v) {
		if(this.m_type == box2D.dynamics.B2Body.b2_staticBody) return;
		this.m_linearVelocity.setV(v);
	}
	,getLocalCenter: function() {
		return this.m_sweep.localCenter;
	}
	,getWorldCenter: function() {
		return this.m_sweep.c;
	}
	,setAngle: function(angle) {
		this.setPositionAndAngle(this.getPosition(),angle);
	}
	,getAngle: function() {
		return this.m_sweep.a;
	}
	,setPosition: function(position) {
		this.setPositionAndAngle(position,this.getAngle());
	}
	,getPosition: function() {
		return this.m_xf.position;
	}
	,getTransform: function() {
		return this.m_xf;
	}
	,setTransform: function(xf) {
		this.setPositionAndAngle(xf.position,xf.getAngle());
	}
	,setPositionAndAngle: function(position,angle) {
		var f;
		if(this.m_world.isLocked() == true) return;
		this.m_xf.R.set(angle);
		this.m_xf.position.setV(position);
		var tMat = this.m_xf.R;
		var tVec = this.m_sweep.localCenter;
		this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
		this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
		this.m_sweep.c.x += this.m_xf.position.x;
		this.m_sweep.c.y += this.m_xf.position.y;
		this.m_sweep.c0.setV(this.m_sweep.c);
		this.m_sweep.a0 = this.m_sweep.a = angle;
		var broadPhase = this.m_world.m_contactManager.m_broadPhase;
		f = this.m_fixtureList;
		while(f != null) {
			f.synchronize(broadPhase,this.m_xf,this.m_xf);
			f = f.m_next;
		}
		this.m_world.m_contactManager.findNewContacts();
	}
	,DestroyFixture: function(fixture) {
		if(this.m_world.isLocked() == true) return;
		var node = this.m_fixtureList;
		var ppF = null;
		var found = false;
		while(node != null) {
			if(node == fixture) {
				if(ppF != null) ppF.m_next = fixture.m_next; else this.m_fixtureList = fixture.m_next;
				found = true;
				break;
			}
			ppF = node;
			node = node.m_next;
		}
		var edge = this.m_contactList;
		while(edge != null) {
			var c = edge.contact;
			edge = edge.next;
			var fixtureA = c.getFixtureA();
			var fixtureB = c.getFixtureB();
			if(fixture == fixtureA || fixture == fixtureB) this.m_world.m_contactManager.destroy(c);
		}
		if((this.m_flags & box2D.dynamics.B2Body.e_activeFlag) != 0) {
			var broadPhase = this.m_world.m_contactManager.m_broadPhase;
			fixture.destroyProxy(broadPhase);
		} else {
		}
		fixture.destroy();
		fixture.m_body = null;
		fixture.m_next = null;
		--this.m_fixtureCount;
		this.resetMassData();
	}
	,createFixture2: function(shape,density) {
		if(density == null) density = 0.0;
		var def = new box2D.dynamics.B2FixtureDef();
		def.shape = shape;
		def.density = density;
		return this.createFixture(def);
	}
	,createFixture: function(def) {
		if(this.m_world.isLocked() == true) return null;
		var fixture = new box2D.dynamics.B2Fixture();
		fixture.create(this,this.m_xf,def);
		if((this.m_flags & box2D.dynamics.B2Body.e_activeFlag) != 0) {
			var broadPhase = this.m_world.m_contactManager.m_broadPhase;
			fixture.createProxy(broadPhase,this.m_xf);
		}
		fixture.m_next = this.m_fixtureList;
		this.m_fixtureList = fixture;
		++this.m_fixtureCount;
		fixture.m_body = this;
		if(fixture.m_density > 0.0) this.resetMassData();
		this.m_world.m_flags |= box2D.dynamics.B2World.e_newFixture;
		return fixture;
	}
	,connectEdges: function(s1,s2,angle1) {
		var angle2 = Math.atan2(s2.getDirectionVector().y,s2.getDirectionVector().x);
		var coreOffset = Math.tan((angle2 - angle1) * 0.5);
		var core = box2D.common.math.B2Math.mulFV(coreOffset,s2.getDirectionVector());
		core = box2D.common.math.B2Math.subtractVV(core,s2.getNormalVector());
		core = box2D.common.math.B2Math.mulFV(box2D.common.B2Settings.b2_toiSlop,core);
		core = box2D.common.math.B2Math.addVV(core,s2.getVertex1());
		var cornerDir = box2D.common.math.B2Math.addVV(s1.getDirectionVector(),s2.getDirectionVector());
		cornerDir.normalize();
		var convex = box2D.common.math.B2Math.dot(s1.getDirectionVector(),s2.getNormalVector()) > 0.0;
		s1.setNextEdge(s2,core,cornerDir,convex);
		s2.setPrevEdge(s1,core,cornerDir,convex);
		return angle2;
	}
	,__class__: box2D.dynamics.B2Body
}
box2D.dynamics.B2BodyDef = $hxClasses["box2D.dynamics.B2BodyDef"] = function() {
	this.position = new box2D.common.math.B2Vec2();
	this.linearVelocity = new box2D.common.math.B2Vec2();
	this.userData = null;
	this.angle = 0.0;
	this.angularVelocity = 0.0;
	this.linearDamping = 0.0;
	this.angularDamping = 0.0;
	this.allowSleep = true;
	this.awake = true;
	this.fixedRotation = false;
	this.bullet = false;
	this.type = box2D.dynamics.B2Body.b2_staticBody;
	this.active = true;
	this.inertiaScale = 1.0;
};
box2D.dynamics.B2BodyDef.__name__ = ["box2D","dynamics","B2BodyDef"];
box2D.dynamics.B2BodyDef.prototype = {
	inertiaScale: null
	,userData: null
	,active: null
	,bullet: null
	,fixedRotation: null
	,awake: null
	,allowSleep: null
	,angularDamping: null
	,linearDamping: null
	,angularVelocity: null
	,linearVelocity: null
	,angle: null
	,position: null
	,type: null
	,__class__: box2D.dynamics.B2BodyDef
}
box2D.dynamics.B2ContactFilter = $hxClasses["box2D.dynamics.B2ContactFilter"] = function() {
};
box2D.dynamics.B2ContactFilter.__name__ = ["box2D","dynamics","B2ContactFilter"];
box2D.dynamics.B2ContactFilter.prototype = {
	rayCollide: function(userData,fixture) {
		if(userData == null) return true;
		return this.shouldCollide(js.Boot.__cast(userData , box2D.dynamics.B2Fixture),fixture);
	}
	,shouldCollide: function(fixtureA,fixtureB) {
		var filter1 = fixtureA.getFilterData();
		var filter2 = fixtureB.getFilterData();
		if(filter1.groupIndex == filter2.groupIndex && filter1.groupIndex != 0) return filter1.groupIndex > 0;
		var collide = (filter1.maskBits & filter2.categoryBits) != 0 && (filter1.categoryBits & filter2.maskBits) != 0;
		return collide;
	}
	,__class__: box2D.dynamics.B2ContactFilter
}
box2D.dynamics.B2ContactImpulse = $hxClasses["box2D.dynamics.B2ContactImpulse"] = function() {
	this.normalImpulses = new Array();
	this.tangentImpulses = new Array();
};
box2D.dynamics.B2ContactImpulse.__name__ = ["box2D","dynamics","B2ContactImpulse"];
box2D.dynamics.B2ContactImpulse.prototype = {
	tangentImpulses: null
	,normalImpulses: null
	,__class__: box2D.dynamics.B2ContactImpulse
}
box2D.dynamics.B2ContactListener = $hxClasses["box2D.dynamics.B2ContactListener"] = function() {
};
box2D.dynamics.B2ContactListener.__name__ = ["box2D","dynamics","B2ContactListener"];
box2D.dynamics.B2ContactListener.prototype = {
	postSolve: function(contact,impulse) {
	}
	,preSolve: function(contact,oldManifold) {
	}
	,endContact: function(contact) {
	}
	,beginContact: function(contact) {
	}
	,__class__: box2D.dynamics.B2ContactListener
}
box2D.dynamics.B2ContactManager = $hxClasses["box2D.dynamics.B2ContactManager"] = function() {
	this.m_world = null;
	this.m_contactCount = 0;
	this.m_contactFilter = box2D.dynamics.B2ContactFilter.b2_defaultFilter;
	this.m_contactListener = box2D.dynamics.B2ContactListener.b2_defaultListener;
	this.m_contactFactory = new box2D.dynamics.contacts.B2ContactFactory(this.m_allocator);
	this.m_broadPhase = new box2D.collision.B2DynamicTreeBroadPhase();
};
box2D.dynamics.B2ContactManager.__name__ = ["box2D","dynamics","B2ContactManager"];
box2D.dynamics.B2ContactManager.prototype = {
	m_allocator: null
	,m_contactFactory: null
	,m_contactListener: null
	,m_contactFilter: null
	,m_contactCount: null
	,m_contactList: null
	,m_broadPhase: null
	,m_world: null
	,collide: function() {
		var c = this.m_world.m_contactList;
		while(c != null) {
			var fixtureA = c.getFixtureA();
			var fixtureB = c.getFixtureB();
			var bodyA = fixtureA.getBody();
			var bodyB = fixtureB.getBody();
			if(bodyA.isAwake() == false && bodyB.isAwake() == false) {
				c = c.getNext();
				continue;
			}
			if((c.m_flags & box2D.dynamics.contacts.B2Contact.e_filterFlag) != 0) {
				if(bodyB.shouldCollide(bodyA) == false) {
					var cNuke = c;
					c = cNuke.getNext();
					this.destroy(cNuke);
					continue;
				}
				if(this.m_contactFilter.shouldCollide(fixtureA,fixtureB) == false) {
					var cNuke = c;
					c = cNuke.getNext();
					this.destroy(cNuke);
					continue;
				}
				c.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_filterFlag;
			}
			var proxyA = fixtureA.m_proxy;
			var proxyB = fixtureB.m_proxy;
			var overlap = this.m_broadPhase.testOverlap(proxyA,proxyB);
			if(overlap == false) {
				var cNuke = c;
				c = cNuke.getNext();
				this.destroy(cNuke);
				continue;
			}
			c.update(this.m_contactListener);
			c = c.getNext();
		}
	}
	,destroy: function(c) {
		var fixtureA = c.getFixtureA();
		var fixtureB = c.getFixtureB();
		var bodyA = fixtureA.getBody();
		var bodyB = fixtureB.getBody();
		if(c.isTouching()) this.m_contactListener.endContact(c);
		if(c.m_prev != null) c.m_prev.m_next = c.m_next;
		if(c.m_next != null) c.m_next.m_prev = c.m_prev;
		if(c == this.m_world.m_contactList) this.m_world.m_contactList = c.m_next;
		if(c.m_nodeA.prev != null) c.m_nodeA.prev.next = c.m_nodeA.next;
		if(c.m_nodeA.next != null) c.m_nodeA.next.prev = c.m_nodeA.prev;
		if(c.m_nodeA == bodyA.m_contactList) bodyA.m_contactList = c.m_nodeA.next;
		if(c.m_nodeB.prev != null) c.m_nodeB.prev.next = c.m_nodeB.next;
		if(c.m_nodeB.next != null) c.m_nodeB.next.prev = c.m_nodeB.prev;
		if(c.m_nodeB == bodyB.m_contactList) bodyB.m_contactList = c.m_nodeB.next;
		this.m_contactFactory.destroy(c);
		--this.m_contactCount;
	}
	,findNewContacts: function() {
		this.m_broadPhase.updatePairs($bind(this,this.addPair));
	}
	,addPair: function(proxyUserDataA,proxyUserDataB) {
		var fixtureA = js.Boot.__cast(proxyUserDataA , box2D.dynamics.B2Fixture);
		var fixtureB = js.Boot.__cast(proxyUserDataB , box2D.dynamics.B2Fixture);
		var bodyA = fixtureA.getBody();
		var bodyB = fixtureB.getBody();
		if(bodyA == bodyB) return;
		var edge = bodyB.getContactList();
		while(edge != null) {
			if(edge.other == bodyA) {
				var fA = edge.contact.getFixtureA();
				var fB = edge.contact.getFixtureB();
				if(fA == fixtureA && fB == fixtureB) return;
				if(fA == fixtureB && fB == fixtureA) return;
			}
			edge = edge.next;
		}
		if(bodyB.shouldCollide(bodyA) == false) return;
		if(this.m_contactFilter.shouldCollide(fixtureA,fixtureB) == false) return;
		var c = this.m_contactFactory.create(fixtureA,fixtureB);
		fixtureA = c.getFixtureA();
		fixtureB = c.getFixtureB();
		bodyA = fixtureA.m_body;
		bodyB = fixtureB.m_body;
		c.m_prev = null;
		c.m_next = this.m_world.m_contactList;
		if(this.m_world.m_contactList != null) this.m_world.m_contactList.m_prev = c;
		this.m_world.m_contactList = c;
		c.m_nodeA.contact = c;
		c.m_nodeA.other = bodyB;
		c.m_nodeA.prev = null;
		c.m_nodeA.next = bodyA.m_contactList;
		if(bodyA.m_contactList != null) bodyA.m_contactList.prev = c.m_nodeA;
		bodyA.m_contactList = c.m_nodeA;
		c.m_nodeB.contact = c;
		c.m_nodeB.other = bodyA;
		c.m_nodeB.prev = null;
		c.m_nodeB.next = bodyB.m_contactList;
		if(bodyB.m_contactList != null) bodyB.m_contactList.prev = c.m_nodeB;
		bodyB.m_contactList = c.m_nodeB;
		++this.m_world.m_contactCount;
		return;
	}
	,__class__: box2D.dynamics.B2ContactManager
}
box2D.dynamics.B2DebugDraw = $hxClasses["box2D.dynamics.B2DebugDraw"] = function() {
	this.m_drawScale = 1.0;
	this.m_lineThickness = 1.0;
	this.m_alpha = 1.0;
	this.m_fillAlpha = 1.0;
	this.m_xformScale = 1.0;
	this.m_drawFlags = 0;
};
box2D.dynamics.B2DebugDraw.__name__ = ["box2D","dynamics","B2DebugDraw"];
box2D.dynamics.B2DebugDraw.prototype = {
	m_xformScale: null
	,m_fillAlpha: null
	,m_alpha: null
	,m_lineThickness: null
	,m_drawScale: null
	,m_ctx: null
	,m_canvas: null
	,m_drawFlags: null
	,drawTransform: function(xf) {
	}
	,drawSegment: function(p1,p2,color) {
		this.m_ctx.beginPath();
		this.m_ctx.moveTo(p1.x * this.m_drawScale,p1.y * this.m_drawScale);
		this.m_ctx.lineTo(p2.x * this.m_drawScale,p2.y * this.m_drawScale);
		this.m_ctx.closePath();
		this.m_ctx.globalAlpha = this.m_alpha;
		this.m_ctx.strokeStyle = "#" + StringTools.hex(color.getColor());
		this.m_ctx.lineWidth = this.m_lineThickness;
		this.m_ctx.stroke();
	}
	,drawSolidCircle: function(center,radius,axis,color) {
		this.m_ctx.beginPath();
		this.m_ctx.arc(center.x * this.m_drawScale,center.y * this.m_drawScale,radius * this.m_drawScale,0,Math.PI * 2,true);
		this.m_ctx.closePath();
		this.m_ctx.globalAlpha = this.m_fillAlpha;
		this.m_ctx.fillStyle = "#" + StringTools.hex(color.getColor());
		this.m_ctx.fill();
		this.m_ctx.globalAlpha = this.m_alpha;
		this.m_ctx.lineWidth = this.m_lineThickness;
		this.m_ctx.strokeStyle = "#" + StringTools.hex(color.getColor());
		this.m_ctx.stroke();
		this.m_ctx.beginPath();
		this.m_ctx.moveTo(center.x * this.m_drawScale,center.y * this.m_drawScale);
		this.m_ctx.lineTo((center.x + axis.x * radius) * this.m_drawScale,(center.y + axis.y * radius) * this.m_drawScale);
		this.m_ctx.closePath();
		this.m_ctx.stroke();
	}
	,drawCircle: function(center,radius,color) {
		this.m_ctx.beginPath();
		this.m_ctx.arc(center.x * this.m_drawScale,center.y * this.m_drawScale,radius * this.m_drawScale,0,Math.PI * 2,true);
		this.m_ctx.closePath();
		this.m_ctx.globalAlpha = this.m_alpha;
		this.m_ctx.lineWidth = this.m_lineThickness;
		this.m_ctx.strokeStyle = "#" + StringTools.hex(color.getColor());
		this.m_ctx.stroke();
	}
	,drawSolidPolygon: function(vertices,vertexCount,color) {
		this.m_ctx.beginPath();
		this.m_ctx.moveTo(vertices[0].x * this.m_drawScale,vertices[0].y * this.m_drawScale);
		var _g = 1;
		while(_g < vertexCount) {
			var i = _g++;
			this.m_ctx.lineTo(vertices[i].x * this.m_drawScale,vertices[i].y * this.m_drawScale);
		}
		this.m_ctx.lineTo(vertices[0].x * this.m_drawScale,vertices[0].y * this.m_drawScale);
		this.m_ctx.closePath();
		this.m_ctx.globalAlpha = this.m_alpha;
		this.m_ctx.strokeStyle = "#" + StringTools.hex(color.getColor());
		this.m_ctx.lineWidth = this.m_lineThickness;
		this.m_ctx.stroke();
		this.m_ctx.globalAlpha = this.m_fillAlpha;
		this.m_ctx.fillStyle = "#" + StringTools.hex(color.getColor());
		this.m_ctx.fill();
	}
	,drawPolygon: function(vertices,vertexCount,color) {
		this.m_ctx.beginPath();
		this.m_ctx.moveTo(vertices[0].x * this.m_drawScale,vertices[0].y * this.m_drawScale);
		var _g = 1;
		while(_g < vertexCount) {
			var i = _g++;
			this.m_ctx.lineTo(vertices[i].x * this.m_drawScale,vertices[i].y * this.m_drawScale);
		}
		this.m_ctx.lineTo(vertices[0].x * this.m_drawScale,vertices[0].y * this.m_drawScale);
		this.m_ctx.closePath();
		this.m_ctx.globalAlpha = this.m_alpha;
		this.m_ctx.strokeStyle = "#" + StringTools.hex(color.getColor());
		this.m_ctx.lineWidth = this.m_lineThickness;
		this.m_ctx.stroke();
	}
	,getXFormScale: function() {
		return this.m_xformScale;
	}
	,setXFormScale: function(xformScale) {
		this.m_xformScale = xformScale;
	}
	,getFillAlpha: function() {
		return this.m_fillAlpha;
	}
	,setFillAlpha: function(alpha) {
		this.m_fillAlpha = alpha;
	}
	,getAlpha: function() {
		return this.m_alpha;
	}
	,setAlpha: function(alpha) {
		this.m_alpha = alpha;
	}
	,getLineThickness: function() {
		return this.m_lineThickness;
	}
	,setLineThickness: function(lineThickness) {
		this.m_lineThickness = lineThickness;
	}
	,getDrawScale: function() {
		return this.m_drawScale;
	}
	,setDrawScale: function(drawScale) {
		this.m_drawScale = drawScale;
	}
	,setCanvas: function(canvas) {
		this.m_canvas = canvas;
		this.m_ctx = canvas.getContext("2d");
	}
	,clearFlags: function(flags) {
		this.m_drawFlags &= ~flags;
	}
	,appendFlags: function(flags) {
		this.m_drawFlags |= flags;
	}
	,getFlags: function() {
		return this.m_drawFlags;
	}
	,setFlags: function(flags) {
		this.m_drawFlags = flags;
	}
	,__class__: box2D.dynamics.B2DebugDraw
}
box2D.dynamics.B2DestructionListener = $hxClasses["box2D.dynamics.B2DestructionListener"] = function() { }
box2D.dynamics.B2DestructionListener.__name__ = ["box2D","dynamics","B2DestructionListener"];
box2D.dynamics.B2DestructionListener.prototype = {
	sayGoodbyeFixture: function(fixture) {
	}
	,sayGoodbyeJoint: function(joint) {
	}
	,__class__: box2D.dynamics.B2DestructionListener
}
box2D.dynamics.B2FilterData = $hxClasses["box2D.dynamics.B2FilterData"] = function() {
	this.categoryBits = 1;
	this.maskBits = 65535;
	this.groupIndex = 0;
};
box2D.dynamics.B2FilterData.__name__ = ["box2D","dynamics","B2FilterData"];
box2D.dynamics.B2FilterData.prototype = {
	groupIndex: null
	,maskBits: null
	,categoryBits: null
	,copy: function() {
		var copy = new box2D.dynamics.B2FilterData();
		copy.categoryBits = this.categoryBits;
		copy.maskBits = this.maskBits;
		copy.groupIndex = this.groupIndex;
		return copy;
	}
	,__class__: box2D.dynamics.B2FilterData
}
box2D.dynamics.B2Fixture = $hxClasses["box2D.dynamics.B2Fixture"] = function() {
	this.m_filter = new box2D.dynamics.B2FilterData();
	this.m_aabb = new box2D.collision.B2AABB();
	this.m_userData = null;
	this.m_body = null;
	this.m_next = null;
	this.m_shape = null;
	this.m_density = 0.0;
	this.m_friction = 0.0;
	this.m_restitution = 0.0;
};
box2D.dynamics.B2Fixture.__name__ = ["box2D","dynamics","B2Fixture"];
box2D.dynamics.B2Fixture.prototype = {
	m_userData: null
	,m_isSensor: null
	,m_filter: null
	,m_proxy: null
	,m_restitution: null
	,m_friction: null
	,m_shape: null
	,m_body: null
	,m_next: null
	,m_density: null
	,m_aabb: null
	,m_massData: null
	,synchronize: function(broadPhase,transform1,transform2) {
		if(this.m_proxy == null) return;
		var aabb1 = new box2D.collision.B2AABB();
		var aabb2 = new box2D.collision.B2AABB();
		this.m_shape.computeAABB(aabb1,transform1);
		this.m_shape.computeAABB(aabb2,transform2);
		this.m_aabb.combine(aabb1,aabb2);
		var displacement = box2D.common.math.B2Math.subtractVV(transform2.position,transform1.position);
		broadPhase.moveProxy(this.m_proxy,this.m_aabb,displacement);
	}
	,destroyProxy: function(broadPhase) {
		if(this.m_proxy == null) return;
		broadPhase.destroyProxy(this.m_proxy);
		this.m_proxy = null;
	}
	,createProxy: function(broadPhase,xf) {
		this.m_shape.computeAABB(this.m_aabb,xf);
		this.m_proxy = broadPhase.createProxy(this.m_aabb,this);
	}
	,destroy: function() {
		this.m_shape = null;
	}
	,create: function(body,xf,def) {
		this.m_userData = def.userData;
		this.m_friction = def.friction;
		this.m_restitution = def.restitution;
		this.m_body = body;
		this.m_next = null;
		this.m_filter = def.filter.copy();
		this.m_isSensor = def.isSensor;
		this.m_shape = def.shape.copy();
		this.m_density = def.density;
	}
	,getAABB: function() {
		return this.m_aabb;
	}
	,setRestitution: function(restitution) {
		this.m_restitution = restitution;
	}
	,getRestitution: function() {
		return this.m_restitution;
	}
	,setFriction: function(friction) {
		this.m_friction = friction;
	}
	,getFriction: function() {
		return this.m_friction;
	}
	,getDensity: function() {
		return this.m_density;
	}
	,setDensity: function(density) {
		this.m_density = density;
	}
	,getMassData: function(massData) {
		if(massData == null) massData = new box2D.collision.shapes.B2MassData();
		this.m_shape.computeMass(massData,this.m_density);
		return massData;
	}
	,rayCast: function(output,input) {
		return this.m_shape.rayCast(output,input,this.m_body.getTransform());
	}
	,testPoint: function(p) {
		return this.m_shape.testPoint(this.m_body.getTransform(),p);
	}
	,SetUserData: function(data) {
		this.m_userData = data;
	}
	,getUserData: function() {
		return this.m_userData;
	}
	,getNext: function() {
		return this.m_next;
	}
	,getBody: function() {
		return this.m_body;
	}
	,getFilterData: function() {
		return this.m_filter.copy();
	}
	,setFilterData: function(filter) {
		this.m_filter = filter.copy();
		if(this.m_body != null) return;
		var edge = this.m_body.getContactList();
		while(edge != null) {
			var contact = edge.contact;
			var fixtureA = contact.getFixtureA();
			var fixtureB = contact.getFixtureB();
			if(fixtureA == this || fixtureB == this) contact.flagForFiltering();
			edge = edge.next;
		}
	}
	,isSensor: function() {
		return this.m_isSensor;
	}
	,setSensor: function(sensor) {
		if(this.m_isSensor == sensor) return;
		this.m_isSensor = sensor;
		if(this.m_body == null) return;
		var edge = this.m_body.getContactList();
		while(edge != null) {
			var contact = edge.contact;
			var fixtureA = contact.getFixtureA();
			var fixtureB = contact.getFixtureB();
			if(fixtureA == this || fixtureB == this) contact.setSensor(fixtureA.isSensor() || fixtureB.isSensor());
			edge = edge.next;
		}
	}
	,getShape: function() {
		return this.m_shape;
	}
	,getType: function() {
		return this.m_shape.getType();
	}
	,__class__: box2D.dynamics.B2Fixture
}
box2D.dynamics.B2FixtureDef = $hxClasses["box2D.dynamics.B2FixtureDef"] = function() {
	this.filter = new box2D.dynamics.B2FilterData();
	this.shape = null;
	this.userData = null;
	this.friction = 0.2;
	this.restitution = 0.0;
	this.density = 0.0;
	this.filter.categoryBits = 1;
	this.filter.maskBits = 65535;
	this.filter.groupIndex = 0;
	this.isSensor = false;
};
box2D.dynamics.B2FixtureDef.__name__ = ["box2D","dynamics","B2FixtureDef"];
box2D.dynamics.B2FixtureDef.prototype = {
	filter: null
	,isSensor: null
	,density: null
	,restitution: null
	,friction: null
	,userData: null
	,shape: null
	,__class__: box2D.dynamics.B2FixtureDef
}
box2D.dynamics.B2Island = $hxClasses["box2D.dynamics.B2Island"] = function() {
	this.m_bodies = new Array();
	this.m_contacts = new Array();
	this.m_joints = new Array();
};
box2D.dynamics.B2Island.__name__ = ["box2D","dynamics","B2Island"];
box2D.dynamics.B2Island.prototype = {
	m_jointCapacity: null
	,m_contactCapacity: null
	,m_bodyCapacity: null
	,m_contactCount: null
	,m_jointCount: null
	,m_bodyCount: null
	,m_joints: null
	,m_contacts: null
	,m_bodies: null
	,m_contactSolver: null
	,m_listener: null
	,m_allocator: null
	,addJoint: function(joint) {
		this.m_joints[this.m_jointCount++] = joint;
	}
	,addContact: function(contact) {
		this.m_contacts[this.m_contactCount++] = contact;
	}
	,addBody: function(body) {
		body.m_islandIndex = this.m_bodyCount;
		this.m_bodies[this.m_bodyCount++] = body;
	}
	,report: function(constraints) {
		if(this.m_listener == null) return;
		var _g1 = 0, _g = this.m_contactCount;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_contacts[i];
			var cc = constraints[i];
			var _g3 = 0, _g2 = cc.pointCount;
			while(_g3 < _g2) {
				var j = _g3++;
				box2D.dynamics.B2Island.s_impulse.normalImpulses[j] = cc.points[j].normalImpulse;
				box2D.dynamics.B2Island.s_impulse.tangentImpulses[j] = cc.points[j].tangentImpulse;
			}
			this.m_listener.postSolve(c,box2D.dynamics.B2Island.s_impulse);
		}
	}
	,solveTOI: function(subStep) {
		var i;
		var j;
		this.m_contactSolver.initialize(subStep,this.m_contacts,this.m_contactCount,this.m_allocator);
		var contactSolver = this.m_contactSolver;
		var _g1 = 0, _g = this.m_jointCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			this.m_joints[i1].initVelocityConstraints(subStep);
		}
		var _g1 = 0, _g = subStep.velocityIterations;
		while(_g1 < _g) {
			var i1 = _g1++;
			contactSolver.solveVelocityConstraints();
			var _g3 = 0, _g2 = this.m_jointCount;
			while(_g3 < _g2) {
				var j1 = _g3++;
				this.m_joints[j1].solveVelocityConstraints(subStep);
			}
		}
		var _g1 = 0, _g = this.m_bodyCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			var b = this.m_bodies[i1];
			if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) continue;
			var translationX = subStep.dt * b.m_linearVelocity.x;
			var translationY = subStep.dt * b.m_linearVelocity.y;
			if(translationX * translationX + translationY * translationY > box2D.common.B2Settings.b2_maxTranslationSquared) {
				b.m_linearVelocity.normalize();
				b.m_linearVelocity.x *= box2D.common.B2Settings.b2_maxTranslation * subStep.inv_dt;
				b.m_linearVelocity.y *= box2D.common.B2Settings.b2_maxTranslation * subStep.inv_dt;
			}
			var rotation = subStep.dt * b.m_angularVelocity;
			if(rotation * rotation > box2D.common.B2Settings.b2_maxRotationSquared) {
				if(b.m_angularVelocity < 0.0) b.m_angularVelocity = -box2D.common.B2Settings.b2_maxRotation * subStep.inv_dt; else b.m_angularVelocity = box2D.common.B2Settings.b2_maxRotation * subStep.inv_dt;
			}
			b.m_sweep.c0.setV(b.m_sweep.c);
			b.m_sweep.a0 = b.m_sweep.a;
			b.m_sweep.c.x += subStep.dt * b.m_linearVelocity.x;
			b.m_sweep.c.y += subStep.dt * b.m_linearVelocity.y;
			b.m_sweep.a += subStep.dt * b.m_angularVelocity;
			b.synchronizeTransform();
		}
		var k_toiBaumgarte = 0.75;
		var _g1 = 0, _g = subStep.positionIterations;
		while(_g1 < _g) {
			var i1 = _g1++;
			var contactsOkay = contactSolver.solvePositionConstraints(k_toiBaumgarte);
			var jointsOkay = true;
			var _g3 = 0, _g2 = this.m_jointCount;
			while(_g3 < _g2) {
				var j1 = _g3++;
				var jointOkay = this.m_joints[j1].solvePositionConstraints(box2D.common.B2Settings.b2_contactBaumgarte);
				jointsOkay = jointsOkay && jointOkay;
			}
			if(contactsOkay && jointsOkay) break;
		}
		this.report(contactSolver.m_constraints);
	}
	,solve: function(step,gravity,allowSleep) {
		var i;
		var j;
		var b;
		var joint;
		var _g1 = 0, _g = this.m_bodyCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			b = this.m_bodies[i1];
			if(b.getType() != box2D.dynamics.B2Body.b2_dynamicBody) continue;
			b.m_linearVelocity.x += step.dt * (gravity.x + b.m_invMass * b.m_force.x);
			b.m_linearVelocity.y += step.dt * (gravity.y + b.m_invMass * b.m_force.y);
			b.m_angularVelocity += step.dt * b.m_invI * b.m_torque;
			b.m_linearVelocity.multiply(box2D.common.math.B2Math.clamp(1.0 - step.dt * b.m_linearDamping,0.0,1.0));
			b.m_angularVelocity *= box2D.common.math.B2Math.clamp(1.0 - step.dt * b.m_angularDamping,0.0,1.0);
		}
		this.m_contactSolver.initialize(step,this.m_contacts,this.m_contactCount,this.m_allocator);
		var contactSolver = this.m_contactSolver;
		contactSolver.initVelocityConstraints(step);
		var _g1 = 0, _g = this.m_jointCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			joint = this.m_joints[i1];
			joint.initVelocityConstraints(step);
		}
		var _g1 = 0, _g = step.velocityIterations;
		while(_g1 < _g) {
			var i1 = _g1++;
			var _g3 = 0, _g2 = this.m_jointCount;
			while(_g3 < _g2) {
				var j1 = _g3++;
				joint = this.m_joints[j1];
				joint.solveVelocityConstraints(step);
			}
			contactSolver.solveVelocityConstraints();
		}
		var _g1 = 0, _g = this.m_jointCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			joint = this.m_joints[i1];
			joint.finalizeVelocityConstraints();
		}
		contactSolver.finalizeVelocityConstraints();
		var _g1 = 0, _g = this.m_bodyCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			b = this.m_bodies[i1];
			if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) continue;
			var translationX = step.dt * b.m_linearVelocity.x;
			var translationY = step.dt * b.m_linearVelocity.y;
			if(translationX * translationX + translationY * translationY > box2D.common.B2Settings.b2_maxTranslationSquared) {
				b.m_linearVelocity.normalize();
				b.m_linearVelocity.x *= box2D.common.B2Settings.b2_maxTranslation * step.inv_dt;
				b.m_linearVelocity.y *= box2D.common.B2Settings.b2_maxTranslation * step.inv_dt;
			}
			var rotation = step.dt * b.m_angularVelocity;
			if(rotation * rotation > box2D.common.B2Settings.b2_maxRotationSquared) {
				if(b.m_angularVelocity < 0.0) b.m_angularVelocity = -box2D.common.B2Settings.b2_maxRotation * step.inv_dt; else b.m_angularVelocity = box2D.common.B2Settings.b2_maxRotation * step.inv_dt;
			}
			b.m_sweep.c0.setV(b.m_sweep.c);
			b.m_sweep.a0 = b.m_sweep.a;
			b.m_sweep.c.x += step.dt * b.m_linearVelocity.x;
			b.m_sweep.c.y += step.dt * b.m_linearVelocity.y;
			b.m_sweep.a += step.dt * b.m_angularVelocity;
			b.synchronizeTransform();
		}
		var _g1 = 0, _g = step.positionIterations;
		while(_g1 < _g) {
			var i1 = _g1++;
			var contactsOkay = contactSolver.solvePositionConstraints(box2D.common.B2Settings.b2_contactBaumgarte);
			var jointsOkay = true;
			var _g3 = 0, _g2 = this.m_jointCount;
			while(_g3 < _g2) {
				var j1 = _g3++;
				joint = this.m_joints[j1];
				var jointOkay = joint.solvePositionConstraints(box2D.common.B2Settings.b2_contactBaumgarte);
				jointsOkay = jointsOkay && jointOkay;
			}
			if(contactsOkay && jointsOkay) break;
		}
		this.report(contactSolver.m_constraints);
		if(allowSleep) {
			var minSleepTime = Number.MAX_VALUE;
			var linTolSqr = box2D.common.B2Settings.b2_linearSleepTolerance * box2D.common.B2Settings.b2_linearSleepTolerance;
			var angTolSqr = box2D.common.B2Settings.b2_angularSleepTolerance * box2D.common.B2Settings.b2_angularSleepTolerance;
			var _g1 = 0, _g = this.m_bodyCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				b = this.m_bodies[i1];
				if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) continue;
				if((b.m_flags & box2D.dynamics.B2Body.e_allowSleepFlag) == 0) {
					b.m_sleepTime = 0.0;
					minSleepTime = 0.0;
				}
				if((b.m_flags & box2D.dynamics.B2Body.e_allowSleepFlag) == 0 || b.m_angularVelocity * b.m_angularVelocity > angTolSqr || box2D.common.math.B2Math.dot(b.m_linearVelocity,b.m_linearVelocity) > linTolSqr) {
					b.m_sleepTime = 0.0;
					minSleepTime = 0.0;
				} else {
					b.m_sleepTime += step.dt;
					minSleepTime = box2D.common.math.B2Math.min(minSleepTime,b.m_sleepTime);
				}
			}
			if(minSleepTime >= box2D.common.B2Settings.b2_timeToSleep) {
				var _g1 = 0, _g = this.m_bodyCount;
				while(_g1 < _g) {
					var i1 = _g1++;
					b = this.m_bodies[i1];
					b.setAwake(false);
				}
			}
		}
	}
	,clear: function() {
		this.m_bodyCount = 0;
		this.m_contactCount = 0;
		this.m_jointCount = 0;
	}
	,initialize: function(bodyCapacity,contactCapacity,jointCapacity,allocator,listener,contactSolver) {
		var i;
		this.m_bodyCapacity = bodyCapacity;
		this.m_contactCapacity = contactCapacity;
		this.m_jointCapacity = jointCapacity;
		this.m_bodyCount = 0;
		this.m_contactCount = 0;
		this.m_jointCount = 0;
		this.m_allocator = allocator;
		this.m_listener = listener;
		this.m_contactSolver = contactSolver;
		var _g = this.m_bodies.length;
		while(_g < bodyCapacity) {
			var i1 = _g++;
			this.m_bodies[i1] = null;
		}
		var _g = this.m_contacts.length;
		while(_g < contactCapacity) {
			var i1 = _g++;
			this.m_contacts[i1] = null;
		}
		var _g = this.m_joints.length;
		while(_g < jointCapacity) {
			var i1 = _g++;
			this.m_joints[i1] = null;
		}
	}
	,__class__: box2D.dynamics.B2Island
}
box2D.dynamics.B2TimeStep = $hxClasses["box2D.dynamics.B2TimeStep"] = function() {
};
box2D.dynamics.B2TimeStep.__name__ = ["box2D","dynamics","B2TimeStep"];
box2D.dynamics.B2TimeStep.prototype = {
	warmStarting: null
	,positionIterations: null
	,velocityIterations: null
	,dtRatio: null
	,inv_dt: null
	,dt: null
	,set: function(step) {
		this.dt = step.dt;
		this.inv_dt = step.inv_dt;
		this.positionIterations = step.positionIterations;
		this.velocityIterations = step.velocityIterations;
		this.warmStarting = step.warmStarting;
	}
	,__class__: box2D.dynamics.B2TimeStep
}
box2D.dynamics.B2World = $hxClasses["box2D.dynamics.B2World"] = function(gravity,doSleep) {
	this.s_stack = new Array();
	this.m_contactManager = new box2D.dynamics.B2ContactManager();
	this.m_contactSolver = new box2D.dynamics.contacts.B2ContactSolver();
	this.m_island = new box2D.dynamics.B2Island();
	this.m_destructionListener = null;
	this.m_debugDraw = null;
	this.m_bodyList = null;
	this.m_contactList = null;
	this.m_jointList = null;
	this.m_controllerList = null;
	this.m_bodyCount = 0;
	this.m_contactCount = 0;
	this.m_jointCount = 0;
	this.m_controllerCount = 0;
	box2D.dynamics.B2World.m_warmStarting = true;
	box2D.dynamics.B2World.m_continuousPhysics = true;
	this.m_allowSleep = doSleep;
	this.m_gravity = gravity;
	this.m_inv_dt0 = 0.0;
	this.m_contactManager.m_world = this;
	var bd = new box2D.dynamics.B2BodyDef();
	this.m_groundBody = this.createBody(bd);
};
box2D.dynamics.B2World.__name__ = ["box2D","dynamics","B2World"];
box2D.dynamics.B2World.m_warmStarting = null;
box2D.dynamics.B2World.m_continuousPhysics = null;
box2D.dynamics.B2World.prototype = {
	m_inv_dt0: null
	,m_debugDraw: null
	,m_destructionListener: null
	,m_groundBody: null
	,m_allowSleep: null
	,m_gravity: null
	,m_controllerCount: null
	,m_controllerList: null
	,m_jointCount: null
	,m_contactCount: null
	,m_bodyCount: null
	,m_contactList: null
	,m_jointList: null
	,m_bodyList: null
	,m_island: null
	,m_contactSolver: null
	,m_contactManager: null
	,m_flags: null
	,drawShape: function(shape,xf,color) {
		switch(shape.m_type) {
		case box2D.collision.shapes.B2Shape.e_circleShape:
			var circle = js.Boot.__cast(shape , box2D.collision.shapes.B2CircleShape);
			var center = box2D.common.math.B2Math.mulX(xf,circle.m_p);
			var radius = circle.m_radius;
			var axis = xf.R.col1;
			this.m_debugDraw.drawSolidCircle(center,radius,axis,color);
			break;
		case box2D.collision.shapes.B2Shape.e_polygonShape:
			var i;
			var poly = js.Boot.__cast(shape , box2D.collision.shapes.B2PolygonShape);
			var vertexCount = poly.getVertexCount();
			var localVertices = poly.getVertices();
			var vertices = new Array();
			var _g = 0;
			while(_g < vertexCount) {
				var i1 = _g++;
				vertices[i1] = box2D.common.math.B2Math.mulX(xf,localVertices[i1]);
			}
			this.m_debugDraw.drawSolidPolygon(vertices,vertexCount,color);
			break;
		case box2D.collision.shapes.B2Shape.e_edgeShape:
			var edge = js.Boot.__cast(shape , box2D.collision.shapes.B2EdgeShape);
			this.m_debugDraw.drawSegment(box2D.common.math.B2Math.mulX(xf,edge.getVertex1()),box2D.common.math.B2Math.mulX(xf,edge.getVertex2()),color);
			break;
		}
	}
	,drawJoint: function(joint) {
		var b1 = joint.getBodyA();
		var b2 = joint.getBodyB();
		var xf1 = b1.m_xf;
		var xf2 = b2.m_xf;
		var x1 = xf1.position;
		var x2 = xf2.position;
		var p1 = joint.getAnchorA();
		var p2 = joint.getAnchorB();
		var color = box2D.dynamics.B2World.s_jointColor;
		switch(joint.m_type) {
		case box2D.dynamics.joints.B2Joint.e_distanceJoint:
			this.m_debugDraw.drawSegment(p1,p2,color);
			break;
		case box2D.dynamics.joints.B2Joint.e_pulleyJoint:
			var pulley = js.Boot.__cast(joint , box2D.dynamics.joints.B2PulleyJoint);
			var s1 = pulley.getGroundAnchorA();
			var s2 = pulley.getGroundAnchorB();
			this.m_debugDraw.drawSegment(s1,p1,color);
			this.m_debugDraw.drawSegment(s2,p2,color);
			this.m_debugDraw.drawSegment(s1,s2,color);
			break;
		case box2D.dynamics.joints.B2Joint.e_mouseJoint:
			this.m_debugDraw.drawSegment(p1,p2,color);
			break;
		default:
			if(b1 != this.m_groundBody) this.m_debugDraw.drawSegment(x1,p1,color);
			this.m_debugDraw.drawSegment(p1,p2,color);
			if(b2 != this.m_groundBody) this.m_debugDraw.drawSegment(x2,p2,color);
		}
	}
	,solveTOI: function(step) {
		var b;
		var fA;
		var fB;
		var bA;
		var bB;
		var cEdge;
		var j;
		var island = this.m_island;
		island.initialize(this.m_bodyCount,box2D.common.B2Settings.b2_maxTOIContactsPerIsland,box2D.common.B2Settings.b2_maxTOIJointsPerIsland,null,this.m_contactManager.m_contactListener,this.m_contactSolver);
		var queue = box2D.dynamics.B2World.s_queue;
		b = this.m_bodyList;
		while(b != null) {
			b.m_flags &= ~box2D.dynamics.B2Body.e_islandFlag;
			b.m_sweep.t0 = 0.0;
			b = b.m_next;
		}
		var c = this.m_contactList;
		while(c != null) {
			c.m_flags &= ~(box2D.dynamics.contacts.B2Contact.e_toiFlag | box2D.dynamics.contacts.B2Contact.e_islandFlag);
			c = c.m_next;
		}
		j = this.m_jointList;
		while(j != null) {
			j.m_islandFlag = false;
			j = j.m_next;
		}
		while(true) {
			var minContact = null;
			var minTOI = 1.0;
			c = this.m_contactList;
			while(c != null) {
				if(c.isSensor() == true || c.isEnabled() == false || c.isContinuous() == false) {
					c = c.m_next;
					continue;
				}
				var toi = 1.0;
				if((c.m_flags & box2D.dynamics.contacts.B2Contact.e_toiFlag) != 0) toi = c.m_toi; else {
					fA = c.m_fixtureA;
					fB = c.m_fixtureB;
					bA = fA.m_body;
					bB = fB.m_body;
					if((bA.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bA.isAwake() == false) && (bB.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bB.isAwake() == false)) {
						c = c.m_next;
						continue;
					}
					var t0 = bA.m_sweep.t0;
					if(bA.m_sweep.t0 < bB.m_sweep.t0) {
						t0 = bB.m_sweep.t0;
						bA.m_sweep.advance(t0);
					} else if(bB.m_sweep.t0 < bA.m_sweep.t0) {
						t0 = bA.m_sweep.t0;
						bB.m_sweep.advance(t0);
					}
					toi = c.computeTOI(bA.m_sweep,bB.m_sweep);
					box2D.common.B2Settings.b2Assert(0.0 <= toi && toi <= 1.0);
					if(toi > 0.0 && toi < 1.0) {
						toi = (1.0 - toi) * t0 + toi;
						if(toi > 1) toi = 1;
					}
					c.m_toi = toi;
					c.m_flags |= box2D.dynamics.contacts.B2Contact.e_toiFlag;
				}
				if(Number.MIN_VALUE < toi && toi < minTOI) {
					minContact = c;
					minTOI = toi;
				}
				c = c.m_next;
			}
			if(minContact == null || 1.0 - 100.0 * Number.MIN_VALUE < minTOI) break;
			fA = minContact.m_fixtureA;
			fB = minContact.m_fixtureB;
			bA = fA.m_body;
			bB = fB.m_body;
			box2D.dynamics.B2World.s_backupA.set(bA.m_sweep);
			box2D.dynamics.B2World.s_backupB.set(bB.m_sweep);
			bA.advance(minTOI);
			bB.advance(minTOI);
			minContact.update(this.m_contactManager.m_contactListener);
			minContact.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_toiFlag;
			if(minContact.isSensor() == true || minContact.isEnabled() == false) {
				bA.m_sweep.set(box2D.dynamics.B2World.s_backupA);
				bB.m_sweep.set(box2D.dynamics.B2World.s_backupB);
				bA.synchronizeTransform();
				bB.synchronizeTransform();
				continue;
			}
			if(minContact.isTouching() == false) continue;
			var seed = bA;
			if(seed.getType() != box2D.dynamics.B2Body.b2_dynamicBody) seed = bB;
			island.clear();
			var queueStart = 0;
			var queueSize = 0;
			queue[queueStart + queueSize++] = seed;
			seed.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
			while(queueSize > 0) {
				b = queue[queueStart++];
				--queueSize;
				island.addBody(b);
				if(b.isAwake() == false) b.setAwake(true);
				if(b.getType() != box2D.dynamics.B2Body.b2_dynamicBody) continue;
				cEdge = b.m_contactList;
				var other;
				while(cEdge != null) {
					if(island.m_contactCount == island.m_contactCapacity) {
						cEdge = cEdge.next;
						break;
					}
					if((cEdge.contact.m_flags & box2D.dynamics.contacts.B2Contact.e_islandFlag) != 0) {
						cEdge = cEdge.next;
						continue;
					}
					if(cEdge.contact.isSensor() == true || cEdge.contact.isEnabled() == false || cEdge.contact.isTouching() == false) {
						cEdge = cEdge.next;
						continue;
					}
					island.addContact(cEdge.contact);
					cEdge.contact.m_flags |= box2D.dynamics.contacts.B2Contact.e_islandFlag;
					other = cEdge.other;
					if((other.m_flags & box2D.dynamics.B2Body.e_islandFlag) != 0) {
						cEdge = cEdge.next;
						continue;
					}
					if(other.getType() != box2D.dynamics.B2Body.b2_staticBody) {
						other.advance(minTOI);
						other.setAwake(true);
					}
					queue[queueStart + queueSize] = other;
					++queueSize;
					other.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
					cEdge = cEdge.next;
				}
				var jEdge = b.m_jointList;
				while(jEdge != null) {
					if(island.m_jointCount == island.m_jointCapacity) {
						jEdge = jEdge.next;
						continue;
					}
					if(jEdge.joint.m_islandFlag == true) {
						jEdge = jEdge.next;
						continue;
					}
					other = jEdge.other;
					if(other.isActive() == false) {
						jEdge = jEdge.next;
						continue;
					}
					island.addJoint(jEdge.joint);
					jEdge.joint.m_islandFlag = true;
					if((other.m_flags & box2D.dynamics.B2Body.e_islandFlag) != 0) {
						jEdge = jEdge.next;
						continue;
					}
					if(other.getType() != box2D.dynamics.B2Body.b2_staticBody) {
						other.advance(minTOI);
						other.setAwake(true);
					}
					queue[queueStart + queueSize] = other;
					++queueSize;
					other.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
					jEdge = jEdge.next;
				}
			}
			var subStep = box2D.dynamics.B2World.s_timestep;
			subStep.warmStarting = false;
			subStep.dt = (1.0 - minTOI) * step.dt;
			subStep.inv_dt = 1.0 / subStep.dt;
			subStep.dtRatio = 0.0;
			subStep.velocityIterations = step.velocityIterations;
			subStep.positionIterations = step.positionIterations;
			island.solveTOI(subStep);
			var i;
			var _g1 = 0, _g = island.m_bodyCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				b = island.m_bodies[i1];
				b.m_flags &= ~box2D.dynamics.B2Body.e_islandFlag;
				if(b.isAwake() == false) continue;
				if(b.getType() != box2D.dynamics.B2Body.b2_dynamicBody) continue;
				b.synchronizeFixtures();
				cEdge = b.m_contactList;
				while(cEdge != null) {
					cEdge.contact.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_toiFlag;
					cEdge = cEdge.next;
				}
			}
			var _g1 = 0, _g = island.m_contactCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				c = island.m_contacts[i1];
				c.m_flags &= ~(box2D.dynamics.contacts.B2Contact.e_toiFlag | box2D.dynamics.contacts.B2Contact.e_islandFlag);
			}
			var _g1 = 0, _g = island.m_jointCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				j = island.m_joints[i1];
				j.m_islandFlag = false;
			}
			this.m_contactManager.findNewContacts();
		}
	}
	,solve: function(step) {
		var b;
		var controller = this.m_controllerList;
		while(controller != null) {
			controller.step(step);
			controller = controller.m_next;
		}
		var island = this.m_island;
		island.initialize(this.m_bodyCount,this.m_contactCount,this.m_jointCount,null,this.m_contactManager.m_contactListener,this.m_contactSolver);
		b = this.m_bodyList;
		while(b != null) {
			b.m_flags &= ~box2D.dynamics.B2Body.e_islandFlag;
			b = b.m_next;
		}
		var c = this.m_contactList;
		while(c != null) {
			c.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_islandFlag;
			c = c.m_next;
		}
		var j = this.m_jointList;
		while(j != null) {
			j.m_islandFlag = false;
			j = j.m_next;
		}
		var stackSize = this.m_bodyCount;
		var stack = this.s_stack;
		var seed = this.m_bodyList;
		while(seed != null) {
			if((seed.m_flags & box2D.dynamics.B2Body.e_islandFlag) != 0) {
				seed = seed.m_next;
				continue;
			}
			if(seed.isAwake() == false || seed.isActive() == false) {
				seed = seed.m_next;
				continue;
			}
			if(seed.getType() == box2D.dynamics.B2Body.b2_staticBody) {
				seed = seed.m_next;
				continue;
			}
			island.clear();
			var stackCount = 0;
			stack[stackCount++] = seed;
			seed.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
			while(stackCount > 0) {
				b = stack[--stackCount];
				island.addBody(b);
				if(b.isAwake() == false) b.setAwake(true);
				if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) continue;
				var other;
				var ce = b.m_contactList;
				while(ce != null) {
					if((ce.contact.m_flags & box2D.dynamics.contacts.B2Contact.e_islandFlag) != 0) {
						ce = ce.next;
						continue;
					}
					if(ce.contact.isSensor() == true || ce.contact.isEnabled() == false || ce.contact.isTouching() == false) {
						ce = ce.next;
						continue;
					}
					island.addContact(ce.contact);
					ce.contact.m_flags |= box2D.dynamics.contacts.B2Contact.e_islandFlag;
					other = ce.other;
					if((other.m_flags & box2D.dynamics.B2Body.e_islandFlag) != 0) {
						ce = ce.next;
						continue;
					}
					stack[stackCount++] = other;
					other.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
					ce = ce.next;
				}
				var jn = b.m_jointList;
				while(jn != null) {
					if(jn.joint.m_islandFlag == true) {
						jn = jn.next;
						continue;
					}
					other = jn.other;
					if(other.isActive() == false) {
						jn = jn.next;
						continue;
					}
					island.addJoint(jn.joint);
					jn.joint.m_islandFlag = true;
					if((other.m_flags & box2D.dynamics.B2Body.e_islandFlag) != 0) {
						jn = jn.next;
						continue;
					}
					stack[stackCount++] = other;
					other.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
					jn = jn.next;
				}
			}
			island.solve(step,this.m_gravity,this.m_allowSleep);
			var _g1 = 0, _g = island.m_bodyCount;
			while(_g1 < _g) {
				var i = _g1++;
				b = island.m_bodies[i];
				if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) b.m_flags &= ~box2D.dynamics.B2Body.e_islandFlag;
			}
			seed = seed.m_next;
		}
		var _g1 = 0, _g = stack.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(stack[i] == null) break;
			stack[i] = null;
		}
		b = this.m_bodyList;
		while(b != null) {
			if(b.isAwake() == false || b.isActive() == false) {
				b = b.m_next;
				continue;
			}
			if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) {
				b = b.m_next;
				continue;
			}
			b.synchronizeFixtures();
			b = b.m_next;
		}
		this.m_contactManager.findNewContacts();
	}
	,s_stack: null
	,isLocked: function() {
		return (this.m_flags & box2D.dynamics.B2World.e_locked) > 0;
	}
	,getContactList: function() {
		return this.m_contactList;
	}
	,getJointList: function() {
		return this.m_jointList;
	}
	,getBodyList: function() {
		return this.m_bodyList;
	}
	,rayCastAll: function(point1,point2) {
		var result = new Array();
		var rayCastAllWrapper = function(fixture,point,normal,fraction) {
			result[result.length] = fixture;
			return 1;
		};
		this.rayCast(rayCastAllWrapper,point1,point2);
		return result;
	}
	,rayCastOne: function(point1,point2) {
		var result;
		var rayCastOneWrapper = function(fixture,point,normal,fraction) {
			result = fixture;
			return fraction;
		};
		this.rayCast(rayCastOneWrapper,point1,point2);
		return result;
	}
	,rayCast: function(callbackMethod,point1,point2) {
		var broadPhase = this.m_contactManager.m_broadPhase;
		var output = new box2D.collision.B2RayCastOutput();
		var rayCastWrapper = function(input,proxy) {
			var userData = broadPhase.getUserData(proxy);
			var fixture = js.Boot.__cast(userData , box2D.dynamics.B2Fixture);
			var hit = fixture.rayCast(output,input);
			if(hit) {
				var fraction = output.fraction;
				var point = new box2D.common.math.B2Vec2((1.0 - fraction) * point1.x + fraction * point2.x,(1.0 - fraction) * point1.y + fraction * point2.y);
				return callbackMethod(fixture,point,output.normal,fraction);
			}
			return input.maxFraction;
		};
		var input = new box2D.collision.B2RayCastInput(point1,point2);
		broadPhase.rayCast(rayCastWrapper,input);
	}
	,queryPoint: function(callbackMethod,p) {
		var broadPhase = this.m_contactManager.m_broadPhase;
		var worldQueryWrapper = function(proxy) {
			var fixture = js.Boot.__cast(broadPhase.getUserData(proxy) , box2D.dynamics.B2Fixture);
			if(fixture.testPoint(p)) return callbackMethod(fixture);
			return true;
		};
		var aabb = new box2D.collision.B2AABB();
		aabb.lowerBound.set(p.x - box2D.common.B2Settings.b2_linearSlop,p.y - box2D.common.B2Settings.b2_linearSlop);
		aabb.upperBound.set(p.x + box2D.common.B2Settings.b2_linearSlop,p.y + box2D.common.B2Settings.b2_linearSlop);
		broadPhase.query(worldQueryWrapper,aabb);
	}
	,queryShape: function(callbackMethod,shape,transform) {
		if(transform == null) {
			transform = new box2D.common.math.B2Transform();
			transform.setIdentity();
		}
		var broadPhase = this.m_contactManager.m_broadPhase;
		var worldQueryWrapper = function(proxy) {
			var fixture = js.Boot.__cast(broadPhase.getUserData(proxy) , box2D.dynamics.B2Fixture);
			if(box2D.collision.shapes.B2Shape.testOverlap(shape,transform,fixture.getShape(),fixture.getBody().getTransform())) return callbackMethod(fixture);
			return true;
		};
		var aabb = new box2D.collision.B2AABB();
		shape.computeAABB(aabb,transform);
		broadPhase.query(worldQueryWrapper,aabb);
	}
	,queryAABB: function(callbackMethod,aabb) {
		var broadPhase = this.m_contactManager.m_broadPhase;
		var worldQueryWrapper = function(proxy) {
			return callbackMethod(broadPhase.getUserData(proxy));
		};
		broadPhase.query(worldQueryWrapper,aabb);
	}
	,drawDebugData: function() {
		if(this.m_debugDraw == null) return;
		this.m_debugDraw.m_ctx.clearRect(0,0,1000,1000);
		var flags = this.m_debugDraw.getFlags();
		var i;
		var b;
		var f;
		var s;
		var j;
		var bp;
		var invQ = new box2D.common.math.B2Vec2();
		var x1 = new box2D.common.math.B2Vec2();
		var x2 = new box2D.common.math.B2Vec2();
		var xf;
		var b1 = new box2D.collision.B2AABB();
		var b2 = new box2D.collision.B2AABB();
		var vs = [new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2()];
		var color = new box2D.common.B2Color(0,0,0);
		if((flags & box2D.dynamics.B2DebugDraw.e_shapeBit) != 0) {
			b = this.m_bodyList;
			while(b != null) {
				xf = b.m_xf;
				f = b.getFixtureList();
				while(f != null) {
					s = f.getShape();
					if(b.isActive() == false) {
						color.set(0.5,0.5,0.3);
						this.drawShape(s,xf,color);
					} else if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) {
						color.set(0.5,0.9,0.5);
						this.drawShape(s,xf,color);
					} else if(b.getType() == box2D.dynamics.B2Body.b2_kinematicBody) {
						color.set(0.5,0.5,0.9);
						this.drawShape(s,xf,color);
					} else if(b.isAwake() == false) {
						color.set(0.6,0.6,0.6);
						this.drawShape(s,xf,color);
					} else {
						color.set(0.9,0.7,0.7);
						this.drawShape(s,xf,color);
					}
					f = f.m_next;
				}
				b = b.m_next;
			}
		}
		if((flags & box2D.dynamics.B2DebugDraw.e_jointBit) != 0) {
			j = this.m_jointList;
			while(j != null) {
				this.drawJoint(j);
				j = j.m_next;
			}
		}
		if((flags & box2D.dynamics.B2DebugDraw.e_controllerBit) != 0) {
			var c = this.m_controllerList;
			while(c != null) {
				c.draw(this.m_debugDraw);
				c = c.m_next;
			}
		}
		if((flags & box2D.dynamics.B2DebugDraw.e_pairBit) != 0) {
			color.set(0.3,0.9,0.9);
			var contact = this.m_contactManager.m_contactList;
			while(contact != null) {
				var fixtureA = contact.getFixtureA();
				var fixtureB = contact.getFixtureB();
				var cA = fixtureA.getAABB().getCenter();
				var cB = fixtureB.getAABB().getCenter();
				this.m_debugDraw.drawSegment(cA,cB,color);
				contact = contact.getNext();
			}
		}
		if((flags & box2D.dynamics.B2DebugDraw.e_aabbBit) != 0) {
			bp = this.m_contactManager.m_broadPhase;
			vs = [new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2()];
			b = this.m_bodyList;
			while(b != null) {
				if(b.isActive() == false) {
					b = b.getNext();
					continue;
				}
				f = b.getFixtureList();
				while(f != null) {
					var aabb = bp.getFatAABB(f.m_proxy);
					vs[0].set(aabb.lowerBound.x,aabb.lowerBound.y);
					vs[1].set(aabb.upperBound.x,aabb.lowerBound.y);
					vs[2].set(aabb.upperBound.x,aabb.upperBound.y);
					vs[3].set(aabb.lowerBound.x,aabb.upperBound.y);
					this.m_debugDraw.drawPolygon(vs,4,color);
					f = f.getNext();
				}
				b = b.getNext();
			}
		}
		if((flags & box2D.dynamics.B2DebugDraw.e_centerOfMassBit) != 0) {
			b = this.m_bodyList;
			while(b != null) {
				xf = box2D.dynamics.B2World.s_xf;
				xf.R = b.m_xf.R;
				xf.position = b.getWorldCenter();
				this.m_debugDraw.drawTransform(xf);
				b = b.m_next;
			}
		}
	}
	,clearForces: function() {
		var body = this.m_bodyList;
		while(body != null) {
			body.m_force.setZero();
			body.m_torque = 0.0;
			body = body.m_next;
		}
	}
	,step: function(dt,velocityIterations,positionIterations) {
		if((this.m_flags & box2D.dynamics.B2World.e_newFixture) != 0) {
			this.m_contactManager.findNewContacts();
			this.m_flags &= ~box2D.dynamics.B2World.e_newFixture;
		}
		this.m_flags |= box2D.dynamics.B2World.e_locked;
		var step = box2D.dynamics.B2World.s_timestep2;
		step.dt = dt;
		step.velocityIterations = velocityIterations;
		step.positionIterations = positionIterations;
		if(dt > 0.0) step.inv_dt = 1.0 / dt; else step.inv_dt = 0.0;
		step.dtRatio = this.m_inv_dt0 * dt;
		step.warmStarting = box2D.dynamics.B2World.m_warmStarting;
		this.m_contactManager.collide();
		if(step.dt > 0.0) this.solve(step);
		if(box2D.dynamics.B2World.m_continuousPhysics && step.dt > 0.0) this.solveTOI(step);
		if(step.dt > 0.0) this.m_inv_dt0 = step.inv_dt;
		this.m_flags &= ~box2D.dynamics.B2World.e_locked;
	}
	,getGroundBody: function() {
		return this.m_groundBody;
	}
	,getGravity: function() {
		return this.m_gravity;
	}
	,setGravity: function(gravity) {
		this.m_gravity = gravity;
	}
	,getContactCount: function() {
		return this.m_contactCount;
	}
	,getJointCount: function() {
		return this.m_jointCount;
	}
	,getBodyCount: function() {
		return this.m_bodyCount;
	}
	,setContinuousPhysics: function(flag) {
		box2D.dynamics.B2World.m_continuousPhysics = flag;
	}
	,setWarmStarting: function(flag) {
		box2D.dynamics.B2World.m_warmStarting = flag;
	}
	,destroyController: function(controller) {
		controller.clear();
		if(controller.m_next != null) controller.m_next.m_prev = controller.m_prev;
		if(controller.m_prev != null) controller.m_prev.m_next = controller.m_next;
		if(controller == this.m_controllerList) this.m_controllerList = controller.m_next;
		--this.m_controllerCount;
	}
	,createController: function(controller) {
		if(controller.m_world != this) throw "Controller can only be a member of one world";
		controller.m_next = this.m_controllerList;
		controller.m_prev = null;
		if(this.m_controllerList != null) this.m_controllerList.m_prev = controller;
		this.m_controllerList = controller;
		++this.m_controllerCount;
		controller.m_world = this;
		return controller;
	}
	,removeController: function(c) {
		if(c.m_prev != null) c.m_prev.m_next = c.m_next;
		if(c.m_next != null) c.m_next.m_prev = c.m_prev;
		if(this.m_controllerList == c) this.m_controllerList = c.m_next;
		this.m_controllerCount--;
	}
	,addController: function(c) {
		c.m_next = this.m_controllerList;
		c.m_prev = null;
		this.m_controllerList = c;
		c.m_world = this;
		this.m_controllerCount++;
		return c;
	}
	,destroyJoint: function(j) {
		var collideConnected = j.m_collideConnected;
		if(j.m_prev != null) j.m_prev.m_next = j.m_next;
		if(j.m_next != null) j.m_next.m_prev = j.m_prev;
		if(j == this.m_jointList) this.m_jointList = j.m_next;
		var bodyA = j.m_bodyA;
		var bodyB = j.m_bodyB;
		bodyA.setAwake(true);
		bodyB.setAwake(true);
		if(j.m_edgeA.prev != null) j.m_edgeA.prev.next = j.m_edgeA.next;
		if(j.m_edgeA.next != null) j.m_edgeA.next.prev = j.m_edgeA.prev;
		if(j.m_edgeA == bodyA.m_jointList) bodyA.m_jointList = j.m_edgeA.next;
		j.m_edgeA.prev = null;
		j.m_edgeA.next = null;
		if(j.m_edgeB.prev != null) j.m_edgeB.prev.next = j.m_edgeB.next;
		if(j.m_edgeB.next != null) j.m_edgeB.next.prev = j.m_edgeB.prev;
		if(j.m_edgeB == bodyB.m_jointList) bodyB.m_jointList = j.m_edgeB.next;
		j.m_edgeB.prev = null;
		j.m_edgeB.next = null;
		box2D.dynamics.joints.B2Joint.destroy(j,null);
		--this.m_jointCount;
		if(collideConnected == false) {
			var edge = bodyB.getContactList();
			while(edge != null) {
				if(edge.other == bodyA) edge.contact.flagForFiltering();
				edge = edge.next;
			}
		}
	}
	,createJoint: function(def) {
		var j = box2D.dynamics.joints.B2Joint.create(def,null);
		j.m_prev = null;
		j.m_next = this.m_jointList;
		if(this.m_jointList != null) this.m_jointList.m_prev = j;
		this.m_jointList = j;
		++this.m_jointCount;
		j.m_edgeA.joint = j;
		j.m_edgeA.other = j.m_bodyB;
		j.m_edgeA.prev = null;
		j.m_edgeA.next = j.m_bodyA.m_jointList;
		if(j.m_bodyA.m_jointList != null) j.m_bodyA.m_jointList.prev = j.m_edgeA;
		j.m_bodyA.m_jointList = j.m_edgeA;
		j.m_edgeB.joint = j;
		j.m_edgeB.other = j.m_bodyA;
		j.m_edgeB.prev = null;
		j.m_edgeB.next = j.m_bodyB.m_jointList;
		if(j.m_bodyB.m_jointList != null) j.m_bodyB.m_jointList.prev = j.m_edgeB;
		j.m_bodyB.m_jointList = j.m_edgeB;
		var bodyA = def.bodyA;
		var bodyB = def.bodyB;
		if(def.collideConnected == false) {
			var edge = bodyB.getContactList();
			while(edge != null) {
				if(edge.other == bodyA) edge.contact.flagForFiltering();
				edge = edge.next;
			}
		}
		return j;
	}
	,destroyBody: function(b) {
		if(this.isLocked() == true) return;
		var jn = b.m_jointList;
		while(jn != null) {
			var jn0 = jn;
			jn = jn.next;
			if(this.m_destructionListener != null) this.m_destructionListener.sayGoodbyeJoint(jn0.joint);
			this.destroyJoint(jn0.joint);
		}
		var coe = b.m_controllerList;
		while(coe != null) {
			var coe0 = coe;
			coe = coe.nextController;
			coe0.controller.removeBody(b);
		}
		var ce = b.m_contactList;
		while(ce != null) {
			var ce0 = ce;
			ce = ce.next;
			this.m_contactManager.destroy(ce0.contact);
		}
		b.m_contactList = null;
		var f = b.m_fixtureList;
		while(f != null) {
			var f0 = f;
			f = f.m_next;
			if(this.m_destructionListener != null) this.m_destructionListener.sayGoodbyeFixture(f0);
			f0.destroyProxy(this.m_contactManager.m_broadPhase);
			f0.destroy();
		}
		b.m_fixtureList = null;
		b.m_fixtureCount = 0;
		if(b.m_prev != null) b.m_prev.m_next = b.m_next;
		if(b.m_next != null) b.m_next.m_prev = b.m_prev;
		if(b == this.m_bodyList) this.m_bodyList = b.m_next;
		--this.m_bodyCount;
	}
	,createBody: function(def) {
		if(this.isLocked() == true) return null;
		var b = new box2D.dynamics.B2Body(def,this);
		b.m_prev = null;
		b.m_next = this.m_bodyList;
		if(this.m_bodyList != null) this.m_bodyList.m_prev = b;
		this.m_bodyList = b;
		++this.m_bodyCount;
		return b;
	}
	,getProxyCount: function() {
		return this.m_contactManager.m_broadPhase.getProxyCount();
	}
	,validate: function() {
		this.m_contactManager.m_broadPhase.validate();
	}
	,setBroadPhase: function(broadPhase) {
		var oldBroadPhase = this.m_contactManager.m_broadPhase;
		this.m_contactManager.m_broadPhase = broadPhase;
		var b = this.m_bodyList;
		while(b != null) {
			var f = b.m_fixtureList;
			while(f != null) {
				f.m_proxy = broadPhase.createProxy(oldBroadPhase.getFatAABB(f.m_proxy),f);
				f = f.m_next;
			}
			b = b.m_next;
		}
	}
	,setDebugDraw: function(debugDraw) {
		this.m_debugDraw = debugDraw;
	}
	,setContactListener: function(listener) {
		this.m_contactManager.m_contactListener = listener;
	}
	,setContactFilter: function(filter) {
		this.m_contactManager.m_contactFilter = filter;
	}
	,setDestructionListener: function(listener) {
		this.m_destructionListener = listener;
	}
	,__class__: box2D.dynamics.B2World
}
if(!box2D.dynamics.contacts) box2D.dynamics.contacts = {}
box2D.dynamics.contacts.B2Contact = $hxClasses["box2D.dynamics.contacts.B2Contact"] = function() {
	this.m_nodeA = new box2D.dynamics.contacts.B2ContactEdge();
	this.m_nodeB = new box2D.dynamics.contacts.B2ContactEdge();
	this.m_manifold = new box2D.collision.B2Manifold();
	this.m_oldManifold = new box2D.collision.B2Manifold();
};
box2D.dynamics.contacts.B2Contact.__name__ = ["box2D","dynamics","contacts","B2Contact"];
box2D.dynamics.contacts.B2Contact.prototype = {
	m_toi: null
	,m_oldManifold: null
	,m_manifold: null
	,m_fixtureB: null
	,m_fixtureA: null
	,m_nodeB: null
	,m_nodeA: null
	,m_next: null
	,m_prev: null
	,m_flags: null
	,computeTOI: function(sweepA,sweepB) {
		box2D.dynamics.contacts.B2Contact.s_input.proxyA.set(this.m_fixtureA.getShape());
		box2D.dynamics.contacts.B2Contact.s_input.proxyB.set(this.m_fixtureB.getShape());
		box2D.dynamics.contacts.B2Contact.s_input.sweepA = sweepA;
		box2D.dynamics.contacts.B2Contact.s_input.sweepB = sweepB;
		box2D.dynamics.contacts.B2Contact.s_input.tolerance = box2D.common.B2Settings.b2_linearSlop;
		return box2D.collision.B2TimeOfImpact.timeOfImpact(box2D.dynamics.contacts.B2Contact.s_input);
	}
	,evaluate: function() {
	}
	,update: function(listener) {
		var tManifold = this.m_oldManifold;
		this.m_oldManifold = this.m_manifold;
		this.m_manifold = tManifold;
		this.m_flags |= box2D.dynamics.contacts.B2Contact.e_enabledFlag;
		var touching = false;
		var wasTouching = (this.m_flags & box2D.dynamics.contacts.B2Contact.e_touchingFlag) == box2D.dynamics.contacts.B2Contact.e_touchingFlag;
		var bodyA = this.m_fixtureA.m_body;
		var bodyB = this.m_fixtureB.m_body;
		var aabbOverlap = this.m_fixtureA.m_aabb.testOverlap(this.m_fixtureB.m_aabb);
		if((this.m_flags & box2D.dynamics.contacts.B2Contact.e_sensorFlag) != 0) {
			if(aabbOverlap) {
				var shapeA = this.m_fixtureA.getShape();
				var shapeB = this.m_fixtureB.getShape();
				var xfA = bodyA.getTransform();
				var xfB = bodyB.getTransform();
				touching = box2D.collision.shapes.B2Shape.testOverlap(shapeA,xfA,shapeB,xfB);
			}
			this.m_manifold.m_pointCount = 0;
		} else {
			if(bodyA.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bodyA.isBullet() || bodyB.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bodyB.isBullet()) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_continuousFlag; else this.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_continuousFlag;
			if(aabbOverlap) {
				this.evaluate();
				touching = this.m_manifold.m_pointCount > 0;
				var _g1 = 0, _g = this.m_manifold.m_pointCount;
				while(_g1 < _g) {
					var i = _g1++;
					var mp2 = this.m_manifold.m_points[i];
					mp2.m_normalImpulse = 0.0;
					mp2.m_tangentImpulse = 0.0;
					var id2 = mp2.m_id;
					var _g3 = 0, _g2 = this.m_oldManifold.m_pointCount;
					while(_g3 < _g2) {
						var j = _g3++;
						var mp1 = this.m_oldManifold.m_points[j];
						if(mp1.m_id.getKey() == id2.getKey()) {
							mp2.m_normalImpulse = mp1.m_normalImpulse;
							mp2.m_tangentImpulse = mp1.m_tangentImpulse;
							break;
						}
					}
				}
			} else this.m_manifold.m_pointCount = 0;
			if(touching != wasTouching) {
				bodyA.setAwake(true);
				bodyB.setAwake(true);
			}
		}
		if(touching) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_touchingFlag; else this.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_touchingFlag;
		if(wasTouching == false && touching == true) listener.beginContact(this);
		if(wasTouching == true && touching == false) listener.endContact(this);
		if((this.m_flags & box2D.dynamics.contacts.B2Contact.e_sensorFlag) == 0) listener.preSolve(this,this.m_oldManifold);
	}
	,reset: function(fixtureA,fixtureB) {
		this.m_flags = box2D.dynamics.contacts.B2Contact.e_enabledFlag;
		if(fixtureA == null || fixtureB == null) {
			this.m_fixtureA = null;
			this.m_fixtureB = null;
			return;
		}
		if(fixtureA.isSensor() || fixtureB.isSensor()) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_sensorFlag;
		var bodyA = fixtureA.getBody();
		var bodyB = fixtureB.getBody();
		if(bodyA.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bodyA.isBullet() || bodyB.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bodyB.isBullet()) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_continuousFlag;
		this.m_fixtureA = fixtureA;
		this.m_fixtureB = fixtureB;
		this.m_manifold.m_pointCount = 0;
		this.m_prev = null;
		this.m_next = null;
		this.m_nodeA.contact = null;
		this.m_nodeA.prev = null;
		this.m_nodeA.next = null;
		this.m_nodeA.other = null;
		this.m_nodeB.contact = null;
		this.m_nodeB.prev = null;
		this.m_nodeB.next = null;
		this.m_nodeB.other = null;
	}
	,flagForFiltering: function() {
		this.m_flags |= box2D.dynamics.contacts.B2Contact.e_filterFlag;
	}
	,getFixtureB: function() {
		return this.m_fixtureB;
	}
	,getFixtureA: function() {
		return this.m_fixtureA;
	}
	,getNext: function() {
		return this.m_next;
	}
	,isEnabled: function() {
		return (this.m_flags & box2D.dynamics.contacts.B2Contact.e_enabledFlag) == box2D.dynamics.contacts.B2Contact.e_enabledFlag;
	}
	,setEnabled: function(flag) {
		if(flag) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_enabledFlag; else this.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_enabledFlag;
	}
	,isSensor: function() {
		return (this.m_flags & box2D.dynamics.contacts.B2Contact.e_sensorFlag) == box2D.dynamics.contacts.B2Contact.e_sensorFlag;
	}
	,setSensor: function(sensor) {
		if(sensor) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_sensorFlag; else this.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_sensorFlag;
	}
	,isContinuous: function() {
		return (this.m_flags & box2D.dynamics.contacts.B2Contact.e_continuousFlag) == box2D.dynamics.contacts.B2Contact.e_continuousFlag;
	}
	,isTouching: function() {
		return (this.m_flags & box2D.dynamics.contacts.B2Contact.e_touchingFlag) == box2D.dynamics.contacts.B2Contact.e_touchingFlag;
	}
	,getWorldManifold: function(worldManifold) {
		var bodyA = this.m_fixtureA.getBody();
		var bodyB = this.m_fixtureB.getBody();
		var shapeA = this.m_fixtureA.getShape();
		var shapeB = this.m_fixtureB.getShape();
		worldManifold.initialize(this.m_manifold,bodyA.getTransform(),shapeA.m_radius,bodyB.getTransform(),shapeB.m_radius);
	}
	,getManifold: function() {
		return this.m_manifold;
	}
	,__class__: box2D.dynamics.contacts.B2Contact
}
box2D.dynamics.contacts.B2CircleContact = $hxClasses["box2D.dynamics.contacts.B2CircleContact"] = function() {
	box2D.dynamics.contacts.B2Contact.call(this);
};
box2D.dynamics.contacts.B2CircleContact.__name__ = ["box2D","dynamics","contacts","B2CircleContact"];
box2D.dynamics.contacts.B2CircleContact.create = function(allocator) {
	return new box2D.dynamics.contacts.B2CircleContact();
}
box2D.dynamics.contacts.B2CircleContact.destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2CircleContact.__super__ = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2CircleContact.prototype = $extend(box2D.dynamics.contacts.B2Contact.prototype,{
	evaluate: function() {
		var bA = this.m_fixtureA.getBody();
		var bB = this.m_fixtureB.getBody();
		box2D.collision.B2Collision.collideCircles(this.m_manifold,js.Boot.__cast(this.m_fixtureA.getShape() , box2D.collision.shapes.B2CircleShape),bA.m_xf,js.Boot.__cast(this.m_fixtureB.getShape() , box2D.collision.shapes.B2CircleShape),bB.m_xf);
	}
	,reset: function(fixtureA,fixtureB) {
		box2D.dynamics.contacts.B2Contact.prototype.reset.call(this,fixtureA,fixtureB);
	}
	,__class__: box2D.dynamics.contacts.B2CircleContact
});
box2D.dynamics.contacts.B2ContactConstraint = $hxClasses["box2D.dynamics.contacts.B2ContactConstraint"] = function() {
	this.localPlaneNormal = new box2D.common.math.B2Vec2();
	this.localPoint = new box2D.common.math.B2Vec2();
	this.normal = new box2D.common.math.B2Vec2();
	this.normalMass = new box2D.common.math.B2Mat22();
	this.K = new box2D.common.math.B2Mat22();
	this.points = new Array();
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
	while(_g1 < _g) {
		var i = _g1++;
		this.points[i] = new box2D.dynamics.contacts.B2ContactConstraintPoint();
	}
};
box2D.dynamics.contacts.B2ContactConstraint.__name__ = ["box2D","dynamics","contacts","B2ContactConstraint"];
box2D.dynamics.contacts.B2ContactConstraint.prototype = {
	manifold: null
	,pointCount: null
	,restitution: null
	,friction: null
	,radius: null
	,type: null
	,bodyB: null
	,bodyA: null
	,K: null
	,normalMass: null
	,normal: null
	,localPoint: null
	,localPlaneNormal: null
	,points: null
	,__class__: box2D.dynamics.contacts.B2ContactConstraint
}
box2D.dynamics.contacts.B2ContactConstraintPoint = $hxClasses["box2D.dynamics.contacts.B2ContactConstraintPoint"] = function() {
	this.localPoint = new box2D.common.math.B2Vec2();
	this.rA = new box2D.common.math.B2Vec2();
	this.rB = new box2D.common.math.B2Vec2();
};
box2D.dynamics.contacts.B2ContactConstraintPoint.__name__ = ["box2D","dynamics","contacts","B2ContactConstraintPoint"];
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype = {
	velocityBias: null
	,equalizedMass: null
	,tangentMass: null
	,normalMass: null
	,tangentImpulse: null
	,normalImpulse: null
	,rB: null
	,rA: null
	,localPoint: null
	,__class__: box2D.dynamics.contacts.B2ContactConstraintPoint
}
box2D.dynamics.contacts.B2ContactEdge = $hxClasses["box2D.dynamics.contacts.B2ContactEdge"] = function() {
};
box2D.dynamics.contacts.B2ContactEdge.__name__ = ["box2D","dynamics","contacts","B2ContactEdge"];
box2D.dynamics.contacts.B2ContactEdge.prototype = {
	next: null
	,prev: null
	,contact: null
	,other: null
	,__class__: box2D.dynamics.contacts.B2ContactEdge
}
box2D.dynamics.contacts.B2ContactFactory = $hxClasses["box2D.dynamics.contacts.B2ContactFactory"] = function(allocator) {
	this.m_allocator = allocator;
	this.initializeRegisters();
};
box2D.dynamics.contacts.B2ContactFactory.__name__ = ["box2D","dynamics","contacts","B2ContactFactory"];
box2D.dynamics.contacts.B2ContactFactory.prototype = {
	m_allocator: null
	,m_registers: null
	,destroy: function(contact) {
		if(contact.m_manifold.m_pointCount > 0) {
			contact.m_fixtureA.m_body.setAwake(true);
			contact.m_fixtureB.m_body.setAwake(true);
		}
		var type1 = contact.m_fixtureA.getType();
		var type2 = contact.m_fixtureB.getType();
		var reg = this.m_registers[type1][type2];
		reg.poolCount++;
		contact.m_next = reg.pool;
		reg.pool = contact;
		var destroyFcn = reg.destroyFcn;
		destroyFcn(contact,this.m_allocator);
	}
	,create: function(fixtureA,fixtureB) {
		var type1 = fixtureA.getType();
		var type2 = fixtureB.getType();
		var reg = this.m_registers[type1][type2];
		var c;
		if(reg.pool != null) {
			c = reg.pool;
			reg.pool = c.m_next;
			reg.poolCount--;
			c.reset(fixtureA,fixtureB);
			return c;
		}
		var createFcn = reg.createFcn;
		if(createFcn != null) {
			if(reg.primary) {
				c = createFcn(this.m_allocator);
				c.reset(fixtureA,fixtureB);
				return c;
			} else {
				c = createFcn(this.m_allocator);
				c.reset(fixtureB,fixtureA);
				return c;
			}
		} else return null;
	}
	,initializeRegisters: function() {
		this.m_registers = new Array();
		var _g1 = 0, _g = box2D.collision.shapes.B2Shape.e_shapeTypeCount;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_registers[i] = new Array();
			var _g3 = 0, _g2 = box2D.collision.shapes.B2Shape.e_shapeTypeCount;
			while(_g3 < _g2) {
				var j = _g3++;
				this.m_registers[i][j] = new box2D.dynamics.contacts.B2ContactRegister();
			}
		}
		this.addType(box2D.dynamics.contacts.B2CircleContact.create,box2D.dynamics.contacts.B2CircleContact.destroy,box2D.collision.shapes.B2Shape.e_circleShape,box2D.collision.shapes.B2Shape.e_circleShape);
		this.addType(box2D.dynamics.contacts.B2PolyAndCircleContact.create,box2D.dynamics.contacts.B2PolyAndCircleContact.destroy,box2D.collision.shapes.B2Shape.e_polygonShape,box2D.collision.shapes.B2Shape.e_circleShape);
		this.addType(box2D.dynamics.contacts.B2PolygonContact.create,box2D.dynamics.contacts.B2PolygonContact.destroy,box2D.collision.shapes.B2Shape.e_polygonShape,box2D.collision.shapes.B2Shape.e_polygonShape);
		this.addType(box2D.dynamics.contacts.B2EdgeAndCircleContact.create,box2D.dynamics.contacts.B2EdgeAndCircleContact.destroy,box2D.collision.shapes.B2Shape.e_edgeShape,box2D.collision.shapes.B2Shape.e_circleShape);
		this.addType(box2D.dynamics.contacts.B2PolyAndEdgeContact.create,box2D.dynamics.contacts.B2PolyAndEdgeContact.destroy,box2D.collision.shapes.B2Shape.e_polygonShape,box2D.collision.shapes.B2Shape.e_edgeShape);
	}
	,addType: function(createFcn,destroyFcn,type1,type2) {
		this.m_registers[type1][type2].createFcn = createFcn;
		this.m_registers[type1][type2].destroyFcn = destroyFcn;
		this.m_registers[type1][type2].primary = true;
		if(type1 != type2) {
			this.m_registers[type2][type1].createFcn = createFcn;
			this.m_registers[type2][type1].destroyFcn = destroyFcn;
			this.m_registers[type2][type1].primary = false;
		}
	}
	,__class__: box2D.dynamics.contacts.B2ContactFactory
}
box2D.dynamics.contacts.B2ContactRegister = $hxClasses["box2D.dynamics.contacts.B2ContactRegister"] = function() {
};
box2D.dynamics.contacts.B2ContactRegister.__name__ = ["box2D","dynamics","contacts","B2ContactRegister"];
box2D.dynamics.contacts.B2ContactRegister.prototype = {
	poolCount: null
	,pool: null
	,primary: null
	,destroyFcn: null
	,createFcn: null
	,__class__: box2D.dynamics.contacts.B2ContactRegister
}
box2D.dynamics.contacts.B2PositionSolverManifold = $hxClasses["box2D.dynamics.contacts.B2PositionSolverManifold"] = function() {
	this.m_normal = new box2D.common.math.B2Vec2();
	this.m_separations = new Array();
	this.m_points = new Array();
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
	while(_g1 < _g) {
		var i = _g1++;
		this.m_points[i] = new box2D.common.math.B2Vec2();
	}
};
box2D.dynamics.contacts.B2PositionSolverManifold.__name__ = ["box2D","dynamics","contacts","B2PositionSolverManifold"];
box2D.dynamics.contacts.B2PositionSolverManifold.prototype = {
	m_separations: null
	,m_points: null
	,m_normal: null
	,initialize: function(cc) {
		box2D.common.B2Settings.b2Assert(cc.pointCount > 0);
		var i;
		var clipPointX;
		var clipPointY;
		var tMat;
		var tVec;
		var planePointX;
		var planePointY;
		switch(cc.type) {
		case box2D.collision.B2Manifold.e_circles:
			tMat = cc.bodyA.m_xf.R;
			tVec = cc.localPoint;
			var pointAX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			var pointAY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tMat = cc.bodyB.m_xf.R;
			tVec = cc.points[0].localPoint;
			var pointBX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			var pointBY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			var dX = pointBX - pointAX;
			var dY = pointBY - pointAY;
			var d2 = dX * dX + dY * dY;
			if(d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
				var d = Math.sqrt(d2);
				this.m_normal.x = dX / d;
				this.m_normal.y = dY / d;
			} else {
				this.m_normal.x = 1.0;
				this.m_normal.y = 0.0;
			}
			this.m_points[0].x = 0.5 * (pointAX + pointBX);
			this.m_points[0].y = 0.5 * (pointAY + pointBY);
			this.m_separations[0] = dX * this.m_normal.x + dY * this.m_normal.y - cc.radius;
			break;
		case box2D.collision.B2Manifold.e_faceA:
			tMat = cc.bodyA.m_xf.R;
			tVec = cc.localPlaneNormal;
			this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = cc.bodyA.m_xf.R;
			tVec = cc.localPoint;
			planePointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			planePointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tMat = cc.bodyB.m_xf.R;
			var _g1 = 0, _g = cc.pointCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				tVec = cc.points[i1].localPoint;
				clipPointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				clipPointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				this.m_separations[i1] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
				this.m_points[i1].x = clipPointX;
				this.m_points[i1].y = clipPointY;
			}
			break;
		case box2D.collision.B2Manifold.e_faceB:
			tMat = cc.bodyB.m_xf.R;
			tVec = cc.localPlaneNormal;
			this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = cc.bodyB.m_xf.R;
			tVec = cc.localPoint;
			planePointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			planePointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tMat = cc.bodyA.m_xf.R;
			var _g1 = 0, _g = cc.pointCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				tVec = cc.points[i1].localPoint;
				clipPointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				clipPointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				this.m_separations[i1] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
				this.m_points[i1].set(clipPointX,clipPointY);
			}
			this.m_normal.x *= -1;
			this.m_normal.y *= -1;
			break;
		}
	}
	,__class__: box2D.dynamics.contacts.B2PositionSolverManifold
}
box2D.dynamics.contacts.B2ContactSolver = $hxClasses["box2D.dynamics.contacts.B2ContactSolver"] = function() {
	this.m_step = new box2D.dynamics.B2TimeStep();
	this.m_constraints = new Array();
};
box2D.dynamics.contacts.B2ContactSolver.__name__ = ["box2D","dynamics","contacts","B2ContactSolver"];
box2D.dynamics.contacts.B2ContactSolver.prototype = {
	m_constraintCount: null
	,m_constraints: null
	,m_allocator: null
	,m_step: null
	,solvePositionConstraints: function(baumgarte) {
		var minSeparation = 0.0;
		var _g1 = 0, _g = this.m_constraintCount;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_constraints[i];
			var bodyA = c.bodyA;
			var bodyB = c.bodyB;
			var invMassA = bodyA.m_mass * bodyA.m_invMass;
			var invIA = bodyA.m_mass * bodyA.m_invI;
			var invMassB = bodyB.m_mass * bodyB.m_invMass;
			var invIB = bodyB.m_mass * bodyB.m_invI;
			box2D.dynamics.contacts.B2ContactSolver.s_psm.initialize(c);
			var normal = box2D.dynamics.contacts.B2ContactSolver.s_psm.m_normal;
			var _g3 = 0, _g2 = c.pointCount;
			while(_g3 < _g2) {
				var j = _g3++;
				var ccp = c.points[j];
				var point = box2D.dynamics.contacts.B2ContactSolver.s_psm.m_points[j];
				var separation = box2D.dynamics.contacts.B2ContactSolver.s_psm.m_separations[j];
				var rAX = point.x - bodyA.m_sweep.c.x;
				var rAY = point.y - bodyA.m_sweep.c.y;
				var rBX = point.x - bodyB.m_sweep.c.x;
				var rBY = point.y - bodyB.m_sweep.c.y;
				minSeparation = minSeparation < separation?minSeparation:separation;
				var C = box2D.common.math.B2Math.clamp(baumgarte * (separation + box2D.common.B2Settings.b2_linearSlop),-box2D.common.B2Settings.b2_maxLinearCorrection,0.0);
				var impulse = -ccp.equalizedMass * C;
				var PX = impulse * normal.x;
				var PY = impulse * normal.y;
				bodyA.m_sweep.c.x -= invMassA * PX;
				bodyA.m_sweep.c.y -= invMassA * PY;
				bodyA.m_sweep.a -= invIA * (rAX * PY - rAY * PX);
				bodyA.synchronizeTransform();
				bodyB.m_sweep.c.x += invMassB * PX;
				bodyB.m_sweep.c.y += invMassB * PY;
				bodyB.m_sweep.a += invIB * (rBX * PY - rBY * PX);
				bodyB.synchronizeTransform();
			}
		}
		return minSeparation > -1.5 * box2D.common.B2Settings.b2_linearSlop;
	}
	,finalizeVelocityConstraints: function() {
		var _g1 = 0, _g = this.m_constraintCount;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_constraints[i];
			var m = c.manifold;
			var _g3 = 0, _g2 = c.pointCount;
			while(_g3 < _g2) {
				var j = _g3++;
				var point1 = m.m_points[j];
				var point2 = c.points[j];
				point1.m_normalImpulse = point2.normalImpulse;
				point1.m_tangentImpulse = point2.tangentImpulse;
			}
		}
	}
	,solveVelocityConstraints: function() {
		var j;
		var ccp;
		var rAX;
		var rAY;
		var rBX;
		var rBY;
		var dvX;
		var dvY;
		var vn;
		var vt;
		var lambda;
		var maxFriction;
		var newImpulse;
		var PX;
		var PY;
		var dX;
		var dY;
		var P1X;
		var P1Y;
		var P2X;
		var P2Y;
		var tMat;
		var tVec;
		var _g1 = 0, _g = this.m_constraintCount;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_constraints[i];
			var bodyA = c.bodyA;
			var bodyB = c.bodyB;
			var wA = bodyA.m_angularVelocity;
			var wB = bodyB.m_angularVelocity;
			var vA = bodyA.m_linearVelocity;
			var vB = bodyB.m_linearVelocity;
			var invMassA = bodyA.m_invMass;
			var invIA = bodyA.m_invI;
			var invMassB = bodyB.m_invMass;
			var invIB = bodyB.m_invI;
			var normalX = c.normal.x;
			var normalY = c.normal.y;
			var tangentX = normalY;
			var tangentY = -normalX;
			var friction = c.friction;
			var tX;
			var _g3 = 0, _g2 = c.pointCount;
			while(_g3 < _g2) {
				var j1 = _g3++;
				ccp = c.points[j1];
				dvX = vB.x - wB * ccp.rB.y - vA.x + wA * ccp.rA.y;
				dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
				vt = dvX * tangentX + dvY * tangentY;
				lambda = ccp.tangentMass * -vt;
				maxFriction = friction * ccp.normalImpulse;
				newImpulse = box2D.common.math.B2Math.clamp(ccp.tangentImpulse + lambda,-maxFriction,maxFriction);
				lambda = newImpulse - ccp.tangentImpulse;
				PX = lambda * tangentX;
				PY = lambda * tangentY;
				vA.x -= invMassA * PX;
				vA.y -= invMassA * PY;
				wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
				vB.x += invMassB * PX;
				vB.y += invMassB * PY;
				wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
				ccp.tangentImpulse = newImpulse;
			}
			var tCount = c.pointCount;
			if(c.pointCount == 1) {
				ccp = c.points[0];
				dvX = vB.x + -wB * ccp.rB.y - vA.x - -wA * ccp.rA.y;
				dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
				vn = dvX * normalX + dvY * normalY;
				lambda = -ccp.normalMass * (vn - ccp.velocityBias);
				newImpulse = ccp.normalImpulse + lambda;
				newImpulse = newImpulse > 0?newImpulse:0.0;
				lambda = newImpulse - ccp.normalImpulse;
				PX = lambda * normalX;
				PY = lambda * normalY;
				vA.x -= invMassA * PX;
				vA.y -= invMassA * PY;
				wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
				vB.x += invMassB * PX;
				vB.y += invMassB * PY;
				wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
				ccp.normalImpulse = newImpulse;
			} else {
				var cp1 = c.points[0];
				var cp2 = c.points[1];
				var aX = cp1.normalImpulse;
				var aY = cp2.normalImpulse;
				var dv1X = vB.x - wB * cp1.rB.y - vA.x + wA * cp1.rA.y;
				var dv1Y = vB.y + wB * cp1.rB.x - vA.y - wA * cp1.rA.x;
				var dv2X = vB.x - wB * cp2.rB.y - vA.x + wA * cp2.rA.y;
				var dv2Y = vB.y + wB * cp2.rB.x - vA.y - wA * cp2.rA.x;
				var vn1 = dv1X * normalX + dv1Y * normalY;
				var vn2 = dv2X * normalX + dv2Y * normalY;
				var bX = vn1 - cp1.velocityBias;
				var bY = vn2 - cp2.velocityBias;
				tMat = c.K;
				bX -= tMat.col1.x * aX + tMat.col2.x * aY;
				bY -= tMat.col1.y * aX + tMat.col2.y * aY;
				var k_errorTol = 0.001;
				var _g2 = 0;
				while(_g2 < 1) {
					var i1 = _g2++;
					tMat = c.normalMass;
					var xX = -(tMat.col1.x * bX + tMat.col2.x * bY);
					var xY = -(tMat.col1.y * bX + tMat.col2.y * bY);
					if(xX >= 0.0 && xY >= 0.0) {
						dX = xX - aX;
						dY = xY - aY;
						P1X = dX * normalX;
						P1Y = dX * normalY;
						P2X = dY * normalX;
						P2Y = dY * normalY;
						vA.x -= invMassA * (P1X + P2X);
						vA.y -= invMassA * (P1Y + P2Y);
						wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
						vB.x += invMassB * (P1X + P2X);
						vB.y += invMassB * (P1Y + P2Y);
						wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
						cp1.normalImpulse = xX;
						cp2.normalImpulse = xY;
						break;
					}
					xX = -cp1.normalMass * bX;
					xY = 0.0;
					vn1 = 0.0;
					vn2 = c.K.col1.y * xX + bY;
					if(xX >= 0.0 && vn2 >= 0.0) {
						dX = xX - aX;
						dY = xY - aY;
						P1X = dX * normalX;
						P1Y = dX * normalY;
						P2X = dY * normalX;
						P2Y = dY * normalY;
						vA.x -= invMassA * (P1X + P2X);
						vA.y -= invMassA * (P1Y + P2Y);
						wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
						vB.x += invMassB * (P1X + P2X);
						vB.y += invMassB * (P1Y + P2Y);
						wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
						cp1.normalImpulse = xX;
						cp2.normalImpulse = xY;
						break;
					}
					xX = 0.0;
					xY = -cp2.normalMass * bY;
					vn1 = c.K.col2.x * xY + bX;
					vn2 = 0.0;
					if(xY >= 0.0 && vn1 >= 0.0) {
						dX = xX - aX;
						dY = xY - aY;
						P1X = dX * normalX;
						P1Y = dX * normalY;
						P2X = dY * normalX;
						P2Y = dY * normalY;
						vA.x -= invMassA * (P1X + P2X);
						vA.y -= invMassA * (P1Y + P2Y);
						wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
						vB.x += invMassB * (P1X + P2X);
						vB.y += invMassB * (P1Y + P2Y);
						wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
						cp1.normalImpulse = xX;
						cp2.normalImpulse = xY;
						break;
					}
					xX = 0.0;
					xY = 0.0;
					vn1 = bX;
					vn2 = bY;
					if(vn1 >= 0.0 && vn2 >= 0.0) {
						dX = xX - aX;
						dY = xY - aY;
						P1X = dX * normalX;
						P1Y = dX * normalY;
						P2X = dY * normalX;
						P2Y = dY * normalY;
						vA.x -= invMassA * (P1X + P2X);
						vA.y -= invMassA * (P1Y + P2Y);
						wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
						vB.x += invMassB * (P1X + P2X);
						vB.y += invMassB * (P1Y + P2Y);
						wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
						cp1.normalImpulse = xX;
						cp2.normalImpulse = xY;
						break;
					}
					break;
				}
			}
			bodyA.m_angularVelocity = wA;
			bodyB.m_angularVelocity = wB;
		}
	}
	,initVelocityConstraints: function(step) {
		var tVec;
		var tVec2;
		var tMat;
		var _g1 = 0, _g = this.m_constraintCount;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_constraints[i];
			var bodyA = c.bodyA;
			var bodyB = c.bodyB;
			var invMassA = bodyA.m_invMass;
			var invIA = bodyA.m_invI;
			var invMassB = bodyB.m_invMass;
			var invIB = bodyB.m_invI;
			var normalX = c.normal.x;
			var normalY = c.normal.y;
			var tangentX = normalY;
			var tangentY = -normalX;
			var tX;
			var j;
			var tCount;
			if(step.warmStarting) {
				tCount = c.pointCount;
				var _g2 = 0;
				while(_g2 < tCount) {
					var j1 = _g2++;
					var ccp = c.points[j1];
					ccp.normalImpulse *= step.dtRatio;
					ccp.tangentImpulse *= step.dtRatio;
					var PX = ccp.normalImpulse * normalX + ccp.tangentImpulse * tangentX;
					var PY = ccp.normalImpulse * normalY + ccp.tangentImpulse * tangentY;
					bodyA.m_angularVelocity -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
					bodyA.m_linearVelocity.x -= invMassA * PX;
					bodyA.m_linearVelocity.y -= invMassA * PY;
					bodyB.m_angularVelocity += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
					bodyB.m_linearVelocity.x += invMassB * PX;
					bodyB.m_linearVelocity.y += invMassB * PY;
				}
			} else {
				tCount = c.pointCount;
				var _g2 = 0;
				while(_g2 < tCount) {
					var j1 = _g2++;
					var ccp2 = c.points[j1];
					ccp2.normalImpulse = 0.0;
					ccp2.tangentImpulse = 0.0;
				}
			}
		}
	}
	,initialize: function(step,contacts,contactCount,allocator) {
		var contact;
		this.m_step.set(step);
		this.m_allocator = allocator;
		var i;
		var tVec;
		var tMat;
		this.m_constraintCount = contactCount;
		while(this.m_constraints.length < this.m_constraintCount) this.m_constraints[this.m_constraints.length] = new box2D.dynamics.contacts.B2ContactConstraint();
		var _g = 0;
		while(_g < contactCount) {
			var i1 = _g++;
			contact = contacts[i1];
			var fixtureA = contact.m_fixtureA;
			var fixtureB = contact.m_fixtureB;
			var shapeA = fixtureA.m_shape;
			var shapeB = fixtureB.m_shape;
			var radiusA = shapeA.m_radius;
			var radiusB = shapeB.m_radius;
			var bodyA = fixtureA.m_body;
			var bodyB = fixtureB.m_body;
			var manifold = contact.getManifold();
			var friction = box2D.common.B2Settings.b2MixFriction(fixtureA.getFriction(),fixtureB.getFriction());
			var restitution = box2D.common.B2Settings.b2MixRestitution(fixtureA.getRestitution(),fixtureB.getRestitution());
			var vAX = bodyA.m_linearVelocity.x;
			var vAY = bodyA.m_linearVelocity.y;
			var vBX = bodyB.m_linearVelocity.x;
			var vBY = bodyB.m_linearVelocity.y;
			var wA = bodyA.m_angularVelocity;
			var wB = bodyB.m_angularVelocity;
			box2D.common.B2Settings.b2Assert(manifold.m_pointCount > 0);
			box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.initialize(manifold,bodyA.m_xf,radiusA,bodyB.m_xf,radiusB);
			var normalX = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_normal.x;
			var normalY = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_normal.y;
			var cc = this.m_constraints[i1];
			cc.bodyA = bodyA;
			cc.bodyB = bodyB;
			cc.manifold = manifold;
			cc.normal.x = normalX;
			cc.normal.y = normalY;
			cc.pointCount = manifold.m_pointCount;
			cc.friction = friction;
			cc.restitution = restitution;
			cc.localPlaneNormal.x = manifold.m_localPlaneNormal.x;
			cc.localPlaneNormal.y = manifold.m_localPlaneNormal.y;
			cc.localPoint.x = manifold.m_localPoint.x;
			cc.localPoint.y = manifold.m_localPoint.y;
			cc.radius = radiusA + radiusB;
			cc.type = manifold.m_type;
			var _g2 = 0, _g1 = cc.pointCount;
			while(_g2 < _g1) {
				var k = _g2++;
				var cp = manifold.m_points[k];
				var ccp = cc.points[k];
				ccp.normalImpulse = cp.m_normalImpulse;
				ccp.tangentImpulse = cp.m_tangentImpulse;
				ccp.localPoint.setV(cp.m_localPoint);
				var rAX = ccp.rA.x = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_points[k].x - bodyA.m_sweep.c.x;
				var rAY = ccp.rA.y = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_points[k].y - bodyA.m_sweep.c.y;
				var rBX = ccp.rB.x = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_points[k].x - bodyB.m_sweep.c.x;
				var rBY = ccp.rB.y = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_points[k].y - bodyB.m_sweep.c.y;
				var rnA = rAX * normalY - rAY * normalX;
				var rnB = rBX * normalY - rBY * normalX;
				rnA *= rnA;
				rnB *= rnB;
				var kNormal = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rnA + bodyB.m_invI * rnB;
				ccp.normalMass = 1.0 / kNormal;
				var kEqualized = bodyA.m_mass * bodyA.m_invMass + bodyB.m_mass * bodyB.m_invMass;
				kEqualized += bodyA.m_mass * bodyA.m_invI * rnA + bodyB.m_mass * bodyB.m_invI * rnB;
				ccp.equalizedMass = 1.0 / kEqualized;
				var tangentX = normalY;
				var tangentY = -normalX;
				var rtA = rAX * tangentY - rAY * tangentX;
				var rtB = rBX * tangentY - rBY * tangentX;
				rtA *= rtA;
				rtB *= rtB;
				var kTangent = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rtA + bodyB.m_invI * rtB;
				ccp.tangentMass = 1.0 / kTangent;
				ccp.velocityBias = 0.0;
				var tX = vBX + -wB * rBY - vAX - -wA * rAY;
				var tY = vBY + wB * rBX - vAY - wA * rAX;
				var vRel = cc.normal.x * tX + cc.normal.y * tY;
				if(vRel < -box2D.common.B2Settings.b2_velocityThreshold) ccp.velocityBias += -cc.restitution * vRel;
			}
			if(cc.pointCount == 2) {
				var ccp1 = cc.points[0];
				var ccp2 = cc.points[1];
				var invMassA = bodyA.m_invMass;
				var invIA = bodyA.m_invI;
				var invMassB = bodyB.m_invMass;
				var invIB = bodyB.m_invI;
				var rn1A = ccp1.rA.x * normalY - ccp1.rA.y * normalX;
				var rn1B = ccp1.rB.x * normalY - ccp1.rB.y * normalX;
				var rn2A = ccp2.rA.x * normalY - ccp2.rA.y * normalX;
				var rn2B = ccp2.rB.x * normalY - ccp2.rB.y * normalX;
				var k11 = invMassA + invMassB + invIA * rn1A * rn1A + invIB * rn1B * rn1B;
				var k22 = invMassA + invMassB + invIA * rn2A * rn2A + invIB * rn2B * rn2B;
				var k12 = invMassA + invMassB + invIA * rn1A * rn2A + invIB * rn1B * rn2B;
				var k_maxConditionNumber = 100.0;
				if(k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
					cc.K.col1.set(k11,k12);
					cc.K.col2.set(k12,k22);
					cc.K.getInverse(cc.normalMass);
				} else cc.pointCount = 1;
			}
		}
	}
	,__class__: box2D.dynamics.contacts.B2ContactSolver
}
box2D.dynamics.contacts.B2EdgeAndCircleContact = $hxClasses["box2D.dynamics.contacts.B2EdgeAndCircleContact"] = function() {
	box2D.dynamics.contacts.B2Contact.call(this);
};
box2D.dynamics.contacts.B2EdgeAndCircleContact.__name__ = ["box2D","dynamics","contacts","B2EdgeAndCircleContact"];
box2D.dynamics.contacts.B2EdgeAndCircleContact.create = function(allocator) {
	return new box2D.dynamics.contacts.B2EdgeAndCircleContact();
}
box2D.dynamics.contacts.B2EdgeAndCircleContact.destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2EdgeAndCircleContact.__super__ = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2EdgeAndCircleContact.prototype = $extend(box2D.dynamics.contacts.B2Contact.prototype,{
	b2CollideEdgeAndCircle: function(manifold,edge,xf1,circle,xf2) {
	}
	,evaluate: function() {
		var bA = this.m_fixtureA.getBody();
		var bB = this.m_fixtureB.getBody();
		this.b2CollideEdgeAndCircle(this.m_manifold,js.Boot.__cast(this.m_fixtureA.getShape() , box2D.collision.shapes.B2EdgeShape),bA.m_xf,js.Boot.__cast(this.m_fixtureB.getShape() , box2D.collision.shapes.B2CircleShape),bB.m_xf);
	}
	,reset: function(fixtureA,fixtureB) {
		box2D.dynamics.contacts.B2Contact.prototype.reset.call(this,fixtureA,fixtureB);
	}
	,__class__: box2D.dynamics.contacts.B2EdgeAndCircleContact
});
box2D.dynamics.contacts.B2PolyAndCircleContact = $hxClasses["box2D.dynamics.contacts.B2PolyAndCircleContact"] = function() {
	box2D.dynamics.contacts.B2Contact.call(this);
};
box2D.dynamics.contacts.B2PolyAndCircleContact.__name__ = ["box2D","dynamics","contacts","B2PolyAndCircleContact"];
box2D.dynamics.contacts.B2PolyAndCircleContact.create = function(allocator) {
	return new box2D.dynamics.contacts.B2PolyAndCircleContact();
}
box2D.dynamics.contacts.B2PolyAndCircleContact.destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2PolyAndCircleContact.__super__ = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2PolyAndCircleContact.prototype = $extend(box2D.dynamics.contacts.B2Contact.prototype,{
	evaluate: function() {
		var bA = this.m_fixtureA.m_body;
		var bB = this.m_fixtureB.m_body;
		box2D.collision.B2Collision.collidePolygonAndCircle(this.m_manifold,js.Boot.__cast(this.m_fixtureA.getShape() , box2D.collision.shapes.B2PolygonShape),bA.m_xf,js.Boot.__cast(this.m_fixtureB.getShape() , box2D.collision.shapes.B2CircleShape),bB.m_xf);
	}
	,reset: function(fixtureA,fixtureB) {
		box2D.dynamics.contacts.B2Contact.prototype.reset.call(this,fixtureA,fixtureB);
		box2D.common.B2Settings.b2Assert(fixtureA.getType() == box2D.collision.shapes.B2Shape.e_polygonShape);
		box2D.common.B2Settings.b2Assert(fixtureB.getType() == box2D.collision.shapes.B2Shape.e_circleShape);
	}
	,__class__: box2D.dynamics.contacts.B2PolyAndCircleContact
});
box2D.dynamics.contacts.B2PolyAndEdgeContact = $hxClasses["box2D.dynamics.contacts.B2PolyAndEdgeContact"] = function() {
	box2D.dynamics.contacts.B2Contact.call(this);
};
box2D.dynamics.contacts.B2PolyAndEdgeContact.__name__ = ["box2D","dynamics","contacts","B2PolyAndEdgeContact"];
box2D.dynamics.contacts.B2PolyAndEdgeContact.create = function(allocator) {
	return new box2D.dynamics.contacts.B2PolyAndEdgeContact();
}
box2D.dynamics.contacts.B2PolyAndEdgeContact.destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2PolyAndEdgeContact.__super__ = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2PolyAndEdgeContact.prototype = $extend(box2D.dynamics.contacts.B2Contact.prototype,{
	b2CollidePolyAndEdge: function(manifold,polygon,xf1,edge,xf2) {
	}
	,evaluate: function() {
		var bA = this.m_fixtureA.getBody();
		var bB = this.m_fixtureB.getBody();
		this.b2CollidePolyAndEdge(this.m_manifold,js.Boot.__cast(this.m_fixtureA.getShape() , box2D.collision.shapes.B2PolygonShape),bA.m_xf,js.Boot.__cast(this.m_fixtureB.getShape() , box2D.collision.shapes.B2EdgeShape),bB.m_xf);
	}
	,reset: function(fixtureA,fixtureB) {
		box2D.dynamics.contacts.B2Contact.prototype.reset.call(this,fixtureA,fixtureB);
		box2D.common.B2Settings.b2Assert(fixtureA.getType() == box2D.collision.shapes.B2Shape.e_polygonShape);
		box2D.common.B2Settings.b2Assert(fixtureB.getType() == box2D.collision.shapes.B2Shape.e_edgeShape);
	}
	,__class__: box2D.dynamics.contacts.B2PolyAndEdgeContact
});
box2D.dynamics.contacts.B2PolygonContact = $hxClasses["box2D.dynamics.contacts.B2PolygonContact"] = function() {
	box2D.dynamics.contacts.B2Contact.call(this);
};
box2D.dynamics.contacts.B2PolygonContact.__name__ = ["box2D","dynamics","contacts","B2PolygonContact"];
box2D.dynamics.contacts.B2PolygonContact.create = function(allocator) {
	return new box2D.dynamics.contacts.B2PolygonContact();
}
box2D.dynamics.contacts.B2PolygonContact.destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2PolygonContact.__super__ = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2PolygonContact.prototype = $extend(box2D.dynamics.contacts.B2Contact.prototype,{
	evaluate: function() {
		var bA = this.m_fixtureA.getBody();
		var bB = this.m_fixtureB.getBody();
		box2D.collision.B2Collision.collidePolygons(this.m_manifold,js.Boot.__cast(this.m_fixtureA.getShape() , box2D.collision.shapes.B2PolygonShape),bA.m_xf,js.Boot.__cast(this.m_fixtureB.getShape() , box2D.collision.shapes.B2PolygonShape),bB.m_xf);
	}
	,reset: function(fixtureA,fixtureB) {
		box2D.dynamics.contacts.B2Contact.prototype.reset.call(this,fixtureA,fixtureB);
	}
	,__class__: box2D.dynamics.contacts.B2PolygonContact
});
if(!box2D.dynamics.controllers) box2D.dynamics.controllers = {}
box2D.dynamics.controllers.B2Controller = $hxClasses["box2D.dynamics.controllers.B2Controller"] = function() { }
box2D.dynamics.controllers.B2Controller.__name__ = ["box2D","dynamics","controllers","B2Controller"];
box2D.dynamics.controllers.B2Controller.prototype = {
	m_world: null
	,m_bodyCount: null
	,m_bodyList: null
	,m_prev: null
	,m_next: null
	,getBodyList: function() {
		return this.m_bodyList;
	}
	,getWorld: function() {
		return this.m_world;
	}
	,getNext: function() {
		return this.m_next;
	}
	,clear: function() {
		while(this.m_bodyList != null) this.removeBody(this.m_bodyList.body);
	}
	,removeBody: function(body) {
		var edge = body.m_controllerList;
		while(edge != null && edge.controller != this) edge = edge.nextController;
		if(edge.prevBody != null) edge.prevBody.nextBody = edge.nextBody;
		if(edge.nextBody != null) edge.nextBody.prevBody = edge.prevBody;
		if(edge.nextController != null) edge.nextController.prevController = edge.prevController;
		if(edge.prevController != null) edge.prevController.nextController = edge.nextController;
		if(this.m_bodyList == edge) this.m_bodyList = edge.nextBody;
		if(body.m_controllerList == edge) body.m_controllerList = edge.nextController;
		body.m_controllerCount--;
		this.m_bodyCount--;
	}
	,addBody: function(body) {
		var edge = new box2D.dynamics.controllers.B2ControllerEdge();
		edge.controller = this;
		edge.body = body;
		edge.nextBody = this.m_bodyList;
		edge.prevBody = null;
		this.m_bodyList = edge;
		if(edge.nextBody != null) edge.nextBody.prevBody = edge;
		this.m_bodyCount++;
		edge.nextController = body.m_controllerList;
		edge.prevController = null;
		body.m_controllerList = edge;
		if(edge.nextController != null) edge.nextController.prevController = edge;
		body.m_controllerCount++;
	}
	,draw: function(debugDraw) {
	}
	,step: function(step) {
	}
	,__class__: box2D.dynamics.controllers.B2Controller
}
box2D.dynamics.controllers.B2ControllerEdge = $hxClasses["box2D.dynamics.controllers.B2ControllerEdge"] = function() {
};
box2D.dynamics.controllers.B2ControllerEdge.__name__ = ["box2D","dynamics","controllers","B2ControllerEdge"];
box2D.dynamics.controllers.B2ControllerEdge.prototype = {
	nextController: null
	,prevController: null
	,nextBody: null
	,prevBody: null
	,body: null
	,controller: null
	,__class__: box2D.dynamics.controllers.B2ControllerEdge
}
if(!box2D.dynamics.joints) box2D.dynamics.joints = {}
box2D.dynamics.joints.B2Joint = $hxClasses["box2D.dynamics.joints.B2Joint"] = function(def) {
	this.m_edgeA = new box2D.dynamics.joints.B2JointEdge();
	this.m_edgeB = new box2D.dynamics.joints.B2JointEdge();
	this.m_localCenterA = new box2D.common.math.B2Vec2();
	this.m_localCenterB = new box2D.common.math.B2Vec2();
	box2D.common.B2Settings.b2Assert(def.bodyA != def.bodyB);
	this.m_type = def.type;
	this.m_prev = null;
	this.m_next = null;
	this.m_bodyA = def.bodyA;
	this.m_bodyB = def.bodyB;
	this.m_collideConnected = def.collideConnected;
	this.m_islandFlag = false;
	this.m_userData = def.userData;
};
box2D.dynamics.joints.B2Joint.__name__ = ["box2D","dynamics","joints","B2Joint"];
box2D.dynamics.joints.B2Joint.create = function(def,allocator) {
	var joint = null;
	switch(def.type) {
	case box2D.dynamics.joints.B2Joint.e_distanceJoint:
		joint = new box2D.dynamics.joints.B2DistanceJoint(js.Boot.__cast(def , box2D.dynamics.joints.B2DistanceJointDef));
		break;
	case box2D.dynamics.joints.B2Joint.e_mouseJoint:
		joint = new box2D.dynamics.joints.B2MouseJoint(js.Boot.__cast(def , box2D.dynamics.joints.B2MouseJointDef));
		break;
	case box2D.dynamics.joints.B2Joint.e_prismaticJoint:
		joint = new box2D.dynamics.joints.B2PrismaticJoint(js.Boot.__cast(def , box2D.dynamics.joints.B2PrismaticJointDef));
		break;
	case box2D.dynamics.joints.B2Joint.e_revoluteJoint:
		joint = new box2D.dynamics.joints.B2RevoluteJoint(js.Boot.__cast(def , box2D.dynamics.joints.B2RevoluteJointDef));
		break;
	case box2D.dynamics.joints.B2Joint.e_pulleyJoint:
		joint = new box2D.dynamics.joints.B2PulleyJoint(js.Boot.__cast(def , box2D.dynamics.joints.B2PulleyJointDef));
		break;
	case box2D.dynamics.joints.B2Joint.e_gearJoint:
		joint = new box2D.dynamics.joints.B2GearJoint(js.Boot.__cast(def , box2D.dynamics.joints.B2GearJointDef));
		break;
	case box2D.dynamics.joints.B2Joint.e_lineJoint:
		joint = new box2D.dynamics.joints.B2LineJoint(js.Boot.__cast(def , box2D.dynamics.joints.B2LineJointDef));
		break;
	case box2D.dynamics.joints.B2Joint.e_weldJoint:
		joint = new box2D.dynamics.joints.B2WeldJoint(js.Boot.__cast(def , box2D.dynamics.joints.B2WeldJointDef));
		break;
	case box2D.dynamics.joints.B2Joint.e_frictionJoint:
		joint = new box2D.dynamics.joints.B2FrictionJoint(js.Boot.__cast(def , box2D.dynamics.joints.B2FrictionJointDef));
		break;
	default:
	}
	return joint;
}
box2D.dynamics.joints.B2Joint.destroy = function(joint,allocator) {
}
box2D.dynamics.joints.B2Joint.prototype = {
	m_invIB: null
	,m_invIA: null
	,m_invMassB: null
	,m_invMassA: null
	,m_localCenterB: null
	,m_localCenterA: null
	,m_userData: null
	,m_collideConnected: null
	,m_islandFlag: null
	,m_bodyB: null
	,m_bodyA: null
	,m_edgeB: null
	,m_edgeA: null
	,m_next: null
	,m_prev: null
	,m_type: null
	,solvePositionConstraints: function(baumgarte) {
		return false;
	}
	,finalizeVelocityConstraints: function() {
	}
	,solveVelocityConstraints: function(step) {
	}
	,initVelocityConstraints: function(step) {
	}
	,isActive: function() {
		return this.m_bodyA.isActive() && this.m_bodyB.isActive();
	}
	,setUserData: function(data) {
		this.m_userData = data;
	}
	,getUserData: function() {
		return this.m_userData;
	}
	,getNext: function() {
		return this.m_next;
	}
	,getBodyB: function() {
		return this.m_bodyB;
	}
	,getBodyA: function() {
		return this.m_bodyA;
	}
	,getReactionTorque: function(inv_dt) {
		return 0.0;
	}
	,getReactionForce: function(inv_dt) {
		return null;
	}
	,getAnchorB: function() {
		return null;
	}
	,getAnchorA: function() {
		return null;
	}
	,getType: function() {
		return this.m_type;
	}
	,__class__: box2D.dynamics.joints.B2Joint
}
box2D.dynamics.joints.B2DistanceJoint = $hxClasses["box2D.dynamics.joints.B2DistanceJoint"] = function(def) {
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.m_localAnchor1 = new box2D.common.math.B2Vec2();
	this.m_localAnchor2 = new box2D.common.math.B2Vec2();
	this.m_u = new box2D.common.math.B2Vec2();
	var tMat;
	var tX;
	var tY;
	this.m_localAnchor1.setV(def.localAnchorA);
	this.m_localAnchor2.setV(def.localAnchorB);
	this.m_length = def.length;
	this.m_frequencyHz = def.frequencyHz;
	this.m_dampingRatio = def.dampingRatio;
	this.m_impulse = 0.0;
	this.m_gamma = 0.0;
	this.m_bias = 0.0;
};
box2D.dynamics.joints.B2DistanceJoint.__name__ = ["box2D","dynamics","joints","B2DistanceJoint"];
box2D.dynamics.joints.B2DistanceJoint.__super__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2DistanceJoint.prototype = $extend(box2D.dynamics.joints.B2Joint.prototype,{
	m_length: null
	,m_mass: null
	,m_impulse: null
	,m_bias: null
	,m_gamma: null
	,m_dampingRatio: null
	,m_frequencyHz: null
	,m_u: null
	,m_localAnchor2: null
	,m_localAnchor1: null
	,solvePositionConstraints: function(baumgarte) {
		var tMat;
		if(this.m_frequencyHz > 0.0) return true;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
		var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
		var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
		var length = Math.sqrt(dX * dX + dY * dY);
		dX /= length;
		dY /= length;
		var C = length - this.m_length;
		C = box2D.common.math.B2Math.clamp(C,-box2D.common.B2Settings.b2_maxLinearCorrection,box2D.common.B2Settings.b2_maxLinearCorrection);
		var impulse = -this.m_mass * C;
		this.m_u.set(dX,dY);
		var PX = impulse * this.m_u.x;
		var PY = impulse * this.m_u.y;
		bA.m_sweep.c.x -= bA.m_invMass * PX;
		bA.m_sweep.c.y -= bA.m_invMass * PY;
		bA.m_sweep.a -= bA.m_invI * (r1X * PY - r1Y * PX);
		bB.m_sweep.c.x += bB.m_invMass * PX;
		bB.m_sweep.c.y += bB.m_invMass * PY;
		bB.m_sweep.a += bB.m_invI * (r2X * PY - r2Y * PX);
		bA.synchronizeTransform();
		bB.synchronizeTransform();
		return box2D.common.math.B2Math.abs(C) < box2D.common.B2Settings.b2_linearSlop;
	}
	,solveVelocityConstraints: function(step) {
		var tMat;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
		var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
		var v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
		var v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
		var v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
		var Cdot = this.m_u.x * (v2X - v1X) + this.m_u.y * (v2Y - v1Y);
		var impulse = -this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
		this.m_impulse += impulse;
		var PX = impulse * this.m_u.x;
		var PY = impulse * this.m_u.y;
		bA.m_linearVelocity.x -= bA.m_invMass * PX;
		bA.m_linearVelocity.y -= bA.m_invMass * PY;
		bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
		bB.m_linearVelocity.x += bB.m_invMass * PX;
		bB.m_linearVelocity.y += bB.m_invMass * PY;
		bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
	}
	,initVelocityConstraints: function(step) {
		var tMat;
		var tX;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
		tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		this.m_u.x = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
		this.m_u.y = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
		var length = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
		if(length > box2D.common.B2Settings.b2_linearSlop) this.m_u.multiply(1.0 / length); else this.m_u.setZero();
		var cr1u = r1X * this.m_u.y - r1Y * this.m_u.x;
		var cr2u = r2X * this.m_u.y - r2Y * this.m_u.x;
		var invMass = bA.m_invMass + bA.m_invI * cr1u * cr1u + bB.m_invMass + bB.m_invI * cr2u * cr2u;
		this.m_mass = invMass != 0.0?1.0 / invMass:0.0;
		if(this.m_frequencyHz > 0.0) {
			var C = length - this.m_length;
			var omega = 2.0 * Math.PI * this.m_frequencyHz;
			var d = 2.0 * this.m_mass * this.m_dampingRatio * omega;
			var k = this.m_mass * omega * omega;
			this.m_gamma = step.dt * (d + step.dt * k);
			this.m_gamma = this.m_gamma != 0.0?1 / this.m_gamma:0.0;
			this.m_bias = C * step.dt * k * this.m_gamma;
			this.m_mass = invMass + this.m_gamma;
			this.m_mass = this.m_mass != 0.0?1.0 / this.m_mass:0.0;
		}
		if(step.warmStarting) {
			this.m_impulse *= step.dtRatio;
			var PX = this.m_impulse * this.m_u.x;
			var PY = this.m_impulse * this.m_u.y;
			bA.m_linearVelocity.x -= bA.m_invMass * PX;
			bA.m_linearVelocity.y -= bA.m_invMass * PY;
			bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
			bB.m_linearVelocity.x += bB.m_invMass * PX;
			bB.m_linearVelocity.y += bB.m_invMass * PY;
			bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
		} else this.m_impulse = 0.0;
	}
	,setDampingRatio: function(ratio) {
		this.m_dampingRatio = ratio;
	}
	,getDampingRatio: function() {
		return this.m_dampingRatio;
	}
	,setFrequency: function(hz) {
		this.m_frequencyHz = hz;
	}
	,getFrequency: function() {
		return this.m_frequencyHz;
	}
	,setLength: function(length) {
		this.m_length = length;
	}
	,getLength: function() {
		return this.m_length;
	}
	,getReactionTorque: function(inv_dt) {
		return 0.0;
	}
	,getReactionForce: function(inv_dt) {
		return new box2D.common.math.B2Vec2(inv_dt * this.m_impulse * this.m_u.x,inv_dt * this.m_impulse * this.m_u.y);
	}
	,getAnchorB: function() {
		return this.m_bodyB.getWorldPoint(this.m_localAnchor2);
	}
	,getAnchorA: function() {
		return this.m_bodyA.getWorldPoint(this.m_localAnchor1);
	}
	,__class__: box2D.dynamics.joints.B2DistanceJoint
});
box2D.dynamics.joints.B2JointDef = $hxClasses["box2D.dynamics.joints.B2JointDef"] = function() {
	this.type = box2D.dynamics.joints.B2Joint.e_unknownJoint;
	this.userData = null;
	this.bodyA = null;
	this.bodyB = null;
	this.collideConnected = false;
};
box2D.dynamics.joints.B2JointDef.__name__ = ["box2D","dynamics","joints","B2JointDef"];
box2D.dynamics.joints.B2JointDef.prototype = {
	collideConnected: null
	,bodyB: null
	,bodyA: null
	,userData: null
	,type: null
	,__class__: box2D.dynamics.joints.B2JointDef
}
box2D.dynamics.joints.B2DistanceJointDef = $hxClasses["box2D.dynamics.joints.B2DistanceJointDef"] = function() {
	box2D.dynamics.joints.B2JointDef.call(this);
	this.localAnchorA = new box2D.common.math.B2Vec2();
	this.localAnchorB = new box2D.common.math.B2Vec2();
	this.type = box2D.dynamics.joints.B2Joint.e_distanceJoint;
	this.length = 1.0;
	this.frequencyHz = 0.0;
	this.dampingRatio = 0.0;
};
box2D.dynamics.joints.B2DistanceJointDef.__name__ = ["box2D","dynamics","joints","B2DistanceJointDef"];
box2D.dynamics.joints.B2DistanceJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
box2D.dynamics.joints.B2DistanceJointDef.prototype = $extend(box2D.dynamics.joints.B2JointDef.prototype,{
	dampingRatio: null
	,frequencyHz: null
	,length: null
	,localAnchorB: null
	,localAnchorA: null
	,initialize: function(bA,bB,anchorA,anchorB) {
		this.bodyA = bA;
		this.bodyB = bB;
		this.localAnchorA.setV(this.bodyA.getLocalPoint(anchorA));
		this.localAnchorB.setV(this.bodyB.getLocalPoint(anchorB));
		var dX = anchorB.x - anchorA.x;
		var dY = anchorB.y - anchorA.y;
		this.length = Math.sqrt(dX * dX + dY * dY);
		this.frequencyHz = 0.0;
		this.dampingRatio = 0.0;
	}
	,__class__: box2D.dynamics.joints.B2DistanceJointDef
});
box2D.dynamics.joints.B2FrictionJoint = $hxClasses["box2D.dynamics.joints.B2FrictionJoint"] = function(def) {
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.m_localAnchorA = new box2D.common.math.B2Vec2();
	this.m_localAnchorB = new box2D.common.math.B2Vec2();
	this.m_linearMass = new box2D.common.math.B2Mat22();
	this.m_linearImpulse = new box2D.common.math.B2Vec2();
	this.m_localAnchorA.setV(def.localAnchorA);
	this.m_localAnchorB.setV(def.localAnchorB);
	this.m_linearMass.setZero();
	this.m_angularMass = 0.0;
	this.m_linearImpulse.setZero();
	this.m_angularImpulse = 0.0;
	this.m_maxForce = def.maxForce;
	this.m_maxTorque = def.maxTorque;
};
box2D.dynamics.joints.B2FrictionJoint.__name__ = ["box2D","dynamics","joints","B2FrictionJoint"];
box2D.dynamics.joints.B2FrictionJoint.__super__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2FrictionJoint.prototype = $extend(box2D.dynamics.joints.B2Joint.prototype,{
	m_maxTorque: null
	,m_maxForce: null
	,m_angularImpulse: null
	,m_linearImpulse: null
	,m_angularMass: null
	,m_linearMass: null
	,m_localAnchorB: null
	,m_localAnchorA: null
	,solvePositionConstraints: function(baumgarte) {
		return true;
	}
	,solveVelocityConstraints: function(step) {
		var tMat;
		var tX;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var vA = bA.m_linearVelocity;
		var wA = bA.m_angularVelocity;
		var vB = bB.m_linearVelocity;
		var wB = bB.m_angularVelocity;
		var mA = bA.m_invMass;
		var mB = bB.m_invMass;
		var iA = bA.m_invI;
		var iB = bB.m_invI;
		tMat = bA.m_xf.R;
		var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
		var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
		tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
		rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
		rAX = tX;
		tMat = bB.m_xf.R;
		var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
		var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
		rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
		rBX = tX;
		var maxImpulse;
		var Cdot = wB - wA;
		var impulse = -this.m_angularMass * Cdot;
		var oldImpulse = this.m_angularImpulse;
		maxImpulse = step.dt * this.m_maxTorque;
		this.m_angularImpulse = box2D.common.math.B2Math.clamp(this.m_angularImpulse + impulse,-maxImpulse,maxImpulse);
		impulse = this.m_angularImpulse - oldImpulse;
		wA -= iA * impulse;
		wB += iB * impulse;
		var CdotX = vB.x - wB * rBY - vA.x + wA * rAY;
		var CdotY = vB.y + wB * rBX - vA.y - wA * rAX;
		var impulseV = box2D.common.math.B2Math.mulMV(this.m_linearMass,new box2D.common.math.B2Vec2(-CdotX,-CdotY));
		var oldImpulseV = this.m_linearImpulse.copy();
		this.m_linearImpulse.add(impulseV);
		maxImpulse = step.dt * this.m_maxForce;
		if(this.m_linearImpulse.lengthSquared() > maxImpulse * maxImpulse) {
			this.m_linearImpulse.normalize();
			this.m_linearImpulse.multiply(maxImpulse);
		}
		impulseV = box2D.common.math.B2Math.subtractVV(this.m_linearImpulse,oldImpulseV);
		vA.x -= mA * impulseV.x;
		vA.y -= mA * impulseV.y;
		wA -= iA * (rAX * impulseV.y - rAY * impulseV.x);
		vB.x += mB * impulseV.x;
		vB.y += mB * impulseV.y;
		wB += iB * (rBX * impulseV.y - rBY * impulseV.x);
		bA.m_angularVelocity = wA;
		bB.m_angularVelocity = wB;
	}
	,initVelocityConstraints: function(step) {
		var tMat;
		var tX;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		tMat = bA.m_xf.R;
		var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
		var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
		tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
		rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
		rAX = tX;
		tMat = bB.m_xf.R;
		var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
		var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
		rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
		rBX = tX;
		var mA = bA.m_invMass;
		var mB = bB.m_invMass;
		var iA = bA.m_invI;
		var iB = bB.m_invI;
		var K = new box2D.common.math.B2Mat22();
		K.col1.x = mA + mB;
		K.col2.x = 0.0;
		K.col1.y = 0.0;
		K.col2.y = mA + mB;
		K.col1.x += iA * rAY * rAY;
		K.col2.x += -iA * rAX * rAY;
		K.col1.y += -iA * rAX * rAY;
		K.col2.y += iA * rAX * rAX;
		K.col1.x += iB * rBY * rBY;
		K.col2.x += -iB * rBX * rBY;
		K.col1.y += -iB * rBX * rBY;
		K.col2.y += iB * rBX * rBX;
		K.getInverse(this.m_linearMass);
		this.m_angularMass = iA + iB;
		if(this.m_angularMass > 0.0) this.m_angularMass = 1.0 / this.m_angularMass;
		if(step.warmStarting) {
			this.m_linearImpulse.x *= step.dtRatio;
			this.m_linearImpulse.y *= step.dtRatio;
			this.m_angularImpulse *= step.dtRatio;
			var P = this.m_linearImpulse;
			bA.m_linearVelocity.x -= mA * P.x;
			bA.m_linearVelocity.y -= mA * P.y;
			bA.m_angularVelocity -= iA * (rAX * P.y - rAY * P.x + this.m_angularImpulse);
			bB.m_linearVelocity.x += mB * P.x;
			bB.m_linearVelocity.y += mB * P.y;
			bB.m_angularVelocity += iB * (rBX * P.y - rBY * P.x + this.m_angularImpulse);
		} else {
			this.m_linearImpulse.setZero();
			this.m_angularImpulse = 0.0;
		}
	}
	,getMaxTorque: function() {
		return this.m_maxTorque;
	}
	,setMaxTorque: function(torque) {
		this.m_maxTorque = torque;
	}
	,getMaxForce: function() {
		return this.m_maxForce;
	}
	,setMaxForce: function(force) {
		this.m_maxForce = force;
	}
	,getReactionTorque: function(inv_dt) {
		return inv_dt * this.m_angularImpulse;
	}
	,getReactionForce: function(inv_dt) {
		return new box2D.common.math.B2Vec2(inv_dt * this.m_linearImpulse.x,inv_dt * this.m_linearImpulse.y);
	}
	,getAnchorB: function() {
		return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
	}
	,getAnchorA: function() {
		return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
	}
	,__class__: box2D.dynamics.joints.B2FrictionJoint
});
box2D.dynamics.joints.B2FrictionJointDef = $hxClasses["box2D.dynamics.joints.B2FrictionJointDef"] = function() {
	box2D.dynamics.joints.B2JointDef.call(this);
	this.localAnchorA = new box2D.common.math.B2Vec2();
	this.localAnchorB = new box2D.common.math.B2Vec2();
	this.type = box2D.dynamics.joints.B2Joint.e_frictionJoint;
	this.maxForce = 0.0;
	this.maxTorque = 0.0;
};
box2D.dynamics.joints.B2FrictionJointDef.__name__ = ["box2D","dynamics","joints","B2FrictionJointDef"];
box2D.dynamics.joints.B2FrictionJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
box2D.dynamics.joints.B2FrictionJointDef.prototype = $extend(box2D.dynamics.joints.B2JointDef.prototype,{
	maxTorque: null
	,maxForce: null
	,localAnchorB: null
	,localAnchorA: null
	,initialize: function(bA,bB,anchor) {
		this.bodyA = bA;
		this.bodyB = bB;
		this.localAnchorA.setV(this.bodyA.getLocalPoint(anchor));
		this.localAnchorB.setV(this.bodyB.getLocalPoint(anchor));
	}
	,__class__: box2D.dynamics.joints.B2FrictionJointDef
});
box2D.dynamics.joints.B2GearJoint = $hxClasses["box2D.dynamics.joints.B2GearJoint"] = function(def) {
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.m_groundAnchor1 = new box2D.common.math.B2Vec2();
	this.m_groundAnchor2 = new box2D.common.math.B2Vec2();
	this.m_localAnchor1 = new box2D.common.math.B2Vec2();
	this.m_localAnchor2 = new box2D.common.math.B2Vec2();
	this.m_J = new box2D.dynamics.joints.B2Jacobian();
	var type1 = def.joint1.m_type;
	var type2 = def.joint2.m_type;
	this.m_revolute1 = null;
	this.m_prismatic1 = null;
	this.m_revolute2 = null;
	this.m_prismatic2 = null;
	var coordinate1;
	var coordinate2;
	this.m_ground1 = def.joint1.getBodyA();
	this.m_bodyA = def.joint1.getBodyB();
	if(type1 == box2D.dynamics.joints.B2Joint.e_revoluteJoint) {
		this.m_revolute1 = js.Boot.__cast(def.joint1 , box2D.dynamics.joints.B2RevoluteJoint);
		this.m_groundAnchor1.setV(this.m_revolute1.m_localAnchor1);
		this.m_localAnchor1.setV(this.m_revolute1.m_localAnchor2);
		coordinate1 = this.m_revolute1.getJointAngle();
	} else {
		this.m_prismatic1 = js.Boot.__cast(def.joint1 , box2D.dynamics.joints.B2PrismaticJoint);
		this.m_groundAnchor1.setV(this.m_prismatic1.m_localAnchor1);
		this.m_localAnchor1.setV(this.m_prismatic1.m_localAnchor2);
		coordinate1 = this.m_prismatic1.getJointTranslation();
	}
	this.m_ground2 = def.joint2.getBodyA();
	this.m_bodyB = def.joint2.getBodyB();
	if(type2 == box2D.dynamics.joints.B2Joint.e_revoluteJoint) {
		this.m_revolute2 = js.Boot.__cast(def.joint2 , box2D.dynamics.joints.B2RevoluteJoint);
		this.m_groundAnchor2.setV(this.m_revolute2.m_localAnchor1);
		this.m_localAnchor2.setV(this.m_revolute2.m_localAnchor2);
		coordinate2 = this.m_revolute2.getJointAngle();
	} else {
		this.m_prismatic2 = js.Boot.__cast(def.joint2 , box2D.dynamics.joints.B2PrismaticJoint);
		this.m_groundAnchor2.setV(this.m_prismatic2.m_localAnchor1);
		this.m_localAnchor2.setV(this.m_prismatic2.m_localAnchor2);
		coordinate2 = this.m_prismatic2.getJointTranslation();
	}
	this.m_ratio = def.ratio;
	this.m_constant = coordinate1 + this.m_ratio * coordinate2;
	this.m_impulse = 0.0;
};
box2D.dynamics.joints.B2GearJoint.__name__ = ["box2D","dynamics","joints","B2GearJoint"];
box2D.dynamics.joints.B2GearJoint.__super__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2GearJoint.prototype = $extend(box2D.dynamics.joints.B2Joint.prototype,{
	m_impulse: null
	,m_mass: null
	,m_ratio: null
	,m_constant: null
	,m_J: null
	,m_localAnchor2: null
	,m_localAnchor1: null
	,m_groundAnchor2: null
	,m_groundAnchor1: null
	,m_prismatic2: null
	,m_revolute2: null
	,m_prismatic1: null
	,m_revolute1: null
	,m_ground2: null
	,m_ground1: null
	,solvePositionConstraints: function(baumgarte) {
		var linearError = 0.0;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var coordinate1;
		var coordinate2;
		if(this.m_revolute1 != null) coordinate1 = this.m_revolute1.getJointAngle(); else coordinate1 = this.m_prismatic1.getJointTranslation();
		if(this.m_revolute2 != null) coordinate2 = this.m_revolute2.getJointAngle(); else coordinate2 = this.m_prismatic2.getJointTranslation();
		var C = this.m_constant - (coordinate1 + this.m_ratio * coordinate2);
		var impulse = -this.m_mass * C;
		bA.m_sweep.c.x += bA.m_invMass * impulse * this.m_J.linearA.x;
		bA.m_sweep.c.y += bA.m_invMass * impulse * this.m_J.linearA.y;
		bA.m_sweep.a += bA.m_invI * impulse * this.m_J.angularA;
		bB.m_sweep.c.x += bB.m_invMass * impulse * this.m_J.linearB.x;
		bB.m_sweep.c.y += bB.m_invMass * impulse * this.m_J.linearB.y;
		bB.m_sweep.a += bB.m_invI * impulse * this.m_J.angularB;
		bA.synchronizeTransform();
		bB.synchronizeTransform();
		return linearError < box2D.common.B2Settings.b2_linearSlop;
	}
	,solveVelocityConstraints: function(step) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var Cdot = this.m_J.compute(bA.m_linearVelocity,bA.m_angularVelocity,bB.m_linearVelocity,bB.m_angularVelocity);
		var impulse = -this.m_mass * Cdot;
		this.m_impulse += impulse;
		bA.m_linearVelocity.x += bA.m_invMass * impulse * this.m_J.linearA.x;
		bA.m_linearVelocity.y += bA.m_invMass * impulse * this.m_J.linearA.y;
		bA.m_angularVelocity += bA.m_invI * impulse * this.m_J.angularA;
		bB.m_linearVelocity.x += bB.m_invMass * impulse * this.m_J.linearB.x;
		bB.m_linearVelocity.y += bB.m_invMass * impulse * this.m_J.linearB.y;
		bB.m_angularVelocity += bB.m_invI * impulse * this.m_J.angularB;
	}
	,initVelocityConstraints: function(step) {
		var g1 = this.m_ground1;
		var g2 = this.m_ground2;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var ugX;
		var ugY;
		var rX;
		var rY;
		var tMat;
		var tVec;
		var crug;
		var tX;
		var K = 0.0;
		this.m_J.setZero();
		if(this.m_revolute1 != null) {
			this.m_J.angularA = -1.0;
			K += bA.m_invI;
		} else {
			tMat = g1.m_xf.R;
			tVec = this.m_prismatic1.m_localXAxis1;
			ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = bA.m_xf.R;
			rX = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
			rY = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
			tX = tMat.col1.x * rX + tMat.col2.x * rY;
			rY = tMat.col1.y * rX + tMat.col2.y * rY;
			rX = tX;
			crug = rX * ugY - rY * ugX;
			this.m_J.linearA.set(-ugX,-ugY);
			this.m_J.angularA = -crug;
			K += bA.m_invMass + bA.m_invI * crug * crug;
		}
		if(this.m_revolute2 != null) {
			this.m_J.angularB = -this.m_ratio;
			K += this.m_ratio * this.m_ratio * bB.m_invI;
		} else {
			tMat = g2.m_xf.R;
			tVec = this.m_prismatic2.m_localXAxis1;
			ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = bB.m_xf.R;
			rX = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
			rY = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
			tX = tMat.col1.x * rX + tMat.col2.x * rY;
			rY = tMat.col1.y * rX + tMat.col2.y * rY;
			rX = tX;
			crug = rX * ugY - rY * ugX;
			this.m_J.linearB.set(-this.m_ratio * ugX,-this.m_ratio * ugY);
			this.m_J.angularB = -this.m_ratio * crug;
			K += this.m_ratio * this.m_ratio * (bB.m_invMass + bB.m_invI * crug * crug);
		}
		this.m_mass = K > 0.0?1.0 / K:0.0;
		if(step.warmStarting) {
			bA.m_linearVelocity.x += bA.m_invMass * this.m_impulse * this.m_J.linearA.x;
			bA.m_linearVelocity.y += bA.m_invMass * this.m_impulse * this.m_J.linearA.y;
			bA.m_angularVelocity += bA.m_invI * this.m_impulse * this.m_J.angularA;
			bB.m_linearVelocity.x += bB.m_invMass * this.m_impulse * this.m_J.linearB.x;
			bB.m_linearVelocity.y += bB.m_invMass * this.m_impulse * this.m_J.linearB.y;
			bB.m_angularVelocity += bB.m_invI * this.m_impulse * this.m_J.angularB;
		} else this.m_impulse = 0.0;
	}
	,setRatio: function(ratio) {
		this.m_ratio = ratio;
	}
	,getRatio: function() {
		return this.m_ratio;
	}
	,getReactionTorque: function(inv_dt) {
		var tMat = this.m_bodyB.m_xf.R;
		var rX = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x;
		var rY = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y;
		var tX = tMat.col1.x * rX + tMat.col2.x * rY;
		rY = tMat.col1.y * rX + tMat.col2.y * rY;
		rX = tX;
		var PX = this.m_impulse * this.m_J.linearB.x;
		var PY = this.m_impulse * this.m_J.linearB.y;
		return inv_dt * (this.m_impulse * this.m_J.angularB - rX * PY + rY * PX);
	}
	,getReactionForce: function(inv_dt) {
		return new box2D.common.math.B2Vec2(inv_dt * this.m_impulse * this.m_J.linearB.x,inv_dt * this.m_impulse * this.m_J.linearB.y);
	}
	,getAnchorB: function() {
		return this.m_bodyB.getWorldPoint(this.m_localAnchor2);
	}
	,getAnchorA: function() {
		return this.m_bodyA.getWorldPoint(this.m_localAnchor1);
	}
	,__class__: box2D.dynamics.joints.B2GearJoint
});
box2D.dynamics.joints.B2GearJointDef = $hxClasses["box2D.dynamics.joints.B2GearJointDef"] = function() {
	box2D.dynamics.joints.B2JointDef.call(this);
	this.type = box2D.dynamics.joints.B2Joint.e_gearJoint;
	this.joint1 = null;
	this.joint2 = null;
	this.ratio = 1.0;
};
box2D.dynamics.joints.B2GearJointDef.__name__ = ["box2D","dynamics","joints","B2GearJointDef"];
box2D.dynamics.joints.B2GearJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
box2D.dynamics.joints.B2GearJointDef.prototype = $extend(box2D.dynamics.joints.B2JointDef.prototype,{
	ratio: null
	,joint2: null
	,joint1: null
	,__class__: box2D.dynamics.joints.B2GearJointDef
});
box2D.dynamics.joints.B2Jacobian = $hxClasses["box2D.dynamics.joints.B2Jacobian"] = function() {
	this.linearA = new box2D.common.math.B2Vec2();
	this.linearB = new box2D.common.math.B2Vec2();
};
box2D.dynamics.joints.B2Jacobian.__name__ = ["box2D","dynamics","joints","B2Jacobian"];
box2D.dynamics.joints.B2Jacobian.prototype = {
	compute: function(x1,a1,x2,a2) {
		return this.linearA.x * x1.x + this.linearA.y * x1.y + this.angularA * a1 + (this.linearB.x * x2.x + this.linearB.y * x2.y) + this.angularB * a2;
	}
	,set: function(x1,a1,x2,a2) {
		this.linearA.setV(x1);
		this.angularA = a1;
		this.linearB.setV(x2);
		this.angularB = a2;
	}
	,setZero: function() {
		this.linearA.setZero();
		this.angularA = 0.0;
		this.linearB.setZero();
		this.angularB = 0.0;
	}
	,angularB: null
	,linearB: null
	,angularA: null
	,linearA: null
	,__class__: box2D.dynamics.joints.B2Jacobian
}
box2D.dynamics.joints.B2JointEdge = $hxClasses["box2D.dynamics.joints.B2JointEdge"] = function() {
};
box2D.dynamics.joints.B2JointEdge.__name__ = ["box2D","dynamics","joints","B2JointEdge"];
box2D.dynamics.joints.B2JointEdge.prototype = {
	next: null
	,prev: null
	,joint: null
	,other: null
	,__class__: box2D.dynamics.joints.B2JointEdge
}
box2D.dynamics.joints.B2LineJoint = $hxClasses["box2D.dynamics.joints.B2LineJoint"] = function(def) {
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.m_localAnchor1 = new box2D.common.math.B2Vec2();
	this.m_localAnchor2 = new box2D.common.math.B2Vec2();
	this.m_localXAxis1 = new box2D.common.math.B2Vec2();
	this.m_localYAxis1 = new box2D.common.math.B2Vec2();
	this.m_axis = new box2D.common.math.B2Vec2();
	this.m_perp = new box2D.common.math.B2Vec2();
	this.m_K = new box2D.common.math.B2Mat22();
	this.m_impulse = new box2D.common.math.B2Vec2();
	var tMat;
	var tX;
	var tY;
	this.m_localAnchor1.setV(def.localAnchorA);
	this.m_localAnchor2.setV(def.localAnchorB);
	this.m_localXAxis1.setV(def.localAxisA);
	this.m_localYAxis1.x = -this.m_localXAxis1.y;
	this.m_localYAxis1.y = this.m_localXAxis1.x;
	this.m_impulse.setZero();
	this.m_motorMass = 0.0;
	this.m_motorImpulse = 0.0;
	this.m_lowerTranslation = def.lowerTranslation;
	this.m_upperTranslation = def.upperTranslation;
	this.m_maxMotorForce = def.maxMotorForce;
	this.m_motorSpeed = def.motorSpeed;
	this.m_enableLimit = def.enableLimit;
	this.m_enableMotor = def.enableMotor;
	this.m_limitState = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
	this.m_axis.setZero();
	this.m_perp.setZero();
};
box2D.dynamics.joints.B2LineJoint.__name__ = ["box2D","dynamics","joints","B2LineJoint"];
box2D.dynamics.joints.B2LineJoint.__super__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2LineJoint.prototype = $extend(box2D.dynamics.joints.B2Joint.prototype,{
	m_limitState: null
	,m_enableMotor: null
	,m_enableLimit: null
	,m_motorSpeed: null
	,m_maxMotorForce: null
	,m_upperTranslation: null
	,m_lowerTranslation: null
	,m_motorImpulse: null
	,m_motorMass: null
	,m_impulse: null
	,m_K: null
	,m_a2: null
	,m_a1: null
	,m_s2: null
	,m_s1: null
	,m_perp: null
	,m_axis: null
	,m_localYAxis1: null
	,m_localXAxis1: null
	,m_localAnchor2: null
	,m_localAnchor1: null
	,solvePositionConstraints: function(baumgarte) {
		var limitC;
		var oldLimitImpulse;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var c1 = bA.m_sweep.c;
		var a1 = bA.m_sweep.a;
		var c2 = bB.m_sweep.c;
		var a2 = bB.m_sweep.a;
		var tMat;
		var tX;
		var m1;
		var m2;
		var i1;
		var i2;
		var linearError = 0.0;
		var angularError = 0.0;
		var active = false;
		var C2 = 0.0;
		var R1 = box2D.common.math.B2Mat22.fromAngle(a1);
		var R2 = box2D.common.math.B2Mat22.fromAngle(a2);
		tMat = R1;
		var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
		var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
		tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = R2;
		var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
		var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var dX = c2.x + r2X - c1.x - r1X;
		var dY = c2.y + r2Y - c1.y - r1Y;
		if(this.m_enableLimit) {
			this.m_axis = box2D.common.math.B2Math.mulMV(R1,this.m_localXAxis1);
			this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
			this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
			var translation = this.m_axis.x * dX + this.m_axis.y * dY;
			if(box2D.common.math.B2Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * box2D.common.B2Settings.b2_linearSlop) {
				C2 = box2D.common.math.B2Math.clamp(translation,-box2D.common.B2Settings.b2_maxLinearCorrection,box2D.common.B2Settings.b2_maxLinearCorrection);
				linearError = box2D.common.math.B2Math.abs(translation);
				active = true;
			} else if(translation <= this.m_lowerTranslation) {
				C2 = box2D.common.math.B2Math.clamp(translation - this.m_lowerTranslation + box2D.common.B2Settings.b2_linearSlop,-box2D.common.B2Settings.b2_maxLinearCorrection,0.0);
				linearError = this.m_lowerTranslation - translation;
				active = true;
			} else if(translation >= this.m_upperTranslation) {
				C2 = box2D.common.math.B2Math.clamp(translation - this.m_upperTranslation + box2D.common.B2Settings.b2_linearSlop,0.0,box2D.common.B2Settings.b2_maxLinearCorrection);
				linearError = translation - this.m_upperTranslation;
				active = true;
			}
		}
		this.m_perp = box2D.common.math.B2Math.mulMV(R1,this.m_localYAxis1);
		this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
		this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
		var impulse = new box2D.common.math.B2Vec2();
		var C1 = this.m_perp.x * dX + this.m_perp.y * dY;
		linearError = box2D.common.math.B2Math.max(linearError,box2D.common.math.B2Math.abs(C1));
		angularError = 0.0;
		if(active) {
			m1 = this.m_invMassA;
			m2 = this.m_invMassB;
			i1 = this.m_invIA;
			i2 = this.m_invIB;
			this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
			this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
			this.m_K.col2.x = this.m_K.col1.y;
			this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
			this.m_K.solve(impulse,-C1,-C2);
		} else {
			m1 = this.m_invMassA;
			m2 = this.m_invMassB;
			i1 = this.m_invIA;
			i2 = this.m_invIB;
			var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
			var impulse1;
			if(k11 != 0.0) impulse1 = -C1 / k11; else impulse1 = 0.0;
			impulse.x = impulse1;
			impulse.y = 0.0;
		}
		var PX = impulse.x * this.m_perp.x + impulse.y * this.m_axis.x;
		var PY = impulse.x * this.m_perp.y + impulse.y * this.m_axis.y;
		var L1 = impulse.x * this.m_s1 + impulse.y * this.m_a1;
		var L2 = impulse.x * this.m_s2 + impulse.y * this.m_a2;
		c1.x -= this.m_invMassA * PX;
		c1.y -= this.m_invMassA * PY;
		a1 -= this.m_invIA * L1;
		c2.x += this.m_invMassB * PX;
		c2.y += this.m_invMassB * PY;
		a2 += this.m_invIB * L2;
		bA.m_sweep.a = a1;
		bB.m_sweep.a = a2;
		bA.synchronizeTransform();
		bB.synchronizeTransform();
		return linearError <= box2D.common.B2Settings.b2_linearSlop && angularError <= box2D.common.B2Settings.b2_angularSlop;
	}
	,solveVelocityConstraints: function(step) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var v1 = bA.m_linearVelocity;
		var w1 = bA.m_angularVelocity;
		var v2 = bB.m_linearVelocity;
		var w2 = bB.m_angularVelocity;
		var PX;
		var PY;
		var L1;
		var L2;
		if(this.m_enableMotor && this.m_limitState != box2D.dynamics.joints.B2Joint.e_equalLimits) {
			var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
			var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
			var oldImpulse = this.m_motorImpulse;
			var maxImpulse = step.dt * this.m_maxMotorForce;
			this.m_motorImpulse = box2D.common.math.B2Math.clamp(this.m_motorImpulse + impulse,-maxImpulse,maxImpulse);
			impulse = this.m_motorImpulse - oldImpulse;
			PX = impulse * this.m_axis.x;
			PY = impulse * this.m_axis.y;
			L1 = impulse * this.m_a1;
			L2 = impulse * this.m_a2;
			v1.x -= this.m_invMassA * PX;
			v1.y -= this.m_invMassA * PY;
			w1 -= this.m_invIA * L1;
			v2.x += this.m_invMassB * PX;
			v2.y += this.m_invMassB * PY;
			w2 += this.m_invIB * L2;
		}
		var Cdot1 = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
		if(this.m_enableLimit && this.m_limitState != box2D.dynamics.joints.B2Joint.e_inactiveLimit) {
			var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
			var f1 = this.m_impulse.copy();
			var df = this.m_K.solve(new box2D.common.math.B2Vec2(),-Cdot1,-Cdot2);
			this.m_impulse.add(df);
			if(this.m_limitState == box2D.dynamics.joints.B2Joint.e_atLowerLimit) this.m_impulse.y = box2D.common.math.B2Math.max(this.m_impulse.y,0.0); else if(this.m_limitState == box2D.dynamics.joints.B2Joint.e_atUpperLimit) this.m_impulse.y = box2D.common.math.B2Math.min(this.m_impulse.y,0.0);
			var b = -Cdot1 - (this.m_impulse.y - f1.y) * this.m_K.col2.x;
			var f2r;
			if(this.m_K.col1.x != 0.0) f2r = b / this.m_K.col1.x + f1.x; else f2r = f1.x;
			this.m_impulse.x = f2r;
			df.x = this.m_impulse.x - f1.x;
			df.y = this.m_impulse.y - f1.y;
			PX = df.x * this.m_perp.x + df.y * this.m_axis.x;
			PY = df.x * this.m_perp.y + df.y * this.m_axis.y;
			L1 = df.x * this.m_s1 + df.y * this.m_a1;
			L2 = df.x * this.m_s2 + df.y * this.m_a2;
			v1.x -= this.m_invMassA * PX;
			v1.y -= this.m_invMassA * PY;
			w1 -= this.m_invIA * L1;
			v2.x += this.m_invMassB * PX;
			v2.y += this.m_invMassB * PY;
			w2 += this.m_invIB * L2;
		} else {
			var df2;
			if(this.m_K.col1.x != 0.0) df2 = -Cdot1 / this.m_K.col1.x; else df2 = 0.0;
			this.m_impulse.x += df2;
			PX = df2 * this.m_perp.x;
			PY = df2 * this.m_perp.y;
			L1 = df2 * this.m_s1;
			L2 = df2 * this.m_s2;
			v1.x -= this.m_invMassA * PX;
			v1.y -= this.m_invMassA * PY;
			w1 -= this.m_invIA * L1;
			v2.x += this.m_invMassB * PX;
			v2.y += this.m_invMassB * PY;
			w2 += this.m_invIB * L2;
		}
		bA.m_linearVelocity.setV(v1);
		bA.m_angularVelocity = w1;
		bB.m_linearVelocity.setV(v2);
		bB.m_angularVelocity = w2;
	}
	,initVelocityConstraints: function(step) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		var tX;
		this.m_localCenterA.setV(bA.getLocalCenter());
		this.m_localCenterB.setV(bB.getLocalCenter());
		var xf1 = bA.getTransform();
		var xf2 = bB.getTransform();
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
		var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
		tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
		var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
		var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
		this.m_invMassA = bA.m_invMass;
		this.m_invMassB = bB.m_invMass;
		this.m_invIA = bA.m_invI;
		this.m_invIB = bB.m_invI;
		this.m_axis.setV(box2D.common.math.B2Math.mulMV(xf1.R,this.m_localXAxis1));
		this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
		this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
		this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
		this.m_motorMass = this.m_motorMass > Number.MIN_VALUE?1.0 / this.m_motorMass:0.0;
		this.m_perp.setV(box2D.common.math.B2Math.mulMV(xf1.R,this.m_localYAxis1));
		this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
		this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
		var m1 = this.m_invMassA;
		var m2 = this.m_invMassB;
		var i1 = this.m_invIA;
		var i2 = this.m_invIB;
		this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
		this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
		this.m_K.col2.x = this.m_K.col1.y;
		this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
		if(this.m_enableLimit) {
			var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
			if(box2D.common.math.B2Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * box2D.common.B2Settings.b2_linearSlop) this.m_limitState = box2D.dynamics.joints.B2Joint.e_equalLimits; else if(jointTransition <= this.m_lowerTranslation) {
				if(this.m_limitState != box2D.dynamics.joints.B2Joint.e_atLowerLimit) {
					this.m_limitState = box2D.dynamics.joints.B2Joint.e_atLowerLimit;
					this.m_impulse.y = 0.0;
				}
			} else if(jointTransition >= this.m_upperTranslation) {
				if(this.m_limitState != box2D.dynamics.joints.B2Joint.e_atUpperLimit) {
					this.m_limitState = box2D.dynamics.joints.B2Joint.e_atUpperLimit;
					this.m_impulse.y = 0.0;
				}
			} else {
				this.m_limitState = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
				this.m_impulse.y = 0.0;
			}
		} else this.m_limitState = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
		if(this.m_enableMotor == false) this.m_motorImpulse = 0.0;
		if(step.warmStarting) {
			this.m_impulse.x *= step.dtRatio;
			this.m_impulse.y *= step.dtRatio;
			this.m_motorImpulse *= step.dtRatio;
			var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x;
			var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y;
			var L1 = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1;
			var L2 = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2;
			bA.m_linearVelocity.x -= this.m_invMassA * PX;
			bA.m_linearVelocity.y -= this.m_invMassA * PY;
			bA.m_angularVelocity -= this.m_invIA * L1;
			bB.m_linearVelocity.x += this.m_invMassB * PX;
			bB.m_linearVelocity.y += this.m_invMassB * PY;
			bB.m_angularVelocity += this.m_invIB * L2;
		} else {
			this.m_impulse.setZero();
			this.m_motorImpulse = 0.0;
		}
	}
	,getMotorForce: function() {
		return this.m_motorImpulse;
	}
	,getMaxMotorForce: function() {
		return this.m_maxMotorForce;
	}
	,setMaxMotorForce: function(force) {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		this.m_maxMotorForce = force;
	}
	,getMotorSpeed: function() {
		return this.m_motorSpeed;
	}
	,setMotorSpeed: function(speed) {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		this.m_motorSpeed = speed;
	}
	,enableMotor: function(flag) {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		this.m_enableMotor = flag;
	}
	,isMotorEnabled: function() {
		return this.m_enableMotor;
	}
	,setLimits: function(lower,upper) {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		this.m_lowerTranslation = lower;
		this.m_upperTranslation = upper;
	}
	,getUpperLimit: function() {
		return this.m_upperTranslation;
	}
	,getLowerLimit: function() {
		return this.m_lowerTranslation;
	}
	,enableLimit: function(flag) {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		this.m_enableLimit = flag;
	}
	,isLimitEnabled: function() {
		return this.m_enableLimit;
	}
	,getJointSpeed: function() {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
		var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var p1X = bA.m_sweep.c.x + r1X;
		var p1Y = bA.m_sweep.c.y + r1Y;
		var p2X = bB.m_sweep.c.x + r2X;
		var p2Y = bB.m_sweep.c.y + r2Y;
		var dX = p2X - p1X;
		var dY = p2Y - p1Y;
		var axis = bA.getWorldVector(this.m_localXAxis1);
		var v1 = bA.m_linearVelocity;
		var v2 = bB.m_linearVelocity;
		var w1 = bA.m_angularVelocity;
		var w2 = bB.m_angularVelocity;
		var speed = dX * (-w1 * axis.y) + dY * (w1 * axis.x) + (axis.x * (v2.x + -w2 * r2Y - v1.x - -w1 * r1Y) + axis.y * (v2.y + w2 * r2X - v1.y - w1 * r1X));
		return speed;
	}
	,getJointTranslation: function() {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		var p1 = bA.getWorldPoint(this.m_localAnchor1);
		var p2 = bB.getWorldPoint(this.m_localAnchor2);
		var dX = p2.x - p1.x;
		var dY = p2.y - p1.y;
		var axis = bA.getWorldVector(this.m_localXAxis1);
		var translation = axis.x * dX + axis.y * dY;
		return translation;
	}
	,getReactionTorque: function(inv_dt) {
		return inv_dt * this.m_impulse.y;
	}
	,getReactionForce: function(inv_dt) {
		return new box2D.common.math.B2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x),inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y));
	}
	,getAnchorB: function() {
		return this.m_bodyB.getWorldPoint(this.m_localAnchor2);
	}
	,getAnchorA: function() {
		return this.m_bodyA.getWorldPoint(this.m_localAnchor1);
	}
	,__class__: box2D.dynamics.joints.B2LineJoint
});
box2D.dynamics.joints.B2LineJointDef = $hxClasses["box2D.dynamics.joints.B2LineJointDef"] = function() {
	box2D.dynamics.joints.B2JointDef.call(this);
};
box2D.dynamics.joints.B2LineJointDef.__name__ = ["box2D","dynamics","joints","B2LineJointDef"];
box2D.dynamics.joints.B2LineJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
box2D.dynamics.joints.B2LineJointDef.prototype = $extend(box2D.dynamics.joints.B2JointDef.prototype,{
	motorSpeed: null
	,maxMotorForce: null
	,enableMotor: null
	,upperTranslation: null
	,lowerTranslation: null
	,enableLimit: null
	,localAxisA: null
	,localAnchorB: null
	,localAnchorA: null
	,initialize: function(bA,bB,anchor,axis) {
		this.bodyA = bA;
		this.bodyB = bB;
		this.localAnchorA = this.bodyA.getLocalPoint(anchor);
		this.localAnchorB = this.bodyB.getLocalPoint(anchor);
		this.localAxisA = this.bodyA.getLocalVector(axis);
	}
	,b2LineJointDef: function() {
		this.localAnchorA = new box2D.common.math.B2Vec2();
		this.localAnchorB = new box2D.common.math.B2Vec2();
		this.localAxisA = new box2D.common.math.B2Vec2();
		this.type = box2D.dynamics.joints.B2Joint.e_lineJoint;
		this.localAxisA.set(1.0,0.0);
		this.enableLimit = false;
		this.lowerTranslation = 0.0;
		this.upperTranslation = 0.0;
		this.enableMotor = false;
		this.maxMotorForce = 0.0;
		this.motorSpeed = 0.0;
	}
	,__class__: box2D.dynamics.joints.B2LineJointDef
});
box2D.dynamics.joints.B2MouseJoint = $hxClasses["box2D.dynamics.joints.B2MouseJoint"] = function(def) {
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.K = new box2D.common.math.B2Mat22();
	this.K1 = new box2D.common.math.B2Mat22();
	this.K2 = new box2D.common.math.B2Mat22();
	this.m_localAnchor = new box2D.common.math.B2Vec2();
	this.m_target = new box2D.common.math.B2Vec2();
	this.m_impulse = new box2D.common.math.B2Vec2();
	this.m_mass = new box2D.common.math.B2Mat22();
	this.m_C = new box2D.common.math.B2Vec2();
	this.m_target.setV(def.target);
	var tX = this.m_target.x - this.m_bodyB.m_xf.position.x;
	var tY = this.m_target.y - this.m_bodyB.m_xf.position.y;
	var tMat = this.m_bodyB.m_xf.R;
	this.m_localAnchor.x = tX * tMat.col1.x + tY * tMat.col1.y;
	this.m_localAnchor.y = tX * tMat.col2.x + tY * tMat.col2.y;
	this.m_maxForce = def.maxForce;
	this.m_impulse.setZero();
	this.m_frequencyHz = def.frequencyHz;
	this.m_dampingRatio = def.dampingRatio;
	this.m_beta = 0.0;
	this.m_gamma = 0.0;
};
box2D.dynamics.joints.B2MouseJoint.__name__ = ["box2D","dynamics","joints","B2MouseJoint"];
box2D.dynamics.joints.B2MouseJoint.__super__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2MouseJoint.prototype = $extend(box2D.dynamics.joints.B2Joint.prototype,{
	m_gamma: null
	,m_beta: null
	,m_dampingRatio: null
	,m_frequencyHz: null
	,m_maxForce: null
	,m_C: null
	,m_mass: null
	,m_impulse: null
	,m_target: null
	,m_localAnchor: null
	,solvePositionConstraints: function(baumgarte) {
		return true;
	}
	,solveVelocityConstraints: function(step) {
		var b = this.m_bodyB;
		var tMat;
		var tX;
		var tY;
		tMat = b.m_xf.R;
		var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
		var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
		tX = tMat.col1.x * rX + tMat.col2.x * rY;
		rY = tMat.col1.y * rX + tMat.col2.y * rY;
		rX = tX;
		var CdotX = b.m_linearVelocity.x + -b.m_angularVelocity * rY;
		var CdotY = b.m_linearVelocity.y + b.m_angularVelocity * rX;
		tMat = this.m_mass;
		tX = CdotX + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
		tY = CdotY + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
		var impulseX = -(tMat.col1.x * tX + tMat.col2.x * tY);
		var impulseY = -(tMat.col1.y * tX + tMat.col2.y * tY);
		var oldImpulseX = this.m_impulse.x;
		var oldImpulseY = this.m_impulse.y;
		this.m_impulse.x += impulseX;
		this.m_impulse.y += impulseY;
		var maxImpulse = step.dt * this.m_maxForce;
		if(this.m_impulse.lengthSquared() > maxImpulse * maxImpulse) this.m_impulse.multiply(maxImpulse / this.m_impulse.length());
		impulseX = this.m_impulse.x - oldImpulseX;
		impulseY = this.m_impulse.y - oldImpulseY;
		b.m_linearVelocity.x += b.m_invMass * impulseX;
		b.m_linearVelocity.y += b.m_invMass * impulseY;
		b.m_angularVelocity += b.m_invI * (rX * impulseY - rY * impulseX);
	}
	,initVelocityConstraints: function(step) {
		var b = this.m_bodyB;
		var mass = b.getMass();
		var omega = 2.0 * Math.PI * this.m_frequencyHz;
		var d = 2.0 * mass * this.m_dampingRatio * omega;
		var k = mass * omega * omega;
		this.m_gamma = step.dt * (d + step.dt * k);
		this.m_gamma = this.m_gamma != 0?1 / this.m_gamma:0.0;
		this.m_beta = step.dt * k * this.m_gamma;
		var tMat;
		tMat = b.m_xf.R;
		var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
		var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
		var tX = tMat.col1.x * rX + tMat.col2.x * rY;
		rY = tMat.col1.y * rX + tMat.col2.y * rY;
		rX = tX;
		var invMass = b.m_invMass;
		var invI = b.m_invI;
		this.K1.col1.x = invMass;
		this.K1.col2.x = 0.0;
		this.K1.col1.y = 0.0;
		this.K1.col2.y = invMass;
		this.K2.col1.x = invI * rY * rY;
		this.K2.col2.x = -invI * rX * rY;
		this.K2.col1.y = -invI * rX * rY;
		this.K2.col2.y = invI * rX * rX;
		this.K.setM(this.K1);
		this.K.addM(this.K2);
		this.K.col1.x += this.m_gamma;
		this.K.col2.y += this.m_gamma;
		this.K.getInverse(this.m_mass);
		this.m_C.x = b.m_sweep.c.x + rX - this.m_target.x;
		this.m_C.y = b.m_sweep.c.y + rY - this.m_target.y;
		b.m_angularVelocity *= 0.98;
		this.m_impulse.x *= step.dtRatio;
		this.m_impulse.y *= step.dtRatio;
		b.m_linearVelocity.x += invMass * this.m_impulse.x;
		b.m_linearVelocity.y += invMass * this.m_impulse.y;
		b.m_angularVelocity += invI * (rX * this.m_impulse.y - rY * this.m_impulse.x);
	}
	,K2: null
	,K1: null
	,K: null
	,setDampingRatio: function(ratio) {
		this.m_dampingRatio = ratio;
	}
	,getDampingRatio: function() {
		return this.m_dampingRatio;
	}
	,setFrequency: function(hz) {
		this.m_frequencyHz = hz;
	}
	,getFrequency: function() {
		return this.m_frequencyHz;
	}
	,setMaxForce: function(maxForce) {
		this.m_maxForce = maxForce;
	}
	,getMaxForce: function() {
		return this.m_maxForce;
	}
	,setTarget: function(target) {
		if(this.m_bodyB.isAwake() == false) this.m_bodyB.setAwake(true);
		this.m_target = target;
	}
	,getTarget: function() {
		return this.m_target;
	}
	,getReactionTorque: function(inv_dt) {
		return 0.0;
	}
	,getReactionForce: function(inv_dt) {
		return new box2D.common.math.B2Vec2(inv_dt * this.m_impulse.x,inv_dt * this.m_impulse.y);
	}
	,getAnchorB: function() {
		return this.m_bodyB.getWorldPoint(this.m_localAnchor);
	}
	,getAnchorA: function() {
		return this.m_target;
	}
	,__class__: box2D.dynamics.joints.B2MouseJoint
});
box2D.dynamics.joints.B2MouseJointDef = $hxClasses["box2D.dynamics.joints.B2MouseJointDef"] = function() {
	box2D.dynamics.joints.B2JointDef.call(this);
	this.target = new box2D.common.math.B2Vec2();
	this.type = box2D.dynamics.joints.B2Joint.e_mouseJoint;
	this.maxForce = 0.0;
	this.frequencyHz = 5.0;
	this.dampingRatio = 0.7;
};
box2D.dynamics.joints.B2MouseJointDef.__name__ = ["box2D","dynamics","joints","B2MouseJointDef"];
box2D.dynamics.joints.B2MouseJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
box2D.dynamics.joints.B2MouseJointDef.prototype = $extend(box2D.dynamics.joints.B2JointDef.prototype,{
	dampingRatio: null
	,frequencyHz: null
	,maxForce: null
	,target: null
	,__class__: box2D.dynamics.joints.B2MouseJointDef
});
box2D.dynamics.joints.B2PrismaticJoint = $hxClasses["box2D.dynamics.joints.B2PrismaticJoint"] = function(def) {
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.m_localAnchor1 = new box2D.common.math.B2Vec2();
	this.m_localAnchor2 = new box2D.common.math.B2Vec2();
	this.m_localXAxis1 = new box2D.common.math.B2Vec2();
	this.m_localYAxis1 = new box2D.common.math.B2Vec2();
	this.m_axis = new box2D.common.math.B2Vec2();
	this.m_perp = new box2D.common.math.B2Vec2();
	this.m_K = new box2D.common.math.B2Mat33();
	this.m_impulse = new box2D.common.math.B2Vec3();
	var tMat;
	var tX;
	var tY;
	this.m_localAnchor1.setV(def.localAnchorA);
	this.m_localAnchor2.setV(def.localAnchorB);
	this.m_localXAxis1.setV(def.localAxisA);
	this.m_localYAxis1.x = -this.m_localXAxis1.y;
	this.m_localYAxis1.y = this.m_localXAxis1.x;
	this.m_refAngle = def.referenceAngle;
	this.m_impulse.setZero();
	this.m_motorMass = 0.0;
	this.m_motorImpulse = 0.0;
	this.m_lowerTranslation = def.lowerTranslation;
	this.m_upperTranslation = def.upperTranslation;
	this.m_maxMotorForce = def.maxMotorForce;
	this.m_motorSpeed = def.motorSpeed;
	this.m_enableLimit = def.enableLimit;
	this.m_enableMotor = def.enableMotor;
	this.m_limitState = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
	this.m_axis.setZero();
	this.m_perp.setZero();
};
box2D.dynamics.joints.B2PrismaticJoint.__name__ = ["box2D","dynamics","joints","B2PrismaticJoint"];
box2D.dynamics.joints.B2PrismaticJoint.__super__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2PrismaticJoint.prototype = $extend(box2D.dynamics.joints.B2Joint.prototype,{
	m_limitState: null
	,m_enableMotor: null
	,m_enableLimit: null
	,m_motorSpeed: null
	,m_maxMotorForce: null
	,m_upperTranslation: null
	,m_lowerTranslation: null
	,m_motorImpulse: null
	,m_motorMass: null
	,m_impulse: null
	,m_K: null
	,m_a2: null
	,m_a1: null
	,m_s2: null
	,m_s1: null
	,m_perp: null
	,m_axis: null
	,m_refAngle: null
	,m_localYAxis1: null
	,m_localXAxis1: null
	,m_localAnchor2: null
	,m_localAnchor1: null
	,solvePositionConstraints: function(baumgarte) {
		var limitC;
		var oldLimitImpulse;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var c1 = bA.m_sweep.c;
		var a1 = bA.m_sweep.a;
		var c2 = bB.m_sweep.c;
		var a2 = bB.m_sweep.a;
		var tMat;
		var tX;
		var m1;
		var m2;
		var i1;
		var i2;
		var linearError = 0.0;
		var angularError = 0.0;
		var active = false;
		var C2 = 0.0;
		var R1 = box2D.common.math.B2Mat22.fromAngle(a1);
		var R2 = box2D.common.math.B2Mat22.fromAngle(a2);
		tMat = R1;
		var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
		var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
		tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = R2;
		var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
		var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var dX = c2.x + r2X - c1.x - r1X;
		var dY = c2.y + r2Y - c1.y - r1Y;
		if(this.m_enableLimit) {
			this.m_axis = box2D.common.math.B2Math.mulMV(R1,this.m_localXAxis1);
			this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
			this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
			var translation = this.m_axis.x * dX + this.m_axis.y * dY;
			if(box2D.common.math.B2Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * box2D.common.B2Settings.b2_linearSlop) {
				C2 = box2D.common.math.B2Math.clamp(translation,-box2D.common.B2Settings.b2_maxLinearCorrection,box2D.common.B2Settings.b2_maxLinearCorrection);
				linearError = box2D.common.math.B2Math.abs(translation);
				active = true;
			} else if(translation <= this.m_lowerTranslation) {
				C2 = box2D.common.math.B2Math.clamp(translation - this.m_lowerTranslation + box2D.common.B2Settings.b2_linearSlop,-box2D.common.B2Settings.b2_maxLinearCorrection,0.0);
				linearError = this.m_lowerTranslation - translation;
				active = true;
			} else if(translation >= this.m_upperTranslation) {
				C2 = box2D.common.math.B2Math.clamp(translation - this.m_upperTranslation + box2D.common.B2Settings.b2_linearSlop,0.0,box2D.common.B2Settings.b2_maxLinearCorrection);
				linearError = translation - this.m_upperTranslation;
				active = true;
			}
		}
		this.m_perp = box2D.common.math.B2Math.mulMV(R1,this.m_localYAxis1);
		this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
		this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
		var impulse = new box2D.common.math.B2Vec3();
		var C1X = this.m_perp.x * dX + this.m_perp.y * dY;
		var C1Y = a2 - a1 - this.m_refAngle;
		linearError = box2D.common.math.B2Math.max(linearError,box2D.common.math.B2Math.abs(C1X));
		angularError = box2D.common.math.B2Math.abs(C1Y);
		if(active) {
			m1 = this.m_invMassA;
			m2 = this.m_invMassB;
			i1 = this.m_invIA;
			i2 = this.m_invIB;
			this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
			this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
			this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
			this.m_K.col2.x = this.m_K.col1.y;
			this.m_K.col2.y = i1 + i2;
			this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
			this.m_K.col3.x = this.m_K.col1.z;
			this.m_K.col3.y = this.m_K.col2.z;
			this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
			this.m_K.solve33(impulse,-C1X,-C1Y,-C2);
		} else {
			m1 = this.m_invMassA;
			m2 = this.m_invMassB;
			i1 = this.m_invIA;
			i2 = this.m_invIB;
			var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
			var k12 = i1 * this.m_s1 + i2 * this.m_s2;
			var k22 = i1 + i2;
			this.m_K.col1.set(k11,k12,0.0);
			this.m_K.col2.set(k12,k22,0.0);
			var impulse1 = this.m_K.solve22(new box2D.common.math.B2Vec2(),-C1X,-C1Y);
			impulse.x = impulse1.x;
			impulse.y = impulse1.y;
			impulse.z = 0.0;
		}
		var PX = impulse.x * this.m_perp.x + impulse.z * this.m_axis.x;
		var PY = impulse.x * this.m_perp.y + impulse.z * this.m_axis.y;
		var L1 = impulse.x * this.m_s1 + impulse.y + impulse.z * this.m_a1;
		var L2 = impulse.x * this.m_s2 + impulse.y + impulse.z * this.m_a2;
		c1.x -= this.m_invMassA * PX;
		c1.y -= this.m_invMassA * PY;
		a1 -= this.m_invIA * L1;
		c2.x += this.m_invMassB * PX;
		c2.y += this.m_invMassB * PY;
		a2 += this.m_invIB * L2;
		bA.m_sweep.a = a1;
		bB.m_sweep.a = a2;
		bA.synchronizeTransform();
		bB.synchronizeTransform();
		return linearError <= box2D.common.B2Settings.b2_linearSlop && angularError <= box2D.common.B2Settings.b2_angularSlop;
	}
	,solveVelocityConstraints: function(step) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var v1 = bA.m_linearVelocity;
		var w1 = bA.m_angularVelocity;
		var v2 = bB.m_linearVelocity;
		var w2 = bB.m_angularVelocity;
		var PX;
		var PY;
		var L1;
		var L2;
		if(this.m_enableMotor && this.m_limitState != box2D.dynamics.joints.B2Joint.e_equalLimits) {
			var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
			var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
			var oldImpulse = this.m_motorImpulse;
			var maxImpulse = step.dt * this.m_maxMotorForce;
			this.m_motorImpulse = box2D.common.math.B2Math.clamp(this.m_motorImpulse + impulse,-maxImpulse,maxImpulse);
			impulse = this.m_motorImpulse - oldImpulse;
			PX = impulse * this.m_axis.x;
			PY = impulse * this.m_axis.y;
			L1 = impulse * this.m_a1;
			L2 = impulse * this.m_a2;
			v1.x -= this.m_invMassA * PX;
			v1.y -= this.m_invMassA * PY;
			w1 -= this.m_invIA * L1;
			v2.x += this.m_invMassB * PX;
			v2.y += this.m_invMassB * PY;
			w2 += this.m_invIB * L2;
		}
		var Cdot1X = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
		var Cdot1Y = w2 - w1;
		if(this.m_enableLimit && this.m_limitState != box2D.dynamics.joints.B2Joint.e_inactiveLimit) {
			var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
			var f1 = this.m_impulse.copy();
			var df = this.m_K.solve33(new box2D.common.math.B2Vec3(),-Cdot1X,-Cdot1Y,-Cdot2);
			this.m_impulse.add(df);
			if(this.m_limitState == box2D.dynamics.joints.B2Joint.e_atLowerLimit) this.m_impulse.z = box2D.common.math.B2Math.max(this.m_impulse.z,0.0); else if(this.m_limitState == box2D.dynamics.joints.B2Joint.e_atUpperLimit) this.m_impulse.z = box2D.common.math.B2Math.min(this.m_impulse.z,0.0);
			var bX = -Cdot1X - (this.m_impulse.z - f1.z) * this.m_K.col3.x;
			var bY = -Cdot1Y - (this.m_impulse.z - f1.z) * this.m_K.col3.y;
			var f2r = this.m_K.solve22(new box2D.common.math.B2Vec2(),bX,bY);
			f2r.x += f1.x;
			f2r.y += f1.y;
			this.m_impulse.x = f2r.x;
			this.m_impulse.y = f2r.y;
			df.x = this.m_impulse.x - f1.x;
			df.y = this.m_impulse.y - f1.y;
			df.z = this.m_impulse.z - f1.z;
			PX = df.x * this.m_perp.x + df.z * this.m_axis.x;
			PY = df.x * this.m_perp.y + df.z * this.m_axis.y;
			L1 = df.x * this.m_s1 + df.y + df.z * this.m_a1;
			L2 = df.x * this.m_s2 + df.y + df.z * this.m_a2;
			v1.x -= this.m_invMassA * PX;
			v1.y -= this.m_invMassA * PY;
			w1 -= this.m_invIA * L1;
			v2.x += this.m_invMassB * PX;
			v2.y += this.m_invMassB * PY;
			w2 += this.m_invIB * L2;
		} else {
			var df2 = this.m_K.solve22(new box2D.common.math.B2Vec2(),-Cdot1X,-Cdot1Y);
			this.m_impulse.x += df2.x;
			this.m_impulse.y += df2.y;
			PX = df2.x * this.m_perp.x;
			PY = df2.x * this.m_perp.y;
			L1 = df2.x * this.m_s1 + df2.y;
			L2 = df2.x * this.m_s2 + df2.y;
			v1.x -= this.m_invMassA * PX;
			v1.y -= this.m_invMassA * PY;
			w1 -= this.m_invIA * L1;
			v2.x += this.m_invMassB * PX;
			v2.y += this.m_invMassB * PY;
			w2 += this.m_invIB * L2;
		}
		bA.m_linearVelocity.setV(v1);
		bA.m_angularVelocity = w1;
		bB.m_linearVelocity.setV(v2);
		bB.m_angularVelocity = w2;
	}
	,initVelocityConstraints: function(step) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		var tX;
		this.m_localCenterA.setV(bA.getLocalCenter());
		this.m_localCenterB.setV(bB.getLocalCenter());
		var xf1 = bA.getTransform();
		var xf2 = bB.getTransform();
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
		var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
		tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
		var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
		var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
		this.m_invMassA = bA.m_invMass;
		this.m_invMassB = bB.m_invMass;
		this.m_invIA = bA.m_invI;
		this.m_invIB = bB.m_invI;
		this.m_axis.setV(box2D.common.math.B2Math.mulMV(xf1.R,this.m_localXAxis1));
		this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
		this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
		this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
		if(this.m_motorMass > Number.MIN_VALUE) this.m_motorMass = 1.0 / this.m_motorMass;
		this.m_perp.setV(box2D.common.math.B2Math.mulMV(xf1.R,this.m_localYAxis1));
		this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
		this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
		var m1 = this.m_invMassA;
		var m2 = this.m_invMassB;
		var i1 = this.m_invIA;
		var i2 = this.m_invIB;
		this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
		this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
		this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
		this.m_K.col2.x = this.m_K.col1.y;
		this.m_K.col2.y = i1 + i2;
		this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
		this.m_K.col3.x = this.m_K.col1.z;
		this.m_K.col3.y = this.m_K.col2.z;
		this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
		if(this.m_enableLimit) {
			var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
			if(box2D.common.math.B2Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * box2D.common.B2Settings.b2_linearSlop) this.m_limitState = box2D.dynamics.joints.B2Joint.e_equalLimits; else if(jointTransition <= this.m_lowerTranslation) {
				if(this.m_limitState != box2D.dynamics.joints.B2Joint.e_atLowerLimit) {
					this.m_limitState = box2D.dynamics.joints.B2Joint.e_atLowerLimit;
					this.m_impulse.z = 0.0;
				}
			} else if(jointTransition >= this.m_upperTranslation) {
				if(this.m_limitState != box2D.dynamics.joints.B2Joint.e_atUpperLimit) {
					this.m_limitState = box2D.dynamics.joints.B2Joint.e_atUpperLimit;
					this.m_impulse.z = 0.0;
				}
			} else {
				this.m_limitState = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
				this.m_impulse.z = 0.0;
			}
		} else this.m_limitState = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
		if(this.m_enableMotor == false) this.m_motorImpulse = 0.0;
		if(step.warmStarting) {
			this.m_impulse.x *= step.dtRatio;
			this.m_impulse.y *= step.dtRatio;
			this.m_motorImpulse *= step.dtRatio;
			var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x;
			var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y;
			var L1 = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
			var L2 = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
			bA.m_linearVelocity.x -= this.m_invMassA * PX;
			bA.m_linearVelocity.y -= this.m_invMassA * PY;
			bA.m_angularVelocity -= this.m_invIA * L1;
			bB.m_linearVelocity.x += this.m_invMassB * PX;
			bB.m_linearVelocity.y += this.m_invMassB * PY;
			bB.m_angularVelocity += this.m_invIB * L2;
		} else {
			this.m_impulse.setZero();
			this.m_motorImpulse = 0.0;
		}
	}
	,getMotorForce: function() {
		return this.m_motorImpulse;
	}
	,setMaxMotorForce: function(force) {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		this.m_maxMotorForce = force;
	}
	,getMotorSpeed: function() {
		return this.m_motorSpeed;
	}
	,setMotorSpeed: function(speed) {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		this.m_motorSpeed = speed;
	}
	,enableMotor: function(flag) {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		this.m_enableMotor = flag;
	}
	,isMotorEnabled: function() {
		return this.m_enableMotor;
	}
	,setLimits: function(lower,upper) {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		this.m_lowerTranslation = lower;
		this.m_upperTranslation = upper;
	}
	,getUpperLimit: function() {
		return this.m_upperTranslation;
	}
	,getLowerLimit: function() {
		return this.m_lowerTranslation;
	}
	,enableLimit: function(flag) {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		this.m_enableLimit = flag;
	}
	,isLimitEnabled: function() {
		return this.m_enableLimit;
	}
	,getJointSpeed: function() {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
		var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var p1X = bA.m_sweep.c.x + r1X;
		var p1Y = bA.m_sweep.c.y + r1Y;
		var p2X = bB.m_sweep.c.x + r2X;
		var p2Y = bB.m_sweep.c.y + r2Y;
		var dX = p2X - p1X;
		var dY = p2Y - p1Y;
		var axis = bA.getWorldVector(this.m_localXAxis1);
		var v1 = bA.m_linearVelocity;
		var v2 = bB.m_linearVelocity;
		var w1 = bA.m_angularVelocity;
		var w2 = bB.m_angularVelocity;
		var speed = dX * (-w1 * axis.y) + dY * (w1 * axis.x) + (axis.x * (v2.x + -w2 * r2Y - v1.x - -w1 * r1Y) + axis.y * (v2.y + w2 * r2X - v1.y - w1 * r1X));
		return speed;
	}
	,getJointTranslation: function() {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		var p1 = bA.getWorldPoint(this.m_localAnchor1);
		var p2 = bB.getWorldPoint(this.m_localAnchor2);
		var dX = p2.x - p1.x;
		var dY = p2.y - p1.y;
		var axis = bA.getWorldVector(this.m_localXAxis1);
		var translation = axis.x * dX + axis.y * dY;
		return translation;
	}
	,getReactionTorque: function(inv_dt) {
		return inv_dt * this.m_impulse.y;
	}
	,getReactionForce: function(inv_dt) {
		return new box2D.common.math.B2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x),inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y));
	}
	,getAnchorB: function() {
		return this.m_bodyB.getWorldPoint(this.m_localAnchor2);
	}
	,getAnchorA: function() {
		return this.m_bodyA.getWorldPoint(this.m_localAnchor1);
	}
	,__class__: box2D.dynamics.joints.B2PrismaticJoint
});
box2D.dynamics.joints.B2PrismaticJointDef = $hxClasses["box2D.dynamics.joints.B2PrismaticJointDef"] = function() {
	box2D.dynamics.joints.B2JointDef.call(this);
	this.localAnchorA = new box2D.common.math.B2Vec2();
	this.localAnchorB = new box2D.common.math.B2Vec2();
	this.localAxisA = new box2D.common.math.B2Vec2();
	this.type = box2D.dynamics.joints.B2Joint.e_prismaticJoint;
	this.localAxisA.set(1.0,0.0);
	this.referenceAngle = 0.0;
	this.enableLimit = false;
	this.lowerTranslation = 0.0;
	this.upperTranslation = 0.0;
	this.enableMotor = false;
	this.maxMotorForce = 0.0;
	this.motorSpeed = 0.0;
};
box2D.dynamics.joints.B2PrismaticJointDef.__name__ = ["box2D","dynamics","joints","B2PrismaticJointDef"];
box2D.dynamics.joints.B2PrismaticJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
box2D.dynamics.joints.B2PrismaticJointDef.prototype = $extend(box2D.dynamics.joints.B2JointDef.prototype,{
	motorSpeed: null
	,maxMotorForce: null
	,enableMotor: null
	,upperTranslation: null
	,lowerTranslation: null
	,enableLimit: null
	,referenceAngle: null
	,localAxisA: null
	,localAnchorB: null
	,localAnchorA: null
	,initialize: function(bA,bB,anchor,axis) {
		this.bodyA = bA;
		this.bodyB = bB;
		this.localAnchorA = this.bodyA.getLocalPoint(anchor);
		this.localAnchorB = this.bodyB.getLocalPoint(anchor);
		this.localAxisA = this.bodyA.getLocalVector(axis);
		this.referenceAngle = this.bodyB.getAngle() - this.bodyA.getAngle();
	}
	,__class__: box2D.dynamics.joints.B2PrismaticJointDef
});
box2D.dynamics.joints.B2PulleyJoint = $hxClasses["box2D.dynamics.joints.B2PulleyJoint"] = function(def) {
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.m_groundAnchor1 = new box2D.common.math.B2Vec2();
	this.m_groundAnchor2 = new box2D.common.math.B2Vec2();
	this.m_localAnchor1 = new box2D.common.math.B2Vec2();
	this.m_localAnchor2 = new box2D.common.math.B2Vec2();
	this.m_u1 = new box2D.common.math.B2Vec2();
	this.m_u2 = new box2D.common.math.B2Vec2();
	var tMat;
	var tX;
	var tY;
	this.m_ground = this.m_bodyA.m_world.m_groundBody;
	this.m_groundAnchor1.x = def.groundAnchorA.x - this.m_ground.m_xf.position.x;
	this.m_groundAnchor1.y = def.groundAnchorA.y - this.m_ground.m_xf.position.y;
	this.m_groundAnchor2.x = def.groundAnchorB.x - this.m_ground.m_xf.position.x;
	this.m_groundAnchor2.y = def.groundAnchorB.y - this.m_ground.m_xf.position.y;
	this.m_localAnchor1.setV(def.localAnchorA);
	this.m_localAnchor2.setV(def.localAnchorB);
	this.m_ratio = def.ratio;
	this.m_constant = def.lengthA + this.m_ratio * def.lengthB;
	this.m_maxLength1 = box2D.common.math.B2Math.min(def.maxLengthA,this.m_constant - this.m_ratio * box2D.dynamics.joints.B2PulleyJoint.b2_minPulleyLength);
	this.m_maxLength2 = box2D.common.math.B2Math.min(def.maxLengthB,(this.m_constant - box2D.dynamics.joints.B2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
	this.m_impulse = 0.0;
	this.m_limitImpulse1 = 0.0;
	this.m_limitImpulse2 = 0.0;
};
box2D.dynamics.joints.B2PulleyJoint.__name__ = ["box2D","dynamics","joints","B2PulleyJoint"];
box2D.dynamics.joints.B2PulleyJoint.__super__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2PulleyJoint.prototype = $extend(box2D.dynamics.joints.B2Joint.prototype,{
	m_limitState2: null
	,m_limitState1: null
	,m_state: null
	,m_limitImpulse2: null
	,m_limitImpulse1: null
	,m_impulse: null
	,m_limitMass2: null
	,m_limitMass1: null
	,m_pulleyMass: null
	,m_maxLength2: null
	,m_maxLength1: null
	,m_ratio: null
	,m_constant: null
	,m_u2: null
	,m_u1: null
	,m_localAnchor2: null
	,m_localAnchor1: null
	,m_groundAnchor2: null
	,m_groundAnchor1: null
	,m_ground: null
	,solvePositionConstraints: function(baumgarte) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
		var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
		var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
		var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
		var r1X;
		var r1Y;
		var r2X;
		var r2Y;
		var p1X;
		var p1Y;
		var p2X;
		var p2Y;
		var length1;
		var length2;
		var C;
		var impulse;
		var oldImpulse;
		var oldLimitPositionImpulse;
		var tX;
		var linearError = 0.0;
		if(this.m_state == box2D.dynamics.joints.B2Joint.e_atUpperLimit) {
			tMat = bA.m_xf.R;
			r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
			r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
			tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
			r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
			r1X = tX;
			tMat = bB.m_xf.R;
			r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
			r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
			tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
			r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
			r2X = tX;
			p1X = bA.m_sweep.c.x + r1X;
			p1Y = bA.m_sweep.c.y + r1Y;
			p2X = bB.m_sweep.c.x + r2X;
			p2Y = bB.m_sweep.c.y + r2Y;
			this.m_u1.set(p1X - s1X,p1Y - s1Y);
			this.m_u2.set(p2X - s2X,p2Y - s2Y);
			length1 = this.m_u1.length();
			length2 = this.m_u2.length();
			if(length1 > box2D.common.B2Settings.b2_linearSlop) this.m_u1.multiply(1.0 / length1); else this.m_u1.setZero();
			if(length2 > box2D.common.B2Settings.b2_linearSlop) this.m_u2.multiply(1.0 / length2); else this.m_u2.setZero();
			C = this.m_constant - length1 - this.m_ratio * length2;
			linearError = box2D.common.math.B2Math.max(linearError,-C);
			C = box2D.common.math.B2Math.clamp(C + box2D.common.B2Settings.b2_linearSlop,-box2D.common.B2Settings.b2_maxLinearCorrection,0.0);
			impulse = -this.m_pulleyMass * C;
			p1X = -impulse * this.m_u1.x;
			p1Y = -impulse * this.m_u1.y;
			p2X = -this.m_ratio * impulse * this.m_u2.x;
			p2Y = -this.m_ratio * impulse * this.m_u2.y;
			bA.m_sweep.c.x += bA.m_invMass * p1X;
			bA.m_sweep.c.y += bA.m_invMass * p1Y;
			bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
			bB.m_sweep.c.x += bB.m_invMass * p2X;
			bB.m_sweep.c.y += bB.m_invMass * p2Y;
			bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
			bA.synchronizeTransform();
			bB.synchronizeTransform();
		}
		if(this.m_limitState1 == box2D.dynamics.joints.B2Joint.e_atUpperLimit) {
			tMat = bA.m_xf.R;
			r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
			r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
			tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
			r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
			r1X = tX;
			p1X = bA.m_sweep.c.x + r1X;
			p1Y = bA.m_sweep.c.y + r1Y;
			this.m_u1.set(p1X - s1X,p1Y - s1Y);
			length1 = this.m_u1.length();
			if(length1 > box2D.common.B2Settings.b2_linearSlop) {
				this.m_u1.x *= 1.0 / length1;
				this.m_u1.y *= 1.0 / length1;
			} else this.m_u1.setZero();
			C = this.m_maxLength1 - length1;
			linearError = box2D.common.math.B2Math.max(linearError,-C);
			C = box2D.common.math.B2Math.clamp(C + box2D.common.B2Settings.b2_linearSlop,-box2D.common.B2Settings.b2_maxLinearCorrection,0.0);
			impulse = -this.m_limitMass1 * C;
			p1X = -impulse * this.m_u1.x;
			p1Y = -impulse * this.m_u1.y;
			bA.m_sweep.c.x += bA.m_invMass * p1X;
			bA.m_sweep.c.y += bA.m_invMass * p1Y;
			bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
			bA.synchronizeTransform();
		}
		if(this.m_limitState2 == box2D.dynamics.joints.B2Joint.e_atUpperLimit) {
			tMat = bB.m_xf.R;
			r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
			r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
			tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
			r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
			r2X = tX;
			p2X = bB.m_sweep.c.x + r2X;
			p2Y = bB.m_sweep.c.y + r2Y;
			this.m_u2.set(p2X - s2X,p2Y - s2Y);
			length2 = this.m_u2.length();
			if(length2 > box2D.common.B2Settings.b2_linearSlop) {
				this.m_u2.x *= 1.0 / length2;
				this.m_u2.y *= 1.0 / length2;
			} else this.m_u2.setZero();
			C = this.m_maxLength2 - length2;
			linearError = box2D.common.math.B2Math.max(linearError,-C);
			C = box2D.common.math.B2Math.clamp(C + box2D.common.B2Settings.b2_linearSlop,-box2D.common.B2Settings.b2_maxLinearCorrection,0.0);
			impulse = -this.m_limitMass2 * C;
			p2X = -impulse * this.m_u2.x;
			p2Y = -impulse * this.m_u2.y;
			bB.m_sweep.c.x += bB.m_invMass * p2X;
			bB.m_sweep.c.y += bB.m_invMass * p2Y;
			bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
			bB.synchronizeTransform();
		}
		return linearError < box2D.common.B2Settings.b2_linearSlop;
	}
	,solveVelocityConstraints: function(step) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
		var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var v1X;
		var v1Y;
		var v2X;
		var v2Y;
		var P1X;
		var P1Y;
		var P2X;
		var P2Y;
		var Cdot;
		var impulse;
		var oldImpulse;
		if(this.m_state == box2D.dynamics.joints.B2Joint.e_atUpperLimit) {
			v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
			v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
			v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
			v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
			Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y) - this.m_ratio * (this.m_u2.x * v2X + this.m_u2.y * v2Y);
			impulse = this.m_pulleyMass * -Cdot;
			oldImpulse = this.m_impulse;
			this.m_impulse = box2D.common.math.B2Math.max(0.0,this.m_impulse + impulse);
			impulse = this.m_impulse - oldImpulse;
			P1X = -impulse * this.m_u1.x;
			P1Y = -impulse * this.m_u1.y;
			P2X = -this.m_ratio * impulse * this.m_u2.x;
			P2Y = -this.m_ratio * impulse * this.m_u2.y;
			bA.m_linearVelocity.x += bA.m_invMass * P1X;
			bA.m_linearVelocity.y += bA.m_invMass * P1Y;
			bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
			bB.m_linearVelocity.x += bB.m_invMass * P2X;
			bB.m_linearVelocity.y += bB.m_invMass * P2Y;
			bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
		}
		if(this.m_limitState1 == box2D.dynamics.joints.B2Joint.e_atUpperLimit) {
			v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
			v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
			Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y);
			impulse = -this.m_limitMass1 * Cdot;
			oldImpulse = this.m_limitImpulse1;
			this.m_limitImpulse1 = box2D.common.math.B2Math.max(0.0,this.m_limitImpulse1 + impulse);
			impulse = this.m_limitImpulse1 - oldImpulse;
			P1X = -impulse * this.m_u1.x;
			P1Y = -impulse * this.m_u1.y;
			bA.m_linearVelocity.x += bA.m_invMass * P1X;
			bA.m_linearVelocity.y += bA.m_invMass * P1Y;
			bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
		}
		if(this.m_limitState2 == box2D.dynamics.joints.B2Joint.e_atUpperLimit) {
			v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
			v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
			Cdot = -(this.m_u2.x * v2X + this.m_u2.y * v2Y);
			impulse = -this.m_limitMass2 * Cdot;
			oldImpulse = this.m_limitImpulse2;
			this.m_limitImpulse2 = box2D.common.math.B2Math.max(0.0,this.m_limitImpulse2 + impulse);
			impulse = this.m_limitImpulse2 - oldImpulse;
			P2X = -impulse * this.m_u2.x;
			P2Y = -impulse * this.m_u2.y;
			bB.m_linearVelocity.x += bB.m_invMass * P2X;
			bB.m_linearVelocity.y += bB.m_invMass * P2Y;
			bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
		}
	}
	,initVelocityConstraints: function(step) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
		var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var p1X = bA.m_sweep.c.x + r1X;
		var p1Y = bA.m_sweep.c.y + r1Y;
		var p2X = bB.m_sweep.c.x + r2X;
		var p2Y = bB.m_sweep.c.y + r2Y;
		var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
		var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
		var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
		var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
		this.m_u1.set(p1X - s1X,p1Y - s1Y);
		this.m_u2.set(p2X - s2X,p2Y - s2Y);
		var length1 = this.m_u1.length();
		var length2 = this.m_u2.length();
		if(length1 > box2D.common.B2Settings.b2_linearSlop) this.m_u1.multiply(1.0 / length1); else this.m_u1.setZero();
		if(length2 > box2D.common.B2Settings.b2_linearSlop) this.m_u2.multiply(1.0 / length2); else this.m_u2.setZero();
		var C = this.m_constant - length1 - this.m_ratio * length2;
		if(C > 0.0) {
			this.m_state = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
			this.m_impulse = 0.0;
		} else this.m_state = box2D.dynamics.joints.B2Joint.e_atUpperLimit;
		if(length1 < this.m_maxLength1) {
			this.m_limitState1 = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
			this.m_limitImpulse1 = 0.0;
		} else this.m_limitState1 = box2D.dynamics.joints.B2Joint.e_atUpperLimit;
		if(length2 < this.m_maxLength2) {
			this.m_limitState2 = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
			this.m_limitImpulse2 = 0.0;
		} else this.m_limitState2 = box2D.dynamics.joints.B2Joint.e_atUpperLimit;
		var cr1u1 = r1X * this.m_u1.y - r1Y * this.m_u1.x;
		var cr2u2 = r2X * this.m_u2.y - r2Y * this.m_u2.x;
		this.m_limitMass1 = bA.m_invMass + bA.m_invI * cr1u1 * cr1u1;
		this.m_limitMass2 = bB.m_invMass + bB.m_invI * cr2u2 * cr2u2;
		this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
		this.m_limitMass1 = 1.0 / this.m_limitMass1;
		this.m_limitMass2 = 1.0 / this.m_limitMass2;
		this.m_pulleyMass = 1.0 / this.m_pulleyMass;
		if(step.warmStarting) {
			this.m_impulse *= step.dtRatio;
			this.m_limitImpulse1 *= step.dtRatio;
			this.m_limitImpulse2 *= step.dtRatio;
			var P1X = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x;
			var P1Y = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y;
			var P2X = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x;
			var P2Y = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y;
			bA.m_linearVelocity.x += bA.m_invMass * P1X;
			bA.m_linearVelocity.y += bA.m_invMass * P1Y;
			bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
			bB.m_linearVelocity.x += bB.m_invMass * P2X;
			bB.m_linearVelocity.y += bB.m_invMass * P2Y;
			bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
		} else {
			this.m_impulse = 0.0;
			this.m_limitImpulse1 = 0.0;
			this.m_limitImpulse2 = 0.0;
		}
	}
	,getRatio: function() {
		return this.m_ratio;
	}
	,getLength2: function() {
		var p = this.m_bodyB.getWorldPoint(this.m_localAnchor2);
		var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
		var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
		var dX = p.x - sX;
		var dY = p.y - sY;
		return Math.sqrt(dX * dX + dY * dY);
	}
	,getLength1: function() {
		var p = this.m_bodyA.getWorldPoint(this.m_localAnchor1);
		var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
		var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
		var dX = p.x - sX;
		var dY = p.y - sY;
		return Math.sqrt(dX * dX + dY * dY);
	}
	,getGroundAnchorB: function() {
		var a = this.m_ground.m_xf.position.copy();
		a.add(this.m_groundAnchor2);
		return a;
	}
	,getGroundAnchorA: function() {
		var a = this.m_ground.m_xf.position.copy();
		a.add(this.m_groundAnchor1);
		return a;
	}
	,getReactionTorque: function(inv_dt) {
		return 0.0;
	}
	,getReactionForce: function(inv_dt) {
		return new box2D.common.math.B2Vec2(inv_dt * this.m_impulse * this.m_u2.x,inv_dt * this.m_impulse * this.m_u2.y);
	}
	,getAnchorB: function() {
		return this.m_bodyB.getWorldPoint(this.m_localAnchor2);
	}
	,getAnchorA: function() {
		return this.m_bodyA.getWorldPoint(this.m_localAnchor1);
	}
	,__class__: box2D.dynamics.joints.B2PulleyJoint
});
box2D.dynamics.joints.B2PulleyJointDef = $hxClasses["box2D.dynamics.joints.B2PulleyJointDef"] = function() {
	box2D.dynamics.joints.B2JointDef.call(this);
	this.groundAnchorA = new box2D.common.math.B2Vec2();
	this.groundAnchorB = new box2D.common.math.B2Vec2();
	this.localAnchorA = new box2D.common.math.B2Vec2();
	this.localAnchorB = new box2D.common.math.B2Vec2();
	this.type = box2D.dynamics.joints.B2Joint.e_pulleyJoint;
	this.groundAnchorA.set(-1.0,1.0);
	this.groundAnchorB.set(1.0,1.0);
	this.localAnchorA.set(-1.0,0.0);
	this.localAnchorB.set(1.0,0.0);
	this.lengthA = 0.0;
	this.maxLengthA = 0.0;
	this.lengthB = 0.0;
	this.maxLengthB = 0.0;
	this.ratio = 1.0;
	this.collideConnected = true;
};
box2D.dynamics.joints.B2PulleyJointDef.__name__ = ["box2D","dynamics","joints","B2PulleyJointDef"];
box2D.dynamics.joints.B2PulleyJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
box2D.dynamics.joints.B2PulleyJointDef.prototype = $extend(box2D.dynamics.joints.B2JointDef.prototype,{
	ratio: null
	,maxLengthB: null
	,lengthB: null
	,maxLengthA: null
	,lengthA: null
	,localAnchorB: null
	,localAnchorA: null
	,groundAnchorB: null
	,groundAnchorA: null
	,initialize: function(bA,bB,gaA,gaB,anchorA,anchorB,r) {
		this.bodyA = bA;
		this.bodyB = bB;
		this.groundAnchorA.setV(gaA);
		this.groundAnchorB.setV(gaB);
		this.localAnchorA = this.bodyA.getLocalPoint(anchorA);
		this.localAnchorB = this.bodyB.getLocalPoint(anchorB);
		var d1X = anchorA.x - gaA.x;
		var d1Y = anchorA.y - gaA.y;
		this.lengthA = Math.sqrt(d1X * d1X + d1Y * d1Y);
		var d2X = anchorB.x - gaB.x;
		var d2Y = anchorB.y - gaB.y;
		this.lengthB = Math.sqrt(d2X * d2X + d2Y * d2Y);
		this.ratio = r;
		var C = this.lengthA + this.ratio * this.lengthB;
		this.maxLengthA = C - this.ratio * box2D.dynamics.joints.B2PulleyJoint.b2_minPulleyLength;
		this.maxLengthB = (C - box2D.dynamics.joints.B2PulleyJoint.b2_minPulleyLength) / this.ratio;
	}
	,__class__: box2D.dynamics.joints.B2PulleyJointDef
});
box2D.dynamics.joints.B2RevoluteJoint = $hxClasses["box2D.dynamics.joints.B2RevoluteJoint"] = function(def) {
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.K = new box2D.common.math.B2Mat22();
	this.K1 = new box2D.common.math.B2Mat22();
	this.K2 = new box2D.common.math.B2Mat22();
	this.K3 = new box2D.common.math.B2Mat22();
	this.impulse3 = new box2D.common.math.B2Vec3();
	this.impulse2 = new box2D.common.math.B2Vec2();
	this.reduced = new box2D.common.math.B2Vec2();
	this.m_localAnchor1 = new box2D.common.math.B2Vec2();
	this.m_localAnchor2 = new box2D.common.math.B2Vec2();
	this.m_impulse = new box2D.common.math.B2Vec3();
	this.m_mass = new box2D.common.math.B2Mat33();
	this.m_localAnchor1.setV(def.localAnchorA);
	this.m_localAnchor2.setV(def.localAnchorB);
	this.m_referenceAngle = def.referenceAngle;
	this.m_impulse.setZero();
	this.m_motorImpulse = 0.0;
	this.m_lowerAngle = def.lowerAngle;
	this.m_upperAngle = def.upperAngle;
	this.m_maxMotorTorque = def.maxMotorTorque;
	this.m_motorSpeed = def.motorSpeed;
	this.m_enableLimit = def.enableLimit;
	this.m_enableMotor = def.enableMotor;
	this.m_limitState = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
};
box2D.dynamics.joints.B2RevoluteJoint.__name__ = ["box2D","dynamics","joints","B2RevoluteJoint"];
box2D.dynamics.joints.B2RevoluteJoint.__super__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2RevoluteJoint.prototype = $extend(box2D.dynamics.joints.B2Joint.prototype,{
	m_limitState: null
	,m_upperAngle: null
	,m_lowerAngle: null
	,m_referenceAngle: null
	,m_enableLimit: null
	,m_motorSpeed: null
	,m_maxMotorTorque: null
	,m_enableMotor: null
	,m_motorMass: null
	,m_mass: null
	,m_motorImpulse: null
	,m_impulse: null
	,m_localAnchor2: null
	,m_localAnchor1: null
	,solvePositionConstraints: function(baumgarte) {
		var oldLimitImpulse;
		var C;
		var tMat;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var angularError = 0.0;
		var positionError = 0.0;
		var tX;
		var impulseX;
		var impulseY;
		if(this.m_enableLimit && this.m_limitState != box2D.dynamics.joints.B2Joint.e_inactiveLimit) {
			var angle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
			var limitImpulse = 0.0;
			if(this.m_limitState == box2D.dynamics.joints.B2Joint.e_equalLimits) {
				C = box2D.common.math.B2Math.clamp(angle - this.m_lowerAngle,-box2D.common.B2Settings.b2_maxAngularCorrection,box2D.common.B2Settings.b2_maxAngularCorrection);
				limitImpulse = -this.m_motorMass * C;
				angularError = box2D.common.math.B2Math.abs(C);
			} else if(this.m_limitState == box2D.dynamics.joints.B2Joint.e_atLowerLimit) {
				C = angle - this.m_lowerAngle;
				angularError = -C;
				C = box2D.common.math.B2Math.clamp(C + box2D.common.B2Settings.b2_angularSlop,-box2D.common.B2Settings.b2_maxAngularCorrection,0.0);
				limitImpulse = -this.m_motorMass * C;
			} else if(this.m_limitState == box2D.dynamics.joints.B2Joint.e_atUpperLimit) {
				C = angle - this.m_upperAngle;
				angularError = C;
				C = box2D.common.math.B2Math.clamp(C - box2D.common.B2Settings.b2_angularSlop,0.0,box2D.common.B2Settings.b2_maxAngularCorrection);
				limitImpulse = -this.m_motorMass * C;
			}
			bA.m_sweep.a -= bA.m_invI * limitImpulse;
			bB.m_sweep.a += bB.m_invI * limitImpulse;
			bA.synchronizeTransform();
			bB.synchronizeTransform();
		}
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
		tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
		var CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
		var CLengthSquared = CX * CX + CY * CY;
		var CLength = Math.sqrt(CLengthSquared);
		positionError = CLength;
		var invMass1 = bA.m_invMass;
		var invMass2 = bB.m_invMass;
		var invI1 = bA.m_invI;
		var invI2 = bB.m_invI;
		var k_allowedStretch = 10.0 * box2D.common.B2Settings.b2_linearSlop;
		if(CLengthSquared > k_allowedStretch * k_allowedStretch) {
			var uX = CX / CLength;
			var uY = CY / CLength;
			var k = invMass1 + invMass2;
			var m = 1.0 / k;
			impulseX = m * -CX;
			impulseY = m * -CY;
			var k_beta = 0.5;
			bA.m_sweep.c.x -= k_beta * invMass1 * impulseX;
			bA.m_sweep.c.y -= k_beta * invMass1 * impulseY;
			bB.m_sweep.c.x += k_beta * invMass2 * impulseX;
			bB.m_sweep.c.y += k_beta * invMass2 * impulseY;
			CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
			CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
		}
		this.K1.col1.x = invMass1 + invMass2;
		this.K1.col2.x = 0.0;
		this.K1.col1.y = 0.0;
		this.K1.col2.y = invMass1 + invMass2;
		this.K2.col1.x = invI1 * r1Y * r1Y;
		this.K2.col2.x = -invI1 * r1X * r1Y;
		this.K2.col1.y = -invI1 * r1X * r1Y;
		this.K2.col2.y = invI1 * r1X * r1X;
		this.K3.col1.x = invI2 * r2Y * r2Y;
		this.K3.col2.x = -invI2 * r2X * r2Y;
		this.K3.col1.y = -invI2 * r2X * r2Y;
		this.K3.col2.y = invI2 * r2X * r2X;
		this.K.setM(this.K1);
		this.K.addM(this.K2);
		this.K.addM(this.K3);
		this.K.solve(box2D.dynamics.joints.B2RevoluteJoint.tImpulse,-CX,-CY);
		impulseX = box2D.dynamics.joints.B2RevoluteJoint.tImpulse.x;
		impulseY = box2D.dynamics.joints.B2RevoluteJoint.tImpulse.y;
		bA.m_sweep.c.x -= bA.m_invMass * impulseX;
		bA.m_sweep.c.y -= bA.m_invMass * impulseY;
		bA.m_sweep.a -= bA.m_invI * (r1X * impulseY - r1Y * impulseX);
		bB.m_sweep.c.x += bB.m_invMass * impulseX;
		bB.m_sweep.c.y += bB.m_invMass * impulseY;
		bB.m_sweep.a += bB.m_invI * (r2X * impulseY - r2Y * impulseX);
		bA.synchronizeTransform();
		bB.synchronizeTransform();
		return positionError <= box2D.common.B2Settings.b2_linearSlop && angularError <= box2D.common.B2Settings.b2_angularSlop;
	}
	,solveVelocityConstraints: function(step) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		var tX;
		var newImpulse;
		var r1X;
		var r1Y;
		var r2X;
		var r2Y;
		var v1 = bA.m_linearVelocity;
		var w1 = bA.m_angularVelocity;
		var v2 = bB.m_linearVelocity;
		var w2 = bB.m_angularVelocity;
		var m1 = bA.m_invMass;
		var m2 = bB.m_invMass;
		var i1 = bA.m_invI;
		var i2 = bB.m_invI;
		if(this.m_enableMotor && this.m_limitState != box2D.dynamics.joints.B2Joint.e_equalLimits) {
			var Cdot = w2 - w1 - this.m_motorSpeed;
			var impulse = this.m_motorMass * -Cdot;
			var oldImpulse = this.m_motorImpulse;
			var maxImpulse = step.dt * this.m_maxMotorTorque;
			this.m_motorImpulse = box2D.common.math.B2Math.clamp(this.m_motorImpulse + impulse,-maxImpulse,maxImpulse);
			impulse = this.m_motorImpulse - oldImpulse;
			w1 -= i1 * impulse;
			w2 += i2 * impulse;
		}
		if(this.m_enableLimit && this.m_limitState != box2D.dynamics.joints.B2Joint.e_inactiveLimit) {
			tMat = bA.m_xf.R;
			r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
			r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
			tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
			r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
			r1X = tX;
			tMat = bB.m_xf.R;
			r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
			r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
			tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
			r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
			r2X = tX;
			var Cdot1X = v2.x + -w2 * r2Y - v1.x - -w1 * r1Y;
			var Cdot1Y = v2.y + w2 * r2X - v1.y - w1 * r1X;
			var Cdot2 = w2 - w1;
			this.m_mass.solve33(this.impulse3,-Cdot1X,-Cdot1Y,-Cdot2);
			if(this.m_limitState == box2D.dynamics.joints.B2Joint.e_equalLimits) this.m_impulse.add(this.impulse3); else if(this.m_limitState == box2D.dynamics.joints.B2Joint.e_atLowerLimit) {
				newImpulse = this.m_impulse.z + this.impulse3.z;
				if(newImpulse < 0.0) {
					this.m_mass.solve22(this.reduced,-Cdot1X,-Cdot1Y);
					this.impulse3.x = this.reduced.x;
					this.impulse3.y = this.reduced.y;
					this.impulse3.z = -this.m_impulse.z;
					this.m_impulse.x += this.reduced.x;
					this.m_impulse.y += this.reduced.y;
					this.m_impulse.z = 0.0;
				}
			} else if(this.m_limitState == box2D.dynamics.joints.B2Joint.e_atUpperLimit) {
				newImpulse = this.m_impulse.z + this.impulse3.z;
				if(newImpulse > 0.0) {
					this.m_mass.solve22(this.reduced,-Cdot1X,-Cdot1Y);
					this.impulse3.x = this.reduced.x;
					this.impulse3.y = this.reduced.y;
					this.impulse3.z = -this.m_impulse.z;
					this.m_impulse.x += this.reduced.x;
					this.m_impulse.y += this.reduced.y;
					this.m_impulse.z = 0.0;
				}
			}
			v1.x -= m1 * this.impulse3.x;
			v1.y -= m1 * this.impulse3.y;
			w1 -= i1 * (r1X * this.impulse3.y - r1Y * this.impulse3.x + this.impulse3.z);
			v2.x += m2 * this.impulse3.x;
			v2.y += m2 * this.impulse3.y;
			w2 += i2 * (r2X * this.impulse3.y - r2Y * this.impulse3.x + this.impulse3.z);
		} else {
			tMat = bA.m_xf.R;
			r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
			r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
			tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
			r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
			r1X = tX;
			tMat = bB.m_xf.R;
			r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
			r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
			tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
			r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
			r2X = tX;
			var CdotX = v2.x + -w2 * r2Y - v1.x - -w1 * r1Y;
			var CdotY = v2.y + w2 * r2X - v1.y - w1 * r1X;
			this.m_mass.solve22(this.impulse2,-CdotX,-CdotY);
			this.m_impulse.x += this.impulse2.x;
			this.m_impulse.y += this.impulse2.y;
			v1.x -= m1 * this.impulse2.x;
			v1.y -= m1 * this.impulse2.y;
			w1 -= i1 * (r1X * this.impulse2.y - r1Y * this.impulse2.x);
			v2.x += m2 * this.impulse2.x;
			v2.y += m2 * this.impulse2.y;
			w2 += i2 * (r2X * this.impulse2.y - r2Y * this.impulse2.x);
		}
		bA.m_linearVelocity.setV(v1);
		bA.m_angularVelocity = w1;
		bB.m_linearVelocity.setV(v2);
		bB.m_angularVelocity = w2;
	}
	,reduced: null
	,impulse2: null
	,impulse3: null
	,initVelocityConstraints: function(step) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		var tX;
		if(this.m_enableMotor || this.m_enableLimit) {
		}
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
		tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var m1 = bA.m_invMass;
		var m2 = bB.m_invMass;
		var i1 = bA.m_invI;
		var i2 = bB.m_invI;
		this.m_mass.col1.x = m1 + m2 + r1Y * r1Y * i1 + r2Y * r2Y * i2;
		this.m_mass.col2.x = -r1Y * r1X * i1 - r2Y * r2X * i2;
		this.m_mass.col3.x = -r1Y * i1 - r2Y * i2;
		this.m_mass.col1.y = this.m_mass.col2.x;
		this.m_mass.col2.y = m1 + m2 + r1X * r1X * i1 + r2X * r2X * i2;
		this.m_mass.col3.y = r1X * i1 + r2X * i2;
		this.m_mass.col1.z = this.m_mass.col3.x;
		this.m_mass.col2.z = this.m_mass.col3.y;
		this.m_mass.col3.z = i1 + i2;
		this.m_motorMass = 1.0 / (i1 + i2);
		if(this.m_enableMotor == false) this.m_motorImpulse = 0.0;
		if(this.m_enableLimit) {
			var jointAngle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
			if(box2D.common.math.B2Math.abs(this.m_upperAngle - this.m_lowerAngle) < 2.0 * box2D.common.B2Settings.b2_angularSlop) this.m_limitState = box2D.dynamics.joints.B2Joint.e_equalLimits; else if(jointAngle <= this.m_lowerAngle) {
				if(this.m_limitState != box2D.dynamics.joints.B2Joint.e_atLowerLimit) this.m_impulse.z = 0.0;
				this.m_limitState = box2D.dynamics.joints.B2Joint.e_atLowerLimit;
			} else if(jointAngle >= this.m_upperAngle) {
				if(this.m_limitState != box2D.dynamics.joints.B2Joint.e_atUpperLimit) this.m_impulse.z = 0.0;
				this.m_limitState = box2D.dynamics.joints.B2Joint.e_atUpperLimit;
			} else {
				this.m_limitState = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
				this.m_impulse.z = 0.0;
			}
		} else this.m_limitState = box2D.dynamics.joints.B2Joint.e_inactiveLimit;
		if(step.warmStarting) {
			this.m_impulse.x *= step.dtRatio;
			this.m_impulse.y *= step.dtRatio;
			this.m_motorImpulse *= step.dtRatio;
			var PX = this.m_impulse.x;
			var PY = this.m_impulse.y;
			bA.m_linearVelocity.x -= m1 * PX;
			bA.m_linearVelocity.y -= m1 * PY;
			bA.m_angularVelocity -= i1 * (r1X * PY - r1Y * PX + this.m_motorImpulse + this.m_impulse.z);
			bB.m_linearVelocity.x += m2 * PX;
			bB.m_linearVelocity.y += m2 * PY;
			bB.m_angularVelocity += i2 * (r2X * PY - r2Y * PX + this.m_motorImpulse + this.m_impulse.z);
		} else {
			this.m_impulse.setZero();
			this.m_motorImpulse = 0.0;
		}
	}
	,K3: null
	,K2: null
	,K1: null
	,K: null
	,getMotorTorque: function() {
		return this.m_maxMotorTorque;
	}
	,setMaxMotorTorque: function(torque) {
		this.m_maxMotorTorque = torque;
	}
	,getMotorSpeed: function() {
		return this.m_motorSpeed;
	}
	,setMotorSpeed: function(speed) {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		this.m_motorSpeed = speed;
	}
	,enableMotor: function(flag) {
		this.m_enableMotor = flag;
	}
	,isMotorEnabled: function() {
		this.m_bodyA.setAwake(true);
		this.m_bodyB.setAwake(true);
		return this.m_enableMotor;
	}
	,setLimits: function(lower,upper) {
		this.m_lowerAngle = lower;
		this.m_upperAngle = upper;
	}
	,getUpperLimit: function() {
		return this.m_upperAngle;
	}
	,getLowerLimit: function() {
		return this.m_lowerAngle;
	}
	,enableLimit: function(flag) {
		this.m_enableLimit = flag;
	}
	,isLimitEnabled: function() {
		return this.m_enableLimit;
	}
	,getJointSpeed: function() {
		return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity;
	}
	,getJointAngle: function() {
		return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle;
	}
	,getReactionTorque: function(inv_dt) {
		return inv_dt * this.m_impulse.z;
	}
	,getReactionForce: function(inv_dt) {
		return new box2D.common.math.B2Vec2(inv_dt * this.m_impulse.x,inv_dt * this.m_impulse.y);
	}
	,getAnchorB: function() {
		return this.m_bodyB.getWorldPoint(this.m_localAnchor2);
	}
	,getAnchorA: function() {
		return this.m_bodyA.getWorldPoint(this.m_localAnchor1);
	}
	,__class__: box2D.dynamics.joints.B2RevoluteJoint
});
box2D.dynamics.joints.B2RevoluteJointDef = $hxClasses["box2D.dynamics.joints.B2RevoluteJointDef"] = function() {
	box2D.dynamics.joints.B2JointDef.call(this);
	this.localAnchorA = new box2D.common.math.B2Vec2();
	this.localAnchorB = new box2D.common.math.B2Vec2();
	this.type = box2D.dynamics.joints.B2Joint.e_revoluteJoint;
	this.localAnchorA.set(0.0,0.0);
	this.localAnchorB.set(0.0,0.0);
	this.referenceAngle = 0.0;
	this.lowerAngle = 0.0;
	this.upperAngle = 0.0;
	this.maxMotorTorque = 0.0;
	this.motorSpeed = 0.0;
	this.enableLimit = false;
	this.enableMotor = false;
};
box2D.dynamics.joints.B2RevoluteJointDef.__name__ = ["box2D","dynamics","joints","B2RevoluteJointDef"];
box2D.dynamics.joints.B2RevoluteJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
box2D.dynamics.joints.B2RevoluteJointDef.prototype = $extend(box2D.dynamics.joints.B2JointDef.prototype,{
	maxMotorTorque: null
	,motorSpeed: null
	,enableMotor: null
	,upperAngle: null
	,lowerAngle: null
	,enableLimit: null
	,referenceAngle: null
	,localAnchorB: null
	,localAnchorA: null
	,initialize: function(bA,bB,anchor) {
		this.bodyA = bA;
		this.bodyB = bB;
		this.localAnchorA = this.bodyA.getLocalPoint(anchor);
		this.localAnchorB = this.bodyB.getLocalPoint(anchor);
		this.referenceAngle = this.bodyB.getAngle() - this.bodyA.getAngle();
	}
	,__class__: box2D.dynamics.joints.B2RevoluteJointDef
});
box2D.dynamics.joints.B2WeldJoint = $hxClasses["box2D.dynamics.joints.B2WeldJoint"] = function(def) {
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.m_localAnchorA = new box2D.common.math.B2Vec2();
	this.m_localAnchorB = new box2D.common.math.B2Vec2();
	this.m_impulse = new box2D.common.math.B2Vec3();
	this.m_mass = new box2D.common.math.B2Mat33();
	this.m_localAnchorA.setV(def.localAnchorA);
	this.m_localAnchorB.setV(def.localAnchorB);
	this.m_referenceAngle = def.referenceAngle;
	this.m_impulse.setZero();
	this.m_mass = new box2D.common.math.B2Mat33();
};
box2D.dynamics.joints.B2WeldJoint.__name__ = ["box2D","dynamics","joints","B2WeldJoint"];
box2D.dynamics.joints.B2WeldJoint.__super__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2WeldJoint.prototype = $extend(box2D.dynamics.joints.B2Joint.prototype,{
	m_mass: null
	,m_impulse: null
	,m_referenceAngle: null
	,m_localAnchorB: null
	,m_localAnchorA: null
	,solvePositionConstraints: function(baumgarte) {
		var tMat;
		var tX;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		tMat = bA.m_xf.R;
		var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
		var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
		tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
		rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
		rAX = tX;
		tMat = bB.m_xf.R;
		var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
		var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
		rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
		rBX = tX;
		var mA = bA.m_invMass;
		var mB = bB.m_invMass;
		var iA = bA.m_invI;
		var iB = bB.m_invI;
		var C1X = bB.m_sweep.c.x + rBX - bA.m_sweep.c.x - rAX;
		var C1Y = bB.m_sweep.c.y + rBY - bA.m_sweep.c.y - rAY;
		var C2 = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
		var k_allowedStretch = 10.0 * box2D.common.B2Settings.b2_linearSlop;
		var positionError = Math.sqrt(C1X * C1X + C1Y * C1Y);
		var angularError = box2D.common.math.B2Math.abs(C2);
		if(positionError > k_allowedStretch) {
			iA *= 1.0;
			iB *= 1.0;
		}
		this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
		this.m_mass.col2.x = -rAY * rAX * iA - rBY * rBX * iB;
		this.m_mass.col3.x = -rAY * iA - rBY * iB;
		this.m_mass.col1.y = this.m_mass.col2.x;
		this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
		this.m_mass.col3.y = rAX * iA + rBX * iB;
		this.m_mass.col1.z = this.m_mass.col3.x;
		this.m_mass.col2.z = this.m_mass.col3.y;
		this.m_mass.col3.z = iA + iB;
		var impulse = new box2D.common.math.B2Vec3();
		this.m_mass.solve33(impulse,-C1X,-C1Y,-C2);
		bA.m_sweep.c.x -= mA * impulse.x;
		bA.m_sweep.c.y -= mA * impulse.y;
		bA.m_sweep.a -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
		bB.m_sweep.c.x += mB * impulse.x;
		bB.m_sweep.c.y += mB * impulse.y;
		bB.m_sweep.a += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
		bA.synchronizeTransform();
		bB.synchronizeTransform();
		return positionError <= box2D.common.B2Settings.b2_linearSlop && angularError <= box2D.common.B2Settings.b2_angularSlop;
	}
	,solveVelocityConstraints: function(step) {
		var tMat;
		var tX;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var vA = bA.m_linearVelocity;
		var wA = bA.m_angularVelocity;
		var vB = bB.m_linearVelocity;
		var wB = bB.m_angularVelocity;
		var mA = bA.m_invMass;
		var mB = bB.m_invMass;
		var iA = bA.m_invI;
		var iB = bB.m_invI;
		tMat = bA.m_xf.R;
		var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
		var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
		tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
		rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
		rAX = tX;
		tMat = bB.m_xf.R;
		var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
		var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
		rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
		rBX = tX;
		var Cdot1X = vB.x - wB * rBY - vA.x + wA * rAY;
		var Cdot1Y = vB.y + wB * rBX - vA.y - wA * rAX;
		var Cdot2 = wB - wA;
		var impulse = new box2D.common.math.B2Vec3();
		this.m_mass.solve33(impulse,-Cdot1X,-Cdot1Y,-Cdot2);
		this.m_impulse.add(impulse);
		vA.x -= mA * impulse.x;
		vA.y -= mA * impulse.y;
		wA -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
		vB.x += mB * impulse.x;
		vB.y += mB * impulse.y;
		wB += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
		bA.m_angularVelocity = wA;
		bB.m_angularVelocity = wB;
	}
	,initVelocityConstraints: function(step) {
		var tMat;
		var tX;
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		tMat = bA.m_xf.R;
		var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
		var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
		tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
		rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
		rAX = tX;
		tMat = bB.m_xf.R;
		var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
		var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
		rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
		rBX = tX;
		var mA = bA.m_invMass;
		var mB = bB.m_invMass;
		var iA = bA.m_invI;
		var iB = bB.m_invI;
		this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
		this.m_mass.col2.x = -rAY * rAX * iA - rBY * rBX * iB;
		this.m_mass.col3.x = -rAY * iA - rBY * iB;
		this.m_mass.col1.y = this.m_mass.col2.x;
		this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
		this.m_mass.col3.y = rAX * iA + rBX * iB;
		this.m_mass.col1.z = this.m_mass.col3.x;
		this.m_mass.col2.z = this.m_mass.col3.y;
		this.m_mass.col3.z = iA + iB;
		if(step.warmStarting) {
			this.m_impulse.x *= step.dtRatio;
			this.m_impulse.y *= step.dtRatio;
			this.m_impulse.z *= step.dtRatio;
			bA.m_linearVelocity.x -= mA * this.m_impulse.x;
			bA.m_linearVelocity.y -= mA * this.m_impulse.y;
			bA.m_angularVelocity -= iA * (rAX * this.m_impulse.y - rAY * this.m_impulse.x + this.m_impulse.z);
			bB.m_linearVelocity.x += mB * this.m_impulse.x;
			bB.m_linearVelocity.y += mB * this.m_impulse.y;
			bB.m_angularVelocity += iB * (rBX * this.m_impulse.y - rBY * this.m_impulse.x + this.m_impulse.z);
		} else this.m_impulse.setZero();
	}
	,getReactionTorque: function(inv_dt) {
		return inv_dt * this.m_impulse.z;
	}
	,getReactionForce: function(inv_dt) {
		return new box2D.common.math.B2Vec2(inv_dt * this.m_impulse.x,inv_dt * this.m_impulse.y);
	}
	,getAnchorB: function() {
		return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
	}
	,getAnchorA: function() {
		return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
	}
	,__class__: box2D.dynamics.joints.B2WeldJoint
});
box2D.dynamics.joints.B2WeldJointDef = $hxClasses["box2D.dynamics.joints.B2WeldJointDef"] = function() {
	box2D.dynamics.joints.B2JointDef.call(this);
	this.localAnchorA = new box2D.common.math.B2Vec2();
	this.localAnchorB = new box2D.common.math.B2Vec2();
	this.type = box2D.dynamics.joints.B2Joint.e_weldJoint;
	this.referenceAngle = 0.0;
};
box2D.dynamics.joints.B2WeldJointDef.__name__ = ["box2D","dynamics","joints","B2WeldJointDef"];
box2D.dynamics.joints.B2WeldJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
box2D.dynamics.joints.B2WeldJointDef.prototype = $extend(box2D.dynamics.joints.B2JointDef.prototype,{
	referenceAngle: null
	,localAnchorB: null
	,localAnchorA: null
	,initialize: function(bA,bB,anchor) {
		this.bodyA = bA;
		this.bodyB = bB;
		this.localAnchorA.setV(this.bodyA.getLocalPoint(anchor));
		this.localAnchorB.setV(this.bodyB.getLocalPoint(anchor));
		this.referenceAngle = this.bodyB.getAngle() - this.bodyA.getAngle();
	}
	,__class__: box2D.dynamics.joints.B2WeldJointDef
});
var com = com || {}
if(!com.dango_itimi) com.dango_itimi = {}
if(!com.dango_itimi.box2d) com.dango_itimi.box2d = {}
com.dango_itimi.box2d.FlashToBox2dConverter = $hxClasses["com.dango_itimi.box2d.FlashToBox2dConverter"] = function(chunkMap) {
	this.boxMap = new Hash();
	this.circleMap = new Hash();
	this.polygonMap = new Hash();
	this.parse(chunkMap.getBoxSet(),this.boxMap,this.boxClass);
	this.parse(chunkMap.getCircleSet(),this.circleMap,this.circleClass);
	this.parse(chunkMap.getPolygonSet(),this.polygonMap,this.polygonClass);
};
com.dango_itimi.box2d.FlashToBox2dConverter.__name__ = ["com","dango_itimi","box2d","FlashToBox2dConverter"];
com.dango_itimi.box2d.FlashToBox2dConverter.prototype = {
	getView: function(materialId,viewId,map) {
		return map.get(materialId).get("c").get(viewId);
	}
	,getPolygon: function(materialId,viewId) {
		return this.getView(materialId,viewId,this.polygonMap);
	}
	,getCircle: function(materialId,viewId) {
		return this.getView(materialId,viewId,this.circleMap);
	}
	,getBox: function(materialId,viewId) {
		return this.getView(materialId,viewId,this.boxMap);
	}
	,executeForMap: function(map,world,BOX2D_SCALE) {
		var $it0 = map.iterator();
		while( $it0.hasNext() ) {
			var kindMap = $it0.next();
			var $it1 = kindMap.iterator();
			while( $it1.hasNext() ) {
				var viewMap = $it1.next();
				var $it2 = viewMap.iterator();
				while( $it2.hasNext() ) {
					var view = $it2.next();
					(js.Boot.__cast(view , com.dango_itimi.box2d.view.View)).createBox2D(world,BOX2D_SCALE);
				}
			}
		}
	}
	,execute: function(world,BOX2D_SCALE) {
		this.executeForMap(this.boxMap,world,BOX2D_SCALE);
		this.executeForMap(this.circleMap,world,BOX2D_SCALE);
		this.executeForMap(this.polygonMap,world,BOX2D_SCALE);
	}
	,createViewMapChild: function(chunk,viewClass,materialId,viewMap,userDataSetLength) {
	}
	,createViewMap: function(chunk,viewClass,materialId) {
		var viewMap = new Hash();
		viewMap.set("c",new Hash());
		viewMap.set("instance",new Hash());
		var userDataSetLength = chunk.getUserDataSetLength();
		this.createViewMapChild(chunk,viewClass,materialId,viewMap,userDataSetLength);
		return viewMap;
	}
	,parse: function(chunkSet,map,viewClass) {
		var len = chunkSet.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			map.set(i,this.createViewMap(chunkSet[i],viewClass,i));
		}
	}
	,polygonMap: null
	,circleMap: null
	,boxMap: null
	,polygonClass: null
	,circleClass: null
	,boxClass: null
	,__class__: com.dango_itimi.box2d.FlashToBox2dConverter
}
if(!com.dango_itimi.box2d.fla) com.dango_itimi.box2d.fla = {}
com.dango_itimi.box2d.fla.Chunk = $hxClasses["com.dango_itimi.box2d.fla.Chunk"] = function(chunkSprite,bodyType,bullet,restitution,friction,density,fixedRotation,groupIndex,categoryBits,maskBits,firstVisible) {
	if(firstVisible == null) firstVisible = true;
	if(maskBits == null) maskBits = 65535;
	if(categoryBits == null) categoryBits = 1;
	if(groupIndex == null) groupIndex = 0;
	if(fixedRotation == null) fixedRotation = false;
	if(density == null) density = 1.0;
	if(friction == null) friction = 1.0;
	if(restitution == null) restitution = 0;
	if(bullet == null) bullet = false;
	if(bodyType == null) bodyType = false;
	this.maskBits = maskBits;
	this.categoryBits = categoryBits;
	this.chunkSprite = chunkSprite;
	this.bullet = bullet;
	this.firstVisible = firstVisible;
	this.groupIndex = groupIndex;
	this.fixedRotation = fixedRotation;
	this.density = density;
	this.friction = friction;
	this.restitution = restitution;
	this.bodyType = bodyType;
	this.userDataSet = new Array();
};
com.dango_itimi.box2d.fla.Chunk.__name__ = ["com","dango_itimi","box2d","fla","Chunk"];
com.dango_itimi.box2d.fla.Chunk.prototype = {
	getUserDataSetLength: function() {
		return this.userDataSet.length;
	}
	,getUserData: function(optionalChunkId) {
		return this.userDataSet[optionalChunkId];
	}
	,setUserData: function(optionalChunkId,userData) {
		this.userDataSet[optionalChunkId] = userData;
	}
	,chunkSprite: null
	,userDataSet: null
	,maskBits: null
	,categoryBits: null
	,bullet: null
	,firstVisible: null
	,groupIndex: null
	,fixedRotation: null
	,bodyType: null
	,density: null
	,friction: null
	,restitution: null
	,__class__: com.dango_itimi.box2d.fla.Chunk
}
com.dango_itimi.box2d.fla.ChunkMap = $hxClasses["com.dango_itimi.box2d.fla.ChunkMap"] = function() {
	this.boxSet = new Array();
	this.circleSet = new Array();
	this.polygonSet = new Array();
	this.initializeForBox();
	this.initializeForCircle();
	this.initializeForPolygon();
};
com.dango_itimi.box2d.fla.ChunkMap.__name__ = ["com","dango_itimi","box2d","fla","ChunkMap"];
com.dango_itimi.box2d.fla.ChunkMap.prototype = {
	getPolygonSet: function() {
		return this.polygonSet;
	}
	,getCircleSet: function() {
		return this.circleSet;
	}
	,getBoxSet: function() {
		return this.boxSet;
	}
	,createChunk: function(chunkSet,chunkSetId,chunkSpriteClass,bodyType,bullet,restitution,friction,density,fixedRotation,groupIndex,categoryBits,maskBits,firstVisible) {
		if(firstVisible == null) firstVisible = true;
		if(maskBits == null) maskBits = 65535;
		if(categoryBits == null) categoryBits = 1;
		if(groupIndex == null) groupIndex = 0;
		if(fixedRotation == null) fixedRotation = false;
		if(density == null) density = 1.0;
		if(friction == null) friction = 1.0;
		if(restitution == null) restitution = 0;
		if(bullet == null) bullet = false;
		if(bodyType == null) bodyType = false;
		var chunkSprite = Type.createInstance(chunkSpriteClass,[]);
		var chunk = new com.dango_itimi.box2d.fla.Chunk(chunkSprite,bodyType,bullet,restitution,friction,density,fixedRotation,groupIndex,categoryBits,maskBits,firstVisible);
		chunkSet[chunkSetId] = chunk;
		return chunk;
	}
	,createPolygon: function(chunkSetId,chunkSpriteClass,bodyType,bullet,restitution,friction,density,fixedRotation,groupIndex,categoryBits,maskBits,firstVisible) {
		if(firstVisible == null) firstVisible = true;
		if(maskBits == null) maskBits = 65535;
		if(categoryBits == null) categoryBits = 1;
		if(groupIndex == null) groupIndex = 0;
		if(fixedRotation == null) fixedRotation = false;
		if(density == null) density = 1.0;
		if(friction == null) friction = 1.0;
		if(restitution == null) restitution = 0;
		if(bullet == null) bullet = false;
		if(bodyType == null) bodyType = false;
		return this.createChunk(this.polygonSet,chunkSetId,chunkSpriteClass,bodyType,bullet,restitution,friction,density,fixedRotation,groupIndex,categoryBits,maskBits,firstVisible);
	}
	,createCircle: function(chunkSetId,chunkSpriteClass,bodyType,bullet,restitution,friction,density,fixedRotation,groupIndex,categoryBits,maskBits,firstVisible) {
		if(firstVisible == null) firstVisible = true;
		if(maskBits == null) maskBits = 65535;
		if(categoryBits == null) categoryBits = 1;
		if(groupIndex == null) groupIndex = 0;
		if(fixedRotation == null) fixedRotation = false;
		if(density == null) density = 1.0;
		if(friction == null) friction = 1.0;
		if(restitution == null) restitution = 0;
		if(bullet == null) bullet = false;
		if(bodyType == null) bodyType = false;
		return this.createChunk(this.circleSet,chunkSetId,chunkSpriteClass,bodyType,bullet,restitution,friction,density,fixedRotation,groupIndex,categoryBits,maskBits,firstVisible);
	}
	,createBox: function(chunkSetId,chunkSpriteClass,bodyType,bullet,restitution,friction,density,fixedRotation,groupIndex,categoryBits,maskBits,firstVisible) {
		if(firstVisible == null) firstVisible = true;
		if(maskBits == null) maskBits = 65535;
		if(categoryBits == null) categoryBits = 1;
		if(groupIndex == null) groupIndex = 0;
		if(fixedRotation == null) fixedRotation = false;
		if(density == null) density = 1.0;
		if(friction == null) friction = 1.0;
		if(restitution == null) restitution = 0;
		if(bullet == null) bullet = false;
		if(bodyType == null) bodyType = false;
		return this.createChunk(this.boxSet,chunkSetId,chunkSpriteClass,bodyType,bullet,restitution,friction,density,fixedRotation,groupIndex,categoryBits,maskBits,firstVisible);
	}
	,initializeForPolygon: function() {
	}
	,initializeForCircle: function() {
	}
	,initializeForBox: function() {
	}
	,chunkClass: null
	,polygonSet: null
	,circleSet: null
	,boxSet: null
	,__class__: com.dango_itimi.box2d.fla.ChunkMap
}
if(!com.dango_itimi.box2d.userdata) com.dango_itimi.box2d.userdata = {}
com.dango_itimi.box2d.userdata.UserData = $hxClasses["com.dango_itimi.box2d.userdata.UserData"] = function() {
};
com.dango_itimi.box2d.userdata.UserData.__name__ = ["com","dango_itimi","box2d","userdata","UserData"];
com.dango_itimi.box2d.userdata.UserData.prototype = {
	toString: function() {
		return "key: " + this.key + "\n";
	}
	,cloneChild: function(userData) {
	}
	,clone: function() {
		var userData = new com.dango_itimi.box2d.userdata.UserData();
		this.cloneChild(userData);
		return userData;
	}
	,key: null
	,__class__: com.dango_itimi.box2d.userdata.UserData
}
if(!com.dango_itimi.box2d.view) com.dango_itimi.box2d.view = {}
com.dango_itimi.box2d.view.BaseShape = $hxClasses["com.dango_itimi.box2d.view.BaseShape"] = function() {
};
com.dango_itimi.box2d.view.BaseShape.__name__ = ["com","dango_itimi","box2d","view","BaseShape"];
com.dango_itimi.box2d.view.BaseShape.prototype = {
	getCenterY: function() {
		return this.centerY;
	}
	,getCenterX: function() {
		return this.centerX;
	}
	,centerY: null
	,centerX: null
	,__class__: com.dango_itimi.box2d.view.BaseShape
}
com.dango_itimi.box2d.view.View = $hxClasses["com.dango_itimi.box2d.view.View"] = function() { }
com.dango_itimi.box2d.view.View.__name__ = ["com","dango_itimi","box2d","view","View"];
com.dango_itimi.box2d.view.View.prototype = {
	getFixtureDef: function() {
		return this.fixtureDef;
	}
	,setAngle: function(angle) {
		this.angle = angle;
	}
	,getAngle: function() {
		return this.angle;
	}
	,getKey: function() {
		return this.key;
	}
	,getBody: function() {
		return this.body;
	}
	,applyImpulseForAntiGravity: function(gravityY) {
		this.body.applyForce(new box2D.common.math.B2Vec2(0,this.body.getMass() * -gravityY),this.body.getPosition());
	}
	,setLinearVelocity: function(vec) {
		if(!this.body.isAwake()) this.body.setAwake(true);
		this.body.setLinearVelocity(vec);
	}
	,applyImpulse: function(vec,pos) {
		if(pos == null) pos = this.body.getPosition();
		this.body.applyImpulse(vec,pos);
	}
	,destroyB2Body: function(world) {
		world.destroyBody(this.body);
		this.body = null;
	}
	,createB2Body: function(world) {
		this.body = world.createBody(this.bodyDef);
		this.body.createFixture(this.fixtureDef);
	}
	,createFixtureDef: function() {
		this.fixtureDef = new box2D.dynamics.B2FixtureDef();
		this.fixtureDef.shape = this.shape;
		this.fixtureDef.density = this.density;
		this.fixtureDef.restitution = this.restitution;
		this.fixtureDef.friction = this.friction;
		var filter = new box2D.dynamics.B2FilterData();
		filter.groupIndex = this.groupIndex;
		filter.categoryBits = this.categoryBits;
		filter.maskBits = this.maskBits;
		this.fixtureDef.filter = filter;
	}
	,createShape: function(scale) {
	}
	,createBodyDef: function() {
		this.bodyDef = new box2D.dynamics.B2BodyDef();
		this.bodyDef.position.set(this.bodyDefPosX,this.bodyDefPosY);
		if(this.bodyType) {
			this.bodyDef.type = box2D.dynamics.B2Body.b2_dynamicBody;
			if(this.bullet) this.bodyDef.bullet = true;
		}
		this.bodyDef.angle = this.angle;
		this.bodyDef.fixedRotation = this.fixedRotation;
		this.bodyDef.userData = this.userData;
	}
	,setBodyDefPosition: function(scale) {
		this.bodyDefPosX = this.baseShape.getCenterX() / scale;
		this.bodyDefPosY = this.baseShape.getCenterY() / scale;
	}
	,createBox2D: function(world,scale) {
		this.setBodyDefPosition(scale);
		this.createBodyDef();
		this.createShape(scale);
		this.createFixtureDef();
		if(this.firstVisible) this.createB2Body(world);
	}
	,cloneChild: function(view) {
	}
	,clone: function(clonedId) {
		var viewClass = Type.getClass(this);
		var view = Type.createInstance(viewClass,[]);
		var clonedUserData = this.userData.clone();
		this.cloneChild(view);
		view.initialize(this.materialId,this.mcHeadName,this.id,this.bodyType,this.bullet,this.restitution,this.friction,this.density,this.fixedRotation,clonedUserData,this.groupIndex,this.categoryBits,this.maskBits,this.firstVisible,clonedId);
		return view;
	}
	,toString: function() {
		haxe.Log.trace("key: " + this.key,{ fileName : "View.hx", lineNumber : 91, className : "com.dango_itimi.box2d.view.View", methodName : "toString"});
		haxe.Log.trace("bodyType: " + Std.string(this.bodyType),{ fileName : "View.hx", lineNumber : 92, className : "com.dango_itimi.box2d.view.View", methodName : "toString"});
		haxe.Log.trace("restitution: " + this.restitution,{ fileName : "View.hx", lineNumber : 93, className : "com.dango_itimi.box2d.view.View", methodName : "toString"});
		haxe.Log.trace("friction: " + this.friction,{ fileName : "View.hx", lineNumber : 94, className : "com.dango_itimi.box2d.view.View", methodName : "toString"});
		haxe.Log.trace("fixedRotation: " + Std.string(this.fixedRotation),{ fileName : "View.hx", lineNumber : 95, className : "com.dango_itimi.box2d.view.View", methodName : "toString"});
		haxe.Log.trace("userData: " + Std.string(this.userData),{ fileName : "View.hx", lineNumber : 96, className : "com.dango_itimi.box2d.view.View", methodName : "toString"});
	}
	,initializeChild: function() {
	}
	,initialize: function(materialId,mcHeadName,id,bodyType,bullet,restitution,friction,density,fixedRotation,userData,groupIndex,categoryBits,maskBits,firstVisible,clonedId) {
		if(clonedId == null) clonedId = -1;
		this.maskBits = maskBits;
		this.categoryBits = categoryBits;
		this.id = id;
		this.mcHeadName = mcHeadName;
		this.materialId = materialId;
		this.bullet = bullet;
		this.firstVisible = firstVisible;
		this.groupIndex = groupIndex;
		this.fixedRotation = fixedRotation;
		this.friction = friction;
		this.restitution = restitution;
		this.density = density;
		this.bodyType = bodyType;
		this.userData = userData;
		this.key = Type.getClassName(Type.getClass(this)) + materialId + "_" + mcHeadName + "_" + id;
		if(clonedId != -1) this.key = this.key + "_" + clonedId;
		if(userData.key != null) haxe.Log.trace("Error! Dont set up userData.key",{ fileName : "View.hx", lineNumber : 80, className : "com.dango_itimi.box2d.view.View", methodName : "initialize"});
		userData.key = this.key;
		this.initializeChild();
	}
	,maskBits: null
	,categoryBits: null
	,id: null
	,mcHeadName: null
	,materialId: null
	,bullet: null
	,firstVisible: null
	,groupIndex: null
	,density: null
	,angle: null
	,key: null
	,userData: null
	,fixedRotation: null
	,body: null
	,fixtureDef: null
	,bodyDef: null
	,bodyDefPosY: null
	,bodyDefPosX: null
	,shape: null
	,friction: null
	,restitution: null
	,bodyType: null
	,baseShape: null
	,__class__: com.dango_itimi.box2d.view.View
}
if(!com.dango_itimi.toolkit_for_createjs) com.dango_itimi.toolkit_for_createjs = {}
if(!com.dango_itimi.toolkit_for_createjs.box2d) com.dango_itimi.toolkit_for_createjs.box2d = {}
com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS = $hxClasses["com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS"] = function(chunkMap) {
	this.boxClass = com.dango_itimi.toolkit_for_createjs.box2d.view.Box;
	this.circleClass = com.dango_itimi.toolkit_for_createjs.box2d.view.Circle;
	this.polygonClass = com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon;
	com.dango_itimi.box2d.FlashToBox2dConverter.call(this,chunkMap);
};
com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","FlashToBox2dConverterForJS"];
com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS.__super__ = com.dango_itimi.box2d.FlashToBox2dConverter;
com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS.prototype = $extend(com.dango_itimi.box2d.FlashToBox2dConverter.prototype,{
	createViewMapChild: function(chunk,viewClass,materialId,viewMap,userDataSetLength) {
		var chunkSprite = chunk.chunkSprite;
		var _g1 = 0, _g = chunkSprite.getNumChildren();
		while(_g1 < _g) {
			var i = _g1++;
			var childSprite = chunkSprite.getChildAt(i);
			var mcName = "";
			var fields = Reflect.fields(chunkSprite);
			var _g2 = 0;
			while(_g2 < fields.length) {
				var prop = fields[_g2];
				++_g2;
				if(Reflect.field(chunkSprite,prop) != childSprite) continue;
				mcName = prop;
				break;
			}
			var mcHeadName = mcName.indexOf("instance") == -1?"c":"instance";
			var viewId = mcHeadName == "c"?mcName.substring(mcHeadName.length).split("_")[0]:mcName.substring(mcHeadName.length).split("_").slice(-1)[0];
			var userData = mcHeadName == "c" && viewId < userDataSetLength?chunk.getUserData(viewId):new com.dango_itimi.box2d.userdata.UserData();
			var view = Type.createInstance(viewClass,[]);
			(js.Boot.__cast(view , com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS)).createBaseShape(childSprite);
			view.initialize(materialId,mcHeadName,viewId,chunk.bodyType,chunk.bullet,chunk.restitution,chunk.friction,chunk.density,chunk.fixedRotation,userData,chunk.groupIndex,chunk.categoryBits,chunk.maskBits,chunk.firstVisible);
			viewMap.get(mcHeadName).set(viewId,view);
		}
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS
});
if(!com.dango_itimi.toolkit_for_createjs.box2d.view) com.dango_itimi.toolkit_for_createjs.box2d.view = {}
com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS = $hxClasses["com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS"] = function() {
	com.dango_itimi.box2d.view.BaseShape.call(this);
};
com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","view","BaseShapeForJS"];
com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS.__super__ = com.dango_itimi.box2d.view.BaseShape;
com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS.prototype = $extend(com.dango_itimi.box2d.view.BaseShape.prototype,{
	getBounds: function() {
		return this.bounds;
	}
	,setShapeSprite: function(shapeSprite) {
		var rotation = shapeSprite.rotation;
		shapeSprite.rotation = 0;
		this.bounds = com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getNominalBounds(shapeSprite);
		this.bounds.width *= shapeSprite.scaleX;
		this.bounds.height *= shapeSprite.scaleY;
		this.centerX = shapeSprite.x;
		this.centerY = shapeSprite.y;
		shapeSprite.rotation = rotation;
	}
	,bounds: null
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS
});
com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS = $hxClasses["com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS"] = function() { }
com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","view","ViewForJS"];
com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.__super__ = com.dango_itimi.box2d.view.View;
com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.prototype = $extend(com.dango_itimi.box2d.view.View.prototype,{
	getChunkSprite: function() {
		return this.chunkSprite;
	}
	,cloneChild: function(view) {
		(js.Boot.__cast(view , com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS)).createBaseShape(this.chunkSprite);
	}
	,toString: function() {
		haxe.Log.trace("------",{ fileName : "ViewForJS.hx", lineNumber : 23, className : "com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS", methodName : "toString", customParams : [this.chunkSprite.name]});
		com.dango_itimi.box2d.view.View.prototype.toString.call(this);
	}
	,createBaseShape: function(chunkSprite) {
		this.chunkSprite = chunkSprite;
		this.baseShape = new com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS();
		(js.Boot.__cast(this.baseShape , com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS)).setShapeSprite(chunkSprite);
		this.angle = Math.PI / 180 * chunkSprite.rotation;
	}
	,chunkSprite: null
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS
});
com.dango_itimi.toolkit_for_createjs.box2d.view.Box = $hxClasses["com.dango_itimi.toolkit_for_createjs.box2d.view.Box"] = function() { }
com.dango_itimi.toolkit_for_createjs.box2d.view.Box.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","view","Box"];
com.dango_itimi.toolkit_for_createjs.box2d.view.Box.__super__ = com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS;
com.dango_itimi.toolkit_for_createjs.box2d.view.Box.prototype = $extend(com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.prototype,{
	createShape: function(scale) {
		this.shape = new box2D.collision.shapes.B2PolygonShape();
		var bounds = (js.Boot.__cast(this.baseShape , com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS)).getBounds();
		(js.Boot.__cast(this.shape , box2D.collision.shapes.B2PolygonShape)).setAsBox(bounds.width / 2 / scale,bounds.height / 2 / scale);
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.view.Box
});
com.dango_itimi.toolkit_for_createjs.box2d.view.Circle = $hxClasses["com.dango_itimi.toolkit_for_createjs.box2d.view.Circle"] = function() { }
com.dango_itimi.toolkit_for_createjs.box2d.view.Circle.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","view","Circle"];
com.dango_itimi.toolkit_for_createjs.box2d.view.Circle.__super__ = com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS;
com.dango_itimi.toolkit_for_createjs.box2d.view.Circle.prototype = $extend(com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.prototype,{
	createShape: function(scale) {
		var bounds = (js.Boot.__cast(this.baseShape , com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS)).getBounds();
		this.shape = new box2D.collision.shapes.B2CircleShape(bounds.width / 2 / scale);
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.view.Circle
});
com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon = $hxClasses["com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon"] = function() { }
com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","view","Polygon"];
com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon.__super__ = com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS;
com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon.prototype = $extend(com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.prototype,{
	createShape: function(scale) {
		var vertices = [];
		var _g1 = 0, _g = this.verticesTotal;
		while(_g1 < _g) {
			var i = _g1++;
			var pt = this.verticesMap.get(i);
			var b2Vec2 = new box2D.common.math.B2Vec2(pt.getCenterX() / scale,pt.getCenterY() / scale);
			vertices.push(b2Vec2);
		}
		this.shape = new box2D.collision.shapes.B2PolygonShape();
		(js.Boot.__cast(this.shape , box2D.collision.shapes.B2PolygonShape)).setAsVector(vertices,this.verticesTotal);
	}
	,setBodyDefPosition: function(scale) {
		this.bodyDefPosX = this.chunkSprite.x / scale;
		this.bodyDefPosY = this.chunkSprite.y / scale;
	}
	,initializeChild: function() {
		this.verticesMap = new Hash();
		this.verticesTotal = 0;
		var fields = Reflect.fields(this.chunkSprite);
		var _g = 0;
		while(_g < fields.length) {
			var prop = fields[_g];
			++_g;
			if(prop.charAt(0) != "p") continue;
			var id = prop.substring("p".length).split("_")[0];
			if(Math.isNaN(id)) continue;
			var property = com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getProperty(this.chunkSprite,prop);
			var baseShape = new com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS();
			baseShape.setShapeSprite(property);
			this.verticesMap.set(id,baseShape);
			var n = id;
			if(n > this.verticesTotal) this.verticesTotal = n;
		}
		this.verticesTotal++;
	}
	,verticesTotal: null
	,verticesMap: null
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon
});
if(!com.dango_itimi.toolkit_for_createjs.utils) com.dango_itimi.toolkit_for_createjs.utils = {}
com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil = $hxClasses["com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil"] = function() { }
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
if(!com.dango_itimi.utils) com.dango_itimi.utils = {}
com.dango_itimi.utils.MathUtil = $hxClasses["com.dango_itimi.utils.MathUtil"] = function() { }
com.dango_itimi.utils.MathUtil.__name__ = ["com","dango_itimi","utils","MathUtil"];
com.dango_itimi.utils.MathUtil.radToDeg = function(rad) {
	return 180 / Math.PI * rad;
}
com.dango_itimi.utils.MathUtil.degToRad = function(deg) {
	return Math.PI / 180 * deg;
}
com.dango_itimi.utils.MathUtil.clamp = function(value,min,max) {
	if(value < min) return min; else if(value > max) return max; else return value;
}
com.dango_itimi.utils.RectangleUtil = $hxClasses["com.dango_itimi.utils.RectangleUtil"] = function(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.right = x + width;
	this.bottom = y + height;
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
	,toString: function() {
		return "w:" + this.width + ", h:" + this.height + ", x:" + this.x + ", y:" + this.y;
	}
	,clone: function() {
		return new com.dango_itimi.utils.RectangleUtil(this.x,this.y,this.width,this.height);
	}
	,right: null
	,bottom: null
	,y: null
	,x: null
	,width: null
	,height: null
	,__class__: com.dango_itimi.utils.RectangleUtil
}
var haxe = haxe || {}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
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
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
box2D.collision.B2Collision.b2_nullFeature = 255;
box2D.collision.B2Collision.s_incidentEdge = box2D.collision.B2Collision.makeClipPointVector();
box2D.collision.B2Collision.s_clipPoints1 = box2D.collision.B2Collision.makeClipPointVector();
box2D.collision.B2Collision.s_clipPoints2 = box2D.collision.B2Collision.makeClipPointVector();
box2D.collision.B2Collision.s_edgeAO = new Array();
box2D.collision.B2Collision.s_edgeBO = new Array();
box2D.collision.B2Collision.s_localTangent = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_localNormal = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_planePoint = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_normal = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_tangent = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_tangent2 = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_v11 = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_v12 = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.b2CollidePolyTempVec = new box2D.common.math.B2Vec2();
box2D.collision.B2Distance.s_simplex = new box2D.collision.B2Simplex();
box2D.collision.B2Distance.s_saveA = new Array();
box2D.collision.B2Distance.s_saveB = new Array();
box2D.collision.B2DynamicTreeNode.currentID = 0;
box2D.collision.B2Manifold.e_circles = 1;
box2D.collision.B2Manifold.e_faceA = 2;
box2D.collision.B2Manifold.e_faceB = 4;
box2D.collision.B2SeparationFunction.e_points = 1;
box2D.collision.B2SeparationFunction.e_faceA = 2;
box2D.collision.B2SeparationFunction.e_faceB = 4;
box2D.collision.B2TimeOfImpact.b2_toiCalls = 0;
box2D.collision.B2TimeOfImpact.b2_toiIters = 0;
box2D.collision.B2TimeOfImpact.b2_toiMaxIters = 0;
box2D.collision.B2TimeOfImpact.b2_toiRootIters = 0;
box2D.collision.B2TimeOfImpact.b2_toiMaxRootIters = 0;
box2D.collision.B2TimeOfImpact.s_cache = new box2D.collision.B2SimplexCache();
box2D.collision.B2TimeOfImpact.s_distanceInput = new box2D.collision.B2DistanceInput();
box2D.collision.B2TimeOfImpact.s_xfA = new box2D.common.math.B2Transform();
box2D.collision.B2TimeOfImpact.s_xfB = new box2D.common.math.B2Transform();
box2D.collision.B2TimeOfImpact.s_fcn = new box2D.collision.B2SeparationFunction();
box2D.collision.B2TimeOfImpact.s_distanceOutput = new box2D.collision.B2DistanceOutput();
box2D.collision.shapes.B2Shape.e_unknownShape = -1;
box2D.collision.shapes.B2Shape.e_circleShape = 0;
box2D.collision.shapes.B2Shape.e_polygonShape = 1;
box2D.collision.shapes.B2Shape.e_edgeShape = 2;
box2D.collision.shapes.B2Shape.e_shapeTypeCount = 3;
box2D.collision.shapes.B2Shape.e_hitCollide = 1;
box2D.collision.shapes.B2Shape.e_missCollide = 0;
box2D.collision.shapes.B2Shape.e_startsInsideCollide = -1;
box2D.collision.shapes.B2PolygonShape.s_mat = new box2D.common.math.B2Mat22();
box2D.common.B2Settings.VERSION = "2.1alpha";
box2D.common.B2Settings.USHRT_MAX = 65535;
box2D.common.B2Settings.b2_pi = Math.PI;
box2D.common.B2Settings.b2_maxManifoldPoints = 2;
box2D.common.B2Settings.b2_aabbExtension = 0.1;
box2D.common.B2Settings.b2_aabbMultiplier = 2.0;
box2D.common.B2Settings.b2_polygonRadius = 2.0 * box2D.common.B2Settings.b2_linearSlop;
box2D.common.B2Settings.b2_linearSlop = 0.005;
box2D.common.B2Settings.b2_angularSlop = 2.0 / 180.0 * box2D.common.B2Settings.b2_pi;
box2D.common.B2Settings.b2_toiSlop = 8.0 * box2D.common.B2Settings.b2_linearSlop;
box2D.common.B2Settings.b2_maxTOIContactsPerIsland = 32;
box2D.common.B2Settings.b2_maxTOIJointsPerIsland = 32;
box2D.common.B2Settings.b2_velocityThreshold = 1.0;
box2D.common.B2Settings.b2_maxLinearCorrection = 0.2;
box2D.common.B2Settings.b2_maxAngularCorrection = 8.0 / 180.0 * box2D.common.B2Settings.b2_pi;
box2D.common.B2Settings.b2_maxTranslation = 2.0;
box2D.common.B2Settings.b2_maxTranslationSquared = box2D.common.B2Settings.b2_maxTranslation * box2D.common.B2Settings.b2_maxTranslation;
box2D.common.B2Settings.b2_maxRotation = 0.5 * box2D.common.B2Settings.b2_pi;
box2D.common.B2Settings.b2_maxRotationSquared = box2D.common.B2Settings.b2_maxRotation * box2D.common.B2Settings.b2_maxRotation;
box2D.common.B2Settings.b2_contactBaumgarte = 0.2;
box2D.common.B2Settings.b2_timeToSleep = 0.5;
box2D.common.B2Settings.b2_linearSleepTolerance = 0.01;
box2D.common.B2Settings.b2_angularSleepTolerance = 2.0 / 180.0 * box2D.common.B2Settings.b2_pi;
box2D.common.math.B2Math.b2Vec2_zero = new box2D.common.math.B2Vec2(0.0,0.0);
box2D.common.math.B2Math.b2Mat22_identity = box2D.common.math.B2Mat22.fromVV(new box2D.common.math.B2Vec2(1.0,0.0),new box2D.common.math.B2Vec2(0.0,1.0));
box2D.common.math.B2Math.b2Transform_identity = new box2D.common.math.B2Transform(box2D.common.math.B2Math.b2Vec2_zero,box2D.common.math.B2Math.b2Mat22_identity);
box2D.common.math.B2Math.MIN_VALUE = Number.MIN_VALUE;
box2D.common.math.B2Math.MAX_VALUE = Number.MAX_VALUE;
box2D.dynamics.B2Body.s_xf1 = new box2D.common.math.B2Transform();
box2D.dynamics.B2Body.e_islandFlag = 1;
box2D.dynamics.B2Body.e_awakeFlag = 2;
box2D.dynamics.B2Body.e_allowSleepFlag = 4;
box2D.dynamics.B2Body.e_bulletFlag = 8;
box2D.dynamics.B2Body.e_fixedRotationFlag = 16;
box2D.dynamics.B2Body.e_activeFlag = 32;
box2D.dynamics.B2Body.b2_staticBody = 0;
box2D.dynamics.B2Body.b2_kinematicBody = 1;
box2D.dynamics.B2Body.b2_dynamicBody = 2;
box2D.dynamics.B2ContactFilter.b2_defaultFilter = new box2D.dynamics.B2ContactFilter();
box2D.dynamics.B2ContactListener.b2_defaultListener = new box2D.dynamics.B2ContactListener();
box2D.dynamics.B2ContactManager.s_evalCP = new box2D.collision.B2ContactPoint();
box2D.dynamics.B2DebugDraw.e_shapeBit = 1;
box2D.dynamics.B2DebugDraw.e_jointBit = 2;
box2D.dynamics.B2DebugDraw.e_aabbBit = 4;
box2D.dynamics.B2DebugDraw.e_pairBit = 8;
box2D.dynamics.B2DebugDraw.e_centerOfMassBit = 16;
box2D.dynamics.B2DebugDraw.e_controllerBit = 32;
box2D.dynamics.B2Island.s_impulse = new box2D.dynamics.B2ContactImpulse();
box2D.dynamics.B2World.s_timestep2 = new box2D.dynamics.B2TimeStep();
box2D.dynamics.B2World.s_xf = new box2D.common.math.B2Transform();
box2D.dynamics.B2World.s_backupA = new box2D.common.math.B2Sweep();
box2D.dynamics.B2World.s_backupB = new box2D.common.math.B2Sweep();
box2D.dynamics.B2World.s_timestep = new box2D.dynamics.B2TimeStep();
box2D.dynamics.B2World.s_queue = new Array();
box2D.dynamics.B2World.s_jointColor = new box2D.common.B2Color(0.5,0.8,0.8);
box2D.dynamics.B2World.e_newFixture = 1;
box2D.dynamics.B2World.e_locked = 2;
box2D.dynamics.contacts.B2Contact.e_sensorFlag = 1;
box2D.dynamics.contacts.B2Contact.e_continuousFlag = 2;
box2D.dynamics.contacts.B2Contact.e_islandFlag = 4;
box2D.dynamics.contacts.B2Contact.e_toiFlag = 8;
box2D.dynamics.contacts.B2Contact.e_touchingFlag = 16;
box2D.dynamics.contacts.B2Contact.e_enabledFlag = 32;
box2D.dynamics.contacts.B2Contact.e_filterFlag = 64;
box2D.dynamics.contacts.B2Contact.s_input = new box2D.collision.B2TOIInput();
box2D.dynamics.contacts.B2PositionSolverManifold.circlePointA = new box2D.common.math.B2Vec2();
box2D.dynamics.contacts.B2PositionSolverManifold.circlePointB = new box2D.common.math.B2Vec2();
box2D.dynamics.contacts.B2ContactSolver.staticFix = box2D.common.B2Settings.b2_maxManifoldPoints;
box2D.dynamics.contacts.B2ContactSolver.s_worldManifold = new box2D.collision.B2WorldManifold();
box2D.dynamics.contacts.B2ContactSolver.s_psm = new box2D.dynamics.contacts.B2PositionSolverManifold();
box2D.dynamics.joints.B2Joint.e_unknownJoint = 0;
box2D.dynamics.joints.B2Joint.e_revoluteJoint = 1;
box2D.dynamics.joints.B2Joint.e_prismaticJoint = 2;
box2D.dynamics.joints.B2Joint.e_distanceJoint = 3;
box2D.dynamics.joints.B2Joint.e_pulleyJoint = 4;
box2D.dynamics.joints.B2Joint.e_mouseJoint = 5;
box2D.dynamics.joints.B2Joint.e_gearJoint = 6;
box2D.dynamics.joints.B2Joint.e_lineJoint = 7;
box2D.dynamics.joints.B2Joint.e_weldJoint = 8;
box2D.dynamics.joints.B2Joint.e_frictionJoint = 9;
box2D.dynamics.joints.B2Joint.e_inactiveLimit = 0;
box2D.dynamics.joints.B2Joint.e_atLowerLimit = 1;
box2D.dynamics.joints.B2Joint.e_atUpperLimit = 2;
box2D.dynamics.joints.B2Joint.e_equalLimits = 3;
box2D.dynamics.joints.B2PulleyJoint.b2_minPulleyLength = 2.0;
box2D.dynamics.joints.B2RevoluteJoint.tImpulse = new box2D.common.math.B2Vec2();
com.dango_itimi.box2d.fla.Chunk.CHUNK_MC_HEAD_NAME_FOR_OPTIONAL = "c";
com.dango_itimi.box2d.fla.Chunk.CHUNK_MC_HEAD_NAME_FOR_AUTO = "instance";
com.dango_itimi.box2d.view.View.POINT_MC_HEAD_NAME = "p";
TFCBox2D.main();

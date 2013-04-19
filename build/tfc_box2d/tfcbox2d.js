function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var Hash = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: Hash
}
var HxOverrides = function() { }
HxOverrides.__name__ = ["HxOverrides"];
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
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
var Std = function() { }
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var TFCBox2D = function() { }
TFCBox2D.__name__ = ["TFCBox2D"];
TFCBox2D.main = function() {
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
var box2D = box2D || {}
if(!box2D.collision) box2D.collision = {}
box2D.collision.B2AABB = function() {
	this.lowerBound = new box2D.common.math.B2Vec2();
	this.upperBound = new box2D.common.math.B2Vec2();
};
box2D.collision.B2AABB.__name__ = ["box2D","collision","B2AABB"];
box2D.collision.B2AABB.prototype = {
	combine: function(aabb1,aabb2) {
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
	,__class__: box2D.collision.B2AABB
}
box2D.collision.B2ContactID = function() { }
box2D.collision.B2ContactID.__name__ = ["box2D","collision","B2ContactID"];
box2D.collision.B2ContactID.prototype = {
	setKey: function(value) {
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
	,__class__: box2D.collision.B2ContactID
}
box2D.collision.B2DynamicTree = function() { }
box2D.collision.B2DynamicTree.__name__ = ["box2D","collision","B2DynamicTree"];
box2D.collision.B2DynamicTree.prototype = {
	removeLeaf: function(leaf) {
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
box2D.collision.IBroadPhase = function() { }
box2D.collision.IBroadPhase.__name__ = ["box2D","collision","IBroadPhase"];
box2D.collision.IBroadPhase.prototype = {
	__class__: box2D.collision.IBroadPhase
}
box2D.collision.B2DynamicTreeBroadPhase = function() { }
box2D.collision.B2DynamicTreeBroadPhase.__name__ = ["box2D","collision","B2DynamicTreeBroadPhase"];
box2D.collision.B2DynamicTreeBroadPhase.__interfaces__ = [box2D.collision.IBroadPhase];
box2D.collision.B2DynamicTreeBroadPhase.prototype = {
	unBufferMove: function(proxy) {
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
box2D.collision.B2DynamicTreeNode = function() {
	this.aabb = new box2D.collision.B2AABB();
	this.id = box2D.collision.B2DynamicTreeNode.currentID++;
};
box2D.collision.B2DynamicTreeNode.__name__ = ["box2D","collision","B2DynamicTreeNode"];
box2D.collision.B2DynamicTreeNode.prototype = {
	isLeaf: function() {
		return this.child1 == null;
	}
	,__class__: box2D.collision.B2DynamicTreeNode
}
box2D.collision.B2DynamicTreePair = function() {
};
box2D.collision.B2DynamicTreePair.__name__ = ["box2D","collision","B2DynamicTreePair"];
box2D.collision.B2DynamicTreePair.prototype = {
	__class__: box2D.collision.B2DynamicTreePair
}
box2D.collision.B2RayCastInput = function(p1,p2,maxFraction) {
	if(maxFraction == null) maxFraction = 1;
	this.p1 = new box2D.common.math.B2Vec2();
	this.p2 = new box2D.common.math.B2Vec2();
	if(p1 != null) this.p1.setV(p1);
	if(p2 != null) this.p2.setV(p2);
	this.maxFraction = maxFraction;
};
box2D.collision.B2RayCastInput.__name__ = ["box2D","collision","B2RayCastInput"];
box2D.collision.B2RayCastInput.prototype = {
	__class__: box2D.collision.B2RayCastInput
}
box2D.collision.B2RayCastOutput = function() { }
box2D.collision.B2RayCastOutput.__name__ = ["box2D","collision","B2RayCastOutput"];
box2D.collision.B2RayCastOutput.prototype = {
	__class__: box2D.collision.B2RayCastOutput
}
box2D.collision.Features = function() { }
box2D.collision.Features.__name__ = ["box2D","collision","Features"];
box2D.collision.Features.prototype = {
	setFlip: function(value) {
		this._flip = value;
		this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & -16777216;
		return value;
	}
	,getFlip: function() {
		return this._flip;
	}
	,setIncidentVertex: function(value) {
		this._incidentVertex = value;
		this._m_id._key = this._m_id._key & -16711681 | this._incidentVertex << 16 & 16711680;
		return value;
	}
	,getIncidentVertex: function() {
		return this._incidentVertex;
	}
	,setIncidentEdge: function(value) {
		this._incidentEdge = value;
		this._m_id._key = this._m_id._key & -65281 | this._incidentEdge << 8 & 65280;
		return value;
	}
	,getIncidentEdge: function() {
		return this._incidentEdge;
	}
	,setReferenceEdge: function(value) {
		this._referenceEdge = value;
		this._m_id._key = this._m_id._key & -256 | this._referenceEdge & 255;
		return value;
	}
	,getReferenceEdge: function() {
		return this._referenceEdge;
	}
	,__class__: box2D.collision.Features
}
if(!box2D.collision.shapes) box2D.collision.shapes = {}
box2D.collision.shapes.B2Shape = function() {
	this.m_type = box2D.collision.shapes.B2Shape.e_unknownShape;
	this.m_radius = box2D.common.B2Settings.b2_linearSlop;
};
box2D.collision.shapes.B2Shape.__name__ = ["box2D","collision","shapes","B2Shape"];
box2D.collision.shapes.B2Shape.prototype = {
	computeSubmergedArea: function(normal,offset,xf,c) {
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
	,set: function(other) {
		this.m_radius = other.m_radius;
	}
	,copy: function() {
		return null;
	}
	,__class__: box2D.collision.shapes.B2Shape
}
box2D.collision.shapes.B2CircleShape = function(radius) {
	if(radius == null) radius = 0;
	box2D.collision.shapes.B2Shape.call(this);
	this.m_p = new box2D.common.math.B2Vec2();
	this.m_type = box2D.collision.shapes.B2Shape.e_circleShape;
	this.m_radius = radius;
};
box2D.collision.shapes.B2CircleShape.__name__ = ["box2D","collision","shapes","B2CircleShape"];
box2D.collision.shapes.B2CircleShape.__super__ = box2D.collision.shapes.B2Shape;
box2D.collision.shapes.B2CircleShape.prototype = $extend(box2D.collision.shapes.B2Shape.prototype,{
	computeSubmergedArea: function(normal,offset,xf,c) {
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
box2D.collision.shapes.B2EdgeShape = function() { }
box2D.collision.shapes.B2EdgeShape.__name__ = ["box2D","collision","shapes","B2EdgeShape"];
box2D.collision.shapes.B2EdgeShape.__super__ = box2D.collision.shapes.B2Shape;
box2D.collision.shapes.B2EdgeShape.prototype = $extend(box2D.collision.shapes.B2Shape.prototype,{
	computeSubmergedArea: function(normal,offset,xf,c) {
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
box2D.collision.shapes.B2MassData = function() {
	this.mass = 0.0;
	this.center = new box2D.common.math.B2Vec2(0,0);
	this.I = 0.0;
};
box2D.collision.shapes.B2MassData.__name__ = ["box2D","collision","shapes","B2MassData"];
box2D.collision.shapes.B2MassData.prototype = {
	__class__: box2D.collision.shapes.B2MassData
}
box2D.collision.shapes.B2PolygonShape = function() {
	box2D.collision.shapes.B2Shape.call(this);
	this.m_type = box2D.collision.shapes.B2Shape.e_polygonShape;
	this.m_centroid = new box2D.common.math.B2Vec2();
	this.m_vertices = new Array();
	this.m_normals = new Array();
};
box2D.collision.shapes.B2PolygonShape.__name__ = ["box2D","collision","shapes","B2PolygonShape"];
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
box2D.collision.shapes.B2PolygonShape.__super__ = box2D.collision.shapes.B2Shape;
box2D.collision.shapes.B2PolygonShape.prototype = $extend(box2D.collision.shapes.B2Shape.prototype,{
	reserve: function(count) {
		var _g = this.m_vertices.length;
		while(_g < count) {
			var i = _g++;
			this.m_vertices[i] = new box2D.common.math.B2Vec2();
			this.m_normals[i] = new box2D.common.math.B2Vec2();
		}
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
if(!box2D.common) box2D.common = {}
box2D.common.B2Color = function() { }
box2D.common.B2Color.__name__ = ["box2D","common","B2Color"];
box2D.common.B2Color.prototype = {
	getColor: function() {
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
	,__class__: box2D.common.B2Color
}
box2D.common.B2Settings = function() { }
box2D.common.B2Settings.__name__ = ["box2D","common","B2Settings"];
box2D.common.B2Settings.b2Assert = function(a) {
	if(!a) throw "Assertion Failed";
}
if(!box2D.common.math) box2D.common.math = {}
box2D.common.math.B2Mat22 = function() { }
box2D.common.math.B2Mat22.__name__ = ["box2D","common","math","B2Mat22"];
box2D.common.math.B2Mat22.prototype = {
	set: function(angle) {
		var c = Math.cos(angle);
		var s = Math.sin(angle);
		this.col1.x = c;
		this.col2.x = -s;
		this.col1.y = s;
		this.col2.y = c;
	}
	,__class__: box2D.common.math.B2Mat22
}
box2D.common.math.B2Math = function() { }
box2D.common.math.B2Math.__name__ = ["box2D","common","math","B2Math"];
box2D.common.math.B2Math.dot = function(a,b) {
	return a.x * b.x + a.y * b.y;
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
box2D.common.math.B2Math.subtractVV = function(a,b) {
	var v = new box2D.common.math.B2Vec2(a.x - b.x,a.y - b.y);
	return v;
}
box2D.common.math.B2Math.abs = function(a) {
	return a > 0.0?a:-a;
}
box2D.common.math.B2Math.absV = function(a) {
	var b = new box2D.common.math.B2Vec2(box2D.common.math.B2Math.abs(a.x),box2D.common.math.B2Math.abs(a.y));
	return b;
}
box2D.common.math.B2Math.max = function(a,b) {
	return a > b?a:b;
}
box2D.common.math.B2Math.clamp = function(a,low,high) {
	return a < low?low:a > high?high:a;
}
box2D.common.math.B2Sweep = function() { }
box2D.common.math.B2Sweep.__name__ = ["box2D","common","math","B2Sweep"];
box2D.common.math.B2Sweep.prototype = {
	__class__: box2D.common.math.B2Sweep
}
box2D.common.math.B2Transform = function() { }
box2D.common.math.B2Transform.__name__ = ["box2D","common","math","B2Transform"];
box2D.common.math.B2Transform.prototype = {
	__class__: box2D.common.math.B2Transform
}
box2D.common.math.B2Vec2 = function(x_,y_) {
	if(y_ == null) y_ = 0;
	if(x_ == null) x_ = 0;
	this.x = x_;
	this.y = y_;
};
box2D.common.math.B2Vec2.__name__ = ["box2D","common","math","B2Vec2"];
box2D.common.math.B2Vec2.prototype = {
	normalize: function() {
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
	,multiply: function(a) {
		this.x *= a;
		this.y *= a;
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
if(!box2D.dynamics) box2D.dynamics = {}
box2D.dynamics.B2Body = function() { }
box2D.dynamics.B2Body.__name__ = ["box2D","dynamics","B2Body"];
box2D.dynamics.B2Body.prototype = {
	synchronizeTransform: function() {
		this.m_xf.R.set(this.m_sweep.a);
		var tMat = this.m_xf.R;
		var tVec = this.m_sweep.localCenter;
		this.m_xf.position.x = this.m_sweep.c.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
		this.m_xf.position.y = this.m_sweep.c.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	}
	,getWorldPoint: function(localPoint) {
		var A = this.m_xf.R;
		var u = new box2D.common.math.B2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y,A.col1.y * localPoint.x + A.col2.y * localPoint.y);
		u.x += this.m_xf.position.x;
		u.y += this.m_xf.position.y;
		return u;
	}
	,__class__: box2D.dynamics.B2Body
}
box2D.dynamics.B2TimeStep = function() { }
box2D.dynamics.B2TimeStep.__name__ = ["box2D","dynamics","B2TimeStep"];
box2D.dynamics.B2TimeStep.prototype = {
	__class__: box2D.dynamics.B2TimeStep
}
if(!box2D.dynamics.joints) box2D.dynamics.joints = {}
box2D.dynamics.joints.B2Joint = function(def) {
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
box2D.dynamics.joints.B2Joint.prototype = {
	solvePositionConstraints: function(baumgarte) {
		return false;
	}
	,solveVelocityConstraints: function(step) {
	}
	,initVelocityConstraints: function(step) {
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
	,__class__: box2D.dynamics.joints.B2Joint
}
box2D.dynamics.joints.B2JointDef = function() { }
box2D.dynamics.joints.B2JointDef.__name__ = ["box2D","dynamics","joints","B2JointDef"];
box2D.dynamics.joints.B2JointDef.prototype = {
	__class__: box2D.dynamics.joints.B2JointDef
}
box2D.dynamics.joints.B2JointEdge = function() {
};
box2D.dynamics.joints.B2JointEdge.__name__ = ["box2D","dynamics","joints","B2JointEdge"];
box2D.dynamics.joints.B2JointEdge.prototype = {
	__class__: box2D.dynamics.joints.B2JointEdge
}
box2D.dynamics.joints.B2PulleyJoint = function() { }
box2D.dynamics.joints.B2PulleyJoint.__name__ = ["box2D","dynamics","joints","B2PulleyJoint"];
box2D.dynamics.joints.B2PulleyJoint.__super__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2PulleyJoint.prototype = $extend(box2D.dynamics.joints.B2Joint.prototype,{
	solvePositionConstraints: function(baumgarte) {
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
var com = com || {}
if(!com.dango_itimi) com.dango_itimi = {}
if(!com.dango_itimi.box2d) com.dango_itimi.box2d = {}
com.dango_itimi.box2d.FlashToBox2dConverter = function() { }
com.dango_itimi.box2d.FlashToBox2dConverter.__name__ = ["com","dango_itimi","box2d","FlashToBox2dConverter"];
com.dango_itimi.box2d.FlashToBox2dConverter.prototype = {
	createViewMapChild: function(chunk,viewClass,chunkSetId,viewMap,userDataSetLength) {
	}
	,__class__: com.dango_itimi.box2d.FlashToBox2dConverter
}
if(!com.dango_itimi.box2d.fla) com.dango_itimi.box2d.fla = {}
com.dango_itimi.box2d.fla.Chunk = function(chunkSprite,bodyType,bullet,restitution,friction,density,fixedRotation,groupIndex,categoryBits,maskBits,firstVisible) {
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
	getUserData: function(optionalChunkId) {
		return this.userDataSet[optionalChunkId];
	}
	,__class__: com.dango_itimi.box2d.fla.Chunk
}
if(!com.dango_itimi.box2d.userdata) com.dango_itimi.box2d.userdata = {}
com.dango_itimi.box2d.userdata.UserData = function() {
};
com.dango_itimi.box2d.userdata.UserData.__name__ = ["com","dango_itimi","box2d","userdata","UserData"];
com.dango_itimi.box2d.userdata.UserData.prototype = {
	__class__: com.dango_itimi.box2d.userdata.UserData
}
if(!com.dango_itimi.box2d.view) com.dango_itimi.box2d.view = {}
com.dango_itimi.box2d.view.BaseShape = function() {
};
com.dango_itimi.box2d.view.BaseShape.__name__ = ["com","dango_itimi","box2d","view","BaseShape"];
com.dango_itimi.box2d.view.BaseShape.prototype = {
	__class__: com.dango_itimi.box2d.view.BaseShape
}
com.dango_itimi.box2d.view.View = function() { }
com.dango_itimi.box2d.view.View.__name__ = ["com","dango_itimi","box2d","view","View"];
com.dango_itimi.box2d.view.View.prototype = {
	getBaseShapeHeight: function() {
		return 0;
	}
	,getBaseShapeWidth: function() {
		return 0;
	}
	,createShape: function(scale) {
	}
	,setBodyDefPosition: function(scale) {
		this.bodyDefPosX = this.baseShape.centerX / scale;
		this.bodyDefPosY = this.baseShape.centerY / scale;
	}
	,cloneChild: function(view) {
	}
	,toString: function() {
		return this.key;
	}
	,initializeChild: function() {
	}
	,initialize: function(chunkSetId,mcHeadName,id,bodyType,bullet,restitution,friction,density,fixedRotation,userData,groupIndex,categoryBits,maskBits,firstVisible,clonedId) {
		if(clonedId == null) clonedId = -1;
		this.maskBits = maskBits;
		this.categoryBits = categoryBits;
		this.id = id;
		this.mcHeadName = mcHeadName;
		this.chunkSetId = chunkSetId;
		this.bullet = bullet;
		this.firstVisible = firstVisible;
		this.groupIndex = groupIndex;
		this.fixedRotation = fixedRotation;
		this.friction = friction;
		this.restitution = restitution;
		this.density = density;
		this.bodyType = bodyType;
		this.userData = userData;
		this.key = Type.getClassName(Type.getClass(this)) + chunkSetId + "_" + mcHeadName + "_" + id;
		if(clonedId != -1) this.key = this.key + "_" + clonedId;
		if(userData.key != null) console.log("Error! Dont set up userData.key");
		userData.key = this.key;
		this.initializeChild();
	}
	,__class__: com.dango_itimi.box2d.view.View
}
if(!com.dango_itimi.toolkit_for_createjs) com.dango_itimi.toolkit_for_createjs = {}
if(!com.dango_itimi.toolkit_for_createjs.box2d) com.dango_itimi.toolkit_for_createjs.box2d = {}
com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS = function() { }
com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","FlashToBox2dConverterForJS"];
com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS.__super__ = com.dango_itimi.box2d.FlashToBox2dConverter;
com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS.prototype = $extend(com.dango_itimi.box2d.FlashToBox2dConverter.prototype,{
	createViewMapChild: function(chunk,viewClass,chunkSetId,viewMap,userDataSetLength) {
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
			var viewId = mcHeadName == "c"?mcName.substring(mcHeadName.length):mcName.substring(mcHeadName.length).split("_").slice(-1)[0];
			var userData = mcHeadName == "c" && viewId < userDataSetLength?chunk.getUserData(viewId):new com.dango_itimi.box2d.userdata.UserData();
			var view = Type.createInstance(viewClass,[]);
			(js.Boot.__cast(view , com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS)).createBaseShape(childSprite);
			view.initialize(chunkSetId,mcHeadName,viewId,chunk.bodyType,chunk.bullet,chunk.restitution,chunk.friction,chunk.density,chunk.fixedRotation,userData,chunk.groupIndex,chunk.categoryBits,chunk.maskBits,chunk.firstVisible);
			viewMap.get(mcHeadName).set(viewId,view);
		}
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.FlashToBox2dConverterForJS
});
if(!com.dango_itimi.toolkit_for_createjs.box2d.view) com.dango_itimi.toolkit_for_createjs.box2d.view = {}
com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS = function() {
	com.dango_itimi.box2d.view.BaseShape.call(this);
};
com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","view","BaseShapeForJS"];
com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS.__super__ = com.dango_itimi.box2d.view.BaseShape;
com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS.prototype = $extend(com.dango_itimi.box2d.view.BaseShape.prototype,{
	setShapeSprite: function(shapeSprite) {
		var rotation = shapeSprite.rotation;
		shapeSprite.rotation = 0;
		this.bounds = com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getNominalBounds(shapeSprite);
		this.bounds.width *= shapeSprite.scaleX;
		this.bounds.height *= shapeSprite.scaleY;
		this.centerX = shapeSprite.x;
		this.centerY = shapeSprite.y;
		shapeSprite.rotation = rotation;
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS
});
com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS = function() { }
com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","view","ViewForJS"];
com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.__super__ = com.dango_itimi.box2d.view.View;
com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.prototype = $extend(com.dango_itimi.box2d.view.View.prototype,{
	getBaseShapeHeight: function() {
		return (js.Boot.__cast(this.baseShape , com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS)).bounds.height;
	}
	,getBaseShapeWidth: function() {
		return (js.Boot.__cast(this.baseShape , com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS)).bounds.width;
	}
	,cloneChild: function(view) {
		(js.Boot.__cast(view , com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS)).createBaseShape(this.chunkSprite);
	}
	,toString: function() {
		return [this.chunkSprite.name,com.dango_itimi.box2d.view.View.prototype.toString.call(this)].join(",");
	}
	,createBaseShape: function(chunkSprite) {
		this.chunkSprite = chunkSprite;
		this.baseShape = new com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS();
		(js.Boot.__cast(this.baseShape , com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS)).setShapeSprite(chunkSprite);
		this.angle = Math.PI / 180 * chunkSprite.rotation;
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS
});
com.dango_itimi.toolkit_for_createjs.box2d.view.Box = function() { }
com.dango_itimi.toolkit_for_createjs.box2d.view.Box.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","view","Box"];
com.dango_itimi.toolkit_for_createjs.box2d.view.Box.__super__ = com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS;
com.dango_itimi.toolkit_for_createjs.box2d.view.Box.prototype = $extend(com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.prototype,{
	createShape: function(scale) {
		this.shape = new box2D.collision.shapes.B2PolygonShape();
		var bounds = (js.Boot.__cast(this.baseShape , com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS)).bounds;
		(js.Boot.__cast(this.shape , box2D.collision.shapes.B2PolygonShape)).setAsBox(bounds.width / 2 / scale,bounds.height / 2 / scale);
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.view.Box
});
com.dango_itimi.toolkit_for_createjs.box2d.view.Circle = function() { }
com.dango_itimi.toolkit_for_createjs.box2d.view.Circle.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","view","Circle"];
com.dango_itimi.toolkit_for_createjs.box2d.view.Circle.__super__ = com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS;
com.dango_itimi.toolkit_for_createjs.box2d.view.Circle.prototype = $extend(com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.prototype,{
	createShape: function(scale) {
		var bounds = (js.Boot.__cast(this.baseShape , com.dango_itimi.toolkit_for_createjs.box2d.view.BaseShapeForJS)).bounds;
		this.shape = new box2D.collision.shapes.B2CircleShape(bounds.width / 2 / scale);
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.view.Circle
});
com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon = function() { }
com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon.__name__ = ["com","dango_itimi","toolkit_for_createjs","box2d","view","Polygon"];
com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon.__super__ = com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS;
com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon.prototype = $extend(com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS.prototype,{
	createShape: function(scale) {
		var vertices = [];
		var _g1 = 0, _g = this.verticesTotal;
		while(_g1 < _g) {
			var i = _g1++;
			var pt = this.verticesMap.get(i);
			var b2Vec2 = new box2D.common.math.B2Vec2(pt.centerX / scale,pt.centerY / scale);
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
	,__class__: com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon
});
if(!com.dango_itimi.toolkit_for_createjs.utils) com.dango_itimi.toolkit_for_createjs.utils = {}
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
if(!com.dango_itimi.utils) com.dango_itimi.utils = {}
com.dango_itimi.utils.MathUtil = function() { }
com.dango_itimi.utils.MathUtil.__name__ = ["com","dango_itimi","utils","MathUtil"];
com.dango_itimi.utils.RectangleUtil = function(x,y,width,height) {
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
	__class__: com.dango_itimi.utils.RectangleUtil
}
var js = js || {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
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
box2D.collision.B2DynamicTreeNode.currentID = 0;
box2D.collision.shapes.B2Shape.e_unknownShape = -1;
box2D.collision.shapes.B2Shape.e_circleShape = 0;
box2D.collision.shapes.B2Shape.e_polygonShape = 1;
box2D.common.B2Settings.b2_pi = Math.PI;
box2D.common.B2Settings.b2_aabbExtension = 0.1;
box2D.common.B2Settings.b2_aabbMultiplier = 2.0;
box2D.common.B2Settings.b2_linearSlop = 0.005;
box2D.common.B2Settings.b2_maxLinearCorrection = 0.2;
box2D.dynamics.joints.B2Joint.e_inactiveLimit = 0;
box2D.dynamics.joints.B2Joint.e_atUpperLimit = 2;
TFCBox2D.main();

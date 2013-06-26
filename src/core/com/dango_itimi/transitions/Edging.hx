package com.dango_itimi.transitions;
class Edging {

	private var edging:Float;
	private var cut:Int;

	public function new(edging:Float, cut:Int) {

		initialize(edging, cut);
	}
	public function initialize(edging:Float, cut:Int){

		if(edging < -100 || 100 < edging) throw "need: -100 <= edging <= 100";
		if(cut < 1) throw "need: cut >= 1";

		this.cut = cut;
		this.edging = edging;
	}

	public function getDistances(distance:Float):Array<Float>{

		if(distance == 0) throw "need: distance != 0";

		var vec:Float = 1;
		if(distance < 0){
			distance *= -1;
			vec = -1;
		}

		var distances:Array<Float> = new Array<Float>();
		var bpt:Float = 0;
		for (i in 0...cut) {

			var c:Float = (i+1) / cut;
			var pt:Float = distance * (c + edging / (100 * Math.PI) * Math.sin(Math.PI * c));
			distances[i] = (pt - bpt) * vec;
			bpt = pt;
		}
		return distances;
	}

	public function getPoints(firstPt:Float, endPt:Float):Array<Float>{

		var poInts:Array<Float> = new Array<Float>();
		for (i in 0...cut) {

			var c:Float = (i+1) / cut;
			poInts[i] = (endPt - firstPt) * (c + edging / (100 * Math.PI) * Math.sin(Math.PI * c)) + firstPt;
		}
		poInts.unshift(firstPt);
		return poInts;
	}
}

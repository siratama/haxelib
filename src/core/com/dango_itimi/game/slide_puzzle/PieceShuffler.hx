package com.dango_itimi.game.slide_puzzle;
class PieceShuffler {

	public static inline var EMPTY = -1;
	private static inline var VECTOR_UP = 0;
	private static inline var VECTOR_RIGHT = 1;
	private static inline var VECTOR_DOWN = 2;
	private static inline var VECTOR_LEFT = 3;
	private static inline var VECTOR_TOTAL = 4;

	private var totalX:Int;
	private var totalY:Int;
	private var shuffleTotal:Int;

	public function new(totalX:Int, totalY:Int, shuffleTotal:Int){
		this.totalX = totalX;
		this.totalY = totalY;
		this.shuffleTotal = shuffleTotal;
	}
	public function execute():Array<Array<Int>>{

		var idMap:Array<Array<Int>> = [];
		initialize(idMap);
		shuffle(idMap);

		//for(y in 0...totalY) for(x in 0...totalX) trace(map[y][x]);

		return idMap;
	}
	private function initialize(idMap:Array<Array<Int>>){

		var id = 1;
		for(y in 0...totalY){

			var arr:Array<Int> = [];
			for(x in 0...totalX){

				var n = ((x+1) * (y+1) == totalX * totalY) ? EMPTY : id;
				arr.push(n);
				id++;
			}
			idMap.push(arr);
		}
	}
	private function shuffle(idMap:Array<Array<Int>>){

		var emptyPositionX:Int = totalX - 1;
		var emptyPositionY:Int = totalY - 1;

		for(i in 0...shuffleTotal){

			var n = Math.floor(Math.random() * VECTOR_TOTAL);
			var x = emptyPositionX;
			var y = emptyPositionY;

			if(n == VECTOR_UP && emptyPositionY > 0)
				y = emptyPositionY - 1;

			else if(n == VECTOR_RIGHT && (emptyPositionX < totalX - 1))
				x = emptyPositionX + 1;

			else if(n == VECTOR_DOWN && (emptyPositionY < totalY - 1))
				y = emptyPositionY + 1;

			else if(n == VECTOR_LEFT && emptyPositionX > 0)
				x = emptyPositionX - 1;
			else
				continue;

			idMap[emptyPositionY][emptyPositionX] = idMap[y][x];
			idMap[y][x] = EMPTY;
			emptyPositionX = x;
			emptyPositionY = y;
		}
	}
}

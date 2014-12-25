package com.dango_itimi.utils;

import flash.Lib;

class FrameSkipChecker{

	public var skippedFrame(default, null):Int;
	private var fps:Int;
	private var margin:Int;

	private var skippedCount:Int;
	private var previousTime:Float;
	private var currentTime:Float;
	private var currentFps:Float;

	public function new(fps:Int = 60, margin:Int = 0)
	{
		this.fps = fps;
		this.margin = margin;

		initialize();
	}
	public function initialize()
	{
		skippedCount = 0;
		previousTime = 0;
		currentTime = 0;
	}
	public function run()
	{
		currentTime = flash.Lib.getTimer();
		currentFps = 1000 / (currentTime - previousTime);

		if(!isSkipped() && currentFps < fps)
		{
			skippedFrame = Math.floor(fps / currentFps + margin);
			skippedCount = skippedFrame;
		}
		else
			skippedCount--;

		previousTime = currentTime;
	}

	public function isSkipped():Bool{
		return skippedCount >= 0;
	}
}

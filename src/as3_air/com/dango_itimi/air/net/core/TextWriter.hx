package com.dango_itimi.air.net.core;
import flash.filesystem.FileMode;
import flash.events.Event;
import flash.events.IOErrorEvent;
import flash.events.ProgressEvent;
import flash.errors.Error;
import flash.filesystem.FileStream;
import flash.filesystem.File;
class TextWriter {

	public static var STATE_NON:Int = 0;
	public static var STATE_EXEC:Int = 1;
	public static var STATE_ERR:Int = 3;
	public static var STATE_CLOSE:Int = 4;
	private var state(default, null):Int;

	private var file:File;
	private var fileStream:FileStream;
	private var bytesLoaded:Float;
	private var bytesTotal:Float;

	public function new(outputNativePath:String) {

		file = new File();
		file.nativePath = outputNativePath;
		fileStream = new FileStream();
		state = STATE_NON;

		setEventListener();
	}
	public function setEventListener(){

		fileStream.addEventListener(IOErrorEvent.IO_ERROR, ioError);
		fileStream.addEventListener(ProgressEvent.PROGRESS, progress);
		fileStream.addEventListener(Event.CLOSE, streamClose);
	}
	public function removeEventListener(){

		fileStream.removeEventListener(IOErrorEvent.IO_ERROR, ioError);
		fileStream.removeEventListener(ProgressEvent.PROGRESS, progress);
		fileStream.removeEventListener(Event.CLOSE, streamClose);
	}
	public function execute(text:String):Error{

		state = STATE_EXEC;

		var writeError:Error = null;
		try{
			fileStream.openAsync(file, FileMode.WRITE);
			fileStream.writeUTFBytes(text);
		}
		catch(error:Error){

			trace(error);
			writeError = error;
		}
		fileStream.close();

		return writeError;
	}
	private function progress(event:ProgressEvent) {

		bytesLoaded = event.bytesLoaded;
		bytesTotal = event.bytesTotal;
	}
	private function ioError(event:IOErrorEvent) {

		trace("ioError");
		state = STATE_ERR;
	}
	private function streamClose(event:Event) {

		state = STATE_CLOSE;
	}

	public function getProgressPercentage():Int{
		if(bytesLoaded == 0) return 1;
		return Math.floor(bytesLoaded / bytesTotal * 100);
	}
	public function getNativePath():String{
		return file.nativePath;
	}
	public function getFileName():String {
		return file.name;
	}

}

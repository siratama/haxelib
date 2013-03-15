package com.dango_itimi.as3.net.core;
	
import flash.system.ApplicationDomain;
import flash.utils.ByteArray;

class BytesBinaryLoader extends BinaryLoader {

	private var bytes:ByteArray;

	public function new(?applicationDomain:ApplicationDomain = null) {

		super(null, applicationDomain);
	}

	override public function execute(){

		super.execute();
		loader.loadBytes(bytes);
	}

	public function setBytes(bytes:ByteArray) {
		this.bytes = bytes;
	}
}


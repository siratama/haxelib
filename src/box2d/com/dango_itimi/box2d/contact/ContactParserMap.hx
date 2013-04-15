package com.dango_itimi.box2d.contact;

import box2D.dynamics.B2World;
import com.dango_itimi.box2d.contact.ContactParser;

class ContactParserMap {

	private var map:Hash<ContactParser>;
	private var b2world:B2World;
	private var latestAddedBaseViewKey:String;

	public function new(b2world:B2World){

		this.b2world = b2world;
		map = new Hash();
	}
	public function add(baseViewKey:String):ContactParser{

		latestAddedBaseViewKey = baseViewKey;

		var contactParser = new ContactParser(baseViewKey);
		map.set(baseViewKey, contactParser);
		return contactParser;
	}
	public function registerTargetView(targetViewKey:String, ?baseViewKey:String){

		if(baseViewKey == null && latestAddedBaseViewKey == null)
			throw "need to call add method";

		if(baseViewKey == null)
			baseViewKey = latestAddedBaseViewKey;

		var contactParser = map.get(baseViewKey);
		contactParser.registerTargetView(targetViewKey);
	}
	public function removeParser(baseViewKey:String){

		map.remove(baseViewKey);
	}
	public function getParser(baseViewKey:String):ContactParser{

		return map.get(baseViewKey);
	}
	public function getContactData(baseViewKey:String, contactCheckViewKey:String):ContactData{

		return map.get(baseViewKey).getContactData(contactCheckViewKey);
	}
	public function run(){

		for(key in map.keys())
			map.get(key).initialize();

		var b2Contact = b2world.getContactList();
		while(b2Contact != null){

			for(key in map.keys())
				map.get(key).run(b2Contact);

			b2Contact = b2Contact.getNext();
		}
	}
}

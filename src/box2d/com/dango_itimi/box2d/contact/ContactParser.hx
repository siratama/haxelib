package com.dango_itimi.box2d.contact;

import com.dango_itimi.box2d.userdata.UserData;
import box2D.dynamics.contacts.B2Contact;

class ContactParser {

	private var viewKey:String;
	private var contactCheckViewKeyMap:Hash<ContactData>;
	public var contactedSomething(default, null):Bool;
	public var gettedOnTheSomethingBox(default, null):Bool;

	public function new(viewKey:String){

		this.viewKey = viewKey;
		contactCheckViewKeyMap = new Hash();
	}
	public function registerTargetView(targetViewKey:String){

		contactCheckViewKeyMap.set(targetViewKey, new ContactData());
	}
	public function run(b2Contact:B2Contact){

		contactedSomething = false;
		gettedOnTheSomethingBox = false;
		for(key in contactCheckViewKeyMap.keys())
			contactCheckViewKeyMap.get(key).initialize();

		var manifold = b2Contact.getManifold();
		if(manifold.m_pointCount == 0) return;

		var userDataA:UserData = b2Contact.getFixtureA().getBody().getUserData();
		var userDataB:UserData = b2Contact.getFixtureB().getBody().getUserData();

		var keyA:String = (userDataA != null) ? userDataA.key : "";
		var keyB:String = (userDataB != null) ? userDataB.key : "";

		if(keyA != viewKey && keyB != viewKey) return;

		contactedSomething = true;
		var gettedOnTheBox:Bool =
			(keyA == viewKey && manifold.m_localPlaneNormal.y > 0) ||
			(keyB == viewKey && manifold.m_localPlaneNormal.y < 0);

		if(gettedOnTheBox) gettedOnTheSomethingBox = true;

		var contactCheckViewKey:String = (keyA == viewKey) ? keyB: keyA;
		var contactData:ContactData = contactCheckViewKeyMap.get(contactCheckViewKey);
		if(contactData == null) return;

		contactData.contacted = true;
		if(gettedOnTheBox) contactData.gettedOnTheBox = true;
	}
	public function getContactData(contactCheckViewKey:String):ContactData{
		return contactCheckViewKeyMap.get(contactCheckViewKey);
	}
}

class ContactData{

	public var contacted:Bool;
	public var gettedOnTheBox:Bool;

	public function new(){
	}
	public function initialize(){
		contacted = false;
		gettedOnTheBox = false;
	}
}

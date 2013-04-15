package com.dango_itimi.box2d.contact;

import com.dango_itimi.box2d.userdata.UserData;
import box2D.dynamics.contacts.B2Contact;

class ContactParser {

	private var viewKey:String;
	private var targetContactDataMap:Hash<ContactData>;
	public var allContactData(default, null):Array<ContactData>;

	public function new(viewKey:String){

		this.viewKey = viewKey;
		targetContactDataMap = new Hash();
		allContactData = [];
	}
	public function registerTargetView(targetViewKey:String){

		targetContactDataMap.set(targetViewKey, new ContactData());
	}
	public function initialize(){

		allContactData = [];
		for(key in targetContactDataMap.keys())
			targetContactDataMap.get(key).initialize();
	}
	public function run(b2Contact:B2Contact){

		var manifold = b2Contact.getManifold();
		if(manifold.m_pointCount == 0) return;

		var userDataA:UserData = b2Contact.getFixtureA().getBody().getUserData();
		var userDataB:UserData = b2Contact.getFixtureB().getBody().getUserData();
		var keyA:String = (userDataA != null) ? userDataA.key : "";
		var keyB:String = (userDataB != null) ? userDataB.key : "";

		if(keyA != viewKey && keyB != viewKey) return;

		var baseViewIsFixtureA:Bool = (keyA == viewKey);

		var contactData = new ContactData();
		contactData.setData(b2Contact, baseViewIsFixtureA);

		allContactData.push(contactData);

		var contactCheckViewKey:String = (baseViewIsFixtureA) ? keyB: keyA;
		var contactData:ContactData = targetContactDataMap.get(contactCheckViewKey);
		if(contactData != null)
			contactData.setData(b2Contact, baseViewIsFixtureA);
	}
	public function isContactedSomething():Bool{
		return allContactData.length > 0;
	}
	public function getContactData(contactCheckViewKey:String):ContactData{
		return targetContactDataMap.get(contactCheckViewKey);
	}
	public function isOnSomethingBoxOrCircle():Bool{

		for(contactData in allContactData){
			if(contactData.isOnBoxOrCircle()) return true;
		}
		return false;
	}
}


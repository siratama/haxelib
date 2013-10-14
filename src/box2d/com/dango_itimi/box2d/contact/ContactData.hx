package com.dango_itimi.box2d.contact;
import box2D.collision.B2ManifoldType;
import box2D.dynamics.contacts.B2Contact;
class ContactData {

	public var b2Contact(default, null):B2Contact;
	private var baseViewIsFixtureA:Bool;

	public function new(){

		initialize();
	}
	public function initialize(){
		b2Contact = null;
		baseViewIsFixtureA = false;
	}
	public function setData(b2Contact:B2Contact, baseViewIsFixtureA:Bool){

		this.b2Contact = b2Contact;
		this.baseViewIsFixtureA = baseViewIsFixtureA;
	}
	public function isContacted():Bool{
		return b2Contact != null;
	}

	//(box on box) or (box on circle)
	//require both angle is zero
	public function isOnBoxOrCircle():Bool{

		var manifold = b2Contact.getManifold();
		if(manifold.m_type == B2ManifoldType.FACE_A){

			return (
				(baseViewIsFixtureA && manifold.m_localPlaneNormal.y > 0) ||
				(!baseViewIsFixtureA && manifold.m_localPlaneNormal.y < 0)
			);
		}
		return false;
	}
}

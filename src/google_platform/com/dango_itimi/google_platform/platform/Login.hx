package com.dango_itimi.google_platform.platform;
class Login {

	private var elementId:String;
	private var parameters:Dynamic;
	public var authResult(default, null):Dynamic;
	public var finished(default, null):Bool;

	public function new(elementId:String, clientId:String, scope:String, cookiePolicy:String, requestVisibleActions:String){

		this.elementId = elementId;

		parameters = {
			clientid: clientId,
			scope: scope,
			cookiepolicy: cookiePolicy,
			requestvisibleactions: requestVisibleActions
		};
		untyped parameters["class"] = "g-signin";
		untyped parameters["callback"] = finishAuthorization;
	}
	public function authByRendering(){

		untyped gapi.interactivepost.render(elementId, parameters);
	}
	public function initialize(){

		finished = false;
		authResult = null;
	}
	private function finishAuthorization(authResult:Dynamic){

		this.authResult = authResult;
		finished = true;
	}
	public function isSuccess():Bool{

		return authResult != null && !authResult.error;
	}
	public function isError():Bool{

		return authResult == null || authResult.error != null;
	}
}

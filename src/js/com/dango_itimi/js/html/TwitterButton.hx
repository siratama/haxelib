package com.dango_itimi.js.html;
import jQuery.JQuery;
class TwitterButton {

	private var element:JQuery;

	public function new(elementId:String){

		element = new JQuery("#" + elementId);
	}
	public function show(
		url:String,
		text:String,
		via:String = "",
		hashtags:String = "",
		count:String = "none",
		language:String = "en"
	){
		new JQuery("iframe", element).remove();

		var anchorElement = new JQuery("<a>").addClass("twitter-share-button")
			.attr("href", "http://twitter.com/share")
			.attr("data-url", url)
			.attr("data-via", via)
			.attr("data-hashtags", hashtags)
			.attr("data-text", text)
			.attr("data-count", "none")
			.attr("data-lang", language);

		element.append(anchorElement);
		untyped twttr.widgets.load();
	}
}

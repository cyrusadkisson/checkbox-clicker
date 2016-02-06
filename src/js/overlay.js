var bg = chrome.extension.getBackgroundPage();
var currentURL;

document.addEventListener('DOMContentLoaded', function () {
	 chrome.tabs.getSelected(null, function(tab) {
		 currentURL = tab.url;
		 doOverlay();
	 });
});

function doOverlay()
{
	var o_html = "";
	o_html = o_html + "<div width=\"400px\">";
	o_html = o_html + "This is some text in the overlay div";
	o_html = o_html + "<a href=\"#\" id=\"test_link\">This is a test link</a>";
	o_html = o_html + "</div>";
	$("#overlay_div").html(o_html);
	$("#test_link").click(function(){
		alert("overlay.js this is a test alert from the test link.");
		 chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			 chrome.tabs.sendMessage(tabs[0].id, {method: "doASimpleAlert"}, function(response) { 
				 alert("overlay.js callback from doASimpleAlert"); 
			 }); // sample call to the extension
		 });
//		 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//			 chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//				 console.log(response.farewell);
//			 });
//		 });
	});
	
}

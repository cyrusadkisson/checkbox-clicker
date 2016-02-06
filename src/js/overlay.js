
document.addEventListener('DOMContentLoaded', function () {
	 chrome.tabs.getSelected(null, function(tab) {
		 currentURL = tab.url;
		 doOverlay();
	 });
});

function doOverlay()
{
	var o_html = "";
	o_html = o_html + "<div style=\"width:300px;padding:20px;text-align:middle;font-size:24px;font-weight:bold\">";
	o_html = o_html + "<a href=\"#\" id=\"test_link\">CLICK ALL CHECKBOXES</a>";
	o_html = o_html + "</div>";
	$("#overlay_div").html(o_html);
	$("#test_link").click(function(){
		 chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			 chrome.tabs.sendMessage(tabs[0].id, {method: "doASimpleAlert"}, function(response) { 
				 // callback can go here
			 }); 
		 });
	});
	
}

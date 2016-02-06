var currentURL = "";
var currentId = "";
var currentHostname = "";


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
//	  if(request.method === "logout")
//	  {
//		  //alert("bg listener logout method");
//		  docCookies.removeItem("screenname");
//		  docCookies.removeItem("this_access_token");
//		  sendResponse({message: "You are now logged out."});
//	  }  
//	  else if(request.method == "getEndpoint") // don't need a getter for this as the receiver page can get this directly from cookie
//	  {
//		  sendResponse({endpoint: endpoint});
//	  }  
//	  else if(request.method == "getCounts") // don't need a getter for this as the receiver page can get this directly from cookie
//	  {
//		  if(user_jo && typeof user_jo.notification_count !== "undefined" && user_jo.notification_count !== null && typeof user_jo.newsfeed_count !== "undefined" && user_jo.newsfeed_count !== null)
//			  sendResponse({no: user_jo.notification_count, nf: user_jo.newsfeed_count});
//		  else
//			  sendResponse({no: 0, nf: 0});
//	  } 
//	  else if(request.method === "getHNAuthToken") // don't need a getter for this as the receiver page can get this directly from cookie
//	  {
//		  var tabid = 0;
//		  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//			  tabid = tabs[0].id;
//			  $.ajax({ 
//					type: 'GET', 
//					url: endpoint, 
//					data: {
//						method: "getHNAuthToken",
//			            screenname: request.detected_screenname
//			        },
//			        dataType: 'json',
//			        timeout: 10000,
//			        async: true, 
//			        success: function (data, status) {
//			        	if(data.response_status === "success")
//			        	{	
//			        		chrome.tabs.sendMessage(tabid, {method: "gotHNAuthToken", token: data.token, manual_or_automatic: request.manual_or_automatic}, function(response) {});
//			        	}
//			        	else if(data.response_status === "error")
//			        	{
//			        		chrome.tabs.sendMessage(tabid, {method: "gotHNAuthToken", token: null}, function(response) {});
//			        	}	
//			        	else
//			        	{
//			        		chrome.tabs.sendMessage(tabid, {method: "gotHNAuthToken", token: null}, function(response) {});
//			        	}
//			        },
//			        error: function (XMLHttpRequest, textStatus, errorThrown) {
//			        	console.log("getHNAuthToken ajax error");
//			            chrome.tabs.sendMessage(tabid, {method: "gotHNAuthToken", token: null}, function(response) {});
//			        }
//			  });
//		  });
//	  }
  });

//REAL FUNCTIONS, IN EXECUTION ORDER TOP2BOTTOM (sort of) 
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatingtab) {
	if (changeInfo.status === "loading") // also fires at "complete", which I'm ignoring here. Only need one (this one).
	{
		chrome.tabs.getSelected(null, function(tab) { // only follow through if the updating tab is the same as the selected tab, don't want background tabs reloading and wrecking stuff
			if(updatingtab.url === tab.url) // the one that's updating is the one we're looking at. good. proceed
			{
				//alert("background.js chrome.tabs.onUpdated fired. The url of the updating tab is the same as the url of the currently open tab");
				if(currentURL !== tab.url) 
				{
					//alert("background.js chrome.tabs.onUpdated fired. The url of the updating tab is the same as the url of the currently open tab. BUT the last-recorded current URL is not the same anymore. IE the current tab url has changed.");
				}
				else
				{
					//alert("background.js chrome.tabs.onUpdated fired. The url of the updating tab is the same as the url of the currently open tab. But the last-recorded current url is still the same. IE the current tab url has not changed.");
				}	
			}	
			else
			{
				//alert("background.js chrome.tabs.onUpdated fired. The url of the updating tab is *NOT* the same as the url of the currently open tab");
				// some other tab is updating. ignore.
			}	
		});
	}
	else if (changeInfo.status === "complete") 
	{
		//alert("onupdated complete"); (do nothing for now)
	}
}); 

function getHost(loc_url)
{
	var parser = document.createElement('a');
	parser.href = loc_url;
	return parser.host;
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.getSelected(null, function(tab) {
		if(typeof tab.url !== "undefined" && tab.url !== null && tab.url !== "")
		{
			currentURL = tab.url;
			currentId = tab.id;
			currentHostname = getHost(currentURL);
		}
	});
}); 
	
// FIRSTRUN 
//chrome.runtime.onInstalled.addListener(function(details){
//    if(details.reason == "install"){
//    	chrome.tabs.create({url: chrome.extension.getURL("firstrun.html")});
//    }else if(details.reason == "update"){
//    }
//});

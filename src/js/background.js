var currentURL = "";
var currentId = "";
var currentHostname = "";

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
	
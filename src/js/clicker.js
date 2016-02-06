// ADD A LISTENER TO HEAR STUFF FROM THE EXTENSION
chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.method === "doASimpleAlert")
				$('input:checkbox').trigger("click");
				sendResponse();
		});


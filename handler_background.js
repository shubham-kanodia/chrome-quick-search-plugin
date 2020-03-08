chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.command == "ct") {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.remove(tabs[0].id);
            });
        } else if (request.command == "nt") {
            if (request.params) {
                let inp_url = `https://www.${request.params[0]}.com`;
                console.log(inp_url);
                chrome.tabs.create({ url: inp_url });
            } else {
                chrome.tabs.create({});
            }
        } else if (request.command == "rt") {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        } else if (request.command == "b") {
            try {
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    chrome.tabs.goBack(tabs[0].id);
                });
            } catch (err) {
                console.log(err);
            }
        } else if (request.command == "f") {
            try {
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    chrome.tabs.goForward(tabs[0].id);
                });
            } catch (err) {
                console.log(err);
            }
        }
    });
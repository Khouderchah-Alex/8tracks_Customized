chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: '8tracks.com'},
      })
                  ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (!tab.url.startsWith("https://8tracks.com") &&
      !tab.url.startsWith("http://8tracks.com")) {
    return;
  }

  var title_match = tab.title.match(/►/g);
  if (changeInfo.status == 'complete' ||
      (title_match && title_match.length > 1) ||
      changeInfo.audible != undefined ||
      changeInfo.url != undefined) {
    // If no longer audible, let customize.js know.
    if (changeInfo.audible == false) {
      chrome.tabs.executeScript(tabId, {code:"document.title += '.';"});
    }
    chrome.tabs.executeScript(
      tabId,
      {file: 'customize.js'}
    );
  }
});

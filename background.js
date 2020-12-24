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

  if (changeInfo.status == 'complete' && tab.active) {
    chrome.tabs.executeScript(
      tabId,
      {file: 'customize.js'}
    );
  }
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: '8tracks.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (!tab.url.startsWith('https://8tracks.com') &&
      !tab.url.startsWith('http://8tracks.com')) {
    return;
  }

  // Note: This match is predicated on cVim-8tracks title interactions. If the
  // browser doesn't have cVim and customize.js consequently doesn't need to
  // modify the title, all title change events would likely be fair game here.
  //
  // TODO: Do this match conditionally when different features can be chosen by
  //       the user.
  var title_match = tab.title.match(/►\s*\d+\s/);

  if (changeInfo.status == 'complete' ||
      title_match ||
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

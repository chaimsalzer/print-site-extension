chrome.browserAction.onClicked.addListener(function (tab) {
  // No tabs or host permissions needed!

  // const code = modifyDOM();
  chrome.tabs.executeScript({
    file: "modify-dom.js",
  });
});

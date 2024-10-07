// The background script is now only used for handling notifications
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed and ready.');
});

// Copyright 2019 Faiz Surani, MIT License

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlMatches: 'git(hub|lab)\.com\/[^/]*\/[^/]*\/tree\/master'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.pageAction.onClicked.addListener( function(tabs.Tab tab) {
	let tabUrl = tab.url;
});
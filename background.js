// Copyright 2019 Faiz Surani, MIT License

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlMatches: 'git(hub|lab)\.com\/[^/]*\/[^/]*\/tree\/.*'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.pageAction.onClicked.addListener( function(tab) {
	chrome.extension.getBackgroundPage().console.log('Open in StackEdit triggered');
	let tabUrl = tab.url;
	if (tabUrl.charAt(tabUrl.length - 1) != '/') {
		tabUrl += '/';
	}
	let regEx = new RegExp('https:\\/\\/git(hub|lab)\\.com\\/([^/]*)\\/([^/]*)\\/tree\\/([^/]*)\\/(.*)');
	let match = tabUrl.match(regEx);

	let gitProvider = match[1];
	let repoOwner = match[2];
	let repoName = match[3];
	let branchName = match[4];
	let path = match[5].replace('/', '%2F');

	let stackEditUrl = 'https://stackedit.io/app#providerId=git' + gitProvider + 'Workspace&owner=' + repoOwner + '&repo=' + repoName + '&branch=' + branchName + '&path=' + path;
	chrome.tabs.create({ url: stackEditUrl });
});
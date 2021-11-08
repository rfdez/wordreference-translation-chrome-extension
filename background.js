chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'translation',
        title: 'Translate selection',
        type: 'normal',
        contexts: ['selection']
    });

    chrome.runtime.openOptionsPage();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (tab) {
        if (info.menuItemId === "translation") {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ['utils/contextMenu.js']
            });
        }
    }
})
;

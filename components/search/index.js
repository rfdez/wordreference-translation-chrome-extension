import {get} from "../../utils/storage.js";

function openOptionsPage() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('../options/index.html'));
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const to = await get('toLanguage');
    const from = await get('fromLanguage');
    if (!to || !from) {
        openOptionsPage();
    }
});

document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault();
    window.open("components/translation/index.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
    // chrome.action.setPopup({popup: chrome.runtime.getURL('components/translation/index.html')}, () => {
    //     console.log('set popup');
    // });
});

document.getElementById('options').addEventListener('click', () => {
    openOptionsPage();
});

document.getElementById('open').addEventListener('click', async () => {
    const to = await get('toLanguage');
    const from = await get('fromLanguage');
    if (!to || !from) {
        openOptionsPage();
    } else {
        window.open(`https://www.wordreference.com/${from}${to}/`);
    }
});

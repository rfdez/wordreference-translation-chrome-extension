export async function get(key) {
    const result = await chrome.storage.sync.get([key]);
    return result[key];
}

export async function setFromLanguage(value) {
    await chrome.storage.sync.set({ fromLanguage: value });
}

export async function setToLanguage(value) {
    await chrome.storage.sync.set({ toLanguage: value });
}

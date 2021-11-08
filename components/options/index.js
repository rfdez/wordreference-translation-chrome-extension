import languages from '../../utils/languages.js';
import {get, setFromLanguage, setToLanguage} from '../../utils/storage.js';

function fillDefaultOption(select) {
    const option = document.createElement('option');
    option.value = '';
    option.innerText = 'Select language...';
    option.selected = true;
    option.disabled = true;
    option.hidden = true;
    select.add(option);
}

function fillOptions(languages, select) {
    select.options.length = 0;
    fillDefaultOption(select);

    languages.forEach(l => {
        const key = Object.keys(l)[0];
        const option = document.createElement('option');
        option.value = key;
        option.innerText = l[key];
        select.add(option);
    });
}

function isEmpty(from, to) {
    return from === '' || to === '';
}

function isSame(from, to) {
    return from === to;
}

async function saveOptions() {
    const fromLanguageElement = document.getElementById('fromLanguage');
    const toLanguageElement = document.getElementById('toLanguage');
    const status = document.getElementById('status');

    if (!isEmpty(fromLanguageElement.value, toLanguageElement.value) && !isSame(fromLanguageElement.value, toLanguageElement.value)) {
        await setFromLanguage(fromLanguageElement.value);
        await setToLanguage(toLanguageElement.value);
        status.textContent = 'Options saved.';
        setTimeout(() => {
            status.textContent = '';
        }, 750);
    } else {
        status.textContent = 'Options cannot be empty or the same.';
        setTimeout(() => {
            status.textContent = '';
        }, 750);
    }
}

async function restoreOptions() {
    const fromLanguageElement = document.getElementById('fromLanguage');
    const toLanguageElement = document.getElementById('toLanguage');
    let toLanguagesToFill = languages;

    fillOptions(languages, fromLanguageElement);
    const fromLanguage = await get('fromLanguage');
    if (fromLanguage) {
        fromLanguageElement.value = fromLanguage;
        toLanguagesToFill = languages.filter(l => Object.keys(l)[0] !== fromLanguage);
    }

    fillOptions(toLanguagesToFill, toLanguageElement);
    const toLanguage = await get('toLanguage');
    if (toLanguage) {
        toLanguageElement.value = toLanguage;
    }
}

document.addEventListener('DOMContentLoaded', restoreOptions);

document.getElementById('fromLanguage').addEventListener('change', (event) => {
    const toLanguageElement = document.getElementById('toLanguage');
    const toLanguageSelected = toLanguageElement.value === event.target.value || toLanguageElement.value === '' ? '' : toLanguageElement.value;

    const toLanguages = languages.filter(l => Object.keys(l)[0] !== event.target.value);
    fillOptions(toLanguages, toLanguageElement);

    if (toLanguageSelected !== '') {
        toLanguageElement.value = toLanguageSelected;
    }
});

document.getElementById('save').addEventListener('click', saveOptions);

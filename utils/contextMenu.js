function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

if (document.getSelection().toString().length > 0) {
    fetch(chrome.runtime.getURL('components/translation/index.html')).then(r => r.text()).then(html => {
        const bubble = document.getElementById('wordreference_translation_ext');
        bubble.innerHTML = html;
        const iframe = document.getElementById('wordreference_translation_ext_iframe');
        chrome.storage.sync.get(['fromLanguage', 'toLanguage'], (result) =>{
            const languages = result.fromLanguage + result.toLanguage;
            iframe.src = `https://www.wordreference.com/${languages}/${document.getSelection().toString()}`;
            bubble.style.top = getOffset(document.getSelection().anchorNode.parentElement).top + 'px';
            bubble.style.left = getOffset(document.getSelection().anchorNode.parentElement).left + 'px';
            bubble.style.visibility = 'visible';
        });
    });
}

document.addEventListener('mousedown', function () {
    const bubble = document.getElementById('wordreference_translation_ext');
    bubble.style.visibility = 'hidden';
    bubble.innerHTML = '';
}, false);

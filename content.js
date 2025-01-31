let audioCtx;
let pannerNodes = new WeakMap();

function applyAudioPanning(panValue) {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    document.querySelectorAll("audio, video").forEach(media => {
        if (!pannerNodes.has(media)) {
            let source = audioCtx.createMediaElementSource(media);
            let panner = audioCtx.createStereoPanner();
            panner.pan.value = panValue;

            source.connect(panner).connect(audioCtx.destination);
            pannerNodes.set(media, panner);
        } else {
            pannerNodes.get(media).pan.value = panValue;
        }
    });

    console.log("Audio panned to:", panValue);
}

// Listen for messages from popup.js
browser.runtime.onMessage.addListener((message) => {
    if (message.action === "setPan") {
        applyAudioPanning(message.panValue);
    }
});

// Watch for new audio/video elements (YouTube Fix)
const observer = new MutationObserver(() => applyAudioPanning(0));
observer.observe(document.body, { childList: true, subtree: true });

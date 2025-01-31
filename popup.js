document.getElementById("balanceSlider").addEventListener("input", function () {
    let panValue = parseFloat(this.value);
    document.getElementById("balanceValue").innerText = `Balance: ${panValue}`;

    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, { action: "setPan", panValue });
    });
});

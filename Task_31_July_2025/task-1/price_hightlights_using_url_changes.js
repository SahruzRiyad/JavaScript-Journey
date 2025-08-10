(function () {
    function processPrice(priceEl) {
        if (!priceEl || !priceEl.innerText) return;
        let text = priceEl.innerText.replace(/[^\d.,]/g, "");
        let value = parseFloat(text.replace(/,/g, ''));
       
        if (!isNaN(value)) {
            priceEl.style.color = value > 20 ? "#F55447" : "#868686";
        }
    }

    function processAllPrices() {
        document.querySelectorAll('div[class^="mErEH"]').forEach(processPrice);
    }

    let currentUrl = window.location.href;

    processAllPrices();
})();
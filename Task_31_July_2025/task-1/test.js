(function() {
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

    processAllPrices(); 
    let currentUrl = location.href;

    function handleUrlChange() {
        if (location.href !== currentUrl) {
            currentUrl = location.href;
            console.log("URL changed:", currentUrl);
            setTimeout(processAllPrices, 800); 
        }
    }

    // Patching history API methods
    ['pushState', 'replaceState'].forEach(method => {
        const original = history[method];
        history[method] = function() {
            const result = original.apply(this, arguments);
            handleUrlChange();
            return result;
        };
    });

    window.addEventListener('popstate', handleUrlChange);
})();

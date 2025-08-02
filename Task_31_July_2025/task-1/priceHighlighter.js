(function () {
    function processPrice(priceEl) {
        if (!priceEl || !priceEl.innerText) return;

        let text = priceEl.innerText.replace(/[^\d.,]/g, "");
        let value = parseFloat(text.replace(/,/g, ''));
        
        if (!isNaN(value)) {
            priceEl.style.color = value > 20 ? "#F55447" : "#868686";
        }
    }

    document.querySelectorAll('div[class^="mErEH"]').forEach(processPrice);

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { 
                    
                        if (node.matches && node.matches('div[class^="mErEH"]')) {
                            processPrice(node);
                        } else {
                            node.querySelectorAll?.('div[class^="mErEH"]').forEach(processPrice);
                        }
                    }
                });
            }
        }
    });

    const container = document.querySelector('main') || document.body;
    observer.observe(container, { childList: true, subtree: true });

})();

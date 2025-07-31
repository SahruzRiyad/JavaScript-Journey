(function () {
    function highlightPrices() {
        document.querySelectorAll('div[class^="mErEH"]').forEach((priceEl) => {
            let text = priceEl.innerText.replace(/[^\d.,]/g, "");
            let value = parseFloat(text.replace(/,/g, ''));
            if (!isNaN(value) && value > 20) {
                priceEl.style.color = "#F55447";
            }

            // Changing less than 20 to normal color
            else if (!isNaN(value) && value <= 20){
                priceEl.style.color = "#868686"
            }
        });
    }

    function initObserver() {
        const container = document.querySelector("main");
        if (!container) {
            console.log("Waiting for container...");
            setTimeout(initObserver, 1000);
            return;
        }

        highlightPrices();

        const observer = new MutationObserver(() => {
            highlightPrices();
        });

        observer.observe(container, { childList: true, subtree: true });
    }

    initObserver();

})();

(function () {
    const selectedValues = { monthly: null, once: null };
    const defaultIndex = 1;

    function applySelectionFor(type, selector, defaultIndex) {
        const radios = document.querySelectorAll(selector);

        if (radios.length > 0) {
            if (selectedValues[type]) {
                radios.forEach(radio => {
                    radio.checked = (radio.id === selectedValues[type]);
                });
            } else {
                radios.forEach(radio => (radio.checked = false));
                radios[defaultIndex].checked = true;
                selectedValues[type] = radios[defaultIndex].id;
            }
        }
    }

    function applySelection() {

        applySelectionFor('monthly', 'input.donate__radio[id*="monthlyamount"]', defaultIndex);
        applySelectionFor('once', 'input.donate__radio[id*="singleamount"]', defaultIndex);
    }

    document.body.addEventListener('change', function (e) {
        if (e.target.matches('input.donate__radio[id*="monthlyamount"]')) {
            selectedValues.monthly = e.target.id;
        }
        if (e.target.matches('input.donate__radio[id*="singleamount"]')) {
            selectedValues.once = e.target.id;
        }
    });

    applySelection();

    const observer = new MutationObserver(() => {
        applySelection();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();

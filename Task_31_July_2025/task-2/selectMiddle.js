(function () {

    const formsState = []; 
    const defaultIndex = 1;

    function applySelectionFor(type, selector, form, formIndex) {

        const radios = form.querySelectorAll(selector);

        if (radios.length > 0) {

            if (!formsState[formIndex]) {
                formsState[formIndex] = { monthly: null, once: null };
            }

            const selectedId = formsState[formIndex][type];

            if (selectedId && form.querySelector(`#${selectedId}`)) {
                radios.forEach(radio => {
                    radio.checked = (radio.id === selectedId);
                });
            } 
            else {
                radios.forEach(radio => (radio.checked = false));
                if (radios[defaultIndex]) {
                    radios[defaultIndex].checked = true;
                    formsState[formIndex][type] = radios[defaultIndex].id;
                }
            }
        }
    }

    function applyAllSelections() {
        const donationForms = document.querySelectorAll('form[action*="/Giving/Donate"]');
        
        donationForms.forEach((form, index) => {
            form.dataset.formIndex = index; 
            
            applySelectionFor('monthly', 'input.donate__radio[id*="monthlyamount"]', form, index);
            applySelectionFor('once', 'input.donate__radio[id*="singleamount"]', form, index);
        });
    }

    document.body.addEventListener('change', function (e) {
        if (e.target.matches('input.donate__radio[id*="monthlyamount"], input.donate__radio[id*="singleamount"]')) {
            const parentForm = e.target.closest('form[action*="/Giving/Donate"]');

            if (parentForm && parentForm.dataset.formIndex) {
                const formIndex = parseInt(parentForm.dataset.formIndex, 10);
                
                if (e.target.matches('input.donate__radio[id*="monthlyamount"]')) {
                    formsState[formIndex].monthly = e.target.id;
                }
                if (e.target.matches('input.donate__radio[id*="singleamount"]')) {
                    formsState[formIndex].once = e.target.id;
                }
            }
        }
    });

    applyAllSelections();

    const observer = new MutationObserver(() => {
        applyAllSelections();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
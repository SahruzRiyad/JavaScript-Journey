(function () {
	function setMiddleDefault() {
		document.querySelectorAll('input[id*="amount-2"]').forEach((radio) => {
			radio.click();
		});
	}

	setMiddleDefault();
	const observer = new MutationObserver(() => {
		setMiddleDefault();
	});

	observer.observe(document.body, { childList: true, subtree: true });

	document.addEventListener('change', (e) => {
        if (e.target.matches('input[id*="amount-"]')) {
            observer.disconnect(); // Stop observing
        }
    });

})();

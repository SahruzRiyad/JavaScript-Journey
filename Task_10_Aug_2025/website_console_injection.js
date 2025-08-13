(function(){
    // --- CSS ---
    const css = `
    :root { --faq-panel-width: 350px; }
    body { font-family: sans-serif; height: 200vh; }
    .faq-header { display: none; }
    .faq-widget-container { position: fixed; top: 50%; right: 0; transform: translateY(-50%); z-index: 1000; display: flex; align-items: center; padding: 0; }
    .faq-panel { width: var(--faq-panel-width); background: white; padding: 24px; border-radius: 16px 0 0 16px; box-shadow: -5px 0px 25px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column; height: 360px; margin-right: calc(-1 * var(--faq-panel-width)); opacity: 0; visibility: hidden; transition: margin-right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease, visibility 0.4s; }
    .faq-tab { background-color: #0073e6; color: white; padding: 15px 10px; cursor: pointer; writing-mode: vertical-rl; transform: rotate(180deg); border-radius: 8px 0 0 8px; font-weight: bold; user-select: none; box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.15); transition: background-color 0.2s; }
    .faq-tab:hover { background-color: #005cb3; }
    .faq-widget-container.is-open .faq-panel { margin-right: 0; opacity: 1; visibility: visible; }
    .faq-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); opacity: 0; visibility: hidden; transition: opacity 0.4s ease, visibility 0.4s ease; z-index: 999; }
    .faq-widget-container.is-open + .faq-overlay { visibility: visible; }
    .faq-search-form { display: flex; align-items: center; position: relative; margin-bottom: 20px; }
    .faq-search-form .search-icon { position: absolute; left: 12px; color: #888; }
    .faq-search-input { width: 100%; padding: 10px 10px 10px 40px; border: 1px solid #ddd; border-radius: 20px; font-size: 1rem; outline: none; }
    .faq-list { list-style: none; padding: 0; margin: 0; overflow-y: auto; }
    .faq-list li a { display: flex; justify-content: space-between; align-items: center; padding: 15px 5px; color: #0073e6; text-decoration: none; border-bottom: 1px solid #f0f0f0; }
    .faq-list li a:hover .faq-text { text-decoration: underline; text-decoration-color: #0073e6; text-underline-offset: 3px; }
    /* --- MOBILE STYLES --- */
    @media (max-width: 600px) {
    .faq-widget-container { position: static; transform: none; display: block; }
    .faq-tab { position: fixed; top: 50%; right: 0; transform: translateY(-50%) rotate(180deg); z-index: 998; padding: 12px 8px; font-size: 0.9rem; background-color: #0062D2; border-radius: 6px 0 0 6px; transition: right 0.4s ease; }
    .faq-panel { position: fixed; top: 0; left: 0; width: 100%; height: 100%; max-height: 100vh; border-radius: 0; box-shadow: none; padding: 13px; margin: 0; opacity: 1; z-index: 1001; display: flex; flex-direction: column; visibility: hidden; transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.4s; }
    .faq-widget-container.is-open .faq-panel { transform: translateY(0); visibility: visible; }
    .faq-widget-container.is-open .faq-tab { display: none; }
    .faq-header { display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; border-bottom: 1px solid #e0e0e0; flex-shrink: 0; }
    .faq-title { margin: 0; font-size: 1.1rem; font-weight: 600; }
    .faq-close-btn { background: none; border: none; font-size: 2.2rem; font-weight: 300; line-height: 1; cursor: pointer; color: #888; padding: 0 5px; }
    .faq-content { padding: 0 20px 20px 20px; overflow-y: auto; flex-grow: 1; }
    .faq-search-form { position: relative; margin-top: 20px; margin-bottom: 20px; margin-right: 23px; }
    .faq-arrow { margin-right: 15px;}
    }
    `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    // --- HTML ---
    const html = `
    <div class="faq-widget-container" id="faq-widget">
        <div class="faq-tab" id="faq-tab">Popular FAQS</div>
        <div class="faq-panel">
            <div class="faq-header">
                <h2 class="faq-title">Popular FAQS</h2>
                <button class="faq-close-btn" id="faq-close-btn" aria-label="Close FAQs">&times;</button>
            </div>
            <form class="faq-search-form" id="faq-search-form" action="/faq/search" method="get">
                <span class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
                <input type="text" name="q" class="faq-search-input" placeholder="Search FAQs">
            </form>
            <ul class="faq-list" id="faq-list"></ul>
        </div>
    </div>
    <div class="faq-overlay" id="faq-overlay"></div>
    `;
    document.body.insertAdjacentHTML("beforeend", html);

    // --- JS ---
    (function(){
        // Defining FAQs
        const faqsContent = {
            'default': [
                { text: 'Stop-Motion Animation Upgrade Service', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1955953&productTcmUri=tcm:14-1723696' },
                { text: 'Latest Firmware Update – Version 1.8.0', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-2035310&productTcmUri=tcm:14-1723696' },
                { text: 'Regarding the security advisory for Canon digital cameras related to PTP', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1533883&productTcmUri=tcm:14-1723696' },
                { text: 'Latest Firmware Update – Version 1.1.0', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1806998&productTcmUri=tcm:14-1723696' },
                { text: 'Cautions concerning counterfeit accessories of digital cameras and video camcorders', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1150281&productTcmUri=tcm:14-1723696' }
            ],
            'warranty': [
                { text: 'Warranty Terms & Conditions', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1860628&productTcmUri=tcm:14-1723696' },
                { text: 'How to Register Warranty', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1860582&productTcmUri=tcm:14-1723696' }
            ],
            'wifi_connectivity': [
                { text: 'Firmware upgrade', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1971266&productTcmUri=tcm:14-1723696' },
                { text: 'Link to Printed User Manual page', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1971276&productTcmUri=tcm:14-1723696' }
            ],
            'setup':[
                { text: 'Canon Store' , link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1970512&productTcmUri=tcm:14-1723696' },
                { text: 'Downloadable content' , link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1970500&productTcmUri=tcm:14-1723696' },
                { text: 'Canon ID' , link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1970518&productTcmUri=tcm:14-1723696' },
                { text: 'image.canon' , link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1970519&productTcmUri=tcm:14-1723696' }
            ],
            'cashback': [
                { text: 'Cashback Proof of Purchase', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1860545&productTcmUri=tcm:14-1723696' },
                { text: 'Cashback Queries', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1803669&productTcmUri=tcm:14-1723696' },
                { text: 'Cashback & Promotions Terms & Conditions', link: 'https://www.canon.co.uk/support/consumer/products/cameras/eos-r/eos-r.html?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=tcm:14-1860478&productTcmUri=tcm:14-1723696' }
            ]
        };

        // --- DOM Element Selection ---
        const faqWidget = document.getElementById('faq-widget');
        const faqTab = document.getElementById('faq-tab');
        const faqOverlay = document.getElementById('faq-overlay');
        const faqList = document.getElementById('faq-list');
        const faqSearchForm = document.getElementById('faq-search-form');

        // --- toggle and close Widget functions ---
        function toggleWidget() { faqWidget.classList.toggle('is-open'); }
        function closeWidget() { faqWidget.classList.remove('is-open'); }

        // --- render faq list ---
        function renderFaqs(list) {
            faqList.innerHTML = '';
            list.forEach(faq => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${faq.link}" target="_blank"><span class="faq-text">${faq.text}</span><span class="faq-arrow">→</span></a>`;
                faqList.appendChild(li);
            });
        }

        // --- handle search option in search input field --- 
        function handleSearch(event) {
            const query = event.target.value.trim();
            const results = [];

            if (query) {
                const keywords = query.toLowerCase().split(" ");
                for (const category in faqsContent) {
                    faqsContent[category].forEach(item => {
                        if (keywords.some(word => item.text.toLowerCase().includes(word))) {
                            results.push({ ...item });
                        }
                    });
                }

                renderFaqs(results);
            }
            else{
                renderFaqs(faqsContent.default);
            }
        }

        // --- Event Listeners ---
        faqTab.addEventListener('click', toggleWidget);
        faqOverlay.addEventListener('click', closeWidget);

        const searchInput = faqSearchForm.querySelector('.faq-search-input');
        searchInput.addEventListener('input', handleSearch);

        const faqCloseBtn = document.getElementById('faq-close-btn');
        faqCloseBtn.addEventListener('click', closeWidget)
        
        // Escape key press also close the widget
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeWidget();
            }
        });

          // --- Render FAQS ---
        renderFaqs(faqsContent.default);
        
    })();
})();

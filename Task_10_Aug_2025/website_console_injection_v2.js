(function(){
    // --- CSS --- 
    const css = `
    :root { --faq-panel-width: 340px;}
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; height: 200vh; margin: 0; background: #f5f5f5; }
    .faq-header { display: none; }
    .faq-widget-container { position: fixed; top: 50%; right: 0; transform: translateY(-50%); z-index: 1000; display: flex; align-items: center; padding: 0;}
    .faq-panel { width: var(--faq-panel-width); background: white; padding: 24px; border-radius: 16px 0 0 16px; box-shadow: -5px 0px 25px rgba(0, 0, 0, 0.15); display: flex; flex-direction: column; height: 318px; margin-right: calc(-1 * var(--faq-panel-width)); /* opacity: 0; */ visibility: hidden; transition: margin-right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease, visibility 0.4s; }
    .faq-tab { background-color: #0066cc; color: white; padding: 32px 9px; cursor: pointer; writing-mode: vertical-rl; transform: rotate(180deg); border-radius: 0px 8px 8px 0px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; user-select: none; box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.15); transition: background-color 0.2s; }
    .faq-tab:hover { background-color: #0052a3; }
    .faq-widget-container.is-open .faq-panel { margin-right: 0; visibility: visible; }
    .faq-overlay { position: fixed;  top: 0;  left: 0;  width: 100%;  height: 100%; background-color: rgba(0, 0, 0, 0.5); opacity: 0;  visibility: hidden; transition: opacity 0.4s ease, visibility 0.4s ease; z-index: 999; }
    .faq-widget-container.is-open + .faq-overlay { visibility: visible; }
    .faq-search-form { display: flex; align-items: center; position: relative; margin-bottom: 24px; }
    .faq-search-form .search-icon { position: absolute; left: 16px; color: #666;font-size: 16px;width: 16px;height: 16px; }
    .faq-search-input { width: 100%; padding: 12px 16px 12px 44px; border: 1px solid #e1e5e9; border-radius: 24px; font-size: 14px; outline: none;background: #f8f9fa;transition: border-color 0.2s, background-color 0.2s; }
    .faq-search-input:focus { border-color: #0066cc; background: white; }
    .faq-search-input::placeholder { color: #8a8a8a; }
    .faq-list { list-style: none; padding: 0; margin: 0; overflow-y: auto;flex-grow: 1; }
    .faq-list li { margin-bottom: 1px; }
    .faq-list li a { display: flex; justify-content: space-between; align-items: center; padding: 16px 8px; color: #0066cc; text-decoration: none; border-radius: 8px;font-size: 14px;font-weight: 500;line-height: 1.4;transition: background-color 0.2s; }
    .faq-list li a:hover { background-color: #f0f7ff; }
    .faq-text { flex-grow: 1; margin-right: 12px; }
    .faq-arrow { width: 18px; height: 18px; border: 2px solid #0066cc; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0; position: relative; }
    .faq-arrow::after { content: '>'; transform: translateX(1px); }
    /* Responsive for mobile */
    @media (max-width: 600px) {
    .faq-widget-container { position: static; transform: none; display: block; }
    .faq-tab { position: fixed; top: 50%; right: 0; transform: translateY(-50%) rotate(180deg); z-index: 998; padding: 40px 12px; font-size: 13px; background-color: #0066cc; border-radius: 6px 0 0 6px; transition: right 0.4s ease; }
    .faq-panel { position: fixed; top: 0; left: 0; width: 100%; height: 100%; max-height: 100vh; border-radius: 0; box-shadow: none; padding: 0; margin: 0; opacity: 1; z-index: 1001; display: flex; flex-direction: column; visibility: hidden; transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.4s; }
    .faq-widget-container.is-open .faq-panel { transform: translateY(0); visibility: visible; }
    .faq-widget-container.is-open .faq-tab { display: none; }
    .faq-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #e1e5e9; flex-shrink: 0; background: white; }
    .faq-title { margin: 0; font-size: 18px; font-weight: 600; color: #333; }
    .faq-close-btn { background: none;  border: none;  font-size: 24px; font-weight: 300; line-height: 1; cursor: pointer;  color: #666;  padding: 4px 8px; border-radius: 4px; transition: background-color 0.2s; }
    .faq-close-btn:hover { background-color: #f0f0f0; }
    .faq-content { padding: 20px; overflow-y: auto; flex-grow: 1; }
    .faq-search-form { position: relative; margin-bottom: 20px;}
    }`;
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
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                    <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
                </svg>
                <input type="text" name="q" class="faq-search-input" placeholder="Search FAQs">
            </form>
            <ul class="faq-list" id="faq-list"></ul>
        </div>
    </div>
    <div class="faq-overlay" id="faq-overlay"></div>
    `;
    document.body.insertAdjacentHTML("beforeend", html);

    // --- JavaScript --- 
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
                li.innerHTML = `<a href="${faq.link}" target="_blank"><span class="faq-text">${faq.text}</span><span class="faq-arrow"></span></a>`;
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
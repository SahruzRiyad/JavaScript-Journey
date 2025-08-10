document.addEventListener('DOMContentLoaded', () => {

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
    // const contextSelector = document.getElementById('context-select'); 

    // --- toggle and close Widget functions ---
    function toggleWidget() {
        faqWidget.classList.toggle('is-open');
    }
    
    function closeWidget() {
        faqWidget.classList.remove('is-open');
    }

    function renderFaqs(context) {
        const faqs = context;
        faqList.innerHTML = '';
        faqs.forEach(faq => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <a href="${faq.link}" target="_blank" rel="noopener noreferrer">
                    <span class="faq-text">${faq.text}</span>
                    <span class="faq-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </span>
                </a>
            `;
            faqList.appendChild(listItem);
            console.log(listItem);
        });
    }

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

    // Escape key press also close the widget
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeWidget();
        }
    });

    // contextSelector.addEventListener('change', (event) => {
    //     const newContext = event.target.value;
    //     document.body.dataset.pageContext = newContext;
    //     renderFaqs(newContext);
    // });

    // --- Render FAQS ---
    renderFaqs(faqsContent.default);
});
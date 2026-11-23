const tabs = Array.from(document.querySelectorAll(".tabs"));
const panels = Array.from(document.querySelectorAll("[data-tab-panel]"));
let selected = 0;

function selectTab(index) {
    const activeTab = tabs[index];
    if (!activeTab) {
        throw new RangeError(`No tab exists at index ${index}.`);
    }   

    const activePanel = panels.find((panel) => panel.dataset.tabPanel === activeTab.dataset.tab);
    if (!activePanel) {
        throw new Error(`No panel exists for tab "${activeTab.dataset.tab}".`);
    }

    selected = index;
    tabs.forEach((tab, tabIndex) => {
        const isSelected = tabIndex === selected;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
    });

    panels.forEach((panel) => {
        panel.hidden = panel !== activePanel;
    });
}

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(index));
});

selectTab(selected);

function seeProducts() {
    document.querySelector("#community-tab").click();
}
function filterProduct(inputElement) {
    const productsArea = document.querySelector("#product-area");
    const products = Array.from(productsArea.querySelectorAll(".btns-ads"));

    inputElement.addEventListener("input", () => {
        const query = inputElement.value.trim().toLowerCase();

        products.forEach(product => {
            product.hidden = !product.textContent.toLowerCase().includes(query);
        });
    });
}

filterProduct(document.querySelector("#product-search"));

const helpForm = document.querySelector("#help-form");
const helpMessage = document.querySelector("#help-message");
function openContactEmail() {
    const message = helpMessage.value.trim();
    if (!message) {
        return;
    }

    const params = new URLSearchParams({
        view: "cm",
        fs: "1",
        to: "esdrastetangtetang@gmail.com",
        su: "Horizon contact",
        body: message
    });
    window.location.href = `https://mail.google.com/mail/?${params.toString()}`;
}

helpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    openContactEmail();
});

helpMessage.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        openContactEmail();
    }
});
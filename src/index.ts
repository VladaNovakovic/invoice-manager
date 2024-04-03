import "./styles/main.scss";
import {InvoiceView} from "./view/InvoiceView";

function init() {
    const invoiceDataRaw = [
        {id: 1, itemName: "item one", unitPrice: 109, quantity: 1},
        {id: 3, itemName: "item two", unitPrice: 59, quantity: 2},
        {id: 4, itemName: "item three", unitPrice: 29, quantity: 1},
        {id: 13, itemName: "item four", unitPrice: 19, quantity: 3},
        {id: 19, itemName: "item five", unitPrice: 79, quantity: 1},
    ];

    const invoiceView = new InvoiceView(document, invoiceDataRaw);
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});
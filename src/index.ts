// import { subtract } from "./view/AppView";
// import styles from "./main.scss";
// import "./main.scss";
import "./styles/normalize.scss";
import "./styles/main.scss";
import "./styles/form.scss";
import "./styles/button.scss";
import "./styles/result.scss";
import "./styles/input.scss";
// import {InvoiceItemData} from "./model/types";
// import {Invoice} from "./model/Invoice";
import {InvoiceView} from "./view/InvoiceView";
// import {InvoiceController} from "./controller/InvoiceController";

// todo create class
function init() {
    // const form = document.querySelector("form");
    // form?.addEventListener("submit", submitHandler);
    // document.removeChild(form);

    const invoiceDataRaw = [
        {id: 1, itemName: "item one", unitPrice: 109, quantity: 1},
        {id: 3, itemName: "item two", unitPrice: 59, quantity: 2},
        {id: 4, itemName: "item three", unitPrice: 29, quantity: 1},
        {id: 13, itemName: "item four", unitPrice: 19, quantity: 3},
        {id: 19, itemName: "item five", unitPrice: 79, quantity: 1},
    ];

    const invoiceView = new InvoiceView(document, invoiceDataRaw);

    // invoiceView.populateDataTable(dataProvider.getInvoiceItemsList());
    // invoiceView.addListenersToTotalInputs();
    // populateDataTable(dataProvider.getInvoiceDataArray());
}

// function submitHandler(e: Event) {
//     e.preventDefault();
//     const num1 = document.querySelector("input[name='firstnumber']") as HTMLInputElement;
//     const num2 = document.querySelector("input[name='secondnumber']") as HTMLInputElement;
//     const result = subtract(Number(num1.value), Number(num2.value));
//     const resultElement = document.querySelector("p");
//     if (resultElement) {
//         resultElement.textContent = result.toString();
//     }
// }

document.addEventListener("DOMContentLoaded", function() {
    // this function runs when the DOM is ready, i.e. when the document has been parsed

    init();
});
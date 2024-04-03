import "./styles/main.scss";
import {InvoiceView} from "./view/InvoiceView";

function init() {
    const invoiceDataRaw = {
        id: '#11331',
        customerName: "Sonke Sprink",
        customerId: "#9000305",
        items: [
            {id: 1, itemName: "Freunde Club Premium - Abo Performance date 19/03/24 - 18/04/24", unitPrice: 109, quantity: 1},
            {id: 3, itemName: "Inklusive FREUNDE CHRONIK Print-Ausgabe Performance date 19/03/24 - 18/04/24", unitPrice: 59, quantity: 2},
            {id: 4, itemName: "FREUNDE CLUB Performance date 19/03/24 - 18/04/24", unitPrice: 29, quantity: 1},
            {id: 13, itemName: "Inklusive FREUNDE SPEZIAL Print-Ausgebe Performance date 19/03/24 - 18/04/24", unitPrice: 19, quantity: 3},
            {id: 19, itemName: "Inklusive der digitalen FREUNDE Ausgaben Performance date 19/03/24 - 18/04/24", unitPrice: 79, quantity: 1},
        ]
    };

    const invoiceView = new InvoiceView(document, invoiceDataRaw);
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});
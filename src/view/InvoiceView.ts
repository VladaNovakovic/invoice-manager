import {InvoiceController} from "../controller/InvoiceController";
import {InvoiceItemData, InvoiceListRecord} from "../model/types";
import {Invoice} from "../model/Invoice";
import {InvoiceUiElementsFactory} from "../InvoiceUiElementsFactory";
import {InvoiceItemView} from "./InvoiceItemView";
import {delay} from "../Utils";

export class InvoiceView {
    private readonly document: Document;
    private readonly dataTable: HTMLElement;
    private readonly invoiceController: InvoiceController;
    private readonly invoice: Invoice;
    private readonly invoiceFactory: InvoiceUiElementsFactory;
    private readonly invoiceItemViewArray: InvoiceItemView[] = [];

    constructor(document: Document, invoiceData: InvoiceItemData[]) {
        this.document = document;

        this.invoice = new Invoice(invoiceData);
        this.invoiceController = new InvoiceController(this.invoice);
        this.invoiceFactory = new InvoiceUiElementsFactory();

        this.dataTable = document.querySelector('tbody[data-name="invoice-table-body"]');

        this.populateDataTable(this.invoice.getInvoiceItemsList());
    }

    public populateDataTable(dataList: InvoiceListRecord): void {
        for (let itemId in dataList) {
            const invoiceItemView = new InvoiceItemView(dataList[itemId], this.invoiceFactory, this.dataTable, () => { this.updateTotals(); });
            this.invoiceItemViewArray.push(invoiceItemView);
        }

        this.addListenersToTotalInputs();
        this.addListenersToButtons();
        this.updateTotals();
    }

    public updateView() {
        this.updateTotals();
        this.invoiceItemViewArray.forEach((invoiceItemView: InvoiceItemView) => {
            invoiceItemView.updateView();
        });
    }

    public updateTotals() {
        const totalValueInput = this.document.querySelector('input[data-name="totalDiscountedAmountEuroInput"]') as HTMLInputElement;
        const totalValue = this.document.querySelector('td[data-name="totalAmount"]');
        totalValueInput.value = this.invoice.getInvoiceTotal().toFixed(2).toString();
        totalValue.innerHTML = this.invoice.getInvoiceTotal().toFixed(2).toString() + " €";

        const discountedAmountInput = this.document.querySelector('input[data-name="totalDiscountEuroInput"]') as HTMLInputElement;
        const discountedAmount = this.document.querySelector('td[data-name="discountAmount"]');
        discountedAmountInput.value = this.invoice.getDiscountedAmount().toFixed(2).toString();
        discountedAmount.innerHTML = this.invoice.getDiscountedAmount().toFixed(2).toString() + " €";

        const originalValue = this.document.querySelector('td[data-name="originalPriceAmount"]');
        originalValue.innerHTML = this.invoice.getOriginalPrice().toFixed(2).toString() + " €";
    }

    public addListenersToButtons(): void {
        const generalTabButon = this.document.querySelector('div[data-name="generalTabButton"]');
        const invoiceItemsTabButton = this.document.querySelector('div[data-name="invoiceItemsTabButton"]');
        const saveButton = this.document.querySelector('button[data-name="saveButton"]');
        const cancelButton = this.document.querySelector('button[data-name="cancelButton"]');
        const headerCancelButton = this.document.querySelector('button[data-name="headerCancelButton"]');


        generalTabButon.addEventListener("click", (event: InputEvent) => {
            console.log("SWITCH TO GENERAL TAB");
        });
        invoiceItemsTabButton.addEventListener("click", (event: InputEvent) => {
            console.log("SWITCH TO INVOICE ITEMS TAB");
        });
        saveButton.addEventListener("click", (event: InputEvent) => {
            console.log("SAVE BUTTON CLICK");
        });
        cancelButton.addEventListener("click", (event: InputEvent) => {
            console.log("CANCEL BUTTON CLICK");
        });
        headerCancelButton.addEventListener("click", (event: InputEvent) => {
            console.log("HEADER CANCEL BUTTON CLICK");
        });

    }

    public addListenersToTotalInputs(): void {
        const percentageDiscountInput = this.document.querySelector("input[data-name='totalDiscountPercentageInput']") as HTMLInputElement;
        const eurDiscountInput = this.document.querySelector("input[data-name='totalDiscountEuroInput']") as HTMLInputElement;
        const discountedAmountEurInput = this.document.querySelector("input[data-name='totalDiscountedAmountEuroInput']") as HTMLInputElement;

        percentageDiscountInput.addEventListener("change", (event: InputEvent) => {
            this.invoiceController.handleTotalPercentageChange(event);
            this.updateView();
        });
        percentageDiscountInput.addEventListener("keyup", delay((event: InputEvent) => {
            this.invoiceController.handleTotalPercentageChange(event);
            this.updateView();
        }, 250));

        eurDiscountInput.addEventListener("change", (event: InputEvent) => {
            this.invoiceController.handleTotalAmountChange(event);
            this.updateView();
        });
        eurDiscountInput.addEventListener("keyup", delay((event: InputEvent) => {
            this.invoiceController.handleTotalAmountChange(event);
            this.updateView();
        }, 250));

        discountedAmountEurInput.addEventListener("change", (event: InputEvent) => {
            this.invoiceController.handleTotalDiscountedAmountChange(event);
            this.updateView();
        });
        discountedAmountEurInput.addEventListener("keyup", delay((event: InputEvent) => {
            this.invoiceController.handleTotalDiscountedAmountChange(event);
            this.updateView();
        }, 250));
    }
}
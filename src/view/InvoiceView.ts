import {InvoiceController} from "../controller/InvoiceController";
import {InvoiceItemData, InvoiceListRecord} from "../model/types";
import {Invoice} from "../model/Invoice";
import {InvoiceUiElementsFactory} from "../InvoiceUiElementsFactory";
import {InvoiceItemView} from "./InvoiceItemView";

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
        totalValueInput.value = this.invoice.getInvoiceTotal().toString();
        totalValue.innerHTML = this.invoice.getInvoiceTotal().toString();

        const discountedAmountInput = this.document.querySelector('input[data-name="totalDiscountEuroInput"]') as HTMLInputElement;
        const discountedAmount = this.document.querySelector('td[data-name="discountAmount"]');
        discountedAmountInput.value = this.invoice.getDiscountedAmount().toString();
        discountedAmount.innerHTML = this.invoice.getDiscountedAmount().toString();

        const originalValue = this.document.querySelector('td[data-name="originalPriceAmount"]');
        originalValue.innerHTML = this.invoice.getOriginalPrice().toString();
    }

    public addListenersToTotalInputs(): void {
        const percentageDiscountInput = this.document.querySelector("input[data-name='totalDiscountPercentageInput']") as HTMLInputElement;
        const eurDiscountInput = this.document.querySelector("input[data-name='totalDiscountEuroInput']") as HTMLInputElement;
        const discountedAmountEurInput = this.document.querySelector("input[data-name='totalDiscountedAmountEuroInput']") as HTMLInputElement;

        percentageDiscountInput.addEventListener("change", (event: InputEvent) => {
            this.invoiceController.handleTotalPercentageChange(event);
            this.updateView();
        });
        eurDiscountInput.addEventListener("change", (event: InputEvent) => {
            this.invoiceController.handleTotalAmountChange(event);
            this.updateView();
        });
        discountedAmountEurInput.addEventListener("change", (event: InputEvent) => {
            this.invoiceController.handleTotalDiscountedAmountChange(event);
            this.updateView();
        });
    }
}
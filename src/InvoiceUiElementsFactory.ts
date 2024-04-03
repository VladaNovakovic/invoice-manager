export class InvoiceUiElementsFactory {
    private readonly invoiceRowTemplate: HTMLElement;
    private readonly dataTable: HTMLElement;

    constructor() {
        this.dataTable = document.querySelector('tbody[data-name="invoice-table-body"]');
        this.invoiceRowTemplate = document.querySelector("tr[data-name='invoice-row']");

        this.dataTable.removeChild(this.invoiceRowTemplate);
    }

    public createInvoiceItemElement(): HTMLElement {
        return this.invoiceRowTemplate.cloneNode(true) as HTMLElement;
    }
}
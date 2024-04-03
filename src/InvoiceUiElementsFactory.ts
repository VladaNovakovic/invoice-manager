export class InvoiceUiElementsFactory {
    private readonly invoiceRowTemplate: HTMLElement;
    private readonly invoiceRowMobileTemplate: HTMLElement;
    private readonly invoiceRowMobileHeaderTemplate: HTMLElement;
    private readonly dataTable: HTMLElement;

    constructor() {
        this.dataTable = document.querySelector('tbody[data-name="invoice-table-body"]');
        this.invoiceRowTemplate = document.querySelector("tr[data-name='invoice-row']");
        this.invoiceRowMobileTemplate = document.querySelector("tr[data-name='invoice-row-mobile']");
        this.invoiceRowMobileHeaderTemplate = document.querySelector("tr[data-name='invoice-row-mobile-header']");

        this.dataTable.removeChild(this.invoiceRowTemplate);
        this.dataTable.removeChild(this.invoiceRowMobileTemplate);
        this.dataTable.removeChild(this.invoiceRowMobileHeaderTemplate);
    }

    public createInvoiceItemElement(): HTMLElement {
        return this.invoiceRowTemplate.cloneNode(true) as HTMLElement;
    }

    public createInvoiceItemMobileElement(): HTMLElement {
        return this.invoiceRowMobileTemplate.cloneNode(true) as HTMLElement;
    }

    public createInvoiceItemMobileHeaderElement(): HTMLElement {
        return this.invoiceRowMobileHeaderTemplate.cloneNode(true) as HTMLElement;
    }
}
import {Invoice} from "../model/Invoice";

export class InvoiceController {
    public readonly invoice: Invoice;

    constructor(dataProvider: Invoice) {
        this.invoice = dataProvider;
    }

    // todo maybe move this to Invoice.ts
    public handleTotalPercentageChange(event: InputEvent): void {
        const invoiceOriginalPrice = this.invoice.getOriginalPrice();
        const value = parseFloat((event.target as HTMLInputElement).value);
        const invoiceDiscount = (invoiceOriginalPrice * value) / 100;
        const discountPerItem = invoiceDiscount / this.invoice.itemCount;

        const invoiceItemsRecord = this.invoice.getInvoiceItemsList();
        for(const invoiceItemKey in invoiceItemsRecord) {
            invoiceItemsRecord[invoiceItemKey].applyDiscountAmount(discountPerItem)
        }
    }

    public handleTotalAmountChange(event: InputEvent): void {
        const value = parseFloat((event.target as HTMLInputElement).value);
        const discountPerItem = value / this.invoice.itemCount;

        const invoiceItemsRecord = this.invoice.getInvoiceItemsList();
        for(const invoiceItemKey in invoiceItemsRecord) {
            invoiceItemsRecord[invoiceItemKey].applyDiscountAmount(discountPerItem)
        }
    }

    public handleTotalDiscountedAmountChange(event: Event): void {
        const invoiceOriginalPrice = this.invoice.getOriginalPrice();
        const value = parseFloat((event.target as HTMLInputElement).value);
        const invoiceDiscount = invoiceOriginalPrice - value;
        const discountPerItem = invoiceDiscount / this.invoice.itemCount;

        const invoiceItemsRecord = this.invoice.getInvoiceItemsList();
        for(const invoiceItemKey in invoiceItemsRecord) {
            invoiceItemsRecord[invoiceItemKey].applyDiscountAmount(discountPerItem)
        }
    }
}
import {InvoiceItemData, InvoiceListRecord} from "./types";
import {InvoiceItem} from "./InvoiceItem";

export class Invoice {
    private readonly invoiceListData: InvoiceListRecord;

    constructor(invoiceDataRaw: InvoiceItemData[]) {
        this.invoiceListData = {};

        invoiceDataRaw.forEach((item: InvoiceItemData, index: number) => {
             this.invoiceListData[item.id] = new InvoiceItem(item);
        });
    }

    public get itemCount(): number {
        let sum = 0;
        for(const itemKey in this.invoiceListData) {
            sum++;
        }

        return sum;
    }

    public getInvoiceItemsList(): InvoiceListRecord {
        return this.invoiceListData;
    }

    public getInvoiceItemById(id: number): InvoiceItem {
        return this.invoiceListData[id];
    }

    public getInvoiceTotal(): number {
        let sum = 0;
        for(const itemKey in this.invoiceListData) {
            sum += this.invoiceListData[itemKey].itemPrice;
        }

        return sum;
    }

    public getOriginalPrice(): number {
        let sum = 0;
        for(const itemKey in this.invoiceListData) {
            sum += this.invoiceListData[itemKey].originalPrice;
        }

        return sum;
    }

    public getDiscountedAmount(): number {
        let sum = 0;
        for(const itemKey in this.invoiceListData) {
            sum += this.invoiceListData[itemKey].discountAmountEur;
        }

        return sum;
    }
}
import {InvoiceData, InvoiceItemData, InvoiceListRecord} from "./types";
import {InvoiceItem} from "./InvoiceItem";

export class Invoice {
    private readonly invoiceListData: InvoiceListRecord;
    private readonly _id: string;
    private readonly _customerId: string;
    private readonly _customerName: string;

    constructor(invoiceDataRaw: InvoiceData) {
        this.invoiceListData = {};

        this._id = invoiceDataRaw.id;
        this._customerId = invoiceDataRaw.customerId;
        this._customerName = invoiceDataRaw.customerName;

        invoiceDataRaw.items.forEach((item: InvoiceItemData, index: number) => {
             this.invoiceListData[item.id] = new InvoiceItem(item);
        });
    }

    public get id(): string {
        return this._id;
    }

    public get customerId(): string {
        return this._customerId;
    }

    public get customerName(): string {
        return this._customerName;
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
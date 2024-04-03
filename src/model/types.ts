import {InvoiceItem} from "./InvoiceItem";

export type InvoiceItemData = {
    id: number;
    itemName: string;
    unitPrice: number;
    quantity: number;
}

export type InvoiceData = {
    id: string;
    customerId: string;
    customerName: string;
    items: InvoiceItemData[];
}


export type InvoiceListRecord = Record<number, InvoiceItem>;

import {InvoiceItem} from "./InvoiceItem";

export type InvoiceItemData = {
    id: number;
    itemName: string;
    unitPrice: number;
    quantity: number;
}


export type InvoiceListRecord = Record<number, InvoiceItem>;

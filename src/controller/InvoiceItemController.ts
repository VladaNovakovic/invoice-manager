import {InvoiceItem} from "../model/InvoiceItem";

export class InvoiceItemController {
    public readonly item: InvoiceItem;

    constructor(item: InvoiceItem) {
        this.item = item;
    }

    public handleAmountChange(event: Event): void {
        const newValue = (event.target as HTMLInputElement).value;
        this.item.applyDiscountedPrice(parseFloat(newValue));
    }

    public handlePercentageChange(event: Event): void {
        const newValue = (event.target as HTMLInputElement).value;
        this.item.applyDiscountPercentage(parseFloat(newValue));
    }
}
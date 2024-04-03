import {InvoiceItemData} from "./types";

export class InvoiceItem {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _unitPrice: number;
    private readonly _quantity: number;
    private _discountAmountEur: number;
    private _discountAmountPercentage: number;

    constructor(data: InvoiceItemData) {
        this._id = data.id;
        this._name = data.itemName;
        this._unitPrice = data.unitPrice;
        this._quantity = data.quantity;
        this._discountAmountEur = 0;
        this._discountAmountPercentage = 0;
    }

    public get id() { return this._id; }
    public get name() { return this._name; }
    public get unitPrice() { return this._unitPrice; }
    public get quantity() { return this._quantity; }
    public get discountAmountEur() { return this._discountAmountEur; }
    public get discountAmountPercentage() { return this._discountAmountPercentage; }

    public get originalPrice(): number {
        return this._unitPrice * this._quantity;
    }

    public get itemPrice(): number {
        return this.originalPrice - this._discountAmountEur;
    }

    public applyDiscountPercentage(percentage: number): void {
        this._discountAmountPercentage = percentage;

        const originalPrice = this.originalPrice;
        this._discountAmountEur = (originalPrice * percentage) / 100;
    }

    public applyDiscountAmount(amount: number): void {
        this._discountAmountEur = amount;

        const originalPrice = this.originalPrice;
        this._discountAmountPercentage = (this._discountAmountEur / originalPrice) * 100;
    }

    public applyDiscountedPrice(amount: number): void {
        const discountAmount = this.originalPrice - amount;
        this.applyDiscountAmount(discountAmount);
    }

}
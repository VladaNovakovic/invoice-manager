import {InvoiceItem} from "../model/InvoiceItem";
import {InvoiceItemController} from "../controller/InvoiceItemController";
import {InvoiceUiElementsFactory} from "../InvoiceUiElementsFactory";

export class InvoiceItemView {
    private readonly item: InvoiceItem;
    private readonly invoiceItemController: InvoiceItemController;
    private readonly invoiceFactory: InvoiceUiElementsFactory;
    private readonly parentContainer: HTMLElement;
    private readonly itemElement: HTMLElement;
    private readonly parentViewUpdate: Function;

    constructor(
        item: InvoiceItem,
        invoiceFactory: InvoiceUiElementsFactory,
        parentContainer: HTMLElement,
        parentViewUpdate: Function,
    ) {
        this.item = item
        this.parentContainer = parentContainer
        this.invoiceFactory = invoiceFactory
        this.invoiceItemController = new InvoiceItemController(this.item);
        this.parentViewUpdate = parentViewUpdate;

        this.itemElement = this.invoiceFactory.createInvoiceItemElement();
        this.parentContainer.append(this.itemElement);

        this.updateView();
    }

    public updateView(item: InvoiceItem = this.item): void {
        this.itemElement.setAttribute("model-id", item.id.toString());

        this.itemElement.querySelector('td[data-name="invoiceItem"]').innerHTML = item.name;
        this.itemElement.querySelector('td[data-name="unitPrice"]').innerHTML = item.unitPrice.toString();
        this.itemElement.querySelector('td[data-name="quantity"]').innerHTML = item.quantity.toString();
        this.itemElement.querySelector('td[data-name="price"]').innerHTML = item.originalPrice.toString();
        // this.itemElement.querySelector('td[data-name="discountedPercentage"]').innerHTML = item.discountAmountPercentage.toString();
        // this.itemElement.querySelector('td[data-name="discountEuro"]').innerHTML = item.discountAmountEur.toString();
        const percentage = this.itemElement.querySelector('input[data-name="discountPercentageInput"]') as HTMLInputElement;
        percentage.value = item.discountAmountPercentage.toString();
        percentage.addEventListener("change", (event) => {
            this.invoiceItemController.handlePercentageChange(event);
            this.updateView();
            this.parentViewUpdate();
        });
        // todo check if it needs to be imidiate
        // percentage.addEventListener("keyup", (event) => {
        //     percentageChangeHandler(event, invoiceRowData.id);
        // });

        const discount = this.itemElement.querySelector('input[data-name="discountEuroInput"]') as HTMLInputElement;
        discount.value = item.discountAmountEur.toString();

        const discountAmount = this.itemElement.querySelector('input[data-name="discountAmountEuroInput"]') as HTMLInputElement;
        discountAmount.value = item.itemPrice.toString();
        discountAmount.addEventListener("change", (event) => {
            this.invoiceItemController.handleAmountChange(event);
            this.updateView();
            this.parentViewUpdate();
        });
        // todo check if it needs to be imidiate
        // discountAmount.addEventListener("keyup", (event) => {
        //     amountChangeHandler(event, invoiceRowData.id);
        // });
    }
}
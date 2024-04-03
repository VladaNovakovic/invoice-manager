import {InvoiceItem} from "../model/InvoiceItem";
import {InvoiceItemController} from "../controller/InvoiceItemController";
import {InvoiceUiElementsFactory} from "../InvoiceUiElementsFactory";
import {delay} from "../Utils";

export class InvoiceItemView {
    private readonly item: InvoiceItem;
    private readonly invoiceItemController: InvoiceItemController;
    private readonly invoiceFactory: InvoiceUiElementsFactory;
    private readonly parentContainer: HTMLElement;
    private readonly itemElement: HTMLElement;
    private readonly itemElementMobile: HTMLElement;
    private readonly itemElementMobileHeader: HTMLElement;
    private readonly parentViewUpdate: Function;

    // input elements
    private readonly percentage: HTMLInputElement;
    private readonly percentageMobile: HTMLInputElement;
    private readonly discount: HTMLInputElement;
    private readonly discountMobile: HTMLInputElement;
    private readonly discountAmount: HTMLInputElement;
    private readonly discountAmountMobile: HTMLInputElement;

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
        this.itemElementMobile = this.invoiceFactory.createInvoiceItemMobileElement();
        this.itemElementMobileHeader = this.invoiceFactory.createInvoiceItemMobileHeaderElement();
        this.parentContainer.append(this.itemElement);
        this.parentContainer.append(this.itemElementMobileHeader);
        this.parentContainer.append(this.itemElementMobile);

        this.percentage = this.itemElement.querySelector('input[data-name="discountPercentageInput"]') as HTMLInputElement;
        this.percentageMobile = this.itemElementMobile.querySelector('input[data-name="discountPercentageInputMobile"]') as HTMLInputElement;
        this.discount = this.itemElement.querySelector('input[data-name="discountEuroInput"]') as HTMLInputElement;
        this.discountMobile = this.itemElementMobile.querySelector('input[data-name="discountEuroInputMobile"]') as HTMLInputElement;
        this.discountAmount = this.itemElement.querySelector('input[data-name="discountAmountEuroInput"]') as HTMLInputElement;
        this.discountAmountMobile = this.itemElementMobile.querySelector('input[data-name="discountAmountEuroInputMobile"]') as HTMLInputElement;

        this.updateView();
        this.setInputListeners();
    }

    public updateView(item: InvoiceItem = this.item): void {
        this.itemElement.setAttribute("model-id", item.id.toString());

        this.itemElement.querySelector('td[data-name="invoiceItem"]').innerHTML = item.name;
        this.itemElement.querySelector('td[data-name="unitPrice"]').innerHTML = "€ " + item.unitPrice.toString();
        this.itemElement.querySelector('td[data-name="quantity"]').innerHTML = item.quantity.toString();
        this.itemElement.querySelector('td[data-name="price"]').innerHTML = "€ " + item.originalPrice.toString();

        this.percentage.value = item.discountAmountPercentage.toFixed(2).toString();
        this.percentageMobile.value = item.discountAmountPercentage.toFixed(2).toString();
        this.discount.value = item.discountAmountEur.toFixed(2).toString();
        this.discountMobile.value = item.discountAmountEur.toFixed(2).toString();
        this.discountAmount.value = item.itemPrice.toFixed(2).toString();
        this.discountAmountMobile.value = item.itemPrice.toFixed(2).toString();
    }

    public setInputListeners(): void {
        this.percentage.addEventListener("change", (event) => {
            this.invoiceItemController.handlePercentageChange(event);
            this.updateView();
            this.parentViewUpdate();
        });
        this.percentage.addEventListener("keyup", delay((event: Event) => {
            this.invoiceItemController.handlePercentageChange(event);
            this.updateView();
            this.parentViewUpdate();
        }, 250));

        this.percentageMobile.addEventListener("change", (event: Event) => {
            this.invoiceItemController.handlePercentageChange(event);
            this.updateView();
            this.parentViewUpdate();
        });
        this.percentageMobile.addEventListener("keyup", delay((event: Event) => {
            this.invoiceItemController.handlePercentageChange(event);
            this.updateView();
            this.parentViewUpdate();
        }, 250));

        this.discountAmount.addEventListener("change", (event) => {
            this.invoiceItemController.handleAmountChange(event);
            this.updateView();
            this.parentViewUpdate();
        });
        this.discountAmount.addEventListener("keyup", delay((event: Event) => {
            this.invoiceItemController.handleAmountChange(event);
            this.updateView();
            this.parentViewUpdate();
        }, 250));

        this.discountAmountMobile.addEventListener("change", (event) => {
            this.invoiceItemController.handleAmountChange(event);
            this.updateView();
            this.parentViewUpdate();
        });
        this.discountAmountMobile.addEventListener("keyup", delay((event: Event) => {
            this.invoiceItemController.handleAmountChange(event);
            this.updateView();
            this.parentViewUpdate();
        }, 250));
    }
}
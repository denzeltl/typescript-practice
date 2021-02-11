interface BakeryItem {
    name: string;
    description?: string;
    imageURL?: string;
    numberInStock: number;
    type: "cake" | "bread" | "other";
    price: number;
}

const donut: BakeryItem = {
    name: "Donut",
    description: "This donut is really tasty!",
    numberInStock: 10,
    type: "cake",
    price: 10,
};

interface PaymentMethod {
    id: string;
    currency: "gbp" | "aud" | "usd" | "eur";
    availableBalance: number;
}

interface CreditCardPaymentMethod extends PaymentMethod {
    expiryDate: Date;
    type: "credit" | "debit";
    cardValid: boolean;
}

type CashPaymentMethod = PaymentMethod;

const myPaymentMethod: CreditCardPaymentMethod = {
    id: "my-default-payment-method",
    currency: "aud",
    availableBalance: 50,
    type: "credit",
    cardValid: true,
    expiryDate: new Date(),
};

const myBackupPaymentMethod: CashPaymentMethod = {
    id: "my-backup-payment-method",
    currency: "usd",
    availableBalance: 2500,
};

interface Customer {
    id: string;
    primaryPaymentMethod: CashPaymentMethod | CreditCardPaymentMethod;
    backupPaymentMethod: CashPaymentMethod | CreditCardPaymentMethod;
    itemsInBasket: BakeryItem[];
}

const customer: Customer = {
    id: "my-first-customer",
    primaryPaymentMethod: myPaymentMethod,
    backupPaymentMethod: myBackupPaymentMethod,
    itemsInBasket: [donut],
};

// Making a Payment
const makePayment = (paymentMethod: PaymentMethod, amount: number) => {
    if (paymentMethod.availableBalance < amount) throw new Error("Payment method does not have sufficient funds.");

    paymentMethod.availableBalance -= amount;

    console.log("Payment was successful.");
};

// Buying an Item
const payForItemsInBasket = (customer: Customer) => {
    customer.itemsInBasket.forEach((item) => {
        try {
            makePayment(customer.primaryPaymentMethod, item.price);
            item.numberInStock -= 1;
            console.log("Payment successful");
        } catch (error) {
            console.log(error);
        }
    });
};

payForItemsInBasket(customer);

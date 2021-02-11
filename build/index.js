"use strict";
var donut = {
    name: "Donut",
    description: "This donut is really tasty!",
    numberInStock: 10,
    type: "cake",
    price: 10
};
var myPaymentMethod = {
    id: "my-default-payment-method",
    currency: "aud",
    availableBalance: 50,
    type: "credit",
    cardValid: true,
    expiryDate: new Date()
};
var myBackupPaymentMethod = {
    id: "my-backup-payment-method",
    currency: "usd",
    availableBalance: 2500
};
var customer = {
    id: "my-first-customer",
    primaryPaymentMethod: myPaymentMethod,
    backupPaymentMethod: myBackupPaymentMethod,
    itemsInBasket: [donut]
};
// Making a Payment
var makePayment = function (paymentMethod, amount) {
    if (paymentMethod.availableBalance < amount)
        throw new Error("Payment method does not have sufficient funds.");
    paymentMethod.availableBalance -= amount;
    console.log("Payment was successful.");
};
// Buying an Item
var payForItemsInBasket = function (customer) {
    customer.itemsInBasket.forEach(function (item) {
        try {
            makePayment(customer.primaryPaymentMethod, item.price);
            item.numberInStock -= 1;
            console.log("Payment successful");
        }
        catch (error) {
            console.log(error);
        }
    });
};
payForItemsInBasket(customer);

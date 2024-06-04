enum StripeWebhooks {
  AsyncPaymentSuccess = 'checkout.session.async_payment_succeeded',
  Completed = 'checkout.session.completed',
  AsyncPaymentFailed = 'checkout.session.async_payment_failed',
  ChargeFailed = 'charge.failed',
  SubscriptionDeleted = 'customer.subscription.deleted',
  SubscriptionUpdated = 'customer.subscription.updated',
}

export default StripeWebhooks;

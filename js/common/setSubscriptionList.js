export const setSubscriptionList = (subscriptionList) =>  {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptionList));
}

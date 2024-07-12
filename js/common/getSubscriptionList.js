export const getSubscriptionList = () => {
    const subscriptionList = localStorage.getItem('subscriptions');
    return subscriptionList ? JSON.parse(subscriptionList) : [];
}

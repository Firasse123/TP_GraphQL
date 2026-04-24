export const Subscription = {
    cvEvent: {
        subscribe: (parent,args,{pubSub},info) => {
            return pubSub.subscribe("cvEvent")
        }
    }
}
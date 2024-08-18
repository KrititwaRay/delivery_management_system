export interface IOrderAdd {
    customerName: string
    deliveryAddress: string
    orderStatus: string
    totalAmount: number
    user_id: string
}

export interface IresponseObj {
    orderId?: string
    user_id?: string
}
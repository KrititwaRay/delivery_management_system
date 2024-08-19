export interface IStep {
    location: string;
}

export interface IaddUpdateObj {
    orderId?: string  
    steps: IStep[]
    status: string
}
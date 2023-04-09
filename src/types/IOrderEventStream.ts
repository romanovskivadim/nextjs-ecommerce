export interface IOrderEvent {
  type: "order_placed" | "order_updated";
  payload: {
    orderId: string;
    userId: string;
  };
}

export interface IOrdersEventStream {
  connect: () => void;
  disconnect: () => void;
  subscribe: (handler: (event: IOrderEvent) => void) => void;
  unsubscribe: (handler: (event: IOrderEvent) => void) => void;
}

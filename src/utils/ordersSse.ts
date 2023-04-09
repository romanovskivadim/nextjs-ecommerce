import localStoreHelper from "./localStoreHelper";
import { LOCAL_STORAGE_KEYS } from "./constanats";
import { IUser } from "@/types/IUser";
import { API_ROUTES } from "./api";
import { IFullOrder } from "@/types/IFullOreder";

interface IOrdersEventStream {
  connect: () => void;
  disconnect: () => void;
  subscribe: (callback: (data: IFullOrder[]) => void) => void;
  unsubscribe: () => void;
}

class OrdersEventStream implements IOrdersEventStream {
  private source: EventSource | null = null;
  private callbacks: ((data: IFullOrder[]) => void)[] = [];

  connect() {
    const userId = localStoreHelper.getLocalStorageItem<IUser>(
      LOCAL_STORAGE_KEYS.user
    )?.id;
    if (userId) {
      this.source = new EventSource(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_ROUTES.ORDERS_STREAM(
          userId?.toString()
        )}`
      );
      this.source.onmessage = (event) => {
        console.log("onmessage");
        const data = JSON.parse(event.data);
        this.callbacks.forEach((cb) => cb(data));
      };
    }
  }

  disconnect() {
    if (this.source) {
      this.source.close();
      this.source = null;
    }
  }

  subscribe(callback: (data: IFullOrder[]) => void) {
    this.callbacks.push(callback);
  }

  unsubscribe() {
    this.callbacks = [];
  }
}

export default OrdersEventStream;
//  const ordersEventStream = new OrdersEventStream();

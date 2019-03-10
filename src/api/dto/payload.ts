export interface ApiPayload {
  items?: BrokerItem[];
  message?: string;
  code?: string;
}

export interface BrokerItem {
  commission?: number;
  accountName?: string;
  operationType: string;
  price?: number;
  payment?: number;
  showName?: string;
  currency: string;
}

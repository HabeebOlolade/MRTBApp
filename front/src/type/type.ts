export type Registrant = {
  name: string;
  registrationNumber: number;
  profession: string;
};

export interface IRegistrant {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
}

export interface IRegistrantCart {
  id: number;
  qty: number;
  registrant: IRegistrant;
}
export enum SortDirection {
  ascending = "ascending",
  descending = "descending",
}

export enum SortColumnName {
  id = "id",
  title = "title",
  price = "price",
  creationAt = "creationAt",
}
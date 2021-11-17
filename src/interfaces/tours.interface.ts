export interface ITourModel {
  id?: string;
  name: string;
  price: string;
}

export interface ITourJsonResponse {
  status: string;
  data: {
    tour: ITourModel;
  };
}

export interface DashboardData {
   boxTitle: string;
   orderDate: string;
   totalSales:number;
   totalPrice:number;
  }
  
  export class ResponseDto<T>{
    responseData?: T;
    messageToClient?: string;
  }
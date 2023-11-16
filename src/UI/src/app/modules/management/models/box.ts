export interface Box {
    id?: number; // Unique identifier for the box
    title: string; // User-friendly name or label
    type: string; // Type or category of the box
    image: string; // Image of the box
    status:string; // sold or not or damaged
    price: number; // Price of the box
    color: string; // Color of the box
    description: string; // Description of the box
  }
  
  export class ResponseDto<T>{
    responseData?: T;
    messageToClient?: string;
  }
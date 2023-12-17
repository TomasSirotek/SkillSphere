import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";




export interface PaymentLinkResponse {
    checkoutUrl: string;
  }
  
  export interface PaymentLinkRequest {
    courseToPurchase: {
      id: string;
      title: string;
      description: string;
      price: number;
      imageUrl: string;
    };
    quantity: number;
    metadata: object; // Change metadata type to string
    successRedirectUrl: string;
    cancelRedirectUrl: string;
  }
  
  @Injectable({
    providedIn: 'root',
  })
  export class PaymentService {
    constructor(private _http: HttpClient) {}
  
    public generatePaymentLink(request: PaymentLinkRequest): Observable<PaymentLinkResponse> {
      return this._http.post<PaymentLinkResponse>(
        `${environment.baseUrl}/payments`,
        request,
        { observe: 'response' }
      ).pipe(
        // return the response body (unwrapped)
        map(response => response.body)
      );
    }
  }
  


  

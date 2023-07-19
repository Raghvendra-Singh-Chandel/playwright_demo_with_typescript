import { APIRequestContext, Page, expect } from "@playwright/test"
import axios from 'axios'

class API_call
{
   
    apiContext: APIRequestContext
    loginPayload: any | undefined
    constructor(apiContext,loginPayload) // api context pass in the actual test
    {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
          
    }




    async getToken() {
        const loginResponse = await axios({
          method: 'post',
          url: 'https://rahulshettyacademy.com/api/ecom/auth/login',
          data: this.loginPayload,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        expect(loginResponse.status).toBe(200);
        const token = loginResponse.data.token;
        return token;
      }
      


    async createOrder(OrderPayload:string)
    {
        
       const CreateOrderResponse = await axios({
        method:"post",
        url: "https://rahulshettyacademy.com/api/ecom/order/create-order",
        data: OrderPayload,
         headers:  {
                    'Authorization' : await this.getToken(),
                    'Content-Type' : 'application/json'
                   }
       })
    

       const OrderResponseJson = CreateOrderResponse.data;
       const orderID = OrderResponseJson.orders[0];
       return orderID;
    }



    async AddTokenInLocalStorage(page: Page)
    {
        page.addInitScript(value => {

            window.localStorage.setItem('token',value);
        }, await this.getToken() );
    }
}
export default API_call
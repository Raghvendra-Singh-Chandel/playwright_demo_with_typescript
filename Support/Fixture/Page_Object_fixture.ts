// const base   = require ('@playwright/test')
// const {request} = require('@playwright/test')
// const{SignUp} = require('../Page_Object/SignupPage')
// const {SignIn} = require('../Page_Object/SignInPage')
// const {OrderProduct} = require('../Page_Object/OrderProduct')
// const { API_call } = require('../API_Utils/loginApiUtils')
// const {OrderVerify} = require('../Page_Object/OrderVerify')
import {test as base, BrowserContext} from "@playwright/test"
import SignUp from "../Page_Object/SignupPage"
import SignIn from "../Page_Object/SiginInPage"
import OrderProduct from "../Page_Object/OrderProducts"
import API_call from "../API_Utils/loginApi"
import OrderVerify from "../Page_Object/OrderVerify"



const test = base.extend<{
    registerPage: SignUp
    loginPage: SignIn
    orderSelectedProduct: OrderProduct
    API: API_call
    VerifyOrder: OrderVerify


}>
({
    registerPage: async({page, isMobile}, use)=>
    {
        const registerPage = new SignUp(page, isMobile)
        await use(registerPage) 
    },
    loginPage: async({page, isMobile}, use)=>
    {
        const loginPage = new SignIn(page, isMobile)
        await use(loginPage)
    },
    orderSelectedProduct: async({page, isMobile},use)=>
    {
        const orderSelectedProduct = new OrderProduct(page,isMobile)
        await use(orderSelectedProduct)
    },
    API: async({page, browser}, use)=>
    {
        const loginPayload = { userEmail: "test_1@gmail.com", userPassword: "Test@123" }


        const apiContext = await browser.newContext()
        const API = new API_call(apiContext, loginPayload)
        await API.AddTokenInLocalStorage(page)
        
        await use(API)

    },

    VerifyOrder: async({page , isMobile},use)=>
    {
        const VerifyOrder = new OrderVerify(page, isMobile)
        await use(VerifyOrder)
    }
})
export default test
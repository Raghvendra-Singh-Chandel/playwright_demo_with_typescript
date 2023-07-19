import { Locator, Page, expect } from "@playwright/test"
import * as loginData from "../testData/loginTestdata.json"


class SignIn
{
    page: Page
    isMobile: boolean
    confiramtionToast: Locator
    email: Locator
    password: Locator
    login: Locator
    constructor(page:Page, isMobile:boolean)
    {
        this.page = page
        this.isMobile = isMobile
        this.confiramtionToast = page.locator("[aria-label='Login Successfully']")
        this.email = page.locator('[formcontrolname="userEmail"]')
        this.password = page.locator('[formcontrolname="userPassword"]')
        this.login = page.getByRole('button', {name: 'Login'})
    }


    async GoTo_LoginPage()
    {
        await this.page.goto(loginData.baseURL)
    }
    async Login()
    {
        await this.email.fill(loginData.email)
        await this.password.fill(loginData.password)
        await this.login.click()
        await this.confiramtionToast.waitFor({state:"visible"})
        await expect(this.confiramtionToast).toHaveText(loginData.loginSuccesfullyToastMessage)
        await this.confiramtionToast.waitFor({state:"hidden"})
    }

}
export default SignIn
import { Locator, Page , expect} from "@playwright/test"




class OrderVerify
{
    page:Page
    isMobile:boolean
    hamburgerIcon: Locator
    order_btn: Locator
    t_body: Locator
    t_row: Locator
    constructor (page:Page,isMobile:boolean)
    {
        this.isMobile = isMobile
        this.page = page
        this.hamburgerIcon = page.locator("label.hamberger-btn")
        this.order_btn =  page.locator("button[routerlink*='myorders']")
        this.t_body =  page.locator("tbody")
        this.t_row = page.locator("tbody tr")
        
    }



    async orderVerify(orderID)
    {
        if (this.isMobile) {
            await this.hamburgerIcon.click()
        }
        await this.order_btn.waitFor({state:"visible"})
        await this.order_btn.click()
        for (let i = 0; i < 8; ++i) 
        {
            const rowOrderId = await this.t_row.nth(i).locator("th").textContent()
            if (orderID.includes(rowOrderId)) 
            {
                await this.t_row.nth(i).locator("button").first().click()
          
                break;
            }
        }
        const orderIdDetails = await this.page.locator(".col-text").textContent()
        expect(orderID.includes(orderIdDetails)).toBeTruthy()

    }
}
export default OrderVerify
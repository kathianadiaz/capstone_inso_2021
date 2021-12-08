const playwright = require('playwright');

(async () => {

    //Code execution happens within in here
    const browser = await playwright["firefox"].launch({
        headless: false,
        slowmo: 50,
        timeout: 50000
    });

    //context
    const context = await browser.newContext();

    //page
    const page = await context.newPage();


    //navigate to the home page
    await page.goto("http://localhost:3000/");

    //press start searching now

    //navigate search for organizations

    
    await browser.close();

    // sign up test
    const browser2 = await playwright["firefox"].launch({
        headless: false,
        slowmo: 50,
        timeout: 50000
    });

    //context
    const context2 = await browser2.newContext();

    //page
    const page2 = await context2.newPage();


    //navigate to the home page
    await page2.goto("http://localhost:3000/login")

    await browser2.close();

    //sign in test 
    const browser3 = await playwright["firefox"].launch({
        headless: false,
        slowmo: 50,
        timeout: 50000
    });

    //context
    const context3 = await browser3.newContext();

    //page
    const page3 = await context3.newPage();


    //navigate to sign in page
    await page3.goto("http://localhost:3000/signin")

    await browser3.close();

})();
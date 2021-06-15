var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var robot = require("robotjs");
var express = require('express');
var sql = require("mssql");
var app = express();
var driver;
var service;
var chromeCapabilities;
var records;
var url = "https://www.bestbuy.com/site/microsoft-xbox-series-x-1tb-console-black/6428324.p?skuId=6428324";
//var url = "https://www.bestbuy.com/site/lego-super-mario-character-packs-series-2-71386/6434182.p?skuId=6434182";
var cartUrl = "https://www.bestbuy.com/cart";

var accountBtnClass = "gvpHeadicon account-icon flyBtn";
var singInBtnClass = "lam-signIn__button btn btn-secondary";
var soldOutBtnClass = "btn btn-disabled btn-lg btn-block add-to-cart-button";
var addToCartBtnClass = "btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button";
var checkoutBtnClass = "btn btn-lg btn-block btn-primary";
var pickUpPersonMenuClass = "saved-addresses__select-heading";
var pickUpPersonOption = "saved-addresses__option list-group-item";
var continueToPaymentClass = "btn btn-lg btn-block btn-secondary";
var selectPayment = "c-dropdown v-medium c-dropdown v-medium credit-card-form__select";
var isAvailable = false;

//--------DB Settings------

var config = {
    user: '***',
    password: '***',
    server: '***', 
    database: '***' 
};

async function InitilizeChromeSettings()
{
    service = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(service);

    chromeCapabilities = webdriver.Capabilities.chrome();

    chromeCapabilities.set("goog:chromeOptions", {
        args: [
            "--start-maximized",
            "--disable-notifications",
            "--disable-application-cache"
        ]
        });

    driver = new webdriver.Builder()
    .withCapabilities(chromeCapabilities)
    .build();
}

example();

async function DoItAgain()
{
    Wait(2000);
    await driver.quit();
    await example();
}

async function Wait(millisenconds){

    await (await driver).sleep(millisenconds);

}


async function example() {
        

        try{
                await InitilizeChromeSettings();
                await ProcessRecords();
            }
            catch(e){
                throw new exception("Some issue in Chrome Settings"); 
            }
      }

      async function ProcessRecords()
        {
            try{
                    await OpenAndLogin();
                    while(!isAvailable)
                    {
                        await Refresh();
                    }
                    if(isAvailable)
                    {
                        await BuyIt();

                    }
                    await DoItAgain(); 
                }
                catch(e){
                    await DoItAgain(); 
                } 
        }
            
        
        async function OpenAndLogin()
        {
            try{
                    await driver.get(url);
                    await Wait(4000);
                    let accountBts = await driver.findElements(webdriver.By.className(accountBtnClass));
                    await accountBts[0].click();
                    await Wait(4000);
                    let signInBts = await driver.findElements(webdriver.By.className(singInBtnClass));
                    await signInBts[0].click();
                    await Wait(5000);
                    await driver.findElement(webdriver.By.name('fld-e')).sendKeys('***');
                    await driver.findElement(webdriver.By.name('fld-p1')).sendKeys('****', webdriver.Key.ENTER);
                    await Wait(5000);
                }
                catch(e){
                    throw(e);
                }
        }

        async function CheckIfInStock()
        {
            try{
                let soldOutBtns = await driver.findElements(webdriver.By.className(soldOutBtnClass));
                if(soldOutBtns.length <=0)  
                { 
                    isAvailable = true;

                }
                else{

                    isAvailable = false;
                }
            }
            catch(e){
                throw(e);
            }

        }

        async function BuyIt()
        {
            try{
                var addTimeQuery = "INSERT INTO [Protocol].[XboxAvailable] VALUES(GETUTCDATE())"; 
                await ExecuteQueryInDb(addTimeQuery, null, false);
                let addToCartBtns = await driver.findElements(webdriver.By.className(addToCartBtnClass));
                await addToCartBtns[0].click();
                await Wait(5000);
                await driver.get(cartUrl);
                await Wait(4000);
                let checkoutBtns = await driver.findElements(webdriver.By.className(checkoutBtnClass));
                await checkoutBtns[0].click();
                await Wait(4000);
            }
            catch(e){
                throw(e);
            }

        }

        async function Refresh()
        {
            await driver.get(url);
            await Wait(10000);
            await CheckIfInStock();

        }

        async function ExecuteQueryInDb(query, callback, setRecords)
        {
            try{
                    // connect to your database
                sql.connect(config, function (err) {
                
                    if (err) console.log(err);
            
                    // create Request object
                    var request = new sql.Request();
                    
                    // query to the database and get the records
                    request.query(query, function (err, recordset) {
                        
                        if (err) console.log(err)
            
                        // send records as a response
                        if(setRecords)
                        {                
                            records = recordset;
                        }
                        if(callback)
                        {
                            callback();
                        }
                        
                    });
                });
                }
                catch(e){
                    throw(e);
                }
        }

        

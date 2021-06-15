var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var driver;
var service;
var chromeCapabilities;
var url = "https://www.facebook.com/marketplace/";
var url2 = "https://www.facebook.com/marketplace/you/selling";

var threeDots = "rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw taijpn5t bp9cbjyn owycx6da btwxx1t3 kt9q3ron ak7q8e6j isp2s0ed ri5dt5u2 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 ni8dbmo4 stjgntxs hv4rvrfc dati1w0a tdjehn4e tv7at329";
var menuOptionsClass = "oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 j83agx80 p7hjln8o kvgmc6g5 oi9244e8 oygrvhab h676nmdw cxgpxx05 dflh9lhu sj5x9vvc scb9dxdr i1ao9s8h esuyzwwr f1sip0of lzcic4wl l9j0dhe7 abiwlrkh p8dawk7l bp9cbjyn dwo3fsh8 btwxx1t3 pfnyh3mw du4w35lb";
var confirmDeleteClass = "rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw taijpn5t bp9cbjyn owycx6da btwxx1t3 kt9q3ron ak7q8e6j isp2s0ed ri5dt5u2 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 ni8dbmo4 stjgntxs d1544ag0 tw6a2znq s1i5eluu tv7at329";
var surveyOptionsClass = "oajrlxb2 bp9cbjyn j83agx80 sj5x9vvc cxgpxx05 l9j0dhe7 f1sip0of";
var nextSurveyBtnClass = "rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw taijpn5t bp9cbjyn owycx6da btwxx1t3 kt9q3ron ak7q8e6j isp2s0ed ri5dt5u2 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 ni8dbmo4 stjgntxs d1544ag0 tw6a2znq s1i5eluu tv7at329";


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
    try{
        await driver.get(url2);
        await Wait(5000);
        await DeleteListings();
        await DoItAgain(); 
    }
    catch(e){
        await DoItAgain();
    }
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
        }
      }

    async function ProcessRecords()
    {
        try{
            await OpenAndLogin();
            await DeleteListings();
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
            await driver.findElement(webdriver.By.name('email')).sendKeys('jose.carbajal.salinas@gmail.com');
            await driver.findElement(webdriver.By.name('pass')).sendKeys('Lom@s246', webdriver.Key.RETURN);
            await Wait(5000);
            await driver.get(url2);
            await Wait(5000);
        }
        catch(e){
            throw(e); 
        }
    }

    async function DeleteListings()
    {
        try{
            let allListings = await (await driver).findElements(webdriver.By.className(threeDots));

            for(var i = 0; i < allListings.length; i++)
            {
                allListings[i].click();
                await Wait(1500);
                let menuOptions = await (await driver).findElements(webdriver.By.className(menuOptionsClass));
                await menuOptions[menuOptions.length-1].click();
                await Wait(500);
                let confirmDeleteOptions = await (await driver).findElements(webdriver.By.className(confirmDeleteClass));
                await confirmDeleteOptions[confirmDeleteOptions.length-1].click();
                await Wait(500);
                let surveyOptions = await (await driver).findElements(webdriver.By.className(surveyOptionsClass));
                if(surveyOptions.length > 0)
                {
                    await surveyOptions[surveyOptions.length-1].click();
                    await Wait(500);
                    let surveyNextOptions = await (await driver).findElements(webdriver.By.className(nextSurveyBtnClass));
                    await surveyNextOptions[0].click();
                    await Wait(500);
                }
                else{
                    await Wait(500);
                }


            }
        }
        catch(e){
            throw(e); 
        }
    }

      


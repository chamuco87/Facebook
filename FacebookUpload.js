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
var url = "https://www.facebook.com/marketplace/create/item";

var formElementClass = "oajrlxb2 rq0escxv f1sip0of hidtqoto e70eycc3 lzcic4wl g5ia77u1 gcieejh5 bn081pho humdl8nn izx4hr6d oo9gr5id qc3s4z1d knj5qynh fo6rh5oj osnr6wyh hv4rvrfc dati1w0a p0x8y401 k4urcfbm iu8raji3";
var title = 0;
var cost = 1;
var category = 2;
var brand  = 3;
var size = 4
var categorySelectionClass = "e5nlhep0 ecm0bbzt scb9dxdr dflh9lhu";
var conditionClass = "dwo3fsh8 g5ia77u1 ow4ym5g4 auili1gw nhd2j8a9 oygrvhab cxmmr5t8 hcukyx3x kvgmc6g5 l9j0dhe7 i1ao9s8h du4w35lb rq0escxv oo9gr5id j83agx80 jagab5yi knj5qynh fo6rh5oj lzcic4wl osnr6wyh hv4rvrfc dati1w0a p0x8y401 k4urcfbm";
var newConditionClass = "oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 j83agx80 p7hjln8o kvgmc6g5 oi9244e8 oygrvhab h676nmdw pybr56ya dflh9lhu f10w8fjw scb9dxdr i1ao9s8h esuyzwwr f1sip0of lzcic4wl l9j0dhe7 abiwlrkh p8dawk7l bp9cbjyn dwo3fsh8 btwxx1t3 pfnyh3mw du4w35lb";
var descriptionClass = "oajrlxb2 rq0escxv f1sip0of hidtqoto lzcic4wl g5ia77u1 gcieejh5 bn081pho humdl8nn izx4hr6d oo9gr5id j83agx80 jagab5yi knj5qynh fo6rh5oj oud54xpy l9qdfxac ni8dbmo4 stjgntxs hv4rvrfc dati1w0a ieid39z1 k4urcfbm";
var productTagsClass = "g5ia77u1 gcieejh5 bn081pho humdl8nn izx4hr6d rq0escxv oo9gr5id jagab5yi knj5qynh fo6rh5oj lzcic4wl qt6c0cv9 fdg1wqfs k4urcfbm";
var phothosBtnClass = "rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw taijpn5t bp9cbjyn owycx6da btwxx1t3 kt9q3ron ak7q8e6j isp2s0ed ri5dt5u2 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 ni8dbmo4 stjgntxs d1544ag0 tw6a2znq tdjehn4e tv7at329";
var nextBtnClass = "rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw taijpn5t bp9cbjyn owycx6da btwxx1t3 kt9q3ron ak7q8e6j isp2s0ed ri5dt5u2 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 ni8dbmo4 stjgntxs d1544ag0 tw6a2znq s1i5eluu qypqp5cg";
var nextBtn2Class = "rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw taijpn5t bp9cbjyn owycx6da btwxx1t3 kt9q3ron ak7q8e6j isp2s0ed ri5dt5u2 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 ni8dbmo4 stjgntxs d1544ag0 tw6a2znq s1i5eluu qypqp5cg";
var groupCheckBoxClass = "hu5pjgll lzf7d6o1 sp__DyEaC3IQIy sx_81e4be";
var publishBtnClass = "rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw taijpn5t bp9cbjyn owycx6da btwxx1t3 kt9q3ron ak7q8e6j isp2s0ed ri5dt5u2 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 ni8dbmo4 stjgntxs d1544ag0 tw6a2znq s1i5eluu qypqp5cg";
var brandSizeClass = "oajrlxb2 rq0escxv f1sip0of hidtqoto e70eycc3 lzcic4wl g5ia77u1 gcieejh5 bn081pho humdl8nn izx4hr6d oo9gr5id qc3s4z1d knj5qynh fo6rh5oj osnr6wyh hv4rvrfc dati1w0a p0x8y401 k4urcfbm iu8raji3";

//-----------Is Testing---------
var doPublish = true;
var doDBUpdates = true;
//-----------Is Testing---------

//--------DB Settings------

var config = {
    user: '****',
    password: '***',
    server: '****', 
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
            "--disable-notifications"
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

                var initialRecordsQuery = "SELECT DISTINCT TOP(5)   [Title] ,[Price] ,[Category],[Condition]"+
                ",[Description],[Brand],[Size],[ProductTags],[PhotosDirectory],[IsPublished],[DatePublished],[IsSold],[DateSold]" +
                ",[MAP],[SoldPrice],[Pallet] " +
                "FROM [DB_A57E75_chamucolol87].[Protocol].[ProductList] WHERE IsPublished = 0 ORDER BY PRICE DESC";
                
                await ExecuteQueryInDb(initialRecordsQuery, ProcessRecords, true)
        
            }
            catch(e){
                throw new exception("Check db connection"); 
            }
      }

      async function ProcessRecords()
        {
            try{
                    await OpenAndLogin();
                    await UploadProducts(records.recordset);
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
                    await driver.findElement(webdriver.By.name('email')).sendKeys('****');
                    await driver.findElement(webdriver.By.name('pass')).sendKeys('*****', webdriver.Key.RETURN);
                    await Wait(5000);
                }
                catch(e){
                    throw(e);
                }
        }

        async function UploadProducts(products)
        {
            try{
                    for(var tq =0;tq<products.length;tq++)
                    {
                        await driver.get(url);
                        await Wait(5000);
                        var product = products[tq];
                        //Fill the form
                        let  formElements =  await driver.findElements(webdriver.By.className(formElementClass));
                        await SetTitle(formElements, product);
                        await SetPrice(formElements, product);
                        await SetCategory(formElements, product);
                        await SetCondition(product);
                        formElements =  await driver.findElements(webdriver.By.className(brandSizeClass));
                        if(formElements.length > 3)
                        {
                            await SetBrand(formElements, product);
                            await SetSize(formElements, product);
                        }
                        
                        await SetDescription(product);

                        //await SetProductTags(product);

                        //Select Photos
                        await SelectPhotos(product);
                        
                        //Click on Next
                        //await GoToLocation();

                        //Click on Next
                        await GoToGroups();

                        //Select all Groups
                        await SelectAllGroups();

                        if(doPublish)
                        {
                            //Publish the product
                            await Publish();
                        }

                        if(doDBUpdates)
                        {
                            //Setting the flag to avoid to be reuploaded
                            await UpdateRecordInDb(product);
                        }
                        
                    }
                    Wait(2000);
                    await driver.quit();
                }
                catch(e){
                    throw(e);
                }
        }

        async function SetTitle(formElements, product)
        {
            try{
                await formElements[title].sendKeys(product.Title);
                await Wait(500);
            }
            catch(e){
                throw(e);
            }
        }

        async function SetPrice(formElements, product)
        {
            try{
                await formElements[cost].sendKeys(product.Price);
            }
            catch(e){
                throw(e);
            }
        }

        async function SetCategory(formElements, product)
        {
            try{
                await formElements[category].sendKeys(product.Category);
                await Wait(1000);
                let categorySelection = await (await driver).findElements(webdriver.By.className(categorySelectionClass));
                await categorySelection[0].click();
            }
            catch(e){
                throw(e);
            }
        }

        async function SetBrand(formElements, product)
        {
            try{
                if(product.Brand)
                {
                await formElements[brand].sendKeys(product.Brand);
                await Wait(1000);
                }
            }
            catch(e){
                throw(e);
            }
        }

        async function SetSize(formElements, product)
        {
            try{
                if(product.Size)
                {
                await formElements[size].sendKeys(product.Size);
                await Wait(1000);
                }
            }
            catch(e){
                throw(e);
            }
        }

        async function SetCondition(product)
        {
            try{
                let condition = await driver.findElements(webdriver.By.className(conditionClass));
                await condition[0].click();
                await Wait(3000)
                var option = 1;
                var conditionDb = product.Conditon;
                if(conditionDb)
                {
                    if(conditionDb.indexOf("New") >= 0)
                    {
                        option = 0;
                    }
                    else if(conditionDb.indexOf("Used") >= 0){
                        option = 1
                    }
                }
                let getConditions =  await driver.findElements(webdriver.By.className(newConditionClass));
                await getConditions[option].click();
            }
            catch(e){
                throw(e); 
            }
            
        }

        async function SetDescription(product)
        {
            try{
                let descriptions =  await driver.findElements(webdriver.By.className(descriptionClass));
                await descriptions[0].sendKeys(product.Description);
            }
            catch(e){
                throw(e);
            }
        }

        async function SetProductTags(product)
        {
            try{
                var productTags = product.ProductTags.split(",");
                if(productTags.length > 0)
                {
                    let productTagsMenus =  await driver.findElements(webdriver.By.className(productTagsClass));
                    await productTagsMenus[0].click();
                    await Wait(500);
                    for(var i = 0; i<productTags.length; i++)
                    {
                        robot.typeString(productTags[i]);
                        robot.keyTap("enter");
                        await Wait(500);
                    }
                }

            }
            catch(e){
                throw(e);
            }
        }

        async function SelectPhotos(product)
        {
            try{
                await OpenFileExplorer();
                await GoToDirectory(product);
                await SelectAllPhotos();
            }
            catch(e){
                throw(e);
            }
        }

        async function OpenFileExplorer()
        {
            try{
                let photosBtn =  await driver.findElements(webdriver.By.className(phothosBtnClass));
                await photosBtn[0].click();
                await Wait(2000);
            }
            catch(e){
                throw(e);
            }
        }

        async function GoToDirectory(product)
        {
            try{
                    robot.typeString(product.PhotosDirectory);
                    robot.keyTap("enter");
                }
                catch(e){
                    throw(e); 
                }
        }

        async function SelectAllPhotos()
        {
            try{
                robot.keyTap("tab");
                robot.keyTap("tab");
                robot.keyTap("tab");
                robot.keyTap("tab");
                robot.keyTap("tab");
                robot.keyTap("tab");
                robot.keyTap("tab");
                robot.keyTap("tab");
                robot.keyTap("tab");
                robot.keyTap("tab");
                robot.keyTap("tab");
                robot.keyTap("A","control");
                robot.keyTap("enter");
                await Wait(20000);
            }
            catch(e){
                throw(e);
            }
        }

        async function GoToLocation()
        {
            try{
                
                let nextBtns =  await driver.findElements(webdriver.By.className(nextBtnClass));
                await nextBtns[0].click();
                await Wait(2000);
            }
            catch(e){
                throw(e);
            }
        }

        async function GoToGroups()
        {
            try{
                let nextBtns2 =  await driver.findElements(webdriver.By.className(nextBtn2Class));
                await nextBtns2[0].click();
                await Wait(2000);
            }
            catch(e){
                throw(e);
            }
        }

        async function SelectAllGroups()
        {
            try{
                let groupCheckBoxes =  await driver.findElements(webdriver.By.className(groupCheckBoxClass));
                for(var i=0; i< groupCheckBoxes.length;i++)
                {
                    await groupCheckBoxes[i].click();
                    await Wait(500);

                }
            }
            catch(e){
                throw(e);
            }
        }

        async function Publish()
        {
            try{
                let publishBtns =  await driver.findElements(webdriver.By.className(publishBtnClass));
                await publishBtns[0].click();
                await Wait(5000);
            }
            catch(e){
                throw(e);
            }
        }

        async function UpdateRecordInDb(product)
        {
            try{
                var updateQuery = 'UPDATE [Protocol].[ProductList] SET IsPublished = 1, DatePublished = GETDATE() WHERE Title = ' + "'" + product.Title + "'";
                ExecuteQueryInDb(updateQuery, null, false)
            }
            catch(e){
                throw(e);
            }

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


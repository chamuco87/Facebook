
// Declare dependencies
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

var express = require('express');
var app = express();

var service = new chrome.ServiceBuilder(path).build();

const times = 5;
const maxPrice = 30;

chrome.setDefaultService(service);

//This method will connec to Facebook and will perform the search based on list of products 
     (async function search() {
        

        try{
            //Declaring important clasess in Facebook this are dynamic and needs to be updated with new Facebook releases every month
            var elementDivContainer = "b3onmgus ph5uu5jm g5gj957u buofh1pr cbu4d94t rj1gh0hx j83agx80 rq0escxv fnqts5cd fo9g3nie n1dktuyu e5nlhep0 ecm0bbzt";
            var productDetails = "q5bimw55 rpm2j7zs k7i0oixp gvuykj2m j83agx80 cbu4d94t ni8dbmo4 eg9m0zos l9j0dhe7 du4w35lb ofs802cu pohlnb88 dkue75c7 mb9wzai9 d8ncny3e buofh1pr g5gj957u tgvbjcpo l56l04vs r57mb794 kh7kg01d c3g1iek1 k4xni2cv k4urcfbm";
            var closeProductDetailsIcon = "oajrlxb2 tdjehn4e qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 j83agx80 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl l9j0dhe7 abiwlrkh p8dawk7l bp9cbjyn s45kfl79 emlxlaya bkmhp75w spb7xbtv rt8b4zig n8ej3o3l agehan2d sk4xxmp2 taijpn5t qypqp5cg q676j6op";
            
            //This is an array of products to be search
            var productos = [{
                "type":"electronics",
                "isEnabled":true,
                "url":"https://www.facebook.com/marketplace/108492669175146/electronics/?deliveryMethod=local_pick_up&exact=false",
                "eles": [ 
                            {
                                "vendor":"amazon",
                                "names":["alexa", "echo","dot","show"],
                                "includes":["case"],
                                "excludes":[],
                                "indexes":[],
                                "price":20,
                                "offer":10,
                                "searchURL":"https:www.facebook.com/marketplace/108492669175146/search?sortBy=creation_time_descend&query=Alexa&category_id=electronics&exact=true",
                                "isVendorMandatory":false
                            }
                    
                ]}
            ];
        //Configure the webdriver
        var chromeCapabilities = webdriver.Capabilities.chrome();

        chromeCapabilities.set("goog:chromeOptions", {
            args: [
                "--start-maximized",
                "--disable-notifications"
            ]
          });

        var driver = new webdriver.Builder()
        .withCapabilities(chromeCapabilities)
        .build();
    var  verIndex = 0;


        //This is to store dta in database to gather tons of information for further analisys
        var sql = require("mssql");
    
        // config for your database
        var config = {
            user: 'db',
            password: 'pw',
            server: 'hidden', 
            database: 'dbname' 
        };
    
        // connect to your database
        sql.connect(config, function (err) {
        
            if (err) console.log(err);
    
            // create Request object
            var request = new sql.Request();
               
            // query to the database and get the records
            request.query('select * from Protocol.[Records]', function (err, recordset) {
                
                if (err) console.log(err)
    
                // send records as a response
                records = recordset;
                
            });
        });
    

        //Thi loop will be applied to all your selected products
        for(var tq =0;tq<productos.length;tq++)
        {
                var prd = productos[tq];
                if(!prd.isEnabled)
                {
                    continue;
                }
        
                await driver.get(prd.url);
                await (await driver).sleep(4000)
                if(tq==0){
                    //Login in Facebook
                    await driver.findElement(webdriver.By.name('email')).sendKeys('MAIL');
                    await driver.findElement(webdriver.By.name('pass')).sendKeys('pwd', webdriver.Key.RETURN);
                }
                await (await driver).sleep(15000)
                 await driver.wait(driver.findElement(webdriver.By.xpath("div[@class='tojvnm2t a6sixzi8 k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y l9j0dhe7 iyyx5f41 a8s20v7p']")), 10000);
                 await (await driver).sleep(2000)
                
                 await driver.wait(driver.findElement(webdriver.By.xpath('*[@id="facebook"]/head/title')), 10000);
                 var selected=[]; 
                async function scan(){
                
                    let items = await driver.findElements(webdriver.By.className(elementDivContainer));
                    var arrayyProducts = new Array();
                for(var i=0; i< items.length; i++)
                {
                    try{
                    let myWebElement = await items[i];

                    myWebElement.then(function(el) {
                             return el.click();
                        });
                    await myWebElement.click();
                    await (await driver).sleep(2000);
                    let details = await driver.findElements(webdriver.By.className(productDetails));

                    var productObj = {url :"", product:"" };
                    productObj.url =  await driver.getCurrentUrl();
                    await details[0].getText().then(function(n){
                        productObj.product  = n;
                        let stringElements = productObj.product.split("\n");
                    })
                    
                    arrayyProducts.push(productObj);

                    let deleteButton = await driver.findElements(webdriver.By.className(closeProductDetailsIcon));
                    await deleteButton[0].click();
                    await (await driver).sleep(2000);
                    
                    let confirmDeleteBtn = await driver.findElements(webdriver.By.xpath("div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t d2edcug0 mg4g778l buofh1pr g5gj957u hpfvmrgz ph5uu5jm b3onmgus e5nlhep0 ecm0bbzt']"));
                    
                    await (await driver).sleep(2000);

                    await confirmDeleteBtn[0].click();
                    await (await driver).sleep(5000);
                    }
                    catch
                    {
                        let confirmDeleteBtn1 = await driver.findElements(webdriver.By.className("oajrlxb2 s1i5eluu qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 pq6dq46d p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x cxgpxx05 d1544ag0 sj5x9vvc tw6a2znq oqcyycmt esuyzwwr f1sip0of lzcic4wl l9j0dhe7 abiwlrkh p8dawk7l ehryuci6 bp9cbjyn beltcj47 p86d2i9g aot14ch1 kzx2olss rt8b4zig n8ej3o3l agehan2d sk4xxmp2 lrazzd5p gigivrx4 sf5mxxl7 g0qnabr5 lrwzeq9o iqfcb0g7 lsqurvkf id6903cd jq4qci2q m5l1wtfr taijpn5t sn7ne77z oqhjfihn bwm1u5wc"));
                        await (await driver).sleep(2000);
                        await confirmDeleteBtn1[0].click();
                        await (await driver).sleep(2000);
                        let confirmDeleteBtn2 = await driver.findElements(webdriver.By.className("oajrlxb2 s1i5eluu gcieejh5 bn081pho humdl8nn izx4hr6d rq0escxv nhd2j8a9 j83agx80 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys d1544ag0 qt6c0cv9 tw6a2znq i1ao9s8h esuyzwwr f1sip0of lzcic4wl l9j0dhe7 abiwlrkh p8dawk7l beltcj47 p86d2i9g aot14ch1 kzx2olss cbu4d94t taijpn5t ni8dbmo4 stjgntxs k4urcfbm tv7at329"));
                        await (await driver).sleep(2000);
                        await confirmDeleteBtn2[0].click();
                        await (await driver).sleep(2000);
                        await driver.navigate().refresh();
                        await (await driver).sleep(7000);
                        await scan();
                    }
                    
                }
                var jsonData = JSON.stringify(arrayyProducts);
                var fs = require('fs');
                fs.writeFile("test.txt", jsonData, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
                }
                
                for(var i=0; i<=times;i++)
                {
                    await scan();
                    let viewMoreBtn = await driver.findElements(webdriver.By.xpath("div[@class='oajrlxb2 tdjehn4e gcieejh5 bn081pho humdl8nn izx4hr6d rq0escxv nhd2j8a9 j83agx80 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys d1544ag0 qt6c0cv9 tw6a2znq i1ao9s8h esuyzwwr f1sip0of lzcic4wl l9j0dhe7 abiwlrkh p8dawk7l beltcj47 p86d2i9g aot14ch1 kzx2olss cbu4d94t taijpn5t ni8dbmo4 stjgntxs k4urcfbm tv7at329']"));
                    var found  = false;
                        for(var a= 0; a<=viewMoreBtn.length;a++)
                        {
                            try{
                            await viewMoreBtn[a].getText().then(function(n){
                                if(n.indexOf("Ver")>=0 && found == false)
                                {
                                    verIndex = a;
                                    found = true;
                                    await (await driver).sleep(4000);
                                    
                                
                                }

                            })
                            }
                            catch{}
                        }
                    
                    await viewMoreBtn[verIndex].click();
                    await (await driver).sleep(4000);
                }
                     for(var i=0; i<prd.eles.length; i++)
                     {
                         var prod = prd.eles[i];
                         var selected = prod.indexes;
                         for(var index=0; index<selected.length;index++)
                         {
                             let selElement = await items[selected[index]].getRect();
                             let myWebElement = await items[selected[index]];
                             await myWebElement.click();
                             await driver.executeScript("arguments[0].click();", myWebElement);
                             await (await driver).sleep(3000);

                             let buttons = await driver.findElements(webdriver.By.className('oi732d6d ik7dh3pa d2edcug0 qv66sw1b c1et5uql a8c37x1j muag1w35 enqfppq2 jq4qci2q a3bd9o3v lrazzd5p bwm1u5wc ni8dbmo4 stjgntxs ltmttdrg g0qnabr5'));
                             var firstTime= false; 
                             async function validation(){
                                 for(var a=0; a< buttons.length; a++)
                                 {
                                     await buttons[a].getText().then(function(n){

                                         if(n.indexOf('Send')>= 0)
                                         {
                                             console.log(n)
                                             firstTime= true;
                                         }
                                        
                                     })
                                    
                                 }
                             }
                             await validation();
                             if(firstTime){
                             let textboxes = await driver.findElements(webdriver.By.className('oajrlxb2 rq0escxv f1sip0of hidtqoto lzcic4wl ijkhr0an nlq1og4t sgqwj88q b3i9ofy5 oo9gr5id b1f16np4 hdh3q7d8 dwo3fsh8 qu0x051f esr5mh6w e9989ue4 r7d6kgcz br7hx15l h2jyy9rg n3ddgdk9 owxd89k7 ihxqhq3m jq4qci2q k4urcfbm iu8raji3 tv7at329 l60d2q6s d1544ag0 hwnh5xvq tw6a2znq o1lsuvei'));
                            
                             for(var g=0; g< textboxes.length; g++)
                             {
                                 try{
                                     await textboxes[g].sendKeys( webdriver.Key.RETURN);
                                     await textboxes[g].sendKeys( " what would be your best price?? ",webdriver.Key.RETURN);
                                 }
                                 catch{

                                     continue;
                                 }
                                
                                
                             }
                             await (await driver).sleep(8000);
                             }
                             else{
                                 await driver.findElement(webdriver.By.tagName("body")).sendKeys( webdriver.Key.ESCAPE);
                                 await (await driver).sleep(2000)
                                 await driver.findElement(webdriver.By.tagName("body")).sendKeys( webdriver.Key.ESCAPE);
                                 await (await driver).sleep(3000);
                             }
                         }
                     } 
            }
                await (await driver).sleep(5000);
                await driver.quit();
                await search();
        
        }
        catch{
            await (await driver).sleep(3000);
            await driver.quit();
            await search();

        }
      })();


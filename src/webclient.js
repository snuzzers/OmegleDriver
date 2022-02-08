const firefox = require('selenium-webdriver/firefox');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { ElementNotInteractableError } = require('selenium-webdriver/lib/error');



// ------------------------------------------------
// ------------------------------------------------


const interests = [
    "genshin", "genshin impact"
];

const advert = "Hi! Give me money :)";


// ------------------------------------------------
// ------------------------------------------------




(async function example() {
    let driver = await new Builder().forBrowser('firefox')
    //.setFirefoxOptions(new firefox.Options().headless())
    .build();

    await driver.get("https://omegle.com");
    await driver.findElement(By.className('newtopicinput')).sendKeys(interests.join(), Key.RETURN);
    await driver.findElement(By.id('textbtn')).click();
    await driver.findElement(By.xpath('/html/body/div[7]/div/p[1]/label/input')).click(); await driver.findElement(By.xpath('/html/body/div[7]/div/p[2]/label/input')).click();
    await driver.findElement(By.css('body > div:nth-child(11) > div:nth-child(1) > p:nth-child(4) > input:nth-child(1)')).click();

    while (true) {
        let disconnectBtn = await driver.findElement(By.className('disconnectbtn'));
        let disconnectText = await disconnectBtn.getText();
        disconnectText = disconnectText.toLowerCase();

        try {
            let textBox = await driver.findElement(By.className('chatmsg'));
            await textBox.sendKeys(advert, Key.RETURN);
        } catch (e) {
            if (e instanceof ElementNotInteractableError) {
                if (disconnectText.includes('new')) {
                    await disconnectBtn.click();
                }
                continue;
            }
        }

        if (disconnectText.includes('new')) {
            await disconnectBtn.click();
        }
        else if (disconnectText.includes("stop")) {
            await disconnectBtn.click(); await disconnectBtn.click();
        }

    }


})();
import { URLS, SELECTORS, CREDENTIALS } from '../config/config.js';
import { logInfo } from '../utils/logger.js';

export async function loginToHookTheory(page) {
    await page.goto(URLS.loginPage, { waitUntil: 'networkidle2' });
    
    await page.waitForSelector(SELECTORS.csrfToken);
    
    const csrfToken = await page.$eval(SELECTORS.csrfToken, el => el.value);
    
    await page.type(SELECTORS.usernameInput, CREDENTIALS.username);
    await page.type(SELECTORS.passwordInput, CREDENTIALS.password);
    
    await page.evaluate((csrfToken, SELECTORS) => {
    document.querySelector(SELECTORS.csrfToken).value = csrfToken;
    }, csrfToken, SELECTORS);
    
    await page.click(SELECTORS.submitButton);
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    
    logInfo("Login realizado com sucesso!");
    }

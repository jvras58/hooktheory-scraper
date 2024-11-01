import { loginToHookTheory } from './scraping/login-scraper.js';
import { scrapeArtistsWithPagination } from './scraping/artists-scraper.js';
import { logInfo, logError } from './utils/logger.js';
import { startBrowser, closeBrowser } from './config/browser.js';
import { saveScreenshot, saveDataToDB } from './utils/fileManager.js';


(async () => {
let browser;

try {
    browser = await startBrowser();
    const page = await browser.newPage();

    logInfo('Navegador iniciado e página configurada.');

    await loginToHookTheory(page);

    logInfo('Login concluído com sucesso.');

    await saveScreenshot(page, 'login_success.png');

    logInfo('Captura de tela salva com sucesso.');

    const artists = await scrapeArtistsWithPagination(page);

    saveDataToDB(artists, 'artists');

} catch (error) {
    logError(error);
} finally {
    await closeBrowser(browser);
    logInfo('Navegador fechado.');
}
})();

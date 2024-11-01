import puppeteer from 'puppeteer';
import { PUPPETEER_OPTIONS } from './config.js';

export async function startBrowser() {
  return puppeteer.launch(PUPPETEER_OPTIONS);
}

export async function closeBrowser(browser) {
  if (browser) await browser.close();
}

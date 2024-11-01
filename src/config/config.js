import dotenv from 'dotenv';

dotenv.config();

export const PUPPETEER_OPTIONS = {
  headless: true, // Defina como false para ver o navegador em ação (útil para depuração) [so funciona fora do ambiente docker]
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};

export const URLS = {
  loginPage: 'https://www.hooktheory.com/user/login/login',
  artistsPage: 'https://www.hooktheory.com/theorytab/artists',
  mongoDB: process.env.MONGO_URI || 'mongodb://mongodb:27017',
};

export const SELECTORS = {
  csrfToken: 'input[name="YII_CSRF_TOKEN"]',
  usernameInput: 'input[name="UserLogin[username]"]',
  passwordInput: 'input[name="UserLogin[password]"]',
  submitButton: 'button[type="submit"]',
  artistLink: 'ul.yt-list li.overlay-trigger a.a-no-decoration',
  artistName: 'p.song',
};

export const CREDENTIALS = {
  username: 'jonhdoe@exemplo.com',
  password: '1234',
};

export const PATHS = {
  screenshots: 'screenshots',
};
import { URLS, SELECTORS } from '../config/config.js';

// TODO: MELHORAR A FUNÇÃO DE SCRAPING SEGUINDO AS INSTRUÇÕES ABAIXO:
// - a função deve procurar a paginação pelos botões e não pela URL (como está atualmente)

export async function scrapeArtistsWithPagination(page) {
const artists = [];

await page.goto(URLS.artistsPage, { waitUntil: 'networkidle2' });

const letterLinks = await page.$$eval('div a.btn', links =>
links
    .filter(link => /^[A-Z]$/.test(link.textContent.trim()))
    .map(link => ({
    url: link.href,
    letter: link.textContent.trim(),
    }))
);

for (const { url, letter } of letterLinks) {
console.log(`\nAcessando a letra: ${letter}`);
let pageIndex = 1;
let hasMorePages = true;

while (hasMorePages) {
    const pageUrl = pageIndex === 1 ? url : `${url}?page=${pageIndex}`;

    try {
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

    const pageArtists = await page.$$eval(
        SELECTORS.artistLink,
        (elements, artistNameSelector) =>
            elements.map(el => ({
                name: el.querySelector(artistNameSelector)?.innerText.trim(),
                url: el.href
            })),
        SELECTORS.artistName
    );

    console.log(`Encontrados ${pageArtists.length} artistas na página ${pageIndex} de letra ${letter}`);
    artists.push(...pageArtists);

    if (pageArtists.length === 500) {
        pageIndex++;
    } else {
        console.log(`Fim das páginas para a letra ${letter} (menos de 500 artistas).\n`);
        hasMorePages = false;
    }

    } catch (error) {
    if (error.name === 'TimeoutError') {
        console.log(`Timeout na página ${pageIndex} de letra ${letter}, fim da letra.\n`);
        hasMorePages = false;
    } else {
        throw error;
    }
    }
}

if (letter === 'Z') {
    console.log('Letra Z alcançada. Finalizando scraping.');
    break;
}
}

console.log('Finalizado o scraping de todas as letras.\n');
return artists;
}

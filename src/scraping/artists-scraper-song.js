import { URLS, SELECTORS } from '../config/config.js';

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
        const artistLinks = [];

        while (hasMorePages) {
            const pageUrl = pageIndex === 1 ? url : `${url}?page=${pageIndex}`;
            try {
                await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
                const pageArtists = await page.$$eval(SELECTORS.artistLink, links =>
                    links.map(link => ({
                        name: link.querySelector('p.song')?.innerText.trim(),
                        artistUrl: link.href,
                    }))
                );
                console.log(`Encontrados ${pageArtists.length} artistas na página ${pageIndex} de letra ${letter}`);
                artistLinks.push(...pageArtists);

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

        console.log(`Coletando músicas para artistas da letra ${letter}`);
        const maxParallelPages = 3;
        const songPromises = [];
        
        for (const artist of artistLinks) {
            if (songPromises.length >= maxParallelPages) {
                await Promise.all(songPromises);
                songPromises.length = 0;
            }
            
            const songPromise = (async () => {
                const artistPage = await page.browser().newPage();
                try {
                    await artistPage.goto(artist.artistUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
                    const artistSongs = await artistPage.$$eval(SELECTORS.artistLink, songLinks =>
                        songLinks.map(songLink => songLink.querySelector('p.song')?.innerText.trim())
                    );
                    artists.push({
                        name: artist.name,
                        songs: artistSongs,
                    });
                    console.log(`Músicas coletadas para ${artist.name}: ${artistSongs.length} músicas encontradas.`);
                } catch (error) {
                    console.log(`Erro ao coletar músicas para ${artist.name}: ${error.message}`);
                } finally {
                    await artistPage.close();
                }
            })();

            songPromises.push(songPromise);
        }

        await Promise.all(songPromises);

        if (letter === 'Z') {
            console.log('Letra Z processada. Finalizando o scraping.');
            break;
        }
    }

    console.log('Finalizado o scraping de todas as letras.\n');
    return artists;
}

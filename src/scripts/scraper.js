const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // await getMonsters(page);
    // await getAfflictedMaterials(page);
    await getWeaponAugments(page);

    await browser.close();
})();

const getMonsters = async (page) => {
    await page.goto('https://mhrise.mhrice.info/monster.html');

    const largeMonsterList = await page.$('#slist-monster');

    const largeMonsters = (await largeMonsterList.$$eval('li', (nodes) => {
        return nodes.map(n => {
            const img = n.querySelector('img')?.src;
            const name = n.querySelector('span[lang="en"')?.innerText;
            return [name, img];
        })
    })).filter(e => e.every(v => v !== null));

    fs.writeFile("src/data/large_monsters.json", JSON.stringify(largeMonsters.map(e => e[0])), (err) => { if (err) { console.log(err) } })
}

const getAfflictedMaterials = async (page) => {
    await page.goto('https://mhrise.mhrice.info/item.html#material');

    const afflictedMaterials = (await page.$$eval('#slist-item [data-filter="material"]', (nodes) => nodes.map(n => {
        return n.querySelector('span [lang="en"]')?.innerText;
    }))).filter(e => /^(Afflicted|Risen)/.exec(e))

    fs.writeFile("src/data/afflicted_materials.json", JSON.stringify(afflictedMaterials), (err) => { if (err) { console.log(err) } })
}

const getWeaponAugments = async (page) => {
    await page.goto('https://monsterhunter.fandom.com/wiki/MHRS:_Qurious_Crafting');

    // First table is the table of augments and upgrade materials
    const augments = (await page.$eval('table', node => {
        const rows = Array.from(node.querySelectorAll('tr').values());

        // Discard header row
        return rows.slice(0, rows.length - 1).map(e => {
            const [augmentCol, materialsCol, ..._rest] = e.querySelectorAll('td');

            if (materialsCol === undefined) { return; }
            const materials = materialsCol.innerText
                // Remove afflicted material point cost
                .split('\n')
                .slice(0, -1)
                // Separate quantity required
                .map(e => {
                    const match = /(.*) x([\d+]$)/.exec(e);
                    if (match === null) { return e; }
                    const [_, material, quantity, ..._rest] = match;
                    return [material, parseInt(quantity)]
                })
            // Discard points cost
            return [augmentCol.innerText, materials];
        })

    }))
        .filter(e => e !== null);

    console.log(augments);
    fs.writeFile("src/data/augments.json", JSON.stringify(augments), (err) => { if (err) { console.log(err) } })
}
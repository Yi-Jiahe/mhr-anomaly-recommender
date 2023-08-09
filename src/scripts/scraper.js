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
    await page.goto('https://monsterhunterrise.wiki.fextralife.com/Qurious+Weapon+Crafting');

    const tableHandles = await page.$$('.wiki_table');
    // Discard first table of materials to monsters
    // Tables are reversed for some reason
    tableHandles.pop(0);



    // First table has only 3 columns
    const augmentNames = ["Anomaly Slot", "Attack Boost", "Affinity Boost", "Shelling Level Boost", "Elemental Boost", "Rampage Boost", "Sharpness Boost", "Status Effect Boost"];
    const augments = await Promise.all(tableHandles.map((e, i) => e.evaluate((n, augment) => {
        return Array.from(n.querySelectorAll('tr')).map((e, i) => {
            // Discard header
            if (i === 0) { return null; }

            const materials = Array.from(e.querySelectorAll('li'))
                .map(e => {
                    const a = e.querySelector('a');
                    if (a === null) return;

                    return material = a.innerText
                        // Remove space before final +
                        .replace(/ \+$/, '+');
                })
                .filter(e => !!e);

            return [`${augment} Lv.${i}`, materials];
        }).filter(e => e !== null);
    }, augmentNames[i])));

    console.log(JSON.stringify(augments));
    fs.writeFile("src/data/augments.json", JSON.stringify(augments), (err) => { if (err) { console.log(err) } })
}
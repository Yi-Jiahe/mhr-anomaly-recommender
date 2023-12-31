import React, { useState } from 'react';
import './App.css';
import weaponAugments from './data/augments.json';
import largeMonsters from './data/large_monsters.json';

const TypeToMonster: { [key: string]: string[] } = {
  "Bone": [
    "Arzuros",
    "Lagombi",
    "Volvidon",
  ],
  "Pelt": [
    "Great Baggi",
    "Great Izuchi",
    "Great Wroggi",
    "Kulu-Ya-Ku"
  ],
  "Blood": [
    "Bishaten",
    "Daimyo Hermitaur",
    "Khezu",
    "Tetranadon"
  ],
  "Monster Bone": [
    "Aknosom",
    "Barroth",
    "Basarios",
    "Royal Ludroth"
  ],
  "Shell": [
    "Blood Orange Bishaten",
    "Jyuratodus",
    "Shogun Ceanataur",
    "Somnacanth"
  ],
  "Scale": [
    "Anjanath",
    "Pukei-Pukei",
    "Rathian",
    "Tobi-Kadachi"
  ],
  "Claw": [
    "Almudron",
    "Aurora Somnacanth",
    "Goss Harag",
    "Rakna-Kadaki",
  ],
  "Fang": [
    "Barioth",
    "Garangolm",
    "Magnamalo",
    "Nargacuga"
  ],
  "Dire Scale": [
    "Astalos",
    "Mizutsune",
    "Rathalos"
  ],
  "Dire Bone": [
    "Lunagaron",
    "Magma Almudron",
    "Tigrex",
  ],
  "Dire Horn": [
    "Diablos",
    "Seregios",
    "Zinogre"
  ],
  "Dire Shell": [
    "Bazelgeuse",
    "Espinas",
    "Gore Magala"
  ],
  "Dire Claw": [
    "Pyre Rakna-Kadaki",
    "Rajang"
  ],
  "Dire Wing": [
    "Gold Rathian",
    "Silver Rathalos"
  ],
  "Dire Fang": [
    "Furious Rajang",
    "Scorned Magnamalo"
  ],
  "Dire Blood": [
    "Chaotic Gore Magala",
    "Flaming Espinas",
    "Seething Bazelgeuse"
  ],
  "Risen Bone": [
    "Risen Chameleos",
    "Risen Kushala Daora",
    "Risen Teostra"
  ],
  "Risen Dragon Blood": [
    "Risen Shagaru Magala",
    "Risen Crimson Glow Valstrax"
  ]
}

const AfflictedMaterials: { [key: string]: any } = {
  // A1
  // Bones
  "Afflicted Bone": {
    "Type": "Bone",
    "Anomaly Rank": [1, 30]
  },
  "Afflicted Hardbone": {
    "Type": "Bone",
    "Anomaly Rank": [31, 100]
  },
  "Afflicted Slogbone": {
    "Type": "Bone",
    "Anomaly Rank": [101, 300]
  },
  // Pelts
  "Afflicted Pelt": {
    "Type": "Pelt",
    "Anomaly Rank": [1, 30]
  },
  "Afflicted Hide+": {
    "Type": "Pelt",
    "Anomaly Rank": [31, 100]
  },
  "Afflicted Thickhide": {
    "Type": "Pelt",
    "Anomaly Rank": [101, 300]
  },

  // A2
  // Blood
  "Afflicted Blood": {
    "Type": "Blood",
    "Anomaly Rank": [1, 31]
  },
  "Afflicted Dragon Blood": {
    "Type": "Blood",
    "Anomaly Rank": [101, 100]
  },
  "Afflicted Pure Blood": {
    "Type": "Blood",
    "Anomaly Rank": [101, 300]
  },
  // Monster Bone
  "Afflicted Monster Bone": {
    "Type": "Monster Bone",
    "Anomaly Rank": [1, 31]
  },
  "Afflicted Monster Hardbone": {
    "Type": "Monster Bone",
    "Anomaly Rank": [31, 101]
  },
  "Afflicted Monster Slogbone": {
    "Type": "Monster Bone",
    "Anomaly Rank": [101, 300]
  },

  // A3
  // Shell
  "Afflicted Shell": {
    "Type": "Shell",
    "Anomaly Rank": [1, 31]
  },
  "Afflicted Carapace": {
    "Type": "Shell",
    "Anomaly Rank": [31, 101]
  },
  "Afflicted Cortex": {
    "Type": "Shell",
    "Anomaly Rank": [101, 300]
  },
  // Scale
  "Afflicted Scale": {
    "Type": "Scale",
    "Anomaly Rank": [1, 31]
  },
  "Afflicted Scale+": {
    "Type": "Scale",
    "Anomaly Rank": [31, 101]
  },
  "Afflicted Shard": {
    "Type": "Scale",
    "Anomaly Rank": [101, 300]
  },

  // A4
  // Claw
  "Afflicted Claw": {
    "Type": "Claw",
    "Anomaly Rank": [1, 31]
  },
  "Afflicted Claw+": {
    "Type": "Claw",
    "Anomaly Rank": [31, 101]
  },
  "Afflicted Hardclaw": {
    "Type": "Claw",
    "Anomaly Rank": [101, 300]
  },
  // Fang
  "Afflicted Fang": {
    "Type": "Fang",
    "Anomaly Rank": [1, 31]
  },
  "Afflicted Fang+": {
    "Type": "Fang",
    "Anomaly Rank": [31, 101]
  },
  "Afflicted Hardfang": {
    "Type": "Fang",
    "Anomaly Rank": [101, 300]
  },

  // A5
  // Dire Scale
  "Afflicted Dire Scale": {
    "Type": "Dire Scale",
    "Anomaly Rank": [51, 100]
  },
  "Afflicted Dire Scale+": {
    "Type": "Dire Scale",
    "Anomaly Rank": [101, 160]
  },
  "Afflicted Dire Shard": {
    "Type": "Dire Scale",
    "Anomaly Rank": [161, 300]
  },
  // Dire Bone
  "Afflicted Dire Bone": {
    "Type": "Dire Bone",
    "Anomaly Rank": [51, 100]
  },
  "Afflicted Dire Hardbone": {
    "Type": "Dire Bone",
    "Anomaly Rank": [101, 160]
  },
  "Afflicted Dire Slogbone": {
    "Type": "Dire Bone",
    "Anomaly Rank": [161, 300]
  },
  // Dire Horn
  "Afflicted Dire Horn": {
    "Type": "Dire Horn",
    "Anomaly Rank": [51, 100]
  },
  "Afflicted Dire Horn+": {
    "Type": "Dire Horn",
    "Anomaly Rank": [101, 160]
  },
  "Afflicted Dire Hardhorn": {
    "Type": "Dire Horn",
    "Anomaly Rank": [161, 300]
  },

  // A6
  // Dire Shell
  "Afflicted Dire Shell": {
    "Type": "Dire Shell",
    "Anomaly Rank": [51, 100]
  },
  "Afflicted Dire Carapace": {
    "Type": "Dire Shell",
    "Anomaly Rank": [101, 160]
  },
  "Afflicted Dire Cortex": {
    "Type": "Dire Shell",
    "Anomaly Rank": [161, 300]
  },
  // Dire Claw
  "Afflicted Dire Claw": {
    "Type": "Dire Claw",
    "Anomaly Rank": [51, 100]
  },
  "Afflicted Dire Claw+": {
    "Type": "Dire Claw",
    "Anomaly Rank": [101, 160]
  },
  "Afflicted Dire Hardclaw": {
    "Type": "Dire Claw",
    "Anomaly Rank": [161, 300]
  },

  // A7 & A8
  // Dire Wing
  "Afflicted Dire Wing": {
    "Type": "Dire Wing",
    "Anomaly Rank": [91, 140]
  },
  "Afflicted Dire Wing+": {
    "Type": "Dire Wing",
    "Anomaly Rank": [141, 200]
  },
  "Afflicted Dire Fellwing": {
    "Type": "Dire Wing",
    "Anomaly Rank": [201, 300]
  },

  // Dire Fang
  "Afflicted Dire Fang": {
    "Type": "Dire Fang",
    "Anomaly Rank": [91, 140]
  },
  "Afflicted Dire Fang+": {
    "Type": "Dire Fang",
    "Anomaly Rank": [141, 200]
  },
  "Afflicted Dire Hardfang": {
    "Type": "Dire Fang",
    "Anomaly Rank": [201, 300]
  },
  // Dire Blood
  "Afflicted Dire Blood": {
    "Type": "Dire Blood",
    "Anomaly Rank": [91, 140]
  },
  "Afflicted Dire Dragon Blood": {
    "Type": "Dire Blood",
    "Anomaly Rank": [141, 200]
  },
  "Afflicted Dire Darkblood": {
    "Type": "Dire Blood",
    "Anomaly Rank": [201, 300]
  },

  // A8
  // Risen Dragon Bone
  "Risen Dragonbone": {
    "Type": "Risen Bone",
    "Anomaly Rank": [111, 160],
  },
  "Risen Dragonbone+": {
    "Type": "Risen Bone",
    "Anomaly Rank": [161, 220],
  },
  "Risen Slogbone": {
    "Type": "Risen Bone",
    "Anomaly Rank": [221, 300],
  },

  // A9
  // Dragon Blood
  "Risen Dragon Blood": {
    "Type": "Risen Dragon Blood",
    "Anomaly Rank": [131, 200],
  },
  "Risen Dragon Pureblood": {
    "Type": "Risen Dragon Blood",
    "Anomaly Rank": [201, 240],
  },
  "Risen Dragon Thickblood": {
    "Type": "Risen Dragon Blood",
    "Anomaly Rank": [241, 300],
  },
}

const largeMonstersList = largeMonsters as [];
const weaponAugmentsUnpacked: [string, string[]][] = [];
(weaponAugments as [[string, string[]]][]).forEach(e => e.forEach(e => weaponAugmentsUnpacked.push(e)));
const weaponAugmentsMap: Map<string, string[]> = new Map((weaponAugmentsUnpacked as []));

function App() {
  const maxPages = 2;
  const [page, setPage] = useState(0);
  const [targetedUpgrades, setTargetedUpgrades] = useState<string[]>([]);
  const [chosenMonster, setChosenMonster] = useState<string>();

  const materials: string[] = Array.from(new Set(targetedUpgrades.reduce((acc: string[], e: string) => {
    const materials = weaponAugmentsMap.get(e)
    if (materials === undefined) return acc;
    return [...acc, ...materials]
  }, [])));

  const monsters: [string, [number, number]][] = Array.from(new Set(materials.reduce((acc: [string, [number, number]][], e: string) => {
    const material = AfflictedMaterials[e];
    const monsters: string[] = TypeToMonster[material['Type']];
    const anomaly_rank: [number, number] = material['Anomaly Rank'];
    const monsters_with_rank: [string, [number, number]][] = monsters.map((e: string) => [e, anomaly_rank]);
    return [...acc, ...monsters_with_rank];
  }, [])));

  return (
    <div className="App">
      {page > 0 && <button onClick={() => { if (page > 0) { setPage(page - 1) } }}>{"<"}</button>}
      {page < maxPages && <button onClick={() => { if (page < maxPages) { setPage(page + 1) } }}>{">"}</button>}
      <div>
        {page === 0 &&
          <div>
            {Array.from(weaponAugmentsMap).map(e => {
              const key = e[0];
              return <li key={key}>
                <input
                  key={`${key} input`}
                  type='checkbox'
                  checked={new Set(targetedUpgrades).has(key)}
                  onChange={(e) => {
                    setTargetedUpgrades(targetedUpgrades => {
                      if (e.target.checked) {
                        return Array.from(new Set([...targetedUpgrades, key]));
                      } else {
                        const targetedUpgradesSet = new Set(targetedUpgrades);
                        targetedUpgradesSet.delete(key);
                        return Array.from(targetedUpgradesSet)
                      }
                    })
                  }} />
                <label key={`${key} label`}>{key}</label>
              </li>
            })}
          </div>}
        {page === 1 &&
          <div>
            <h1>Targeted Upgrades</h1>
            <div>
              <ul>
                {targetedUpgrades.map((e) => <li key={e}>{e}</li>)}
              </ul>
            </div>
            <h1>Materials Required</h1>
            <div>
              {
                <ul>{materials.map(e => <li key={e}>{e}</li>)}</ul>
              }
            </div>
          </div>
        }
        {
          page === 2 &&
          <div>
            {
              monsters.map((e: [string, [number, number]]) => {
                const monster = `${e[0]} ${e[1][0]}-${e[1][1]}`
                return <li key={monster}>{monster}</li>
              })
            }
            <button onClick={() => {
              if (monsters.length === 0) {
                setChosenMonster(largeMonstersList[Math.floor(Math.random() * largeMonstersList.length)])
                return;
              }
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [monster, _level_range] = monsters[Math.floor(Math.random() * monsters.length)]
              setChosenMonster(monster)
            }}>Next hunt</button>
            <h1>{chosenMonster}</h1>
          </div>
        }
      </div>
    </div>
  );
}

export { App as default, AfflictedMaterials};

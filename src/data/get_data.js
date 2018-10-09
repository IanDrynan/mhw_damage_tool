var fs = require("fs")
var fetch = require("node-fetch")
const API = "https://mhw-db.com/"

function fetchGear(url) {
    const URI = encodeURI(API+url)
    return fetch(URI)
      .then(response => response.json())
      .catch(error => {
        console.warn(error)
        return null
      })
}

function getWeapons() {
    let clean = []
    fetchGear("weapons").then(weapons => {
        for (let weapon of weapons){
            if (weapon.crafting.branches.length === 0) {
                clean.push({
                    name: weapon.name,
                    type: weapon.type,
                    attack: weapon.attack.raw,
                    affinity: weapon.attributes.affinity ? weapon.attributes.affinity : 0,
                    element: weapon.elements.length > 0 ? weapon.elements : 0,
                    durability: weapon.durability
                })
            }
        }
        fs.writeFileSync('./weapons.json', JSON.stringify(clean, null, 2))
    })
    
}
function getMotionValues(){
    let clean = {
        "great-sword": [],
        "long-sword": [],
        "sword-and-shield": [],
        "dual-blades": [],
        "hammer" : [],
        "hunting-horn": [],
        "lance" : [],
        "gunlance" : [],
        "switch-axe": [],
        "charge-blade": [],
        "insect-glaive": [],
        "light-bowgun" : [],
        "heavy-bowgun" : [],
        "bow" : [],
    }
    fetchGear("motion-values").then(mvs => {
        for (let mv of mvs){
            mv.weaponType && clean[mv.weaponType].push({
                name: mv.name,
                hits: mv.hits,
            })
        }
        fs.writeFileSync('./motion_values.json', JSON.stringify(clean, null, 2))
    })
}

//getWeapons()
getMotionValues()
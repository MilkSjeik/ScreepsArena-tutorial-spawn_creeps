import { getObjectsByPrototype } from '/game/utils';
import { Creep, Flag, StructureSpawn } from '/game/prototypes';
import { MOVE } from '/game/constants';
import { } from '/arena';

console.log("Init variables");
let aMemoryFlags = [];
let iMyCreeps = 0;

export function loop() {
    const myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    const mySpawn = getObjectsByPrototype(StructureSpawn).find(struct => struct.my);
    const flags = getObjectsByPrototype(Flag);

    if(aMemoryFlags.length == 0){
        console.log("Found " + flags.length + " flags")

        // load flags in memory
        flags.forEach(flag => {
            aMemoryFlags.push({
                "flag": flag,
                // "x": flag.x,
                // "y": flag.y,
                "creep": ""
            });
        });
    }
    

    if(iMyCreeps < 2) {
        console.log("iMyCreeps: " + iMyCreeps);
        console.log("Spawn creep!");
        let creep = mySpawn.spawnCreep([MOVE,MOVE]).object;

        // Spawns later?
        if(creep) {
            console.log("Current flags: " + JSON.stringify(aMemoryFlags));

            iMyCreeps = iMyCreeps + 1;
            // find flag without linked creep
            let targetflag = aMemoryFlags.find(flag => flag.creep == "");
            console.log("Targetflag: " + JSON.stringify(targetflag));
            targetflag.creep = "X";
            // store flag
            creep.flag = targetflag.flag;
            console.log("Spawned creep: " + JSON.stringify(creep));
        }
    }
    myCreeps.forEach(myCreep => {
        console.log("Move creep to flag: " + myCreep.flag);
        // move to flag stored
        myCreep.moveTo(myCreep.flag);
    });
}

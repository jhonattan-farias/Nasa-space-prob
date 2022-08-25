let probes = [];
let probesMoved = 0;
let highlandSize = { x:0, y: 0 }

function workDirections(inputDirection,index) {

    if(inputDirection === 'L'){
        let changedDirection = {
            'S':'E',
            'E':'N',
            'N':'W',
            'W':'S'
        }
        probes[index].d = changedDirection[probes[index].d];
    }

    if(inputDirection === 'R'){
        let changedDirection = {
            'S':'W',
            'W':'N',
            'N':'E',
            'E':'S'
        }
        probes[index].d = changedDirection[probes[index].d];
    }
}

function  workMovement (index) {
    let movement = {
        'S': () => probes[index].y--,
        'W': () => probes[index].x--,
        'E': () => probes[index].x++,
        'N': () => probes[index].y++
    };
    movement[probes[index].d]()
}

function workCordinates({ x, y, d }) {
    // if(x > highlandSize.x || x - 0) return;
    // if(y > highlandSize.y || y - 0) return;
    
    probes.push({ x, y, d})
    console.log(probes)
}

module.exports = {
    workMovement,
    workDirections,
    workCordinates,
    probes,
    probesMoved,
    highlandSize
}
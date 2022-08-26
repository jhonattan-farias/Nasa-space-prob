let probes = [];
let movedProbs = 0;
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

function workMovement(index) {
    let movement = {
        'S': () => {
            if(probes[index].y - 1 < 0){
                console.log('The probe cannot go out of the demarked area')
                return true;
            }
            probes[index].y--
        },
        'W': () => {
            if(probes[index].x - 1 < 0){
                console.log('The probe cannot go out of the demarked area')
                return true;
            }
            probes[index].x--
        },
        'E': () => {
            if(probes[index].x + 1 > highlandSize.x){
                console.log('The probe cannot go out of the demarked area')
                return true;
            }
            probes[index].x++ 
        },
        'N': () => {
            if(probes[index].y + 1 > highlandSize.y){
                console.log('The probe cannot go out of the demarked area')
                return true;
            }
            probes[index].y++
        }
    };

    movement[probes[index].d]()
}

function workCordinates({ x, y, d }) {
    probes.push({ x, y, d})
    console.log(probes)
}

module.exports = {
    workMovement,
    workDirections,
    workCordinates,
    probes,
    movedProbs,
    highlandSize
}
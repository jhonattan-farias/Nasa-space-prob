const { createInterface } = require('readline');

let cordinates = { x: 0, y: 0, d:'N' };

// L R 90 graus
// M Mover a sonda
// P Aciona a camera

function workDirections(inputDirection) {
    if(inputDirection === 'L'){
        let changedDirection = {
            'S':'E',
            'E':'N',
            'N':'W',
            'W':'S'
        }
        return changedDirection[cordinates.d];
    }

    if(inputDirection === 'R'){
        let changedDirection = {
            'S':'W',
            'W':'N',
            'N':'E',
            'E':'S'
        }
        return changedDirection[cordinates.d];
    }
}

function workCordinates({ x, y, d }) {
    return { x, y, d: workDirections(d) }
}

const readLine = createInterface({
    input:process.stdin,
    output:process.stdout
})

readLine.question("Insira as cordenadas: ", answer => {
    const response = workCordinates({ 
        x: answer[0],
        y: answer[1],
        d: answer[2] 
    })


    console.log(response)
    console.log(cordinates)
    readLine.close()
})


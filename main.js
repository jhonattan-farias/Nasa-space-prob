const { createInterface } = require('readline');

let cordinates = { x: 0, y: 0, d:'S' };

// L R 90 graus
// M MOver a sonda
// P Aciona a camera

function workDirections(inputDirection) {
    if(inputDirection === 'L'){
        switch(cordinates.d){
            case 'S' :
                return 'E'
            case 'E' :
                return 'N'
            case 'N' :
                return 'W' 
            case 'W' :
                return 'S'  
        }
    }

    if(inputDirection === 'R'){
        switch(cordinates.d){
            case 'S' :
                return 'W'
            case 'W' :
                return 'N'
            case 'N' :
                return 'E'
            case 'E' :
                return 'S'   
        }
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


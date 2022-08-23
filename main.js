const { createInterface } = require('readline');

let cordinates = [];

const readLine = createInterface({
    input:process.stdin,
    output:process.stdout
})

readLine.question("Insira as cordenadas: ", answer => {
    cordinates.push(...answer)
    console.log(cordinates)
    readLine.close()
})
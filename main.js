class ReedMullerCoder {
    matrix = []
    constructor(N){
        this.N=N
        this.start = Math.pow(2, N);
        this.len = Math.pow(2, N).toString(2).length
        this.end = (Math.pow(2, N + 1) - 1);
        this.#createMatrix(N)
    }
    encodeByteString(str){
        if(str.length!==this.len)
            throw Error(`Wrong length, should be ${this.len}`)
        let byteArr=str.split("").map(x=>Number(x))
        return this.#multiplyMatrices([byteArr],this.matrix)[0].join("")
    }
    decodeByteString(encodedStr){
        let encodedArr=encodedStr.split("").map(x=>Number(x))
        let contolSums=this.#getAllExceptFirst(encodedArr)

        let decodedArrWithoutFirst=[0 ]
        for(let i=1;i<this.len; i++){
            decodedArrWithoutFirst.push(contolSums[i])
        }

        let multiply=this.#multiplyMatrices([decodedArrWithoutFirst], this.matrix)[0]
        let firstValue=this.#getMainNumber(this.#addMatrices(multiply, encodedArr))
        decodedArrWithoutFirst[0]=firstValue
        return decodedArrWithoutFirst.join("")

    }
    #addMatrices(m1,m2){
        let result = [];
        for (let i = 0; i < m1.length; i++) {
            result.push((m1[i]+m2[i]) % 2)
        }
        return result;
    }
    #getAllExceptFirst(encodedArr){
        let contolSums={}
        let diffBase=0

        for(let m=this.len-1; m>0;m--) {
            let diff = Math.pow(2, diffBase)
            let usedIndexes=[]
            let contolSumsForM=[]
            for(let i=0; i<this.start; i++){
                if(!usedIndexes.includes(i) &&( i + diff) < this.start) {
                    contolSumsForM.push((encodedArr[i] + encodedArr[i + diff]) % 2)
                    usedIndexes.push(i + diff)
                }
            }
            contolSums[m]=this.#getMainNumber(contolSumsForM)
            diffBase++
        }
        return contolSums
    }

    #getMainNumber(arr){
        let kOf1=0
        for (let i of arr){
            if(i===1)
                kOf1++
        }
        if(kOf1===(arr.length-kOf1))
            throw Error("Too much mistakes to decode")
        if(kOf1>(arr.length-kOf1))
            return 1
        else
            return 0

    }

    #createMatrix(N) {
        let numbArr = []
        for (let k = this.start; k <= this.end; k++)
            numbArr.push(k.toString(2))



        for (let j = 0; j < this.len; j++) {
            let row = []
            for (let i in numbArr)
                row.push(parseInt(numbArr[i][j]))
            this.matrix.push(row)
        }
    }

    #multiplyMatrices(m1, m2) {
        let result = [];
        for (var i = 0; i < m1.length; i++) {
            result[i] = [];
            for (var j = 0; j < m2[0].length; j++) {
                var sum = 0;
                for (var k = 0; k < m1[0].length; k++) {
                    sum += m1[i][k] * m2[k][j];
                }
                sum=sum % 2
                result[i][j] = sum;
            }
        }
        return result;
    }
}
let str="10010"
const encoder = new ReedMullerCoder(4);
console.log("Input: ",str)

let encoded=encoder.encodeByteString(str)
console.log("Encoded: ",encoded)

console.log("Decoded with no mistakes: ",encoder.decodeByteString(encoded))

let encodedWithMistakes="1100110011001100"
encodedWithMistakes="1000111011011100"

console.log("\nEncoded with mistakes: ",encodedWithMistakes)
console.log("Decoded: ",encoder.decodeByteString(encodedWithMistakes))

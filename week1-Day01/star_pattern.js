// initialize with size of pattern
const size=7
// initially print *
let pattern="*"
// external loop iterate on the size of pattern
for (let index = 0; index <= size; index++) {
    // internal loop that print * according to pattern and base on external loop iteration
    for (let inner_index = 0; inner_index < index; inner_index++) {
        // concate pattern with double *
        pattern+='**'
        
    }
    // for the next iteration just go to next line
    pattern+='\n'
    
}
// console whole string in the form of specific pattern
console.log('Left right triangle with star pattern \n')
console.log(pattern)
console.log('\n', 'Left Right Triangle with alphabetic letter ')

let pattern2=""
// count variable for next alphabet
let count=0
// specify size of the pattern
const size2=6
// external loop iterate on the size of pattern
for (let index = 0; index <= size2; index++) {
// internal loop that print * according to pattern and base on external loop iteration
    for (let inner_index = 0; inner_index < index; inner_index++) {
        // concate string from the CharCode method 

        pattern2+=String.fromCharCode(count+65)
        // increment for next letter
        count++
        
    }
    // for the next iteration just go to next line
    pattern2+='\n'
    
}
// console specific pattern
console.log('\n',pattern2)

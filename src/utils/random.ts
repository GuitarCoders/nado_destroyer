export function generateRandomArray (maxValue: number, length: number): number[] {

    // 0 ~ maxValue in array
    const numberArray = Array.from({ length:maxValue }, (_, i) => i);

    for (let i = numberArray.length; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random()*numberArray.length-1)
        const temp = numberArray[randomIndex]
        numberArray[randomIndex] = numberArray[i];
        numberArray[i] = temp;
    }
    
    return numberArray.slice(0, length);
}
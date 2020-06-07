export function getMergeSortAnimations(array) {
    let animations = [];
    let auxillaryArray = array.slice();
    mergeSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log(arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

function mergeSort(auxiliaryArray, startIdx, endIdx, animations) {
    if (startIdx === endIdx)
        return;

    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSort(auxiliaryArray, startIdx, middleIdx, animations);
    mergeSort(auxiliaryArray, middleIdx + 1, endIdx, animations);
    merge(auxiliaryArray, startIdx, middleIdx, endIdx, animations);
}

function merge(auxiliaryArray, startIdx, middleIdx, endIdx, animations) {
    let sortArray = [];
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        // Comparing the values at i`th and j`th index so pushing them to change their color
        animations.push([i, j]);

        // By changing the colors of the current indexes, we imply that
        // the value at those two indexes is being compared.push
        // after performing the swap, we need to revert them 
        // to their original color so we push them again.
        animations.push([i, j]);

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We should overwrite the value at (i+startIdx)th index with i`th index
            // so we push them to highlight them and swap their heights.
            animations.push([sortArray.length + startIdx, auxiliaryArray[i]]);
            sortArray.push(auxiliaryArray[i++]);
        }
        else {
            // Otherwise if the value at the i`th index is greater than the value at j`th index,
            // we need to overwrite the value at (i+startIdx)th index with j`th index
            // so we push them to highlight them and swap their heights.
            animations.push([sortArray.length + startIdx, auxiliaryArray[j]]);
            sortArray.push(auxiliaryArray[j++]);
        }
    }

    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([sortArray.length + startIdx, auxiliaryArray[i]]);
        sortArray.push(auxiliaryArray[i++]);
    }

    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([sortArray.length + startIdx, auxiliaryArray[j]]);
        sortArray.push(auxiliaryArray[j++]);
    }

    for (let i = startIdx; i <= endIdx; i++)
        auxiliaryArray[i] = sortArray[i - startIdx];
}

function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length)
        return false;

    for (let i = 0; i < firstArray.length; i++) {
        if (firstArray[i] !== secondArray[i])
            return false;
    }
    return true;
}
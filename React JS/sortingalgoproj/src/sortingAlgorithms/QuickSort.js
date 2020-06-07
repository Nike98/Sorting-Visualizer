export function getQuickSortAnimations(array) {
    let animations = [];
    let auxillaryArray = array.slice();
    quickSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("quick sort works correctly? ", arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

getQuickSortAnimations([7,2,1,6]);

function quickSort(auxillaryArray, startIdx, endIdx, animations) {
    let pivotIdx;

    if (startIdx < endIdx) {
        pivotIdx = partitionArray(auxillaryArray, startIdx, endIdx, animations);
        quickSort(auxillaryArray, startIdx, pivotIdx - 1, animations);
        quickSort(auxillaryArray, pivotIdx + 1, endIdx, animations);
    }
}

function partitionArray(auxillaryArray, startIdx, endIdx, animations) {
    let pivot = auxillaryArray[endIdx];
    let pivotIdx = startIdx;

    for (let i = startIdx; i <= endIdx - 1; i++) {
        animations.push([i, endIdx]);
        animations.push([i, endIdx]);

        if (auxillaryArray[i] <= pivot) {
            // Swap the two heights
            animations.push([i, auxillaryArray[pivotIdx]]);
            animations.push([pivotIdx, auxillaryArray[i]]);
            swap(auxillaryArray, i, pivotIdx);
            pivotIdx++;
        }
        else {
            animations.push([-1, -1]);
            animations.push([-1, -1]);
        }
        animations.push([-1, -1]);
        animations.push([-1, -1]);
    }
    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([-1, -1]);

    // Swap these two heights
    animations.push([pivotIdx, auxillaryArray[endIdx]]);
    animations.push([endIdx, auxillaryArray[pivotIdx]]);
    swap(auxillaryArray, pivotIdx, endIdx);
    return pivotIdx;
}

function swap(auxillaryArray, firstIdx, secondIdx) {
    let temp = auxillaryArray[firstIdx];
    auxillaryArray[firstIdx] = auxillaryArray[secondIdx];
    auxillaryArray[secondIdx] = temp;
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
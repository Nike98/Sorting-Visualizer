export function getSelectionSortAnimations(array) {
    let animations = [];
    let auxillaryArray = array.slice();
    selectionSort(auxillaryArray, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("selection sort works correctly? ", arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

function selectionSort(auxillaryArray, animations) {
    const N = auxillaryArray.length;

    for (let i = 0; i < N - 1; i++) {
        // Finding the index of the smallest element in the Unsorted Array
        let minIdx = i;

        for (let j = i + 1; j < N; j++) {
            animations.push(["comparison1", j, minIdx]);
            animations.push(["comparison2", j, minIdx]);

            if (auxillaryArray[j] < auxillaryArray[minIdx])
                minIdx = j;
        }
        animations.push(["swap", minIdx, auxillaryArray[i]]);
        animations.push(["swap", i, auxillaryArray[minIdx]]);

        // Swap the smallest element found with the element at the index being comaperd
        swap(auxillaryArray, minIdx, i);
    }
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
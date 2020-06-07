import React from 'react';
import './SortingVisualizer.css'
import {getBubbleSortAnimations} from '../sortingAlgorithms/BubbleSort';
import {getInsertionSortAnimations} from '../sortingAlgorithms/InsertionSort';
import {getMergeSortAnimations} from '../sortingAlgorithms/MergeSort';
import {getQuickSortAnimations} from '../sortingAlgorithms/QuickSort';
import {getSelectionSortAnimations} from '../sortingAlgorithms/SelectionSort';

// Changing the Width and Height according to the Browser
let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
let NUMBER_OF_ARRAY_BARS = parseInt((WINDOW_WIDTH - 200) / 8);

function reportWindowSize() {
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
    NUMBER_OF_ARRAY_BARS = parseInt((WINDOW_WIDTH - 200) / 8);
}

window.onresize = reportWindowSize; 

const PRIMARY_COLOR = 'turquoise';  // Normal color of the bars
const SECONDARY_COLOR = 'red';      // Color of the bars when they rae being compared
const ANIMATION_SPEED_MS = 10       // Animation speed : how fast the color changes; the heights get overwritten

// Tooltips for all the buttons
const DISABLED_BUTTON = "Currently Disabled"
const ENABLED_BUTTON = {
    nlogn: "O(NlogN) Time Complexity",
    nSquare: "O(N^2) Time Complexity"
}

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { array: [] };
    }

    componentDidMount() {   this.resetArray();  }

    // Generates new random Array
    resetArray() {
        const array = []

        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(25, WINDOW_HEIGHT - 30));
        }

        this.setState({array: array});
        this.restoreStoreButtons();
    }

    disableSortButtons() {
        document.getElementById("bubbleSort").disabled = true;
        let buttonStyle = document.getElementById("bubbleSort").style;
        document.getElementById("bubbleSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";
        
        document.getElementById("insertionSort").disabled = true;
        buttonStyle = document.getElementById("insertionSort").style;
        document.getElementById("insertionSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";
        
        document.getElementById("mergeSort").disabled = true;
        buttonStyle = document.getElementById("mergeSort").style;
        document.getElementById("mergeSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("quickSort").disabled = true;
        buttonStyle = document.getElementById("quickSort").style;
        document.getElementById("quickSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("selectionSort").disabled = true;
        buttonStyle = document.getElementById("selectionSort").style;
        document.getElementById("selectionSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";
    }

    restoreStoreButtons() {
        document.getElementById("bubbleSort").disabled = false;
        let buttonStyle = document.getElementById("bubbleSort").style;
        document.getElementById("bubbleSort").title = ENABLED_BUTTON.nlogn;
        buttonStyle.cursor = "pointer";
        buttonStyle.background = "#47535E";
        
        document.getElementById("insertionSort").disabled = false;
        buttonStyle = document.getElementById("insertionSort").style;
        document.getElementById("insertionSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.cursor = "pointer";
        buttonStyle.background = "#47535E";

        document.getElementById("mergeSort").disabled = false;
        buttonStyle = document.getElementById("mergeSort").style;
        document.getElementById("mergeSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.cursor = "pointer";
        buttonStyle.background = "#47535E";

        document.getElementById("quickSort").disabled = false;
        buttonStyle = document.getElementById("quickSort").style;
        document.getElementById("quickSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.cursor = "pointer";
        buttonStyle.background = "#47535E";

        document.getElementById("selectionSort").disabled = false;
        buttonStyle = document.getElementById("selectionSort").style;
        document.getElementById("selectionSort").title = ENABLED_BUTTON.nlogn;
        buttonStyle.cursor = "pointer";
        buttonStyle.background = "#47535E";
    }

    // All the code for calling all the Sorting Algorithms and binding them to the 
    bubbleSort() {
        this.disableSortButtons();

        const [animations, sortArray] = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChanged = (i % 4 === 0) || (i % 4 === 1);
            const arrayBars = document.getElementsByClassName('array-bar');

            if(isColorChanged === true) {
                const color = (i % 4 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                // If we don't multiply every animation by the index then,
                // every i`th animation will wait for exactly ANIMATION_SPEED_MS
                // and immediately change into final state
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [barIdx, newHeight] = animations[i];
                if (barIdx === -1)  { continue; }

                const barStyle = arrayBars[barIdx].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
        setTimeout(() => this.restoreStoreButtons, RESTORE_TIME);
    }

    insertionSort() {
        this.disableSortButtons();
        const [animations, sortArray] = getInsertionSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const isColorChanged = (animations[i][0] === "comparison1") ||
                                    (animations[i][0] === "comparison2");
            const arrayBars = document.getElementsByClassName('array-bar');

            if (isColorChanged === true) {
                const color = (animations[i][0] === "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIdx, newHeight] = animations[i];
                const barStyle = arrayBars[barIdx].style;

                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
        setTimeout(() => this.restoreStoreButtons, RESTORE_TIME);
    }

    mergeSort() {
        this.disableSortButtons();
        const [animations, sortArray] = getMergeSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const isColorChanged = (i % 3 !== 2);
            const arrayBars = document.getElementsByClassName('array-bar');

            if (isColorChanged === true) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const color = (i % 3 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
        setTimeout(() => this.restoreStoreButtons, RESTORE_TIME);
    }

    quickSort() {
        this.disableSortButtons();
        const [animations, sortArray] = getQuickSortAnimations(this.state.array);

        for (let i = 0; i < animations.length - 1; i++) {
            const isColorChanged = (i % 6 === 0) || (i % 6 === 1);
            const arrayBars = document.getElementsByClassName('array-bar');

            if (isColorChanged === true) {
                const color = (i % 6 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [barOneIdx, barTwoIdx] = animations[i];

                if (barOneIdx === -1) { continue; }

                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [barIdx, newHeight] = animations[i];

                if (barIdx === -1) { continue; }

                const barStyle = arrayBars[barIdx].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
        setTimeout(() => this.restoreStoreButtons, RESTORE_TIME);
    }

    selectionSort() {
        this.disableSortButtons();
        const [animations, sortArray] = getSelectionSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const isColorChanged = (animations[i][0] === "comparison1") ||
                                    (animations[i][0] === "comparison2");
            const arrayBars = document.getElementsByClassName('array-bar');

            if (isColorChanged === true) {
                const color = (animations[i][0] === "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIdx, newHeight] = animations[i];
                const barStyle = arrayBars[barIdx].style;

                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
        setTimeout(() => this.restoreStoreButtons, RESTORE_TIME);
    }

    render() {
        const array = this.state.array;
        const SORT_BUTTONS = 6;
        const TOTAL_BUTTONS = 1 + SORT_BUTTONS;

        return (
            <>
                <div className="array-container" style={{position: 'absolute', right:`20px`}}>
                    {array.map((value, idx) => (
                        <div 
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`
                            }}>
                        </div>
                    ))}
                </div>

                <div className="buttons">
                    <button title="Generates a new random Array" 
                        style={{position:'relative', top:`${0 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px`}}
                        onClick={() => this.resetArray()}>Generate New Array</button>

                    <button title="O(N^2) Time Complexity" id="bubbleSort"
                        style={{position:'relative', top:`${0.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px`}}
                        onClick={() => this.bubbleSort()}>Bubble Sort</button>

                    <button title="O(N^2) Time Complexity" id="insertionSort"
                        style={{position:'relative', top:`${1.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px`}}
                        onClick={() => this.insertionSort()}>Insertion Sort</button>

                    <button title="O(NlogN) Time Complexity" id="mergeSort"
                        style={{position:'relative', top:`${2.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px`}}
                        onClick={() => this.mergeSort()}>Merge Sort</button>

                    <button title="O(N^2) Time Complexity" id="quickSort"
                        style={{position:'relative', top:`${3.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px`}}
                        onClick={() => this.quickSort()}>Quick Sort</button>

                    <button title="O(N^2) Time Complexity" id="selectionSort"
                        style={{position:'relative', top:`${4.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px`}}
                        onClick={() => this.selectionSort()}>Selection Sort</button>
                </div>
            </>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
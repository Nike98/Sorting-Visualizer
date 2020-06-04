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
const DISABLED_BUTTON = "Currently Disabled";
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
        const array = [];

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
        let buttonStyle = document.getElementById("insertionSort").style;
        document.getElementById("insertionSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";
        
        document.getElementById("mergeSort").disabled = true;
        let buttonStyle = document.getElementById("mergeSort").style;
        document.getElementById("mergeSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("quickSort").disabled = true;
        let buttonStyle = document.getElementById("quickSort").style;
        document.getElementById("quickSort").title = DISABLED_BUTTON;
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
        let buttonStyle = document.getElementById("insertionSort").style;
        document.getElementById("insertionSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.cursor = "pointer";
        buttonStyle.background = "#47535E";

        document.getElementById("mergeSort").disabled = false;
        let buttonStyle = document.getElementById("mergeSort").style;
        document.getElementById("mergeSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.cursor = "pointer";
        buttonStyle.background = "#47535E";

        document.getElementById("quickSort").disabled = false;
        let buttonStyle = document.getElementById("quickSort").style;
        document.getElementById("quickSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.cursor = "pointer";
        buttonStyle.background = "#47535E";

        document.getElementById("selectionSort").disabled = false;
        let buttonStyle = document.getElementById("selectionSort").style;
        document.getElementById("selectionSort").title = ENABLED_BUTTON.nlogn;
        buttonStyle.cursor = "pointer";
        buttonStyle.background = "#47535E";
    }

}
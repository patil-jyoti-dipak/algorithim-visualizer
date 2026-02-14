let array = [];
let isRunning = false;

const visualization = document.getElementById("visualization");
const explanation = document.getElementById("explanation");
const speedSlider = document.getElementById("speed");
const algorithmSelect = document.getElementById("algorithm");
const targetInput = document.getElementById("target");

algorithmSelect.addEventListener("change", () => {
    if (algorithmSelect.value === "linear" || algorithmSelect.value === "binary") {
        targetInput.style.display = "inline-block";
    } else {
        targetInput.style.display = "none";
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateArray() {
    if (isRunning) return;

    array = [];
    visualization.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        let value = Math.floor(Math.random() * 100);
        array.push(value);

        let bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.innerText = value;
        visualization.appendChild(bubble);
    }

    explanation.innerText = "New array generated.";
}

async function startAlgorithm() {
    if (isRunning) return;
    isRunning = true;

    let algo = algorithmSelect.value;

    if (algo === "bubble") await bubbleSort();
    if (algo === "selection") await selectionSort();
    if (algo === "insertion") await insertionSort();
    if (algo === "linear") await linearSearch();
    if (algo === "binary") await binarySearch();

    isRunning = false;
}

function getBubbles() {
    return document.getElementsByClassName("bubble");
}

/* ================= BUBBLE SORT ================= */

async function bubbleSort() {
    let bubbles = getBubbles();

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            bubbles[j].classList.add("compare");
            bubbles[j+1].classList.add("compare");

            explanation.innerText = `Comparing ${array[j]} and ${array[j+1]}`;
            await sleep(speedSlider.value);

            if (array[j] > array[j+1]) {

                bubbles[j].classList.add("swap");
                bubbles[j+1].classList.add("swap");

                explanation.innerText = `Swapping ${array[j]} and ${array[j+1]}`;
                await sleep(speedSlider.value);

                [array[j], array[j+1]] = [array[j+1], array[j]];
                bubbles[j].innerText = array[j];
                bubbles[j+1].innerText = array[j+1];
            }

            bubbles[j].className = "bubble";
            bubbles[j+1].className = "bubble";
        }
        bubbles[array.length - i - 1].classList.add("sorted");
    }

    explanation.innerText = "Array Sorted!";
}

/* ================= SELECTION SORT ================= */

async function selectionSort() {
    let bubbles = getBubbles();

    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bubbles[i].classList.add("compare");

        for (let j = i + 1; j < array.length; j++) {

            bubbles[j].classList.add("compare");
            explanation.innerText = `Checking if ${array[j]} < ${array[minIndex]}`;
            await sleep(speedSlider.value);

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }

            bubbles[j].classList.remove("compare");
        }

        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        bubbles[i].innerText = array[i];
        bubbles[minIndex].innerText = array[minIndex];

        bubbles[i].classList.add("sorted");
    }

    explanation.innerText = "Array Sorted!";
}

/* ================= INSERTION SORT ================= */

async function insertionSort() {
    let bubbles = getBubbles();

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {

            bubbles[j].classList.add("compare");
            explanation.innerText = `Moving ${array[j]} forward`;
            await sleep(speedSlider.value);

            array[j+1] = array[j];
            bubbles[j+1].innerText = array[j];

            bubbles[j].classList.remove("compare");
            j--;
        }

        array[j+1] = key;
        bubbles[j+1].innerText = key;
    }

    explanation.innerText = "Array Sorted!";
}

/* ================= LINEAR SEARCH ================= */

async function linearSearch() {
    let target = parseInt(targetInput.value);
    let bubbles = getBubbles();

    for (let i = 0; i < array.length; i++) {

        bubbles[i].classList.add("target");
        explanation.innerText = `Checking ${array[i]} against target ${target}`;
        await sleep(speedSlider.value);

        if (array[i] === target) {
            bubbles[i].classList.remove("target");
            bubbles[i].classList.add("found");
            explanation.innerText = "Target Found!";
            return;
        }

        bubbles[i].classList.remove("target");
    }

    explanation.innerText = "Target Not Found!";
}

/* ================= BINARY SEARCH ================= */

async function binarySearch() {
    array.sort((a,b)=>a-b);
    generateArray(); // regenerate sorted visually
    let target = parseInt(targetInput.value);
    let bubbles = getBubbles();

    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        bubbles[mid].classList.add("target");
        explanation.innerText = `Checking middle element ${array[mid]}`;
        await sleep(speedSlider.value);

        if (array[mid] === target) {
            bubbles[mid].classList.add("found");
            explanation.innerText = "Target Found!";
            return;
        }

        if (array[mid] < target) left = mid + 1;
        else right = mid - 1;

        bubbles[mid].classList.remove("target");
    }

    explanation.innerText = "Target Not Found!";
}
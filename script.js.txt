let array = [];

function generateArray() {
    const container = document.getElementById("array");
    container.innerHTML = "";
    array = [];

    for (let i = 0; i < 20; i++) {
        let value = Math.floor(Math.random() * 200);
        array.push(value);

        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";
        container.appendChild(bar);
    }
}

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            if (array[j] > array[j + 1]) {

                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = array[j] + "px";
                bars[j + 1].style.height = array[j + 1] + "px";

                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
    }
}
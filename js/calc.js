calcBtnValList = ["MR", "M+", "M-", "AC", "7", "8", "9", "/", "6", "5", "4", "*", "3", "2", "1", "-", "0", ".", "=", "+"];
const excepts = ["MR", "M+", "M-", "AC"];
const operators = ["/", "*", "+", "-"];

// handle click on buttons
const handleClickOnButton = function (event) {

    let clickedValue = event.currentTarget;

    // Memory and reset buttons click handling
    if (excepts.includes(clickedValue.dataset.value)) {

        if (clickedValue.dataset.value === "AC") {
            document.querySelector(".inputOperation").value = "";
            document.querySelector(".resultZone").innerText = "";
        }

        if (clickedValue.dataset.value === "M+") {

            addInMem();

        }
        if (clickedValue.dataset.value === "M-") {
            localStorage.clear();
        }
        if (clickedValue.dataset.value === "MR") {
            let tempMem = localStorage.getItem("memory") || "";
            if (isNaN(tempMem)) {
                tempMem = "";
            }
            document.querySelector(".inputOperation").value = tempMem;
            document.querySelector(".resultZone").innerText = "";
        }

    }

    //handling equal button click 
    else if (clickedValue.dataset.value === "=") {
        const inputCurrentValue = document.querySelector(".inputOperation").value;

        //eval must be replaced
        result = eval(inputCurrentValue);
        document.querySelector(".resultZone").innerText = result;
    }

    // 
    else if (operators.includes(clickedValue.dataset.value)) {
        document.querySelector(".inputOperation").value += clickedValue.dataset.value;
        let inputCurrentValue = document.querySelector(".inputOperation").value;

        //handling dot for regexp 

        inputCurrentValue = inputCurrentValue.replace(/\./g, "@")
        let resultCurrentValue = document.querySelector(".resultZone");

        // In case there is no result in resultZone
        if (isNaN(resultCurrentValue.innerText) || resultCurrentValue.innerText === "") {
            let splitted = inputCurrentValue.split(/[+-/*]+/);
            let lastOperator = inputCurrentValue[splitted[0].length];
            splitted = splitted.map(element => element.replace(/@/g, "."));
            //As soon as there is 4 elements in inputOperation Zone
            if (splitted.length === 3) {
                switch (lastOperator) {
                    case "*":
                        console.log(parseFloat(splitted[0] * splitted[1]));
                        resultCurrentValue.innerText = parseFloat(splitted[0] * splitted[1]);
                        break;
                    case "/":
                        resultCurrentValue.innerText = parseFloat(splitted[0] / splitted[1]);
                        break;
                    case "-":
                        resultCurrentValue.innerText = parseFloat(splitted[0] - splitted[1]);
                        break;
                    case "+":
                        resultCurrentValue.innerText = parseFloat(splitted[0] + splitted[1]);
                        break;
                }
            }
        }

        //If there is already an intermediary result
        else {
            const splitted = inputCurrentValue.split(/[+-/*]+/);
            lastValue = splitted[splitted.length - 2];
            lastOperator = inputCurrentValue[(inputCurrentValue.length - 1) - (lastValue.length + 1)];
            parsedCurrentResult = parseFloat(resultCurrentValue.innerText);
            lastValue = lastValue.replace(/@/g, ".");
            lastValue = parseFloat(lastValue);
            switch (lastOperator) {
                case "*":
                    resultCurrentValue.innerText = parseFloat(parsedCurrentResult * lastValue);
                    break;
                case "/":
                    resultCurrentValue.innerText = parseFloat(parsedCurrentResult / lastValue);
                    break;
                case "-":
                    resultCurrentValue.innerText = parseFloat(parsedCurrentResult - lastValue);
                    break;
                case "+":
                    resultCurrentValue.innerText = parseFloat(parsedCurrentResult + lastValue);
                    break;
            }

        }
    }
    //add buttons clicked value in operationZone
    else {
        document.querySelector(".inputOperation").value += clickedValue.dataset.value;
    }

}

function addInMem() {

    const tempMem = parseFloat(document.querySelector(".resultZone").innerText || "");
    localStorage.setItem("memory", tempMem);
    // console.log(parseFloat(localStorage.getItem("memory") || ""));
}

// Interactive Zone click or keypress event 
const buttonClick = function () {
    btns = document.querySelectorAll(".calcBtn");
    btns.forEach(element => {
        element.addEventListener("click", handleClickOnButton);
    })
}

buttonClick();
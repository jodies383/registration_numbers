var addRegNum = document.querySelector(".regNumText")

var addBtn = document.querySelector(".add")

var displayRegNum = document.querySelector(".regDisplay")

var resetBtn = document.querySelector(".reset")

var errorMessage = document.querySelector(".errorMessage")

var errorMessage2 = document.querySelector(".errorMessage2")

var showBtn = document.querySelector(".show")

addBtn.addEventListener('click', listReg);

// addBtn.addEventListener('click', myReg);

showBtn.addEventListener('click', filterTowns)
// showBtn.addEventListener('click', townError)

var existingReg;

if (localStorage['regList']) {
    existingReg = JSON.parse(localStorage.getItem('regList'));

}

let regRef = registration(existingReg);

var regEx = /^[A-Z]{2} [0-9]{3}-[0-9]{3}$/i;

var ul = document.getElementById("list");


function listReg() {


    regRef.addRegNum(addRegNum.value)

    var store = regRef.returnReg()


    localStorage.setItem('regList', JSON.stringify(store));

    ul.innerHTML = ""
    // var regStored;
    if (regEx.test(addRegNum.value)) {
        for (var i = 0; i < store.length; i++) {
            // regStored += store[i]
            ul.innerHTML += '<li class="listItems">' + store[i] + "</li>";
        }
        // ul.innerHTML += '<li class="listItems">' + (regStored) + "</li>";
    }
    else if (!regEx.test(addRegNum.value)) {
        (errorMessage.innerHTML = regRef.validReg(addRegNum.value))
    }

    errorMessage.innerHTML = regRef.sameReg(addRegNum.value)

    setTimeout(function () {
        errorMessage.innerHTML = "";
    }, 3000);


   




}

// function myReg() {

//     regRef.addRegNum(addRegNum.value)
// }
function filterTowns() {

    var checkedRadioBtn = document.querySelector("input[name='towns']:checked");

    if (checkedRadioBtn) {
        var stored = regRef.towns(checkedRadioBtn.value);

        ul.innerHTML = "";

        for (var i = 0; i < stored.length; i++) {
            ul.innerHTML += '<li class="listItems">' + stored[i] + "</li>";
        }
        checkedRadioBtn.checked = false
    } else
        errorMessage2.innerHTML = regRef.noTowns(checkedRadioBtn)

    setTimeout(function () {
        errorMessage2.innerHTML = "";
    }, 3000);
}



resetBtn.addEventListener('click', function () {
    localStorage.removeItem('regList')
});

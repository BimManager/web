/* let myHeading = document.querySelector("h1"); */
/* myHeading.textContent="Hello, world!"; */
/* document.querySelector("html").onlick = () => {} */

let myImage = document.querySelector("img");
myImage.onclick = () => {
    let mySrc = myImage.getAttribute("src");
    if (mySrc === "images/firefox-icon.png") {
        myImage.setAttribute("src", "images/ft.png");
    } else {
        myImage.setAttribute("src", "images/firefox-icon.png");
    }
};

/* prompt() brings up a dialog box */
$("#chgUsrBtn").click(() => {
    let myName = prompt("Please enter your name.");
    if (!localStorage.getItem(myName)) {
        localStorage.setItem(myName, myName);
        myName = localStorage.getItem(myName)
    } else {
        myName = localStorage.getItem(myName) + ". We are jolly glad to see you again.";
    }
    $("#usrName").html(myName);
});



/* Penn University */

$("#itemField").keyup((e) => {
    if (e.keyCode ==  13) {
        $("#items").append( "<li>" + $("#itemField").val() + "</li>");
        $("#itemField").val("");
    }
});

$("li").hover(() => {
    console.log("hover");
    $(this).css("color", "red");
}, () => { console.log("leaving")});

$("p").on("click", () => {
    console.log("over");
    $(this).css("color", "red");
});

function onBtnClicked() {
    $("#output").html("Hello");
    console.log("foo");
};

let clickMe = document.getElementById("clickMeBtn");
clickMe.addEventListener("click", onBtnClicked);

let dateTime = document.getElementById("dateTime");
dateTime.innerHTML = new Date();



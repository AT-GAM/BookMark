// main functions


// checkValidation help you to check the validation of website link
function checkValidation(websiteUrl) {
    const regax = new RegExp(/^((http|https):\/\/)(www.)?[a-zA-Z0-9@:%._\\+~#?&\/\/=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\\+~#?&\/\/=]*)/)

    if (websiteUrl == "") {
        return false;
    }
    else if (regax.test(websiteUrl)) {
        return true;
    }
    else {
        return false;
    }




}



// Globel Variables
let arryOfCard = []
if (JSON.parse(localStorage.getItem("AllWebsites")) !== null) {
    arryOfCard = JSON.parse(localStorage.getItem("AllWebsites"));
    //we use this to get back the old data
    displayCode();
    addEventImage();
}


// this function Bookmark the website
document.querySelector(".submit").addEventListener("click", function () {
    submitTheUrl();
});
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { submitTheUrl(); }
});

//submit function 
function submitTheUrl() {
    // variables carry the value of website Url and website Name
    let websiteNameInput = document.querySelector("#nameInput.form-control");
    let websiteUrlInput = document.querySelector("#urlInput.form-control");




    // now we add the code to the html code  
    if (checkValidation(websiteUrlInput.value) && websiteNameInput.value !== "") {

        addToCards(websiteUrlInput.value, websiteNameInput.value);
        displayCode();
        addEventImage();
        clearInputs();




    }



    else {
        window.alert("enter a valid website url or website name")
    }

}

//clear function clear all inputs 
function clearInputs() {
    document.querySelector("#nameInput.form-control").value = "";
    document.querySelector("#urlInput.form-control").value = "";
    document.querySelector(".layer input.form-control").value = "";

}

//function addToCards to add cards to html code
function addToCards(websiteUrl, websiteName) {


    arryOfCard.push(
        {
            websiteUrl: websiteUrl,
            websiteName: websiteName,
            imgSrc: `https://logo.clearbit.com/${websiteName}.com`

        })

    // we will storage arryOfCards in the local 
    localStorage.setItem("AllWebsites", JSON.stringify(arryOfCard));


}

//display function that display code 

function displayCode() {
    let htmlCode = document.querySelector(".row");
    htmlCode.innerHTML = "";

    for (let i = 0; i < arryOfCard.length; i++) {

        htmlCode.innerHTML += `<div class="col-lg-3 col-md-4 col-sm-6 card   mb-3 ">
        <div class=" border-info border-3  text-center ">
            <img onerror="this.src=' Images/277448a877a33e8d0efc778025291c86.png '" src="${arryOfCard[i].imgSrc} " class="w-50 rounded-circle m-auto" alt="Website Logo">
            <h3 class="text-secondary">${arryOfCard[i].websiteName} </h3>
            <div class="buttons d-flex px-2">
                <button onClick="DeletsButton(${i})" class="btn btn-danger me-2 w-50">Delete</button>
                <a class="btn text-white btn-info w-50" target="_blank" href="${arryOfCard[i].websiteUrl}">Visit</a>
            </div>
    
    
    
        </div>
    
        </div>` ;
    }
}
//functions DeletsButton add Events For Delet Button

function DeletsButton(i) {
    arryOfCard.splice(i, 1);
    displayCode();
    addEventImage();
    localStorage.setItem("AllWebsites", JSON.stringify(arryOfCard));





}


// this feature to chane the logo image
// this function open image in another layer 
function addEventImage() {
    let Images = document.querySelector(".row").querySelectorAll("img");

    for (let i = 0; i < Images.length; i++) {
        Images[i].addEventListener("click", function () {

            document.querySelector(".layer").classList.remove("d-none");
            document.querySelector('.layer img').src = Images[i].src;
            // this function help you to save image src
            document.querySelector(".save").addEventListener("click", function () {
                if (document.querySelector(".layer input").value !== "") {
                    arryOfCard[i].imgSrc = document.querySelector(".layer input").value;
                    clearInputs();
                    localStorage.setItem("AllWebsites", JSON.stringify(arryOfCard));
                    displayCode();
                    addEventImage();
                }
                document.querySelector('.layer').classList.add("d-none");


            }
            )
        })
    }






}

// EVENT to close layer if you don't want to change the log

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") document.querySelector('.layer').classList.add("d-none");
})

document.querySelector(".layer").addEventListener("click", function (e) {

    if (e.target == document.querySelector(".layer")) {
        document.querySelector('.layer').classList.add("d-none");

    }
})


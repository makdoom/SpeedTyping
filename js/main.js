
// Global Variable
let time = 60;
let isRunnig;
let startTime;
let endTime;
let totalTime;
// Dom Element

let counter = document.getElementById("counter")
let resultBox = document.getElementById("resultBox")
let text = document.getElementById("text");
let input = document.getElementById("input");
let currentPara = document.getElementById('text')
let btn = document.getElementById('submitbtn');
let resDetails = document.getElementById("resDetails")
let wpm = document.getElementById("wpm");
let accuracy = document.getElementById("accuracy")
input.disabled = true;

window.addEventListener('load',() => {
    resDetails.style.display= "none"
})


// Paragraphs
const para = [
    " Some people combine touch typing and hunt and peck by using a buffering method. In the buffer method, the typist looks at the source copy, mentally stores one or several sentences, then looks at the keyboard and types out the buffer of sentences. This eliminates frequent up and down motions with the head and is used in typing competitions in which the typist is not well versed in touch typing.",

    "A paralegal is a person trained in legal matters who performs tasks requiring knowledge of the law and legal procedures. A paralegal is not a lawyer but can be employed by a law office or work freelance at a company or law office. Paralegals are not allowed to offer legal services directly to the public on their own and must perform their legal work under an attorney or law firm.",

    "Historically, the fundamental role of pharmacists as a healthcare practitioner was to check and distribute drugs to doctors for medication that had been prescribed to patients. In more modern times, pharmacists advise patients and health care providers on the selection, dosages, interactions, and side effects of medications, and act as a learned intermediary between a prescriber and a patient.", 

    "Web designers are expected to have an awareness of usability and if their role involves creating mark up then they are also expected to be up to date with web accessibility guidelines. The different areas of web design include web graphic design; interface design and authoring.",

    "A freelancer or freelance worker, is a term commonly used for a person who is self-employed and is not necessarily committed to a particular employer long-term. Freelance workers are sometimes represented by a company or a temporary agency that resells freelance labor to clients; others work independently or use professional associations or websites to get work.",

    "Because of the laboriousness of the translation process, since the 1940s efforts have been made, with varying degrees of success, to automate translation or to mechanically aid the human translator. More recently, the rise of the Internet has fostered a world-wide market for translation services and has facilitated language localization. Ideally, the translator must know both languages, as well as the subject that is to be translated."
];

btn.addEventListener('click', init);

function init() {
    //Display paragraph
    showPara(para);

    //start counter
    let timer = setInterval(() => {
        if(time == 0){
            isRunnig = false;
            clearInterval(timer);
            //End Time
            endTime = new Date().getTime();
            checkResult();

            // console.log(endTime);
            // text.innerHTML = "Time Over !!!"
            btn.style.visibility= "visible"
            btn.innerHTML = " Start Again ";
            btn.addEventListener('click',() => {
                location.reload()
            })
            //show Total time
            
            
        }else if(time > 0 ){
            time--
        }
        counter.innerHTML = time
    }, 1000);
}

//CheckResult
checkResult = () => {
    let str = input.value;
    totalTime = showTotal();
    //count number of characters
    let totalWords = wordCounter(str);
    //count number of errors
    let errors = compare(currentPara.innerText, str);
    // Speed
    let speed = Math.round(((totalWords / totalTime) *60) - errors)

    let accWords = currentPara.innerHTML;
    let numWords = accWords.split(" ").length
    console.log(numWords);
    
    //Creat ResultInfo Box
    dispResult(speed, errors, numWords)
    
    // resultBox.appendChild(resInfo)
    console.log("number of words " + speed);
    console.log("number of errors " + errors);
    // console.log(totalTime);
    
}

//Display Words
dispResult = (speed, errors, numWords) => {
    text.style.display = "none";
    resDetails.style.display= "flex";
    wpm.innerHTML = speed;
    accuracy.innerHTML = Math.floor((speed/numWords) * 100);
}

//Comparing Inputs
compare = (str1, str2) => {
    let char1 = str1.split(" ");
    let char2 = str2.split(" ");
    let errorCount=0;

    char2.forEach((value, index) => {
        if(value != char1[index]){
            errorCount++;
        }
    })
    return errorCount;
}
//Word Coumter 
wordCounter = (str) => {
    let words = str.split(" ").length;
    // let words = str.split(" ").length;
    return words;
}

// show Total Time
showTotal = () => {
     totalTime = ((endTime - startTime) /1000)
     return totalTime
    
}

//Display paragraph
showPara = (para) => {
    input.disabled = false
    input.focus();
    btn.style.visibility = "hidden"
    let randIndex = Math.floor(Math.random()*para.length);
    text.innerHTML = para[randIndex];
    startTime = new Date().getTime();
    
}
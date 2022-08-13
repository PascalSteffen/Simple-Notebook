let importantHeadlines = [];
let importantTexts = [];
let headlines = [];
let texts = [];
let headlineTrashLists = [];
let textsTrashLists = [];
let importantHeadlineTrashLists = [];
let importantTextsTrashLists = [];
let trashCounter = [];

loadArrayfromLocalStorage();


/**
 * render all notes.
 * 
 */
function render() {
    let mainBody = document.getElementById("mainBody");

    mainBody.innerHTML = "";
    mainBody.innerHTML += mainBodyContent();

    renderNotes(importantHeadlines, importantTexts, 'tableImportant', renderImportantNote);
    renderNotes(headlines, texts, 'tableNormal', renderNote);
    Counter();
}


/**
 * generate main HTML-Content.
 * @returns 
 * 
 */
function mainBodyContent() {
    return /*html*/`
    <!-- Close Trash & Archiv Box -->
    <div id="trash" class="openTrashArchiv dNone">
        <div class="popUp">
            <div class="PopUpFlex">
                <div><span>Trash</span></div>
                <div class="PopUpIconFlex">
                    <div onclick="rlyDelete()"><img class="popUpImg" src="img/trash.png" alt=""></div>
                    <div onclick="closeTrashArchiv('trash','dNone')"><img class="popUpImg" src="img/x-mark.png" alt="">
                    </div>
                </div>
            </div>
            <div>
                <div id="importantTrashTable"></div> <!-- Platz für das Array -->
                <div id="trashTable"></div> <!-- Platz für das Array -->
            </div>
        </div>
    </div>


    <!-- Main Notizbox -->
    <div class="headlineFlex">
        <div class="menuList">
            <img onclick="alertUpdate()" class="headlineIcons" src="img/menu.png" alt="">
            <img class="notizPic" src="img/notiz.png" alt="">
            <span class="headlineFont">Notes</span>
        </div>
        <div class="searchList">
            <div><img class="secondMenuPic" src="img/lupe.png" alt=""></div>
            <div><input class="searchInput" type="text" id="" placeholder="Search"></div>
        </div>
        <div class="secondMenuList">
            <div><img onclick="alertUpdate()" class="thirdMenuPic" src="img/refresh.png" alt=""></div>
            <div><img onclick="alertUpdate()" class="thirdMenuPic" src="img/settings.png" alt=""></div>
            <div><img onclick="alertUpdate()" class="thirdMenuPic" src="img/menu.png" alt=""></div>
            <div><img onclick="alertUpdate()" class="thirdProfilPic" src="img/profilman.png" alt=""></div>
        </div>
    </div>
    <div class="bodyFlex">
        <div class="leftBodyListFlex">
            <div class="leftBodyListPadding">
                <div onclick="openTrashArchiv('trash','dNone')" class="LeftBoxContainer trashForm" id="trash">
                    <img src="img/trash.png" alt="">
                    <span>Trash</span>
                </div>
                <div id="counter">0</div>
            </div>
        </div>
        <div class="design">
            <div class="boxContainer">
                <div><input type="text" id="headlineText" placeholder="Title"><br>
                    <input type="text" id="middleText" placeholder="Write a note..."><br><br>
                    <div class="underDesign">
                        <div>
                            <img onclick="alertUpdate()" class="picForm" src="img/bell.png" alt="">
                            <img onclick="alertUpdate()" class="picForm" src="img/contact.png" alt="">
                            <img onclick="alertUpdate()" class="picForm" src="img/picture.png" alt="">
                            <img onclick="alertUpdate()" class="picForm" src="img/menu.png" alt="">
                        </div>
                        <div class="add" onclick="addNotes('headlineText', 'middleText', headlines, texts)"><b>Add note</b>
                        </div>
                        <div class="pinForm">
                            <img onclick="addNotes('headlineText', 'middleText', importantHeadlines, importantTexts)"
                                src="img/pin.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="generateBodyFlex">
        <div class="tableFlex">
            <div id="tableImportant"></div>
            <div id="tableNormal"></div>
        </div>
    </div>

`;
}



/**
 *  overall function to render the notes.
 * @param {string} noteHeadlines 
 * @param {string} noteTexts 
 * @param {string} tableId 
 * @param {string} generateNoteHTML 
 * 
 */
function renderNotes(noteHeadlines, noteTexts, tableId, generateNoteHTML) {
    let table = document.getElementById(tableId);
    table.innerHTML = "";

    for (let i = 0; i < noteTexts.length; i++) {
        const headline = noteHeadlines[i];
        const text = noteTexts[i];

        table.innerHTML +=
            generateNoteHTML(headline, text, i);
    }
}


/**
 * add normal notes.
 * @param {string} headlineId 
 * @param {string} textId 
 * @param {string} noteHeadlines 
 * @param {string} noteTexts 
 * 
 */
function addNotes(headlineId, textId, noteHeadlines, noteTexts) {
    let headline = document.getElementById(headlineId).value;
    let text = document.getElementById(textId).value;

    if (headline == "" || text == "") {
        alert("To add a note, both fields must be filled out.")
    } else {
        noteHeadlines.push(headline);
        noteTexts.push(text);
        render();
        saveArrayToLocalStorage();
    }
}



/**
 * generate important notes HTML-Content.
 * @param {string} importantHeadlineNote 
 * @param {string} importantTextNote 
 * @param {number} i 
 * @returns 
 * 
 */
function renderImportantNote(importantHeadlineNote, importantTextNote, i) {
    return /*html*/`
    <div class="design">
        <div class="important textContainer">
            <div>
                <span><b>${importantHeadlineNote}</b></span><br><br>
                <div class="underline"></div>
                <span>${importantTextNote}</span>
            </div>
            <div class="deleteFlex">
                <img class="deletePicForm" onclick="pushToImportantAndBack(${i}, importantHeadlines, importantTexts)" src="img/pin.png" alt="">
                <img class="deletePicForm" onclick="deleteNotes(${i}, importantHeadlines, importantTexts)" src="img/trash.png" alt="">
            </div>
        </div>
    </div>`;
}


/**
 * generate normal note HTML-Content.
 * @param {string} headline 
 * @param {string} text 
 * @param {number} i 
 * @returns 
 * 
 */
function renderNote(headline, text, i) {
    return /*html*/`
    <div class="design">
        <div  class="textContainer">
            <div>
                <span><b>${headline}</b></span><br><br>
                <div class="underline"></div>
                <span>${text}</span>
            </div>
            <div class="deleteFlex">
                <img class="deletePicForm" onclick="pushToImportantAndBack(${i}, headlines, texts)"src="img/pin.png" alt="">
                <img class="deletePicForm" onclick="deleteNotes(${i}, headlines, texts)" src="img/trash.png" alt="">
            </div>
        </div>
    </div>`;
}


/**
 * generate trash note HTML-Content.
 * @param {string} headlineTrashNote 
 * @param {string} textTrashNote 
 * @param {number} i 
 * @returns 
 * 
 */
function renderTrashNotes(headlineTrashNote, textTrashNote, i) {
    return /*html*/`
    <div class="design">
        <div  class="textContainer">
            <div>
                <span><b>${headlineTrashNote}</b></span><br><br>
                <div class="underline"></div>
                <span>${textTrashNote}</span>
            </div>
            <div class="deleteFlex">
                <img class="deletePicForm" onclick="pushToMainContent(${i}, headlineTrashLists, textsTrashLists)" src="img/arrow.png" alt="">    
                <img class="deletePicForm" onclick="deleteNotesCompletely(${i}, headlineTrashLists, textsTrashLists)" src="img/trash.png" alt="">
            </div>
        </div>
    </div>`;
}


/**
 * generate important trash note HTML-Content.
 * @param {string} importantHeadlineTrashNote 
 * @param {string} importantTextTrashNote 
 * @param {number} i 
 * @returns 
 */
function renderImportantTrashNotes(importantHeadlineTrashNote, importantTextTrashNote, i) {
    return /*html*/`
    <div class="design">
        <div class="important textContainer">
            <div>
                <span><b>${importantHeadlineTrashNote}</b></span><br><br>
                <div class="underline"></div>
                <span>${importantTextTrashNote}</span>
            </div>
            <div class="deleteFlex">
                <img class="deletePicForm" onclick="pushToMainContent(${i}, importantHeadlineTrashLists, importantTextsTrashLists)" src="img/arrow.png" alt="">    
                <img class="deletePicForm" onclick="deleteNotesCompletely(${i}, importantHeadlineTrashLists, importantTextsTrashLists)" src="img/trash.png" alt="">
            </div>
        </div>
    </div>`;
}


/**
 * counter function.
 * 
 */
function Counter() {
    let counterElement = document.getElementById("counter");
    let counterArray = trashCounter.length;
    if (counterArray == 0) {
        counterElement.style.display = "none";
    } else {
        counterElement.innerHTML = counterArray;
    }


}


/**
 * delete notes.
 * @param {number} i 
 * @param {string} noteHeadlines 
 * @param {string} noteTexts 
 * 
 */
function deleteNotes(i, noteHeadlines, noteTexts) {

    if (noteHeadlines === importantHeadlines && noteTexts === importantTexts) {
        importantHeadlineTrashLists.push(importantHeadlines[i]);
        importantTextsTrashLists.push(importantTexts[i]);
        trashCounter.push(importantHeadlines[i]);
        importantHeadlines.splice(i, 1);
        importantTexts.splice(i, 1);

        renderNotes(importantHeadlineTrashLists, importantTextsTrashLists, 'importantTrashTable', renderImportantTrashNotes);
        render();
        saveArrayToLocalStorage();

    } else {
        headlineTrashLists.push(headlines[i]);
        textsTrashLists.push(texts[i]);
        trashCounter.push(headlines[i]);
        headlines.splice(i, 1);
        texts.splice(i, 1);

        renderNotes(headlineTrashLists, textsTrashLists, 'trashTable', renderTrashNotes);
        render();
        saveArrayToLocalStorage();
    }
}


/**
 * delete notes completely.
 * @param {number} i 
 * @param {string} noteHeadlines 
 * @param {string} noteTexts 
 * 
 */
function deleteNotesCompletely(i, noteHeadlines, noteTexts) {

    if (noteHeadlines === importantHeadlineTrashLists && noteTexts === importantTextsTrashLists) {
        importantHeadlineTrashLists.splice(i, 1);
        importantTextsTrashLists.splice(i, 1);
        trashCounter.splice(i, 1);
        Counter();
        renderNotes(importantHeadlineTrashLists, importantTextsTrashLists, 'importantTrashTable', renderImportantTrashNotes);
        saveArrayToLocalStorage();

    } else {
        headlineTrashLists.splice(i, 1);
        textsTrashLists.splice(i, 1);
        trashCounter.splice(i, 1);
        Counter();
        renderNotes(headlineTrashLists, textsTrashLists, 'trashTable', renderTrashNotes);
        saveArrayToLocalStorage();
    }
}


/**
 * delete all notes from trash.
 * @param {number} i 
 * 
 */
function deleteAllNotesFromTrash(i) {
    importantHeadlineTrashLists.splice(i);
    importantTextsTrashLists.splice(i);
    headlineTrashLists.splice(i);
    textsTrashLists.splice(i);
    trashCounter.splice(i);
    renderNotes(importantHeadlineTrashLists, importantTextsTrashLists, 'importantTrashTable', renderImportantTrashNotes);
    renderNotes(headlineTrashLists, textsTrashLists, 'trashTable', renderTrashNotes);
    saveArrayToLocalStorage();
    closeTrashArchiv('trash', 'dNone');
    Counter();
}


/**
 * push the notes to main side.
 * @param {number} i 
 * @param {string} noteHeadlines 
 * @param {string} noteTexts 
 * 
 */
function pushToMainContent(i, noteHeadlines, noteTexts) {
    if (noteHeadlines === importantHeadlineTrashLists && noteTexts === importantTextsTrashLists) {
        importantHeadlines.push(importantHeadlineTrashLists[i]);
        importantTexts.push(importantTextsTrashLists[i]);
        importantHeadlineTrashLists.splice(i, 1);
        importantTextsTrashLists.splice(i, 1);
        trashCounter.splice(i, 1);
        renderNotes(importantHeadlineTrashLists, importantTextsTrashLists, 'importantTrashTable', renderImportantTrashNotes);
        render();
        saveArrayToLocalStorage();

    } else {
        headlines.push(headlineTrashLists[i]);
        texts.push(textsTrashLists[i]);
        headlineTrashLists.splice(i, 1);
        textsTrashLists.splice(i, 1);
        trashCounter.splice(i, 1);
        renderNotes(headlineTrashLists, textsTrashLists, 'trashTable', renderTrashNotes);
        render();
        saveArrayToLocalStorage();
    }
}


/**
 * push the notes from important to not important.
 * @param {number} i 
 * @param {string} noteHeadlines 
 * @param {string} noteTexts 
 */
function pushToImportantAndBack(i, noteHeadlines, noteTexts) {
    if (noteHeadlines === importantHeadlines && noteTexts === importantTexts) {
        headlines.push(importantHeadlines[i]);
        texts.push(importantTexts[i]);
        importantHeadlines.splice(i, 1);
        importantTexts.splice(i, 1);
        render();
        saveArrayToLocalStorage();
    } else {
        importantHeadlines.push(headlines[i]);
        importantTexts.push(texts[i]);
        headlines.splice(i, 1);
        texts.splice(i, 1);
        render();
        saveArrayToLocalStorage();
    }
}


/**
 * open trash archiv.
 * @param {string} firstId 
 * @param {string} classId 
 */
function openTrashArchiv(firstId, classId) {
    document.getElementById(firstId).classList.remove(classId);
    renderNotes(importantHeadlineTrashLists, importantTextsTrashLists, 'importantTrashTable', renderImportantTrashNotes);
    renderNotes(headlineTrashLists, textsTrashLists, 'trashTable', renderTrashNotes);

}

/**
 * close trash archiv.
 * @param {string} firstId 
 * @param {string} classId 
 */
function closeTrashArchiv(firstId, classId) {
    document.getElementById(firstId).classList.add(classId);
}



/** 
 *  Function to alert update Buttons
 * 
 */
function alertUpdate() {
    alert("This icon is only used to represent the design.")
}

function rlyDelete(i) {
    if (confirm("Are you sure you want to delete all notes from the Recycle Bin?")) {
        deleteAllNotesFromTrash(i);
    }
}


/** 
 *  Function to save and load Arrays
 * 
 */
function saveArrayToLocalStorage() {

    let headlineAsText = JSON.stringify(headlines);
    let textAsText = JSON.stringify(texts);
    let importantHeadlineNoteAsText = JSON.stringify(importantHeadlines);
    let importantTextNoteAsText = JSON.stringify(importantTexts);
    let headlineTrashAsText = JSON.stringify(headlineTrashLists);
    let textTrashAsText = JSON.stringify(textsTrashLists);
    let importantHeadlineTrashAsText = JSON.stringify(importantHeadlineTrashLists);
    let importantTextTrashAsText = JSON.stringify(importantTextsTrashLists);
    let trashCounterAsText = JSON.stringify(trashCounter);

    localStorage.setItem("headlineAsText", headlineAsText);
    localStorage.setItem("textAsText", textAsText);
    localStorage.setItem("importantHeadlineNoteAsText", importantHeadlineNoteAsText);
    localStorage.setItem("importantTextNoteAsText", importantTextNoteAsText);
    localStorage.setItem("headlineTrashAsText", headlineTrashAsText);
    localStorage.setItem("textTrashAsText", textTrashAsText);
    localStorage.setItem("importantHeadlineTrashAsText", importantHeadlineTrashAsText);
    localStorage.setItem("importantTextTrashAsText", importantTextTrashAsText);
    localStorage.setItem("trashCounterAsText", trashCounterAsText)
}

function loadArrayfromLocalStorage() {

    let headlineAsText = localStorage.getItem("headlineAsText");
    let textAsText = localStorage.getItem("textAsText");
    let importantHeadlineNoteAsText = localStorage.getItem("importantHeadlineNoteAsText");
    let importantTextNoteAsText = localStorage.getItem("importantTextNoteAsText");
    let headlineTrashAsText = localStorage.getItem("headlineTrashAsText");
    let textTrashAsText = localStorage.getItem("textTrashAsText");
    let importantHeadlineTrashAsText = localStorage.getItem("importantHeadlineTrashAsText")
    let importantTextTrashAsText = localStorage.getItem("importantTextTrashAsText");
    let trashCounterAsText = localStorage.getItem("trashCounterAsText");

    if (headlineAsText && textAsText && importantHeadlineNoteAsText && importantTextNoteAsText) {
        headlines = JSON.parse(headlineAsText);
        texts = JSON.parse(textAsText);
        importantHeadlines = JSON.parse(importantHeadlineNoteAsText);
        importantTexts = JSON.parse(importantTextNoteAsText);
    }

    if (headlineTrashAsText && textTrashAsText && importantHeadlineTrashAsText && importantTextTrashAsText) {
        headlineTrashLists = JSON.parse(headlineTrashAsText);
        textsTrashLists = JSON.parse(textTrashAsText);
        importantHeadlineTrashLists = JSON.parse(importantHeadlineTrashAsText);
        importantTextsTrashLists = JSON.parse(importantTextTrashAsText);
    }

    if (trashCounterAsText) {
        trashCounter = JSON.parse(trashCounterAsText);
    }

}




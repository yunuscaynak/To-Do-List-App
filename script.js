const form = document.querySelector('#formInput');
const add = document.querySelector('#addButton');
const clean = document.querySelector('#cleanButton');
const container = document.querySelector('#container');

// GET DATA FROM LOCALSTORAGE ON PAGE LOAD
window.onload = function() {
    const storedContent = localStorage.getItem('myContent');
    if (storedContent) {
        container.innerHTML = storedContent;
        addEventListeners();
    }
};

// ADDING CONTENT WITH THE ENTER KEY
form.addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
        addContent();
    }
});

add.addEventListener('click', addContent);

container.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-danger')) {
        const lineArea = event.target.closest('.row');
        if (lineArea) {
            lineArea.remove();
            showAlert();
            saveContentToLocalStorage();
        }
    }
});

function addContent() {
    // EMPTY VALUE CONTROL 
    if (form.value != '') {
        
        if (!checkDuplicateRow(form.value)) {
            // CREATING A ROW WITH BOOTSTRAP
            let lineArea = document.createElement('div');
            //ADDED A CLASS
            lineArea.classList.add('row', 'my-3');
            // ADD A UNIQUE ID 
            lineArea.id = 'contentRow';
            // TRANSFER TO PARENT ELEMENT
            container.appendChild(lineArea);

            // CREATING A COL-9 SECTION WITH BOOTSTRAP
            let col9 = document.createElement('div');
            //ADDED A CLASS
            col9.classList.add('col-9', 'py-2');
            // ASSIGNMENT TO THE PARENT ELEMENT
            lineArea.appendChild(col9);

            // CREATING A COL-3 SECTION WITH BOOTSTRAP
            let col3 = document.createElement('div');
            //ADDED A CLASS
            col3.classList.add('col-3', 'py-3');
            // TRANSFER TO PARENT ELEMENT
            lineArea.appendChild(col3);

            // P ELEMENT CREATING
            let paragraph = document.createElement('p');
            // ASSIGNING THE VALUE ENTERED IN THE FORM TO P
            paragraph.textContent = form.value;
            //ASSIGNMENT TO THE PARENT ELEMENT
            col9.appendChild(paragraph);

            // CREATING A DELETE BUTTON ELEMENT
            let deleteButton = document.createElement('button');
            // ATTRIBUTES
            deleteButton.classList.add('btn', 'btn-danger', 'align-items-center' , 'justify-content-center','d-block');
            // ADD A UNIQUE ID
            deleteButton.id = 'deleteButton';
            // TEXT CONTENT
            deleteButton.textContent = 'Delete';
            //ASSIGNMENT TO THE PARENT ELEMENT
            col3.appendChild(deleteButton);

            // CLEARING THE FORM FIELD AFTER ADDING
            form.value = '';

            // EVENT LISTENER FOR DELETE BUTTON
            deleteButton.addEventListener('click', function () {
                lineArea.remove();
                // CALL THE ALERT FUNCTION
                showAlert();
                // SAVE UPDATED CONTENT TO LOCAL STORAGE
                saveContentToLocalStorage();
            });

            // ALERT FUNCTION
            function showAlert() {
                // DIV ELEMENT CREATEING
                const alertDiv = document.createElement("div");
                // ADD CLASS
                alertDiv.classList.add('container', 'alert', 'alert-success', 'alert-dismissible', 'fade', 'show', 'justify-content-center', 'text-align-center');
                // ADD ID
                alertDiv.id = 'alertDiv';
                // TEXT CONTENT
                alertDiv.innerHTML = '<p>CONTENT SUCCESSFULLY DELETED!</p>';

                // REMOVE WARNING AFTER 2.5 SECOND
                setTimeout(function () {
                    alertDiv.remove();
                }, 2500);
                document.body.appendChild(alertDiv);
            };

            // SAVE UPDATED CONTENT TO LOCAL STORAGE
            saveContentToLocalStorage();
            // REASSING EVENT LISTENERS
            addEventListeners();
        } else {
            // DUPLICATE CONTROL
            alert("Bu içerik zaten var!");
        }
    }
}

// SAVE CONTENT TO LOCAL STORAGE
function saveContentToLocalStorage() {
    localStorage.setItem('myContent', container.innerHTML);
}

// CLEARING THE FORM FIELD
clean.addEventListener('click', function () {
    form.value = '';
});

// ADD EVENT LISTENER FUNCTION
function addEventListeners() {
    // DELETE BUTTON EVENT LISTENERS
    const deleteButtons = document.querySelectorAll('[id^="deleteButton-"]');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const rowId = button.id.replace('deleteButton-', 'contentRow-');
            const row = document.getElementById(rowId);
            if (row) {
                row.remove();
                showAlert();
                saveContentToLocalStorage();
            }
        });
    });
}

// DUPLICATE CONTROL
function checkDuplicateRow(value) {
    const paragraphs = document.querySelectorAll('.col-9 p');
    for (const paragraph of paragraphs) {
        if (paragraph.textContent === value) {
            return true;
        }
    }
    return false;
}

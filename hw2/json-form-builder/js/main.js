const FORM = "form";
const REQUEST = "get";
const FORM_ID = "my-form";

function readData() {
    let data = document.getElementById("textAreaJsonData").value;
    let jsonObject = JSON.parse(data);
    //get base element
    let baseElement = createBaseElement(jsonObject);
    //get inputs
    let inputs = getInputs(jsonObject);
    //getLabels

    //createComponent
    createComponent(baseElement, inputs);
}

//todo create component moove to method
function createComponent(baseElement, inputs) {

    let createdForm = createComponentForm(baseElement);
    appendInputsToForm(inputs, createdForm)
}

function getInputs(jsonObject) {
    let inputs = [];
    if (jsonObject.type === FORM && Array.isArray(jsonObject.items) && jsonObject.items.length !== 0) {
        for (let i = 0; i < jsonObject.items.length; i++) {
            let item = jsonObject.items[i];
            let createdInput = createFormElement(item);
            inputs.push(createdInput)
        }
    }
    return inputs
}

function appendInputsToForm(inputs, createdForm) {
    for (let i = 0; i < inputs.length; i++) {
        let item = inputs[i];
        createdForm.appendChild(item);
    }
}

function createComponentForm(baseElement) {
    let data = document.getElementById("json-output");
    return data.appendChild(baseElement);
}

function createBaseElement(jsonObject) {
    if (jsonObject.type === 'form') {
        return createForm();
    }
}

function createForm() {
    let form = document.createElement(FORM);
    form.setAttribute('method', REQUEST);
    form.setAttribute('action', "#");
    form.setAttribute("id", FORM_ID);

    return form;
}

function createFormElement(item) {
    if (item.type === "title") {
        return createTitleElement(item);
    }

    return createInputElement(item);
}

//CREATE INPUTS
//title
function createTitleElement(item) {
    let inputElement = document.createElement("h2");

    return inputElement;
}

//input text
function createInputElement(item) {
    let inputElement = document.createElement("input");
    inputElement.setAttribute('type', item.type);
    inputElement.setAttribute('id', item.id);

    return inputElement;
}

/*
*   <input type="text" id="firstName"><label>First Name</label>
    <input type="text" id="lastName"><label>Last Name</label>
    <input type="text" id="email"><label>Email</label>
    <input type="text" id="timeToCall"><label>When is the best time to call you?</label>
    <input type="checkbox" id="agreement"><label>Horns</label>
*
* */

var jsonObject = {
    "type": "form",
    "items": [
        {
            "type": "title",
            "label": "Request FORM callback"
        },
        {
            "type": "input",
            "label": "First Name",
            "id": "firstName"
        },
        {
            "type": "input",
            "label": "Last Name",
            "id": "lastName"
        },
        {
            "type": "input",
            "label": "Email",
            "id": "email"
        },
        {
            "type": "input",
            "label": "When is the best time to call you?",
            "id": "timeToCall"
        },
        {
            "type": "checkbox",
            "label": "consent to my submitted data being collected & stored",
            "id": "agreement"
        }
    ]
};
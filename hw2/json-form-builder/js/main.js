const FORM = "form";
const REQUEST_TYPE = "get";
const FORM_ID = "my-form";

function buildForm() {
    let json = readData();
    let baseElement = getBaseElement(json);
    let formComponent = getFormComponent(baseElement);
    let formElements = getFormElements(json);//get inputs and labels
    formBuilder(formElements, formComponent);
}

function getFormElements(json) {
    let elements = [];
    if (json.type === FORM && Array.isArray(json.items) && json.items.length !== 0) {
        for (let i = 0; i < json.items.length; i++) {
            let item = json.items[i];
            let formElements = formElementBuilder(item);
            elements.push(formElements)
        }
    }
    return elements;
}

function formBuilder(formElements, formComponent) {
    for (let i = 0; i < formElements.length; i++) {
        let item = formElements[i];
        formComponent.appendChild(item);
    }
}

function getFormComponent(baseElement) {
    let foundElement = document.getElementById("json-output");
    return foundElement.appendChild(baseElement);
}

function getBaseElement(json) {
    if (json.type === FORM) {
        return createForm();
    }
}

function createForm() {
    let form = document.createElement(FORM);
    form.setAttribute('method', REQUEST_TYPE);
    form.setAttribute('action', "#");
    form.setAttribute("id", FORM_ID);

    return form;
}

function formElementBuilder(jsonItem) {
    if (jsonItem.type === "title") {
        return createTitleFormElement(jsonItem);
    }

    return createFormElement(jsonItem);
}

function createTitleFormElement(jsonItem) {
    let div = document.createElement("div");
    let input = document.createElement("h2");
    input.innerText = jsonItem.label;
    div.appendChild(input);

    return div;
}

function createFormElement(jsonItem) {
    let div = document.createElement("div");
    let input = document.createElement("input");
    input.setAttribute('type', jsonItem.type);
    input.setAttribute('id', jsonItem.id);

    let label = createLabel(jsonItem);

    div.appendChild(input);
    div.appendChild(label);

    return div;
}

function createLabel(jsonItem) {
    let label = document.createElement("label");
    label.setAttribute("for", jsonItem.id);
    label.innerText = jsonItem.label;
    return label;
}

function readData() {
    let data = document.getElementById("textAreaJsonData").value;
    return JSON.parse(data);
}

function getDefaultJson() {
    let element = document.getElementById("textAreaJsonData");
    element.innerText = JSON.stringify(defaultJsonObject);
}

var defaultJsonObject = {
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
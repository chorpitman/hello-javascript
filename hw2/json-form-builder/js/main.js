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

function getFormElements(jsonObject) {
    let elements = [];
    if (jsonObject.type === FORM && Array.isArray(jsonObject.items) && jsonObject.items.length !== 0) {
        for (let i = 0; i < jsonObject.items.length; i++) {
            let item = jsonObject.items[i];
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
    let data = document.getElementById("json-output");
    return data.appendChild(baseElement);
}

function getBaseElement(jsonObject) {
    if (jsonObject.type === FORM) {
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

function formElementBuilder(item) {
    if (item.type === "title") {
        return createTitleFormElement(item);
    }

    return createFormElement(item);
}

function createTitleFormElement(item) {
    let createdElement = document.createElement("div");
    let createdInput = document.createElement("h2");
    createdInput.innerText = item.label;
    createdElement.appendChild(createdInput);

    return createdElement;
}

function createFormElement(item) {
    let createdElement = document.createElement("div");

    let inputElement = document.createElement("input");
    inputElement.setAttribute('type', item.type);
    inputElement.setAttribute('id', item.id);

    let label = document.createElement("label");
    label.setAttribute("for", item.id);
    label.innerText = item.label;

    createdElement.appendChild(inputElement);
    createdElement.appendChild(label);

    return createdElement;
}

function readData() {
    let data = document.getElementById("textAreaJsonData").value;
    let jsonObject = JSON.parse(data);
    return jsonObject;
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
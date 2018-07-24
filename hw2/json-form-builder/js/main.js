const FORM = "form";
const REQUEST_TYPE = "get";
const FORM_ID = "my-form";

function readData() {
    let data = document.getElementById("textAreaJsonData").value;
    let jsonObject = JSON.parse(data);
    createComponent(jsonObject);
}

function createComponent(jsonObject) {
    //get base element
    let baseElement = createBaseElement(jsonObject);
    //get inputs and labels
    let inputs = getIFormElements(jsonObject);
    let createdFormComponent = createComponentForm(baseElement);
    formBuilder(inputs, createdFormComponent)
}

function getIFormElements(jsonObject) {
    let elements = [];
    if (jsonObject.type === FORM && Array.isArray(jsonObject.items) && jsonObject.items.length !== 0) {
        for (let i = 0; i < jsonObject.items.length; i++) {
            let item = jsonObject.items[i];
            let formElements = formElementBuilder(item);
            elements.push(formElements)
        }
    }
    return elements
}

function formBuilder(formElements, createdForm) {
    for (let i = 0; i < formElements.length; i++) {
        let item = formElements[i];
        createdForm.appendChild(item);
    }
}

function createComponentForm(baseElement) {
    let data = document.getElementById("json-output");
    return data.appendChild(baseElement);
}

function createBaseElement(jsonObject) {
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
        return createFormTitleElement(item);
    }

    return createFormElement(item);
}

function createFormTitleElement(item) {
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
import data from "./data.js";
import getId from "./uniqId.js";

const refs = {
    treeData: document.querySelector(".treeData"),
    selectedId: document.querySelector(".selectedId"),
    addElement: document.querySelector(".addElement"),
    addElementInput: document.querySelector(".addElementInput"),
    deleteBranch: document.querySelector(".deleteBranch"),
    moveBranch: document.querySelector(".moveBranch"),
    newParentID: document.querySelector(".newParentID")
};

const {items} = data;

function createChildElem(id, label) {
    const child = document.createElement("li");
    child.id = id;
    child.textContent = label;
    return child;
}

function createChildElemst(arr, parent) {
    const root = document.createElement("ul");
    arr.forEach(e => {
        if (!("items" in e)) {
            root.appendChild(createChildElem(e.id, e.label));
        } else {
            root.appendChild(createChildElem(e.id, e.label));
            createChildElemst(e.items, root);
        }
    });
    parent.appendChild(root);
}

function showSelectedId({target}) {
    refs.selectedId.textContent = target.id;
}

function addUserElement(e) {
    e.preventDefault();
    if (refs.selectedId.textContent) {
        const id = refs.selectedId.textContent;
        const parent = document.getElementById(id);
        const root = document.createElement("ul");
        const child = createChildElem(getId(), refs.addElementInput.value);
        root.appendChild(child);
        parent.appendChild(root);
    }
}

function deleteBranch() {
    if (refs.selectedId.textContent) {
        const id = refs.selectedId.textContent;
        const parent = document.getElementById(id);
        parent.remove();
    }
}

function moveBranch(e) {
    e.preventDefault();
    if (refs.selectedId.textContent) {
        const id = refs.selectedId.textContent;
        const movedItem = document.getElementById(id);
        const parent = document.getElementById(refs.newParentID.value);
        const root = document.createElement("ul");
        const child = createChildElem(getId(), movedItem.textContent);
        root.appendChild(child);
        parent.appendChild(root);
        movedItem.remove();
    }
}

createChildElemst(items, refs.treeData);

refs.treeData.addEventListener("click", showSelectedId);
refs.deleteBranch.addEventListener("click", deleteBranch);
refs.addElement.addEventListener("submit", addUserElement);
refs.moveBranch.addEventListener("submit", moveBranch);

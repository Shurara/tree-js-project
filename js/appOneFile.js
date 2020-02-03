

const refs = {
    treeData: document.querySelector(".treeData"),
    selectedId: document.querySelector(".selectedId"),
    addElement: document.querySelector(".addElement"),
    addElementInput: document.querySelector(".addElementInput"),
    deleteBranch: document.querySelector(".deleteBranch"),
    deleteBranchWithoutChildren: document.querySelector(".deleteBranchWithoutChildren"),
    moveBranch: document.querySelector(".moveBranch"),
    newParentID: document.querySelector(".newParentID")
};

const {items} = {
    items: [
        { id: 1, label: "First item" },
        {
            id: 2,
            label: "Second item",
            items: [
                { id: 3, label: "Sub Second item 1" },
                { id: 4, label: "Sub Second item 2" },
                {
                    id: 5,
                    label: "Sub Second item 3",
                    items: [
                        { id: 6, label: "Sub sub Second item 1" },
                        { id: 7, label: "Sub sub Second item 2" }
                    ]
                }
            ]
        },
        { id: 8, label: "Third item" },
        { id: 9, label: "Fourth item" }
    ]
};

function createChildElem(id, label) {
    const child = document.createElement("li");
    child.id = id;
    child.textContent = label;
    return child;
}

/*
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
*/

function createChildElemst(arr, parent) {
    const root = document.createElement("ul");
    arr.forEach(e => {
        if (!("items" in e)) {
            root.appendChild(createChildElem(e.id, e.label));
        } else {
            let innerRoot = createChildElem(e.id, e.label);
            root.appendChild(innerRoot);
            createChildElemst(e.items, innerRoot);
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

function deleteBranchWithoutChildren() {
    if (refs.selectedId.textContent) {
        const id = refs.selectedId.textContent;
        let element = document.getElementById(id);
        if (!element.children) {
            element.remove();
        } else {
            let cloneElement = element.cloneNode(true);
            element.parentElement.append(...cloneElement.children);
            element.remove();
        }

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
refs.deleteBranchWithoutChildren.addEventListener("click", deleteBranchWithoutChildren);
refs.addElement.addEventListener("submit", addUserElement);
refs.moveBranch.addEventListener("submit", moveBranch);


function setId() {
    let id = 9;
    return function () {
        return id += 1;
    }
}

const getId = setId();
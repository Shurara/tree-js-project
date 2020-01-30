function setId() {
    let id = 9;
    return function () {
       return id += 1;
    }
}

const getId = setId();

export default getId;
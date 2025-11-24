export function addToLocalStorage({ add, name }) {
    const stringified = JSON.stringify(add);
    localStorage.setItem(name, stringified);
}

export function getFromLocalStorage({ get }) {
    const data = localStorage.getItem(get);
    const result = JSON.parse(data);
    return result;
}
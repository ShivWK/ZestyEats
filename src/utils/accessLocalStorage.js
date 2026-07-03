export const getItemFromLocalStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (item === null) return null;

        try {
            return JSON.parse(item);
        } catch {
            return item;
        }
    } catch (error) {
        console.error(`Error getting item ${key} from localStorage`, error);
        return null;
    }
}

export const setItemInLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting item ${key} in localStorage`, error);
    } 
}
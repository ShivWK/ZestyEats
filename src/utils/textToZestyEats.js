const textToZestyEats = (text) => {
    const newText = text.replace(/swiggy/ig, "ZestyEats");
    return newText;
}

export default textToZestyEats;
const textToZestyEats = (text) => {
    if (!text) return

    const newText = text.replace(/swiggy/ig, "ZestyEats");
    return newText;
}

export default textToZestyEats;
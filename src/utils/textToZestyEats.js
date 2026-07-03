const textToZestyEats = (text) => {
  if (!text) return;

  const newText = text.replace(/swiggy/gi, 'ZestyEats');
  return newText;
};

export default textToZestyEats;

const daysFormatter = (patternCode: string) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    let finalString = "";
    let daysCounter = 0;
    for (let i = 0; i < days.length; i++) {
        if (patternCode[i] === "Y") {
            finalString += `${days[i]}-`;
            daysCounter++;
        }
    }
    if (daysCounter === 0) return "";
    return finalString.slice(0, -1);
}

export default daysFormatter;
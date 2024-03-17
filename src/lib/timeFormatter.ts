const timeFormatter = (hours: number, minutes: number) => {
    return `${hours % 12 || 12}:${minutes ? minutes : "00"} ${hours <= 11 ? "AM" : "PM"}`
}

export default timeFormatter;
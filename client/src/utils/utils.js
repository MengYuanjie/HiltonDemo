
export function toCommas(value) {
    if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return '';
    }
}

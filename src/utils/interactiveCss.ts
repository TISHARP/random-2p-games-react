export const getCustomProperty = (elem: HTMLElement, prop:string) => {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}
export const setCustomProperty = (elem: HTMLElement, prop:string, val: number) => {
    elem.style.setProperty(prop, val.toString());
}
export const incrementCustomProperty = (elem: HTMLElement, prop: string, inc: number) => {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop)+inc);
}
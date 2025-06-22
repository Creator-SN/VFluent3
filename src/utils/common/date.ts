export function isLeapYear(val: number | Date):boolean{
    if (val instanceof Date){
        val = val.getFullYear()
    }
    return (val % 4 == 0 && val % 100!=0) || (val % 400==0)
}
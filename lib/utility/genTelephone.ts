export default function genTelephone(prefix: number): string {
    let number9 = "";
    while (number9.length < 9) {
        number9 = Math.random().toString().slice(2, 11);
    }
    let x = number9.match(/.{1,3}/g)?.join(" ")

    return `${prefix} ${x}`
}
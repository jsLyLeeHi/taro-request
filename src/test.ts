// interface TypeAdd<T> { (arg1: T, arg2: T): T }
// interface TypeAdd2 { <T>(arg1: T, arg2: T): T }

// function add<T extends []>(arg1: T): T {
//     return arg1
// }
// add([])


// let addFn: TypeAdd<number>
// addFn = add

// addFn(1, 2)




// function getProperty<T, K extends keyof T>(obj: T, key: K) {
//     return obj[key]
// }


function add(arg1, arg2) {
    return arg1 + arg2
}

class Adder<T> {
    add: (arg1: T, arg2: T) => T
}
const adder = new Adder<string>()
adder.add = add
adder.add('1', '2')
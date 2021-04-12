// basic types

let count: number = 0
count += 1

const done: boolean = true

const numbers: number[] = [1, 2, 3]
const messages: string[] = ['hello', 'world']

let mightBeUndefined: string | undefined = undefined
let nullableNumber : number | null = null

let color: 'red' | 'orange' | 'yellow' = 'red'
color = 'orange'

// function 
function sumArray(numbers: number[]): number {
    return numbers.reduce((acc, current) => acc + current, 1)
}

function returnNothing(): void {
    console.log('return nothing!')
}

returnNothing()

// interface - class
interface Shape {
    getArea(): Number
}

class Circle implements Shape {
    constructor(public radius: number) {
        this.radius = radius
    }

    getArea(){
        return this.radius * this.radius * Math.PI
    }
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number ) {
        this.width = width 
        this.height = height 
    }

    getArea() {
        return this.width * this.height
    }
}
const circle = new Circle(5)
const rectangle = new Rectangle(10, 5)

console.log(circle.radius)

const shapes: Shape[] = [new Circle(5), new Rectangle(10, 5)]

shapes.forEach(shape => {
    console.log(shape.getArea())
})

// interface - object
interface Person { 
    name: string,
    age?: number
}

interface Developer extends Person{
    skills: string[]
}

const expert: Developer = {
    name: 'saebom',
    skills: ['javascript', 'react']
}

const people: Person[] = [expert, expert]
console.log(people)

// type alias 
type _Developer = Person & {
    skills: string[]
}

const person: Person = {
    name: 'saebom'
}

const _expert: _Developer = {
    name: 'joy',
    skills : ['javascript', 'react']
}

type People = Person[]
const _people: People = [person, _expert]
console.log(_people)

type Color = 'red' | 'gray' | 'brown'
const _color: Color = 'red'
const colors: Color[] = ['red', 'brown']

// generics 
function merge<A, B> (a: A, b: B): A & B {
    return {
        ...a,
        ...b
    }
}

const merged = merge({foo: 1}, 'string')

function wrap<T>(param: T) {
    return {
        param
    }
}

const wrapped = wrap('10')

// generics in interface
interface Items<T>{ 
    list: T[]
}

const items: Items<string> = {
    list: ['1', '2', '3']
}

// generics in type
type Strings<T> = {
    list: T[]
}

const strings: Strings<string> = {
    list: ['1', '2', '3']
}

// generics in class
class Queue<T> {
    list: T[] = []

    get length() {
        return this.list.length
    }

    enqueue(item: T) {
        this.list.push(item)
    }

    dequeue() {
        return this.list.shift()
    }
}

const queue = new Queue<number>()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue()) //undefined
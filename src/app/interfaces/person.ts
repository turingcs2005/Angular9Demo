export class Person {
  constructor(public name: string, public age: number) {}

  greet() {
    return(`Hello, my name is ${this.name} and I am ${this.age}!`);
  }
}

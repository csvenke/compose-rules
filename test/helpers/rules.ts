interface Person {
  firstName: string;
  lastName: string;
}

export const isAlwaysTrue = () => true;

export const isAlwaysFalse = () => false;

export const isLessThanHundred = (arg: number) => arg < 100;

export const isLargerThanOne = (arg: number) => arg > 1;

export const isEven = (arg: number) => arg % 2 === 0;

export const isNamedJohn = (arg: string) => arg === "John";

export const isNamedJane = (arg: string) => arg === "Jane";

export const isTrue = (arg: boolean) => arg === true;

export const isFalse = (arg: boolean) => arg === false;

export const isNamedJohnDoe = (arg: Person) =>
  arg.firstName === "John" && arg.lastName === "Doe";

export const isNamedJaneDoe = (arg: Person) =>
  arg.firstName === "Jane" && arg.lastName === "Doe";

export const hasLastNameDoe = (arg: Person) => arg.lastName === "Doe";

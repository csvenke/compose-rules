interface Person {
  firstName: string;
  lastName: string;
}

export const isAlwaysTrue = () => true;

export const isAlwaysFalse = () => false;

export const isNumber = (arg?: number) => !!arg && typeof arg === "number";

export const isNumberLessThanHundred = (arg: number) => arg < 100;

export const isNumberLargerThanOne = (arg: number) => arg > 1;

export const isNumberEven = (arg: number) => arg % 2 === 0;

export const isPerson = (arg?: Person) =>
  !!arg &&
  typeof arg.firstName === "string" &&
  typeof arg.lastName === "string";

export const isNamedJohnDoe = (arg: Person) =>
  arg.firstName === "John" && arg.lastName === "Doe";

export const isNamedJaneDoe = (arg: Person) =>
  arg.firstName === "Jane" && arg.lastName === "Doe";

export const hasLastNameDoe = (arg: Person) => arg.lastName === "Doe";

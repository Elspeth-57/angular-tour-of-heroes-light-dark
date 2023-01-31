/* Hero is an interface, a named object type
This lets us specify the type of each property in an object,
and then only have to check the type of the whole object,
rather than checking each property individually */
export interface Hero {
  id: number;
  name: string;
}

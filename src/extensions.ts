declare global {
  interface Array<T> {
    /** Returns true when the array contains no elements. */
    isEmpty(this: T[]): boolean
  }

  interface String {
    /** Returns true when the string has no characters. */
    isEmpty(): boolean
  }

  interface Object {
    /** Returns true when the object has no own enumerable string-keyed properties. */
    isEmpty(): boolean
  }
}

Object.defineProperty(Array.prototype, "isEmpty", {
  value: function isEmpty<T>(this: T[]): boolean {
    return this.length === 0
  },
  writable: true,
  configurable: true,
})

Object.defineProperty(String.prototype, "isEmpty", {
  value: function isEmpty(this: string): boolean {
    return this.length === 0
  },
  writable: true,
  configurable: true,
})

Object.defineProperty(Object.prototype, "isEmpty", {
  value: function isEmpty(this: object): boolean {
    return Object.keys(this).length === 0
  },
  writable: true,
  configurable: true,
})

export {}

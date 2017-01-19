# Scino

_Format numbers in scientific notation._

## Installation

```shell
npm install scino --save
```

## Use

Simply `require` scino in your program:

```js
var scino = require('scino')
```

(You’ll need to use a module bundler like [browserify](https://github.com/substack/node-browserify#readme) to use scino in a browser.)

Scino is a function that has three parameters:

### scino(num[, precision][, options])

* **`num`** `<Number>`: Number to convert to scientific notation
* **`precision`** `<Number>`: Optional precision to apply to the float
* **`options`** `<Object>`: Optional formatting options

At its most basic, scino formats numbers:

```js
var formatted = scino(0.0012345)
console.log(formatted) // => '1.2345 × 10⁻³'
```

The numbers’ precision can be easily adjusted:

```js
var formatted = scino(0.00051927528, 4)
console.log(formatted) // => '5.193 × 10⁻⁴'
```

Formatting options are also available:

```js
var formatted = scino(-1234.56, {
  beforeCoefficient: '<strong>',
  afterCoefficient: '</strong>',
  multiplicationSign: '✖︎',
  beforeExponent: '<span>',
  afterExponent: '</span>'
})
console.log(formatted) // => '<strong>-1.23456</strong> ✖︎ 10<span>³</span>'
```

## License

MIT. See [LICENSE](./LICENSE) for details.


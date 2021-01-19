# to-chinese-numeral

> A function that takes a Number as its argument and returns a Chinese numeral string.

## Install

**npm**  
`npm install to-chinese-numeral`

**yarn**  
`yarn add to-chinese-numeral`

## Usage

```js
import toChineseNumeral from "to-chinese-numeral"

try {
  const num = toChineseNumeral(156)
  // num = 一百五十六
} catch (error) {
  console.error(error.message)
}
```

## Valid inputs

The input argument has to be a `Number`, otherwise a `TypeError` will be thrown.

The input argument has to be in the range [-99999.999, 99999.999], otherwise a `RangeError` will be thrown.

## Credits

This package was inspired by a [challenge](https://www.codewars.com/kata/52608f5345d4a19bed000b31/train/javascript) on [codewars.com](https://www.codewars.com/)

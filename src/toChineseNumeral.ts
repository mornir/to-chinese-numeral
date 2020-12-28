function toChineseNumeral(num: number) {
  if (typeof num !== "number") {
    throw new TypeError("Not a number")
  }

  if (num < -99999.999 || num > 99999.999) {
    throw new RangeError("Number must be between -99999 and 99999.")
  }

  const numerals = {
    "-": "负",
    ".": "点",
    0: "零",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
    10: "十",
    100: "百",
    1000: "千",
    10000: "万",
  }

  type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  type Tenth = 10 | 100 | 1000 | 10000

  function generateDecimals(decimals: Digit[]) {
    return decimals.map((number: Digit) => numerals[number]).join("")
  }

  function handleEdgecases(chineseNumeral: string) {
    if (chineseNumeral === "零") {
      return "零"
    }

    const mergeMultipleZeroes = /零+/g
    const removeTrailingZero = /零$/g
    const removeLeadingTenth = /^一十/g

    return chineseNumeral
      .replace(mergeMultipleZeroes, "零")
      .replace(removeTrailingZero, "")
      .replace(removeLeadingTenth, "十")
  }

  function tenX([num1, ...rest]: Digit[]): string {
    if (rest.length === 0) {
      return numerals[num1]
    }

    if (num1 === "0") {
      return numerals[0] + tenX(rest)
    }

    const tenth = Math.pow(10, rest.length) as Tenth

    return numerals[num1] + numerals[tenth] + tenX(rest)
  }

  function generateNumber(nums: Digit[]) {
    let chineseNumeral = handleEdgecases(tenX(nums))

    if (isNeg) {
      return numerals["-"] + chineseNumeral
    }
    return chineseNumeral
  }

  let isNeg = false

  if (num < 0) {
    isNeg = true
    num = num * -1
  }

  const numsString = (num % 100000).toString()

  if (numsString.includes(".")) {
    const nums = numsString.split(".").map((str) => str.split("")) as Digit[][]
    return generateNumber(nums[0]) + numerals["."] + generateDecimals(nums[1])
  } else {
    const nums = numsString.split("") as Digit[]
    return generateNumber(nums)
  }
}

/* try {
  console.log(toChineseNumeral(55555555555))
} catch (error) {
  console.error(error)
} */

module.exports = toChineseNumeral

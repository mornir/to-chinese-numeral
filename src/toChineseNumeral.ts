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

  function generateDecimals(decimals: string[]) {
    return decimals.map((number) => numerals[number]).join("")
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

  function tenX([num1, ...rest]: string[]): string {
    if (rest.length === 0) {
      return numerals[num1]
    }

    if (num1 === "0") {
      return numerals[0] + tenX(rest)
    }

    const tenth = Math.pow(10, rest.length)

    return numerals[num1] + numerals[tenth] + tenX(rest)
  }

  function generateNumber(nums: string[]) {
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

  let nums: string[] | string[][]
  const numsString = (num % 100000).toString()

  if (numsString.includes(".")) {
    nums = numsString.split(".").map((str) => str.split(""))
    return generateNumber(nums[0]) + numerals["."] + generateDecimals(nums[1])
  } else {
    nums = numsString.split("")
    return generateNumber(nums)
  }
}

module.exports = toChineseNumeral

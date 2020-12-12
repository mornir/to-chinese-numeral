function toChineseNumeral(num) {
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

  let isNeg = false

  if (num < 0) {
    isNeg = true
    num = num * -1
  }

  let nums = []
  const numsString = (num % 100000).toString()

  if (numsString.includes(".")) {
    nums = numsString.split(".").map((str) => str.split(""))
    return generateNumber(nums[0]) + numerals["."] + generateDecimals(nums[1])
  } else {
    nums = numsString.split("")
    return generateNumber(nums)
  }

  function generateNumber(nums) {
    function handleEdgecases(chineseNumeral) {
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

    function tenX([num1, ...rest]) {
      let tenth = 0

      if (rest.length === 0) {
        return numerals[num1]
      }

      if (num1 === "0") {
        return numerals[0] + tenX(rest)
      }

      // dizaines
      if (rest.length === 1) {
        tenth = 10
      }

      // centaines
      if (rest.length === 2) {
        tenth = 100
      }

      // milliers
      if (rest.length === 3) {
        tenth = 1000
      }

      // dix mille
      if (rest.length === 4) {
        tenth = 10000
      }

      return numerals[num1] + numerals[tenth] + tenX(rest)
    }

    num = handleEdgecases(tenX(nums))

    if (isNeg) {
      num = numerals["-"] + num
    }
    return num
  }

  function generateDecimals(decimals) {
    return decimals.map((number) => numerals[number]).join("")
  }
}

module.exports = toChineseNumeral

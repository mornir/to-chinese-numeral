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

  if (num === 10) {
    return numerals[num]
  }

  if (num === 100 || num === 1000 || num === 10000) {
    return numerals[1] + numerals[num]
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
    return generateNumber(nums[0]) + numerals["."] + generateNumber(nums[1])
  } else {
    nums = numsString.split("")
    console.log(nums)
    return generateNumber(nums)
  }

  function generateNumber(nums) {
    // unités

    function tenX([num1, ...rest]) {
      let tenth = 0

      if (rest.length === 0) {
        return numerals[nums[0]]
      }

      if (rest.length === 1) {
        console.log(rest)
        return dizaines([num1, ...rest])
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

    function dizaines([num1, num2]) {
      return (
        (num > 20 ? numerals[num1] : "") +
        numerals[10] +
        (num2 !== "0" ? numerals[num2] : "")
      )
    }

    // dizaines
    if (nums.length === 2) {
      num = dizaines(nums)
    } else {
      num = tenX(nums)
    }

    if (isNeg) {
      num = numerals["-"] + num
    }
    /* 
    const regexp = /[1-9](0+)[1-9]/g
    num = num.replace(regexp, numerals[0]) */

    return num
  }
}
// 一万零六

module.exports = toChineseNumeral

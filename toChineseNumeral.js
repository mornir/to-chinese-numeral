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

  const regexp = /零+/g

  if (numsString.includes(".")) {
    nums = numsString.split(".").map((str) => str.split(""))
    return (
      generateNumber(nums[0]).replace(regexp, numerals[0]) +
      numerals["."] +
      generateNumber(nums[1])
    )
  } else {
    nums = numsString.split("")

    return generateNumber(nums).replace(regexp, numerals[0])
  }

  function generateNumber(nums) {
    function tenX([num1, ...rest]) {
      let tenth = 0

      if (rest.length === 0) {
        return numerals[nums[0]]
      }

      if (rest.length === 1) {
        return dizaines([num1, ...rest])
      }

      if (num1 === "0") {
        return numerals[0] + tenX(rest)
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
      let position1 = ""
      if (num1 === "0") {
        position1 = "零"
      } else if (num1 !== "1" || num > 20) {
        position1 = numerals[num1]
      }

      let position2 = num1 !== "0" ? numerals[10] : ""

      let position3 = num2 !== "0" ? numerals[num2] : ""

      return position1 + position2 + position3
    }

    num = tenX(nums)

    if (isNeg) {
      num = numerals["-"] + num
    }
    return num
  }
}

console.log(toChineseNumeral(1000))

module.exports = toChineseNumeral

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

  if (num === 10) {
    return numerals[num]
  }

  if (num === 100 || num === 1000 || num === 10000) {
    return numerals[1] + numerals[num]
  }

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

    if (nums.length === 1) {
      num = numerals[nums[0]]
    }

    function dizaines([num1, num2]) {
      return (
        (num > 20 ? numerals[num1] : "") +
        numerals[10] +
        (num2 !== "0" ? numerals[num2] : "")
      )
    }

    function centaines([num1, ...rest]) {
      return numerals[num1] + numerals[100] + dizaines(rest)
    }

    function milliers([num1, ...rest]) {
      return numerals[num1] + numerals[1000] + centaines(rest)
    }

    function dixmilliers([num1, ...rest]) {
      return numerals[num1] + numerals[10000] + milliers(rest)
    }

    // dizaines
    if (nums.length === 2) {
      num = dizaines(nums)
    }

    // centaines
    if (nums.length === 3) {
      num = centaines(nums)
    }

    // milliers
    if (nums.length === 4) {
      num = milliers(nums)
    }

    // dix mille
    if (nums.length === 5) {
      num = dixmilliers(nums)
    }

    if (isNeg) {
      console.log(num)
      num = "负" + num
    }

    return num
  }
}

console.log(toChineseNumeral(110))

module.exports = toChineseNumeral

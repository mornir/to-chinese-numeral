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

  if (num < 0) {
    isNeg = true
    num = num * -1
  }

  const nums = (num % 100000).toString().split("")

  console.log(nums)

  // unités
  if (nums.length === 1) {
    return numerals[nums[0]]
  }

  function dizaines([num1, num2]) {
    return (
      (num1 !== "1" ? numerals[num1] : "") +
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
    num += "负"
  }

  return num
}

console.log(toChineseNumeral(-12))

module.exports = toChineseNumeral

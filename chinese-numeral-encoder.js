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

  if (num === 10 || num == 0) {
    return numerals[num]
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

  function centaines([num1, num2, num3]) {
    return numerals[num1] + numerals[100] + dizaines([num2, num3])
  }

  function milliers([num1, num2, num3, num4]) {
    return numerals[num1] + numerals[1000] + centaines([num2, num3, num4])
  }

  function dixmilliers([num1, num2, num3, num4, num5]) {
    return numerals[num1] + numerals[10000] + milliers([num2, num3, num4, num5])
  }

  // dizaines
  if (nums.length === 2) {
    return dizaines(nums)
  }

  // centaines
  if (nums.length === 3) {
    return centaines(nums)
  }

  // milliers
  if (nums.length === 4) {
    return milliers(nums)
  }

  // dix mille
  if (nums.length === 5) {
    return dixmilliers(nums)
  }

  return nums
}

console.log(toChineseNumeral(12345))

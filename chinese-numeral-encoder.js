function toChineseNumeral(num = 10) {
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

  const nums = (num % 1000).toString().split("")

  console.log(nums)

  // unités
  if (nums.length === 1) {
    return numerals[nums[0]]
  }

  // dizaines
  if (nums.length === 2) {
    return (
      (nums[0] !== "1" ? numerals[nums[1]] : "") +
      numerals[10] +
      (nums[1] !== "0" ? numerals[nums[1]] : "")
    )
  }

  // centaines
  if (nums.length === 3) {
    return (
      numerals[nums[0]] +
      numerals[100] +
      (nums[1] !== "0" ? numerals[nums[1]] : "")
    )
  }

  return nums
}

console.log(toChineseNumeral(12))

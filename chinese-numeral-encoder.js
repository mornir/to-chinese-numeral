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

  const nums = (num / 10)
    .toString()
    .split(".")
    .reduce((acc, n, idx) => {
      if (idx + 1 === 1 && n !== "0") {
        acc += numerals[parseInt(n)] + "十"
      }
      if (idx + 1 === 2) {
        acc += numerals[parseInt(n)]
      }
      return acc
    }, "")

  return nums
}

console.log(toChineseNumeral(52))

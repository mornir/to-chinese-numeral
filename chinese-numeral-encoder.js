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
    return numerals[10]
  }

  const nums = (num / 1000)
    .toString()
    .split("")
    .filter((n) => n !== ".")
    .reduce((acc, n, idx) => {
      if (idx === 0 && n !== "0") {
        acc += numerals[parseInt(n)] + "千"
      }

      if (idx === 1 && n !== "0") {
        acc += numerals[parseInt(n)] + "百"
      }

      if (idx === 2 && n !== "0") {
        acc += numerals[parseInt(n)] + "十"
      }
      if (idx === 3) {
        acc += numerals[parseInt(n)]
      }
      return acc
    }, "")

  return nums
}

console.log(toChineseNumeral(1001))

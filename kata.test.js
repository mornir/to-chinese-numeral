describe("Chinese Numerals", function () {
  test("Whole numbers", () => {
    expect(toChineseNumeral(9), "九")
  })
  test("Negative numbers", () => {
    expect(toChineseNumeral(-5), "负五")
  })
  test("Fractional numbers", () => {
    expect(toChineseNumeral(0.5), "零点五")
  })
  test("Special Cases", () => {
    expect(toChineseNumeral(10), "十")
    expect(toChineseNumeral(110), "一百一十")
    expect(toChineseNumeral(111), "一百一十一")
    expect(toChineseNumeral(1000), "一千")
    expect(toChineseNumeral(10000), "一万")
    expect(toChineseNumeral(10006), "一万零六")
    expect(toChineseNumeral(10306.005), "一万零三百零六点零零五")
  })
})

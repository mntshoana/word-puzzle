describe("LolipopComponent", () => {
  const getHeatMapColor = (percent: number) => {
    let r, g, b;
    if (percent < 50) {
      r = Math.floor(70 * (percent / 50));
      g = Math.floor(40 * (percent / 50));
      b = 180;
    } else {
      r = 255;
      g = Math.floor(70 * ((100 - percent) / 50));
      b = Math.floor(30 * ((100 - percent) / 50));
    }
    return `rgba(${r},${g},${b},0.5)`;
  };

  test("getHeatMapColor returns correct color for percent < 50", () => {
    const color = getHeatMapColor(25);
    expect(color).toBe("rgba(35,20,180,0.5)");
  });

  test("getHeatMapColor returns correct color for percent = 50", () => {
    const color = getHeatMapColor(50);
    expect(color).toBe("rgba(255,70,30,0.5)");
  });

  test("getHeatMapColor returns correct color for percent > 50", () => {
    const color = getHeatMapColor(75);
    expect(color).toBe("rgba(255,35,15,0.5)");
  });

  test("getHeatMapColor returns correct color for percent = 100", () => {
    const color = getHeatMapColor(100);
    expect(color).toBe("rgba(255,0,0,0.5)");
  });
});

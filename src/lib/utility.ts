type Mode = {
  mode: number;
  count: number;
};

export const modeCount = (data: number[]) => {
  const mode: Mode[] = [];
  const valueArr: number[] = [];
  const dataSet = new Set(data);
  for (const iterator of dataSet) {
    const filteredNum = data.filter((num) => iterator === num);
    mode.push({
      mode: iterator,
      count: filteredNum.length,
    });
  }

  mode.sort((a, b) => {
    return b.count - a.count;
  });

  mode.forEach((value) => {
    if (value.count === mode[0].count) {
      valueArr.push(value.mode);
    }
  });

  return valueArr;
};

export const getModeCountMax = (data: number[]): number => {
  const list = modeCount(data);

  return list[0];
};

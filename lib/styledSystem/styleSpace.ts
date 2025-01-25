import theme from "@/config/theme";

type Value = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type SpaceProps = {
  m?: Value;
  mt?: Value;
  mr?: Value;
  mb?: Value;
  ml?: Value;
  mx?: Value;
  my?: Value;
  p?: Value;
  pt?: Value;
  pr?: Value;
  pb?: Value;
  pl?: Value;
  px?: Value;
  py?: Value;
};
type SpaceKeys = keyof SpaceProps;

const REG = /^[mp][trblxy]?$/;

const properties = {
  m: "margin",
  p: "padding",
} as const;

const directions = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"],
} as const;

export const styleSpace = (props: SpaceProps) => {
  const keys = (Object.keys(props) as SpaceKeys[])
    .filter((key) => REG.test(key))
    .sort();

  return keys
    .map((key) => {
      const value = props[key] as Value;
      const mappedProperties = getProperties(key);

      return mappedProperties.reduce(
        (acc: any, k: string) => {
          acc[k] = theme().space(value);
          return acc;
        },
        {} as { [k: string]: number },
      );
    })
    .reduce((acc, m) => {
      Object.assign(acc, m);
      return acc;
    }, {});
};

const getProperties = (key: string) => {
  const [a, b] = key.split("") as [
    keyof typeof properties,
    keyof typeof directions,
  ];
  const property = properties[a];
  const direction = directions[b] || "";

  if (Array.isArray(direction)) {
    const dirMap: string[] = [];
    for (const m of direction) {
      dirMap.push(m);
    }
    return dirMap.map((dir: string) => property + dir);
  }

  return [property + direction];
};

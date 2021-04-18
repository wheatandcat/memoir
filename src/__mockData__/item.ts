import { ItemQuery } from 'queries/api/index';
type Item = NonNullable<ItemQuery['item']>;

export const item = (option?: Partial<Item>): Item => ({
  id: '1',
  title: '買い物',
  categoryID: 9,
  date: '2021-01-01T00:00:00+09:00',
  like: false,
  dislike: false,
  createdAt: '2021-01-01T00:00:00+09:00',
  updatedAt: '2021-01-01T00:00:00+09:00',
  ...option,
});

export const items = (): Item[] => [
  item(),
  item({
    id: '2',
    title: '本を読む',
    categoryID: 2,
    date: '2021-01-01T00:00:00+09:00',
    dislike: false,
    like: false,
  }),
  item({
    id: '3',
    title: '公園に行った',
    categoryID: 3,
    date: '2021-01-02T00:00:00+09:00',
    dislike: false,
    like: false,
  }),
  item({
    id: '4',
    title: 'ジムに行った',
    categoryID: 4,
    date: '2021-01-03T00:00:00+09:00',
    dislike: false,
    like: false,
  }),
];

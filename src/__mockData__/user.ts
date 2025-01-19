import type { User } from "queries/api/index";

export const user = (option?: Partial<User>): User => ({
  id: "1",
  displayName: "test",
  image: "",
  updatedAt: "2021-01-01T00:00:00+09:00",
  createdAt: "2021-01-01T00:00:00+09:00",
  ...option,
});

export const users = (): User[] => [
  {
    id: "test1",
    displayName: "suzuki1",
    image: "https://placehold.jp/150x150.png",
    updatedAt: "2021-01-01T00:00:00+09:00",
    createdAt: "2021-01-01T00:00:00+09:00",
  },
  {
    id: "test2",
    displayName: "suzuki2",
    image: "https://placehold.jp/150x150.png",
    updatedAt: "2021-01-01T00:00:00+09:00",
    createdAt: "2021-01-01T00:00:00+09:00",
  },
  {
    id: "test3",
    displayName: "suzuki4",
    image: "https://placehold.jp/150x150.png",
    updatedAt: "2021-01-01T00:00:00+09:00",
    createdAt: "2021-01-01T00:00:00+09:00",
  },
  {
    id: "test4",
    displayName: "suzuki4",
    image: "https://placehold.jp/150x150.png",
    updatedAt: "2021-01-01T00:00:00+09:00",
    createdAt: "2021-01-01T00:00:00+09:00",
  },
  {
    id: "test5",
    displayName: "suzuki5",
    image: "https://placehold.jp/150x150.png",
    updatedAt: "2021-01-01T00:00:00+09:00",
    createdAt: "2021-01-01T00:00:00+09:00",
  },
];

import * as useHomeItems from "@/hooks/useHomeItems";
import { testRenderer } from "@/lib/testUtil";
import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import { item } from "__mockData__/item";
import { graphql } from "msw";
import { ItemDocument, UpdateItemDocument } from "queries/api/index";
import React from "react";
import * as Recoil from "recoil";
import ItemDetail, { type Props } from "../";
import type { Props as ConnectedProps } from "../Connected";

const propsData = (props?: Partial<ConnectedProps>): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
        date: "2020-01-01",
        id: "test1",
        ...props,
      },
    },
  }) as any;

describe("components/pages/ItemDetail/index.tsx", () => {
  beforeEach(() => {
    jest
      .spyOn(Recoil, "useSetRecoilState")
      .mockImplementation((): any => jest.fn());
    jest.spyOn(useHomeItems, "default").mockImplementation((): any => ({
      loading: false,
      error: null,
      refetch: jest.fn(),
    }));
  });

  it("各項目が正しく表示される", async () => {
    const renderPage = testRenderer(
      <ItemDetail
        {...propsData({
          itemID: "test1",
        })}
      />,
    );

    const queryInterceptor = jest.fn();

    renderPage(
      graphql.query(ItemDocument, (req, res, ctx) => {
        queryInterceptor(req.variables);

        return res(
          ctx.data({
            item: {
              ...item(),
              id: req.variables.id,
              date: "2021-01-01T00:00:00+09:00",
              title: "宝くじが当たった",
              categoryID: 9,
              like: true,
            },
          }),
        );
      }),
    );

    await waitFor(async () => {
      expect(queryInterceptor).toHaveBeenCalledTimes(1);
      expect(screen.getByText("宝くじが当たった")).toBeTruthy();
      expect(screen.getByText("2021.01.01 / 金")).toBeTruthy();
      expect(screen.getByTestId("like")).toBeTruthy();
      expect(screen.getByTestId("category_id_9")).toBeTruthy();
    });
  });

  it("アイテムを更新する", async () => {
    const renderPage = testRenderer(
      <ItemDetail
        {...propsData({
          itemID: "test1",
        })}
      />,
    );

    const mutationInterceptor = jest.fn();

    renderPage(
      graphql.mutation(UpdateItemDocument, (req, res, ctx) => {
        mutationInterceptor(req.variables);

        return res(
          ctx.data({
            updateItem: {
              id: req.variables.input.id,
              date: "2020-01-01T00:00:00+09:00",
            },
          }),
        );
      }),
    );

    await waitFor(async () => {
      fireEvent.press(screen.getByTestId("menu"));
      expect(screen.getByTestId("menu_modal").props.visible).toBeTruthy();

      fireEvent.press(screen.getByTestId("edit"));
      expect(screen.getByTestId("add_item_modal").props.visible).toBeTruthy();

      fireEvent.changeText(
        screen.getByPlaceholderText("今日何やった？"),
        "コップを割った",
      );

      fireEvent.press(screen.getByTestId("input_category_id_1"));
      fireEvent.press(screen.getByTestId("input_dislike"));
      fireEvent.press(screen.getByText("入力"));

      expect(mutationInterceptor).toHaveBeenCalledWith({
        input: {
          id: "test1",
          title: "コップを割った",
          categoryID: 1,
          date: "2020-01-01T00:00:00+09:00",
          like: false,
          dislike: true,
        },
      });
    });

    await waitForElementToBeRemoved(() => screen.getByTestId("button-loading"));
  });
});

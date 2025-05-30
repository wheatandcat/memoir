import * as useHomeItems from "@/hooks/useHomeItems";
import { testRenderer } from "@/lib/testUtil";
import { item } from "@/mocks/__mockData__/item";
import { ItemDocument, UpdateItemDocument } from "@/queries/api/index";
import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import * as expoRouter from "expo-router";
import { HttpResponse, graphql } from "msw";
import React from "react";
import ItemDetail from "../";

describe("components/pages/ItemDetail/index.tsx", () => {
  it("各項目が正しく表示される", async () => {
    jest
      .spyOn(expoRouter, "useLocalSearchParams")
      .mockImplementation((): any => ({
        id: "test1",
        date: "2020-01-01",
      }));

    const renderPage = testRenderer(<ItemDetail />);

    const queryInterceptor = jest.fn();

    renderPage(
      graphql.query(ItemDocument, ({ variables }) => {
        queryInterceptor(variables);

        return HttpResponse.json({
          data: {
            item: {
              ...item(),
              id: variables.id,
              date: "2021-01-01T00:00:00+09:00",
              title: "宝くじが当たった",
              categoryID: 9,
              like: true,
            },
          },
        });
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
    jest
      .spyOn(expoRouter, "useLocalSearchParams")
      .mockImplementation((): any => ({
        id: "test1",
        date: "2020-01-01",
      }));

    const renderPage = testRenderer(<ItemDetail />);

    const mutationInterceptor = jest.fn();

    renderPage(
      graphql.mutation(UpdateItemDocument, ({ variables }) => {
        mutationInterceptor(variables);

        return HttpResponse.json({
          data: {
            updateItem: {
              id: variables.input.id,
              date: "2020-01-01T00:00:00+09:00",
            },
          },
        });
      }),
    );

    /*
    await waitFor(async () => {
      fireEvent.press(screen.getByTestId("menu"));
      expect(screen.getByTestId("menu_modal").props.visible).toBeTruthy();

      fireEvent.press(screen.getByTestId("edit"));
      expect(screen.getByTestId("add_item_modal").props.visible).toBeTruthy();

      fireEvent.changeText(
        screen.getByPlaceholderText("今日何やった？"),
        "コップを割った"
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
    */
  });
});

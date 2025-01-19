import View from "@/components/elements/View";
import AddItemModal from "@/components/layouts/AddItemModal";
import CardDetail from "@/components/layouts/CardDetail/CardDetail";
import InputDateWrap from "@/components/layouts/InputDateWrap/InputDateWrap";
import theme from "@/config/theme";
import dayjs from "@/lib/dayjs";
import type { ItemQuery, NewItem } from "queries/api/index";
import { type FC, memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import type { ConnectedType } from "./type";

type Item = NonNullable<ItemQuery["item"]>;

export type Props = Pick<Item, "categoryID" | "title" | "like" | "dislike"> & {
  loading: boolean;
  itemDate: string;
} & ConnectedType;

const Page: FC<Props> = (props) => {
  const item: NewItem = {
    title: props.title,
    categoryID: props.categoryID,
    date: props.date,
    like: props.like,
    dislike: props.dislike,
  };

  return (
    <>
      <AddItemModal
        item={item}
        isVisible={props.openUpdateItemModal}
        loading={props.updateItemLoading}
        date={dayjs(props.date).format("YYYY-MM-DD")}
        edit
        onAdd={props.onUpdateItem}
        onClose={props.onCloseUpdateItem}
      />
      <InputDateWrap
        date={props.date}
        onChangeDate={props.onChangeDate}
        isItemDetail
      >
        <ScrollView>
          <View style={styles.inner}>
            {!props.loading && (
              <CardDetail
                date={props.itemDate}
                title={props.title}
                categoryID={props.categoryID}
                like={props.like}
                dislike={props.dislike}
                onOpenUpdateItem={props.onOpenUpdateItem}
                onDeleteItem={props.onDeleteItem}
              />
            )}
          </View>
        </ScrollView>
      </InputDateWrap>
    </>
  );
};

export default memo(Page);

const styles = StyleSheet.create({
  inner: {
    height: "100%",
    marginHorizontal: theme().space(3),
    marginVertical: theme().space(4),
  },
});

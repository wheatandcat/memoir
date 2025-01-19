import AddItemModal from "@/components/layouts/AddItemModal";
import Cards from "@/components/layouts/Cards/Cards";
import GestureRecognizerWrap from "@/components/layouts/Home/GestureRecognizerWrap";
import MemoirButton from "@/components/layouts/Home/MemoirButton";
import InputDateWrap from "@/components/layouts/InputDateWrap/InputDateWrap";
import SettingModal from "@/components/layouts/SettingModal";
import theme from "@/config/theme";
import dayjs from "@/lib/dayjs";
import type { ItemQuery } from "queries/api/index";
import type { FC } from "react";
import { memo } from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import type { ConnectedType } from "./type";

type Item = ItemQuery["item"];

export type Props = {
  addItemLoading: boolean;
  date: string;
  items: Item[];
} & ConnectedType;

const Page: FC<Props> = (props) => {
  const style: ViewStyle[] = [];
  if (props.items.length > 3) {
    style.push(styles.inner);
  }

  return (
    <InputDateWrap date={props.date} onChangeDate={props.onChangeDate}>
      <SettingModal
        isVisible={props.openSettingModal}
        onClose={props.onCloseSettingModal}
      />
      <AddItemModal
        isVisible={props.openAddItemModal}
        loading={props.addItemLoading}
        date={dayjs(props.date).format("YYYY-MM-DD")}
        onAdd={props.onAddItem}
        onClose={props.onCloseAddItem}
      />

      <GestureRecognizerWrap
        date={props.date}
        items={props.items}
        onChangeDate={props.onChangeDate}
      >
        <Cards
          date={props.date}
          addItemLoading={props.addItemLoading}
          loading={props.loading}
          items={props.items}
          onItem={props.onItem}
          onAddItem={props.onOpenAddItem}
        />
      </GestureRecognizerWrap>

      <MemoirButton onPress={props.onMemoir} />
    </InputDateWrap>
  );
};

export default memo(Page);

const styles = StyleSheet.create({
  inner: {
    marginBottom: theme().space(3),
  },
});

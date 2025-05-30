import DateInput from "@/components/layouts/DateInput/DateInput";
import React from "react";
import type { FC, ReactNode } from "react";
import { memo } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  date: string;
  isItemDetail?: boolean;
  onChangeDate: (date: string) => void;
  children?: ReactNode;
};

const InputDateWrap: FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <DateInput
        date={props.date}
        onChange={props.onChangeDate}
        isItemDetail={props.isItemDetail}
      />
      {props.children}
    </View>
  );
};

export default memo<FC<Props>>(InputDateWrap);

const styles = StyleSheet.create({
  root: {
    height: "100%",
    position: "relative",
  },
});

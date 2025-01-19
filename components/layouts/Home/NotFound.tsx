import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import NotFoundIcon from "@/components/layouts/NotFound/Icon";
import dayjs from "@/lib/dayjs";
import type { FC } from "react";
import { StyleSheet } from "react-native";

type Props = {
  date: string;
};

const NotFound: FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View>
        <Text color="baseDark" textAlign="center">
          {dayjs(props.date).isSame(dayjs(), "day") ? "今日" : "この日"}
          のタスクは
          {"\n"}まだありません
        </Text>
      </View>
      <View mt={4}>
        <NotFoundIcon date={props.date} />
      </View>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
});

import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "config/theme";
import { type FC, memo } from "react";
import { StyleSheet } from "react-native";

export type Props = {
  displayName: string;
};

const Sent: FC<Props> = (props) => {
  return (
    <View style={styles.invite}>
      <Text textAlign="center">
        <Text color="primary">{props.displayName}</Text> さんに共有の申請を
        {"\n"}送りました
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  invite: {
    alignItems: "center",
    paddingTop: theme().space(3),
    paddingBottom: theme().space(2),
  },
});

export default memo(Sent);

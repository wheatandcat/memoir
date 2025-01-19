import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import InputCode from "@/components/layouts/InputCode/InputCode";
import theme from "@/config/theme";
import { type FC, memo } from "react";
import { StyleSheet } from "react-native";

export type Props = {
  code: string;
  onChange: (code: string) => void;
};

const Input: FC<Props> = (props) => {
  return (
    <>
      <View style={styles.invite}>
        <Text>
          振り返りを共有したいユーザーの{"\n"}
          招待コードを入力してください
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <InputCode value={props.code} onChange={props.onChange} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  invite: {
    alignItems: "center",
    paddingTop: theme().space(3),
    paddingBottom: theme().space(2),
  },
  inputContainer: {
    marginLeft: theme().space(3),
    marginTop: theme().space(4),
    width: 280,
  },
});

export default memo(Input);

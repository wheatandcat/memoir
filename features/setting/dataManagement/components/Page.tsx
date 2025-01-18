import Button from "@/components/elements/Button";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import {
  connectActionSheet,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import theme from "config/theme";
import type React from "react";
import { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import type { ConnectedType } from "./type";

export type Props = ConnectedType & {};

const Page: React.FC<Props> = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onCheck = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: ["完全に削除する", "キャンセル"],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          props.onDelete();
        }
      },
    );
  }, [showActionSheetWithOptions, props]);

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <View style={styles.inner}>
          <View pb={4}>
            <Text lineHeight={22}>
              アカウント削除をするとデータも完全に削除されます。
            </Text>
          </View>

          <View pb={4}>
            <Text color="error" lineHeight={22}>
              削除したアカウントは復元することができないので、ご注意ください。
            </Text>
          </View>

          {props.disabledDeleteButton && (
            <View pb={4}>
              <Text lineHeight={22}>
                共有メンバーの設定がある場合は削除できないので、事前に解除をお願いします。
              </Text>
            </View>
          )}

          <View>
            <Button
              title="アカウント削除"
              onPress={onCheck}
              loading={props.loading}
              disabled={props.disabledDeleteButton || props.loading}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingTop: theme().space(3),
  },
  card: {
    backgroundColor: theme().color.background.light,
    alignItems: "center",
    paddingVertical: theme().space(4),

    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.base.main,
  },
  inner: {
    width: 320,
    paddingHorizontal: theme().space(4),
  },
});

export default connectActionSheet(memo(Page));

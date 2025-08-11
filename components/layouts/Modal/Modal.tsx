import Button from "@/components/elements/Button";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import IconButton from "@/components/layouts/IconButton";
import theme from "@/config/theme";
import type React from "react";
import type { FC } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type Props = {
  isVisible: boolean;
  loading?: boolean;
  title: string;
  titleElement?: React.ReactNode;
  buttonTitle?: string;
  disabledButton?: boolean;
  height?: number;
  onClose: () => void;
  onPress?: () => void;
  children: React.ReactNode;
  testID?: string;
};

const AppModal: FC<Props> = (props) => {
  const insets = useSafeAreaInsets();
  const style: ViewStyle[] = [styles.root];
  if (props.height) {
    style.push({ height: props.height });
  }

  const overlayStyle = [
    styles.overlay,
    {
      paddingTop: Platform.OS === "android" ? insets.top : 0,
      paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
    },
  ];

  return (
    <View style={styles.container}>
      <Modal
        visible={props.isVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        testID={props.testID}
      >
        <View style={overlayStyle}>
          <View style={style}>
            <View p={3} style={styles.header}>
              <View style={styles.close}>
                <IconButton name="close" onPress={props.onClose} />
              </View>
              <View style={styles.title}>
                {props.titleElement ? (
                  <>{props.titleElement}</>
                ) : (
                  <View>
                    <Text variants="middle" textAlign="center">
                      {props.title}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="always"
              removeClippedSubviews
            >
              <View px={3}>{props.children}</View>
            </ScrollView>
            {Boolean(props.buttonTitle) && (
              <View mx={3} mb={3}>
                <Button
                  title={props.buttonTitle || ""}
                  size="lg"
                  onPress={() => props.onPress?.()}
                  disabled={props.disabledButton}
                  loading={props.loading}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme().space(2),
  },
  root: {
    width: "100%",
    backgroundColor: theme().color.background.light,
    borderRadius: 30,

    position: "relative",
    ...Platform.select({
      ios: {
        height: "80%",
      },
      android: {
        height: "100%",
      },
    }),
  },
  header: {
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
  },
  close: {
    position: "absolute",
    top: theme().space(3),
    left: theme().space(3),
  },
});

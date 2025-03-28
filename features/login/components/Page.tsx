import Divider from "@/components/elements/Divider";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import Form from "@/components/layouts/Login/Form";
import Loading from "@/components/layouts/Overlay/Loading";
import theme from "@/config/theme";
import type { UseFirebaseAuth } from "@/hooks/useFirebaseAuth";
import type { FC } from "react";
import { memo } from "react";
import { StyleSheet } from "react-native";

export type Props = {
  loading: boolean;
  onAppleLogin: UseFirebaseAuth["onAppleLogin"];
  onGoogleLogin: UseFirebaseAuth["onGoogleLogin"];
};

const Page: FC<Props> = (props) => {
  return (
    <>
      <View style={styles.root}>
        <View>
          <Text size="xl">🎊 Memoirへようこそ </Text>
        </View>
        <View style={styles.divider}>
          <Divider mt={2} mb={5} />
        </View>
        <Form
          onAppleLogin={props.onAppleLogin}
          onGoogleLogin={props.onGoogleLogin}
        />
      </View>
      {props.loading && <Loading text="ログイン中" />}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: "100%",
  },
});

export default memo(Page);

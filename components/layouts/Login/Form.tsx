import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import type { UseFirebaseAuth } from "@/hooks/useFirebaseAuth";
import * as AppleAuthentication from "expo-apple-authentication";
import type { FC } from "react";
import { memo } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

export type Props = {
  onAppleLogin: UseFirebaseAuth["onAppleLogin"];
  onGoogleLogin: UseFirebaseAuth["onGoogleLogin"];
};

const Form: FC<Props> = (props) => {
  return (
    <>
      {Platform.OS === "ios" && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={props.onAppleLogin}
          testID="apple-login"
        />
      )}
      {Platform.OS === "android" && (
        <TouchableOpacity onPress={props.onGoogleLogin}>
          <View style={styles.googleButton}>
            <View>
              <Image
                source={require("@/assets/img/icon/icon_google.png")}
                width={25}
                height={25}
              />
            </View>
            <View px={2}>
              <Text fontFamily="NotoSansJP-Bold">Googleでログイン</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 55,
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: theme().space(3),
    paddingVertical: theme().space(0),
    borderRadius: 10,
  },
});

export default memo(Form);

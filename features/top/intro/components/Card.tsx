import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import { type FC, memo } from "react";
import {
  ImageBackground,
  type ImageSourcePropType,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

export type Props = {
  source: ImageSourcePropType;
  text: string;
  onNext: () => void;
};

const Card: FC<Props> = (props) => {
  return (
    <ImageBackground
      source={require("@/assets/img/common/frame.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.inner}>
        <View>
          <Image
            source={props.source}
            width={95}
            height={95}
            contentFit="contain"
          />
        </View>
        <View mt={4}>
          <Text
            textAlign="center"
            variants="large"
            lineHeight={50}
            fontFamily="NotoSansJP-Bold"
          >
            {props.text}
          </Text>
        </View>
        <View mt={4}>
          <TouchableWithoutFeedback onPress={props.onNext}>
            <View style={styles.nextButton}>
              <Text fontWeight="bold" textAlign="center">
                次へ
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  inner: {
    alignItems: "center",
    height: "50%",
  },
  nextButton: {
    width: 180,
    backgroundColor: theme().color.background.main,
    paddingVertical: theme().space(3),
  },
});

export default memo(Card);

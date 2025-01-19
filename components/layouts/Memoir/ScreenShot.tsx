import Divider from "@/components/elements/Divider";
import Image from "@/components/elements/Image";
import View from "@/components/elements/View";
import DateText from "@/components/layouts/Memoir/DateText";
import Header from "@/components/layouts/Memoir/Header";
import Loading from "@/components/layouts/Overlay/Loading";
import theme from "@/config/theme";
import type { Props as PlainProps } from "@/features/memoir/screenShot/components/Plain";
import type { Item } from "@/hooks/useItemsInPeriodPaging";
import dayjs from "@/lib/dayjs";
import { getModeCountMax } from "@/lib/utility";
import type { User as TUser } from "@/store/atoms";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Sharing from "expo-sharing";
import { type FC, memo, useCallback, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import ViewShot from "react-native-view-shot";
import Card from "./Card";

export type Props = Pick<PlainProps, "users"> & {
  startDate: string;
  endDate: string;
  items: Item[];
};

type User = Omit<TUser, "userID"> & {
  id: string;
};

type CardType = Item & {
  user: User;
};

type RenderedItem = {
  date: string | null;
  contents?: CardType;
  categoryID?: number;
  last?: boolean;
  width: number;
  onLoadEnd: () => void;
};

const RenderItem: React.FC<RenderedItem> = (props) => {
  if (props.date) {
    return <DateText date={props.date} categoryID={Number(props.categoryID)} />;
  }

  return (
    <View>
      <View mb={3} mx={3}>
        <Card
          title={props?.contents?.title || ""}
          categoryID={props?.contents?.categoryID || 0}
          user={props?.contents?.user as User}
          onLoadEnd={props.onLoadEnd}
        />
        {!props?.last && <Divider />}
      </View>
      {!!props.last && (
        <Image
          source={require("@/assets/img/icon/border_dotted.png")}
          width={props.width}
          height={2}
        />
      )}
    </View>
  );
};

const ScreenShot: FC<Props> = (props) => {
  const viewShot = useRef<ViewShot>(null);
  const navigation = useNavigation();
  const count = useRef(0);
  const [loading, setLoading] = useState(true);

  const windowWidth = useWindowDimensions().width;

  const onShare = useCallback(
    async (uri: string) => {
      const ok = await Sharing.isAvailableAsync();
      if (!ok) {
        Alert.alert("エラー", "共有機能を利用できませんでした", [
          {
            text: "戻る",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);

        return;
      }

      await Sharing.shareAsync(uri);

      navigation.goBack();
    },
    [navigation],
  );

  const onCapture = useCallback(async () => {
    if (Constants.expoConfig?.extra?.storybookEnabled === "true") {
      //storybookの場合はスルーさせる
      return;
    }

    const url = await viewShot.current?.capture?.();

    if (url) onShare(`file://${url}`);
  }, [onShare]);

  const onLoadEnd = useCallback(() => {
    count.current = count.current + 1;

    if (props.items.length === count.current) {
      setLoading(false);
      setTimeout(() => onCapture(), 100);
    }
  }, [props.items, onCapture]);

  const dates = Array.from(
    new Set(props.items.map((v) => dayjs(v.date).format("YYYY-MM-DD"))),
  );

  const dateItems = dates.sort().map((date) => {
    const contents = date;

    return {
      date,
      contents,
    };
  });

  const data = dateItems.flatMap((v1) => {
    const sameDateItems = props.items.filter(
      (v2) => dayjs(v2.date).format("YYYY-MM-DD") === v1.date,
    );

    const item: RenderedItem[] = sameDateItems.map((v2, index) => {
      const user: User | undefined = props.users.find(
        (v) => v.id === v2.userID,
      );

      return {
        date: null,
        contents: {
          ...v2,
          user: user || {
            id: "",
            displayName: "",
            image: "",
          },
        },
        last: sameDateItems.length === index + 1,
        width: windowWidth,
        onLoadEnd: onLoadEnd,
      };
    });

    const categoryID = item.map((v) => Number(v.contents?.categoryID));

    const dateItem: RenderedItem = {
      date: v1.date,
      categoryID: getModeCountMax(categoryID),
      width: windowWidth,
      onLoadEnd: () => null,
    };

    return [dateItem, ...item];
  });

  return (
    <>
      <ScrollView style={styles.root} testID="screen-shot">
        <ViewShot
          ref={viewShot}
          options={{ format: "jpg" }}
          style={styles.screen}
        >
          <Header startDate={props.startDate} endDate={props.endDate} isTitle />
          {data.map((v, index) => (
            <RenderItem {...v} key={index} />
          ))}
          <View />
        </ViewShot>
      </ScrollView>
      {loading && <Loading text="作成中" />}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    flex: 1,
    width: "100%",
    paddingTop: theme().space(4),
  },
  screen: {
    backgroundColor: theme().color.background.main,
  },
});

export default memo(ScreenShot);

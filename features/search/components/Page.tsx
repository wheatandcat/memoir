import Button from "@/components/elements/Button";
import Divider from "@/components/elements/Divider";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import Compatibility from "@/components/layouts/Compatibility/Compatibility";
import InputCategory from "@/components/layouts/Search/Input/InputCategory";
import InputDate from "@/components/layouts/Search/Input/InputDate";
import InputUsers from "@/components/layouts/Search/Input/InputUsers";
import theme from "config/theme";
import dayjs from "lib/dayjs";
import type { User } from "queries/api/index";
import { type FC, memo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import type { Input } from "./type";
export type Props = {
  users: Pick<User, "id" | "image">[];
  onSearch: (input: State) => void;
};

export type State = Input;

const initialState = (): State => ({
  startDate: new Date(
    dayjs().add(-6, "day").format("YYYY-MM-DDT00:00:00+09:00")
  ),
  endDate: new Date(dayjs().format("YYYY-MM-DDT00:00:00+09:00")),
  userIDList: [],
  categoryID: 0,
  like: false,
  dislike: false,
});

const Page: FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());

  const error = dayjs(state.startDate).isAfter(state.endDate);

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inner}>
          <View pt={3}>
            <Text variants="small" color="secondaryLight">
              日付
            </Text>
          </View>
          <InputDate
            error={error}
            startDate={state.startDate}
            endDate={state.endDate}
            onChangeStartDate={(startDate) => {
              setState((s) => ({ ...s, startDate }));
            }}
            onChangeEndDate={(endDate) => {
              setState((s) => ({ ...s, endDate }));
            }}
          />
          {error && (
            <View pt={3}>
              <Text size="xs" textAlign="center" color="error">
                開始日が終了日より前に設定されています
              </Text>
            </View>
          )}

          <View pt={4} pb={2}>
            <View pb={3}>
              <Text variants="small" textAlign="center" color="secondaryLight">
                共有メンバー
              </Text>
            </View>
            <InputUsers
              users={props.users}
              userIDList={state.userIDList}
              onAdd={(uid) => {
                setState((s) => ({ ...s, userIDList: [...s.userIDList, uid] }));
              }}
              onRemove={(uid) => {
                setState((s) => ({
                  ...s,
                  userIDList: s.userIDList.filter((v) => v !== uid),
                }));
              }}
            />
          </View>
          <View py={2} style={styles.divider}>
            <Divider />
          </View>
          <View pt={1}>
            <Text
              variants="small"
              textAlign="center"
              lineHeight={20}
              color="secondaryLight"
            >
              カテゴリー{"\n"}※1つのみ選択可能
            </Text>
          </View>
          <InputCategory
            categoryID={state.categoryID}
            onPress={(categoryID) => {
              if (state.categoryID === categoryID) {
                setState((s) => ({
                  ...s,
                  categoryID: 0,
                }));
              } else {
                setState((s) => ({
                  ...s,
                  categoryID,
                }));
              }
            }}
          />
          <View py={2} style={styles.divider}>
            <Divider />
          </View>
          <View pt={2} pb={2}>
            <View>
              <Text variants="small" textAlign="center" color="secondaryLight">
                Good / Bad
              </Text>
            </View>
            <View py={2}>
              <Compatibility
                like={state.like}
                dislike={state.dislike}
                opacity
                onLike={() =>
                  setState((s) => ({
                    ...s,
                    like: !s.like,
                  }))
                }
                onDislike={() =>
                  setState((s) => ({
                    ...s,
                    dislike: !s.dislike,
                  }))
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.actionContainer}>
        <View style={styles.action}>
          <Button
            title="検索"
            size="lg"
            disabled={state.userIDList.length === 0 || error}
            onPress={() => props.onSearch(state)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
    height: "100%",
  },
  inner: {
    alignItems: "center",
    width: "100%",
    marginBottom: theme().space(6),
  },
  divider: {
    width: "80%",
  },
  actionContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: theme().space(3),
  },

  action: {
    width: "80%",
  },
});

export default memo(Page);

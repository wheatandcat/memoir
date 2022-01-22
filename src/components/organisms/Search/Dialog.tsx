import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Divider from 'components/atoms/Divider';
import InputUsers from 'components/organisms/Search/Input/InputUsers';
import theme from 'config/theme';
import { User } from 'queries/api/index';
import Compatibility from 'components/organisms/Compatibility/Compatibility';
import Button from 'components/atoms/Button';
import InputDate, {
  Props as InputDateProps,
} from 'components/organisms/Search/Input/InputDate';
import InputCategory from 'components/organisms/Search/Input/InputCategory';
import dayjs from 'lib/dayjs';

export type Props = {
  users: Pick<User, 'id' | 'image'>[];
};

type State = {
  startDate: InputDateProps['startDate'];
  endDate: InputDateProps['endDate'];
  userIDList: string[];
};

const initialState = (): State => ({
  startDate: new Date(
    dayjs().add(-6, 'day').format('YYYY-MM-DDT00:00:00+09:00')
  ),
  endDate: new Date(dayjs().format('YYYY-MM-DDT00:00:00+09:00')),
  userIDList: [],
});

const Dialog: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());

  return (
    <View style={styles.root}>
      <View pt={3}>
        <Text variants="small" color="secondaryLight">
          日付
        </Text>
      </View>
      <InputDate
        startDate={state.startDate}
        endDate={state.endDate}
        onChangeStartDate={(startDate) => {
          setState((s) => ({ ...s, startDate }));
        }}
        onChangeEndDate={(endDate) => {
          setState((s) => ({ ...s, endDate }));
        }}
      />
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
      <View py={1}>
        <Text
          variants="small"
          textAlign="center"
          lineHeight={20}
          color="secondaryLight"
        >
          カテゴリー{'\n'}※1つのみ選択可能
        </Text>
      </View>
      <InputCategory />
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
            like={false}
            dislike={false}
            opacity
            onLike={() => null}
            onDislike={() => null}
          />
        </View>
      </View>
      <View mx={3} mt={4} style={styles.action}>
        <Button title="検索" size="lg" onPress={() => null} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  divider: {
    width: '80%',
  },
  action: {
    width: '80%',
  },
});

export default memo(Dialog);

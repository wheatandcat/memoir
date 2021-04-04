import React, { memo, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  ViewStyle,
  View as RNView,
  TouchableOpacity,
} from 'react-native';
import theme from 'config/theme';
import IconButton from 'components/molecules/IconButton';
import RNModal from 'react-native-modal';
import { FontColor } from 'lib/styledSystem/styleFontColor';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Divider from 'components/atoms/Divider';

export type Item = {
  text: string;
  color: FontColor;
  onPress: (callback?: () => void) => void;
  removeMenu: boolean;
};

type Props = {
  items: Item[];
};

type State = { viewX: number; viewY: number };

const Menu: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState<number | null>(null);
  const [state, setState] = useState<State>({ viewX: 0, viewY: 0 });
  const viewRef = useRef<RNView>(null);

  const onLayout = useCallback(() => {
    viewRef.current?.measureInWindow((x, y) => {
      setState({
        viewY: y || 0,
        viewX: x || 0,
      });
    });
  }, []);

  const onPress = useCallback((item: Item, index: number) => {
    if (item.removeMenu) {
      setKey(index);
      setOpen(false);
    } else {
      item.onPress(() => setOpen(false));
    }
  }, []);

  const onModalHide = useCallback(() => {
    if (key === null) {
      return;
    }

    props.items[key].onPress();
  }, [props, key]);

  const style: ViewStyle = {
    top: state.viewY + 20,
    right: 0,
  };

  const onOpen = useCallback(() => {
    setKey(null);
    setOpen(!open);
  }, [open]);

  return (
    <>
      <RNView style={styles.menu} ref={viewRef} onLayout={onLayout}>
        <IconButton name="more-horiz" size="base" onPress={onOpen} />
        <RNModal
          isVisible={open}
          onBackdropPress={() => setOpen(!open)}
          animationIn="fadeInRight"
          animationOut="fadeOutRight"
          backdropOpacity={0}
          animationOutTiming={100}
          onModalHide={onModalHide}
        >
          <View style={[style, styles.menuItem]}>
            {props.items.map((item, index) => (
              <View key={item.text}>
                <TouchableOpacity onPress={() => onPress(item, index)}>
                  <View p={3}>
                    <Text color={item.color}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
                {index < props.items.length - 1 && <Divider />}
              </View>
            ))}
          </View>
        </RNModal>
      </RNView>
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'relative',
    zIndex: 1,
  },
  menuItem: {
    position: 'absolute',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.secondary.main,
    backgroundColor: theme().color.background.light,
    width: 200,
    borderRadius: 5,
  },
});

export default memo(Menu);

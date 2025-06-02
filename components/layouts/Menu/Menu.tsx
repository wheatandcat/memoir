import Divider from "@/components/elements/Divider";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import IconButton from "@/components/layouts/IconButton";
import theme from "@/config/theme";
import type { FontColor } from "@/lib/styledSystem/styleFontColor";
import type { FC } from "react";
import React, { memo, useCallback, useRef, useState } from "react";
import type { ViewStyle } from "react-native";
import {
  Modal,
  View as RNView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

export type Item = {
  text: string;
  color: FontColor;
  testID?: string;
  onPress: (callback?: () => void) => void;
  removeMenu: boolean;
};

export type Props = {
  items: Item[];
};

type State = { viewX: number; viewY: number };

const Menu: FC<Props> = (props) => {
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
        <IconButton
          name="more-horiz"
          size="base"
          onPress={onOpen}
          testID="menu"
        />
        <Modal
          visible={open}
          transparent
          onRequestClose={() => {
            setOpen(!open);
          }}
          animationType="fade"
          onDismiss={onModalHide}
          testID="menu_modal"
        >
          {/* full‑screen overlay: tap to close */}
          <TouchableWithoutFeedback onPress={() => setOpen(false)}>
            <View style={styles.overlay}>
              {/* inner wrapper prevents overlay press when tapping the menu */}
              <TouchableWithoutFeedback>
                <View style={[style, styles.menuItem]}>
                  {props.items.map((item, index) => (
                    <View key={item.text}>
                      <TouchableOpacity
                        onPress={() => onPress(item, index)}
                        testID={item.testID}
                      >
                        <View p={3}>
                          <Text color={item.color}>{item.text}</Text>
                        </View>
                      </TouchableOpacity>
                      {index < props.items.length - 1 && <Divider />}
                    </View>
                  ))}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </RNView>
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "relative",
    zIndex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
  },
  menuItem: {
    position: "absolute",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.secondary.main,
    backgroundColor: theme().color.background.light,
    width: 200,
    borderRadius: 5,
  },
});

export default memo(Menu);

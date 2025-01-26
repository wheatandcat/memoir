import View from "@/components/elements/View";
import UserImage from "@/components/layouts/User/Image";
import type { User } from "@/queries/api/index";
import type { FC } from "react";
import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export type Props = {
  user: Pick<User, "id" | "image">;
  selected: boolean;
  onAdd: (id: User["id"]) => void;
  onRemove: (id: User["id"]) => void;
  size?: number;
};

const Users: FC<Props> = ({ size = 70, ...props }) => {
  if (props.selected) {
    return (
      <View m={2}>
        <TouchableOpacity onPress={() => props.onRemove(props.user.id)}>
          <UserImage size={size} image={props.user.image} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View m={2} style={styles.clear}>
      <TouchableOpacity onPress={() => props.onAdd(props.user.id)}>
        <UserImage size={size} image={props.user.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  clear: {
    opacity: 0.4,
  },
});

export default memo(Users);

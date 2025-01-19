import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import { type FC, memo } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  year: string;
  years: number[];
  onPress: (year: number) => void;
};

const YearInput: FC<Props> = (props) => {
  return (
    <ScrollView horizontal={true}>
      <View style={styles.years}>
        {props.years.map((year) => (
          <TouchableOpacity key={year} onPress={() => props.onPress(year)}>
            <View style={styles.yearItem}>
              <Text
                color={String(year) === props.year ? "primary" : "secondary"}
              >
                {year}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default memo(YearInput);

const styles = StyleSheet.create({
  years: {
    flexDirection: "row",
  },
  yearItem: {
    paddingRight: theme().space(2),
  },
});

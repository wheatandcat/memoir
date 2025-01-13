import { memo, type FC } from "react";
import {
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Platform,
} from "react-native";
import type { ConnectedType } from "@/src/components/pages/Top/Connected";
import View from "@/components/elements/View";
import Text from "@/components/elements/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "config/theme";
import Form, { type Props as FormProps } from "@/components/layouts/Login/Form";
import { StatusBar } from "expo-status-bar";
import Image from "@/components/elements/Image";
import Loading from "@/components/layouts/Overlay/Loading";

export type Props = ConnectedType & FormProps & {};

const Page: FC<Props> = (props) => {
	return (
		<>
			<View style={styles.root}>
				<StatusBar backgroundColor={theme().color.primary.main} style="dark" />
				<SafeAreaView>
					<View style={styles.inner}>
						<ImageBackground
							source={require("@/src/img/common/frame.png")}
							resizeMode="cover"
							style={styles.image}
						>
							<View style={styles.title}>
								<View>
									<Image
										source={require("@/src/img/common/logo.png")}
										width={384 / 2}
										height={84 / 2}
									/>
								</View>

								<View style={styles.skip}>
									<TouchableOpacity onPress={props.onSkip}>
										<Text
											variants="small"
											style={styles.skipText}
											fontFamily="NotoSansJP-Bold"
											underline
										>
											スキップ
										</Text>
									</TouchableOpacity>
								</View>
							</View>

							<View style={styles.contents}>
								<View style={styles.contentsTitle}>
									<View style={styles.divider} />
									<View>
										<Text variants="small">新規登録</Text>
									</View>
									<View style={styles.divider} />
								</View>
								<View style={styles.signed}>
									<Form
										onAppleLogin={props.onAppleLogin}
										onGoogleLogin={props.onGoogleLogin}
									/>
								</View>
								<View style={styles.footer}>
									<View style={styles.login}>
										<Text variants="small">すでにアカウントをお持ちの方</Text>
									</View>
									<View style={styles.loginText}>
										<TouchableOpacity onPress={props.onLogin}>
											<Text
												color="primary"
												fontFamily="NotoSansJP-Bold"
												underline
											>
												ログイン
											</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</ImageBackground>
					</View>
				</SafeAreaView>
				{props.loading && <Loading text="ログイン中" />}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	root: {
		height: "100%",
		backgroundColor: theme().color.primary.main,
	},
	inner: {
		height: "100%",
		backgroundColor: theme().color.background.light,
	},
	image: {
		flex: 1,
		justifyContent: "center",
	},
	skip: {
		position: "absolute",
		top: theme().space(3),
		right: theme().space(3),
	},
	skipText: {
		textDecorationLine: "underline",
	},
	title: {
		height: "40%",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	contents: {
		height: "60%",
		width: "100%",
		backgroundColor: theme().color.background.light,
	},
	contentsTitle: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 80,
	},
	divider: {
		width: "30%",
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: theme().color.base.main,
		marginHorizontal: theme().space(4),
	},
	signed: {
		paddingTop: theme().space(3),
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	footer: {
		alignItems: "flex-end",
		justifyContent: "space-between",
		flexDirection: "row",
		flex: 1,
		bottom: theme().space(3),
		paddingHorizontal: theme().space(3),
		paddingTop: theme().space(3),
	},
	login: {
		bottom: theme().space(1),
	},
	loginText: {
		top: Platform.OS === "ios" ? 0 : theme().space(2) + 3,
	},
});

export default memo(Page);

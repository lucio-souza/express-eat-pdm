import { Image, ImageComponent, View } from "react-native";
import { style } from "./style";

export function Logo() {
  return (
    <View style={style.container}>
      <Image
        style={style.image}
        source={require("./../../../assets/logo.png")}
      />
    </View>
  )
}
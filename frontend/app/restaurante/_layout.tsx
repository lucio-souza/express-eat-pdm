import FooterMenu from "../../components/footerMenu";
import { View,Text } from "react-native";
import {  } from "expo-router";
import { StyleSheet } from "react-native";


const Restaurante = () => {
    
    return (
        <View>
            <Text style={styles.container}>Restaurante ID: </Text>
            <FooterMenu />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 160,
        height: 2200,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Restaurante;
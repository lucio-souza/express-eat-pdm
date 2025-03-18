import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FooterMenu = () => {

    const router = useRouter();
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.footerItem} onPress={() => router.replace('/home')}>
                <Ionicons name="home" size={24} color="#000" />
                <Text style={styles.footerText}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerItem} onPress={() => router.replace('/pedidos')}>
                <Ionicons name="document" size={24} color="#000" />
                <Text style={styles.footerText}>pedidos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerItem} onPress={() => router.replace('/perfil')}>
                <Ionicons name="person" size={24} color="#000" />
                <Text style={styles.footerText}>Perfil</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    footerItem: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        marginTop: 4,
    },
});

export default FooterMenu;
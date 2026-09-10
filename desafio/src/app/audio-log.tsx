import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AudioLog() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bitacora</Text>
            <Text style={styles.subtitle}>
                Registro de los productos
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F8FAFC',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
    },
});
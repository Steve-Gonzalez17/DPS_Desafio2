import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Map() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mapa de recepciones</Text>
            <Text style={styles.subtitle}>
                Aquí se mostrarán las ubicaciones de las mercancías recibidas.            
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
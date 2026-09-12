import { SectionList, StyleSheet, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuditLogItem } from "../components/AudioLogItem";
import { useAudit } from "../context/AudioContext";

export default function AuditLogScreen() {
    const { entries } = useAudit();

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.eyebrow}>
                    TRAZABILIDAD
                </Text>

                <Text style={styles.heading}>
                    Bitácora de entradas
                </Text>

                <Text style={styles.summary}>
                    {entries.length} evento
                    {entries.length === 1 ? "" : "s"} registrado
                    {entries.length === 1 ? "" : "s"} en esta sesión
                </Text>
            </View>

            {entries.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyIcon}>
                        ◷
                    </Text>

                    <Text style={styles.emptyTitle}>
                        Aún no hay recepciones
                    </Text>

                    <Text style={styles.emptyText}>
                        Escanea un paquete y confirma su
                        recepción para crear un registro
                        georreferenciado.
                    </Text>
                </View>
            ) : (
                <SectionList
                    sections={[
                        {
                            title: "Recepciones recientes",
                            data: entries,
                        },
                    ]}
                    keyExtractor={(entry) => entry.id}
                    renderItem={({ item }) => (
                        <AuditLogItem entry={item} />
                    )}
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.section}>
                            {section.title}
                        </Text>
                    )}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F3F3E0",
    },

    header: {
        padding: 20,
        paddingTop: 18,
    },

    eyebrow: {
        fontSize: 11,
        color: "#608BC1",
        fontWeight: "800",
        letterSpacing: 1,
    },

    heading: {
        fontSize: 27,
        fontWeight: "800",
        color: "#133E87",
        marginTop: 4,
    },

    summary: {
        fontSize: 14,
        color: "#608BC1",
        marginTop: 4,
    },

    list: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    section: {
        fontSize: 13,
        fontWeight: "800",
        color: "#608BC1",
        marginVertical: 12,
        textTransform: "uppercase",
    },

    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
    },

    emptyIcon: {
        fontSize: 64,
        color: "#99B9D8",
    },

    emptyTitle: {
        fontWeight: "800",
        fontSize: 19,
        color: "#133E87",
        marginTop: 14,
    },

    emptyText: {
        textAlign: "center",
        color: "#608BC1",
        lineHeight: 20,
        marginTop: 8,
    },
});

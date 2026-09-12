import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, StyleSheet } from "react-native";

export function SearchBar({
    value,
    onChangeText,
}: {
    value: string;
    onChangeText: (value: string) => void;
}) {
    return (
        <View style={styles.box}>
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Buscar producto"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    box: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 48,
    },
    input: { flex: 1, fontSize: 15, color: "#111827" },
});

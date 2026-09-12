import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LocationMap } from "@/components/LocationMap";
import { useAudit } from "@/context/AudioContext";

export default function MapScreen() {
    const { entries } = useAudit();
    return (
        <SafeAreaView style={styles.page}>
            <LocationMap entries={entries} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1
    }
});

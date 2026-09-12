import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";

import {
    useAudioPlayer,
    useAudioPlayerStatus,
} from "expo-audio";

import { AuditEntry } from "@/types/AudioEntry";

interface AuditLogItemProps {
    entry: AuditEntry;
    onPress?: () => void;
}

export function AuditLogItem({
    entry,
    onPress,
}: AuditLogItemProps) {

    const received =
        entry.actionType === "STOCK_RECEIPT";

    const player = useAudioPlayer(
        entry.audioNoteUrl
            ? entry.audioNoteUrl
            : null
    );

    const status = useAudioPlayerStatus(player);

    const handleAudioPress = () => {
        if (!entry.audioNoteUrl) {
            return;
        }

        if (status.playing) {
            player.pause();
            return;
        }

        if (status.currentTime >= status.duration) {
            player.seekTo(0);
        }

        player.play();
    };


    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.8}
        >

            <View
                style={[
                    styles.iconContainer,
                    {
                        backgroundColor: received
                            ? "#CBDCEB"
                            : "#F3F3E0",
                    },
                ]}
            >
                <Ionicons
                    name={
                        received
                            ? "checkmark-circle"
                            : "alert-circle"
                    }
                    size={22}
                    color={
                        received
                            ? "#133E87"
                            : "#608BC1"
                    }
                />
            </View>


            <View style={styles.info}>

                <Text style={styles.productTitle}>
                    {entry.productTitle}
                </Text>

                <View style={styles.detailRow}>

                    <Ionicons
                        name="document-text-outline"
                        size={14}
                        color="#608BC1"
                    />

                    <Text style={styles.detailText}>
                        {received
                            ? "Recepción de mercancía"
                            : entry.actionType === "AUDIT_CHECK"
                                ? "Auditoría"
                                : "Incidencia"}
                    </Text>

                </View>

                {/* FECHA */}

                <View style={styles.detailRow}>

                    <Ionicons
                        name="time-outline"
                        size={14}
                        color="#608BC1"
                    />

                    <Text style={styles.detailText}>
                        {new Date(
                            entry.timestamp
                        ).toLocaleString()}
                    </Text>

                </View>

                {/* UBICACIÓN */}

                <View style={styles.locationContainer}>

                    <Ionicons
                        name="location-outline"
                        size={14}
                        color="#133E87"
                    />

                    <Text style={styles.locationText}>
                        {entry.location.latitude.toFixed(5)},{" "}
                        {entry.location.longitude.toFixed(5)}
                    </Text>

                </View>

            </View>

            {/* AUDIO */}

            {entry.audioNoteUrl && (

                <TouchableOpacity
                    style={[
                        styles.audioContainer,
                        status.playing &&
                        styles.audioContainerPlaying,
                    ]}
                    onPress={handleAudioPress}
                >

                    <Ionicons
                        name={
                            status.playing
                                ? "pause"
                                : "play"
                        }
                        size={18}
                        color="#133E87"
                    />

                </TouchableOpacity>

            )}

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,

        flexDirection: "row",
        alignItems: "flex-start",

        shadowColor: "#133E87",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        elevation: 3,
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 21,

        alignItems: "center",
        justifyContent: "center",

        marginRight: 12,
    },

    info: {
        flex: 1,
    },

    productTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#133E87",
        marginBottom: 7,
    },

    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        gap: 5,
    },

    detailText: {
        fontSize: 12,
        color: "#608BC1",
    },

    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        gap: 5,
    },

    locationText: {
        fontSize: 11,
        color: "#133E87",
        fontWeight: "600",
    },

    audioContainer: {
        width: 38,
        height: 38,
        borderRadius: 19,

        backgroundColor: "#CBDCEB",

        alignItems: "center",
        justifyContent: "center",

        marginLeft: 8,
    },

    audioContainerPlaying: {
        backgroundColor: "#99B9D4",
    },
});

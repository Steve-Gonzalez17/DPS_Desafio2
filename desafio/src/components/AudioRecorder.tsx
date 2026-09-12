import { useState } from "react";
import {  View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import { AudioModule, RecordingPresets, useAudioRecorder, useAudioRecorderState,} from "expo-audio";

interface AudioRecorderProps {
    onRecorded: (uri: string) => void;
}

export const AudioRecorderComponent = ({
    onRecorded,
}: AudioRecorderProps) => {
    const recorder = useAudioRecorder(
        RecordingPresets.HIGH_QUALITY
    );

    const recorderState =
        useAudioRecorderState(recorder);

    const [audioUri, setAudioUri] = useState<string | null>(
        null
    );

    const toggleRecording = async () => {
        if (!recorderState.isRecording) {
            const { granted } = await AudioModule.requestRecordingPermissionsAsync();

            if (!granted) {
                Alert.alert(
                    "Permiso requerido",
                    "Necesitas permitir el acceso al micrófono."
                );
                return;
            }

            try {
                await recorder.prepareToRecordAsync();
                recorder.record();
                setAudioUri(null);
            } catch (error) {
                Alert.alert(
                    "Error",
                    "No se pudo iniciar la grabación."
                );
            }
            return;
        }

        try {
            await recorder.stop();
            const uri = recorder.uri;
            if (uri) {
                setAudioUri(uri);
                onRecorded(uri);
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "No se pudo detener la grabación."
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Observación de la carga
            </Text>

            <Text style={styles.description}>
                Graba una nota de voz sobre el estado de la mercancía.
            </Text>

            <TouchableOpacity
                style={[
                    styles.button,
                    recorderState.isRecording &&
                    styles.recordingButton,
                ]}
                onPress={toggleRecording}
            >
                <Text style={styles.buttonText}>
                    {recorderState.isRecording
                        ? "Detener grabación"
                        : "Grabar observación"}
                </Text>
            </TouchableOpacity>

            {audioUri && (
                <Text style={styles.audioReady}>
                    ✓ Audio grabado correctamente
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#CBDCEB",
        borderRadius: 16,
        padding: 16,
    },

    heading: {
        fontSize: 18,
        fontWeight: "700",
        color: "#133E87",
        marginBottom: 6,
    },

    description: {
        fontSize: 13,
        color: "#608BC1",
        marginBottom: 14,
    },

    button: {
        backgroundColor: "#133E87",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    recordingButton: {
        backgroundColor: "#608BC1",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

    audioReady: {
        marginTop: 10,
        textAlign: "center",
        color: "#133E87",
        fontSize: 13,
        fontWeight: "600",
    },
});

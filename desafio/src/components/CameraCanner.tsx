import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    CameraView,
    useCameraPermissions,
} from "expo-camera";

interface CameraScannerProps {
    onScanned: (data: string, type: string) => void;
    onClose?: () => void;
}

export default function CameraScanner({
    onScanned,
    onClose,
}: CameraScannerProps) {
    const [permission, requestPermission] =
        useCameraPermissions();

    const [scanned, setScanned] = useState(false);
    const [torch, setTorch] = useState(false);

    if (!permission) {
        return (
            <View style={styles.center}>
                <Text style={styles.loadingText}>
                    Cargando cámara...
                </Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionTitle}>
                    Acceso a la cámara
                </Text>

                <Text style={styles.permissionText}>
                    Necesitamos utilizar la cámara para
                    escanear códigos QR y códigos de barras.
                </Text>

                <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={requestPermission}
                >
                    <Text style={styles.permissionButtonText}>
                        Permitir cámara
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarcodeScanned = ({
        type,
        data,
    }: {
        type: string;
        data: string;
    }) => {
        if (scanned) {
            return;
        }

        setScanned(true);

        console.log("Código:", data);
        console.log("Tipo:", type);

        // Mandamos el resultado a la pantalla
        onScanned(data, type);
    };

    const handleScanAgain = () => {
        setScanned(false);
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                enableTorch={torch}
                barcodeScannerSettings={{
                    barcodeTypes: [
                        // QR
                        "qr",

                        // Códigos de productos
                        "ean13",
                        "ean8",
                        "upc_a",
                        "upc_e",

                        // Otros códigos
                        "code128",
                        "code39",
                        "code93",
                        "codabar",
                        "itf14",
                    ],
                }}
                onBarcodeScanned={
                    scanned
                        ? undefined
                        : handleBarcodeScanned
                }
            />

            {/* ======================================
          INTERFAZ
      ====================================== */}

            <View style={styles.overlay}>

                {/* HEADER */}
                <View style={styles.header}>
                    {onClose && (
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <Text style={styles.closeText}>
                                ×
                            </Text>
                        </TouchableOpacity>
                    )}

                    <Text style={styles.title}>
                        Escanear código
                    </Text>

                    <Text style={styles.subtitle}>
                        Coloca el código dentro del recuadro
                    </Text>
                </View>

                {/* ==================================
            ÁREA DEL SCANNER
        ================================== */}

                <View style={styles.scannerArea}>
                    <View style={styles.scanBox}>

                        {/* Esquina superior izquierda */}
                        <View
                            style={[
                                styles.corner,
                                styles.topLeft,
                            ]}
                        />

                        {/* Esquina superior derecha */}
                        <View
                            style={[
                                styles.corner,
                                styles.topRight,
                            ]}
                        />

                        {/* Esquina inferior izquierda */}
                        <View
                            style={[
                                styles.corner,
                                styles.bottomLeft,
                            ]}
                        />

                        {/* Esquina inferior derecha */}
                        <View
                            style={[
                                styles.corner,
                                styles.bottomRight,
                            ]}
                        />

                        {/* Línea */}
                        {!scanned && (
                            <View style={styles.scanLine} />
                        )}
                    </View>
                </View>

                <View style={styles.controls}>

                    {/* Linterna */}
                    <TouchableOpacity
                        style={styles.torchButton}
                        onPress={() =>
                            setTorch((current) => !current)
                        }
                    >
                        <Text style={styles.torchText}>
                            {torch
                                ? "Apagar linterna"
                                : "Encender linterna"}
                        </Text>
                    </TouchableOpacity>

                    {/* Escanear nuevamente */}
                    {scanned && (
                        <TouchableOpacity
                            style={styles.scanAgainButton}
                            onPress={handleScanAgain}
                        >
                            <Text style={styles.scanAgainText}>
                                Escanear nuevamente
                            </Text>
                        </TouchableOpacity>
                    )}

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#000",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },

    loadingText: {
        color: "#fff",
        fontSize: 16,
    },

    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        backgroundColor: "#fff",
    },

    permissionTitle: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 15,
    },

    permissionText: {
        textAlign: "center",
        fontSize: 16,
        lineHeight: 24,
        color: "#666",
        marginBottom: 30,
    },

    permissionButton: {
        backgroundColor: "#2563eb",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },

    permissionButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "transparent",
    },

    header: {
        alignItems: "center",
        paddingTop: 70,
        paddingHorizontal: 20,
    },

    title: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "700",
    },

    subtitle: {
        color: "#ddd",
        fontSize: 15,
        marginTop: 8,
    },

    closeButton: {
        position: "absolute",
        left: 20,
        top: 60,

        width: 42,
        height: 42,

        borderRadius: 21,

        backgroundColor:
            "rgba(0, 0, 0, 0.6)",

        justifyContent: "center",
        alignItems: "center",
    },

    closeText: {
        color: "#fff",
        fontSize: 30,
        lineHeight: 32,
    },

    scannerArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    scanBox: {
        width: 290,
        height: 190,
        position: "relative",
    },

    corner: {
        position: "absolute",
        width: 35,
        height: 35,
        borderColor: "#22c55e",
    },

    topLeft: {
        top: 0,
        left: 0,
        borderTopWidth: 4,
        borderLeftWidth: 4,
    },

    topRight: {
        top: 0,
        right: 0,
        borderTopWidth: 4,
        borderRightWidth: 4,
    },

    bottomLeft: {
        bottom: 0,
        left: 0,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
    },

    bottomRight: {
        bottom: 0,
        right: 0,
        borderBottomWidth: 4,
        borderRightWidth: 4,
    },

    // ==========================================
    // LÍNEA DE ESCANEO
    // ==========================================

    scanLine: {
        position: "absolute",

        left: 10,
        right: 10,

        top: "50%",

        height: 2,

        backgroundColor: "#22c55e",
    },

    // ==========================================
    // CONTROLES
    // ==========================================

    controls: {
        alignItems: "center",
        paddingBottom: 50,
    },

    torchButton: {
        backgroundColor:
            "rgba(0, 0, 0, 0.7)",

        paddingHorizontal: 20,
        paddingVertical: 12,

        borderRadius: 25,

        marginBottom: 15,
    },

    torchText: {
        color: "#fff",
        fontSize: 15,
    },

    scanAgainButton: {
        backgroundColor: "#2563eb",

        paddingHorizontal: 25,
        paddingVertical: 14,

        borderRadius: 10,
    },

    scanAgainText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";

import { router } from "expo-router";
import * as Location from "expo-location";

import CameraScanner from "../components/CameraCanner";
import { AudioRecorderComponent } from "@/components/AudioRecorder";
import { products } from "@/data/product";
import { Product } from "../types/Product";
import { useAudit } from "@/context/AudioContext";

export default function ScannerScreen() {
    const [product, setProduct] = useState<Product | null>(null);
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const { addEntry } = useAudit();

    const handleScanned = (
        data: string,
        type: string
    ) => {
        console.log("Código:", data);
        console.log("Tipo:", type);

        const foundProduct = products.find(
            (item) => item.barcode === data
        );

        if (!foundProduct) {
            Alert.alert(
                "Producto no encontrado",
                `No existe un producto con el código:\n\n${data}`
            );

            return;
        }

        setProduct(foundProduct);
        setAudioUri(null);
    };

    const handleConfirmReception = async () => {
        if (!product) return;

        try {
            setSaving(true);

            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                Alert.alert(
                    "Ubicación requerida",
                    "Necesitamos acceder a tu ubicación para registrar la recepción."
                );

                setSaving(false);
                return;
            }

            const location =
                await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

            const entry = {
                id: Date.now().toString(),
                productId: product.id,
                productTitle: product.title,
                timestamp: new Date().toISOString(),
                actionType: "STOCK_RECEIPT" as const,
                audioNoteUrl: audioUri ?? undefined,
                location: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
            };

            // Guardar en el contexto
            addEntry(entry);

            console.log(
                "Recepción registrada:",
                entry
            );

            Alert.alert(
                "Recepción confirmada",
                "La mercancía se registró correctamente."
            );

            setProduct(null);
            setAudioUri(null);

        } catch (error) {
            console.error(
                "Error registrando recepción:",
                error
            );

            Alert.alert(
                "Error",
                "No se pudo registrar la recepción."
            );

        } finally {
            setSaving(false);
        }
    };

    if (product) {
        return (
            <ScrollView
                style={styles.background}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Recepción de mercancía
                    </Text>

                    <Text style={styles.headerSubtitle}>
                        Producto escaneado correctamente
                    </Text>
                </View>

                <View style={styles.productCard}>

                    <Image
                        source={{
                            uri: product.imageUrl,
                        }}
                        style={styles.productImage}
                    />

                    <View style={styles.productInfo}>

                        <Text style={styles.productName}>
                            {product.title}
                        </Text>

                        <View style={styles.categoryContainer}>
                            <Text style={styles.category}>
                                {product.category}
                            </Text>
                        </View>

                        <View style={styles.dataRow}>
                            <Text style={styles.label}>
                                Código
                            </Text>

                            <Text style={styles.value}>
                                {product.barcode}
                            </Text>
                        </View>

                        <View style={styles.dataRow}>
                            <Text style={styles.label}>
                                Stock esperado
                            </Text>

                            <Text style={styles.stock}>
                                {product.expectedStock}
                            </Text>
                        </View>

                        <View style={styles.dataRow}>
                            <Text style={styles.label}>
                                Precio unitario
                            </Text>

                            <Text style={styles.value}>
                                ${product.unitPrice.toFixed(2)}
                            </Text>
                        </View>

                    </View>
                </View>


                <View style={styles.audioContainer}>

                    <Text style={styles.audioTitle}>
                        Observación de la carga
                    </Text>

                    {/* <Text style={styles.audioDescription}>
                        Puedes grabar una nota de voz sobre el estado
                        de la mercancía recibida.
                    </Text> */}

                    <AudioRecorderComponent
                        onRecorded={(uri) => {
                            setAudioUri(uri);

                            console.log(
                                "Audio de la recepción:",
                                uri
                            );
                        }}
                    />

                </View>

                
                <TouchableOpacity
                    style={[
                        styles.auditButton,
                        saving && styles.disabledButton,
                    ]}
                    onPress={handleConfirmReception}
                    disabled={saving}
                >

                    <Text style={styles.auditButtonText}>
                        {saving
                            ? "Registrando recepción..."
                            : "Confirmar recepción"}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.scanButton}
                    onPress={() => {
                        setProduct(null);
                        setAudioUri(null);
                    }}
                    disabled={saving}
                >

                    <Text style={styles.scanButtonText}>
                        Escanear otro producto
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    disabled={saving}
                >

                    <Text style={styles.backButtonText}>
                        Volver
                    </Text>

                </TouchableOpacity>

            </ScrollView>
        );
    }

    return (
        <CameraScanner
            onScanned={handleScanned}
            onClose={() => router.back()}
        />
    );
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: "#F3F3E0",
    },

    container: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        marginBottom: 20,
    },

    headerTitle: {
        fontSize: 26,
        fontWeight: "800",
        color: "#133E87",
        marginBottom: 5,
    },

    headerSubtitle: {
        fontSize: 14,
        color: "#608BC1",
    },

    productCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        overflow: "hidden",
        marginBottom: 18,

        shadowColor: "#133E87",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
    },

    productImage: {
        width: "100%",
        height: 200,
        backgroundColor: "#CBDCEB",
    },

    productInfo: {
        padding: 18,
    },

    productName: {
        fontSize: 22,
        fontWeight: "800",
        color: "#133E87",
        marginBottom: 10,
    },

    categoryContainer: {
        alignSelf: "flex-start",
        backgroundColor: "#CBDCEB",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginBottom: 12,
    },

    category: {
        color: "#133E87",
        fontSize: 13,
        fontWeight: "700",
    },

    dataRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        borderTopWidth: 1,
        borderTopColor: "#CBDCEB",

        paddingVertical: 12,
    },

    label: {
        fontSize: 14,
        color: "#608BC1",
    },

    value: {
        fontSize: 14,
        fontWeight: "700",
        color: "#133E87",
    },

    stock: {
        fontSize: 18,
        fontWeight: "800",
        color: "#608BC1",
    },

    audioContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,

        shadowColor: "#133E87",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },

    audioTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: "#133E87",
        marginBottom: 5,
    },

    audioDescription: {
        fontSize: 13,
        color: "#608BC1",
        marginBottom: 12,
        lineHeight: 18,
    },

    auditButton: {
        backgroundColor: "#133E87",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 5,
        marginBottom: 12,

        shadowColor: "#133E87",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },

    disabledButton: {
        backgroundColor: "#94A3B8",
    },

    auditButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "800",
    },

    scanButton: {
        backgroundColor: "#608BC1",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 10,
    },

    scanButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

    backButton: {
        paddingVertical: 12,
        alignItems: "center",
    },

    backButtonText: {
        color: "#133E87",
        fontSize: 15,
        fontWeight: "700",
    },
});

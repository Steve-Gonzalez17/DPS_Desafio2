import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";

type LocationMapProps = {
    entries: any[];
};

export default function LocationMap({
    entries,
}: LocationMapProps) {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                mapType="none"
                initialRegion={{
                    latitude: 13.6929,
                    longitude: -89.2182,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {/* OPENSTREETMAP */}
                <UrlTile
                    urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                    tileSize={256}
                    flipY={false}
                />

                {/* MARCADORES */}
                {entries.map((entry) => (
                    <Marker
                        key={entry.id}
                        coordinate={{
                            latitude: Number(entry.latitude),
                            longitude: Number(entry.longitude),
                        }}
                        title={entry.title}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 400,
    },

    map: {
        flex: 1,
    },
});

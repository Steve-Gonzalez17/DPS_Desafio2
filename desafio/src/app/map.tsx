import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { UrlTile } from "react-native-maps";

type Entry = {
    id: string | number;
    latitude: number;
    longitude: number;
    title?: string;
};

type LocationMapProps = {
    entries: Entry[];
};

export default function LocationMap({
    entries,
}: LocationMapProps) {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 13.6929,
                    longitude: -89.2182,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                <UrlTile
                    urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                    tileSize={256}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        flex: 1,
    },
});

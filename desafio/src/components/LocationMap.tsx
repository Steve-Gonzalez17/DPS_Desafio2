import React from "react";
import { StyleSheet, View, Platform, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { WebView } from "react-native-webview";
import { AuditEntry } from "@/types/AudioEntry";

export function LocationMap({ entries }: { entries: AuditEntry[] }) {
  if (!entries.length) {
    return (
      <View style={styles.empty}>
        <Text>Sin Ubicaciones Registradas.</Text>
      </View>
    );
  }

  const first = entries[0].location;

  if (Platform.OS === "android") {
    return <AndroidWebMap entries={entries} center={first} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType="standard"
        initialRegion={{
          latitude: 13.6929,
          longitude: -89.2182,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {entries.map((entry) => (
          <Marker
            key={entry.id}
            coordinate={entry.location}
            title={entry.productTitle}
            description={new Date(entry.timestamp).toLocaleString()}
            pinColor={entry.actionType === "INCIDENCE" ? "#c92a2a" : "#087f5b"}
          />
        ))}
      </MapView>
    </View>
  );
}

function AndroidWebMap({
  entries,
  center,
}: {
  entries: AuditEntry[];
  center: AuditEntry["location"];
}) {
  // marcadores
  const markers = entries.map(({ productTitle, timestamp, location }) => ({
    title: productTitle,
    time: new Date(timestamp).toLocaleDateString(),
    ...location,
  }));
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        >

        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        >

        <style>
          html,
          body,
          #map {
            height: 100%;
            margin: 0;
            background: #e7eef0;
          }

          .leaflet-control-attribution {
            font-size: 9px;
          }
        </style>
      </head>

      <body>
        <div id="map"></div>

        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

        <script>
          const center = ${JSON.stringify(center)};
          const entries = ${JSON.stringify(markers)};

          const map = L.map('map').setView(
            [center.latitude, center.longitude],
            14
          );

          L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              maxZoom: 19,
              attribution: '© OpenStreetMap contributors'
            }
          ).addTo(map);

          entries.forEach((e) => {
            L.marker([e.latitude, e.longitude])
              .addTo(map)
              .bindPopup(
                '<b>' + e.title + '</b><br>' + e.time
              );
          });
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html }}
      javaScriptEnabled
      domStorageEnabled
      style={styles.map}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //minHeight: 400,
  },

  map: {
    flex: 1,
  },

  empty:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import { Ionicons } from "@expo/vector-icons";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "@/data/product";

export function SearchBar({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.searchBox}>
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

export default function ProductsScreen() {
  const [query, setQuery] = useState("");

  // FILTRAR PRODUCTOS
  const filteredProducts = products.filter((product) => {
    const search = query.toLowerCase().trim();

    return (
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.barcode.toLowerCase().includes(search)
    );
  });

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Productos</Text>

        <View style={styles.search}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.card}>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>
                {product.title}
              </Text>

              <View style={styles.categoryContainer}>
                <Text style={styles.category}>
                  {product.category}
                </Text>
              </View>

              <Text style={styles.barcode}>
                Código: {product.barcode}
              </Text>

              <View style={styles.bottom}>
                <View>
                  <Text style={styles.label}>
                    Stock
                  </Text>

                  <Text style={styles.stock}>
                    {product.expectedStock}
                  </Text>
                </View>

                <View>
                  <Text style={styles.label}>
                    Precio
                  </Text>

                  <Text style={styles.price}>
                    ${product.unitPrice.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        {filteredProducts.length === 0 && (
          <View style={styles.empty}>
            <Ionicons
              name="search-outline"
              size={40}
              color="#608BC1"
            />

            <Text style={styles.emptyText}>
              No se encontraron productos
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F3F3E0",
  },

  container: {
    flex: 1,
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#133E87",
    marginBottom: 15,
  },

  search: {
    marginBottom: 20,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",

    shadowColor: "#133E87",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  imageContainer: {
    width: "100%",
    height: 220,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#133E87",
    marginBottom: 8,
  },

  categoryContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#CBDCEB",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 10,
  },

  category: {
    color: "#133E87",
    fontWeight: "600",
  },

  barcode: {
    color: "#608BC1",
    fontSize: 14,
    marginBottom: 15,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#CBDCEB",
    borderRadius: 10,
    padding: 12,
  },

  label: {
    fontSize: 12,
    color: "#133E87",
    marginBottom: 3,
  },

  stock: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#608BC1",
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#133E87",
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#608BC1",
  },
});

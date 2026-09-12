import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "@/data/product";

export default function ProductsScreen() {
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Productos</Text>
        {products.map((product) => (
          <View key={product.id} style={styles.card}>
            <Image
              source={{ uri: product.imageUrl }}
              style={styles.image}
            />

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
                  <Text style={styles.label}>Stock</Text>
                  <Text style={styles.stock}>
                    {product.expectedStock}
                  </Text>
                </View>

                <View>
                  <Text style={styles.label}>Precio</Text>
                  <Text style={styles.price}>
                    ${product.unitPrice.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
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
    marginBottom: 20,
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

  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#608BC1",
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
});
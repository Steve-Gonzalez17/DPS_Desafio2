import { AuditEntry } from "@/types/AudioEntry";

export const auditEntries: AuditEntry[] = [
  {
    id: "seed-1",
    productId: "P-010", // Arroz blanco 1816gr
    productTitle: "Arroz blanco 1816gr",
    actionType: "STOCK_RECEIPT",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toDateString(),
    location: { latitude: 13.696568, longitude: -89.191228 },
    audioNoteUrl: undefined,
  },
  {
    id: "seed-2",
    productId: "P-012", // Aceite vegetal 1180 ml
    productTitle: "Aceite vegetal 1180 ml",
    actionType: "AUDIT_CHECK",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toDateString(),
    location: { latitude: 13.713824, longitude: -89.156923 },
    audioNoteUrl: undefined,
  },
  {
    id: "seed-3",
    productId: "P-011", // Frijoles rojos 1 lb
    productTitle: "Frijoles rojos 1 lb",
    actionType: "INCIDENCE",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toDateString(),
    location: { latitude: 13.71591, longitude: -89.09751 },
    audioNoteUrl: undefined,
  },
];
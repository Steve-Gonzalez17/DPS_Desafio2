import React, { createContext, useContext, useState } from "react";

import { AuditEntry } from "@/types/AudioEntry";
import { auditEntries } from "@/data/auditSeed";

interface AuditContextType {
    entries: AuditEntry[];
    addEntry: (entry: AuditEntry) => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: React.ReactNode }) {
    const [entries, setEntries] = useState<AuditEntry[]>(auditEntries);

    const addEntry = (entry: AuditEntry) => {
        setEntries((currentEntries) => [entry, ...currentEntries]);
    };

    return (
        <AuditContext.Provider
            value={{
                entries,
                addEntry,
            }}
        >
            {children}
        </AuditContext.Provider>
    );
}

export function useAudit() {
    const context = useContext(AuditContext);

    if (!context) {
        throw new Error("useAudit debe utilizarse dentro de AuditProvider");
    }

    return context;
}

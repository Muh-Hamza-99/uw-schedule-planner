import React, { useState } from "react";

type Context = {
    term: Term | null
    setTerm: React.Dispatch<React.SetStateAction<Term | null>>
}

export const TermContext = React.createContext<Context>({ term: null, setTerm: () => {} });

type Provider = {
    children: React.ReactNode
}

export function TermContextProvider({ children }: Provider) {
    const [term, setTerm] = useState<Term | null>(null);
    return (
        <TermContext.Provider value={{term, setTerm}}>
            {children}
        </TermContext.Provider>
    )
}
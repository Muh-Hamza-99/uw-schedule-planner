import React, { useState } from "react";

type Context = {
    selectedCourses: SelectedCourse[]
    setSelectedCourses: React.Dispatch<React.SetStateAction<SelectedCourse[]>>
}

export const SelectedCoursesContext = React.createContext<Context>({ selectedCourses: [], setSelectedCourses: () => {} });

type Provider = {
    children: React.ReactNode
}

export function SelectedCoursesContextProvider({ children }: Provider) {
    const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
    return (
        <SelectedCoursesContext.Provider value={{selectedCourses, setSelectedCourses}}>
            {children}
        </SelectedCoursesContext.Provider>
    )
}
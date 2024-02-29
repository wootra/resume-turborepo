import React, { createContext, useState, type PropsWithChildren } from 'react';

const DataContext = createContext<{
    data: { label: string; percentage: number; color: string }[];
    setData: React.Dispatch<
        React.SetStateAction<
            { label: string; percentage: number; color: string }[]
        >
    >;
    resetData: () => void;
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}>({
    data: [],
    setData: () => {},
    resetData: () => {},
    selectedIndex: 0,
    setSelectedIndex: () => {},
});
DataContext.displayName = 'DataContext';

export const useDataContext = () => {
    const context = React.useContext(DataContext);

    return context;
};
const defaultData = [
    { label: 'React', percentage: 60, color: '#61dafb' },
    { label: 'Angular', percentage: 30, color: '#f9a825' },
    { label: 'Vue', percentage: 5, color: '#41b883' },
];

function DataContextProvider({ children }: PropsWithChildren) {
    const [data, setData] = useState([...defaultData]);
    const resetData = () => setData([...defaultData]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <DataContext.Provider
            value={{
                data,
                setData,
                selectedIndex,
                setSelectedIndex,
                resetData,
            }}
        >
            {children}
        </DataContext.Provider>
    ) as JSX.Element;
}

export default DataContextProvider;

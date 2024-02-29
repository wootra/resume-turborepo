import React, {
    createContext,
    useState,
    type PropsWithChildren,
    type ReactNode,
} from 'react';
const StyleContext = createContext<{
    padding: { l: number; r: number; t: number; b: number };
    setPadding: React.Dispatch<
        React.SetStateAction<{ l: number; r: number; t: number; b: number }>
    >;
    innerRadius: number;
    setInnerRadius: React.Dispatch<React.SetStateAction<number>>;
    distance: number;
    setDistance: React.Dispatch<React.SetStateAction<number>>;
    xRotate: number;
    setXRotate: React.Dispatch<React.SetStateAction<number>>;
}>({
    padding: { l: 10, r: 10, t: 10, b: 10 },
    setPadding: () => {},
    innerRadius: 0,
    setInnerRadius: () => {},
    distance: 0,
    setDistance: () => {},
    xRotate: 0,
    setXRotate: () => {},
});

export const useStyleContext = () => {
    const context = React.useContext(StyleContext);
    if (!context) {
        throw new Error(
            'useStyleContext must be used within a StyleContextProvider'
        );
    }
    return context;
};

export function StyleContextProvider({ children }: PropsWithChildren) {
    const [padding, setPadding] = useState({ l: 10, r: 10, t: 10, b: 10 });
    const [innerRadius, setInnerRadius] = useState(0);

    const [distance, setDistance] = useState(0);
    const [xRotate, setXRotate] = useState(0);

    return (
        <StyleContext.Provider
            value={{
                padding,
                setPadding,
                innerRadius,
                setInnerRadius,
                distance,
                setDistance,
                xRotate,
                setXRotate,
            }}
        >
            {children}
        </StyleContext.Provider>
    ) as ReactNode;
}

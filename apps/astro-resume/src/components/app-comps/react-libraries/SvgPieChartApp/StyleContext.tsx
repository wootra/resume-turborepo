import React, {
    createContext,
    useState,
    type PropsWithChildren,
    type ReactNode,
} from 'react';

const defaultStyles = {
    padding: { l: 10, r: 10, t: 10, b: 10 },
    innerRadius: 30,
    distance: 10,
    xRotate: 20,
};

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
    ...defaultStyles,
    setPadding: () => {},
    setInnerRadius: () => {},
    setDistance: () => {},
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
    const [padding, setPadding] = useState(defaultStyles.padding);
    const [innerRadius, setInnerRadius] = useState(defaultStyles.innerRadius);

    const [distance, setDistance] = useState(defaultStyles.distance);
    const [xRotate, setXRotate] = useState(defaultStyles.xRotate);

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

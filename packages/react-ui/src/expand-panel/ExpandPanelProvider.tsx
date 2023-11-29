import {
    MutableRefObject,
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
export type ExpandPanelState = {
    [id: number]: {
        shown: boolean;
        expanded: boolean;
    };
};

const ExpandPanelContext = createContext<{
    states: ExpandPanelState;
    setStates: React.Dispatch<React.SetStateAction<ExpandPanelState>>;
}>({ states: {}, setStates: () => {} });

export const ExpandPanelProvider = ({ children }: { children: ReactNode }) => {
    const [states, setStates] = useState<ExpandPanelState>({});
    return (
        <ExpandPanelContext.Provider value={{ states, setStates }}>
            {children}
        </ExpandPanelContext.Provider>
    );
};
let id = 0;

export const useExpandPanelGroups = (
    group: string | undefined,
    isInitiallyExpanded: boolean
) => {
    const { states, setStates } = useContext(ExpandPanelContext);
    const [currId, setCurrId] = useState(-1);
    const currState = useRef<ExpandPanelState>(null);
    if (currState.current === null) {
        (currState as MutableRefObject<ExpandPanelState>).current = states;
    }
    useEffect(() => {
        id = id + 1;
        setCurrId(id);
        currState.current![id] = {
            expanded: isInitiallyExpanded || false,
            shown: isInitiallyExpanded || false,
        };
    }, [isInitiallyExpanded, setCurrId]);
    const expanded = states[currId]?.expanded || false;
    const shown = states[currId]?.shown || false;
    const setShown = useCallback((isShown: boolean) => {
        setStates(states => ({
            ...states,
            [currId]: {
                expanded: states[currId].expanded,
                shown: isShown,
            },
        }));
    }, []);
    const isOverflowHidden = useMemo(() => {
        return (expanded && !shown) || (!expanded && shown);
    }, [expanded, shown]);
    const onClick = useCallback(() => {
        if (expanded) {
            setStates(states => ({
                ...states,
                [currId]: {
                    expanded: !states[currId].expanded,
                    shown: true,
                },
            }));
        } else {
            setStates(states => {
                if (group) {
                    // close other panels exclusively
                    return Object.keys(states).reduce((acc, curr) => {
                        if (Number(curr) !== currId) {
                            acc[Number(curr)] = {
                                expanded: false,
                                shown: states[Number(curr)].expanded,
                            };
                        } else {
                            acc[currId] = {
                                expanded: !states[currId].expanded,
                                shown: false,
                            };
                        }
                        return acc;
                    }, {} as ExpandPanelState);
                } else {
                    return {
                        ...states,
                        [currId]: {
                            expanded: !states[currId].expanded,
                            shown: false,
                        },
                    };
                }
            });
        }
    }, [currId, expanded, group, setStates]);
    const onAnimationEnd = useCallback(() => {
        if (expanded) {
            setShown(true);
        } else {
            setShown(false);
        }
    }, [expanded]);

    return {
        expanded,
        shown,
        isOverflowHidden,
        onClick,
        onAnimationEnd,
    };
};

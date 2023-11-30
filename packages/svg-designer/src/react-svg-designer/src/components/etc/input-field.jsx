import React, { useReducer } from 'react';
import css from './style.module.css';
import { useEffect } from 'react';

const reducer = (state, action) => {
    const payload = action.payload;
    switch (action.type) {
        case 'set-value':
            return { ...state, value: payload.value, inputCss: css.normalInputCss, error: '', initValue: payload.initValue || state.initValue };
        case 'set-error':
            return { ...state, value: payload.value || state.value, inputCss: css.errorInputCss, error: payload.error };
        default:
            return { ...state };
    }
}

export default function InputField(props) {
    const { verify, onChange, value: initValue, errorStyle: errorStyleOrg = {}, parser, ...rest } = props;
    const [state, dispatchOrg] = useReducer(reducer, {
        value: initValue,
        error: '',
        inputCss: css.normalInputCss,
        initValue
    });
    const dispatch = (type, payload = {}) => {
        if (payload) dispatchOrg({ type, payload });
        else dispatchOrg({ type });
    }
    const errorStyle = { ...errorStyleOrg, fontSize: "8pt", color: 'red' }
    const onValueChanged = e => {
        const txt = e.target.value;

        console.log({ target: e.target, selection: e.target.selectionStart });
        try {
            const error = verify(txt);
            if (!error || error.length === 0) {
                let value;
                if (parser) {
                    value = parser(txt);
                } else {
                    value = txt;
                }
                dispatch('set-value', { value })
                onChange(value);
            } else {
                throw Error(error)
            }
        } catch (e) {
            dispatch('set-error', { value: txt, error: e.message })
        }

    }
    useEffect(() => {
        if (state.initValue !== initValue) {
            dispatch('set-value', { value: initValue, initValue: initValue })
        }
    }, [initValue]);

    if (state.error && state.error.length > 0) {
        return (<>
            <label style={errorStyle}>{state.error}</label>
            <input onChange={onValueChanged} value={state.value} className={state.inputCss} {...rest} />
        </>)
    } else {
        return (<input onChange={onValueChanged} value={state.value} className={state.inputCss} {...rest} />)
    }

}
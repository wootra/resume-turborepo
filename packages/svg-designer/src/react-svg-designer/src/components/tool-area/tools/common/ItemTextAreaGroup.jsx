import React, { useReducer } from 'react';
import css from './style.module.css';
import mCss from '../../style.module.css';

const reducer = (state, { type, payload }) => {
    console.log({ type, payload })
    switch (type) {
        case "set-value":
            return { ...state, value: payload.value, err: "" };
        case "set-error":
            return { ...state, value: payload.value, err: payload.message };
        default:
            return state;
    }
}

export const ItemTextAreaGroup = (props) => {
    const { name, initValue, className, onChange, ...rest } = props;
    const [state, dispatch] = useReducer(reducer, { value: initValue, err: "" });

    const onItemChange = e => {
        let value = e.target.value;
        console.log('before-', value);
        let valToSend = value.replace(/([a-zA-Z_]+[a-zA-Z0-9_]*):/g, "\"$1\":");
        console.log('after-', valToSend)
        valToSend = valToSend.trim();
        if (valToSend[0] !== '{' && valToSend[valToSend.length - 1] !== '}') {
            valToSend = `{${valToSend}}`
        }
        try {
            valToSend = JSON.parse(valToSend);
            onChange(valToSend);
            dispatch({ type: 'set-value', payload: { value } });
        } catch (e) {
            dispatch({ type: 'set-error', payload: { value, message: e.message } });
        }

    }

    return (<div key={name}>
        {state.err.length > 0 ? <span>{state.err}</span> : null}
        <label className={mCss.itemInfoName}>{name}</label>
        <textarea className={className} value={state.value} onChange={onItemChange} {...rest} />
    </div>);
}

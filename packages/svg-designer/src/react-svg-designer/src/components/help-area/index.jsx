import React, { useMemo, useState } from 'react';
import css from './style.module.css';
import { ModeContext } from '../../contexts/globalContexts';
import { useDynamicContextConsumer } from '../../contexts/dynamic-context-utils';
import { DrawingModes } from '../../consts';

export default function(props) {
  const [modes, setModes] = useDynamicContextConsumer(ModeContext);
  let help = null;
  const drawShortcut = (shortcut, idx, selected = false) => (
    <React.Fragment key={idx}>
      <span className={css.shortcutWrapper}>
        <span className={selected ? css.shortcutSel : css.shortcut}>
          {shortcut[0]}
        </span>
        <span className={css.desc}>{shortcut[1]}</span>
      </span>
    </React.Fragment>
  );

  const { drawingMode } = modes;
  switch (drawingMode) {
    case DrawingModes.PATH:
      help = (
        <p className={css.helpLine}>
          {[
            ['esc', 'None'],
            ['click', 'line'],
            ['click,drag', 'smooth-curve(Q)'],
            ['click,s+drag', 'sharp-curve(S)'],
            ['click,a+drag', 'arc'],
            ['click,a+shift+drag', 'bigArc'],
          ].map((i, idx) => drawShortcut(i, idx))}
        </p>
      );
      break;
    case DrawingModes.NONE:
      help = (
        <p className={css.helpLine}>
          {[
            ['shift+p', 'Path'],
            ['shift+r', 'Rect'],
            ['shift+c', 'Circle'],
            ['shift+t', 'Text'],
          ].map((i, idx) => drawShortcut(i, idx))}
        </p>
      );
      break;
    default:
      help = (
        <p className={css.helpLine}>
          {[
            ['drag', 'draw from C'],
            ['shift+drag', 'draw from LT'],
            ['alt+drag', 'w=h'],
          ].map((i, idx) => drawShortcut(i, idx))}
        </p>
      );
      break;
  }
  return <div className={css.helpWrapper}>{help}</div>;
}

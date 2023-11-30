import { useEffect, useState } from 'react';
import { DrawingModes } from '../consts';
import { changeMode } from './mode-handler';

let keys = {
  ctrl: false,
  alt: false,
  shift: false,
  char: null,
  combination: [],
};

export const useKeyEvents = ({
  keyPressed,
  setKeyPressed,
  history,
  setModes,
  modes,
}) => {
  const [focused, setFocused] = useState(false);
  useEffect(
    () => {
      const focusedHandler = (e) => {
        setFocused(true);
      };
      const blurredHandler = (e) => {
        setFocused(false);
      };

      const keyDownHandler = ({ key }) => {
        let k = null;
        if (key === 'Shift') {
          keys = { ...keys, shift: true, combination: [] };
        } else if (key === 'Alt') {
          keys = { ...keys, alt: true, combination: [] };
        } else if (key === 'Meta') {
          keys = { ...keys, ctrl: true, combination: [] };
        } else {
          k = key.toLowerCase();
        }
        if (!focused) {
          setKeyPressed({ ...keys, char: k });
          console.log('key pressed:', k, modes);
        }
      };
      const keyUpHandler = ({ key }) => {
        if (key === 'Shift') {
          keys = { ...keys, shift: false };
          setKeyPressed({ ...keys });
        } else if (key === 'Alt') {
          keys = { ...keys, alt: false };
          setKeyPressed({ ...keys });
        } else if (key === 'Meta') {
          keys = { ...keys, ctrl: false };
          setKeyPressed({ ...keys });
        } else if (key === 'Escape') {
          if (modes.drawingMode === DrawingModes.PATH) {
            console.log('change mode');
            changeMode(setModes, DrawingModes.NONE);
          }
        } else {
          let combination = [...keys.combination];
          const k = key.toLowerCase();
          if (keys.shift) combination.push('shift');
          if (keys.ctrl) combination.push('ctrl');
          if (keys.alt) combination.push('alt');
          combination.push(k);
          setKeyPressed({ ...keys, combination, char: null });
          //console.log('combination:', { combination, keys, key });
          if (keys.shift) {
            if (k === 'p') {
              changeMode(setModes, DrawingModes.PATH);
            } else if (k === 'c') {
              changeMode(setModes, DrawingModes.CIRCLE);
            } else if (k === 'r') {
              changeMode(setModes, DrawingModes.RECT);
            } else if (k === 't') {
              changeMode(setModes, DrawingModes.TEXT);
            }
          } else if (keys.ctrl) {
            const k = key.toLowerCase();
            if (k === 'v') {
              const txt = navigator.clipboard.readText();
              try {
                const obj = JSON.parse(txt);
                if (obj.type === 'copied-item') {
                  switch (obj.itemType) {
                    case 'history':
                      break;
                    default:
                      console.log('copied item is:', { obj });
                  }
                }
              } catch (e) {
                console.log(e.message, 'copied text is:', txt);
              }
            }
          }
        }
      };
      const keyDownWrapper = (e) => {
        keyDownHandler(e);
        return e;
      };
      const keyUpWrapper = (e) => {
        keyUpHandler(e);
        return e;
      };
      window.addEventListener('keydown', keyDownWrapper);
      window.addEventListener('keyup', keyUpWrapper);
      window.addEventListener('focusin', focusedHandler);
      window.addEventListener('focusout', blurredHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', keyDownWrapper);
        window.removeEventListener('keyup', keyUpWrapper);
        window.removeEventListener('focusin', focusedHandler);
        window.removeEventListener('focusout', blurredHandler);
      };
    },
    [setModes, modes, setKeyPressed, focused, setFocused]
  ); // Empty array ensures that effect is only run on mount and unmount
};

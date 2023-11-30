# react-svg-designer

react tool that helps you to create SVG image easily by clicking, dragging and selecting tools like adobe illustrator.

## completed functions

- fill
- change properties from the property window
- grid / stick on grid function
- save to/from local storage
- grid is not covering image when drawing mode is none.
- interactive help function.
- adding a new attribute from the toolbox
- remove an attribute from the toolbox
- select & delete/move depth
- viwport change
- save svg to clipboard and popup
- multi-layered property change
- translate from transform to real points (path)
- text add/change
- select element from history
- mask

## priority of todo

- can it be modified easily in svg code? - low
- is it hard to make in svg code? - high
- is the image safely handled? - middle

## bug

- no known bug reported.

## fixed bug

- if you click - at magnify 10, it stops.
- after escaping from path, it still draw path in the temp area.
- even though there is no point, path is added.
- grid doesn't draw from viewport start but from 0
- circle draws dashed line
- when the svg is created, fill='transparent' is included in svg tag. should be removed.
- after drawing is finished, the selected item should be changed to recently created item.

## in-progress work

- clone layer
- gradient

## todo

- history mode change(svg-gen-util/svg/items)
- show svg-gen-util api /svg tags
- multi-selection from history
- path change
- group

- transform (rotation/scale)
- put background image by selecting a image file.
- show actual image size and fix the size to the image with width,height attribute

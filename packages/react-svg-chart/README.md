# react-svg-chart

## motivation

- svg chart components does not support server side rendering
- if I want to use pdfmake without converting to base64, I need to use svg string, but using renderToString from react-dom/server module, d3 cannot make svg string
- need to create static svg
- on top of static svg, we can use d3 manipulating existing svg result

on development

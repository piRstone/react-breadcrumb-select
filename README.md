# react-breadcrum-select

A select input for tree shaped data.

### Install

```
npm install --save react-breadcrumb-select
```

### Example

You can take a look at the component on [the example page](https://pirstone.github.io/react-breadcrumb-select/).

### Quick start

```javascript
import React from "react";
import ReactDOM from "react-dom";
import BreadcrumbSelect from "react-breadcrumb-select";

const data = [
  {
    id: 1,
    name: '',
    parent: null,
    children: [
      {
        id: 3,
        name: 'three',
        parent: 1,
        chlidren: [
          {
            id: 5,
            name: 'five',
            parent: 3,
            children: []
          }
        ]
      },
      {
        id: 4,
        name: 'four',
        parent: 1,
        chlidren: [
          {
            id: 6,
            name: 'six',
            parent: 4,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'two',
    parent: null,
    chlidren: []
  }
];

function Example() {
  const handleChange = e => {
    // Do some stuff...
  };

  return (
    <div>
      <BreadcrumbSelect data={data} onChange={handleChange} />
    </div>
  );
}

const app = document.getElementById("app");
ReactDOM.render(<Example />, app);

```

### Prop types

#### data

`PropTypes.arrayOf(PropTypes.object)` or `PropTypes.object`

[Tree shaped data.](#shape-of-data)

_Required_

#### placeholder

`PropTypes.string`

Select input plceholder text.

#### value

`PropTypes.number`

Id of the selected element. It will display the tree of selects.

#### onChange

`PropTypes.func`

Callback function when an element is selected.

#### noOptionsMessage

`PropTypes.string`

Text to display when the search in a select input returns no results.

#### disabledIds

`PropTypes.arrayOf(PropTypes.number)`

Array of ids to disable. Elements will appear but with a disabled state.

### Shape of data

```javascript
PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  parent: PropTypes.number, // or null
  children: PropTypes.arrayOf(PropTypes.object)
})
```

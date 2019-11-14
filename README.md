# React Dynamic Data Table

[![npm version](https://badge.fury.io/js/%40langleyfoxall%2Freact-dynamic-data-table.svg)](https://badge.fury.io/js/%40langleyfoxall%2Freact-dynamic-data-table)
[![npm](https://img.shields.io/npm/dt/@langleyfoxall/react-dynamic-data-table.svg)](https://npm-stat.com/charts.html?package=%40langleyfoxall%2Freact-dynamic-data-table)


This package provides a React Dynamic Data Table component that supports sortable columns, 
pagination, field mapping, data manipulation, and more.

## Installation

You can install this package with either `npm` or `yarn` as shown below.

```bash
npm install @langleyfoxall/react-dynamic-data-table
```

```bash
yarn add @langleyfoxall/react-dynamic-data-table
```

Remember to import the `DynamicDataTable` component where it is needed.

```JSX
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
```

## Usage

At its most basic, you can create a new `<DynamicDataTable />` with just the `rows` prop.

```JSX
<DynamicDataTable rows={this.state.users} />
```

The `rows` prop expects an array of objects, such as the following.

```JSX
[
  { name: "Picard", email: "picard@enterprise-d.com"  },
  { name: "Kirk",   email: "kirk@enterprise-a.com"    },
  { name: "Sisko",  email: "sisko@deep-space-9.com"   }
]
```

### Excluding fields

By default, React Dynamic Data Table will render a table containing all fields present
in the `rows` prop. To exclude specific fields, you can use the `fieldsToExclude` props.

In the example below, the `email` field will be excluded.

```JSX
<DynamicDataTable 
    rows={this.state.users}
    fieldsToExclude={['email']}
    />
```

In the example below, all ID fields will be excluded.

```JSX
<DynamicDataTable 
    rows={this.state.users}
    fieldsToExclude={[/_?id/]}
    />
```

The `fieldsToExclude` prop expects an array of strings or regex expressions that represent the fields to exclude.

### Mapping fields

By default, React Dynamic Data Table creates table headers based on the field name,
with underscores replaced with spaces and each word's first letter converted to uppercase.
You can override this behaviour with a field map.

In the example below, you can render the `email` field as 'Email Address'.

```JSX
<DynamicDataTable 
    rows={this.state.users}
    fieldMap={{ email: 'Email address' }}
    />
```

The `fieldMap` prop expects an object which maps the `rows` keys to alternative field names.


### Ordering data

The React Dynamic Data Table will display the `rows` in the order they are provided 
in the array. However, it is possible to show, in the column header, that the data 
has been sorted.

In the example below, the name column header will show a down arrow indicating 
that the data has been sorted by name (ascending).

```JSX
// this.state.orderByField = 'name';
// this.state.orderByDirection = 'asc';

<DynamicDataTable 
    rows={this.state.users}
    orderByField={this.state.orderByField}
    orderByDirection={this.state.orderByDirection}
    />
```

The `orderByField` prop expects a string indicating the field to sort by (one of the 
keys from the `rows` object).

The `orderByDirection` expects either `asc` or `desc`, meaning ascending or descending 
respectively.

If you wish to let the end-user sort the data table by clicking on the column 
headings, you can use the `changeOrder` prop. This is shown in the example below.

```JSX
// this.state.orderByField = 'name';
// this.state.orderByDirection = 'asc';

<DynamicDataTable 
    rows={this.state.users}
    orderByField={this.state.orderByField}
    orderByDirection={this.state.orderByDirection}
    changeOrder={(field, direction) => this.changeOrder(field, direction)}
    />
```

```JSX
changeOrder(field, direction) {
    this.setState({ orderByField: field, orderByDirection: direction }, () => {
        const users = /* Get sorted data from API endpoint */
        this.setState({ users: users });
    });
}
```

The `changeOrder` prop expects a callable. This callable should:

1. Change the `orderByField` and `orderByDirection` props, based on the passed `field` 
and `direction` parameters respectively.
2. Change / re-retrieve the `rows` prop, such that it is sorted based on the passed 
`field` and `direction` parameters.

Ordering data is enabled for all fields by default. However, if you wish to restrict 
which fields the ordering is enabled for, pass an array of the field names into the 
`allowOrderingBy` prop. An example of this is shown below.

```JSX
<AjaxDynamicDataTable
    rows={this.state.users}
    allowOrderingBy={[
        'name', 'email'
    ]}
/>
```

To have the opposite effect simply use `disallowOrderingBy`:

```JSX
<AjaxDynamicDataTable
    rows={this.state.users}
    disallowOrderingBy={[
        'dob'
    ]}
/>
```

Typically, the `allowOrderingBy` and `disallowdOrderingBy` props should not be used simultaneously, as this could cause unexpected behaviour.

### Ordering fields

By default fields will be ordered as they are passed into the table on each row.
To force a specific ordering of columns an array of strings or regex can be passed
with the `fieldOrder` prop. Anything that is not included within `fieldOrder` will
be pushed to the end of the ordered fields.

```JSX
<DynamicDataTable
    rows={[
        { id: 1, email: 'info@langleyfoxall.co.uk', name: 'Langley Foxall' }
    ]}
    fieldOrder={[
        'id', 'name'
    ]}
/>

// Output: id, name, email
```

Mixing strings and regex is also supported.

```JSX
<DynamicDataTable
    rows={[
        { id: 1, email: 'info@langleyfoxall.co.uk', first_name: 'Langley', last_name: 'Foxall' }
    ]}
    fieldOrder={[
        'id', /_name/
    ]}
/>

// Output: id, first_name, last_name, email
```

### Column Widths

In some cases there may be a need to make some columns be different widths
by defining a width, rather than the table changing based off of content.

The `columnWidths` prop expects an object with column names as the keys and either a string or number as the values.

When a number is passed the width will become a percentage. If a string is passed then
it respects whatever unit is set.

```jsx
<DynamicDataTable
    rows={[
        { id: 1, email: 'info@langleyfoxall.co.uk', first_name: 'Langley', last_name: 'Foxall' }
    ]}
    columnWidths={{
        // 10%
        id: 10,

        // 100px
        email: '100px'
    }}
/>
```

### Custom order by icons

When ordering by a field on an element will be rendered next to it. By default 
these are simple symbols (`↓` and `↑`). These can be changed by passing a valid
node into `orderByAscIcon` and `orderByDescIcon`.

```JSX
<DynamicDataTable
    orderByAscIcon="Ascending"
    // orderByAscIcon={<p>Ascending</p>}
    // orderByAscIcon={<FancyAscendingIcon />}
/>
```

### Pagination

Making pagination work with React Dynamic Data Table requires three extra
props. These are the `currentPage`, `totalPages` and `changePage` props. Once
these props are set correctly, a Bootstrap style pagination will be displayed 
below the table.

The `currentPage` prop expects an integer representing the current page number
(one or above).

The `totalPages` prop expects an integer representing the total number of
pages in the data set (one or above). Pagination will only be shown if the 
total number of pages is greater than one.

The `changePage` props expect a callable with a `page` argument, indicating the
new page number to load. This callable should:

1. Load a new page of data into the `rows` prop based on the passed `page` 
argument.
2. Set the `currentPage` prop to be equal to the passed `page` argument. 

A example of this is shown below:

```JSX
// this.state.currentPage = 1;
// this.state.totalPages = 5;

<DynamicDataTable
        rows={this.state.users}
        currentPage={this.state.currentPage}
        totalPages={this.state.totalPages}
        changePage={page => this.changePage(page)}
    />
```

```JSX
changePage(page) {
    const users = /* Get page of data from API endpoint */
    this.setState({ users: users, currentPage: page });
}
```

Pagination is dynamic, showing only a select subset of the available pages as actual buttons.
Whether or not an individual button to a page is shown depends on if it is the first or last page (these are always shown), and whether it is within a predefined offset from the current page (a pagination delta). 
This delta can be changed by passing a `paginationDelta` prop into `DynamicDataTable` as shown below:

```JSX
<DynamicDataTable
        rows={this.state.users}
        currentPage={this.state.currentPage}
        totalPages={this.state.totalPages}
        paginationDelta={6}
    />
```

### Row buttons

Row buttons appear on the right hand side of every row in the React Dynamic Data 
Table. By default, a 'View' button is provided, which simply links the user to
the current URL with the row's `id` appended.

You can completely override the row buttons that are displayed by provided a
`buttons` prop. This prop expects an array of objects, each containing a `name`
and `callback`.

The `name` is string, such as 'View', 'Edit', 'Delete', etc.

The `callback` is a callable with a two arguments. The first is the event object
for the button clicked and the second is an object representing the current row.

An example of setting custom row buttons is shown below.

```JSX
<DynamicDataTable
    rows={this.state.users}
    buttons={[
        {
            name: 'Edit',
            callback: (event, user) => {
                // Show edit user view...
            }
        },
        {
            name: 'Delete',
            callback: (event, user) => {
                // Delete user...
            }
        }
    ]}
    />
```

`buttons` can also be given a custom render at the top level, or for multiple array elements.
It's worth noting that multiple array elements still respect the dropdown menu.

```jsx
// Top level example
<DynamicDataTable
  buttons={row => (
    <a>
      <i className="fas fa-fw fa-eye" />
      <span>Totally custom button</span>
    </a>
  )}
/>

// Low level example
<DynamicDataTable
  buttons={[
    {
      render: row => (
        <a>
          <i className="fas fa-fw fa-eye" />
          <span>Totally custom button 1</span>
        </a>
      )
    },
    {
      render: row => (
        <a>
          <i className="fas fa-fw fa-tick" />
          <span>Totally custom button 2</span>
        </a>
      )
    }
  ]}
/>
```

### Rendering custom rows

If you come across a situation where the automatically generated rows are not suitable for your project
you can use the `rowRenderer` prop. This prop expects a callable that receives a single argument, 
and returns a valid React element, which should be a `<tr>` element.

The argument passed to the `rowRenderer` callable is a JavaScript object that contain the following properties.

```JS
{
  row,                // Instance of data row
  onClick,            // Row on click handler
  onMouseUp,          // Row on MouseUp handler
  onMouseDown,        // Row on MouseDown handler
  buttons,            // Array of buttons
  actions,            // Array of header actions
  fields,             // Visible fields
  renderCheckboxes,   // Boolean indicating whether to render checkboxes
  disableCheckbox,    // Boolean indicating whether to disable the checkbox per row
  checkboxIsChecked,  // Boolean indicating if checkbox is checked
  onCheckboxChange,   // Callable that is called when a per row checkbox is changed
  dataItemManipulator // Callable that handles manipulation of every item in the data row
}
```

For implementation details regarding these properties, see the other relevant areas of the documentation.

### Clickable rows

Clickable rows allows an `onClick` prop to be passed. This should be a callable, that will be passed an event object along with
an instance of the row that is clicked. It also adds the bootstrap `table-hover` class onto the table.

```JSX
<DynamicDataTable
    rows={this.state.users}
    onClick={(event, row) => console.warn(event, row.name)}
/>
```

#### Mouse Events

For more complex interactions, such as supporting the ability to Middle-click, you can use the `onMouseUp` and `onMouseDown` events instead. It also adds the bootstrap `table-hover` class onto the table. The `onMouseDown` and `onMouseUp` props should be callables, that will be passed an event object along withan instance of the row that is clicked.

```JSX
<DynamicDataTable
    rows={this.state.users}
    onMouseDown={this.handleMouseDown}
    onMouseUp={this.handleMouseUp}
/>
```

#### Context Menus

The ability to right click rows can be enabled by using `onContextMenu` and `rowRenderer`.
In the example we will use our own [`@langleyfoxall/react-dynamic-context-menu`](https://github.com/langleyfoxall/react-dynamic-context-menu):

```JSX
<DynamicDataTable
    rows={this.state.users}
    rowRenderer={options => (
        <DynamicContextMenu
            key={options.key}
            data={options.row}
            menuItems={[
                {
                    label: 'Update',
                    onClick: this.handleUpdate,
                },
                {
                    label: 'Delete',
                    onClick: this.handleDelete,
                },
            ]}
        >
            {DynamicDataTable.rowRenderer(options)}
        </DynamicContextMenu>
    )}
/>
```

`DynamicContextMenu` clones the child and adds `onContextMenu` as a prop. This can also be achieved manually.

```JSX
<DynamicDataTable
    rows={this.state.users}
    rowRenderer={({ row }) => (
        <tr onContextMenu={() => this.onContextMenu(row)}>
            <td/>
        </tr>
    )}
/>
```

### Hoverable table rows

To enable a hover effect on rows even if `onClick` is not passed into the table you can use the prop `hoverable`.
This will add a background color on each row when hovered.

```JSX
<DynamicDataTable
    rows={this.state.users}
    hoverable
/>
```

### Render no data component

If you wish to render something other than the table when no rows are present you can take advantage of
`noDataComponent` which accepts a valid react element. This will replace the table until there are rows.

```JSX
<DynamicDataTable
    row={[]}
    noDataComponent={(
        <p>I replace the table, not just the text inside it.</p>
    )}
/>
```

### Bulk select checkboxes

If you wish to allow users to bulk select users in a React Dynamic Data Table,
you can specify the `renderCheckboxes` prop. This will render a series of 
checkboxes against each row, on the left side of the table.

```JSX
<DynamicDataTable
    rows={this.state.users}
    renderCheckboxes
    />
```

Bulk select checkboxes are usually combined with bulk actions to perform
actions on one or more rows at once.

### Disable checkboxes

Checkboxes can also be disabled for each individual row by passing in `disabledCheckboxes` which
should container an array of identifiers. If an identifier is in the array then the checkbox will have `disabled` set to `true`.

```JSX
<DynamicDataTable
    rows={this.state.users}
    renderCheckboxes
    disabledCheckboxes={[1]}
    />
```

### Actions

Actions, when combined with bulk select checkboxes allow you perform
actions of multiple rows at once. When in use, a menu will be rendered
in the top right of the table allowing your users to choose a bulk action
that will be applied to the selected rows.

Actions can also be used without bulk select checkboxes. This could allow for creation of action buttons that are not dependant on existing data, such as a 'Create User' button.

To use actions in your React Dynamic Data Table, you must specify the
`actions` props. This prop expects an array of objects, each containing a `name` 
and `callback`.

The `name` is string, such as 'Delete user(s)', 'Duplicate user(s)' etc.

The `callback` is a callable with a single argument. The argument will
contain an array of the selected rows. 

Examples of how to use actions is shown below.

```JSX
<DynamicDataTable
    rows={this.state.users}
    renderCheckboxes
    actions={[
        {
            name: 'Delete user(s)',
            callback: (rows) => { 
                // Delete users...
            },
        },
    ]}
/>
```

```JSX
<DynamicDataTable
    rows={this.state.users}
    actions={[
        {
            name: 'Create user',
            callback: () => { 
                // Toggle create user modal...
            },
        },
    ]}
/>
```

### Data Item Manipulation

If you wish to alter row data prior to it being rendered, you may use the `dataItemManipulator` prop available on the 
`DynamicDataTable`. This prop expects a `function` which will be passed three parameters, the `field`, the `value` and
the `row`.
 
This function will be called once for every cell that is to be rendered.

```JSX
<DynamicDataTable
    dataItemManipulator={(field, value, row) => {
        switch(field) {
            case 'id':
                return 'ID:' + value;
            case 'reference':
                return value.toUpperCase();
        }
        
        return value;
    }}
/>
```

It is also possible to render React components directly, by returning them from this function.

```JSX
<DynamicDataTable
    dataItemManipulator={(field, value) => {
        switch(field) {
            case 'reference':
                return <ExampleComponent exampleProp={value} />;
        }
        
        return value;
    }}
/>
```

If you wish, you can dangerously render HTML directly by returning a string from the `dataItemManipulator`, you will 
however need to explicitly specify which fields this should be enabled for. This is done by using the 
`dangerouslyRenderFields` prop.

 ```JSX
 <DynamicDataTable
     dangerouslyRenderFields={['check']}
     dataItemManipulator={(field, value) => {
         switch(field) {
             case 'check':
                 return "<i class='fa fa-check'></i>";
         }
         
         return value;
     }}
 />
 ```

### Loading message & indicator

By default, the React Dynamic Data Table will not show indication that it is
loading. On slow connections, this may make the table appear unresponsive or 
sluggish when initialing loading, changing pages, re-ordering, and so on.

To show a loading message, you can set the `loading` prop to `true`. This will 
display a default loading message, which can be changed by altering passing
a string into the optional `loadingMessage` prop. If you wish, you can also 
pass a React component into the `loadingIndicator` prop, which will be displayed
above the textual loading message.

```JSX
<DynamicDataTable
    loading={true}
    loadingMessage="User data is now loading..."
    loadingIndicator={(
        <img src="/loading-animation.gif">
    )}
/>
```

Alternatively, if you wish to replace the entire table while data is being loaded, 
you can pass a React component into the `loadingComponent` prop.

```JSX
<DynamicDataTable
    loading={true}
    loadingComponent={(
        <p>I replace the table, not just the text inside it.</p>
    )}
/>
```

To display either of these options `loading` must be set to `true`. Note that the
AJAX Dynamic Data Table handles the loading prop internally but can be overriden.

### Error message

In the case that something goes wrong, such as data failing to load, you 
can display and error message in place of the normal React Dynamic
Data Table output.

In order to display an error message, you just need to set the optional
`errorMessage` prop. This prop expects a string such as `An error has occurred
while loading user data.`. If the error is resolved, this prop must be reset 
to an empty string in order to ensure the data table is displayed.

### Editable Columns

If you wish to make certain columns editable you can specify how using the `editableColumns` prop.
This prop accepts an array of object in the following format:

```js
[
    {
        name: 'ExampleColumnText',
        controlled: false,
        type: 'text',
        onChange: (event, column, row, index) => console.log(event, column, row, index),
    },
    {
        name: 'ExampleColumnSelect',
        controlled: false,
        type: 'select',
        onChange: (event, column, row, index) => console.log(event, column, row, index),
        optionsForRow: (row, column) => [
            {
                label: 'One',
                value: 1
             },
            {
                label: 'Two',
                value: 2
            }
        ]
}]
```

#### Text Inputs

If you specify that the type of the column is `text` the column will contain a text input with a value of the 
column from the row data.


#### Selects

If you wish to use a select instead of a text input you may specify `select` as the type. The column will now contain
a select input, by default with no options. In order to provide options implement the `optionsForRow` method.
This method will be called with: `The row data` and `Column name` in that order. It should return an array of objects
in this format:

```js
[
    {
        label: 'Example one',
        value: 1
    },
    {
        label: 'Example two',
        value: 2
    }
]
```

#### Receiving input

In order to receive the users input you can provide the `onChange` method that will be called when the input is changed.
This method will be called with the following parameters in the given order:
`The event from the input`, `The column name`, `The row data`, `The row index`.

#### Controlled and Uncontrolled inputs

A uncontrolled input is an input whose value is controlled by the DOM. This means that it cannot be modified
after the default value has been set by React. You will only receive input from the component and will not be able
to modify the displayed value.

A controlled input will require you to store the value of the input in the state, the value of the input will be
read from state meaning you will have to update state on user input to reflect it in component. In this case
it will mean you will have to alter the data passed in as the `rows` prop.

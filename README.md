# React Dynamic Data Table

[![npm version](https://badge.fury.io/js/%40langleyfoxall%2Freact-dynamic-data-table.svg)](https://badge.fury.io/js/%40langleyfoxall%2Freact-dynamic-data-table)

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
in the `rows` prop. To exclude specific fields, you can use the `excludeFields` props.

In the example below, the `email` field will be excluded.

```JSX
<DynamicDataTable 
    rows={this.state.users}
    excludeFields={['email']}
    />
```

The `excludeFields` prop expects an array of strings that represent the fields to exclude.

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
    }}
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

### Pagination

TODO

### Row buttons

TODO

### Bulk select checkboxes

TODO

### Bulk actions

TODO

### Loading message & indicator

TODO

### Error message

TODO

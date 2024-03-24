# set-filter



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                                          | Default     |
| ------------- | -------------- | ----------- | --------------------------------------------- | ----------- |
| `filterLabel` | `filter-label` |             | `string`                                      | `undefined` |
| `filterName`  | `filter-name`  |             | `string`                                      | `undefined` |
| `options`     | `options`      |             | `any[] \| string`                             | `undefined` |
| `placeholder` | `placeholder`  |             | `string`                                      | `undefined` |
| `type`        | `type`         |             | `"multi-select" \| "single-select" \| "text"` | `'text'`    |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `myFilterChange` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [my-text-field](../text-field)
- [my-select](../select/single-select)
- [my-multiselect](../select/multi-select)

### Graph
```mermaid
graph TD;
  my-set-filter --> my-text-field
  my-set-filter --> my-select
  my-set-filter --> my-multiselect
  my-multiselect --> my-checkbox
  style my-set-filter fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

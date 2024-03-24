# text-field



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type      | Default         |
| ------------- | ------------- | ----------- | --------- | --------------- |
| `caption`     | `caption`     |             | `string`  | `""`            |
| `disabled`    | `disabled`    |             | `boolean` | `false`         |
| `error`       | `error`       |             | `boolean` | `false`         |
| `icon`        | `icon`        |             | `string`  | `""`            |
| `label`       | `label`       |             | `string`  | `""`            |
| `optional`    | `optional`    |             | `boolean` | `false`         |
| `placeholder` | `placeholder` |             | `string`  | `"Placeholder"` |
| `required`    | `required`    |             | `boolean` | `false`         |
| `size`        | `size`        |             | `string`  | `'m'`           |
| `success`     | `success`     |             | `boolean` | `false`         |
| `value`       | `value`       |             | `string`  | `''`            |


## Events

| Event     | Description | Type                  |
| --------- | ----------- | --------------------- |
| `myInput` |             | `CustomEvent<String>` |


## Methods

### `reset() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [my-set-filter](../set-filter)

### Graph
```mermaid
graph TD;
  my-set-filter --> my-text-field
  style my-text-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

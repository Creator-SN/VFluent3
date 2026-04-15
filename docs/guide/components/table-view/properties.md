## Properties

---
| Property            | Type     | Required | Default               | Description                                     |
|:-------------------:|:--------:|:--------:|:---------------------:|:-----------------------------------------------:|
| modelValue          | object   | No       | {}                    | The component value used by v-model.            |
| i18n                | function | No       | (key) => key          | See the TableView `i18n` option.                |
| foreground          | string   | No       | 'rgba(0, 90, 158, 1)' | See the TableView `foreground` option.          |
| deleteColumnFunc    | function | No       | null                  | See the TableView `deleteColumnFunc` option.    |
| deleteRowsFunc      | function | No       | null                  | See the TableView `deleteRowsFunc` option.      |
| copyTableFunc       | function | No       | null                  | See the TableView `copyTableFunc` option.       |
| pastedTableFunc     | function | No       | null                  | See the TableView `pastedTableFunc` option.     |
| syncRowsFunc        | function | No       | null                  | See the TableView `syncRowsFunc` option.        |
| rightMenuBackground | string   | No       | ''                    | See the TableView `rightMenuBackground` option. |
| extensions          | array    | No       | []                    | See the TableView `extensions` option.          |
| theme               | string   | No       | 'global'              | See the TableView `theme` option.               |
| disabled            | boolean  | No       | false                 | See the TableView `disabled` option.            |
| lang                | string   | No       | "global"              | See the TableView `lang` option.                |

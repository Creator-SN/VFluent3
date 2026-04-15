---
page: true
title: Persona
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### Persona-DEMO
---

<script>
export default {
    data () {
        return {
            src: "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png",
            theme: false
        }
    }
}
</script>

<ClientOnly>

<fv-toggle-switch v-model="theme" on="Dark" off="Light"></fv-toggle-switch>

<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="24" status="online" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
</fv-Persona>
</ClientOnly>

```vue
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="24" :showInfo="true">
    <template v-slot:name>
        <p>Annie Lindqvist</p>
    </template>
</fv-Persona>
```

<ClientOnly>
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="32" status="online" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
</fv-Persona>
</ClientOnly>

```vue
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="32" :showInfo="true">
    <template v-slot:name>
        <p>Annie Lindqvist</p>
    </template>
</fv-Persona>
```

<ClientOnly>
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" status="away" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
<template v-slot:secondary>
    <p>Software Engineer</p>
</template>
</fv-Persona>
</ClientOnly>

```vue
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" status="away" :showInfo="true">
    <template v-slot:name>
        <p>Annie Lindqvist</p>
    </template>
    <template v-slot:secondary>
        <p>Software Engineer</p>
    </template>
</fv-Persona>
```


<ClientOnly>
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="48" status="busy" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
<template v-slot:secondary>
    <p>Software Engineer</p>
</template>
</fv-Persona>
</ClientOnly>

```vue
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="48" status="busy" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
<template v-slot:secondary>
    <p>Software Engineer</p>
</template>
</fv-Persona>
```


<ClientOnly>
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="56" status="offline" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
<template v-slot:secondary>
    <p>Software Engineer</p>
</template>
</fv-Persona>
</ClientOnly>

```vue
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="56" status="offline" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
<template v-slot:secondary>
    <p>Software Engineer</p>
</template>
</fv-Persona>
```


<ClientOnly>
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="72" status="ok" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
<template v-slot:secondary>
    <p>Software Engineer</p>
    <p>In a meeting</p>
</template>
</fv-Persona>
</ClientOnly>

```vue
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="72" status="ok" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
<template v-slot:secondary>
    <p>Software Engineer</p>
    <p>In a meeting</p>
</template>
</fv-Persona>
```


<ClientOnly>
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="100" status="dnd" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
<template v-slot:secondary>
    <p>Software Engineer</p>
    <p>In a meeting</p>
    <p>Available at 4:00pm</p>
</template>
</fv-Persona>
</ClientOnly>

```vue
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="100" status="dnd" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
<template v-slot:secondary>
    <p>Software Engineer</p>
    <p>In a meeting</p>
    <p>Available at 4:00pm</p>
</template>
</fv-Persona>
```


<ClientOnly>
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="120" status="blocked" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
<template v-slot:secondary>
    <p>Software Engineer</p>
    <p>In a meeting</p>
    <p>Available at 4:00pm</p>
</template>
</fv-Persona>
</ClientOnly>

```vue
<fv-Persona :src="src" :theme="theme ? 'dark' : 'light'" size="120" status="blocked" :showInfo="true">
<template v-slot:name>
    <p>Annie Lindqvist</p>
</template>
<template v-slot:secondary>
    <p>Software Engineer</p>
    <p>In a meeting</p>
    <p>Available at 4:00pm</p>
</template>
</fv-Persona>
```


<ClientOnly>
<fv-Persona :theme="theme ? 'dark' : 'light'" size="120" name="Annie Lindqvist" :showInfo="true">
<template v-slot:secondary>
    <p>Software Engineer</p>
    <p>In a meeting</p>
    <p>Available at 4:00pm</p>
</template>
</fv-Persona>
</ClientOnly>

```vue
<fv-Persona :theme="theme ? 'dark' : 'light'" size="120" name="Annie Lindqvist" :showInfo="true">
<template v-slot:secondary>
    <p>Software Engineer</p>
    <p>In a meeting</p>
    <p>Available at 4:00pm</p>
</template>
</fv-Persona>
```


### 属性
---
| 属性       | 类型    | 必填  | 默认值   | 说明                                                             |
|:----------:|:-------:|:-----:|:--------:|:----------------------------------------------------------------:|
| src        | string  | 否    | ''       | Persona图像资源链接。                                            |
| name       | string  | 否    | ''       | 名称。                                                           |
| size       | number  | 否    | 40       | Persona头像大小。                                                |
| status     | string  | 否    | ''       | Persona状态。                                                    |
| icon       | string  | 否    | ''       | 自定义状态图标。                                                 |
| iconColor  | string  | 否    | ''       | 自定义状态图标前景色。                                           |
| background | string  | 否    | ''       | 自定义状态图标背景色。                                           |
| showInfo   | boolean | 否    | false    | 是否显示信息。                                                   |
| theme      | string  | 否    | 'global' | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled   | boolean | 否    | false    | 参见组件的 `disabled` 选项。                                     |
| lang       | string  | 否    | "global" | 参见组件的 `lang` 选项。                                         |

### 插槽
---

1. Name

你可以直接在属性中指定`name`, 当使用模板时Persona将检测不到名称缩写

```vue
<template v-slot:name>
    <p></p>
</template>
```

2. Secondary

```vue
<template v-slot:secondary>
    <p></p>
</template>
```

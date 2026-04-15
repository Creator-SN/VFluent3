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


### Properties
---
| Property   | Type    | Required | Default  | Description                                                              |
|:----------:|:-------:|:--------:|:--------:|:------------------------------------------------------------------------:|
| src        | string  | No       | ''       | See the Persona `src` option.                                            |
| name       | string  | No       | ''       | See the Persona `name` option.                                           |
| size       | number  | No       | 40       | See the Persona `size` option.                                           |
| status     | string  | No       | ''       | See the Persona `status` option.                                         |
| icon       | string  | No       | ''       | See the Persona `icon` option.                                           |
| iconColor  | string  | No       | ''       | See the Persona `iconColor` option.                                      |
| background | string  | No       | ''       | See the Persona `background` option.                                     |
| showInfo   | boolean | No       | false    | See the Persona `showInfo` option.                                       |
| theme      | string  | No       | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled   | boolean | No       | false    | See the Persona `disabled` option.                                       |
| lang       | string  | No       | "global" | See the Persona `lang` option.                                           |

### Slots
---

1. Name



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

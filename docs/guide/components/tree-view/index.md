---
page: true
title: TreeView
---


<!-- lang-switch -->
<script>
  export default {
    data() {
        return {
            theme: 0,
            backgroundColorHover: 'rgba(0, 200, 247, 0.1)',
            backgroundColorActive: 'rgba(0, 204, 153, 0.1)',
            foregroundColor: 'rgba(145, 145, 235, 1)',
            files: [
                {
                    label: 'Img Folder',
                    icon: 'https://img.icons8.com/bubbles/2x/folder-invoices.png',
                    loading: true,
                    children: [
                        {
                            label: 'Folder',
                            icon: 'Folder',
                            expanded: true,
                            children: [
                                {
                                    label: 'File',
                                    icon: 'FileCode'
                                },
                                {
                                    label: 'File',
                                    icon: 'FileCode'
                                }
                            ]
                        },
                        {
                            label: 'File',
                            icon: 'FileCode'
                        },
                        {
                            label: 'File',
                            icon: 'FileCode',
                            disabled: true
                        },
                        {
                            label: 'No Drop Inside',
                            icon: 'Error',
                            dropInside: false
                        }
                    ]
                },
                {
                    label: 'File',
                    icon: 'FileCode'
                },
                {
                    label: 'Cascade',
                    icon: 'https://img.icons8.com/bubbles/2x/folder-invoices.png',
                    children: [
                        {
                            label: 'Cascade2',
                            icon: 'Folder',
                            children: [
                                {
                                    label: 'Cascade3',
                                    icon: 'FileCode',
                                    children: [

                                    ]
                                },
                                {
                                    label: 'File',
                                    icon: 'FileCode',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        $theme() {
            return !this.theme ? 'light' : 'dark';
        }
    },
    mounted() {
        
    },
    methods: {
        alert(text) {
            alert(text);
        },
        click(item) {
            console.log(item);
        },
        addChildren() {
            let item = this.files[0].children[0];
            let temp = [];
            for (let i = 0; i < 20; ++i) {
                temp.push(Object.assign({}, item.children[0]));
            }
            item.children = temp;
        },
        expand() {
            let item = this.files[0].children[0];
            item.expanded = !item.expanded;
        },
        dropItem (event) {
            let { root, drop, dropParent, drag, dragParent, mode } = event;
            if (mode === 'enter') {
                if(!drop.children)
                    drop.children = [];
                drop.children.push(drag);
                let dragParentChildren = dragParent ? dragParent.children : root;
                dragParentChildren.splice(dragParentChildren.indexOf(drag), 1);
            } else {
                let dropParentChildren = dropParent ? dropParent.children : root;
                const index = dropParentChildren.indexOf(drop);
                dropParentChildren.splice(index, 0, drag);
                let dragParentChildren = dragParent ? dragParent.children : root;
                dragParentChildren.splice(dragParentChildren.indexOf(drag), 1);
            }
        }
    }
};
</script>


### TreeView-DEMO
---

<ClientOnly>
<fv-button style="width: 250px; margin: 5px 0px;" @click="addChildren">Add Child for Img Folder/Folder</fv-button>
<fv-button style="width: 250px; margin: 5px 0px;" @click="expand">Expand Img Folder/Folder</fv-button>
<fv-TreeView v-model="files" style="width:200px" :viewStyle="{backgroundColor:'transparent'}" background="transparent">
</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView v-model="files" style="width:200px" :viewStyle="{backgroundColor:'transparent'}" background="transparent">
</fv-TreeView>
```

### TreeView Draggable
---

<ClientOnly>
<fv-TreeView v-model="files" :draggable="true" @click="click" @drop-item="dropItem">
</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView v-model="files" :draggable="true" @click="click" @drop-item="dropItem">
</fv-TreeView>
```



```javascript
dropItem (event) {
    let { root, drop, dropParent, drag, dragParent, mode } = event;
    if (mode === 'enter') {
        if(!drop.children)
            drop.children = [];
        drop.children.push(drag);
        let dragParentChildren = dragParent ? dragParent.children : root;
        dragParentChildren.splice(dragParentChildren.indexOf(drag), 1);
    } else {
        let dropParentChildren = dropParent ? dropParent.children : root;
        const index = dropParentChildren.indexOf(drop);
        dropParentChildren.splice(index, 0, drag);
        let dragParentChildren = dragParent ? dragParent.children : root;
        dragParentChildren.splice(dragParentChildren.indexOf(drag), 1);
    }
}
```

### TreeView Checkable
---
<ClientOnly>
<fv-TreeView v-model="files" :checkable="true" expandedIconPosition="right" @click="click">
</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView v-model="files" :checkable="true" expandedIconPosition="right" @click="click">
</fv-TreeView>
```

### Slots

<ClientOnly>
<fv-TreeView v-model="files" style="width:200px">
  <template v-slot:default="prop">
    {{prop.item.label}}
  </template>
</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView v-model="files" style="width:200px">
  <template v-slot:default="prop">
    {{prop.item.label}}
  </template>
</fv-TreeView>
```

### TreeView Customize and Draggable
---

backgroundColorHover:
<ClientOnly>
<fv-callout>
    <div :style="{width:'20px', height:'20px', backgroundColor:backgroundColorHover}" style="border:2px solid rgba(200, 200, 200, 0.3); border-radius: 6px;" />
    <main>
    <fv-colorPicker v-model="backgroundColorHover" style="width:500px"/>
    </main>
</fv-callout>
</ClientOnly>

backgroundColorActive:
<ClientOnly>
<fv-callout>
    <div :style="{width:'20px', height:'20px', backgroundColor:backgroundColorActive}" style="border:2px solid rgba(200, 200, 200, 0.3); border-radius: 6px;" />
    <main>
    <fv-colorPicker v-model="backgroundColorActive" style="width:500px"/>
    </main>
</fv-callout>
</ClientOnly>
foregroundColor:
<ClientOnly>
<fv-callout>
    <div :style="{width:'20px', height:'20px', backgroundColor:foregroundColor}" style="border:2px solid rgba(200, 200, 200, 0.3); border-radius: 6px;" />
    <main>
    <fv-colorPicker v-model="foregroundColor" style="width:500px"/>
    </main>
</fv-callout>
</ClientOnly>


<ClientOnly>
<fv-TreeView
  :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :backgroundColorHover="backgroundColorHover"
  :backgroundColorActive="backgroundColorActive"
  leftIconForeground="black"
  :foreground="foregroundColor"
  :draggable="true" 
  expandClickMode="normal"
  :space="10">
</fv-TreeView>
</ClientOnly>

``` vue 
<fv-TreeView
  :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :backgroundColorHover="backgroundColorHover"
  :backgroundColorActive="backgroundColorActive"
  leftIconForeground="black"
  :foreground="foregroundColor"
  :draggable="true" 
  expandClickMode="normal"
  :space="10">
</fv-TreeView>
```

### Properties

---

| Property              | Type    | Required | Default               | Description                                         |
|:---------------------:|:-------:|:--------:|:---------------------:|:---------------------------------------------------:|
| modelValue            | array   | No       | []                    | Data. See the data section for details.             |
| draggable             | boolean | No       | false                 | Whether items are draggable.                        |
| checkable             | boolean | No       | false                 | Whether items are checkable.                        |
| space                 | number  | No       | 20                    | See the TreeView `space` option.                    |
| foreground            | string  | No       | 'rgba(0, 90, 158, 1)' | Foreground color.                                   |
| expandedIcon          | string  | No       | 'ChevronDownSmall'    | See the TreeView `expandedIcon` option.             |
| unexpandedIcon        | string  | No       | 'ChevronRightSmall'   | See the TreeView `unexpandedIcon` option.           |
| backgroundColorHover  | string  | No       | ''                    | See the TreeView `backgroundColorHover` option.     |
| backgroundColorActive | string  | No       | ''                    | See the TreeView `backgroundColorActive` option.    |
| itemHeight            | number  | No       | 30                    | Item height.                                        |
| showLoading           | boolean | No       | false                 | Whether to show a progress indicator while loading. |
| expandedIconPosition  | string  | No       | 'left'                | Expand arrow position.                              |
| expandClickMode       | string  | No       | 'normal'              | Expand trigger mode.                                |
| theme                 | string  | No       | 'global'              | Theme color.                                        |
| disabled              | boolean | No       | false                 | See the TreeView `disabled` option.                 |
| lang                  | string  | No       | "global"              | See the TreeView `lang` option.                     |

### Events
---

| Event           | Arguments                                          | Description                                                              |
|:---------------:|:--------------------------------------------------:|:------------------------------------------------------------------------:|
| click           | item                                               | Emitted when an item is clicked. The first argument is the clicked item. |
| drop-item       | \{root, drop, dropParent, drag, dragParent, mode\} | See the component `drop-item` option.                                    |
| item-drag-over  | \{root, drop, dropParent\}                         | Emitted when the dragged item enters the current item.                   |
| item-drag-leave | \{root, drop, dropParent\}                         | Emitted when the dragged item leaves the current item.                   |
| item-drop       | \{root, drop, dropParent\}                         | Emitted when an item is dropped on the current item.                     |


### Slotss
---

1. TreeItem





```vue
<template v-slot:default="x">
  {{x.item.label}}
</template>
```

### Data
---

1. value





``` javascript
value = [{label: '', icon: '', disabled: '', children: [], expanded: false, selected: false, loading: false, dropInside: true, show: true}]

[
    {
        label: 'Img Folder',
        icon: 'https://img.icons8.com/bubbles/2x/folder-invoices.png',
        children: [
            {
                label: 'Folder',
                icon: 'Folder',
                expanded: true,
                children: [
                    {
                        label: 'File',
                        icon: 'FileCode'
                    },
                    {
                        label: 'File',
                        icon: 'FileCode'
                    }
                ]
            },
            {
                label: 'File',
                icon: 'FileCode'
            },
            {
                label: 'File',
                icon: 'FileCode',
                disabled: true
            },
            {
                label: 'No Drop Inside',
                icon: 'Error',
                dropInside: false
            }
        ]
    },
    {
        label: 'File',
        icon: 'FileCode'
    },
    {
        label: 'Cascade',
        icon: 'https://img.icons8.com/bubbles/2x/folder-invoices.png',
        children: [
            {
                label: 'Cascade2',
                icon: 'Folder',
                children: [
                    {
                        label: 'Cascade3',
                        icon: 'FileCode',
                        children: [

                        ]
                    },
                    {
                        label: 'File',
                        icon: 'FileCode',
                        disabled: true
                    }
                ]
            }
        ]
    }
]
```

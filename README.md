<p align="center">
  <img src="https://raw.githubusercontent.com/aleversn/VFluent/master/examples/assert/logo/VFluent.png"/>
</div>

<p align="center">
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
    </a>
    <a href="">
      <img src="https://img.shields.io/npm/dw/@creatorsn/vfluent3">
    </a>
</p>

## Fluent UI Components based on Vite

This repository provides a library of components based on [Microsoft's Fluent Design System](https://developer.microsoft.com/en-us/fluentui#/). We did our best to implement styling (such as the `Acrylic` and `Reveal` effects) of native system's (Windows 11/Windows 10) components on the Web.

### Fluent Design UI (Vue 3)

#### DOCS

[https://creator-sn.github.io/VFluent3/](https://creator-sn.github.io/VFluent3/)

#### How to use

``` sh
pnpm i @creatorsn/vfluent3
```

#### Dev

1. download node and pnpm   
    [node](https://nodejs.org/en/)
    [pnpm](https://pnpm.io/)
2. install dependencies  
   ```sh
    pnpm i
   ```
3. create new component
   ``` sh
    pnpm bin:new
   ```
4. develop with vitepress
   ``` sh
    pnpm docs:dev
   ``` 

#### About Fabric UI

Our project have many using cases contains Microsoft's Fabric UI, such as icons and shadows, for more details you can click <a href="https://developer.microsoft.com/en-us/fabric#/styles">here</a> to get more information.

Here is the icon using sample.

```vue
<i class="ms-Icon ms-Icon--AADLogo"></i>
```

In particular, if you're using a component of Fluent Vue Design and it contains a prop that support icon, you only need to type the icon's name in prop.

**We have updated the new Windows 11 Fluent Icons, Check the Icon Dictionary on <a href="https://docs.microsoft.com/en-us/windows/apps/design/style/segoe-fluent-icons-font">here</a>.**

### ✨ We Need You (Become a contributor) ✨

VFluent still needs to improve. The documentation is not yet complete, there are still some details to work out.

We want to hear from your issues and suggestions. It's welcome to have you become a contributor in this project. You could add some new components to VFluent, or update the existing components to better support the mobile end.

If you have some other creative ideas, we're happy to hear them from you.

### License

MIT License

Copyright (c) 2022 Creator SN®

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

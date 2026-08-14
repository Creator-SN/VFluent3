## Properties

---
| Property | Type | Required | Default | Statement |
|:--------:|:----:|:--------:|:-------:|:----------|
| forward | string | No | 'right' | Scrolling direction. Supports `right`, `left`, `horizontal`, `down`, `up`, and `vertical`. |
| mode | string | No | 'once' | Playback mode. Supports `once`, `repeat`, `bounce`, `loop`, and `none`. |
| duration | number | No | 3000 | Duration of one scroll, in milliseconds. |
| delay | number | No | 0 | Delay before the animation starts, in milliseconds. |
| interval | number | No | 1000 | Pause between repeated or bounced cycles, in milliseconds. |
| offset | number / string | No | null | Scroll travel distance in pixels. When `null`, the full overflow distance is used automatically. Set `0` to disable scrolling. |
| ease | string | No | 'power1.inOut' | GSAP easing used for the scroll animation. |
| manual | boolean | No | false | Whether the mouse / touch can scroll manually. Manual scrolling is always disabled while auto scrolling is active. |
| theme | string | No | 'global' | Theme style. Supports `global`, `light`, `dark`, and `custom`. |
| disabled | boolean | No | false | Whether the component is disabled. |
| lang | string | No | "global" | Language option. |

## 内置 class 类名

### 基础类

```scss
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}

.bolder {
  font-weight: bolder;
}

.inline-flex {
  display: inline-flex;
}
.flex {
  display: flex;
}

.flex-col,
.flex-column {
  display: flex;
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-nowrap {
  flex-wrap: nowrap;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-1 {
  flex: 1;
}
.flex-auto {
  flex: auto;
}
.flex-none {
  flex: none;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.flex-shrink-1 {
  flex-shrink: 1;
}

.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.justify-around {
  justify-content: space-around;
}

.items-start {
  align-items: flex-start;
}
.items-end {
  align-items: flex-end;
}
.items-center {
  align-items: center;
}
.items-baseline {
  align-items: baseline;
}
.items-stretch {
  align-items: stretch;
}

.h-100,
.h-full {
  height: 100%;
}
.w-100,
.w-full {
  width: 100%;
}

.overflow-hidden {
  overflow: hidden;
}
.overflow-auto {
  overflow: auto;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### 业务扩展类

```css
.scroll-hover {
  overflow: auto;
  height: 100%;
  position: relative;
  scrollbar-gutter: stable;
  margin: 4px;
  padding-inline: 4px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #595a5a !important;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: rgba(144, 147, 153, 0.3);
  }
}

.jl-rotate {
  transition: transform 200ms;
  transform: rotate(180deg);
}
```

---
title: Block Builder
published: May 2, 2021
type: 'project'
pending: true
---

# Block Builder

Public demo - [blockbuilder.app](https://blockbuilder.app/)
Github repo - [https://github.com/garrettbland/blockbuilder](https://github.com/garrettbland/blockbuilder)

I use [Tailwind CSS](https://tailwindcss.com/) with pretty much every project now days. Something I miss about using wordpress, is the nice visual editors like [Divi](https://www.elegantthemes.com/gallery/divi). I decided to build a visual tailwind website builder.

### Version 1

A few years ago, I had an idea for a website builder. The gist of it was, to browse through a list of components, drag and drop to a preview on the side, and then customize the text and images in the next step. I started developing this in [Vue](https://vuejs.org/) and had a decent product. I was using the `contenteditable` api which was pretty messy and not super reliable across browsers. This also didn't allow for a ton of customization, and most of the work would have to be done up front design and developing blocks.

### Version 2

Eventually I decided I wanted something more robust and customizable. I really wanted a designer like Divi, but with nice clean Tailwind classes. I used Divi for a lot of inspiration, and dove into a full rebuild using [React](https://reactjs.org/)

### Clean code & exportable

When I started building, I had a lot on my to-do list to get done. There were a lot of features that I wanted to build, but some of the most important ones were that I wanted the HTML to be clean, and to let users export everything without lock in.

Taking some inspiration from block text editors, I decided to build a site structure with the following format.

```javascript
let blocks = [
    {
        id: '1234',
        type: '',
        tag: '',
        data: {
            alt: '',
            src: '',
        },
    },
]
```

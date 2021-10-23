---
active: true
title: Use Page Offset React Hook
id: use-page-offset-react-hook
---
Who doesn't love a nice parallax effect on a website. I use React a lot at work and for personal projects. A cool scrolling background effect always adds some extra pizzaz.

I created a re-usable package across my react project using Hooks, that would easily allow this. [Click here (https://use-page-offset.netlify.app/)](https://use-page-offset.netlify.app/) to checkout the demo page and documentation.

Here is an example of implementation. The hooks primary job is to track the windows \`pageYOffset\`.

```javascript
import { usePageOffset } from "use-page-offset"

const App = () => {
  const offset = usePageOffset()
  const parallaxSpeed = 3
  return (
    <div className="relative py-64 bg-red-500 overflow-hidden">
    <div
      className="absolute top-0 left-0 w-full h-full object-cover z-10"
      style={{
        transform: 'translate(0px, ${offset / parallaxSpeed}px)',
        backgroundImage: 'url("https://via.placeholder.com/1200x400")',
      }}
    ></div>
    <div className="text-center relative z-20">
      <h1 className="text-5xl font-bold pb-4 text-blueGray-800">
        Text Overlay
      </h1>
    </div>
  </div>
  )
}

export default App
```
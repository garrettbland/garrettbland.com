---
active: false
title: Starting a site review tool
published: 2020-07-12
category: general
id: starting-a-site-review-tool
---

Github Repo: [https://github.com/garrettbland/site-review-tool](https://github.com/garrettbland/site-review-tool)

Live Site: [https://site-review-tool.netlify.app/](https://site-review-tool.netlify.app/)

### So I had an idea

I'm always on the lookout for pain points during my day to day life as a web developer. Often when we are wanting to get feedback for a new website, it's always challenging asking the right questions. I've been guilty of just sending the client the current dev environment URL, and just asking "Do you like it"?

This puts a lot of the burden on the client. They aren't designers, this isn't their specialty, they shouldn't get super challenging questions. I thought of creating a little tool to send clients a screenshot, and asking them specific questions.

I wired up this mockup in Sketch to see how it would look like, and then setup a new React app. I wanted the user interface to be extremely simple, and easy to navigate.

I also wanted to give a illustration element, to let clients draw over a screenshot if they prefer to express their thoughts that way.

![/images/site-review-tool.png](/images/site-review-tool.png)

I used this great library, [react-canvas-draw](https://github.com/embiem/react-canvas-draw), to setup the HTML5 Canvas element. The library has lots of great options to customize color, saving and loading, undo, & more. I added in some React Hooks to allow the color to be customized.

When it came to styling, I used the best thing ever, TailwindCSS. It was super quick to setup a grid, and styled a few elements and had a working example setup in no time.

The site is currently hosted on Netlify, with no plans to change that.

### Current Status

Currently its not setup for actual client use yet. There are a handful of minimal things I want to setup before that happens. Mainly setting up the form from the designer or developer side, along with a few other things & ideas.

-   Setup Firebase for data management
-   Setup AWS Lambda (Netlify Serverless) functions to handle server side functionality
-   File upload for screenshots
-   Review expiration period
-   Auto delete uploads after X amount of days
-   Chrome plugin to grab current screen and automatically send

No end date in sight, or really much idea for the future of the tool. Just something I've been noodling lately.

---
active: false
title: Moving my site to Next.js
published: 2021-01-12
category: general
id: moving-my-site-to-next-js
---

Edit: This isn't the case anymore - I went back to 11ty

Currently, my site is powered by [Eleventy](https://www.11ty.dev/), which is a very very cool static site generator. I actually made an eleventy github template ([Eleventy Kit](https://eleventykit.netlify.app/)) that I use frequently for work projects.

However, I've been finding myself using [Next.js](https://nextjs.org/) more and more for projects, and [Netlify's](https://www.netlify.com/) integration is just stupid easy. I also love [React](https://reactjs.org/), and using react components is much more native feeling than using a templating engine like [Liquid](https://shopify.github.io/liquid/). I also love the ability to natively run Next SSR with serverless for any server side processing or SEO benefits. So, I decided its time to migrate over. I'm going to walk through my process of moving over my kinda-janky-website-setup to Next.

### Clean up time

Originally I had built my site with Eleventy and a custom webpack config so I could setup playdates with other packages like [Vue](https://vuejs.org/) and [Svelte](https://svelte.dev/). I had planned on running a lot of experiments and such with multiple frameworks, but I'm going to remove them now. Any time I want to write about another framework, I'll use [Code Sandbox](https://codesandbox.io/). I really want to focus more on writing about my development adventures and code examples. I'm also going to remove google analytics and move to another solution.

### New branch time

Anytime I go through a large overhaul (in my mind) I like to create a new branch. Just incase I mess things up _horribly_, I can always nuke it and start over. I'm elegantly calling my new branch `nextjs`. Now I'll throw everything in the current directory (except for the git stuff & package.json), into a new directory named `_old`.

### Setting up Next

Now I have a fresh empty repo, I'm going to uninstall all packages from my `package.json`. Definitely not needed, but it just works cleaner in my mind that way. I also know that I will have different scripts I will be runnings with Next, so I'll remove all of those as well.

_Next_ up is actually installing Next (😃 get it). I'll just follow their setup instructions to manually install. I'll also follow their instructions to setup the proper script and to create a `tsconfig.json` file, so I can use [Typescript](https://www.typescriptlang.org/).

### Installing dependencies

Since I'll be using Typescript, I'll need to install a few different `type` packages as well as Typescript itself. I'll also be using the amazing TailwindCSS, along with their new JIT compiler. A few other tools will be thrown in like Prettier & PostCSS as well.

```bash
npm install tailwindcss @tailwindcss/jit typescript @types/node @types/react autoprefixer postcss prettier -D
```

Along with these, I'll also setup a few configs for postcss, prettier, nextjs, netlify, etc for preferences along with the initial page and the tailwind imports. Finally I'll run `npm run dev` to make sure everything is setup correctly and I can load up my new bare site.

### Making it look pretty

Since I'm mostly happy with how my site looks for now, I'll keep all of the same styling and setup components for the layout, pages, header, etc. Its all tailwind, so its mainly just a bunch of making sure its proper JSX, making sure to test the dev site along the way to make sure its all going good.

### Now for the markdown

I enjoy writing my posts in markdown, just to keep it looking minimal and nice. Currently my few posts are written in markdown, so I need to setup a way to parse the markdown and use it within my next app.

I just ended up following [this blog post](https://www.netlify.com/blog/2020/05/04/building-a-markdown-blog-with-next-9.4-and-netlify/) from Netlify to setup parsing the markdown. I also moved all posts into a single directory, and will start giving my projects and posts different types. That way its a little neater to store everything in one place for my writing.

### Fixing code examples

My code examples using PrismJS are giving me issues. Somewhere in the markdown to converting to code isn't the same as it was with Eleventy. I had a decent amount of trouble the first time wit Prism, so this might be challenging.

After reading through the docs, all I need to do is apply the highlighting after the `DOM` has mounted. So I setup the Prism highlight function in a `useEffect` hook. I also brought in Fira Code from google analytics, because that's also what I use in my local IDE.

```js
useEffect(() => {
    prism.highlightAll()
}, [])
```

### Wrapping up

Now the last little bit is just me going through and updating little things here and there. I've noticed a lot of things I plan on upgrading and fixing, but for now I have the site transferred over to Next, and I'll merge the branch with `master` to make it official.

Did run into issues with some typing as I have `strict: true` in my `tsconfig.json`. I had to install the correct webpack typings.

```bash
npm i @types/webpack-env -D
```

I also ran into some issues with node versions in netlify and not having the needed functionality in Node v14.x.x. I had to go into the netlify UI and add an environment variable for `NODE_VERSION` equal to `14`

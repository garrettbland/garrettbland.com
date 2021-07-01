---
active: true
title: My vision for a bolt-on CMS using Firebase
published: 2021-07-01
category: general
id: my-vision-for-a-bolt-on-cms-using-firebase
---
Another content management system - _I know_. There are thousands of content management systems out there in the world. I want to build something where I can install to any react project, plug in my [Firebase](https://firebase.google.com/) config, and easily customize a dashboard for a client to edit their data.

### What about Headless CMS's or Wordpress?

I've tested out [Sanity](https://www.sanity.io/), [Contentful](https://www.contentful.com/), and most recently [Directus](https://directus.io/). They are all very good and flexible, but all just miss the mark in a few areas. I've used [Wordpress](https://wordpress.org/) extensively in the past for client websites, and still support a lot of installs.

The headless CMS's have a decent price tag, which is okay, because the data and hosting is covered by them. With Directus, I installed on my own and threw it on a [Digital Ocean](https://www.digitalocean.com/) droplet. (They also offer a managed version) Works super well, and the permission customization is crazy cool. However, its still dependent on me managing a server, and I'm no system engineer and want to be totally serverless. I also had a few issues with their WYSIWYG editor. It works, but with our clients we needed something extremely simple.

### Firebase to the rescue

I use firebase for a lot of projects in production, and I just love it. The authentication is silly easy, piping data to firestore and retrieving is very easy, and it even has file storage & serverless functions. There are other competitors I may look into in the future such as [supabase](https://supabase.io/).

### Why not build a headless CMS instead?

There are tons of benefits of having a centralized headless CMS for all my clients to log into.

-   One place to manage a dashboard for all clients
-   One point of failure if something goes wrong or needs fixed
-   Updating the dashboard means just updating once

However, there are some benefits of using a bolt on CMS that you just install as a standalone package.

-   Extremely customizable between each site
-   Can be open sourced and others can easily add a CMS to their site with their own firebase account
-   Native SDK's can be utilized from firebase for authentication/firestore/media/cloud functions

### My vision for a bolt on CMS

In my mind, I'm envisioning creating an open source project that can be installed into any React project like below.

```bash
npm install @garrettbland/firebase-cms
```

Installing this project would come with firebase and react-router so you could customize the URL to where the dashboard would be. I think initializing the project from the top level would be the best way to make sure the entire project had the correct access. Something like below in a Next project in `_app.tsx`. I would also want the CMS to be pretty customizable from a declarative config, such as below.

```javascript
import { AppProps } from 'next/app'
import { FirebaseCMS } from '@garrettbland/firebase-cms'

// Set config here for basic options as well as customizing the CMS
// In this example, I have an object in the content array with a label
// and the fields that will be present.
const config = {
    dashboard_url: '/admin',
    api_key: 'ds239sdhj239sd23',
    content: [
        {
            label: 'Posts',
            fields: [
                {
                    title: 'Post Title',
                    type: 'text',
                },
                {
                    title: 'Body',
                    type: 'rich-text-editor',
                },
                {
                    title: 'Featured Image',
                    type: 'image',
                },
            ],
        },
    ],
}

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <FirebaseCMS config={config}>
            <Component {...pageProps} />
        </FirebaseCMS>
    )
}

export default MyApp
```

### Final thoughts

Anyways, thats my idea and I think this would be awesome and add lots of flexibility for clients to log in and quickly edit their content. There are still quite a few issues I still need to work out, and lots of ideas I have for it.

-   **Image compression and resizing**. For example, a client logs in and wants to update images in a gallery. They upload 10 new photos and go about their day. Naturally these images will be big AF, and will eat up space and be expensive. After uploading, I could setup a cloud function to automatically resize and compress, and then replace that image. Saving money and making the site quicker for the client.
-   **Data Integrity and permissions**. For right now, I'm thinking about using the same firebase projects for multiple clients. I will obviously want to figure out the cleanest way to make sure clients only have access to their data. Also another thought, if the developer removes some fields or edits the content config, how do I deal with that.
-   **Search**. Thinking about the past CMS's I've created, searching was always an annoying thing I never had a good solution for. I've used Postgres's and Mysql's built in search, but it never works extremely well. [Algolia](https://www.algolia.com/) is a well known solution, but that just adds in another variable. So, not sure how to handle this yet. Could just setup local filtering after pulling in the data and not actually 'search'.
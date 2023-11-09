---
active: false
title: Work Hays 2.0
id: work-hays-2-0
---

About a year and half ago, I rebuilt and took over this local job postings website in Node, Express, and TailwindCSS. Fast forward to now, and there are a lot of things I wish I would have done differently, so I am currently in progress of building version 2.0 of [Work Hays](https://workhays.com/). [Click here](https://www.garrettbland.com/projects/work-hays/) to read about the original rebuild.

## So version 2.0

For version 2.0, there are some big things I want to change. Here are my big goals for the update.

-   Totally serverless (move to a hybrid static/serverless model)
-   Move to Firestore from MySQL
-   Migrate Authentication to a third party provider

### Going Serverless

Coming Soon

### Moving from SQL to NoSQL

When I first rebuilt the job site, I really wanted to keep the same database structure and schema as close as possible to what it currently was. This has worked so far to keep old job postings and archived data, but hasn't allowed for a whole lot of flexibility. A big feature and pain point that kept coming up in support emails, was that employers would like to have multiple users.

This can be done using pivot tables and storing user id's as arrays, but it just seemed clunky to me to keep that specific schema going. So for the upgrade, I am moving to Firestore for our data.

### Migrating Authentication

Coming Soon

---
pageTitle: Work Hays
---

# Work Hays

_Published May 16, 2020 - Updated May 31, 2020_

[https://workhays.com](https://workhays.com/)

### Short version first

Work Hays is a job listings website for our local community in Hays, KS. It allows employers to login and post jobs for free, and allows job seekers to search jobs and contact employers.

### What was it built with?

Built with NodeJS, Express, EJS, Apline JS, TailwindCSS, Sequelize, MySQL

### Why build a jobs site?

My wife is a manager in Human Resources in the area, and often talked about the previous popular job listings site for Hays, Hays Has Jobs, and the many things it was lacking. Some of these qualities were...

-   Mobile friendly
-   Outdated site UI
-   Clunky backend to for employers to manage jobs
-   Key missing features like ability to simply renew a job

Myself, being an inspiring entrepreneur, finally saw this as an opportunity. I had the knowledge to build something like this, and was completely achievable. Only problem, was that the current jobs site was used by everyone and had a well known name in our community.

### Idea Validation

I’ve read many books, listened to tons of podcasts, read many articles and lurk [indiehackers](https://www.indiehackers.com/) daily for all things entrepreneur. All of them have a similar message - **_validate as early as possible_**

### Actually Validating the Idea

The first thing I did was look at the current jobs site, and I found that they had an employee directory. A decent amount of businesses had their emails listed. The source code was super wonky, so unfortunately I couldn't use any scraping tools. I just had to roll up my sleeves and do it manually by copying the emails and contact info into a spreadsheet.

Next I sent out an email (in multiple waves so it wouldn’t come across as spam) from my personal email account, telling them my idea to create a new jobs site, and asking if they would be interested in posting their jobs to our site as well.

The next day, I started getting tons of replies saying they would. I have started countless app ideas and websites in the past, without doing any sort of validation (and just diving right into code), so this was a huge win for me and my confidence.

A few days later and many yes’s, I received an email from the current organization who ran the former jobs site, saying they would like to actually hand the keys over to us. This was very unexpected, but amazing news. My business partner and I worked closely with the organization during the transition, and it was a wonderful experience.

### Enough business, get to the tech stuff

Before I started in on any code, we talked about what we needed the site to achieve. We knew we had to have the following

-   Mobile friendly
-   Simple backend for employers
-   Fantastic SEO optimization

We felt these things were a priority to gain traffic and keep the employers posting jobs. I have used single page application (SPA’s) like React and Vue in the past, but I reached for a traditional server side rendered (SSR) framework instead for a smoother SEO experience. This is the tech stack I decided to go with.

-   [Node JS](https://nodejs.org/en/) - Server code
-   [Express](https://expressjs.com/) - Web application framework
-   [EJS](https://ejs.co/) - Server side javascript templating engine
-   [Alpine JS](https://github.com/alpinejs/alpine) - Front end javascript
-   [Tailwind CSS](https://tailwindcss.com/) - CSS framework
-   [Sequelize](https://sequelize.org/) - ORM for node.
-   [MySQL](https://www.mysql.com/) - Relational database
-   Others such as postcss, webpack, babel, moment, ect

We also used other services such as GitHub for code management, Mailgun for automated emails, and Digital Ocean for the simplicity for our web hosting. We use cloud flare for our content delivery network and for potential DDoS attacks.

### Key features I’ll brag out because I’m proud

Viewing job and job details on the front end is very straight forward and nothing complicated there. Some of the more notable features are on the employer side on the backend.

-   Authentication/Authorization
-   Password resets & automatic email validation
-   Account privileges and statuses
-   Automated job expiration and email renewals
-   Admin level management for me and my business partner. This includes admin actions to update employers, users, and jobs
-   Automated database backups

### Future plans for Work Hays?

Eventually we plan on monetizing the platform, more than likely with ads. We have tossed around the idea of packaging the system up and trying to sell to other communities, or selling premium paid job spots. My concern right now is ultimately to provide a great service, and to grow it.

If the demand is there, developing a native iOS and Android application may be in the future. I've also tossed around the idea of creating public API endpoints to let other companies pull our data into their websites to manage their jobs as well.

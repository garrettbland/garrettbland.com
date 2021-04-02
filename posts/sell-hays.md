---
pageTitle: Sell Hays
type: 'project'
---

# Sell Hays

_Published May 31, 2020_

[https://github.com/garrettbland/sellhays](https://github.com/garrettbland/sellhays)

### Whats Sell Hays?

Sell Hays was a website that showed local garage sale listings in our local area. It featured socials logins for users to post their garage sales with images, maps, and scheduling.

### Why isn't it a website now?

Unfortunately, this idea along with others, I never did any sort of validation. I just started coding first thing and never looked back. After doing some research, it lost steam. The site never went live, but I did spend a decent amount of time developing this site and you can check out the code above!

### What is it built with?

I built this site as a Single Page Application and a cloud provided database

-   [Vue](https://vuejs.org/)
-   [Google Firebase](https://firebase.google.com/)

Vue.js is a javascript framework similar to React, with a much simpler API in my opinion. Google Firebase was used for storing user submitted data, images, and social authentication with Google, Facebook, or Twitter.

### What did it all do?

A lot of functionality was packed into this project.

-   Social User Authentication (only signed up users could post garage sales)
-   Scheduled garage sales and expiration dates
-   Image upload and compression
-   Google map integration

### What would have I done differently?

From a business aspect side, I would have done the validation piece early on. I would have created a simple landing page with a email signup, and threw a few dollars at it to promote and see if people in our area would sign up.

Technically, I would have chose to build this using a server side rendered stack for SEO benefits. SPA's just don't have the SEO benefits without doing some clunky pre-rendering. Its possible, but the simplicity of using a SSR would have been my new choice.

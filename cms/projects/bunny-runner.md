---
active: true
title: Bunny Runner
id: bunny-runner
---

[https://github.com/garrettbland/bunny-runner-v1](https://github.com/garrettbland/bunny-runner-v1)

![Bunny Runner](/images/bunny-runner/bunny-runner.png)

### What is Bunny Runner?

Bunny Runner was a mobile iOS game that I developed. It was a platforming game that challenged players to tap and hop on moving platforms. It was inspired by chromes dinosaur game, and Flappy Birds.

![Bunny Runner Game Menu](/images/bunny-runner/BunnyRunner_portrait.png)

### Why did I make it?

During my college years, I played an ridiculous amount of video games. I was into web development, and always wanted to develop a game. It always seemed like a huge impossible task to achieve.

Shortly after this game Flappy Birds came out, I thought I could build a similar thing. I read that the developer produced this game under a week, and the app was generating thousands of dollars a day shortly after it went viral. I started looking up tutorials on youtube about how to make a flappy bird clone, and went from there. I released the game sometime in 2015.

### What was used to create it?

I used a few different tools to create Bunny Runner.

-   Swift (native iOS code)
-   Sprite Kit (Apples game engine at the time)
-   [https://www.piskelapp.com/](https://www.piskelapp.com/)

![Bunny Runner In Game](/images/bunny-runner/BunnyRunner2_portrait.png)

### What did I learn?

This was my very first app I submitted to the iOS store. I learned a lot about the entire publishing process, all of the design work that goes into a game, all of the physics, and a lot about programming in Swift.

I learned a lot about Sprite Kit, Apples iOS game engine. It took a lot of trial and error to wrap my head around the physics of the game. Some of the challenges I personally faced...

-   The bunny, having a round collision box interacting with moving square collision boxes
-   Counting points - I would give the player 1 point for when the bunny landed on a box. This would totally go crazy if the circle collision box touched the side of the moving platform. It would cause the points to exponentially go up as it 'collided' hundreds of times a second. I fixed that by reducing the size of the bunny collision box to make it a bit easier and making it a square. I also would only recognize the point if the bottom of the bunny collision box would touch the top of the platform.
-   Randomizing the platforms as they moved onto the screen, and setting up some sort of rubber band logic so they couldn't ever be impossible. (The earlier versions of the game were insanely tough lol)

It was a lot of fun to work on and show my friends and family progress as I built it. I pretty much shoved it down all my friends throats that had an iPhone. There was also a pridefully moment I had when I was hanging out with a group of friends, and Bunny Runner was brought up. We were all playing this game on our phones seeing who could get the highest score.

![Bunny Runner Beginning of Game](/images/bunny-runner/BunnyRunner3_portrait.png)

### Any plans for the future?

Not currently. I've tossed the idea around in my head, the challenge was fun and rewarding. If I was going to dive into game development again I would head towards Unity or Unreal Engine and make something a little more in depth possibly.

The idea of using Swift and SceneKit is also appealing. Make it more 3d and explore game development as a whole again.

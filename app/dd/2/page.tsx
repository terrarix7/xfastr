"use client";

import React from "react";

const tweets = [
  {
    text: "uh @polar_sh is this screen supposed to be empty when user has no purchases? maybe it should say something https://t.co/TprTPFatpa",
    classification: "Feedback/Suggestion",
  },
  {
    text: "@Avdhesh_Garrg you forgot to add @polar_sh, they are pretty quick to setup.\n\nThere's also dodo payments, they have a very nice checkout page but I hate the 2 steps experience of their it.",
    classification: "Product Recommendation",
  },
  {
    text: "@shayanc__ checkout @levelsio's tool for some inspiration, best of luck!",
    classification: "Product Recommendation",
  },
  {
    text: "An actual person might DM and I will never find them in this madness, there should be a feature to sort by followers @elonmusk https://t.co/5SoqplpFqL",
    classification: "Feedback/Suggestion",
  },
  {
    text: "@levelsio @waitin4agi_ looks the thumbnail generator is already here again",
    classification: "Response/Reply",
  },
  {
    text: "funniest shit I have seen today https://t.co/seb7Rih2I0",
    classification: "Casual Comment",
  },
  {
    text: "@zeeg @KlausCodes @DhravyaShah @getsentry bro 😭 \n\nthey both serve different purpose for me",
    classification: "Response/Reply",
  },
  {
    text: "google AI mode feels so smooth https://t.co/pyqTs9mS37",
    classification: "Tech Commentary",
  },
  {
    text: "yall are crazy, Microsoft was literally giving cluely for free and it received insane backlash, now @im_roy_lee comes with a paid version and everyone is okay with that. https://t.co/vtJ4ZnrYHE",
    classification: "Tech Commentary",
  },
  {
    text: "@DhravyaShah how do you rewrite so much without breaking things?",
    classification: "Question",
  },
  {
    text: "@Udochiki @rasmickyy take a look into code yourself its on his github",
    classification: "Response/Reply",
  },
  {
    text: 'I just have this constant surge of Ideas, they feel just perfect at the start.\n\nI pick one of them and start building it, and by day 3 or 4 it just feels like being lost, many reasons: "its already there", there\'s no more to add" etc.\n\nAm I doing something wrong @marc_louvion @levelsio @jackfriks',
    classification: "Personal Update",
  },
  {
    text: "@AdityaShips thanks",
    classification: "Response/Reply",
  },
  {
    text: "Either I am achieving this within the next 8 days, or I will have to walk 20 km on the 9th day.",
    classification: "Personal Update",
  },
  {
    text: "Top 1% founders are not chasing money.\nTop 1% programmers are not chasing money.\nTop 1% politicians are not chasing money.\n\nThey're chasing mastery.",
    classification: "Reflection/Opinion",
  },
  {
    text: "no sir, I am fine with my code 😀 https://t.co/GsVG6QAsMU",
    classification: "Casual Comment",
  },
  {
    text: "@RhysSullivan I will not create an AWS wrapper?",
    classification: "Response/Reply",
  },
  {
    text: 'Give more clear plans to AI. Don\'t just say "fix this", "improve this", tell it why it is not good. \n\nIf you don\'t know what you want exactly, then how can you expect AI to know it.',
    classification: "Advice",
  },
  {
    text: "@amritwt just droppin this guy here https://t.co/ZMOO2CvFky",
    classification: "Response/Reply",
  },
  {
    text: "Seriously how is @marc_louvion shipping stuff making 100k$ while still using JavaScript https://t.co/qS2fQjgjPm",
    classification: "Tech Commentary",
  },
  {
    text: "@polar_sh came to the rescue! Finally I can ship stuff without worrying about payments especially living in India",
    classification: "Response/Reply",
  },
  {
    text: "@witsdev @vercel I was on desktop and your profile pic made me think you were a girl 🙃",
    classification: "Casual Comment",
  },
  {
    text: "@DhravyaShah from a hackathon project to this, the journey is going amazing!!",
    classification: "Response/Reply",
  },
  {
    text: "@Avdhesh_Garrg You have your DMs closed, any reasons?",
    classification: "Question",
  },
  {
    text: "@rasmickyy Why don't you have continue with google?",
    classification: "Question",
  },
  {
    text: "@rasmickyy @theorcdev there is a community adapter but it has performance issues they say https://t.co/mZarZ1OMnW",
    classification: "Response/Reply",
  },
  {
    text: "@aidenybai but I enjoy life like this",
    classification: "Response/Reply",
  },
  {
    text: "@DhravyaShah any funding?",
    classification: "Question",
  },
  {
    text: "@tanmay_singewar @senbodev agreed",
    classification: "Response/Reply",
  },
  {
    text: "@senbodev @tanmay_singewar woah woah woah, cloudflare at all does not have good developer experience\n\nThey are improving with opennext and stuff, but I had my stuff there for weeks, and I faced many issues.",
    classification: "Feedback/Suggestion",
  },
  {
    text: "You can actually meet a lot new people by just messaging people with &lt; 1k followers, cause we always like to talk",
    classification: "Reflection/Opinion",
  },
  {
    text: "woah, one @theo's video and the 1 million tokens context feels small https://t.co/Hlj8S6skEA",
    classification: "Tech Commentary",
  },
  {
    text: "I think of this tweet everyday ;{",
    classification: "Casual Comment",
  },
  {
    text: "can't sleep knowing we will never cross speed of light",
    classification: "Reflection/Opinion",
  },
  {
    text: "@ayushunleashed hmm I can get the twitter tweets now, I think I should also get your linkedIn tweets to see how you tweet\n\nmaybe there should be (future) feature to also suggest content the people you are in close circle with\n\n now I am wondering about a solution for this https://t.co/sGcWySUVW1",
    classification: "Response/Reply",
  },
  {
    text: "@ayushunleashed on it",
    classification: "Response/Reply",
  },
  {
    text: "fk this shit, going all in\n\nIn next 48 hours, clearing all outside biz and then locking myself in the house until I reach 1k $ MRR\n\nI don't need to travel to some cheap place like @levelsio, cause I live with my parents, so that's good",
    classification: "Personal Update",
  },
  {
    text: "@DhravyaShah did you ever face the Authentication Error Code 10000 shit with Cloudflare AI and other tools. \n\nCF has a lot of things, but they really need to work on their DX.",
    classification: "Feedback/Suggestion",
  },
  {
    text: "I was building this cool analytical tool, but I found out that the people at @DrizzleORM had already built, that too for just 1$.\n\nThanks ig, its called onedollarstats. com",
    classification: "Personal Update",
  },
  {
    text: "@Supermemoryai's memory in @t3dotchat will be very cool",
    classification: "Response/Reply",
  },
  {
    text: "@paraschopra As a 17yo, should I skip college? I am really interested in building things, and I don't think I will get into any good colleges",
    classification: "Question",
  },
  {
    text: "Wassup fellas!!!",
    classification: "Casual Greeting",
  },
  {
    text: "One last thing before I go—\n\nI just added a new feature to my browser extension: it counts how many Instagram posts you've liked (locally, no privacy risks).\n\nI tried it on my sister's account—it works!\n\nThe update will be available on the Chrome Web Store in a few days.",
    classification: "Announcement",
  },
  {
    text: "Happiness &gt; Health &gt; Wealth\n\nIn chasing wealth, I lost the first two. It was fun, but I don't feel the same joy or energy anymore.\n\nSo, for the next 21 days (until June 1), I'm logging off all social media to focus on myself👋\n\nAlso hoping India &amp; Pakistan reach peace by then🕊️",
    classification: "Reflection/Opinion",
  },
  {
    text: "@theo @teej_dv Looks like it's already bought by someone else",
    classification: "Response/Reply",
  },
  {
    text: "@theo @teej_dv Well then also get https://t.co/KybQl7qEne for the mighty upgrade",
    classification: "Product Recommendation",
  },
  {
    text: "@wojakcodes This will help me understand your perspective more.\n\nIf you had the power to decide, how would you have approached the partition of British India?",
    classification: "Question",
  },
  {
    text: "@cneuralnetwork Having a bad time reaching 1500?",
    classification: "Question",
  },
  {
    text: "https://t.co/7BkZ6Xw1GN",
    classification: "Link Sharing",
  },
  {
    text: "Introducing ✨History Visualizer✨ — a browser extension\n\nTake a peek into your internet footprints:\nThe shorts, reels, and posts you've mindlessly consumed.\nNow, see them all in one place.\n\nLink in the reply. https://t.co/iMKPtzOpjo",
    classification: "Announcement",
  },
  {
    text: "@wojakcodes Last one was also pretty good",
    classification: "Response/Reply",
  },
  {
    text: "If I get the time, I really want to watch this entire playlist.\n\nDefinitely going to finish it before the end of the month. https://t.co/4Aq4Y2Ifee",
    classification: "Link Sharing",
  },
  {
    text: "@cortisoul_ do you have any user country demographic data for Matiks' users?",
    classification: "Question",
  },
  {
    text: "I love web because you can just hit deploy and its instantly available to the world.\n\nSo till now I never tried publishing something on app stores or web stores.\n\nThat changes today.\n\nIntroducing History visualiser.\n\nIt allows you to keep track of all the shorts, reels, tiktoks, X/reddit posts you watch",
    classification: "Announcement",
  },
  {
    text: "you guys are too focused on choosing fonts.\n\nI always go with this one. super readable. https://t.co/3A93PrkAdh",
    classification: "Tech Commentary",
  },
  {
    text: "@tejaxhvi Websites do not have access to user browser history. \n\nBut chrome extensions do, so I made one with permissions to access user browser history, and I process that data and show it to user.\n\nIt is completely local so there is no issue of privacy.",
    classification: "Response/Reply",
  },
  {
    text: "@wojakcodes do you have any recommendations for choosing a college? I am really confused about whether I should go or not, because I did not give JEE. What would you recommend?",
    classification: "Question",
  },
  {
    text: "@wojakcodes until yesterday I thought (more like assumed) you were in second or third year of college.",
    classification: "Response/Reply",
  },
  {
    text: "@EHuanglu imagine it shooting 10 bullets into you only to come closer to do this https://t.co/nCWxy3OBwm",
    classification: "Casual Comment",
  },
  {
    text: "@mohan_iitg also share the spike in users in like 3 days",
    classification: "Response/Reply",
  },
  {
    text: "@wojakcodes I like your friend's approach, even if he doesn't fully like it, he's still open minded enough to explore and use it for his own projects.",
    classification: "Response/Reply",
  },
  {
    text: "@TobyBelhome @shadcn @theo your dream is coming true, sites are getting colorful again",
    classification: "Response/Reply",
  },
  {
    text: "@paraschopra @Aanchal95154446 Its like something people already want, plus what more we could add to it that they'll love",
    classification: "Response/Reply",
  },
  {
    text: "@ayushunleashed @caleb_friesen2 every once in a while I go through all their videos\n\nthey seem to be the only one talking about Indian startups on youtube",
    classification: "Product Recommendation",
  },
  {
    text: "@t3dotchat Chrome Extension by any chance? https://t.co/0ynmMD8wpB",
    classification: "Response/Reply",
  },
  {
    text: "spent last 4 hours building foundation for tomorrow.\n\nIts not much, but hard thing was getting extension setup right to get user search history\n\nthis allows to track user's social media interactions, how many reels, shorts, or posts he sees, will ship it tomorrow https://t.co/zG3FHx8VFT",
    classification: "Personal Update",
  },
  {
    text: "@DhravyaShah @Cloudflare is it more into AI, in web or something different?",
    classification: "Question",
  },
  {
    text: "@DhravyaShah @Cloudflare So you already have a rough idea of what next things you are going to do?",
    classification: "Question",
  },
  {
    text: "@JayDwivedi_ I need to try satoshi and manrope, they look pretty cool",
    classification: "Response/Reply",
  },
  {
    text: "This cursor midnight theme looks so sick! I love it! https://t.co/RDctB6NF4u",
    classification: "Tech Commentary",
  },
  {
    text: "I was supposed to launch something 5 hours ago, its 1am and still working on it.",
    classification: "Personal Update",
  },
  {
    text: "@marc_louvion I really wanted to come for this but forgot in the day to day hustle\n\nDefinitely next time!",
    classification: "Response/Reply",
  },
  {
    text: "Is this the confusion phase?\nNo idea where I'll be tomorrow, or in a month.\n\nBut I will keep building, keep showing up.\nI will keep pushing forward.",
    classification: "Personal Update",
  },
  {
    text: "and this choice is presented daily.",
    classification: "Reflection/Opinion",
  },
  {
    text: "@pratty_agi What's so sensitive here? haha https://t.co/VQqnqU5ZrY",
    classification: "Response/Reply",
  },
  {
    text: "Made this alt account because I got too perfectionist to post anything on my main. And my first follower here is my idol himself @cneuralnetwork https://t.co/GxjghT9H87",
    classification: "Personal Update",
  },
  {
    text: "@cneuralnetwork you start playing at midnight? https://t.co/N0CzJco0c5",
    classification: "Question",
  },
  {
    text: "@cortisoul_ @kadaipaneeeer @matiks_play @nikitabier I have also shared something in dm, if possible take a look at that as well, thanks",
    classification: "Response/Reply",
  },
  {
    text: "@cortisoul_ @kadaipaneeeer @matiks_play @nikitabier I play matiks on pc, but when I thought to show it to my sister on her phone, the UI kinda felt cluttered with options and I had to look around to find the 'against time' mode",
    classification: "Feedback/Suggestion",
  },
  {
    text: "@xanderburgess here's the website https://t.co/ubwTpQtOS5\n\nalso let me know if I should make any design changes while including logo\n\nthanks!",
    classification: "Response/Reply",
  },
  {
    text: "@ayushunleashed maybe take a week off. Ship some new SAAS and come back to this, you are on this from a long time now.",
    classification: "Advice",
  },
  {
    text: "Finally launched https://t.co/ubwTpQth2x for test users, well its actually out for everyone. \n\nBut I have not tried to market it yet, will try to use @jackfriks's method. Wish me luck!",
    classification: "Announcement",
  },
];

const tweetInfo = [
  {
    text: "uh @polar_sh is this screen supposed to be empty when user has no purchases? maybe it should say something https://t.co/TprTPFatpa",
    likes: 0,
    views: 25,
    date: "Sun Jun 29 18:43:12 +0000 2025",
  },
  {
    text: "@Avdhesh_Garrg you forgot to add @polar_sh, they are pretty quick to setup.\n\nThere's also dodo payments, they have a very nice checkout page but I hate the 2 steps experience of their it.",
    likes: 1,
    views: 32,
    date: "Sun Jun 29 03:53:55 +0000 2025",
  },
  {
    text: "@shayanc__ checkout @levelsio's tool for some inspiration, best of luck!",
    likes: 2,
    views: 25,
    date: "Sat Jun 28 20:36:57 +0000 2025",
  },
  {
    text: "An actual person might DM and I will never find them in this madness, there should be a feature to sort by followers @elonmusk https://t.co/5SoqplpFqL",
    likes: 0,
    views: 19,
    date: "Sat Jun 28 20:35:57 +0000 2025",
  },
  {
    text: "@levelsio @waitin4agi_ looks the thumbnail generator is already here again",
    likes: 0,
    views: 379,
    date: "Sat Jun 28 20:13:05 +0000 2025",
  },
  {
    text: "funniest shit I have seen today https://t.co/seb7Rih2I0",
    likes: 0,
    views: 15,
    date: "Sat Jun 28 01:34:12 +0000 2025",
  },
  {
    text: "@zeeg @KlausCodes @DhravyaShah @getsentry bro 😭 \n\nthey both serve different purpose for me",
    likes: 0,
    views: 54,
    date: "Fri Jun 27 23:32:35 +0000 2025",
  },
  {
    text: "google AI mode feels so smooth https://t.co/pyqTs9mS37",
    likes: 2,
    views: 42,
    date: "Fri Jun 27 23:21:29 +0000 2025",
  },
  {
    text: "yall are crazy, Microsoft was literally giving cluely for free and it received insane backlash, now @im_roy_lee comes with a paid version and everyone is okay with that. https://t.co/vtJ4ZnrYHE",
    likes: 0,
    views: 17,
    date: "Fri Jun 27 00:26:57 +0000 2025",
  },
  {
    text: "@DhravyaShah how do you rewrite so much without breaking things?",
    likes: 0,
    views: 48,
    date: "Thu Jun 26 10:35:56 +0000 2025",
  },
  {
    text: "@Udochiki @rasmickyy take a look into code yourself its on his github",
    likes: 0,
    views: 17,
    date: "Thu Jun 26 03:41:05 +0000 2025",
  },
  {
    text: 'I just have this constant surge of Ideas, they feel just perfect at the start.\n\nI pick one of them and start building it, and by day 3 or 4 it just feels like being lost, many reasons: "its already there", there\'s no more to add" etc.\n\nAm I doing something wrong @marc_louvion @levelsio @jackfriks',
    likes: 0,
    views: 33,
    date: "Wed Jun 25 23:26:37 +0000 2025",
  },
  {
    text: "@AdityaShips thanks",
    likes: 2,
    views: 20,
    date: "Wed Jun 25 14:05:31 +0000 2025",
  },
  {
    text: "Either I am achieving this within the next 8 days, or I will have to walk 20 km on the 9th day.",
    likes: 3,
    views: 413,
    date: "Wed Jun 25 13:55:36 +0000 2025",
  },
  {
    text: "Top 1% founders are not chasing money.\nTop 1% programmers are not chasing money.\nTop 1% politicians are not chasing money.\n\nThey’re chasing mastery.",
    likes: 1,
    views: 38,
    date: "Wed Jun 25 13:16:19 +0000 2025",
  },
  {
    text: "no sir, I am fine with my code 😀 https://t.co/GsVG6QAsMU",
    likes: 0,
    views: 28,
    date: "Tue Jun 24 23:14:08 +0000 2025",
  },
  {
    text: "@RhysSullivan I will not create an AWS wrapper?",
    likes: 1,
    views: 109,
    date: "Tue Jun 24 22:13:54 +0000 2025",
  },
  {
    text: 'Give more clear plans to AI. Don\'t just say "fix this", "improve this", tell it why it is not good. \n\nIf you don\'t know what you want exactly, then how can you expect AI to know it.',
    likes: 0,
    views: 19,
    date: "Tue Jun 24 20:58:18 +0000 2025",
  },
  {
    text: "@amritwt just droppin this guy here https://t.co/ZMOO2CvFky",
    likes: 0,
    views: 12,
    date: "Tue Jun 24 20:08:12 +0000 2025",
  },
  {
    text: "Seriously how is @marc_louvion shipping stuff making 100k$ while still using JavaScript https://t.co/qS2fQjgjPm",
    likes: 0,
    views: 26,
    date: "Tue Jun 24 08:28:02 +0000 2025",
  },
  {
    text: "@polar_sh came to the rescue! Finally I can ship stuff without worrying about payments especially living in India",
    likes: 0,
    views: 10,
    date: "Mon Jun 23 23:22:45 +0000 2025",
  },
  {
    text: "@witsdev @vercel I was on desktop and your profile pic made me think you were a girl 🙃",
    likes: 0,
    views: 665,
    date: "Mon Jun 23 22:16:29 +0000 2025",
  },
  {
    text: "@DhravyaShah from a hackathon project to this, the journey is going amazing!!",
    likes: 1,
    views: 168,
    date: "Mon Jun 23 21:05:09 +0000 2025",
  },
  {
    text: "@Avdhesh_Garrg You have your DMs closed, any reasons?",
    likes: 0,
    views: 2,
    date: "Mon Jun 23 18:57:18 +0000 2025",
  },
  {
    text: "@rasmickyy Why don't you have continue with google?",
    likes: 0,
    views: 59,
    date: "Mon Jun 23 14:29:24 +0000 2025",
  },
  {
    text: "@rasmickyy @theorcdev there is a community adapter but it has performance issues they say https://t.co/mZarZ1OMnW",
    likes: 2,
    views: 24,
    date: "Mon Jun 23 14:17:17 +0000 2025",
  },
  {
    text: "@aidenybai but I enjoy life like this",
    likes: 3,
    views: 362,
    date: "Sun Jun 22 22:41:09 +0000 2025",
  },
  {
    text: "@DhravyaShah any funding?",
    likes: 1,
    views: 641,
    date: "Sun Jun 22 18:33:15 +0000 2025",
  },
  {
    text: "@tanmay_singewar @senbodev agreed",
    likes: 0,
    views: 89,
    date: "Sun Jun 22 18:29:55 +0000 2025",
  },
  {
    text: "@senbodev @tanmay_singewar woah woah woah, cloudflare at all does not have good developer experience\n\nThey are improving with opennext and stuff, but I had my stuff there for weeks, and I faced many issues.",
    likes: 3,
    views: 111,
    date: "Sun Jun 22 16:58:13 +0000 2025",
  },
  {
    text: "You can actually meet a lot new people by just messaging people with &lt; 1k followers, cause we always like to talk",
    likes: 0,
    views: 55,
    date: "Sat Jun 21 10:40:18 +0000 2025",
  },
  {
    text: "woah, one @theo's video and the 1 million tokens context feels small https://t.co/Hlj8S6skEA",
    likes: 1,
    views: 39,
    date: "Sat Jun 21 10:38:06 +0000 2025",
  },
  {
    text: "I think of this tweet everyday ;{",
    likes: 0,
    views: 25,
    date: "Fri Jun 20 22:14:48 +0000 2025",
  },
  {
    text: "can't sleep knowing we will never cross speed of light",
    likes: 0,
    views: 16,
    date: "Fri Jun 20 18:10:36 +0000 2025",
  },
  {
    text: "@ayushunleashed hmm I can get the twitter tweets now, I think I should also get your linkedIn tweets to see how you tweet\n\nmaybe there should be (future) feature to also suggest content the people you are in close circle with\n\n now I am wondering about a solution for this https://t.co/sGcWySUVW1",
    likes: 0,
    views: 22,
    date: "Thu Jun 19 19:18:02 +0000 2025",
  },
  {
    text: "@ayushunleashed on it",
    likes: 2,
    views: 93,
    date: "Thu Jun 19 19:02:27 +0000 2025",
  },
  {
    text: "fk this shit, going all in\n\nIn next 48 hours, clearing all outside biz and then locking myself in the house until I reach 1k $ MRR\n\nI don't need to travel to some cheap place like @levelsio, cause I live with my parents, so that's good",
    likes: 0,
    views: 33,
    date: "Thu Jun 19 18:59:16 +0000 2025",
  },
  {
    text: "@DhravyaShah did you ever face the Authentication Error Code 10000 shit with Cloudflare AI and other tools. \n\nCF has a lot of things, but they really need to work on their DX.",
    likes: 0,
    views: 15,
    date: "Wed Jun 18 16:15:46 +0000 2025",
  },
  {
    text: "I was building this cool analytical tool, but I found out that the people at @DrizzleORM had already built, that too for just 1$.\n\nThanks ig, its called onedollarstats. com",
    likes: 11,
    views: 5325,
    date: "Wed Jun 18 13:30:24 +0000 2025",
  },
  {
    text: "@Supermemoryai's memory in @t3dotchat will be very cool",
    likes: 0,
    views: 2,
    date: "Wed Jun 04 18:08:10 +0000 2025",
  },
  {
    text: "@paraschopra As a 17yo, should I skip college? I am really interested in building things, and I don’t think I will get into any good colleges",
    likes: 0,
    views: 105,
    date: "Tue Jun 03 05:04:53 +0000 2025",
  },
  {
    text: "Wassup fellas!!!",
    likes: 0,
    views: 72,
    date: "Sat May 31 20:25:30 +0000 2025",
  },
  {
    text: "One last thing before I go—\n\nI just added a new feature to my browser extension: it counts how many Instagram posts you’ve liked (locally, no privacy risks).\n\nI tried it on my sister’s account—it works!\n\nThe update will be available on the Chrome Web Store in a few days.",
    likes: 1,
    views: 116,
    date: "Sat May 10 20:09:24 +0000 2025",
  },
  {
    text: "Happiness &gt; Health &gt; Wealth\n\nIn chasing wealth, I lost the first two. It was fun, but I don’t feel the same joy or energy anymore.\n\nSo, for the next 21 days (until June 1), I’m logging off all social media to focus on myself👋\n\nAlso hoping India &amp; Pakistan reach peace by then🕊️",
    likes: 1,
    views: 104,
    date: "Sat May 10 17:54:25 +0000 2025",
  },
  {
    text: "@theo @teej_dv Looks like it's already bought by someone else",
    likes: 0,
    views: 310,
    date: "Wed May 07 19:31:41 +0000 2025",
  },
  {
    text: "@theo @teej_dv Well then also get https://t.co/KybQl7qEne for the mighty upgrade",
    likes: 6,
    views: 410,
    date: "Wed May 07 19:22:16 +0000 2025",
  },
  {
    text: "@wojakcodes This will help me understand your perspective more.\n\nIf you had the power to decide, how would you have approached the partition of British India?",
    likes: 2,
    views: 209,
    date: "Wed May 07 16:56:16 +0000 2025",
  },
  {
    text: "@cneuralnetwork Having a bad time reaching 1500?",
    likes: 0,
    views: 78,
    date: "Tue May 06 20:03:48 +0000 2025",
  },
  {
    text: "https://t.co/7BkZ6Xw1GN",
    likes: 0,
    views: 39,
    date: "Tue May 06 16:40:57 +0000 2025",
  },
  {
    text: "Introducing ✨History Visualizer✨ — a browser extension\n\nTake a peek into your internet footprints:\nThe shorts, reels, and posts you’ve mindlessly consumed.\nNow, see them all in one place.\n\nLink in the reply. https://t.co/iMKPtzOpjo",
    likes: 0,
    views: 55,
    date: "Tue May 06 16:40:56 +0000 2025",
  },
  {
    text: "@wojakcodes Last one was also pretty good",
    likes: 2,
    views: 129,
    date: "Tue May 06 15:37:17 +0000 2025",
  },
  {
    text: "If I get the time, I really want to watch this entire playlist.\n\nDefinitely going to finish it before the end of the month. https://t.co/4Aq4Y2Ifee",
    likes: 1,
    views: 46,
    date: "Mon May 05 19:37:21 +0000 2025",
  },
  {
    text: "@cortisoul_ do you have any user country demographic data for Matiks' users?",
    likes: 0,
    views: 6,
    date: "Mon May 05 19:11:42 +0000 2025",
  },
  {
    text: "I love web because you can just hit deploy and its instantly available to the world.\n\nSo till now I never tried publishing something on app stores or web stores.\n\nThat changes today.\n\nIntroducing History visualiser.\n\nIt allows you to keep track of all the shorts, reels, tiktoks, X/reddit posts you watch",
    likes: 1,
    views: 50,
    date: "Mon May 05 19:02:17 +0000 2025",
  },
  {
    text: "you guys are too focused on choosing fonts.\n\nI always go with this one. super readable. https://t.co/3A93PrkAdh",
    likes: 2,
    views: 72,
    date: "Mon May 05 16:38:49 +0000 2025",
  },
  {
    text: "@tejaxhvi Websites do not have access to user browser history. \n\nBut chrome extensions do, so I made one with permissions to access user browser history, and I process that data and show it to user.\n\nIt is completely local so there is no issue of privacy.",
    likes: 1,
    views: 17,
    date: "Mon May 05 16:29:33 +0000 2025",
  },
  {
    text: "@wojakcodes do you have any recommendations for choosing a college? I am really confused about whether I should go or not, because I did not give JEE. What would you recommend?",
    likes: 0,
    views: 106,
    date: "Mon May 05 16:26:22 +0000 2025",
  },
  {
    text: "@wojakcodes until yesterday I thought (more like assumed) you were in second or third year of college.",
    likes: 1,
    views: 361,
    date: "Mon May 05 15:39:18 +0000 2025",
  },
  {
    text: "@EHuanglu imagine it shooting 10 bullets into you only to come closer to do this https://t.co/nCWxy3OBwm",
    likes: 14,
    views: 2118,
    date: "Mon May 05 14:39:32 +0000 2025",
  },
  {
    text: "@mohan_iitg also share the spike in users in like 3 days",
    likes: 4,
    views: 1193,
    date: "Mon May 05 14:14:31 +0000 2025",
  },
  {
    text: "@wojakcodes I like your friend's approach, even if he doesn't fully like it, he’s still open minded enough to explore and use it for his own projects.",
    likes: 2,
    views: 577,
    date: "Mon May 05 14:10:19 +0000 2025",
  },
  {
    text: "@TobyBelhome @shadcn @theo your dream is coming true, sites are getting colorful again",
    likes: 0,
    views: 437,
    date: "Mon May 05 13:53:50 +0000 2025",
  },
  {
    text: "@paraschopra @Aanchal95154446 Its like something people already want, plus what more we could add to it that they'll love",
    likes: 0,
    views: 21,
    date: "Mon May 05 13:36:59 +0000 2025",
  },
  {
    text: "@ayushunleashed @caleb_friesen2 every once in a while I go through all their videos\n\nthey seem to be the only one talking about Indian startups on youtube",
    likes: 7,
    views: 523,
    date: "Mon May 05 10:14:48 +0000 2025",
  },
  {
    text: "@t3dotchat Chrome Extension by any chance? https://t.co/0ynmMD8wpB",
    likes: 1,
    views: 6,
    date: "Sun May 04 23:13:31 +0000 2025",
  },
  {
    text: "spent last 4 hours building foundation for tomorrow.\n\nIts not much, but hard thing was getting extension setup right to get user search history\n\nthis allows to track user's social media interactions, how many reels, shorts, or posts he sees, will ship it tomorrow https://t.co/zG3FHx8VFT",
    likes: 1,
    views: 109,
    date: "Sun May 04 23:06:09 +0000 2025",
  },
  {
    text: "@DhravyaShah @Cloudflare is it more into AI, in web or something different?",
    likes: 0,
    views: 366,
    date: "Sun May 04 23:01:31 +0000 2025",
  },
  {
    text: "@DhravyaShah @Cloudflare So you already have a rough idea of what next things you are going to do?",
    likes: 0,
    views: 1597,
    date: "Sun May 04 22:58:52 +0000 2025",
  },
  {
    text: "@JayDwivedi_ I need to try satoshi and manrope, they look pretty cool",
    likes: 1,
    views: 364,
    date: "Sun May 04 22:30:45 +0000 2025",
  },
  {
    text: "This cursor midnight theme looks so sick! I love it! https://t.co/RDctB6NF4u",
    likes: 1,
    views: 100,
    date: "Sun May 04 20:05:42 +0000 2025",
  },
  {
    text: "I was supposed to launch something 5 hours ago, its 1am and still working on it.",
    likes: 2,
    views: 64,
    date: "Sun May 04 19:45:09 +0000 2025",
  },
  {
    text: "@marc_louvion I really wanted to come for this but forgot in the day to day hustle\n\nDefinitely next time!",
    likes: 0,
    views: 240,
    date: "Sun May 04 19:25:29 +0000 2025",
  },
  {
    text: "Is this the confusion phase?\nNo idea where I’ll be tomorrow, or in a month.\n\nBut I will keep building, keep showing up.\nI will keep pushing forward.",
    likes: 0,
    views: 645,
    date: "Sat May 03 21:16:03 +0000 2025",
  },
  {
    text: "and this choice is presented daily.",
    likes: 2,
    views: 727,
    date: "Sat May 03 19:21:09 +0000 2025",
  },
  {
    text: "@pratty_agi What's so sensitive here? haha https://t.co/VQqnqU5ZrY",
    likes: 0,
    views: 5,
    date: "Sat May 03 18:35:03 +0000 2025",
  },
  {
    text: "Made this alt account because I got too perfectionist to post anything on my main. And my first follower here is my idol himself @cneuralnetwork https://t.co/GxjghT9H87",
    likes: 92,
    views: 7740,
    date: "Sat May 03 18:32:01 +0000 2025",
  },
  {
    text: "@cneuralnetwork you start playing at midnight? https://t.co/N0CzJco0c5",
    likes: 0,
    views: 164,
    date: "Sat May 03 16:45:36 +0000 2025",
  },
  {
    text: "@cortisoul_ @kadaipaneeeer @matiks_play @nikitabier I have also shared something in dm, if possible take a look at that as well, thanks",
    likes: 1,
    views: 26,
    date: "Fri May 02 20:23:07 +0000 2025",
  },
  {
    text: "@cortisoul_ @kadaipaneeeer @matiks_play @nikitabier I play matiks on pc, but when I thought to show it to my sister on her phone, the UI kinda felt cluttered with options and I had to look around to find the 'against time' mode",
    likes: 2,
    views: 49,
    date: "Fri May 02 20:05:41 +0000 2025",
  },
  {
    text: "@xanderburgess here's the website https://t.co/ubwTpQtOS5\n\nalso let me know if I should make any design changes while including logo\n\nthanks!",
    likes: 0,
    views: 21,
    date: "Fri May 02 17:17:55 +0000 2025",
  },
  {
    text: "@ayushunleashed maybe take a week off. Ship some new SAAS and come back to this, you are on this from a long time now.",
    likes: 0,
    views: 14,
    date: "Thu May 01 06:12:07 +0000 2025",
  },
  {
    text: "Finally launched https://t.co/ubwTpQth2x for test users, well its actually out for everyone. \n\nBut I have not tried to market it yet, will try to use @jackfriks's method. Wish me luck!",
    likes: 1,
    views: 399,
    date: "Wed Apr 30 17:48:56 +0000 2025",
  },
];

function page() {
  const combinedTweets = tweetInfo.map((tweetInfoItem) => {
    const matchingClassification = tweets.find(
      (tweet) => tweet.text === tweetInfoItem.text,
    );

    return {
      text: tweetInfoItem.text,
      likes: tweetInfoItem.likes,
      views: tweetInfoItem.views,
      date: tweetInfoItem.date,
      classification: matchingClassification?.classification || null,
    };
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(combinedTweets, null, 2));
  };

  return (
    <div>
      <button
        onClick={copyToClipboard}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Copy Combined Tweets
      </button>
      <pre className=" p-4 rounded-lg overflow-auto">
        {JSON.stringify(combinedTweets, null, 2)}
      </pre>
    </div>
  );
}

export default page;

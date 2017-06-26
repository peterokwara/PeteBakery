'use strict';
const BootBot = require('bootbot');
const config = require('config');

const bot = new BootBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret')
});

bot.setGetStartedButton((payload, chat) => {
  const welcome1 = `Hey there, trainer! How well you think you ...`;
  const welcome2 = `Type START or PLAY to join the challenge!`;
  const options = { typing: true };

  chat.say(welcome1, options)
    .then(() => chat.say(welcome2, options));
});

bot.start();

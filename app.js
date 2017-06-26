'use strict';
const BootBot = require('bootbot');
const config = require('config');

const bot = new BootBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret')
});

bot.setGetStartedButton((payload, chat) => {
  const welcome = `Hey there, I can help you order cakes and doughnuts just from your phone, and facebook messenger!`;
  const options = { typing: true };

  // Greet the customer then ask what he would like to order, a cake or doughnut?
  chat.say(welcome, options)
    .then(() => chat.say({
		text: 'What would you like to order today?',
		quickReplies: ['Cake', 'Doughnut']
	}));
});

bot.start();

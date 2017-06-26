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

bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	console.log(`The user said: ${text}`);

  const options = { typing: true };

  chat.sendListTemplate([{
      "title": "Classic T-Shirt Collection",
      "image_url": "https://peterssendreceiveapp.ngrok.io/img/collection.png",
      "subtitle": "See all our colors",
      "buttons": [
          {
              "title": "View",
              "type": "web_url",
              "url": "https://peterssendreceiveapp.ngrok.io/collection",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
          }
      ]
  },
  {
      "title": "Classic White T-Shirt",
      "image_url": "https://peterssendreceiveapp.ngrok.io/img/white-t-shirt.png",
      "subtitle": "100% Cotton, 200% Comfortable",
      "buttons": [
          {
              "title": "Shop Now",
              "type": "web_url",
              "url": "https://peterssendreceiveapp.ngrok.io/shop?item=100",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
          }
      ]
  },
  {
      "title": "Classic Blue T-Shirt",
      "image_url": "https://peterssendreceiveapp.ngrok.io/img/blue-t-shirt.png",
      "subtitle": "100% Cotton, 200% Comfortable",
      "buttons": [
          {
              "title": "Shop Now",
              "type": "web_url",
              "url": "https://peterssendreceiveapp.ngrok.io/shop?item=101",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
          }
      ]
  },
  {
      "title": "Classic Black T-Shirt",
      "image_url": "https://peterssendreceiveapp.ngrok.io/img/black-t-shirt.png",
      "subtitle": "100% Cotton, 200% Comfortable",
      "buttons": [
          {
              "title": "Shop Now",
              "type": "web_url",
              "url": "https://peterssendreceiveapp.ngrok.io/shop?item=102",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
          }
      ]
  }], [
     {
         "title": "View More",
         "type": "postback",
         "payload": "payload"
     }
 ], options);

});

bot.start();

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
		quickReplies: ['Cake','Doughnut']
	}));
});

bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	console.log(`The user said: ${text}`);

  const options = { typing: true };

  if(text  === 'Cake'){
    chat.sendListTemplate([{
        "title": "Black forest",
        "image_url": "https://d2z4fd79oscvvx.cloudfront.net/0023640_black_forest_cake.jpeg",
        "subtitle": "Consists of several layers of chocolate sponge cake sandwiched with whipped cream and cherries.",
        "buttons": [
            {
              "title": "Buy now",
              "type": "postback",
              "payload": "BLACKFOREST_PAYLOAD"
            }
        ]
    },
    {
        "title": "White forest",
        "image_url": "http://trivandrumcakehouse.com/wp-content/uploads/2015/10/cake-white-forest.jpg",
        "subtitle": "This impressive spin on a Black Forest cake uses sweet white chocolate instead of dark chocolate.",
        "buttons": [
            {
              "title": "Buy now",
              "type": "postback",
              "payload": "WHITEFOREST_PAYLOAD"
            }
        ]
    },
    {
        "title": "Sponge cake",
        "image_url": "http://img.taste.com.au/NKPhrv0q/taste/2016/11/foolproof-sponge-102144-1.jpeg",
        "subtitle": "Sponge cake is a cake based on flour, sugar, butter and eggs, and is sometimes leavened with baking powder. ",
        "buttons": [
            {
              "title": "Buy now",
              "type": "postback",
              "payload": "SPONGECAKE_PAYLOAD"
            }
        ]
    },
    {
        "title": "Frog cake",
        "image_url": "http://www.eatlivetravelwrite.com/wp-content/uploads/2016/01/Homemade-frog-cake-on-eatlivetravelwrite.com_.jpg",
        "subtitle": "The frog cake is a dessert in the shape of a frog's head, composed of sponge cake and cream covered with fondant.",
        "buttons": [
            {
              "title": "Buy now",
              "type": "postback",
              "payload": "FROGCAKE_PAYLOAD"
            }
        ]
    }], [
       {
           "title": "View More",
           "type": "postback",
           "payload": "VIEWMORE_PAYLOAD"
       }
   ], options);
 } else if (text === 'Doughnut'){
   chat.sendListTemplate([{
       "title": "Black forest",
       "image_url": "https://d2z4fd79oscvvx.cloudfront.net/0023640_black_forest_cake.jpeg",
       "subtitle": "Consists of several layers of chocolate sponge cake sandwiched with whipped cream and cherries.",
       "buttons": [
           {
             "title": "Pen",
             "type": "postback",
             "payload": "BLACKFOREST_PAYLOAD"
           }
       ]
   },
   {
       "title": "White forest",
       "image_url": "http://trivandrumcakehouse.com/wp-content/uploads/2015/10/cake-white-forest.jpg",
       "subtitle": "This impressive spin on a Black Forest cake uses sweet white chocolate instead of dark chocolate.",
       "buttons": [
           {
             "title": "Buy now",
             "type": "postback",
             "payload": "WHITEFOREST_PAYLOAD"
           }
       ]
   },
   {
       "title": "Sponge cake",
       "image_url": "http://img.taste.com.au/NKPhrv0q/taste/2016/11/foolproof-sponge-102144-1.jpeg",
       "subtitle": "Sponge cake is a cake based on flour, sugar, butter and eggs, and is sometimes leavened with baking powder. ",
       "buttons": [
           {
             "title": "Buy now",
             "type": "postback",
             "payload": "SPONGECAKE_PAYLOAD"
           }
       ]
   },
   {
       "title": "Frog cake",
       "image_url": "http://www.eatlivetravelwrite.com/wp-content/uploads/2016/01/Homemade-frog-cake-on-eatlivetravelwrite.com_.jpg",
       "subtitle": "The frog cake is a dessert in the shape of a frog's head, composed of sponge cake and cream covered with fondant.",
       "buttons": [
           {
             "title": "Buy now",
             "type": "postback",
             "payload": "FROGCAKE_PAYLOAD"
           }
       ]
   }], [
      {
          "title": "View More",
          "type": "postback",
          "payload": "VIEWMORE_PAYLOAD"
      }
  ], options);
 }



});

bot.start();

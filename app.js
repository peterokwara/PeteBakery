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

  if (text == 'Cake') {
    chat.say('Here is a list of the cakes available', {typing:true}).then(() => chat.sendListTemplate([{
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
   ], options));

  } else if (text == 'Doughnut'){
    chat.say('Here is a list of the doughnuts available', {typing:true}).then(() =>chat.sendListTemplate([{
        "title": "Strawberry-frosted donut",
        "image_url": "http://del.h-cdn.co/assets/15/23/768x576/gallery-1433276772-img-7132.jpg",
        "subtitle": "This was way too sweet, and had an incredibly artificial-tasting strawberry flavor, making it the donut the loser of the classic donuts.",
        "buttons": [
            {
              "title": "Buy now",
              "type": "postback",
              "payload": "STRAWBERRYFROSTEDDONUT_PAYLOAD"
            }
        ]
    },
    {
        "title": "Cinnamon-sugar donut",
        "image_url": "http://del.h-cdn.co/assets/15/23/768x576/gallery-1433276644-img-7125.jpg",
        "subtitle": "While a great idea in theory, the ratio of cinnamon to sugar was way off here.",
        "buttons": [
            {
              "title": "Buy now",
              "type": "postback",
              "payload": "CINNAMONSUGAR_PAYLOAD"
            }
        ]
    },
    {
        "title": "Blueberry donut",
        "image_url": "http://del.h-cdn.co/assets/15/23/768x576/gallery-1433277188-img-7135.jpg",
        "subtitle": "While one of our tasters proclaimed this to be her absolute favorite, the rest of us just couldn't get past the sweetness explosion.",
        "buttons": [
            {
              "title": "Buy now",
              "type": "postback",
              "payload": "BLUEBERRYDONUT_PAYLOAD"
            }
        ]
    },
    {
        "title": "Jelly donut",
        "image_url": "http://del.h-cdn.co/assets/15/23/768x576/gallery-1433276500-img-7122.jpg",
        "subtitle": "The jelly in this confection tasted like a pudding cup.",
        "buttons": [
            {
              "title": "Buy now",
              "type": "postback",
              "payload": "JELLYDONUT_PAYLOAD"
            }
        ]
    }], [
       {
           "title": "View More",
           "type": "postback",
           "payload": "VIEWMORE_PAYLOAD"
       }
   ], options));

  } else {

  }

//   bot.hear('Cake', (payload, chat) => {
//
// });

// bot.hear('Doughnut', (payload, chat) => {
//
// });

});

bot.start();

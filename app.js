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
  const options = {
    typing: true
  };

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

  const options = {
    typing: true
  };

  if (text == 'Cake') {
    chat.say('Here is a list of the cakes available', {
      typing: true
    }).then(() => chat.sendListTemplate([{
        "title": "Black forest",
        "image_url": "https://d2z4fd79oscvvx.cloudfront.net/0023640_black_forest_cake.jpeg",
        "subtitle": "Consists of several layers of chocolate sponge cake sandwiched with whipped cream and cherries.",
        "buttons": [{
          "title": "Buy now",
          "type": "postback",
          "payload": "BLACKFOREST_PAYLOAD"
        }]
      },
      {
        "title": "White forest",
        "image_url": "http://trivandrumcakehouse.com/wp-content/uploads/2015/10/cake-white-forest.jpg",
        "subtitle": "This impressive spin on a Black Forest cake uses sweet white chocolate instead of dark chocolate.",
        "buttons": [{
          "title": "Buy now",
          "type": "postback",
          "payload": "WHITEFOREST_PAYLOAD"
        }]
      },
      {
        "title": "Sponge cake",
        "image_url": "http://img.taste.com.au/NKPhrv0q/taste/2016/11/foolproof-sponge-102144-1.jpeg",
        "subtitle": "Sponge cake is a cake based on flour, sugar, butter and eggs, and is sometimes leavened with baking powder. ",
        "buttons": [{
          "title": "Buy now",
          "type": "postback",
          "payload": "SPONGECAKE_PAYLOAD"
        }]
      },
      {
        "title": "Frog cake",
        "image_url": "http://www.eatlivetravelwrite.com/wp-content/uploads/2016/01/Homemade-frog-cake-on-eatlivetravelwrite.com_.jpg",
        "subtitle": "The frog cake is a dessert in the shape of a frog's head, composed of sponge cake and cream covered with fondant.",
        "buttons": [{
          "title": "Buy now",
          "type": "postback",
          "payload": "FROGCAKE_PAYLOAD"
        }]
      }
    ], [{
      "title": "View More",
      "type": "postback",
      "payload": "VIEWMORE_PAYLOAD"
    }], options));

  } else if (text == 'Doughnut') {
    chat.say('Here is a list of the doughnuts available', {
      typing: true
    }).then(() => chat.sendListTemplate([{
        "title": "Strawberry-frosted donut",
        "image_url": "http://del.h-cdn.co/assets/15/23/768x576/gallery-1433276772-img-7132.jpg",
        "subtitle": "This was way too sweet, and had an incredibly artificial-tasting strawberry flavor, making it the donut the loser of the classic donuts.",
        "buttons": [{
          "title": "Buy now",
          "type": "postback",
          "payload": "STRAWBERRYFROSTEDDONUT_PAYLOAD"
        }]
      },
      {
        "title": "Cinnamon-sugar donut",
        "image_url": "http://del.h-cdn.co/assets/15/23/768x576/gallery-1433276644-img-7125.jpg",
        "subtitle": "While a great idea in theory, the ratio of cinnamon to sugar was way off here.",
        "buttons": [{
          "title": "Buy now",
          "type": "postback",
          "payload": "CINNAMONSUGAR_PAYLOAD"
        }]
      },
      {
        "title": "Blueberry donut",
        "image_url": "http://del.h-cdn.co/assets/15/23/768x576/gallery-1433277188-img-7135.jpg",
        "subtitle": "While one of our tasters proclaimed this to be her absolute favorite, the rest of us just couldn't get past the sweetness explosion.",
        "buttons": [{
          "title": "Buy now",
          "type": "postback",
          "payload": "BLUEBERRYDONUT_PAYLOAD"
        }]
      },
      {
        "title": "Jelly donut",
        "image_url": "http://del.h-cdn.co/assets/15/23/768x576/gallery-1433276500-img-7122.jpg",
        "subtitle": "The jelly in this confection tasted like a pudding cup.",
        "buttons": [{
          "title": "Buy now",
          "type": "postback",
          "payload": "JELLYDONUT_PAYLOAD"
        }]
      }
    ], [{
      "title": "View More",
      "type": "postback",
      "payload": "VIEWMORE_PAYLOAD"
    }], options));

  } else {

  }

  bot.on('postback:BLACKFOREST_PAYLOAD', (payload, chat) => {
    chat.say('You selected BlackForest', {
      typing: true
    });
    chat.conversation((convo) => {
      convo.set('name', 'blackforest');
      convo.sendTypingIndicator(1000).then(() => askQuantity(convo));
    });
  });


  const askQuantity = (convo) => {

    const question = {
      text: `How many do you want?`,
      quickReplies: ['1', '2', '3', '4', '5']
    };

    const answer = (payload, convo, data) => {
      // const text = payload.message.text;
      // convo.set('Quantity',text);
      // convo.say(`Ok ${text} of them.`);

    };

    const payload = [{
      event: 'quick_reply',
      callback: (payload, convo, data) => {
        const text = payload.message.text;
        convo.set('Quantity', text);
        convo.say(`Ok ${text} of them.`);
        askSize(convo);
      }
    }];

    const options = {
      typing: true
    };

    convo.ask(question, answer, payload, options);

    // convo.ask({
    // 	text: `How many do you want?`,
    // 	quickReplies: ['1', '2', '3','4','5']
    // }, {
    //   text: `Ok ${payload.message.text} of them.`
    // });
    // const text = payload.message.text;
    // convo.set('Quantity',text).then(() => askSize(convo) );
  };

  const askSize = (convo) => {

    const question = {
      text: `What size would you like?`,
      quickReplies: ['500g', '1Kg', '2Kg']
    };
    const answer = (payload, convo, data) => {
      // const text = payload.message.text;
      // convo.say(`Ok ${text} .`);
      // convo.set('Size',text);
    };

    const payload = [{
      event: 'quick_reply',
      callback: (payload, convo, data) => {
        const text = payload.message.text;
        convo.say(`Ok ${text} .`);
        convo.set('Size', text);

        const payload_1 = {

          "template_type": "receipt",
          "recipient_name": "Peter Chang",
          "order_number": "000000000000000",
          "currency": "USD",
          "payment_method": "Visa 1234",
          "timestamp": "1428444852",
          "elements": [{
              "title": "Oculus Rift",
              "subtitle": "Includes: headset, sensor, remote",
              "quantity": 1,
              "price": 599.00,
              "currency": "USD"
            },
            {
              "title": "Samsung Gear VR",
              "subtitle": "Frost White",
              "quantity": 1,
              "price": 99.99,
              "currency": "USD"
            }
          ],
          "address": {
            "street_1": "1 Hacker Way",
            "street_2": "",
            "city": "Menlo Park",
            "postal_code": "94025",
            "state": "CA",
            "country": "US"
          },
          "summary": {
            "subtotal": 698.99,
            "shipping_cost": 20.00,
            "total_tax": 57.67,
            "total_cost": 626.66
          },
          "adjustments": [{
              "name": "New Customer Discount",
              "amount": -50
            },
            {
              "name": "$100 Off Coupon",
              "amount": -100
            }
          ]


        };




        const options_1 = {
          typing: true
        };
        convo.sendTemplate(payload_1, options_1);

        convo.say(`Ok, here's what you told me about you:
      - Name: ${convo.get('Size')}
      - Favorite Food: ${convo.get('Quantity')}
      `);
        askSize(convo);
      }
    }];

    const options = {
      typing: true
    };

    convo.ask(question, answer, payload, options);
    // convo.ask({
    //   text: `What size would you like?`,
    //   quickReplies: ['500g', '1Kg', '2Kg']
    // }, {
    //   text: `Ok ${payload.message.text}`
    // });
    // const text = payload.message.text;
    // convo.set('Size',text).then(() => askSize(convo));
    // convo.end();
  };

  const sendReceipt = (convo) => {

  }


  //   const question1 = {
  //     text: `What size would you like?`,
  //     quickReplies: ['500g', '1Kg', '2Kg']
  //   };
  //
  //   const answer1 = (payload, convo) => {
  //     const text = payload.message.text;
  //     convo.say(`Ok ${text} .`);
  //   };
  //
  // //   bot.hear('hello', (payload, chat) => {
  // //   chat.conversation((convo) => {
  // //     convo.sendTypingIndicator(1000).then(() => askName(convo));
  // //   });
  // // });
  //
  // const askName = (convo) => {
  //   convo.ask(`Hello! What's your name?`, (payload, convo, data) => {
  //     const text = payload.message.text;
  //     convo.set('name', text);
  //     convo.say(`Oh, your name is ${text}`).then(() => askFavoriteFood(convo));
  //   });
  // };
  //
  // const askFavoriteFood = (convo) => {
  //   convo.ask(`What's your favorite food?`, (payload, convo, data) => {
  //     const text = payload.message.text;
  //     convo.set('food', text);
  //     convo.say(`Got it, your favorite food is ${text}`).then(() => askGender(convo));
  //   });
  // };

  // const askGender = (convo) => {
  //   convo.ask((convo) => {
  //     const buttons = [
  //       { type: 'postback', title: 'Male', payload: 'GENDER_MALE' },
  //       { type: 'postback', title: 'Female', payload: 'GENDER_FEMALE' },
  //       { type: 'postback', title: 'I don\'t wanna say', payload: 'GENDER_UNKNOWN' }
  //     ];
  //     convo.sendButtonTemplate(`Are you a boy or a girl?`, buttons);
  //   }, (payload, convo, data) => {
  //     const text = payload.message.text;
  //     convo.set('gender', text);
  //     convo.say(`Great, you are a ${text}`).then(() => askAge(convo));
  //   }, [
  //     {
  //       event: 'postback',
  //       callback: (payload, convo) => {
  //         convo.say('You clicked on a button').then(() => askAge(convo));
  //       }
  //     },
  //     {
  //       event: 'postback:GENDER_MALE',
  //       callback: (payload, convo) => {
  //         convo.say('You said you are a Male').then(() => askAge(convo));
  //       }
  //     },
  //     {
  //       event: 'quick_reply',
  //       callback: () => {}
  //     },
  //     {
  //       event: 'quick_reply:COLOR_BLUE',
  //       callback: () => {}
  //     },
  //     {
  //       pattern: ['yes', /yea(h)?/i, 'yup'],
  //       callback: () => {
  //         convo.say('You said YES!').then(() => askAge(convo));
  //       }
  //     }
  //   ]);
  // };

  // const askAge = (convo) => {
  //   convo.ask(`Final question. How old are you?`, (payload, convo, data) => {
  //     const text = payload.message.text;
  //     convo.set('age', text);
  //     convo.say(`That's great!`).then(() => {
  //       convo.say(`Ok, here's what you told me about you:
  //       - Name: ${convo.get('name')}
  //       - Favorite Food: ${convo.get('food')}
  //       - Gender: ${convo.get('gender')}
  //       - Age: ${convo.get('age')}
  //       `);
  //       convo.end();
  //     });
  //   });
  // };

  //   bot.hear('Cake', (payload, chat) => {
  //
  // });

  // bot.hear('Doughnut', (payload, chat) => {
  //
  // });

  // bot.on('postback:BLACKFOREST_PAYLOAD', (payload, chat) => {
  //   chat.say('You selected BlackForest',{typing: true});
  //   chat.conversation((convo) => {
  //     convo.sendTypingIndicator(1000).then(() => askQuantity(convo)).then(() => askSize(convo));
  //   });
  // });
  //
  // const askQuantity = (convo) => {
  //   convo.ask(question, answer)
  // };
  //
  // const question = {
  // 	text: `How many do you want?`,
  // 	quickReplies: ['1', '2', '3','4','5']
  // };
  //
  // const answer = (payload, convo) => {
  // 	const text = payload.message.text;
  // 	convo.say(`Ok ${text} of them.`);
  // };
  //
  // const askSize = (convo) => {
  //   convo.ask(question1, answer1);
  // };
  //
  // const question1 = {
  //   text: `What size would you like?`,
  //   quickReplies: ['500g', '1Kg', '2Kg']
  // };
  //
  // const answer1 = (payload, convo) => {
  //   const text = payload.message.text;
  //   convo.say(`Ok ${text} .`);
  // };

  // bot.hear('hello', (payload, chat) => {
  //   chat.conversation((convo) => {
  //     convo.sendTypingIndicator(1000).then(() => askName(convo));
  //   });
  // });

  // const askFavoriteFood = (convo) => {
  //   convo.ask(`What's your favorite food?`, (payload, convo, data) => {
  //     const text = payload.message.text;
  //     convo.set('food', text);
  //     convo.say(`Got it, your favorite food is ${text}`).then(() => askGender(convo));
  //   });
  // };
  //
  // chat.say(welcome, options)
  //   .then(() => chat.say({
  //     text: 'What would you like to order today?',
  //     quickReplies: ['Cake', 'Doughnut']
  //   }));

});

bot.start();

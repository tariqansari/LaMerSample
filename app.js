// This loads the environment variables from the .env file
require('dotenv-extended').load();

var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(8085, function() {

  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot and listen to messages
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());
var inMemoryStorage = new builder.MemoryBotStorage();
var bot = new builder.UniversalBot(connector, [
  function(session) {
    var kateHudson = 'Kate Hudson x La Mer';
    var FindMyRegimen = 'Find My Regimen';
    var FiveminOption = 'Get Consultation';
    var HydratedComforted = "Discover La Mer";
    var UltraRichDewy = "Customer Support";
    var CouroselCardName = "Store Locator";
    var MenuOptions = [kateHudson, FindMyRegimen, FiveminOption, HydratedComforted, UltraRichDewy, CouroselCardName];
    builder.Prompts.choice(session, "Please select your option", MenuOptions, { listStyle: 3 });
  },

// create the card for GetStarted

  function(session, results) {
    // create the card based on selection
    var selectedCardName = results.response.entity;
    console.log("Inside Sample APP-------------------->"+selectedCardName);
    var getStarted = 'Get Started';
    var goback = 'Go Back';
    var GetStartedOption = [getStarted, goback];
      builder.Prompts.choice(session, "Got a minute or two? Answer four quick questions and we'll design a custom La Mer regimen tailored to your skincare needs.", GetStartedOption, { listStyle: 3 });
  },
  // Response on Describing the skin nature
  function(session, results) {
  //  var selectedCardName1 = results.response.entity;
    var selectedCardName3 = results.response.entity;
    console.log("Inside Sample APP2-------------------->"+selectedCardName3);
  // Image creation
    var card3 = createImageforSkinNature(session);
    var msg3 = new builder.Message(session).addAttachment(card3);
    session.send(msg3);
    var HydratedComforted = 'Hydrated Comforted';
    var Brightluminous = 'Bright luminous';
    var Youthfullineless = 'Youthful, lineless';
    var Liftedresilient = 'Lifted, resilient';
    var Restoredrejuvenated = 'Restored rejuvenated';
    var skinDescriptionOption = [HydratedComforted, Brightluminous, Youthfullineless, Liftedresilient, Restoredrejuvenated];
      builder.Prompts.choice(session, "Describe your skin's perfect moment." , skinDescriptionOption, { listStyle: 3 });
  },

//// Set the COURSEL CARD Now

function(session, results) {
//  var selectedCardName1 = results.response.entity;
  var selectedCardName5 = results.response.entity;
  console.log("Inside Sample APP2-------------------->"+selectedCardName5);
// Image creation
  var card6 = createCouroselCard(session);
  var reply = new builder.Message(session)
    .attachmentLayout(builder.AttachmentLayout.carousel)
    .attachments(card6);
  session.send(reply);
}
]).set('storage', inMemoryStorage);

// Creating the response on Clicking on 'Find my Regimen'
function createFindMyRegimen(session)
{
  var GetStarted = 'Get Started';
  var GoBack = 'Go Back';
  var GreetingOption = [GetStarted, GoBack];
  return new builder.HeroCard(session)
    .title("Got a minute or two? Answer four quick questions and we'll design a custom La Mer regimen tailored to your skincare needs.");
}



function createImageforSkinNature(session)
{
  return new builder.HeroCard(session)
    .images([
      // Image of the url
      builder.CardImage.create(session, 'https://scontent-mxp1-1.xx.fbcdn.net/v/t34.18173-0/p280x280/19756201_1511255548972595_2069004403_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=ab04759275ca3d4dbd595e59c8a7720d&oe=5AF7AFD4')
    ]);
}



// Courosel card creation
function createCouroselCard(session)
{
  return [
    new builder.HeroCard(session)
    .title('Step1')
    .subtitle('The treatment lotion')
    .images([
      builder.CardImage.create(session, 'https://imageskincare.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/v/i/vital_c_serum_award.png')
    ])
    .buttons([
  //    builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/storage/', 'Find out More')
      builder.CardAction.openUrl(session, 'https://www.cremedelamer.com/product/11484/25354/prep/the-treatment-lotion/treatment-essence?cm_mmc=Organic_Social-_-Facebook-_-Chatbot-_-Product_TL#/sku/47744', 'Shop Now')
    ]),

    new builder.HeroCard(session)
    .title('Step2')
    .subtitle('Regenerating Serum')
    .images([
      builder.CardImage.create(session, 'https://imageskincare.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/a/g/ageless-anti-aging-serum_2.png')
    ])
    .buttons([
    //  builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/storage/', 'Find out More')
      builder.CardAction.openUrl(session, 'https://www.cremedelamer.com/product/9090/12527/serums/the-regenerating-serum/best-face-serum?cm_mmc=Organic_Social-_-Facebook-_-Chatbot-_-Product_RS#/sku/26754', 'Shop Now')
    ]),

    new builder.HeroCard(session)
    .title('Step3')
    .subtitle('Eye Concentrate')
    .images([
      builder.CardImage.create(session, 'https://imageskincare.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/o/r/ormedic-balancing-anti-oxidant-serum_1.png')
    ])
    .buttons([
    //  builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/storage/', 'Find out More')
      builder.CardAction.openUrl(session, 'https://www.cremedelamer.com/product/11484/25354/prep/the-treatment-lotion/treatment-essence?cm_mmc=Organic_Social-_-Facebook-_-Chatbot-_-Product_TL#/sku/47744s', 'Shop Now')
    ]),

    new builder.HeroCard(session)
    .title('Step4')
    .subtitle('Moisturizing Cool Gel Cream')
    .images([
      builder.CardImage.create(session, 'https://imageskincare.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/o/r/ormedic_care4skin_lip_vday_with_violator.png')
    ])
    .buttons([
    //  builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/storage/', 'Find out More')
      builder.CardAction.openUrl(session, 'https://www.cremedelamer.com/product/9090/12527/serums/the-regenerating-serum/best-face-serum?cm_mmc=Organic_Social-_-Facebook-_-Chatbot-_-Product_RS#/sku/26754', 'Shop Now')
    ])
  ];
}

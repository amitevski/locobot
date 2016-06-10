
import {
  IBotSettings,
  Bot,
  IBotController,
  IBotRequest,
  IBotReply
} from 'botframework';

import {getPlacesNearby} from './yelp';


class BotController implements IBotController{

  /**
   * handler for received text message
   */
  textMessage(msg: IBotRequest, reply: IBotReply) {
    reply.text(`Hi ${msg.user.firstname}. Send me your location to find places nearby ;)`);
  }

  /**
   * handler for received Location
   */
  locationMessage(msg: IBotRequest, reply: IBotReply) {
    reply.text('Looking for locations..');
    getPlacesNearby(msg)
    .then( locationsResponse => reply.list(locationsResponse) )
    .catch( (err) => {
      console.error(`error getting locations ${JSON.stringify(err, null, 2)}`)
      reply.text(`Oops, something went wrong :( Please try again in a few minutes.`)
    })
  }
}

let botSettings: IBotSettings = {
  fb: {
    page_id: process.env.FB_PAGE_ID,
    verify_token: process.env.FB_VERIFY_ID,
    port: process.env.FB_PORT,
    access_token: process.env.FB_ACCESS_TOKEN,
    callback_path: process.env.FB_MESSENGER_CALLBACK_URL
  }
} ;

let bot = new Bot(botSettings, new BotController());
bot.setWelcomeMessage('Send loco your location and he will send you places nearby (y)');



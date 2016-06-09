
import {
  IBotSettings,
  Bot,
  IBotController,
  IBotRequest,
  IBotReply
} from 'botframework';


class BotController implements IBotController{
  textMessage(msg: IBotRequest, reply: IBotReply) {
    reply.text(`Hi ${msg.user.firstname} :)`);
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



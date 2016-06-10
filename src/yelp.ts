var Yelp = require('yelp');
import {IBotRequest, IBotReplyListItem} from 'botframework';

var yelp = new Yelp({
  consumer_key: process.env.Y_CONSUMER_KEY,
  consumer_secret: process.env.Y_CONSUMER_SECRET,
  token: process.env.Y_TOKEN,
  token_secret: process.env.Y_TOKEN_SECRET,
});

export function getPlacesNearby(msg: IBotRequest) {
  let {lat, long} = msg.location.coordinates;
  let ll = `${lat},${long}`;
  return yelp.search({ limit: 10, ll, radius_filter: 1000, actionlinks: true })
    .then((data) => {
      // console.log(JSON.stringify(data,null,2));
      try {
        let botItems: Array<IBotReplyListItem> = data.businesses.map((business: any) => {
          let buttons = [
            // if location add route link
            {
              title: 'Open Link',
              url: business.mobile_url,
              type: 'web_url' //fix enums in lib
            }
          ];
          if (msg && msg.location && business.location) {
            buttons.unshift({
              title: 'Get Directions',
              url: `http://maps.google.de/maps?saddr=${ll}(Your+Location)&daddr=${business.location.coordinate.latitude},${business.location.coordinate.longitude}(Goal)`,
              type: 'web_url' //fix enums in lib
            });
          }

          return {
            title: business.name,
            image_url: business.image_url,
            subtitle: `Distance: ${parseInt(business.distance)}m\nRating: ${business.rating}*\n${business.snippet_text}\nPhone: ${business.display_phone}`,
            buttons
          }
        });
        return botItems;
      } catch (e) {
        console.log(e);
        throw e;
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

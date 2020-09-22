import dabbangAPI from "./dabbangApi";
import { sendMailList } from "./mailSend";
import dabbangApiQuery from "../dabbangAPI.json";

Promise.all(dabbangApiQuery.map(dabbangAPI.list)).then((listBody) => {
  const rooms: RoomListItem[] = listBody.map((body) => body.rooms).flat();
  Promise.all(
    rooms.map(async (room: RoomListItem) => dabbangAPI.detail(room.id))
  ).then((roomList: any[]) => {
    const mailList = roomList
      .filter(({ room }) => {
        const today = new Date();
        today.setDate(today.getDate() - 2);
        return (
          today <=
          new Date(
            room.saved_time_str || room.save_time_str || room.lately_time_str
          )
        );
      })
      .map(({ room }) => {
        return {
          title: room.title,
          image: `https://d1774jszgerdmk.cloudfront.net/1024/${room.photos[0]}`,
          memo: room.memo,
          url: room.shorten_url,
          room_type_str: room.room_type_str,
          size: `${Math.floor(room.room_size / 3.3)}/${Math.floor(
            room.provision_size / 3.3
          )}`,
          month_total_cost_str: room.month_total_cost_str,
          price_title: room.price_title,
          address: room.full_road_address_str,
          approval_date: room.building_approval_date_str,
        };
      });
    if (mailList.length !== 0) {
      sendMailList("다방", mailList);
    }
  });
});

type RoomListItem = {
  is_favorited: null;
  seq: number;
  id: string;
  user_id: string;
  status: number;
  deleted: boolean;
  name: string;
  title: string;
  room_type: number;
  location: any[];
  random_location: any[];
  complex_name?: any;
  premium_badge?: any;
  hash_tags: string[];
  room_type_str: string;
  room_desc: string;
  img_url: string;
  img_urls: string[];
  is_pano: boolean;
  price_title: string;
  selling_type: number;
  is_confirm: boolean;
  confirm_type?: any;
  confirm_date_str: string;
  is_quick: boolean;
  is_messenger_actived: boolean;
  is_extend_ui: boolean;
  time?: string;
};

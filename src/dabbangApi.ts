import fetch from "node-fetch";
import qs from "querystring";

export default {
  list: (json: any) =>
    fetch(
      `https://www.dabangapp.com/api/3/room/list/multi-room/bbox?${qs.stringify(
        {
          ...json,
          filters: JSON.stringify(json.filters),
          location: JSON.stringify(json.location),
        }
      )}`,
      {
        method: "GET",
      }
    ).then((response) => {
      return response.json();
    }),
  detail: (room_id: string): Promise<any> =>
    fetch(
      `https://www.dabangapp.com/api/3/room/detail2?${qs.stringify({
        room_id,
        use_map: "kakao",
        version: 1,
        api_version: "3.0.1",
        call_type: "web",
      })}`,
      {
        method: "GET",
      }
    ).then((response) => {
      return response.json();
    }),
};

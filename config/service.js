const API_URL = 'http://192.168.43.38:7777';
const LIFE_SERVICE = '/xydl-life';
const USER_SERVICE = '/xydl-user';
const ATLAS_SERVICE = '/xydl-atlas';
/**
 * 机器人相关接口
 */
const ROBOT_CHAT = API_URL + LIFE_SERVICE + '/robot/chat';
const ROBOT_RECOFNIZE = API_URL + LIFE_SERVICE + '/robot/recognize';
/**
 * 失物招领相关接口
 */
const LOST_FOUND_SELECT = API_URL + LIFE_SERVICE + '/lostFound/select';
const LOST_FOUND_PUBLISH = API_URL + LIFE_SERVICE + '/lostFound/publish';
const LOST_FOUND_DELETE = API_URL + LIFE_SERVICE + '/lostFound/delete';
const LOST_FOUND_LIST_MINE = API_URL + LIFE_SERVICE + '/lostFound/listMine';
const LOST_FOUND_GET_ONE = API_URL + LIFE_SERVICE + '/lostFound/getLostFound';
/**
 * 快递代领相关接口
 */
const EXPRESS_PUBLISH = API_URL + LIFE_SERVICE + '/express/publish';

/**
 * 定义接口
 */
module.exports = {
  ROBOT_CHAT,
  ROBOT_RECOFNIZE,
  LOST_FOUND_SELECT,
  LOST_FOUND_PUBLISH,
  LOST_FOUND_DELETE,
  LOST_FOUND_LIST_MINE,
  LOST_FOUND_GET_ONE,
  EXPRESS_PUBLISH
}
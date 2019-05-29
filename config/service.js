const API_URL = 'http://192.168.43.38:7777';
const LIFE_SERVICE = '/xydl-life';
const USER_SERVICE = '/xydl-user';
const ATLAS_SERVICE = '/xydl-atlas';
/**
 * 登录相关接口
 */
const LOGIN_GET_TOKEN = API_URL + USER_SERVICE + '/login/getToken';
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
const EXPRESS_UNACCEPT_LIST = API_URL + LIFE_SERVICE + '/express/listUnAcceptOrder';
const EXPRESS_PUBLISHOR_LIST = API_URL + LIFE_SERVICE + '/express/listByPublishor';
const EXPRESS_ACCEPTOR_LIST = API_URL + LIFE_SERVICE + '/express/listByAcceptor';
const EXPRESS_CATCH = API_URL + LIFE_SERVICE + '/express/catch';
const EXPRESS_AUTHORRIZATION = API_URL + LIFE_SERVICE + '/express/authorization';
const EXPRESS_REFUSE_ACCEPT = API_URL + LIFE_SERVICE + '/express/refuseAccept';
const EXPRESS_SENDED = API_URL + LIFE_SERVICE + '/express/sended';
const EXPRESS_RECEIVED = API_URL + LIFE_SERVICE + '/express/received';
const EXPRESS_CANCEL = API_URL + LIFE_SERVICE + '/express/cancel';
const EXPRESS_RE_PUBLISH = API_URL + LIFE_SERVICE + '/express/rePublish';
const EXPRESS_GET_ORDER = API_URL + LIFE_SERVICE + '/express/getExpressOrder';
/**
 * 用户相关接口
 */
const USER_IS_IDENTITY = API_URL + USER_SERVICE + '/user/isAuthorize';
const USER_IDENTITY = API_URL + USER_SERVICE + '/user/authorize';
/**
 * 意见反馈相关接口
 */
const FEEDBACK = API_URL + LIFE_SERVICE + '/feedback/commit';
/**
 * 公交定位相关接口
 */
const LIST_POINTERS = API_URL + ATLAS_SERVICE + '/bus/listPointer';
/**
 * 定义接口
 */
module.exports = {
  LOGIN_GET_TOKEN,
  ROBOT_CHAT,
  ROBOT_RECOFNIZE,
  LOST_FOUND_SELECT,
  LOST_FOUND_PUBLISH,
  LOST_FOUND_DELETE,
  LOST_FOUND_LIST_MINE,
  LOST_FOUND_GET_ONE,
  EXPRESS_PUBLISH,
  EXPRESS_UNACCEPT_LIST,
  EXPRESS_PUBLISHOR_LIST,
  EXPRESS_ACCEPTOR_LIST,
  EXPRESS_CATCH,
  EXPRESS_AUTHORRIZATION,
  EXPRESS_REFUSE_ACCEPT,
  EXPRESS_SENDED,
  EXPRESS_RECEIVED,
  EXPRESS_CANCEL,
  EXPRESS_RE_PUBLISH,
  EXPRESS_GET_ORDER,
  USER_IS_IDENTITY,
  USER_IDENTITY,
  FEEDBACK,
  LIST_POINTERS
}
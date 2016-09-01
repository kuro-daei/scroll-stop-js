/**
 * ScrollStop trigger function
 * @author Eiji Kuroda
 * @license Apache-2.0
 * Stop Scrolling when the target element appear in viewport.
 */

import ScrollStop from './scrollstop';

/**
* DacScrollStop メソッド
* @constructor
* @param {object} elm - ScrollStopして見せたい広告
* @param {Number} sleep - 止める秒数
* @param {Number} limit - 止める回数
*/
window.DacScrollStop = function(elm, sleep, limit){
  var ss = new ScrollStop(elm, sleep, limit);
};

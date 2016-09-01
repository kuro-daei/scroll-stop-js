/**
 * ScrollStop module
 * @author Eiji Kuroda
 * @license Apache-2.0
 * Stop Scrolling when the target element appear in viewport.
 */
/* globals $sf , __PRODUCTION__ */
export default class ScrollStop{

  constructor(elm, sleep, limit = 1, marginTop = 0, marginBottom = 0){
    this._elm = elm;
    this._sleep = sleep;
    this._limit = limit;
    this._marginTop = marginTop;
    this._marginBottom = marginBottom;
    if(typeof __PRODUCTION__ === 'undefined'){
      this._log = (msg) => window.console.log(msg);
    }else{
      this._log = (msg) => {return;};
    }
    this._observerListener = () => this._observer();
    this._scrollListener = () => this._preventDefault();
    this._stopping = false;
    this._setObservers();
    this._lastIsInview = this._isInview();
  }

  _setObservers(){
    this._log('_setObservers');
    window.addEventListener('scroll', this._observerListener, false);
    window.addEventListener('wheel', this._observerListener, false);
    window.addEventListener('touchmove', this._observerListener, false);
    this._interval = window.setInterval(this._observerListener, 500);
  }

  _removeObservers(){
    this._log('_removeObservers');
    window.removeEventListener('scroll', this._observerListener, false);
    window.removeEventListener('wheel', this._observerListener, false);
    window.removeEventListener('touchmove', this._observerListener, false);
    window.clearInterval(this._interval);
  }

  _observer(){
    if(this._stopping || this._lastIsInview === this._isInview()){
      return;
    }
    this._lastIsInview = this._isInview();
    if(this._lastIsInview){
      let msec = this._sleep * 1000;
      this._disableScroll(msec).then(() => this._enableScroll());
      this._lastIsInview = true;
      this._limit -= 1;
      this._log('Remain Stop Count : ' + this._limit);
      if(this._limit <= 0){
        this._removeObservers();
      }
    }
  }

  _isInview(){
    this._log('_isInview');
    var stageHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var bounds = this._elm.getBoundingClientRect();
    var top = bounds.top;
    var bottom = bounds.top + bounds.height;
    this._log('top:' + top + ',bottom:' + bottom + ', stageHeight:' + stageHeight);
    var isInview = top >= 0 && bottom < stageHeight;
    this._log('isInview : ' + isInview);
    return isInview;
  }

  _preventDefault(){
    this._log('_preventDefault');
    window.event.preventDefault();
    window.event.returnValue = false;
  }

  _disableScroll(sleep){
    this._log('_disableScroll w/ sleep:' + sleep + 'ms');
    window.addEventListener('wheel', this._scrollListener, false);
    window.addEventListener('touchmove', this._scrollListener, false);
    this._stopping = true;
    return new Promise(function(resolve, reject){
      setTimeout(resolve, sleep);
    });
  }

  _enableScroll(){
    this._log('_enableScroll');
    window.removeEventListener('wheel', this._scrollListener, false);
    window.removeEventListener('touchmove', this._scrollListener, false);
    this._stopping = false;
  }

}

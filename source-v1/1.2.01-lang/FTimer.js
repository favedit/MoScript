﻿//==========================================================
// <T>计时器。</T>
//
// @class
// @author maocy
// @version 150316
//==========================================================
function FTimer(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._count      = 0;
   // @attribute
   o._startTime  = 0;
   o._beginTime  = 0;
   o._endTime    = 0;
   o._stopTime   = 0;
   // @attribute
   o._span       = 0;
   o._spanSecond = 0;
   //..........................................................
   // @method
   o.setup       = FTimer_setup;
   o.current     = FTimer_current;
   o.span        = FTimer_span;
   o.spanSecond  = FTimer_spanSecond;
   o.rate        = FTimer_rate;
   o.update      = FTimer_update;
   return o;
}

//===========================================================
// <T>配置处理。</T>
//
// @method
//===========================================================
function FTimer_setup(){
   var o = this;
   var n = new Date().getTime();
   o._startTime = n;
   o._beginTime = n;
   o._endTime = n;
}

//===========================================================
// <T>获得当前时间。</T>
//
// @method
// @return Number 时间
//===========================================================
function FTimer_current(){
   return this._lastTime;
}

//===========================================================
// <T>获得经过毫秒间隔。</T>
//
// @method
// @return Number 毫秒间隔
//===========================================================
function FTimer_span(){
   return this._span;
}

//===========================================================
// <T>获得经过秒间隔。</T>
//
// @method
// @return Number 秒间隔
//===========================================================
function FTimer_spanSecond(){
   return this._spanSecond;
}

//===========================================================
// <T>获得速率(次/秒)。</T>
//
// @method
// @return Number 速率
//===========================================================
function FTimer_rate(){
   var o = this;
   if(o._count == 0){
      return 0;
   }
   var t = o._lastTime - o._startTime;
   var c = o._count * 1000 / t;
   return parseInt(c);
}

//===========================================================
// <T>更新处理。</T>
//
// @method
//===========================================================
function FTimer_update(){
   var o = this;
   o._count++;
   var b = o._beginTime = o._endTime;
   var e = o._endTime = new Date().getTime();
   var s = o._span = e - b;
   o._spanSecond = s / 1000;
}

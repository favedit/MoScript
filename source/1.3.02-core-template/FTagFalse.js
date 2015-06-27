﻿//==========================================================
// <T>标签判断非类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
MO.FTagFalse = function FTagFalse(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   //..........................................................
   // @attribute
   o._trimLeft = true;
   o._source   = null;
   //..........................................................
   // @event
   o.onBegin   = MO.FTagFalse_onBegin;
   //..........................................................
   // @method
   o.set       = MO.FTagFalse_set;
   o.toString  = MO.FTagFalse_toString;
   return o;
}

//==========================================================
// <T>开始处理。</T>
//
// @method
// @param p:context:FTagContext 环境
// @return EResult 处理结果
//==========================================================
MO.FTagFalse_onBegin = function FTagFalse_onBegin(p){
   var o = this;
   var v = p.get(o._source);
   return MO.RBoolean.parse(v) ? MO.EResult.Skip : MO.EResult.Continue;
}

//==========================================================
// <T>设置属性值。</T>
//
// @method
// @param n:name:String 名称
// @param v:level:Integer 内容
//==========================================================
MO.FTagFalse_set = function FTagFalse_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}

//==========================================================
//<T>获得字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.FTagFalse_toString = function FTagFalse_toString(){
   var o = this;
   return 'source=' + o._source;
}

﻿//==========================================================
// <T>标签判断真类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
function FTagEquals(o){
   o = RClass.inherits(this, o, FTag);
   //..........................................................
   // @attribute
   o._trimLeft = true;
   o._source   = null;
   o._value    = null;
   //..........................................................
   // @event
   o.onBegin   = FTagEquals_onBegin;
   //..........................................................
   // @method
   o.set       = FTagEquals_set;
   o.toString  = FTagEquals_toString;
   return o;
}

//==========================================================
// <T>开始处理。</T>
//
// @method
// @param p:context:FTagContext 环境
// @return EResult 处理结果
//==========================================================
function FTagEquals_onBegin(p){
   var o = this;
   var r = false;
   var s = p.get(o._source);
   var vs = o._value.split('|');
   var c = vs.length;
   for(var i = 0; i < c; i++){
      var v = vs[i]
      if(s == v){
         r = true;
         break;
      }
   }
   return r ? EResult.Continue : EResult.Skip;
}

//==========================================================
// <T>设置属性值。</T>
//
// @method
// @param n:name:String 名称
// @param v:level:Integer 内容
//==========================================================
function FTagEquals_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
      case 'value':
         o._value = v;
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
function FTagEquals_toString(){
   var o = this;
   return 'source=' + o._source + ', value=' + o._value;
}

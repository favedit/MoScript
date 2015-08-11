﻿//==========================================================
// <T>三维尺寸结构。</T>
//
// @struct
// @param w:width:Number 宽度
// @param h:height:Number 高度
// @param d:deep:Number 深度
// @author maocy
// @version 150101
//==========================================================
MO.SSize3 = function SSize3(w, h, d){
   var o = this;
   // @attribute
   o.width    = MO.Lang.Integer.nvl(w);
   o.height   = MO.Lang.Integer.nvl(h);
   o.deep     = MO.Lang.Integer.nvl(d);
   // @method
   o.assign   = MO.SSize3_assign;
   o.set      = MO.SSize3_set;
   o.parse    = MO.SSize3_parse;
   o.toString = MO.SSize3_toString;
   o.dump     = MO.SSize3_dump;
   return o;
}

//============================================================
// <T>接收对象数据。</T>
//
// @param v:value:SSize3 三维尺寸
//============================================================
MO.SSize3_assign = function SSize3_assign(v){
   var o = this;
   o.width = v.width;
   o.height = v.height;
   o.deep = v.deep;
}

//============================================================
// <T>设置数据内容。</T>
//
// @param w:width:Number 宽度
// @param h:height:Number 高度
// @param d:deep:Number 深度
//============================================================
MO.SSize3_set = function SSize3_set(w, h, d){
   var o = this;
   o.width = w;
   o.height = h;
   o.deep = d;
}

//============================================================
// <T>解析字符串。</T>
//
// @param v:value:String 字符串
//============================================================
MO.SSize3_parse = function SSize3_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 3){
      o.width = parseInt(r[0]);
      o.height = parseInt(r[1]);
      o.deep = parseInt(r[2]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", v);
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
MO.SSize3_toString = function SSize3_toString(){
   var o = this;
   return o.width + ',' + o.height + ',' + o.deep;
}

//============================================================
// <T>获得运行信息。</T>
//
// @return String 运行信息
//============================================================
MO.SSize3_dump = function SSize3_dump(){
   var o = this;
   return MO.Lang.Class.dump(o) + ' [' + o.width + ',' + o.height + ',' + o.deep + ']';
}
//============================================================
// <T>二维坐标结构。</T>
//
// @struct
// @author maochunyang
// @version 141230
//============================================================
MO.SPoint2 = function SPoint2(x, y){
   var o = this;
   MO.SValue2.call(o, MO.Lang.Integer.nvl(x), MO.Lang.Integer.nvl(y));
   //..........................................................
   // @method
   o.serialize   = MO.SPoint2_serialize;
   o.unserialize = MO.SPoint2_unserialize;
   // @method
   o.parse       = MO.SPoint2_parse;
   o.parseFloat  = MO.SPoint2_parseFloat;
   o.toString    = MO.SPoint2_toString;
   // @method
   o.dispose     = MO.SPoint2_dispose;
   return o;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param output:MStream 数据流
//==========================================================
MO.SPoint2_serialize = function SPoint2_serialize(output){
   var o = this;
   output.writeFloat(o.x);
   output.writeFloat(o.y);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param input:MStream 数据流
//==========================================================
MO.SPoint2_unserialize = function SPoint2_unserialize(input){
   var o = this;
   o.x = input.readFloat();
   o.y = input.readFloat();
}

//============================================================
// <T>解析字符串。</T>
//
// @param source:String 字符串
//============================================================
MO.SPoint2_parse = function SPoint2_parse(source){
   var o = this;
   var items = source.split(',')
   if(items.length == 2){
      o.x = parseInt(items[0]);
      o.y = parseInt(items[1]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", source);
   }
}

//============================================================
// <T>解析字符串。</T>
//
// @param source:String 字符串
//============================================================
MO.SPoint2_parseFloat = function SPoint2_parseFloat(source){
   var o = this;
   var items = source.split(',')
   if(items.length == 2){
      o.x = parseFloat(items[0]);
      o.y = parseFloat(items[1]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", source);
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
MO.SPoint2_toString = function SPoint2_toString(){
   var o = this;
   return o.x + ',' + o.y;
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
MO.SPoint2_dispose = function SPoint2_dispose(){
   var o = this;
   o.x = null;
   o.y = null;
}

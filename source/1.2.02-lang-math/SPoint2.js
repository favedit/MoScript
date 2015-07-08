//============================================================
// <T>二维坐标结构。</T>
//
// @struct
// @author maochunyang
// @version 141230
//============================================================
MO.SPoint2 = function SPoint2(x, y){
   var o = this;
   //..........................................................
   // @attribute
   o.x           = MO.Lang.Integer.nvl(x);
   o.y           = MO.Lang.Integer.nvl(y);
   //..........................................................
   // @method
   o.isEmpty     = MO.SPoint2_isEmpty;
   o.equals      = MO.SPoint2_equals;
   o.assign      = MO.SPoint2_assign;
   o.set         = MO.SPoint2_set;
   o.serialize   = MO.SPoint2_serialize;
   o.unserialize = MO.SPoint2_unserialize;
   // @method
   o.parse       = MO.SPoint2_parse;
   o.toString    = MO.SPoint2_toString;
   // @method
   o.dispose     = MO.SPoint2_dispose;
   // @method
   o.dump        = MO.SPoint2_dump;
   return o;
}

//============================================================
// <T>判断内容是否为空。</T>
//
// @method
// @return Boolean 是否为空
//============================================================
MO.SPoint2_isEmpty = function SPoint2_isEmpty(){
   var o = this;
   return (o.x == 0) && (o.y == 0);
}

//============================================================
// 判断两个坐标是否相等
//
// @tool
// @param p:position:SPoint2
// @return boolean  是否相等，返回布尔值
//============================================================
MO.SPoint2_equals = function SPoint2_equals(p){
   return p ? (this.x == p.x && this.y == p.y) : false;
}

//============================================================
// 根据一个坐标来设置当前坐标的位置
//
// @method
// @param p:position:SPoint2 传入的坐标点
//============================================================
MO.SPoint2_assign = function SPoint2_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
}

//============================================================
// 设置坐标值
//
// @method
// @param x:xPostion:Integer x坐标值
// @param y:yPostion:Integer y坐标值
//============================================================
MO.SPoint2_set = function SPoint2_set(x, y){
   var o = this;
   o.x = x;
   o.y = y;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
MO.SPoint2_serialize = function SPoint2_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
MO.SPoint2_unserialize = function SPoint2_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
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

//============================================================
// <T>获得运行信息。</T>
//
// @method
// @return String 运行信息
//============================================================
MO.SPoint2_dump = function SPoint2_dump(){
   return MO.Class.dump(this) + ' [' + this.x + ',' + this.y + ']';
}

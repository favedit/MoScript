//==========================================================
// <T>颜色。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
MO.SCorners = function SCorners(){
   var o = this;
   //..........................................................
   // @attribute
   o.red          = 0;
   o.green        = 0;
   o.blue         = 0;
   o.alpha        = 1;
   //..........................................................
   // @method
   o.assign       = MO.SCorners_assign;
   o.assignPower  = MO.SCorners_assignPower;
   o.set          = MO.SCorners_set;
   o.serialize    = MO.SCorners_serialize;
   o.unserialize  = MO.SCorners_unserialize;
   o.unserialize3 = MO.SCorners_unserialize3;
   o.saveConfig   = MO.SCorners_saveConfig;
   o.savePower    = MO.SCorners_savePower;
   o.copyArray    = MO.SCorners_copyArray;
   o.toString     = MO.SCorners_toString;
   return o;
}

//============================================================
// <T>接收数据。</T>
//
// @method
// @param p:value:SCorners 颜色
//============================================================
MO.SCorners_assign = function SCorners_assign(p){
   var o = this;
   o.red = p.red;
   o.green = p.green;
   o.blue = p.blue;
   o.alpha = p.alpha;
}

//============================================================
// <T>接收强度数据。</T>
//
// @method
// @param p:value:SCorners 颜色
//============================================================
MO.SCorners_assignPower = function SCorners_assignPower(p){
   var o = this;
   o.red = p.red * p.alpha;
   o.green = p.green * p.alpha;
   o.blue = p.blue * p.alpha;
   o.alpha = p.alpha;
}

//============================================================
// <T>设置数据内容。</T>
//
// @param r:red:Number 红色
// @param g:green:Number 绿色
// @param b:blue:Number 蓝色
// @param a:alpha:Number 透明
//============================================================
MO.SCorners_set = function SCorners_set(r, g, b, a){
   var o = this;
   o.red = r;
   o.green = g;
   o.blue = b;
   o.alpha = a;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
MO.SCorners_serialize = function SCorners_serialize(p){
   var o = this;
   p.writeFloat(o.red);
   p.writeFloat(o.green);
   p.writeFloat(o.blue);
   p.writeFloat(o.alpha);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
MO.SCorners_unserialize = function SCorners_unserialize(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = p.readFloat();
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
MO.SCorners_unserialize3 = function SCorners_unserialize3(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = 1.0;
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
MO.SCorners_saveConfig = function SCorners_saveConfig(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('a', o.alpha);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
MO.SCorners_savePower = function SCorners_savePower(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('power', o.alpha);
}

//============================================================
// <T>复制内容到数组中。</T>
//
// @method
// @param d:data:Array 数组
// @param i:index:Integer 索引
//============================================================
MO.SCorners_copyArray = function SCorners_copyArray(d, i){
   var o = this;
   d[i++] = o.red;
   d[i++] = o.green;
   d[i++] = o.blue;
   d[i++] = o.alpha;
   return 4;
}

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
MO.SCorners_toString = function SCorners_toString(){
   var o = this;
   return MO.Lang.Float.format(o.red) + ',' + MO.Lang.Float.format(o.green) + ',' + MO.Lang.Float.format(o.blue) + ',' + MO.Lang.Float.format(o.alpha);
}

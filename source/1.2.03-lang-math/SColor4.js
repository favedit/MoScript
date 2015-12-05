//==========================================================
// <T>颜色。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
MO.SColor4 = function SColor4(red, green, blue, alpha){
   var o = this;
   //..........................................................
   // @attribute
   o.red          = red ? red : 0;
   o.green        = green ? green : 0;
   o.blue         = blue ? blue : 0;
   o.alpha        = alpha ? alpha : 1;
   //..........................................................
   // @method
   o.assign       = MO.SColor4_assign;
   o.assignPower  = MO.SColor4_assignPower;
   o.set          = MO.SColor4_set;
   o.setInteger   = MO.SColor4_setInteger;
   o.setIntAlpha  = MO.SColor4_setIntAlpha;
   o.setHex       = MO.SColor4_setHex;
   o.serialize    = MO.SColor4_serialize;
   o.unserialize  = MO.SColor4_unserialize;
   o.unserialize3 = MO.SColor4_unserialize3;
   o.saveConfig   = MO.SColor4_saveConfig;
   o.savePower    = MO.SColor4_savePower;
   o.copyArray    = MO.SColor4_copyArray;
   o.toRGBAString = MO.SColor4_toRGBAString;
   o.toString     = MO.SColor4_toString;
   // @method
   o.dispose      = MO.SColor4_dispose;
   return o;
}

//============================================================
// <T>接收数据。</T>
//
// @method
// @param p:value:SColor4 颜色
//============================================================
MO.SColor4_assign = function SColor4_assign(p){
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
// @param p:value:SColor4 颜色
//============================================================
MO.SColor4_assignPower = function SColor4_assignPower(p){
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
MO.SColor4_set = function SColor4_set(r, g, b, a){
   var o = this;
   o.red = r;
   o.green = g;
   o.blue = b;
   o.alpha = a;
}

//============================================================
// <T>设置数据内容。</T>
//
// @param value:Number 数值
//============================================================
MO.SColor4_setInteger = function SColor4_setInteger(value){
   var o = this;
   o.red = ((value >> 16) & 0xFF) / 255;
   o.green = ((value >> 8) & 0xFF) / 255;
   o.blue = (value & 0xFF) / 255;
   o.alpha = ((value >> 24) & 0xFF) / 255;
}

//============================================================
// <T>设置数据内容。</T>
//
// @param value:Number 数值
//============================================================
MO.SColor4_setIntAlpha = function SColor4_setIntAlpha(value, alpha){
   var o = this;
   o.red = ((value >> 16) & 0xFF) / 255;
   o.green = ((value >> 8) & 0xFF) / 255;
   o.blue = (value & 0xFF) / 255;
   o.alpha = alpha;
}

//============================================================
// <T>设置数据内容。</T>
//
// @param r:red:Number 红色
// @param g:green:Number 绿色
// @param b:blue:Number 蓝色
// @param a:alpha:Number 透明
//============================================================
MO.SColor4_setHex = function SColor4_setHex(value){
   var o = this;
   if(value.indexOf('#') == 0){
      value = value.substring(1);
   }
   if(value.indexOf('0x') == 0){
      value = value.substring(2);
   }
   if(value.length == 6){
      o.red = MO.Lang.Hex.parse(value.substring(0, 2)) / 255;
      o.green = MO.Lang.Hex.parse(value.substring(2, 4)) / 255;
      o.blue = MO.Lang.Hex.parse(value.substring(4, 6)) / 255;
   }else{
      throw new MO.TError(o, 'Invalid value.');
   }
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
MO.SColor4_serialize = function SColor4_serialize(p){
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
MO.SColor4_unserialize = function SColor4_unserialize(p){
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
MO.SColor4_unserialize3 = function SColor4_unserialize3(p){
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
MO.SColor4_saveConfig = function SColor4_saveConfig(p){
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
MO.SColor4_savePower = function SColor4_savePower(p){
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
MO.SColor4_copyArray = function SColor4_copyArray(d, i){
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
MO.SColor4_toRGBAString = function SColor4_toRGBAString() {
   var o = this;
   return 'rgba(' + parseInt(o.red * 255) + ',' + parseInt(o.green * 255) + ',' + parseInt(o.blue * 255) + ',' + MO.Lang.Float.format(o.alpha) + ')';
}

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
MO.SColor4_toString = function SColor4_toString(){
   var o = this;
   return MO.Lang.Float.format(o.red) + ',' + MO.Lang.Float.format(o.green) + ',' + MO.Lang.Float.format(o.blue) + ',' + MO.Lang.Float.format(o.alpha);
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
MO.SColor4_dispose = function SColor4_dispose(){
   var o = this;
   o.red = null;
   o.green = null;
   o.blue = null;
   o.alpha = null;
}

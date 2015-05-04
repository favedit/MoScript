//==========================================================
// <T>二维尺寸结构。</T>
//
// @struct
// @param width:Number 宽度
// @param height:Number 高度
// @author maocy
// @version 150101
//==========================================================
function SSize2(width, height){
   var o = this;
   //..........................................................
   // @attribute
   o.width       = RInteger.nvl(width);
   o.height      = RInteger.nvl(height);
   //..........................................................
   // @method
   o.isEmpty     = SSize2_isEmpty;
   o.equalsData  = SSize2_equalsData;
   o.equals      = SSize2_equals;
   o.square      = SSize2_square;
   o.assign      = SSize2_assign;
   o.set         = SSize2_set;
   // @method
   o.serialize   = SSize2_serialize;
   o.unserialize = SSize2_unserialize;
   // @method
   o.parse       = SSize2_parse;
   o.toString    = SSize2_toString;
   // @method
   o.dispose     = SSize2_dispose;
   // @method
   o.dump        = SSize2_dump;
   return o;
}

//============================================================
// <T>判断内容是否为空。</T>
//
// @method
// @return Boolean 是否为空
//============================================================
function SSize2_isEmpty(){
   var o = this;
   return (o.width == 0) && (o.height == 0);
}

//============================================================
// <T>判断是否相等。</T>
//
// @method
// @param w:width:Number 宽度
// @param h:height:Number 高度
// @return Boolean 是否相等
//============================================================
function SSize2_equalsData(w, h){
   var o = this;
   if(o.width != w){
      return false;
   }
   if(o.height != h){
      return false;
   }
   return true;
}

//============================================================
// <T>判断是否相等。</T>
//
// @method
// @param p:value:SSize2 尺寸
// @return Boolean 是否相等
//============================================================
function SSize2_equals(p){
   var o = this;
   if(o.width != p.width){
      return false;
   }
   if(o.height != p.height){
      return false;
   }
   return true;
}

//============================================================
// <T>计算平方值。</T>
//
// @method
// @return Number 平方值;
//============================================================
function SSize2_square(){
   return this.width * this.height;
}

//============================================================
// <T>接收对象数据。</T>
//
// @param v:value:SSize2 二维尺寸
//============================================================
function SSize2_assign(v){
   var o = this;
   o.width = v.width;
   o.height = v.height;
}

//============================================================
// <T>设置数据内容。</T>
//
// @param w:width:Number 宽度
// @param h:height:Number 高度
//============================================================
function SSize2_set(w, h){
   var o = this;
   o.width = w;
   o.height = h;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param output:FByteStream 数据流
//==========================================================
function SSize2_serialize(output){
   var o = this;
   output.writeFloat(o.width);
   output.writeFloat(o.height);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
function SSize2_unserialize(input, dataCd){
   var o = this;
   if(!dataCd){
      dataCd = EDataType.Float16;
   }
   o.width = input.readData(dataCd);
   o.height = input.readData(dataCd);
}

//============================================================
// <T>解析字符串。</T>
//
// @param v:value:String 字符串
//============================================================
function SSize2_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 2){
      o.width = parseInt(r[0]);
      o.height = parseInt(r[1]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", v);
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
function SSize2_toString(){
   var o = this;
   return o.width + ',' + o.height;
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
function SSize2_dispose(){
   var o = this;
   o.width = null;
   o.height = null;
}

//============================================================
// <T>获得运行信息。</T>
//
// @return String 运行信息
//============================================================
function SSize2_dump(){
   var o = this;
   return RClass.dump(o) + ' [' + o.width + ',' + o.height + ']';
}

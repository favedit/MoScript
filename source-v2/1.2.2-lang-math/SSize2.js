//==========================================================
// <T>二维尺寸结构。</T>
//
// @struct
// @param w:width:Number 宽度
// @param h:height:Number 高度
// @author maocy
// @version 150101
//==========================================================
function SSize2(w, h){
   var o = this;
   //..........................................................
   // @attribute
   o.width    = RInteger.nvl(w);
   o.height   = RInteger.nvl(h);
   //..........................................................
   // @method
   o.isEmpty  = SSize2_isEmpty;
   o.assign   = SSize2_assign;
   o.set      = SSize2_set;
   o.parse    = SSize2_parse;
   o.toString = SSize2_toString;
   // @method
   o.dispose  = SSize2_dispose;
   // @method
   o.dump     = SSize2_dump;
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

//==========================================================
// <T>填充结构。</T>
//
// @struct
// @param l:left:Number 左边距
// @param t:top:Number 上边距
// @param r:right:Number 右边距
// @param b:bottom:Number 下边距
// @author maocy
// @version 150101
//==========================================================
MO.SPadding = function SPadding(l, t, r, b){
   var o = this;
   //..........................................................
   // @attribute
   o.left     = MO.Lang.Integer.nvl(l);
   o.top      = MO.Lang.Integer.nvl(t);
   o.right    = MO.Lang.Integer.nvl(r);
   o.bottom   = MO.Lang.Integer.nvl(b);
   //..........................................................
   // @method
   o.isEmpty  = MO.SPadding_isEmpty;
   o.reset    = MO.SPadding_reset;
   o.assign   = MO.SPadding_assign;
   o.set      = MO.SPadding_set;
   o.parse    = MO.SPadding_parse;
   o.toString = MO.SPadding_toString;
   // @method
   o.dispose  = MO.SPadding_dispose;
   // @method
   o.dump     = MO.SPadding_dump;
   return o;
}

//============================================================
// <T>判断内容是否为空。</T>
//
// @method
// @return Boolean 是否为空
//============================================================
MO.SPadding_isEmpty = function SPadding_isEmpty(){
   var o = this;
   return (o.left == 0) && (o.top == 0) && (o.right == 0) && (o.bottom == 0);
}

//============================================================
// <T>重置数据。</T>
//
// @method
//============================================================
MO.SPadding_reset = function SPadding_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}

//============================================================
// <T>接收填充对象。</T>
//
// @method
// @param p:padding:SPadding 填充对象
//============================================================
MO.SPadding_assign = function SPadding_assign(p){
   var o = this;
   o.left = p.left;
   o.top = p.top;
   o.right = p.right;
   o.bottom = p.bottom;
}

//============================================================
// <T>设置数据内容。</T>
//
// @method
// @param l:left:Number 左边距
// @param t:top:Number 上边距
// @param r:right:Number 右边距
// @param b:bottom:Number 下边距
//============================================================
MO.SPadding_set = function SPadding_set(l, t, r, b){
   var o = this;
   o.left = l;
   o.top = t;
   o.right = r;
   o.bottom = b;
}

//============================================================
// <T>解析字符串。</T>
//
// @method
// @param v:value:String 字符串
//============================================================
MO.SPadding_parse = function SPadding_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 4){
      o.left = parseInt(r[0]);
      o.top = parseInt(r[1]);
      o.right = parseInt(r[2]);
      o.bottom = parseInt(r[3]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", v);
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.SPadding_toString = function SPadding_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.right + ',' + o.bottom;
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
MO.SPadding_dispose = function SPadding_dispose(){
   var o = this;
   o.left = null;
   o.top = null;
   o.right = null;
   o.bottom = null;
}

//============================================================
// <T>获得运行信息。</T>
//
// @method
// @return String 运行信息
//============================================================
MO.SPadding_dump = function SPadding_dump(d){
   var o = this;
   return MO.Class.dump(o) + ' [' + o.left + ',' + o.top + ',' + o.right + ',' + o.bottom + ']';
}

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
function SPadding(l, t, r, b){
   var o = this;
   // @attribute
   o.left     = RInteger.nvl(l);
   o.top      = RInteger.nvl(t);
   o.right    = RInteger.nvl(r);
   o.bottom   = RInteger.nvl(b);
   // @method
   o.reset    = SPadding_reset;
   o.assign   = SPadding_assign;
   o.set      = SPadding_set;
   o.parse    = SPadding_parse;
   o.toString = SPadding_toString;
   o.dump     = SPadding_dump;
   return o;
}

//============================================================
// <T>重置数据。</T>
//============================================================
function SPadding_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}

//============================================================
// <T>接收填充对象。</T>
//
// @param p:padding:SPadding 填充对象
//============================================================
function SPadding_assign(p){
   var o = this;
   o.left = p.left;
   o.top = p.top;
   o.right = p.right;
   o.bottom = p.bottom;
}

//============================================================
// <T>设置数据内容。</T>
//
// @param l:left:Number 左边距
// @param t:top:Number 上边距
// @param r:right:Number 右边距
// @param b:bottom:Number 下边距
//============================================================
function SPadding_set(l, t, r, b){
   var o = this;
   o.left = l;
   o.top = t;
   o.right = r;
   o.bottom = b;
}

//============================================================
// <T>解析字符串。</T>
//
// @param v:value:String 字符串
//============================================================
function SPadding_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 4){
      o.left = parseInt(r[0]);
      o.top = parseInt(r[1]);
      o.right = parseInt(r[2]);
      o.bottom = parseInt(r[3]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", v);
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
function SPadding_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.right + ',' + o.bottom;
}

//============================================================
// <T>获得运行信息。</T>
//
// @return String 运行信息
//============================================================
function SPadding_dump(d){
   var o = this;
   return RClass.dump(o) + ' [' + o.left + ',' + o.top + ',' + o.right + ',' + o.bottom + ']';
}


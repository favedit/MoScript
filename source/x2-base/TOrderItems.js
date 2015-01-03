//==========================================================
// <T>搜索条件信息的工具类。</T>
//
// @tool
// @author maocy
// @version 1.0.1
//==========================================================
function TOrderItems(o){
   o = moNvl(o, this);
   TList(o);
   // Method
   o.pack   = TOrderItems_pack;
   o.unpack = TOrderItems_unpack;
}

//==========================================================
// <T>将表中所有数据连接成一个字符串。</T>
// <P>打包方式：(字符串长度的长度+字符串长度+字符串)+...。</P>
//
// @method
// @return String 打包字符串
//==========================================================
function TOrderItems_pack(){
   var o = this;
   var ts = new TStrings();
   var len = o.count;
   for(var n = 0; n < len; n++){
      var s = o.get(n).pack();
      ts.push(s);
   }
   return ts.pack();
}

//==========================================================
//<T>把一个压包好的字符串解包到当前对象里。</T>
//
// @method
// @param p:pack:String 打包字符串
//==========================================================
function TOrderItems_unpack(p){
   var o = this;
   o.clear();
   var ts = new TStrings();
   ts.unpack(p);
   for(var n = 0; n < ts.count; n++){
      t = ts.get(n);
      var ti = new TOrderItem();
      ti.unpack(t);
      o.push(ti);
   }
}

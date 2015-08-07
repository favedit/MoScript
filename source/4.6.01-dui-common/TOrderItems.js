//==========================================================
// <T>排序项目集合。</T>
//
// @class
// @author maocy
// @version 150125
//==========================================================
MO.TOrderItems = function TOrderItems(){
   var o = this;
   MO.TObjects.call(o);
   //..........................................................
   // @method
   //o.pack   = TOrderItems_pack;
   //o.unpack = TOrderItems_unpack;
}

//==========================================================
// <T>将表中所有数据连接成一个字符串。</T>
// <P>打包方式：(字符串长度的长度+字符串长度+字符串)+...。</P>
//
// @method
// @return String 打包字符串
//==========================================================
MO.TOrderItems_pack = function TOrderItems_pack(){
   var o = this;
   var ts = new MO.TStrings();
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
MO.TOrderItems_unpack = function TOrderItems_unpack(p){
   var o = this;
   o.clear();
   var ts = new MO.TStrings();
   ts.unpack(p);
   for(var n = 0; n < ts.count; n++){
      t = ts.get(n);
      var ti = new TOrderItem();
      ti.unpack(t);
      o.push(ti);
   }
}

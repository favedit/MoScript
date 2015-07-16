//==========================================================
// <T>搜索项目集合。</T>
//
// @class
// @author maocy
// @version 150125
//==========================================================
MO.TSearchItems = function TSearchItems(){
   var o = this;
   MO.TObjects.call(o);
   //..........................................................
   // @method
   //o.pack        = TSearchItems_pack;
   //o.removeAll   = TSearchItems_removeAll;
   //o.unpack      = TSearchItems_unpack;
}

//==========================================================
// <T>将表中所有数据连接 成一个字符串 。</T>
// <P>打包方式：(字符串长度的长度+字符串长度+字符串)+...。</P>
//
// @method
// @return String 打包字符串
//==========================================================
MO.TSearchItems_pack = function TSearchItems_pack(){
   var o = this;
   var ts = new MO.TStrings();
   var len = o.count;
   for(var n = 0; n < len; n++){
      var s = o.get(n).pack();
      ts.push(s);
   }
   return ts.pack();
}

//===========================================================
//<T>移除所有指定对象。</T>
//
//@method
//@param v:valud:Object 指定对象
//===========================================================
MO.TSearchItems_removeAll = function TSearchItems_removeAll(v){
   if(null != v){
      var o = this;
      var n = 0;
      var c = o.count;
      for(var i=n; i<c; i++){
         if(!o.memory[i].equals(v)){
            o.memory[n++] = o.memory[i];
         }
      }
      o.count = n;
   }
}

//==========================================================
//<T>把一个压 包好的字符串解包到当前对象里。</T>
//
// @method
// @param p:pack:String 打包字符串
//==========================================================
MO.TSearchItems_unpack = function TSearchItems_unpack(p){
   var o = this;
   o.clear();
   var ts = new MO.TStrings();
   ts.unpack(p);
   for(var n = 0; n < ts.count; n++){
      t = ts.get(n);
      var ti = new TSearchItem();
      ti.unpack(t);
      if(!MO.Lang.String.isEmpty(ti.name)){
         o.push(ti);
      }
      else{
         o.clear();
         MO.RMessage.fatal(this, 'unpack', 'Invalid value (value={1})', p);
      }
   }
}

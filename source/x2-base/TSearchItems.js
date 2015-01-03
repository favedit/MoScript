//==========================================================
// <T>搜索条件信息的工具类。</T>
//
// @tool
// @author maocy
// @version 1.0.1
//==========================================================
function TSearchItems(o){
   o = moNvl(o, this);
   TList(o);
   // Method
   o.pack        = TSearchItems_pack;
   o.removeAll   = TSearchItems_removeAll;
   o.unpack      = TSearchItems_unpack;
}

//==========================================================
// <T>将表中所有数据连接 成一个字符串 。</T>
// <P>打包方式：(字符串长度的长度+字符串长度+字符串)+...。</P>
//
// @method
// @return String 打包字符串
//==========================================================
function TSearchItems_pack(){
   var o = this;
   var ts = new TStrings();
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
function TSearchItems_removeAll(v){
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
function TSearchItems_unpack(p){
   var o = this;
   o.clear();
   var ts = new TStrings();
   ts.unpack(p);
   for(var n = 0; n < ts.count; n++){
      t = ts.get(n);
      var ti = new TSearchItem();
      ti.unpack(t);
      if(!RString.isEmpty(ti.name)){
         o.push(ti);
      }
      else{
         o.clear();
         RMessage.fatal(this, 'unpack', 'Invalid value (value={1})', p);
      }
   }
}

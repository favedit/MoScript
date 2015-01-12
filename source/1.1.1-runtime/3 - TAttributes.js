//==========================================================
// <T>名称和内容都是字符串的关联保存表的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
function TAttributes(o){
   if(!o){o = this;}
   TMap(o);
   // @method
   o.join   = TAttributes_join;
   o.split  = TAttributes_split;
   o.pack   = TAttributes_pack;
   o.unpack = TAttributes_unpack;
   return o;
}

//==========================================================
// <T>将内部所有项目关联成一个字符串。</T>
//
// @method
// @param n:name:String 分隔名称的字符
// @param v:value:String 分隔内容的字符
// @return String 字符串
//==========================================================
function TAttributes_join(n, v){
   var o = this;
   var r = new TString();
   if(!n){
      n = '=';
   }
   if(!v){
      v = ',';
   }
   var c = o.count;
   for(var i = 0; i < c; i++){
      if(i > 0){
         r.append(v);
      }
      r.append(o.names[i]);
      r.append(n);
      r.append(o.values[i]);
   }
   return r.toString();
}

//==========================================================
// <T>将字符串分割为子项。</T>
//
// @method
// @param s:source:String 字符串
// @param n:name:String 分隔名称的字符
// @param v:value:String 分隔内容的字符
//==========================================================
function TAttributes_split(s, n, v){
   var o = this;
   var ss = s.split(v);
   var c = ss.length;
   for(var i = 0; i < c; i++){
      var ln = ss[i];
      if(ln.length){
         var sb = ln.split(n);
         if(sb.length == 2){
            o.set(sb[0], sb[1]);
         }else{
            o.set(ln, '');
         }
      }
   }
}

//==========================================================
// <T>将表中所有数据连接成一个字符串。</T>
// <P>打包方式：项目1(名称长度的长度+名称长度+名称+内容长度的长度+内容长度+内容)+...。</P>
//
// @method
// @return TString 打包字符串
//==========================================================
function TAttributes_pack(){
   var o = this;
   var p = new TString();
   var c = o.count;
   for(var n = 0; n < c; n++){
      var l = o.names[n].length;
      p.append(l.toString().length, l, o.names[n]);
      if(o.values[n] != null){
         var v = o.values[n] + '';
         l = v.length;
         p.append(l.toString().length, l, v);
      }else{
         p.append('0');
      }
   }
   return p.toString();
}

//==========================================================
// <T>将一个打包字符串分解为所有子项。</T>
//
// @method
// @param p:pack:String 打包字符串
//==========================================================
function TAttributes_unpack(p){
   if(p && p.length){
      var o = this;
      var n = null;
      var v = null;
      var f = 0;
      o.count = 0;
      var pl = p.length;
      while(f < pl){
         // 解析名称
         var ll = parseInt(p.substr(f++, 1));
         var l = parseInt(p.substr(f, ll));
         n = p.substr(f + ll, l);
         f += ll + l;
         // 解析内容
         ll = parseInt(p.substr(f++, 1));
         if(ll == 0){
            v = null;
         }else{
            l = parseInt(p.substr(f, ll));
            v = p.substr(f + ll, l);
            f += ll + l;
         }
         // 设置分解后的内容
         o.set(n, v);
      }
   }
}

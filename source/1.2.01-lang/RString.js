//==========================================================
// <T>各种字符串处理的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RString = function RString(){
   var o = this;
   //..........................................................
   // @attribute
   o.EMPTY      = '';
   o.SPACE      = '   ';
   o.PAD        = ' ';
   o.TRIM       = ' \t\r\n';
   o.LOWER      = 'abcdefghijklmnopqrstuvwxyz';
   o.UPPER      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   o.CodeLowerA = 'a'.charCodeAt(0);
   o.CodeLowerZ = 'z'.charCodeAt(0);
   o.CodeUpperA = 'A'.charCodeAt(0);
   o.CodeUpperZ = 'Z'.charCodeAt(0);
   //..........................................................
   // @attribute
   o._hashData  = null;
   return o;
}

//==========================================================
// <T>判断字符串是否为空。</T>
//
// @method
// @param value:String 字符串
// @return Boolean
//    <L value='true'>为空</L>
//    <L value='false'>非空</L>
//==========================================================
MO.RString.prototype.isEmpty = function RString_isEmpty(value){
   if(value != null){
      return (value.length == 0);
   }
   return true;
}

//==========================================================
// <T>判断字符串不包含开始和结尾的空格，是否为空。</T>
//
// @method
// @param value:String 字符串
// @return Boolean
//    <L value='true'>为空</L>
//   <L value='false'>非空</L>
//==========================================================
MO.RString.prototype.isBlank = function RString_isBlank(value){
   if(value != null){
      return (value.trim().length == 0);
   }
   return true;
}

//==========================================================
// <T>判断字符串是否为ANSI编码。</T>
// <P>字符串内每一个字符编码在256之下，为ANSI编码的判断标准。</P>
//
// @method
// @param value:String 字符串
// @return Boolean
//    <L value='true'>是</L>
//    <L value='false'>否</L>
//==========================================================
MO.RString.prototype.isAnsi = function RString_isAnsi(value){
   if(value != null){
      var count = value.length;
      for(var i = 0; i < count; i++){
         if(value.charCodeAt(i) > 255){
            return false;
         }
      }
      return true;
   }
   return false;
}

//==========================================================
// <T>判断字符串是否为DBCS编码。</T>
// <P>字符串内每一个字符编码在255之上，为DBCS编码的判断标准。</P>
//
// @method
// @param value:String 字符串
// @return Boolean
//    <L value='true'>是</L>
//    <L value='false'>否</L>
//==========================================================
MO.RString.prototype.isDbcs = function RString_isDbcs(value){
   if(value == null){
      var count = value.length;
      for(var i = 0; i < count; i++){
         if(value.charCodeAt(i) < 256){
            return false;
         }
      }
      return true;
   }
   return false;
}

//==========================================================
// <T>判断字符串是否和指定模板相匹配。</T>
// <P>特定字符表示一个范围内容
//    <L value='$a'>所有小写字符(abcdefghijklmnopqrstuvwxyz)</L>
//    <L value='$A'>所有大写字符(ABCDEFGHIJKLMNOPQRSTUVWXYZ)</L>
//    <L value='$i'>所有整数字符(0123456789)</L>
//    <L value='$n'>所有整数字符(0123456789-)</L>
//    <L value='$f'>所有浮点数字符(0123456789-.)</L>
// </P>
//
// @method
// @param value:String 字符串
// @param parttern:String 模板字符串
// @return Boolean
//    <L value='true'>匹配</L>
//    <L value='false'>不匹配</L>
//==========================================================
MO.RString.prototype.isPattern = function RString_isPattern(value, parttern){
   if(value != null){
      var o = this;
      // 展开模板内容
      var source = (parttern == null) ? '$a$A$f' : parttern;
      source = source.replace(/\a/g, o.LOWER);
      source = source.replace(/\A/g, o.UPPER);
      source = source.replace(/\f/g, MO.Lang.Float.NUMBER);
      source = source.replace(/\n/g, MO.Lang.Integer.NUMBER);
      // 检查匹配
      var count = value.length;
      for(var i = 0; i < count; i++){
         if(source.indexOf(value.charAt(i)) == -1){
            return false;
         }
      }
      return true;
   }
   return false;
}

//==========================================================
// <T>判断字符串是否和指定模板相匹配。</T>
// <P>特定字符表示一个范围内容
//   <L value='$a'>所有小写字符(abcdefghijklmnopqrstuvwxyz)</L>
//    <L value='$A'>所有大写字符(ABCDEFGHIJKLMNOPQRSTUVWXYZ)</L>
//    <L value='$i'>所有整数字符(0123456789)</L>
//    <L value='$n'>所有整数字符(0123456789-)</L>
//    <L value='$f'>所有浮点数字符(0123456789-.)</L>
// </P>
//
// @method
// @param value:String 字符串
// @param parttern:String 模板字符串
// @return Boolean
//    <L value='true'>匹配</L>
//    <L value='false'>不匹配</L>
//==========================================================
MO.RString.prototype.inChars = function RString_inChars(value, parttern){
   var o = this;
   var b = o.findChars(parttern, value);
   if(b != -1){
      return true;
   }
   return false;
}

//==========================================================
// <T>判断两个字符串是否相等。</T>
//
// @method
// @param s:source:String 源字符串
// @param t:target:String 目标字符串
// @param f:boolean:Boolean 是否忽略大小写(默认为忽略大小写)
// @return Boolean 是否相等
//==========================================================
MO.RString.prototype.equals = function RString_equals(s, t, f){
   // 获得参数
   if(s == null){
      s = '';
   }else if(s.constructor != String){
      s = s.toString();
   }
   if(t == null){
      t = '';
   }else if(t.constructor != String){
      t = t.toString();
   }
   // 比较相同
   if(f){
      return (s == t);
   }else{
      return (s.toLowerCase() == t.toLowerCase());
   }
}

//==========================================================
// <T>判断是否包含指定字符串。</T>
//
// @method
// @param source:String 字符串
// @param values:String 内容集合
// @return Boolean 是否包含
//==========================================================
MO.RString.prototype.contains = function RString_contains(source, values){
   if(source != null){
      // 转换成字符串
      if(source.constructor != String){
         source = source.toString();
      }
      // 判断内容包含
      var count = arguments.length;
      for(var i = 1; i < count; i++){
         var value = arguments[i];
         if(source.indexOf(value) != -1){
            return true;
         }
      }
   }
   return false;
}

//==========================================================
// <T>判断字符串是否以特定字符串开始。</T>
//
// @method
// @param v:value:String 字符串
// @param s:search:String 特定字符串
// @return Boolean
//    <L value='true'>是</L>
//    <L value='false'>否</L>
//==========================================================
MO.RString.prototype.startsWith = function RString_startsWith(v, s){
   if(s == null){
      return true;
   }
   return (v != null) ? (v.indexOf(s) == 0) : false;
}

//==========================================================
// <T>判断字符串是否以特定字符串结束。</T>
//
// @method
// @param v:value:String 字符串
// @param s:search:String 特定字符串
// @return Boolean
//    <L value='true'>是</L>
//    <L value='false'>否</L>
//==========================================================
MO.RString.prototype.endsWith = function RString_endsWith(v, s){
   if(s == null){
      return true;
   }
   var n = (v != null) ? v.indexOf(s) : -1;
   return (n != -1) ? (n == (v.length - s.length)) : false;
}

//==========================================================
// <T>在字符串中查找指定字符列表。</T>
//
// @method
// @param v:value:String 字符串
// @param s:search:String 字符列表
// @return Integer 位置索引
//==========================================================
MO.RString.prototype.findChars = function RString_findChars(v, s){
   if((v != null) && (s != null)){
      var c = v.length;
      for(var n = 0; n < c; n++){
         if(s.indexOf(v.charAt(n)) != -1){
            return n;
         }
      }
   }
   return -1;
}

//==========================================================
// <T>判断指定字符串是否在一个字符串数组中含有。</T>
//
// @method
// @param v:value:String 源字符串
// @param rs:ranges:String[] 字符串数组
// @param f:boolean:Boolean 是否忽略大小写(默认为忽略大小写)
// @return Boolean
//    <L value='true'>含有</L>
//    <L value='false'>不含有</L>
//==========================================================
MO.RString.prototype.inRange = function RString_inRange(v, rs, f){
   if(v && rs){
      if(!f){
         v = v.toLowerCase();
      }
      var c = rs.length;
      for(var n = 0; n < c; n++){
         var r = rs[n];
         if(r != null){
            if(f){
               if(v == r){
                  return true;
               }
            }else{
               if(v == r.toLowerCase()){
                  return true;
               }
            }
         }
      }
   }
   return false;
}

//==========================================================
// <T>返回一个不为空的字符串。</T>
//
// @method
// @param v:value:String 字符串
// @param d:default:String 缺省字符串
// @return String 非空字符串
//==========================================================
MO.RString.prototype.nvl = function RString_nvl(v, d){
   if(v != null){
      var s = null;
      if(v.constructor != String){
         s = v.toString();
      }else{
         s = v;
      }
      if(s.length > 0){
         return s;
      }
   }
   if(d != null){
      return d;
   }
   return this.EMPTY;
}

//==========================================================
// <T>返回一个不为空的字符串对象。</T>
//
// @method
// @param p:value:String 字符串对象
// @return String 非空字符串对象
//==========================================================
MO.RString.prototype.nvlString = function RString_nvlString(p){
   if(p == null){
      p = new MO.TString();
   }
   return p;
}

//==========================================================
// <T>如果字符串为空，则返回空。</T>
//
// @method
// @param v:value:String 字符串
// @return String 空字符串
//==========================================================
MO.RString.prototype.empty = function RString_empty(v){
   if(v != null){
      var s = null;
      if(v.constructor != String){
         s = v.toString();
      }else{
         s = v;
      }
      if(s.length > 0){
         return s;
      }
   }
   return null;
}

//==========================================================
//<T>计算字符串的哈希值。</T>
//
//@method
//@param source:String 字符串
//@param code:Integer 参照码
//@return Integer 哈希值
//==========================================================
MO.RString.prototype.calculateHash = function RString_calculateHash(source, code){
   var o = this;
   var data = o._hashData;
   if(!data){
      data = o._hashData = new Int32Array(1);
   }
   data[0] = MO.Runtime.nvl(code, 0);
   var length = source.length;
   for(var i = 0; i < length; i++){
      var value = source.charCodeAt(i);
      data[0] = 31 * data[0] + value;
   }
   return Math.abs(data[0]);
}

//==========================================================
// <T>将字符串的首字符变为大写。</T>
//
// @method
// @param value:String 字符串
// @return String 首字母是大写的字符串
//==========================================================
MO.RString.prototype.firstUpper = function RString_firstUpper(value){
   return (value != null) ? value.charAt(0).toUpperCase() + value.substr(1) : value;
}

//==========================================================
// <T>将字符串的首字符变为小写。</T>
//
// @method
// @param value:String 字符串
// @return String 首字母是小写的字符串
//==========================================================
MO.RString.prototype.firstLower = function RString_firstLower(){
   return (value != null) ? value.charAt(0).toLowerCase() + value.substr(1) : value;
}

//==========================================================
// <T>获得字符串中第一行字符串。</T>
//
// @method
// @param value:String 字符串
// @return String 第一行字符串
//==========================================================
MO.RString.prototype.firstLine = function RString_firstLine(value){
   if(value){
      var n = Math.min(value.indexOf('\r'), value.indexOf('\n'));
      if(-1 != n){
         return value.substr(0, n);
      }
      return value;
   }
   return '';
}

//==========================================================
// <T>格式化一个字符串内容，将参数中{x}内容替换为参数内容。</T>
//
// @method
// @param value:String 字符串
// @param parameters:Object... 参数字符
// @return String 格式化后的字符串
//==========================================================
MO.RString.prototype.format = function RString_format(value, parameters){
   var count = arguments.length;
   for(var i = 1; i < count; i++){
      var parameter = arguments[i];
      if(parameter == null){
         parameter = '';
      }else if(typeof(parameter) == 'function'){
         parameter = MO.Method.name(parameter);
      }
      value = value.replace('{' + i + '}', parameter);
   }
   return value;
}

//==========================================================
// <T>格式化多行文本。</T>
//
// @method
// @param s:source:String 字符串
// @return String 字符串
//==========================================================
MO.RString.prototype.formatLines = function RString_formatLines(p){
   var o = this;
   p = p.replace(/\\r/g, '');
   var ls = p.split('\n');
   var c = ls.length;
   var r = new MO.TString();
   for(var i = 0; i < c; i++){
      var l = ls[i]
      l = o.trim(l);
      if(o.isEmpty(l)){
         continue;
      }
      if(o.startsWith(l, '//')){
         continue;
      }
      r.appendLine(l);
   }
   return r.flush();
}

//==========================================================
// <T>获得重复指定次数的字符串。</T>
//
// @method
// @param v:value:String 字符串
// @param c:count:Integer 重复的次数
// @return String 重复后的字符串
//==========================================================
MO.RString.prototype.repeat = function RString_repeat(v, c){
   return new Array(c + 1).join(v);
}

//==========================================================
// <T>通过追加空格使字符串对齐指定长度，字符串内容位于对齐后字符串的中间位置。</T>
//
// @method
// @param v:value:String 字符串
// @param l:length:Integer 对齐后长度
// @param p:pad:String 补齐字符(默认为空格字符)
// @return Boolean 补齐长度的字符串
//==========================================================
MO.RString.prototype.pad = function RString_pad(v, l, p){
   v = (v != null) ? v.toString() : this.EMPTY;
   var n = l - v.length;
   if(n > 0){
      if(p == null){
         p = this.PAD;
      }
      var r = (n % 2 == 0) ? n / 2 : (n - 1) / 2;
      return new Array(r + 1).join(p) + v + new Array(n - r + 1).join(p);
   }
   return v;
}

//==========================================================
// <T>通过在左边追加空格使字符串对齐指定长度。</T>
//
// @method
// @param v:value:String 字符串
// @param l:length:Integer 对齐后长度
// @param p:pad:String 补齐字符(默认为空格字符)
// @return Boolean 补齐长度的字符串
//==========================================================
MO.RString.prototype.lpad = function RString_lpad(v, l, p){
   var o = this;
   v = (v != null) ? v.toString() : o.EMPTY;
   var n = l - v.length;
   if(n > 0){
      if(p == null){
         p = o.PAD;
      }
      var a = new Array(n);
      a[a.length] = v;
      return a.join(p);
   }
   return v;
}

//==========================================================
// <T>通过在右边追加空格使字符串对齐指定长度。</T>
//
// @method
// @param v:value:String 字符串
// @param l:length:Integer 对齐后长度
// @param p:pad:String 补齐字符(默认为空格字符)
// @return Boolean 补齐长度的字符串
//==========================================================
MO.RString.prototype.rpad = function RString_rpad(v, l, p){
   var o = this;
   v = (v != null) ? v.toString() : o.EMPTY;
   var n = l - v.length;
   if(n > 0){
      if(p == null){
         p = o.PAD;
      }
      return v + new Array(n + 1).join(p);
   }
   return v;
}

//==========================================================
// <T>去掉字符串开始和结尾的空格字符和非显示字符。</T>
//
// @method
// @param v:value:String 字符串对象
// @param ts:trims:String 要去除的字符串
// @return String 去掉开始和结尾的空格和非显示字符的字符串
//==========================================================
MO.RString.prototype.trim = function RString_trim(v, ts){
   var o = this;
   v = o.nvl(v);
   ts = o.nvl(ts, o.TRIM);
   var l = 0;
   var r = v.length - 1;
   for(; l < r; l++){
      if(-1 == ts.indexOf(v.charAt(l))){
         break;
      }
   }
   for(; r >= l; r--){
      if(-1 == ts.indexOf(v.charAt(r))){
         break;
      }
   }
   if(l == r + 1){
      return null;
   }
   if((l != 0) || (r != v.length-1)){
      return v.substring(l, r + 1);
   }
   return v;
}

//==========================================================
// <T>去掉字符串开始的空格字符和非显示字符。</T>
//
// @method
// @param v:value:String 字符串对象
// @param ts:trims:String 要去除的字符串
// @return String 去掉开始的空格和非显示字符的字符串
//==========================================================
MO.RString.prototype.ltrim = function RString_ltrim(v, ts){
   var o = this;
   v = o.nvl(value);
   ts = o.nvl(trims, o.TRIM);
   var l = 0;
   var r = v.length - 1;
   for(; l < r; l++){
      if(-1 == ts.indexOf(v.charAt(l))){
         break;
      }
   }
   if(0 != l){
      return v.substring(l, r + 1);
   }
   return v;
}

//==========================================================
// <T>去掉字符串结尾的空格字符和非显示字符。</T>
//
// @method
// @param v:value:String 字符串对象
// @param ts:trims:String 要去除的字符串
// @return String 去掉结尾的空格和非显示字符的字符串
//==========================================================
MO.RString.prototype.rtrim = function RString_rtrim(v, ts){
   var o = this;
   v = o.nvl(v);
   ts = o.nvl(ts, o.TRIM);
   var r = v.length - 1;
   for(; r >= 0; r--){
      if(-1 == ts.indexOf(v.charAt(r))){
         break;
      }
   }
   if(r != v.length-1){
      return v.substring(0, r + 1);
   }
   return v;
}

//==========================================================
// <T>从字符串中截取开始字符串到结束字符串中间的部分字符串。</T>
// <P>开始字符串不存在的话，从字符串开始位置截取。</B>
// 结束字符串不存在的话，截取到字符串的最终位置。</P>
//
// @method
// @param v:value:String 字符传对象
// @param b:begin:String 起始字符串
// @param e:end:String 结束字符串
// @return String 截取后的部分字符串
//==========================================================
MO.RString.prototype.mid = function RString_mid(v, b, e){
   if(v == null){
      return v;
   }
   var l = 0;
   if(b != null){
      var f = v.indexOf(b);
      if(f != -1){
         l = f + b.length;
      }
   }
   var r = v.length;
   if(e != null){
      var f = v.indexOf(e, l);
      if(f != -1){
         r = f;
      }
   }
   return v.substring(l, r);
}

//==========================================================
// <T>将字符串中的控制字符转换为一行可以存储的字符串。</T>
//
// @method
// @param v:value:String 字符串
// @return String 行字符串
//==========================================================
MO.RString.prototype.toLine = function RString_toLine(v){
   return v.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
}

//===========================================================
// <T>将字符串中的大写变成下划线。</T>
//
// @method
// @param v:value:String 字符串
// @return String 字符串
//===========================================================
MO.RString.prototype.toUnderline = function RString_toUnderline(v){
   var r = null;
   if(v){
      var s = new MO.TString();
      var c = v.length;
      for(var i = 0; i < c; i++){
         var h = v.charAt(i);
         if(h.toUpperCase() == h){
            if(i > 0){
               s.append('_');
            }
            s.append(h.toLowerCase());
         }else{
            s.append(h);
         }
      }
      r = s.flush();
   }
   return r;
}

//==========================================================
// <T>在字符串转化为小写字符串。</T>
//
// @method
// @param v:value:String 字符串
// @return String 小写字符串
//==========================================================
MO.RString.prototype.toLower = function RString_toLower(v){
   return (v != null) ? v.toLowerCase() : this.EMPTY;
}

//==========================================================
// <T>在字符串转化为大写字符串。</T>
//
// @method
// @param v:value:String 字符串
// @return String 大写字符串
//==========================================================
MO.RString.prototype.toUpper = function RString_toUpper(v){
   return (v != null) ? v.toUpperCase() : this.EMPTY;
}

//==========================================================
// <T>把一个字符串分割为字符串数组。</T>
//
// @method
// @param v:value:String 字符串
// @param p:split:String 分割字符串
// @return String 分割后的字符串数组
//==========================================================
MO.RString.prototype.split = function RString_split(s, p){
   return (s && p) ? s.split(p) : null;
}

//==========================================================
// <T>把一个字符串分割为两个字符串的数组。</T>
//
// @method
// @param v:value:String 字符串
// @param p:split:String 分割字符
// @return String 分割后的字符串数组
//==========================================================
MO.RString.prototype.splitTwo = function RString_splitTwo(s, p){
   if(s && p){
      var r = new Array();
      var n = s.indexOf(p);
      if(n == -1){
         r.push(s);
      }else{
         r.push(s.substring(0, n));
         r.push(s.substring(n+p.length));
      }
      return r;
   }
   return null;
}

//==========================================================
//<T>从字符串中截取与匹配字符相等的子字符串组。</T>
//
//@method
//@param s:string:String 字符串
//@param p:value:Array 要截取的参照字符的组合
//@return Array 截取的字符数组
//==========================================================
MO.RString.prototype.splitParts = function RString_splitParts(s, p){
   var o = this;
   var b = new Array();
   var k = 0;
   var l = s.length;
   for(var i = 0; i < l; i++){
      for(var j in p){
         if(o.startsWith(p[j], s.charAt(i))){
            if(o.equals(s.substr(i, p[j].length), p[j])){
               b[k++] = p[j];
               i = i + p[j].length - 1;
               break;
            }
         }
      }
   }
   return b;
}

//==========================================================
//<T>从字符串中截取与匹配字符相等的子字符串组。</T>
//
//@method
//@param s:string:String 字符串
//@param p:value:Array 要截取的参照字符的组合
//@return Array 截取的字符数组
//==========================================================
MO.RString.prototype.splitPattern = function RString_splitPattern(s, p){
   var r = new Array();
   if(s){
      var sl = s.length;
      var pl = p.length;
      var t = '';
      for(var n = 0; n < sl; n++){
         var v = false;
         for(var i = 0; i < pl; i++){
            var f = p[i];
            if(s.indexOf(f) == -1){
               if(t.length){
                  r[r.length] = t;
                  t = '';
               }
               r[r.length] = f;
               s = s.substring(f.length);
               v = true;
               break;
            }
         }
         if(!v){
            t += s.charAt(0);
            s = s.substring(1);
         }
      }
   }
   return r;
}

//==========================================================
// <T>替换字符串全部内容。</T>
//
// @method
// @param value:String 字符串
// @param source:String 源字符串
// @param target:String 目标字符串
// @return String 字符串
//==========================================================
MO.RString.prototype.replace = function RString_replace(value, source, target){
   return value.replace(new RegExp(source, 'g'), target);
}

//==========================================================
// <T>替换全部指定字符。</T>
//
// @method
// @param v:value:String 字符串
// @param s:sourceChar:String 源字符
// @param t:targetChar:String 目标字符
// @return String 字符串
//==========================================================
MO.RString.prototype.replaceChar = function RString_replaceChar(v, s, t){
   if(v != null){
      var c = v.length;
      var r = new Array();
      for(var n = 0; n < c; n++){
         var a = v.charAt(n);
         if(a == s){
            r[r.length] = t;
         }else{
            r[r.length] = a;
         }
      }
      return r.join('');
   }
   return v;
}

//==========================================================
// <T>解析字符数组为字符串。</T>
//
// @method
// @param data:Array 数组
// @return String 字符串
//==========================================================
MO.RString.prototype.decodeUtf = function RString_decodeUtf(data){
   var i = 0;
   var j = 0;
   var x = 0;
   var y = 0;
   var z = 0;
   var l = data.length;
   var result = [];
   var codes = [];
   for(; i < l; ++i, ++j){
      x = data[i] & 255;
      if(!(x & 128)){
         if(!x){
            return data;
         }
         codes[j] = x;
      }else if((x & 224) == 192){
         if(i + 1 >= l){
            return data;
         }
         y = data[++i] & 255;
         if ((y & 192) != 128) {
            return data;
         }
         codes[j] = ((x & 31) << 6) | (y & 63);
      }else if ((x & 240) == 224){
         if(i + 2 >= l){
            return data;
         }
         y = data[++i] & 255;
         if((y & 192) != 128){
            return data;
         }
         z = data[++i] & 255;
         if((z & 192) != 128){
            return data;
         }
         codes[j] = ((x & 15) << 12) | ((y & 63) << 6) | (z & 63);
      }else{
         return data;
      }
      if(j == 65535){
         var charLength = codes.length;
         for(var index = 0; index < charLength; index++){
            result.push(String.fromCharCode(codes[index]));
         }
         j = -1;
      }
   }
   if(j > 0){
      codes.length = j;
      var charLength = codes.length;
      for(var index = 0; index < charLength; index++){
         result.push(String.fromCharCode(codes[index]));
      }
   }
   return result.join("");
}

//==========================================================
// <T>删除字符串中的指定字符。</T>
//
// @method
// @param s:source:String 源字符串
// @param t:target:String 目标字符串
// @return String 删除后的字符串
//==========================================================
MO.RString.prototype.remove = function RString_remove(s, t){
   return s.replace(t, '');
}

//==========================================================
// <T>删除字符串中的指定字符集合。</T>
//
// @method
// @param v:value:String 字符串
// @param s:value:String 字符集合
// @return String 删除后的字符串
//==========================================================
MO.RString.prototype.removeChars = function RString_removeChars(v, s){
   if(v != null){
      var c = v.length;
      var r = new Array();
      for(var n = 0; n < c; n++){
         var a = v.charAt(n);
         if(s.indexOf(a) != -1){
            continue;
         }
         r[r.length] = a;
      }
      return r.join('');
   }
   return v;
}

//..........................................................
// 实例化内容
MO.RString = new MO.RString();
MO.Lang.String = MO.RString;

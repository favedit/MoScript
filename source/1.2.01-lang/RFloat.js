with(MO){
   //==========================================================
   // <T>浮点数管理类。</T>
   //
   // @reference
   // @author maocy
   // @version 150131
   //==========================================================
   MO.RFloat = function RFloat(){
      var o = this;
      //..........................................................
      // @define
      o.Chars     = '0123456789-.%';
      o.NUMBER    = '0123456789-.%';
      o.LEFT_CHAR = '0';
      return o;
   }

   //===========================================================
   // <T>判断内容是否为浮点数。</T>
   //
   // @method
   // @param p:value:String 内容
   // @return 是否为浮点数
   //===========================================================
   MO.RFloat.prototype.isFloat = function RFloat_isFloat(p){
      return RString.isPattern(p, 'n');
   }

   //===========================================================
   // <T>解析字符串为浮点数。</T>
   //
   // @method
   // @param source:String 内容
   // @return Number 浮点数
   //===========================================================
   MO.RFloat.prototype.parse = function RFloat_parse(source){
      // 检查参数
      if(source == null){
         return 0;
      }
      if(source == ''){
         return 0;
      }
      // 去掉开始0字符
      var value = RString.trim(source.toString());
      if(value == null){
         return 0;
      }
      while(true){
         if(value.charAt(0) != "0"){
            break;
         }
         value = value.substr(1);
      }
      // 获得内容
      var result = (value.length > 0) ? parseFloat(value) : 0;
      // 百分比处理
      if(RString.findChars(result, '%') != -1){
         result = result / 100;
      }
      // 返回内容
      return isNaN(result) ? 0 : result;
   }

   //===========================================================
   // <T>格式化浮点数为指定格式。</T>
   //
   // @method
   // @param v:value:Number 浮点数
   // @param l:leftLength:Number 小数点左侧位数
   // @param lp:leftPad:String 小数点左侧补足字符
   // @param r:rightLength:Number 小数点右侧位数
   // @param rp:rightPad:String 小数点右侧补足字符
   // @return String 浮点数
   //===========================================================
   MO.RFloat.prototype.format = function RFloat_format(v, l, lp, r, rp){
      var o = this;
      // 校正参数
      if(l == null){
         l = 0;
      }
      if(lp == null){
         lp = o.LEFT_CHAR;
      }
      if(r == null){
         r = 6;
      }
      if(rp == null){
         rp = o.LEFT_CHAR;
      }
      // 分割内容
      var s = v.toString();
      var f = s.indexOf('.');
      if(f == -1){
         var sl = s;
         var sr = '';
      }else{
         var sl = s.substring(0, f);
         var sr = s.substring(f + 1, f + r + 1);
      }
      var fl = RString.lpad(sl, l, lp);
      var fr = RString.rpad(sr, r, rp);
      return fl + '.' + fr;
   }

   //===========================================================
   // <T>格式化浮点数为指定格式。</T>
   //
   // @method
   // @param v:value:Number 浮点数
   // @param l:leftLength:Number 小数点左侧位数
   // @param lp:leftPad:String 小数点左侧补足字符
   // @param r:rightLength:Number 小数点右侧位数
   // @param rp:rightPad:String 小数点右侧补足字符
   // @param divide:rightPad:Number 除数
   // @param unit:rightPad:String 单位
   // @return String 浮点数
   //===========================================================
   MO.RFloat.prototype.unitFormat = function RFloat_unitFormat(v, l, lp, r, rp, divide, unit) {
      var o = this;
      // 校正参数
      if (l == null) {
         l = 0;
      }
      if (lp == null) {
         lp = o.LEFT_CHAR;
      }
      if (r == null) {
         r = 6;
      }
      if (rp == null) {
         rp = o.LEFT_CHAR;
      }
      if (divide == null || unit == null) {
         divide = 1;
         unit = '';
      }
      v /= divide;
      // 分割内容
      var s = v.toString();
      var f = s.indexOf('.');
      if (f == -1) {
         var sl = s;
         var sr = '';
      } else {
         var sl = s.substring(0, f);
         var sr = s.substring(f + 1, f + r + 1);
      }
      var fl = RString.lpad(sl, l, lp);
      var flc = new TString();
      //插入逗号
      for (var i = 1; i - 1 < fl.length; i++) {
         flc.append(fl.substring(i - 1, i));
         if (fl.length - i > 0 && (fl.length - i) % 3 == 0) {
            flc.append(',');
         }
      }
      var fr = RString.rpad(sr, r, rp);
      return flc + '.' + fr + unit;
   }

   //===========================================================
   // <T>获得非空内容。</T>
   //
   // @method
   // @param v:value:Number 浮点数
   // @param d:default:Number 缺省浮点数
   // @return Number 浮点数
   //===========================================================
   MO.RFloat.prototype.nvl = function RFloat_nvl(v, d){
      return v ? v : (d ? d : 0);
   }

   //===========================================================
   // <T>获得范围内浮点数。</T>
   //
   // @method
   // @param v:value:Number 浮点数
   // @param i:min:Number 最小浮点数
   // @param a:max:Number 最大浮点数
   // @return Number 浮点数
   //===========================================================
   MO.RFloat.prototype.toRange = function RFloat_toRange(v, i, a){
      if(v == null){
         v = 0;
      }
      return Math.min(Math.max(v, i), a);
   }

   //===========================================================
   // <T>计算所有参数的浮点数之和。</T>
   //
   // @method
   // @param p:values:Number 浮点数集合
   // @return Number 浮点数
   //===========================================================
   MO.RFloat.prototype.sum = function RFloat_sum(){
      var a = arguments;
      var r = 0;
      for(var i = a.length -1 ; i >= 0; i--){
         var v = a[n];
         if(v != null){
            r += parseFloat(v);
         }
      }
      return r;
   }

   //===========================================================
   // <T>把两个字符串 进行算术运算。</T>
   //
   // @method
   // @param v:value:Number 浮点数
   // @param d:default:Number 缺省浮点数
   // @return Number 浮点数
   //===========================================================
   MO.RFloat.prototype.calculate = function RFloat_calculate(f,a,b){
     var a = RFloat.nvl(a);
     var b = RFloat.nvl(b);
     a = parseFloat(a);
     b = parseFloat(b);
     if(f){
        return (a + b).toString();
     }else{
        return (a - b).toString();
     }
   }

   //===========================================================
   // <T>接收浮点数数组。</T>
   //
   // @method
   // @param t:targetData:Array 目标数据
   // @param s:sourceData:Array 来源数据
   // @param c:count:Integer 总数
   // @return 是否相等
   //===========================================================
   MO.RFloat.prototype.attach = function RFloat_attach(t, s, c){
      var r = false;
      for(var i = 0; i < c; i++){
         if(t[i] != s[i]){
            t[i] = s[i];
            r = true;
         }
      }
      return r;
   }

   //===========================================================
   // <T>填充浮点数数组。</T>
   //
   // @method
   // @param d:data:Array 数据
   // @param i:index:Integer 索引
   // @param c:count:Integer 总数
   // @param v:value:Float 数据
   //===========================================================
   MO.RFloat.prototype.fill = function RFloat_fill(d, i, c, v){
      for(var n = 0; n < c; n++){
         d[i++] = v;
      }
   }

   //===========================================================
   // <T>复制浮点数数组。</T>
   //
   // @method
   // @param po:outputData:Array 输出数据
   // @param poi:outputIndex:Integer 输出位置
   // @param pi:inputData:Array 输入数据
   // @param pii:inputIndex:Integer 输入位置
   // @param pc:count:Integer 总数
   //===========================================================
   MO.RFloat.prototype.copy = function RFloat_copy(po, poi, pi, pii, pc){
      for(var i = 0; i < pc; i++){
         po[poi++] = pi[pii++];
      }
   }
   //..........................................................
   // 实例化内容
   MO.RFloat = new RFloat();
}

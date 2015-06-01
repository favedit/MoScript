with(MO){
   //==========================================================
   // <T>16进制工具。</T>
   //
   // @reference
   // @author maocy
   // @version 150201
   //==========================================================
   MO.RHex = function RHex(){
      var o = this;
      //..........................................................
      // @define
      o.NUMBER  = '0x123456789ABCDEF';
      o.PAD     = '0';
      //..........................................................
      // @method
      o.isValid = RHex_isValid;
      o.parse   = RHex_parse;
      o.format  = RHex_format;
      return o;
   }

   //===========================================================
   // <T>判断是否有效16进制内容。</T>
   //
   // @method
   // @param p:value:Object 内容
   // @return Boolean 是否有效
   //===========================================================
   MO.RHex_isValid = function RHex_isValid(p){
      return RString.isPattern(p, this.NUMBER);
   }

   //===========================================================
   // <T>解析16进制内容。</T>
   //
   // @method
   // @param p:value:Object 内容
   // @return String 内容
   //===========================================================
   MO.RHex_parse = function RHex_parse(p){
      return p ? parseInt('0x' + p) : '0';
   }

   //===========================================================
   // <T>格式化16进制内容。</T>
   //
   // @method
   // @param v:value:Number 内容
   // @param l:length:Integer 长度
   // @return String 内容
   //===========================================================
   MO.RHex_format = function RHex_format(v, l){
      var r = null;
      if(v){
         r = v.toString(16);
      }else{
         r = '0'
      }
      return l ? RString.lpad(r, l, this.PAD) : r;
   }
   //..........................................................
   // 实例化内容
   MO.RHex = new RHex();
}

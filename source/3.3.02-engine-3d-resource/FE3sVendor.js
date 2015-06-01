with(MO){
   //==========================================================
   // <T>资源提供商。</T>
   //
   // @class
   // @author maocy
   // @history 150309
   //==========================================================
   MO.FE3sVendor = function FE3sVendor(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._contentUrl   = null;
      o._parameters   = null;
      //..........................................................
      // @method
      o.construct     = FE3sVendor_construct;
      // @method
      o.contentUrl    = FE3sVendor_contentUrl;
      o.setContentUrl = FE3sVendor_setContentUrl;
      // @method
      o.get           = FE3sVendor_get;
      o.set           = FE3sVendor_set;
      o.makeSource    = RMethod.virtual(o, 'makeSource');
      o.makeUrl       = FE3sVendor_makeUrl;
      o.reset         = FE3sVendor_reset;
      // @method
      o.dispose       = FE3sVendor_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3sVendor_construct = function FE3sVendor_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      // 设置属性
      o._parameters = new TAttributes();
   }

   //==========================================================
   // <T>获得内容地址。</T>
   //
   // @method
   // @return String 内容地址
   //==========================================================
   MO.FE3sVendor_contentUrl = function FE3sVendor_contentUrl(p){
      return this._contentUrl;
   }

   //==========================================================
   // <T>设置内容地址。</T>
   //
   // @method
   // @param p:contentUrl:String 内容地址
   //==========================================================
   MO.FE3sVendor_setContentUrl = function FE3sVendor_setContentUrl(p){
      this._contentUrl = p;
   }

   //==========================================================
   // <T>获得参数。</T>
   //
   // @method
   // @param p:name:String 名称
   //==========================================================
   MO.FE3sVendor_get = function FE3sVendor_get(n){
      return this._parameters.get(n);
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @method
   // @param n:name:String 名称
   // @param v:value:String 内容
   //==========================================================
   MO.FE3sVendor_set = function FE3sVendor_set(n, v){
      this._parameters.set(n, v);
   }

   //==========================================================
   // <T>生成网络地址。</T>
   // <P>调试模式，追加时间，总是获得新内容。</P>
   //
   // @method
   // @return 时间内容
   //==========================================================
   MO.FE3sVendor_makeUrl = function FE3sVendor_makeUrl(){
      var o = this;
      var r = o.makeSource();
      if(RRuntime.isDebug()){
         if(r.indexOf('?') == -1){
            r += '?';
         }else{
            r += '&';
         }
         r += 'date=' + RDate.format();
      }
      return r;
   }

   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3sVendor_reset = function FE3sVendor_reset(){
      this._parameters.clear();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3sVendor_dispose = function FE3sVendor_dispose(){
      var o = this;
      o._parameters = RObject.dispose(o._parameters);
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}

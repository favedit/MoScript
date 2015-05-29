with(MO){
   //==========================================================
   // <T>进程。</T>
   //
   // @class
   // @author maocy
   // @version 150105
   //==========================================================
   MO.FProcessServer = function FProcessServer(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._name               = null;
      o._handle             = null;
      o._processors         = null;
      //..........................................................
      // @method
      o.ohInterval          = FProcessServer_ohInterval;
      o.onInterval          = FProcessServer_onInterval;
      o.ohMessage           = FProcessServer_ohMessage;
      o.onMessage           = FProcessServer_onMessage;
      //..........................................................
      // @method
      o.construct           = FProcessServer_construct;
      // @method
      o.name                = FProcessServer_name;
      // @method
      o.registerProcessor   = FProcessServer_registerProcessor;
      o.unregisterProcessor = FProcessServer_unregisterProcessor;
      // @method
      o.send                = FProcessServer_send;
      // @method
      o.process             = FProcessServer_process;
      return o;
   }

   //==========================================================
   // <T>间隔处理。</T>
   //
   // @method
   //==========================================================
   MO.FProcessServer_ohInterval = function FProcessServer_ohInterval(){
      FProcessServer.__linker.onInterval();
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FProcessServer_onInterval = function FProcessServer_onInterval(){
      var o = this;
      //console.log('server = ' + (o._count++) + ' - ' + postMessage, this);
   }

   //==========================================================
   // <T>消息处理。</T>
   //
   // @method
   // @param p:event:MessageEvent 消息事件
   //==========================================================
   MO.FProcessServer_ohMessage = function FProcessServer_ohMessage(p){
      FProcessServer.__linker.onMessage(p.data);
   }

   //==========================================================
   // <T>消息处理。</T>
   //
   // @method
   // @param p:data:Object 对象
   //==========================================================
   MO.FProcessServer_onMessage = function FProcessServer_onMessage(p){
      var o = this;
      console.log('messgae', this, p);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FProcessServer_construct = function FProcessServer_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      // 设置属性
      o._processors = new TDictionary();
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   MO.FProcessServer_name = function FProcessServer_name(){
      return this._name;
   }

   //==========================================================
   // <T>注册一个处理器。</T>
   //
   // @method
   // @param c:code:String 代码
   // @param p:processor:FProcessor 处理器
   //==========================================================
   MO.FProcessServer_registerProcessor = function FProcessServer_registerProcessor(c, p){
      this._processors.set(c, p);
   }

   //==========================================================
   // <T>注销一个处理器。</T>
   //
   // @method
   // @param c:code:String 代码
   //==========================================================
   MO.FProcessServer_unregisterProcessor = function FProcessServer_unregisterProcessor(c){
      this._processors.set(c, null);
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   MO.FProcessServer_send = function FProcessServer_send(p){
      var o = this;
      // 关联事件
      postMessage(p);
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   MO.FProcessServer_process = function FProcessServer_process(){
      var o = this;
      // 关联事件
      onmessage = o.ohMessage;
      // 启动监听
      FProcessServer.__linker = o;
      //o._handle = setInterval(FProcessServer_ohInterval, 100);
   }
}

//==========================================================
// <T>资源提供商管理器。</T>
//
// @class
// @author maocy
// @history 15031
//==========================================================
function FE3sVendorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._optionProcess = false;
   o._lzmaWorker    = null;;
   o._activeEvent   = null;
   o._events        = null;
   o._setuped       = false;
   o._vendors       = null;
   // @attribute
   o._thread        = null;
   o._interval      = 100;
   //..........................................................
   // @event
   o.onProcess      = FE3sVendorConsole_onProcess;
   o.onComplete     = FE3sVendorConsole_onComplete;
   //..........................................................
   // @method
   o.construct      = FE3sVendorConsole_construct;
   o.pushCompress   = FE3sVendorConsole_pushCompress;
   o.createVendor   = FE3sVendorConsole_createVendor;
   o.register       = FE3sVendorConsole_register;
   o.find           = FE3sVendorConsole_find;
   o.setup          = FE3sVendorConsole_setup;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
// <P>只保证一个事件在执行，多个执行时，引用库有错误。</P>
//
// @method
//==========================================================
function FE3sVendorConsole_onProcess(){
   var o = this;
   var s = o._events;
   if(!o._activeEvent && !s.isEmpty()){
      if(o._optionProcess){
         // 线程工作方式
         var w = o._lzmaWorker;
         if(!w){
            var u = RBrowser.contentPath('/ajs/lzma_worker.js');
            w = o._lzmaWorker = new LZMA(u);
         }
         var e = o._activeEvent = s.erase(0);
         w.decompress(e.data, o.onComplete, null);
         e.data = null;
      }else{
         // 回调工作方式
         var e = o._activeEvent = s.erase(0);
         LZMA.decompress(e.data, o.onComplete, null);
         e.data = null;
      }
   }
}

//==========================================================
// <T>完成处理。</T>
//
// @method
//==========================================================
function FE3sVendorConsole_onComplete(p){
   var o = RConsole.find(FE3sVendorConsole);
   // 回调处理
   var e = o._activeEvent;
   e.process.call(e.owner, p);
   e.owner = null;
   e.process = null;
   // 删除事件
   o._activeEvent = null;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sVendorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._events = new TObjects();
   o._vendors = new TDictionary();
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
   // 设置是否支持进程方式
   var c = RBrowser.capability();
   o._optionProcess = c.optionProcess;
}

//==========================================================
// <T>增加一个解压缩数据事件。</T>
//
// @method
//==========================================================
function FE3sVendorConsole_pushCompress(w, f, d){
   this._events.push(new SE3sCompressEvent(w, f, d));
}

//==========================================================
// <T>注册一个资源提供商。</T>
//
// @param p:name:String 名称
// @return 主题
//==========================================================
function FE3sVendorConsole_createVendor(c, u){
   var v = RClass.create(c);
   v.setContentUrl(u);
   return v;
}

//==========================================================
// <T>注册一个资源提供商。</T>
//
// @param p:name:String 名称
// @return 主题
//==========================================================
function FE3sVendorConsole_register(n, p){
   this._vendors.set(n, p);
}

//==========================================================
// <T>根据名称查找资源提供商。</T>
//
// @param p:name:String 名称
// @return FE3sVendor 资源提供商
//==========================================================
function FE3sVendorConsole_find(p){
   var o = this;
   if(!o._setuped){
      o.setup('net');
   }
   var v = o._vendors.get(p);
   v.reset();
   return v;
}

//==========================================================
// <T>根据名称查找资源提供商。</T>
//
// @param p:name:String 名称
// @return FE3sVendor 资源提供商
//==========================================================
function FE3sVendorConsole_setup(p){
   var o = this;
   if(p == 'net'){
      o._vendors.set('texture.bitmap', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.content.texture.bitmap.wv'), 'guid|code'));
      o._vendors.set('texture', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.content.texture.wv'), 'guid'));
      o._vendors.set('model', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.content.model.wv'), 'guid'));
      o._vendors.set('template', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.content.template.wv'), 'guid|code'));
      o._vendors.set('scene', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.content.scene.wv'), 'guid|code'));
   }else if(p == 'local'){
      o._vendors.set('texture.bitmap', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/texture/{guid}/{code}.{format}')));
      o._vendors.set('texture', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/texture/{guid}.bin')));
      o._vendors.set('model', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/model/{guid}.bin')));
      o._vendors.set('template', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/template/{guid}.bin')));
      o._vendors.set('scene', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/scene/{guid}.bin')));
   }else{
      throw new TError(o, 'Unknown setup code. (code={1})', p);
   }
   o._setuped = true;
}

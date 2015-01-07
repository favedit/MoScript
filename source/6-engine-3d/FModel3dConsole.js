//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FModel3dConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = EScope.Local;
   o._loadModels = null;
   o._models     = null;
   o._thread     = null;
   o._interval   = 100;
   //..........................................................
   o.onProcess   = FModel3dConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = FModel3dConsole_construct;
   o.models      = FModel3dConsole_models;
   o.alloc       = FModel3dConsole_alloc;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FModel3dConsole_construct(){
   var o = this;
   // 设置属性
   o._loadModels = new TObjects();
   o._models = new TDictionary();
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>获得渲染模型集合。</T>
//
// @method
// @return TDictionary 渲染模型集合
//==========================================================
function FModel3dConsole_models(){
   return this._models;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pn:name:String 名称
// @return FRenderModel 渲染模型
//==========================================================
function FModel3dConsole_alloc(pc, pn){
   var o = this;
   // 加载渲染对象
   var rmc = RConsole.find(FRd3ModelConsole);
   var rm = rmc.load(pc, pn);
   // 加载模型
   var m = RClass.create(FModel3d);
   m._context = pc;
   m._name = pn;
   m._resource = rm;
   // 测试是否已加载
   if(rm.testReady()){
      m.load(rm);
   }else{
      // 增加加载中
      o._loadModels.push(m);
   }
   return m;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FModel3dConsole_onProcess(){
   var o = this;
   var ms = o._loadModels;
   var c = ms.count();
   for(var n = 0; n < c; n++){
      var m = ms.get(n);
      if(m.testReady()){
         ms.erase(n);
         break;
      }
   }
}

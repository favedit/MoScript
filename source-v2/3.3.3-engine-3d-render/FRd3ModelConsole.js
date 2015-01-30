//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FRd3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = EScope.Local;
   // @attribute
   o._loadModels = null;
   o._models     = null;
   // @attribute
   o._thread     = null;
   o._interval   = 200;
   //..........................................................
   // @event
   o.onProcess   = FRd3ModelConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = FRd3ModelConsole_construct;
   o.models      = FRd3ModelConsole_models;
   o.load        = FRd3ModelConsole_load;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FRd3ModelConsole_onProcess(){
   var o = this;
   var ms = o._loadModels;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRd3ModelConsole_construct(){
   var o = this;
   // 设置属性
   o._loadModels = new TLooper();
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
function FRd3ModelConsole_models(){
   return this._models;
}

//==========================================================
// <T>加载一个渲染模型。</T>
//
// @method
// @param pc:content:FG3dContext 环境
// @param pn:name:String 名称
// @return FRenderModel 渲染模型
//==========================================================
function FRd3ModelConsole_load(pc, pn){
   var o = this;
   // 检查参数
   if(pc == null){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pn)){
      throw new TError('Model name is empty');
   }
   // 查找模型
   var m = o._models.get(pn);
   if(m){
      return m;
   }
   // 获得路径
   var rmc = RConsole.find(FRs3ModelConsole);
   var rm = rmc.load(pn);
   // 加载模型
   m = RClass.create(FRd3Model);
   m.linkContext(pc);
   m.setName(pn);
   m.setResource(rm);
   o._models.set(pn, m);
   // 测试是否已加载
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      // 增加加载中
      o._loadModels.push(m);
   }
   return m;
}

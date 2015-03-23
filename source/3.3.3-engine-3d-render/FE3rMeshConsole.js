//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FE3rMeshConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd   = EScope.Local;
   // @attribute
   o._loadMeshs = null;
   o._meshs     = null;
   // @attribute
   o._thread    = null;
   o._interval  = 200;
   //..........................................................
   // @event
   o.onProcess  = FE3rMeshConsole_onProcess;
   //..........................................................
   // @method
   o.construct  = FE3rMeshConsole_construct;
   // @method
   o.findMesh   = FE3rMeshConsole_findMesh;
   o.meshs      = FE3rMeshConsole_meshs;
   // @method
   o.loadByGuid = FE3rMeshConsole_loadByGuid;
   o.loadByCode = FE3rMeshConsole_loadByCode;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3rMeshConsole_onProcess(){
   var o = this;
   var s = o._loadMeshs;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rMeshConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._loadMeshs = new TLooper();
   o._meshs = new TDictionary();
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>根据唯一编号查找渲染网格。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sMesh 渲染网格
//==========================================================
function FE3rMeshConsole_findMesh(p){
   return this._meshs.get(p);
}

//==========================================================
// <T>获得渲染网格集合。</T>
//
// @method
// @return TDictionary 渲染网格集合
//==========================================================
function FE3rMeshConsole_meshs(){
   return this._meshs;
}

//==========================================================
// <T>加载一个渲染模型。</T>
//
// @method
// @param pc:content:FG3dContext 环境
// @param pg:guid:String 唯一编号
// @return FRenderModel 渲染模型
//==========================================================
function FE3rMeshConsole_loadByGuid(pc, pg){
   var o = this;
   // 检查参数
   if(!RClass.isClass(pc, MGraphicObject)){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pg)){
      throw new TError('Mesh guid is empty');
   }
   // 查找模型
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   // 获得路径
   var rmc = RConsole.find(FE3sModelConsole);
   var rm = rmc.loadMeshByGuid(pg);
   // 加载模型
   m = RClass.create(FE3rMesh);
   m.linkGraphicContext(pc);
   m.setName(pg);
   m.setResource(rm);
   o._meshs.set(pg, m);
   // 测试是否已加载
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      // 追加到加载队列
      o._loadMeshs.push(m);
   }
   return m;
}

//==========================================================
// <T>加载一个渲染模型。</T>
//
// @method
// @param pc:content:FG3dContext 环境
// @param pg:guid:String 唯一编号
// @return FRenderModel 渲染模型
//==========================================================
function FE3rMeshConsole_loadByCode(pc, pg){
   var o = this;
   // 检查参数
   if(!RClass.isClass(pc, MGraphicObject)){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pg)){
      throw new TError('Mesh code is empty');
   }
   // 查找模型
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   // 获得路径
   var rmc = RConsole.find(FE3sModelConsole);
   var rm = rmc.loadMeshByCode(pg);
   // 加载模型
   m = RClass.create(FE3rMesh);
   m.linkGraphicContext(pc);
   m.setCode(pg);
   m.setResource(rm);
   o._meshs.set(pg, m);
   // 测试是否已加载
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      // 追加到加载队列
      o._loadMeshs.push(m);
   }
   return m;
}

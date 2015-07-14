//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
MO.FE3rMeshConsole = function FE3rMeshConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd   = MO.EScope.Local;
   // @attribute
   o._loadMeshs = null;
   o._meshs     = MO.Class.register(o, new AGetter('_meshs'));
   // @attribute
   o._thread    = null;
   o._interval  = 200;
   //..........................................................
   // @event
   o.onProcess  = MO.FE3rMeshConsole_onProcess;
   //..........................................................
   // @method
   o.construct  = MO.FE3rMeshConsole_construct;
   // @method
   o.findMesh   = MO.FE3rMeshConsole_findMesh;
   // @method
   o.loadByGuid = MO.FE3rMeshConsole_loadByGuid;
   o.loadByCode = MO.FE3rMeshConsole_loadByCode;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3rMeshConsole_onProcess = function FE3rMeshConsole_onProcess(){
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
MO.FE3rMeshConsole_construct = function FE3rMeshConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._loadMeshs = new MO.TLooper();
   o._meshs = new MO.TDictionary();
   // 创建线程
   var t = o._thread = MO.Class.create(MO.FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(t);
}

//==========================================================
// <T>根据唯一编号查找渲染网格。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sMesh 渲染网格
//==========================================================
MO.FE3rMeshConsole_findMesh = function FE3rMeshConsole_findMesh(p){
   return this._meshs.get(p);
}

//==========================================================
// <T>加载一个渲染模型。</T>
//
// @method
// @param pc:content:FG3dContext 环境
// @param pg:guid:String 唯一编号
// @return FRenderModel 渲染模型
//==========================================================
MO.FE3rMeshConsole_loadByGuid = function FE3rMeshConsole_loadByGuid(pc, pg){
   var o = this;
   // 检查参数
   if(!MO.Class.isClass(pc, MO.MGraphicObject)){
      throw new MO.TError('Graphics context is empty');
   }
   if(MO.Lang.String.isEmpty(pg)){
      throw new MO.TError('Mesh guid is empty');
   }
   // 查找模型
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   // 获得路径
   var rmc = MO.Console.find(MO.FE3sMeshConsole);
   var rm = rmc.loadByGuid(pg);
   // 加载模型
   m = MO.Class.create(MO.FE3rMesh);
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

//==========================================================
// <T>加载一个渲染模型。</T>
//
// @method
// @param pc:content:FG3dContext 环境
// @param pg:guid:String 唯一编号
// @return FRenderModel 渲染模型
//==========================================================
MO.FE3rMeshConsole_loadByCode = function FE3rMeshConsole_loadByCode(pc, pg){
   var o = this;
   // 检查参数
   if(!MO.Class.isClass(pc, MO.MGraphicObject)){
      throw new MO.TError('Graphics context is empty');
   }
   if(MO.Lang.String.isEmpty(pg)){
      throw new MO.TError('Mesh code is empty');
   }
   // 查找模型
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   // 获得路径
   var rmc = MO.Console.find(MO.FE3sMeshConsole);
   var rm = rmc.loadByCode(pg);
   // 加载模型
   m = MO.Class.create(MO.FE3rMesh);
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

//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
MO.FE3dMeshConsole = function FE3dMeshConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = MO.EScope.Local;
   // @attribute
   o._loadMeshs  = null;
   o._meshs      = MO.Class.register(o, new MO.AGetter('_meshs'));
   // @attribute
   o._thread     = null;
   o._interval   = 100;
   //..........................................................
   // @event
   o.onProcess   = MO.FE3dMeshConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = MO.FE3dMeshConsole_construct;
   o.meshs       = MO.FE3dMeshConsole_meshs;
   o.allocByGuid = MO.FE3dMeshConsole_allocByGuid;
   o.allocByCode = MO.FE3dMeshConsole_allocByCode;
   o.free        = MO.FE3dMeshConsole_free;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dMeshConsole_onProcess = function FE3dMeshConsole_onProcess(){
   var o = this;
   var ms = o._loadMeshs;
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
MO.FE3dMeshConsole_construct = function FE3dMeshConsole_construct(){
   var o = this;
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
// <T>获得渲染模型集合。</T>
//
// @method
// @return TDictionary 渲染模型集合
//==========================================================
MO.FE3dMeshConsole_meshs = function FE3dMeshConsole_meshs(){
   return this._meshs;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pn:name:String 名称
// @return FRenderModel 渲染模型
//==========================================================
MO.FE3dMeshConsole_allocByGuid = function FE3dMeshConsole_allocByGuid(pc, pn){
   var o = this;
   // 尝试从缓冲池中取出
   var ms = o._meshs.get(pn);
   if(ms){
      if(!ms.isEmpty()){
         return ms.pop();
      }
   }
   // 加载渲染对象
   var rmc = MO.Console.find(MO.FE3rMeshConsole);
   var rm = rmc.loadByGuid(pc, pn);
   // 加载模型
   var m = MO.Class.create(MO.FE3dMesh);
   m.linkGraphicContext(pc);
   m._name = pn;
   m._renderable = rm;
   // 增加加载中
   o._loadMeshs.push(m);
   return m;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pn:name:String 名称
// @return FRenderModel 渲染模型
//==========================================================
MO.FE3dMeshConsole_allocByCode = function FE3dMeshConsole_allocByCode(pc, pn){
   var o = this;
   // 尝试从缓冲池中取出
   var ms = o._meshs.get(pn);
   if(ms){
      if(!ms.isEmpty()){
         return ms.pop();
      }
   }
   // 加载渲染对象
   var rmc = MO.Console.find(MO.FE3rMeshConsole);
   var rm = rmc.loadByCode(pc, pn);
   // 加载模型
   var m = MO.Class.create(MO.FE3dMesh);
   m.linkGraphicContext(pc);
   m._name = pn;
   m._renderable = rm;
   // 增加加载中
   o._loadMeshs.push(m);
   return m;
}

//==========================================================
// <T>释放一个模型。</T>
//
// @method
// @param p:model:FModel3d 模型
//==========================================================
MO.FE3dMeshConsole_free = function FE3dMeshConsole_free(p){
   var o = this;
   // 脱离父对象
   p._display.remove();
   // 放到缓冲池
   //var ms = o._meshs.get(n);
   //if(ms == null){
   //   ms = new TObjects();
   //   o._meshs.set(n, ms);
   //}
   //ms.push(p);
}

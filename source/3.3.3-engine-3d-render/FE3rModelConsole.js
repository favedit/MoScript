//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FE3rModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd       = EScope.Local;
   // @attribute
   o._loadModels    = null;
   o._models        = null;
   o._meshs         = null;
   o._dynamicMeshs  = null;
   // @attribute
   o._thread        = null;
   o._interval      = 200;
   //..........................................................
   // @event
   o.onProcess      = FE3rModelConsole_onProcess;
   //..........................................................
   // @method
   o.construct      = FE3rModelConsole_construct;
   // @method
   o.findModel      = FE3rModelConsole_findModel;
   o.models         = FE3rModelConsole_models;
   o.findMesh       = FE3rModelConsole_findMesh;
   o.meshs          = FE3rModelConsole_meshs;
   // @method
   o.load           = FE3rModelConsole_load;
   o.loadMeshByGuid = FE3rModelConsole_loadMeshByGuid;
   o.loadMeshByCode = FE3rModelConsole_loadMeshByCode;
   o.merge          = FE3rModelConsole_merge;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3rModelConsole_onProcess(){
   var o = this;
   var s = o._loadModels;
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
function FE3rModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._loadModels = new TLooper();
   o._models = new TDictionary();
   o._meshs = new TDictionary();
   o._dynamicMeshs = new TDictionary();
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>根据唯一编号查找渲染模型。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sModel 渲染模型
//==========================================================
function FE3rModelConsole_findModel(p){
   return this._models.get(p);
}

//==========================================================
// <T>获得渲染模型集合。</T>
//
// @method
// @return TDictionary 渲染模型集合
//==========================================================
function FE3rModelConsole_models(){
   return this._models;
}

//==========================================================
// <T>根据唯一编号查找渲染网格。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sMesh 渲染网格
//==========================================================
function FE3rModelConsole_findMesh(p){
   return this._meshs.get(p);
}

//==========================================================
// <T>获得渲染网格集合。</T>
//
// @method
// @return TDictionary 渲染网格集合
//==========================================================
function FE3rModelConsole_meshs(){
   return this._meshs;
}

//==========================================================
// <T>加载一个渲染模型。</T>
//
// @method
// @param context:FG3dContext 环境
// @param guid:String 唯一编号
// @return FRenderModel 渲染模型
//==========================================================
function FE3rModelConsole_load(context, guid){
   var o = this;
   // 检查参数
   if(!RClass.isClass(context, MGraphicObject)){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(guid)){
      throw new TError('Model guid is empty');
   }
   // 查找模型
   var model = o._models.get(guid);
   if(model){
      return model;
   }
   // 获得路径
   var resource = RConsole.find(FE3sModelConsole).load(guid);
   // 加载模型
   model = RClass.create(FE3rModel);
   model.linkGraphicContext(context);
   model.setCode(guid);
   model.setResource(resource);
   o._models.set(guid, model);
   // 追加到加载队列
   o._loadModels.push(model);
   return model;
}

//==========================================================
// <T>加载一个渲染模型。</T>
//
// @method
// @param pc:content:FG3dContext 环境
// @param pg:guid:String 唯一编号
// @return FRenderModel 渲染模型
//==========================================================
function FE3rModelConsole_loadMeshByGuid(context, pg){
   var o = this;
   // 检查参数
   if(!RClass.isClass(context, MGraphicObject)){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pg)){
      throw new TError('Model guid is empty');
   }
   // 查找模型
   var m = o._models.get(pg);
   if(m){
      return m;
   }
   // 获得路径
   var resource = RConsole.find(FE3sModelConsole).load(guid);
   // 加载模型
   m = RClass.create(FE3rModel);
   m.linkGraphicContext(pc);
   m.setCode(pg);
   m.setResource(rm);
   o._models.set(pg, m);
   // 测试是否已加载
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      // 追加到加载队列
      o._loadModels.push(m);
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
function FE3rModelConsole_loadMeshByCode(context, pg){
   var o = this;
   // 检查参数
   if(!RClass.isClass(context, MGraphicObject)){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pg)){
      throw new TError('Model guid is empty');
   }
   //..........................................................
   // 查找模型
   var model = o._models.get(pg);
   if(model){
      return model;
   }
   //..........................................................
   // 获得资源
   var resource = RConsole.find(FE3sModelConsole).load(guid);
   // 加载模型
   model = RClass.create(FE3rModel);
   model.linkGraphicContext(pc);
   model.setCode(pg);
   model.setResource(resource);
   o._models.set(pg, model);
   // 测试是否已加载
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      // 追加到加载队列
      o._loadModels.push(m);
   }
   return m;
}

//==========================================================
// <T>获得渲染网格集合。</T>
//
// @method
// @param effect:FE3dEffect 渲染器
// @param region:FE3dRegion 区域
// @param offset:Integer 开始位置
// @param count:Integer 总数
// @return FE3rDynamicModel 动态网格
//==========================================================
function FE3rModelConsole_merge(effect, region, offset, count){
   var o = this;
   // 获得代码
   var flag = 'merge';
   var renderables = region.renderables();
   for(var i = 0; i < count; i++){
      var renderable = renderables.getAt(offset + i);
      flag += '|' + renderable.hashCode();
   }
   // 合并网格
   var model = o._dynamicMeshs.get(flag);
   if(!model){
      model = RClass.create(FE3rDynamicModel);
      model.linkGraphicContext(region);
      for(var i = 0; i < count; i++){
         var renderable = renderables.getAt(offset + i);
         model.pushRenderable(renderable);
      }
      model.build();
      o._dynamicMeshs.set(flag, model);
      RLogger.info(o, 'Create merge model. (mesh={1}, renderables={2})', model.meshes().count(), model.renderables().count());
   }
   model.update();
   return model;
}

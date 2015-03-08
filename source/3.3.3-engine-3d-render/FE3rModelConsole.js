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
   o._scopeCd      = EScope.Local;
   // @attribute
   o._loadModels   = null;
   o._models       = null;
   o._meshs        = null;
   o._dynamicMeshs = null;
   // @attribute
   o._thread       = null;
   o._interval     = 200;
   //..........................................................
   // @event
   o.onProcess     = FE3rModelConsole_onProcess;
   //..........................................................
   // @method
   o.construct     = FE3rModelConsole_construct;
   // @method
   o.findModel     = FE3rModelConsole_findModel;
   o.models        = FE3rModelConsole_models;
   o.findMesh      = FE3rModelConsole_findMesh;
   o.meshs         = FE3rModelConsole_meshs;
   // @method
   o.load          = FE3rModelConsole_load;
   o.merge         = FE3rModelConsole_merge;
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
// @param pc:content:FG3dContext 环境
// @param pn:name:String 名称
// @return FRenderModel 渲染模型
//==========================================================
function FE3rModelConsole_load(pc, pn){
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
   var rmc = RConsole.find(FE3sModelConsole);
   var rm = rmc.load(pn);
   // 加载模型
   m = RClass.create(FE3rModel);
   m.linkGraphicContext(pc);
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

//==========================================================
// <T>获得渲染网格集合。</T>
//
// @method
// @return TDictionary 渲染网格集合
//==========================================================
function FE3rModelConsole_merge(pe, pg, pi, pc){
   var o = this;
   // 获得代码
   var f = 'merge';
   var rs = pg.renderables();
   for(var i = 0; i < pc; i++){
      var r = rs.getAt(pi + i);
      f += '|' + r.hashCode();
   }
   // 合并网格
   var md = o._dynamicMeshs.get(f);
   if(!md){
      md = RClass.create(FE3rDynamicModel);
      for(var i = 0; i < pc; i++){
         var r = rs.getAt(pi + i);
         md.pushRenderable(r);
      }
      md.linkGraphicContext(pg);
      md.build();
      o._dynamicMeshs.set(f, md);
   }
   md.update();
   return md;
}

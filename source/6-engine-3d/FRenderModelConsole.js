//==========================================================
// <T>资源控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FRenderModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = EScope.Local;
   o._models   = null;
   o._path     = '/assets/model/';
   //..........................................................
   // @method
   o.construct = FRenderModelConsole_construct;
   o.models    = FRenderModelConsole_models;
   o.load      = FRenderModelConsole_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRenderModelConsole_construct(){
   var o = this;
   o._models = new TDictionary();
}

//==========================================================
// <T>获得渲染模型集合。</T>
//
// @method
// @return TDictionary 渲染模型集合
//==========================================================
function FRenderModelConsole_models(){
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
function FRenderModelConsole_load(pc, pn){
   var o = this;
   // 查找模型
   var m = o._models.get(pn);
   if(m != null){
      return m;
   }
   // 获得路径
   var u = RBrowser.contentPath() + o._path + pn + '.ser'
   // 加载模型
   var m = RClass.create(FRenderModel);
   m._context = pc;
   m._name = pn;
   m.load(u);
   o._models.set(pn, m);
   return m;
}

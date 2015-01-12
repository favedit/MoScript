//==========================================================
// <T>资源模板管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FRs3SceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scenes   = null;
   o._path     = '/assets/scene/'
   //..........................................................
   // @method
   o.construct = FRs3SceneConsole_construct;
   o.load      = FRs3SceneConsole_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3SceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new TDictionary();
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneConsole_load(p){
   var o = this;
   var r = o._scenes.get(p);
   if(r == null){
      // 生成地址
      var u = RBrowser.contentPath(o._path + p + '.ser');
      // 创建主题
      r = RClass.create(FRs3Scene);
      r.load(u);
      o._scenes.set(p, r);
   }
   return r;
}

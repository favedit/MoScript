//==========================================================
// <T>资源模型管理器。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._models   = null;
   o._path     = '/assets/model/'
   //..........................................................
   // @method
   o.construct = FRs3ModelConsole_construct;
   o.load      = FRs3ModelConsole_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3ModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3ModelConsole_load(p){
   var o = this;
   var r = o._models.get(p);
   if(r == null){
      // 生成地址
      var u = RBrowser.contentPath(o._path + p + '.ser');
      // 创建模型
      r = RClass.create(FRs3Model);
      r.load(u);
      o._models.set(p, r);
   }
   return r;
}

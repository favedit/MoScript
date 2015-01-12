//==========================================================
// <T>资源模板管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FRs3TemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._templates = null;
   o._path      = '/assets/template/'
   //..........................................................
   // @method
   o.construct = FRs3TemplateConsole_construct;
   o.load      = FRs3TemplateConsole_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3TemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new TDictionary();
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3TemplateConsole_load(p){
   var o = this;
   var r = o._templates.get(p);
   if(r == null){
      // 生成地址
      var u = RBrowser.contentPath(o._path + p + '.ser');
      // 创建主题
      r = RClass.create(FRs3Template);
      r.load(u);
      o._templates.set(p, r);
   }
   return r;
}

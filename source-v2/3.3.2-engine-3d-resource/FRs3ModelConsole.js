//==========================================================
// <T>资源模型管理器。</T>
// <P>http://{server}:{port}/cloud.content.model.wv?code={code}&version={version}</P>
//
// @author maocy
// @history 150128
//==========================================================
function FRs3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._models   = null;
   o._dataUrl  = '/cloud.content.model.wv'
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
// @param c:code:String 代码
// @param v:version:String 版本
// @return 处理结果
//==========================================================
function FRs3ModelConsole_load(c, v){
   var o = this;
   var ms = o._models;
   var m = ms.get(c);
   if(m == null){
      // 生成地址
      var u = RBrowser.hostPath(o._dataUrl + '?code=' + c + '&version=' + RString.nvl(v) + '&date=' + RDate.format());
      // 创建模型
      m = RClass.create(FRs3Model);
      m.load(u);
      ms.set(c, m);
   }
   return m;
}

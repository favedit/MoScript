//==========================================================
// <T>页面定义控制台。</T>
//
// @console
// @author maocy
// @version 150124
//==========================================================
MO.FUiFrameDefineConsole = function FUiFrameDefineConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd       = MO.EScope.Global;
   // @attribute
   o._service       = 'content.define.frame';
   o._defines       = null;
   //..........................................................
   // @listeners
   o.lsnsLoaded     = null;
   //..........................................................
   // @method
   o.construct      = MO.FUiFrameDefineConsole_construct;
   // @method
   o.load           = MO.FUiFrameDefineConsole_load;
   return o;
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
MO.FUiFrameDefineConsole_construct = function FUiFrameDefineConsole_construct(){
   var o = this;
   o._defines = new MO.TDictionary();
   o.lsnsLoaded = new MO.TListeners();
   //o.events = new TMap();
}

//==========================================================
// <T>根据名称加载一个表单定义。</T>
//
// @method
// @param name:String 名称
// @return TXmlDocument 节点对象
//==========================================================
MO.FUiFrameDefineConsole_load = function FUiFrameDefineConsole_load(name){
   var o = this;
   var defines = o._defines;
   // 查找页面
   var xconfig = defines.get(name);
   if(xconfig){
      return xconfig;
   }
   //..........................................................
   // 创建数据
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'query');
   var xframe = xroot.create('Frame');
   xframe.set('name', name);
   // 发送内容
   var url = MO.RDuiService.url(o._service);
   var xresult = MO.Console.find(MO.FXmlConsole).sendSync(url, xdocument);
   // 检查数据结果
   //if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(r))){
   //   return null;
   //}
   //..........................................................
   // 读取结果
   var xframes = xresult.nodes();
   var count = xframes.count();
   for(var i = 0; i < count; i++){
      var xframe = xframes.at(i);
      var frameName = xframe.get('name');
      defines.set(frameName, xframe);
   }
   //..........................................................
   // 查找结果
   var xframe = defines.get(name);
   if(!xframe){
      throw new MO.TError(o, 'Unknown frame. (name={1])', name);
   }
   return xframe;
}

//==========================================================
// <T>页面定义控制台。</T>
//
// @console
// @author maocy
// @version 150610
//==========================================================
MO.FGuiFrameDescribeConsole = function FGuiFrameDescribeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd     = MO.EScope.Global;
   // @attribute
   o._serviceCode = 'cloud.describe.frame';
   o._defines     = MO.Class.register(o, new MO.AGetter('_defines'));
   //..........................................................
   // @method
   o.construct    = MO.FGuiFrameDescribeConsole_construct;
   // @method
   o.load         = MO.FGuiFrameDescribeConsole_load;
   // @method
   o.dispose      = MO.FGuiFrameDescribeConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiFrameDescribeConsole_construct = function FGuiFrameDescribeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._defines = new MO.TDictionary();
}

//==========================================================
// <T>根据名称加载一个表单定义。</T>
//
// @method
// @param name:String 名称
// @return TXmlDocument 节点对象
//==========================================================
MO.FGuiFrameDescribeConsole_load = function FGuiFrameDescribeConsole_load(name){
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
   var url = MO.Window.Browser.hostPath('/' + o._serviceCode + '.ws');
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
      throw new MO.TError(o, 'Unknown frame. (name={1})', name);
   }
   return xframe;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiFrameDescribeConsole_dispose = function FGuiFrameDescribeConsole_dispose(){
   var o = this;
   // 释放属性
   o._defines = MO.Lang.Object.dispose(o._defines, true);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}

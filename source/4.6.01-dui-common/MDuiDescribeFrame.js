//==========================================================
// <T>描述页面。</T>
//
// @class
// @author maocy
// @version 150210
//==========================================================
MO.MDuiDescribeFrame = function MDuiDescribeFrame(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._frameName  = null;
   // @method
   o.buildDefine = MO.MDuiDescribeFrame_buildDefine;
   return o;
}

//==========================================================
// <T>从配置信息中构建构造页面。</T>
//
// @method
// @param hDocument:HtmlTag 页面元素
// @param frameName:String 页面名称
//==========================================================
MO.MDuiDescribeFrame_buildDefine = function MDuiDescribeFrame_buildDefine(hDocument, frameName){
   var o = this;
   // 获得名称
   if(MO.Lang.String.isEmpty(frameName)){
      frameName = o._frameName;
   }
   // 获取页面定义
   var frameConsole = MO.Console.find(MO.FUiFrameDefineConsole);
   var xconfig = frameConsole.load(frameName);
   // 构建处理
   MO.Dui.Control.build(o, xconfig, null, hDocument);
}

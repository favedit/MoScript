//==========================================================
// <T>描述页面。</T>
//
// @class
// @author maocy
// @version 150210
//==========================================================
MO.MUiDescribeFrame = function MUiDescribeFrame(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._frameName  = null;
   // @method
   o.buildDefine = MO.MUiDescribeFrame_buildDefine;
   return o;
}

//==========================================================
// <T>从配置信息中构建构造页面。</T>
//
// @method
// @param hDocument:HtmlTag 页面元素
// @param frameName:String 页面名称
//==========================================================
MO.MUiDescribeFrame_buildDefine = function MUiDescribeFrame_buildDefine(hDocument, frameName){
   var o = this;
   // 获得名称
   if(MO.Lang.String.isEmpty(frameName)){
      frameName = o._frameName;
   }
   // 获取页面定义
   var frameConsole = MO.Console.find(MO.FUiDescribeFrameConsole);
   var xconfig = frameConsole.load(frameName);
   // 构建处理
   MO.RUiControl.build(o, xconfig, null, hDocument);
}

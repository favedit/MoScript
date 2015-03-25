//==========================================================
// <T>描述页面。</T>
//
// @class
// @author maocy
// @version 150210
//==========================================================
function MUiDescribeFrame(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._frameName  = null;
   // @method
   o.buildDefine = MUiDescribeFrame_buildDefine;
   return o;
}

//==========================================================
// <T>从配置信息中构建构造页面。</T>
//
// @method
// @param h:hDocument:HtmlTag 页面元素
// @param n:frameName:String 页面名称
//==========================================================
function MUiDescribeFrame_buildDefine(h, n){
   var o = this;
   // 获得名称
   if(RString.isEmpty(n)){
      n = o._frameName;
   }
   // 获取页面定义
   var fc = RConsole.find(FDescribeFrameConsole);
   var x = fc.load(n);
   // 构建处理
   RControl.build(o, x, null, h);
}

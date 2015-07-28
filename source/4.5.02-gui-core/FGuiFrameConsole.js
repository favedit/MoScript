//==========================================================
// <T>页面实例控制台。</T>
//
// @console
// @author maocy
// @version 150610
//==========================================================
MO.FGuiFrameConsole = function FGuiFrameConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = MO.EScope.Local;
   // @attribute
   o._frames     = null;
   //..........................................................
   // @method
   o.construct   = MO.FGuiFrameConsole_construct;
   // @method
   o.createFrame = MO.FGuiFrameConsole_createFrame;
   o.create      = MO.FGuiFrameConsole_create;
   o.find        = MO.FGuiFrameConsole_find;
   o.get         = MO.FGuiFrameConsole_get;
   o.alloc       = MO.FGuiFrameConsole_alloc;
   o.free        = MO.FGuiFrameConsole_free;
   o.dispose     = MO.FGuiFrameConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiFrameConsole_construct = function FGuiFrameConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._frames = new MO.TDictionary();
}

//==========================================================
// <T>构建指定表单名称的控件对象，并放置在指定HTML页面ID的位置。</T>
//
// @method
// @param context:MGraphicContext 绘制环境
// @param control:FGuiControl 控件
// @param name:String 名称
// @return FGuiFrame 页面控件
//==========================================================
MO.FGuiFrameConsole_createFrame = function FGuiFrameConsole_createFrame(context, control, name){
   var o = this;
   // 获得表单定义
   var describeConsole = MO.Console.find(MO.FGuiFrameDescribeConsole);
   var xframe = describeConsole.load(name);
   // 构建处理
   var frame = MO.RGuiControl.build(null, xframe, null, null);
   frame.linkGraphicContext(context);
   frame.psInitialize();
   frame.build();
   return frame;
}

//==========================================================
// <T>根据名称查找表单实例，如果不存在则创建一个。</T>
//
// @method
// @param context:MGraphicContext 绘制环境
// @param name:String 名称
// @return FGuiFrame 页面控件
//==========================================================
MO.FGuiFrameConsole_create = function FGuiFrameConsole_create(context, name){
   var o = this;
   // 创建表单
   var frame = o.createFrame(context, null, name);
   return frame;
}

//==========================================================
// <T>根据名称查找表单实例，如果不存在则返回空。</T>
//
// @method
// @param name:String 名称
// @return FDuiFrame 页面控件
//==========================================================
MO.FGuiFrameConsole_find = function FGuiFrameConsole_find(name){
   return this._frames.get(name); 
}

//==========================================================
// <T>根据名称查找表单实例，如果不存在则创建一个。</T>
//
// @method
// @param context:MGraphicContext 绘制环境
// @param name:String 名称
// @return FGuiFrame 页面控件
//==========================================================
MO.FGuiFrameConsole_get = function FGuiFrameConsole_get(context, name){
   var o = this;
   var frames = o._frames;
   var frame = frames.get(name);
   if(!frame){
      // 创建表单
      frame = o.createFrame(context, null, name);
      frames.set(name, frame);
   }
   return frame;
}

//==========================================================
// <T>释放指定的表单对象。</T>
// <P>设置表单对象为不可见，等待再次利用。</P>
//
// @method
// @param f:form:FControl 表单对象
//==========================================================
MO.FGuiFrameConsole_alloc = function FGuiFrameConsole_alloc(f){
}

//==========================================================
// <T>释放指定的表单对象。</T>
// <P>设置表单对象为不可见，等待再次利用。</P>
//
// @method
// @param f:form:FControl 表单对象
//==========================================================
MO.FGuiFrameConsole_free = function FGuiFrameConsole_free(f){
   f.setVisible(false);
   this._freeFrames.push(f);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiFrameConsole_dispose = function FGuiFrameConsole_dispose(){
   var o = this;
   // 释放属性
   o._frames = MO.Lang.Object.dispose(o._frames, true);
   // 父处理
   o.__base.FConsole.construct.call(o);
}

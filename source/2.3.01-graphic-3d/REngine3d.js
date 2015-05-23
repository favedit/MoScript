//==========================================================
// <T>三维渲染引擎。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
var REngine3d = new function REngine3d(){
   var o = this;
   //..........................................................
   // @attribute
   o._setuped      = false;
   o._contexts     = null;
   //..........................................................
   // @event
   o.onUnload      = REngine3d_onUnload;
   //..........................................................
   // @method
   o.setup         = REngine3d_setup;
   // @method
   o.contexts      = REngine3d_contexts;
   // @method
   o.createContext = REngine3d_createContext;
   // @method
   o.dispose       = REngine3d_dispose;
   return o;
}

//==========================================================
// <T>卸载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function REngine3d_onUnload(event){
   var o = this;
   o.dispose();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function REngine3d_setup(){
   var o = this;
   if(!o._setuped){
      // 设置属性
      o._contexts = new TObjects();
      // 注册事件
      RWindow.lsnsUnload.register(o, o.onUnload);
      o._setuped = true;
   }
}

//==========================================================
// <T>获得环境集合。</T>
//
// @method
// @return TObjects 环境集合
//==========================================================
function REngine3d_contexts(){
   return this._contexts;
}

//==========================================================
// <T>创建渲染环境。</T>
//
// @method
// @param clazz:HtmlCanvasTag 页面画板
// @param hCanvas:HtmlCanvasTag 页面画板
// @param attributes:HtmlCanvasTag 页面画板
// @return FGraphicContext 绘制环境
//==========================================================
function REngine3d_createContext(clazz, hCanvas, attributes){
   var o = this;
   // 配置检查处理
   o.setup();
   // 创建类对象
   var context = RClass.create(clazz);
   if(context){
      context._optionAlpha = attributes.alpha;
      context._optionAntialias = attributes.antialias;
   }
   context.linkCanvas(hCanvas);
   o._contexts.push(context);
   return context;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function REngine3d_dispose(){
   var o = this;
   var contexts = o._contexts;
   if(contexts){
      var count = contexts.count();
      for(var i = 0; i < count; i++){
         var context = contexts.at(i);
         context.dispose();
      }
      o._contexts = RObject.dispose(contexts);
   }
}

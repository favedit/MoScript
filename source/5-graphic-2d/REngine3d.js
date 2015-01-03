//==========================================================
// <T>三维渲染引擎。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
var REngine3d = new function REngine3d(){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o.contexts = new TObjects();
   //..........................................................
   // @method
   o.createContext = REngine3d_createContext;
   return o;
}

//==========================================================
// <T>创建渲染环境</T>
//
// @method
// @param h:canvas:HtmlCanvasTag 页面画板
//==========================================================
function REngine3d_createContext(c, h){
   var r = RClass.create(c);
   r.linkCanvas(h);
   o.contexts.push(r);
   return r;
}

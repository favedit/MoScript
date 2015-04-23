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
function REngine3d_createContext(c, h, a){
   var o = this;
   var r = RClass.create(c);
   if(a){
      r._optionAlpha = a.alpha;
      r._optionAntialias = a.antialias;
   }
   r.linkCanvas(h);
   o.contexts.push(r);
   return r;
}

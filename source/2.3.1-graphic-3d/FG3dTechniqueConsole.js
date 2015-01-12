//==========================================================
// <T>技术管理器。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FG3dTechniqueConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._techniques = null;
   //..........................................................
   // @method
   o.construct   = FG3dTechniqueConsole_construct;
   o.find        = FG3dTechniqueConsole_find;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dTechniqueConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._techniques = new TDictionary();
}

//==========================================================
// <T>根据类名称或对象获得技术器。</T>
//
// @method
// @param c:context:FG3dContext 环境对象
// @param p:class:Object 类对象
// @return FG3dTechnique 效果器
//==========================================================
function FG3dTechniqueConsole_find(c, p){
   var o = this;
   var n = RClass.name(p);
   var t = o._techniques.get(n);
   if(t == null){
      t = RClass.createByName(n);
      t.linkContext(c);
      t.setup();
      o._techniques.set(n, t);
   }
   return t;
}

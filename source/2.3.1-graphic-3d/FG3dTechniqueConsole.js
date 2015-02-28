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
   o.techniques  = FG3dTechniqueConsole_techniques;
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
   // 设置变量
   o._techniques = new TDictionary();
}

//==========================================================
// <T>获得技术字典。</T>
//
// @method
// @return TDictionary 技术字典
//==========================================================
function FG3dTechniqueConsole_techniques(){
   return this._techniques;
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
   var ts = o._techniques;
   var t = ts.get(n);
   if(!t){
      // 创建技术
      t = RClass.createByName(n);
      t.linkGraphicContext(c);
      t.setup();
      // 设置过程集合
      var ps = t.passes();
      var pc = ps.count();
      for(var i = 0; i < pc; i++){
         var v = ps.get(i);
         v.setFullCode(t.code() + '.' + v.code());
      }
      // 存储技术
      ts.set(n, t);
   }
   return t;
}

//==========================================================
// <T>渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dTechniquePass(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._name      = null;
   //..........................................................
   // @method
   o.name       = FG3dTechniquePass_name;
   o.drawRegion = FG3dTechniquePass_drawRegion;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FG3dTechniquePass_name(){
   return this._name;
}


//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
function FG3dTechniquePass_drawRegion(p){
   var o = this;
   var ec = RConsole.find(FG3dEffectConsole);
   var rs = p.renderables();
   var c = rs.count();
   for(var n = 0; n < c; n++){
      var r = rs.get(n);
      var en = r.effectName();
      var e = ec.findByName(o._context, en);
      o._context.setProgram(e.program());
      e.drawRenderable(p, r);
   }
}

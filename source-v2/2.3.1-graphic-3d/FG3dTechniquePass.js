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
   o._fullCode  = null;
   o._code      = null;
   o._index     = null;
   o._finish    = false;
   //..........................................................
   // @method
   o.setup       = RMethod.empty;
   o.fullCode    = FG3dTechniquePass_fullCode;
   o.setFullCode = FG3dTechniquePass_setFullCode;
   o.code        = FG3dTechniquePass_code;
   o.drawRegion  = FG3dTechniquePass_drawRegion;
   return o;
}

//==========================================================
// <T>获得全代码。</T>
//
// @method
// @return String 全代码
//==========================================================
function FG3dTechniquePass_fullCode(){
   return this._fullCode;
}

//==========================================================
// <T>设置全代码。</T>
//
// @method
// @return p:fullCode:String 全代码
//==========================================================
function FG3dTechniquePass_setFullCode(p){
   this._fullCode = p;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FG3dTechniquePass_code(){
   return this._code;
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
function FG3dTechniquePass_drawRegion(p){
   var o = this;
   var sn = p.spaceName();
   var rs = p.renderables();
   var c = rs.count();
   // 关联渲染器
   for(var i = 0; i < c; i++){
      var r = rs.get(i);
      var e = r.effects().get(sn);
      if(e == null){
         e = RConsole.find(FG3dEffectConsole).find(o._context, p, r);
         r.effects().set(sn, e);
      }
      r.setActiveEffect(e);
   }
   // 绘制处理
   for(var i = 0; i < c; i++){
      var r = rs.get(i);
      var e = r.activeEffect();
      o._context.setProgram(e.program());
      e.drawRenderable(p, r);
   }
}

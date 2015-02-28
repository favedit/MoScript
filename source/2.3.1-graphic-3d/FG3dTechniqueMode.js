//==========================================================
// <T>渲染技术模式。</T>
//
// @author maocy
// @history 150226
//==========================================================
MO.Graphic3d.FG3dTechniqueMode = function FG3dTechniqueMode(o){
   o = RClass.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code   = null;
   //..........................................................
   // @attribute
   o.code    = FG3dTechniqueMode_code;
   o.setCode = FG3dTechniqueMode_setCode;
   return o;

   //==========================================================
   // <T>获得代码。</T>
   //
   // @method
   // @return String 代码
   //==========================================================
   function FG3dTechniqueMode_code(){
      return this._code;
   }

   //==========================================================
   // <T>设置代码。</T>
   //
   // @method
   // @param p:code:String 代码
   //==========================================================
   function FG3dTechniqueMode_setCode(p){
      this._code = p;
   }
}

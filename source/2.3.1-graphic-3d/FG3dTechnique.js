//==========================================================
// <T>渲染技术。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dTechnique(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._name      = null;
   o._passes    = null;
   //..........................................................
   // @method
   o.construct  = FG3dTechnique_construct;
   o.name       = FG3dTechnique_name;
   o.drawRegion = FG3dTechnique_drawRegion;
   return o;
}

//==========================================================
// <T>设置参数。</T>
//
// @method
// @param pn:name:String 名称
// @param pv:value:Object 数据
// @param pc:count:Integer 个数
//==========================================================
function FG3dTechnique_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._passes = new TObjects();
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FG3dTechnique_name(){
   return this._name;
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param r:region:FG3dRetion 区域
//==========================================================
function FG3dTechnique_drawRegion(r){
   var o = this;
   // 绘制所有过程
   var ps = o._passes;
   var c = ps.count();
   for(var n = 0; n < c; n++){
      var p = ps.get(n);
      p.drawRegion(r);
   }
   // 显示处理
   o._context.present();
}

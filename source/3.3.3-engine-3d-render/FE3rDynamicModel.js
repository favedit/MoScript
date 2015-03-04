//==========================================================
// <T>渲染模型模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rDynamicModel(o){
   o = RClass.inherits(this, o, FE3rObject);
   //..........................................................
   // @attribute
   o._renderables      = null;
   o._meshes           = null;
   o._updateDate       = 0;
   //..........................................................
   // @method
   o.construct         = FE3rDynamicModel_construct;
   // @method
   o._renderables      = FE3rDynamicModel_renderables;
   o.meshes            = FE3rDynamicModel_meshes;
   o.pushRenderable    = FE3rDynamicModel_pushRenderable;
   o.build             = FE3rDynamicModel_build;
   o.update            = FE3rDynamicModel_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rDynamicModel_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._renderables = new TObjects();
   o._meshes = new TObjects();
}

//==========================================================
// <T>根据渲染集合。</T>
//
// @method
// @return TObjects 渲染集合
//==========================================================
function FE3rDynamicModel_renderables(){
   return this._renderables;
}

//==========================================================
// <T>获得网格集合。</T>
//
// @method
// @return TObjects 网格集合
//==========================================================
function FE3rDynamicModel_meshes(){
   return this._meshes;
}

//==========================================================
// <T>增加一个渲染对象。</T>
//
// @method
//==========================================================
function FE3rDynamicModel_pushRenderable(p){
   this._renderables.push(p);
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
function FE3rDynamicModel_build(){
   var o = this;
   var rs = o._renderables;
   var ms = o._meshes;
   // 生成渲染对象
   var rc = rs.count();
   var mr = null;
   for(var i = 0; i < rc; i++){
      var r = rs.getAt(i);
      if(!mr){
         mr = RClass.create(FE3rDynamicMesh);
         mr.linkGraphicContext(o);
         ms.push(mr);
      }
      if(mr.mergeRenderable(r)){
         continue;
      }else{
         mr = RClass.create(FE3rDynamicMesh);
         mr.linkGraphicContext(o);
         ms.push(mr);
         if(!mr.mergeRenderable(r)){
            throw new TError(o, 'Merge renderable failure.');
         }
      }
   }
   // 生成渲染对象
   var mc = ms.count();
   for(var i = 0; i < mc; i++){
      ms.getAt(i).build();
   }
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
function FE3rDynamicModel_update(p){
   var o = this;
   o._updateDate = RTimer.current();
}

//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneDisplay(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute 属性
   o._code                = null;
   // @attribute 配置
   o._optionMergeVertex   = null;
   o._optionMergeMaterial = null;
   // @attribute 矩阵
   o._matrix              = null;
   // @attribute 集合
   o._movies              = null;
   o._materials           = null;
   o._renderables         = null;
   //..........................................................
   // @method
   o.construct            = FRs3SceneDisplay_construct;
   o.code                 = FRs3SceneDisplay_code;
   o.matrix               = FRs3SceneDisplay_matrix;
   o.movies               = FRs3SceneDisplay_movies;
   o.materials            = FRs3SceneDisplay_materials;
   o.renderables          = FRs3SceneDisplay_renderables;
   o.unserialize          = FRs3SceneDisplay_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3SceneDisplay_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._matrix = new SMatrix3d();
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FRs3SceneDisplay_code(){
   return this._code;
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FRs3SceneDisplay_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TObjects 动画集合
//==========================================================
function FRs3SceneDisplay_movies(){
   return this._movies;
}

//==========================================================
// <T>获得材质集合。</T>
//
// @method
// @return TObjects 材质集合
//==========================================================
function FRs3SceneDisplay_materials(){
   return this._materials;
}

//==========================================================
// <T>获得渲染集合。</T>
//
// @method
// @return TObjects 渲染集合
//==========================================================
function FRs3SceneDisplay_renderables(){
   return this._renderables;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneDisplay_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   // 读取配置
   //o._optionMergeVertex = p.readBoolean();
   //o._optionMergeMaterial = p.readBoolean();
   // 读取矩阵
   o._matrix.unserialize(p);
   // 读取动画集合
   //var c = p.readUint16();
   //if(c > 0){
   //   var ms = o._movies = new TObjects();
   //   for(var i = 0; i < c; i++){
   //      var m = RClass.create(FRs3SceneMovie);
   //      m.unserialize(p);
   //      ms.push(m);
   //   }
   //}
   // 读取材质集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3SceneMaterial);
         m.unserialize(p);
         s.push(m);
      }
   }
   // 读取动画集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = RClass.create(FRs3TemplateRenderable);
         r.unserialize(p);
         s.push(r);
      }
   }
}

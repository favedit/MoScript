//==========================================================
// <T>渲染体。</T>
//
// @author maocy
// @history 150207
//==========================================================
function FE3dRenderable(o){
   o = RClass.inherits(this, o, FRenderable, MG3dRenderable, MGraphicObject);
   //..........................................................
   // @attribute
   o._display         = null;
   // @attribute
   o._outline         = null;
   o._outlineVisible  = true;
   o._calculateMatrix = null;
   o._vertexCount     = 0;
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._textures        = null;
   //..........................................................
   // @method
   o.construct        = FE3dRenderable_construct;
   // @method
   o.createMaterial   = FE3dRenderable_createMaterial;
   // @method
   o.setup            = RMethod.empty;
   // @method
   o.testReady        = RMethod.emptyTrue;
   o.testVisible      = FE3dRenderable_testVisible;
   o.display          = FE3dRenderable_display;
   o.setDisplay       = FE3dRenderable_setDisplay;
   o.vertexCount      = FE3dRenderable_vertexCount;
   o.findVertexBuffer = FE3dRenderable_findVertexBuffer;
   o.vertexBuffers    = FE3dRenderable_vertexBuffers;
   o.indexBuffer      = FE3dRenderable_indexBuffer;
   o.findTexture      = FE3dRenderable_findTexture;
   o.pushTexture      = FE3dRenderable_pushTexture;
   o.textures         = FE3dRenderable_textures;
   o.bones            = RMethod.empty;
   // @method
   o.processDelay     = RMethod.empty;
   o.update           = FE3dRenderable_update;
   o.remove           = FE3dRenderable_remove;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dRenderable_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o.__base.MG3dRenderable.construct.call(o);
   // 构造变量
   o._outline = new SOutline3d();
   o._calculateMatrix = new SMatrix3d();
   o._vertexBuffers = new TDictionary();
}

//==========================================================
// <T>创建材质。</T>
//
// @method
// @return FG3dMaterial 材质
//==========================================================
function FE3dRenderable_createMaterial(){
   return RClass.create(FE3dMaterial);
}

//==========================================================
// <T>测试可见性。</T>
//
// @method
// @return Boolean 可见性
//==========================================================
function FE3dRenderable_testVisible(){
   var o = this;
   // 测试准备好
   var ready = o.testReady();
   if(!ready){
      return false;
   }
   // 测试可见性
   var visible = o.__base.FRenderable.testVisible.call(o);
   if(!visible){
      return false;
   }
   // 测试轮廓可见
   if(!o._outlineVisible){
      return false;
   }
   // 测试模式时候，可见性依赖材质
   if(RRuntime.isDebug()){
      var material = o.material();
      if(!material.testVisible()){
         return false;
      }
   }
   return true;
}

//==========================================================
// <T>获得显示对象。</T>
//
// @method
// @return FDisplay 显示对象
//==========================================================
function FE3dRenderable_display(){
   return this._display;
}

//==========================================================
// <T>设置显示对象。</T>
//
// @method
// @param p:display:FDisplay 显示对象
//==========================================================
function FE3dRenderable_setDisplay(p){
   this._display = p;
}

//==========================================================
// <T>获得顶点个数。</T>
//
// @method
// @return Integer 顶点个数
//==========================================================
function FE3dRenderable_vertexCount(){
   return this._vertexCount;
}

//==========================================================
// <T>根据代码查找顶点缓冲。</T>
//
// @method
// @param p:code:String 代码
// @return FG3dVertexBuffer 顶点缓冲
//==========================================================
function FE3dRenderable_findVertexBuffer(p){
   return this._vertexBuffers.get(p);
}

//==========================================================
// <T>获得顶点缓冲集合。</T>
//
// @method
// @return TObjects 顶点缓冲集合
//==========================================================
function FE3dRenderable_vertexBuffers(){
   return this._vertexBuffers;
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FE3dRenderable_indexBuffer(){
   return this._indexBuffer;
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
function FE3dRenderable_findTexture(p){
   return this._textures.get(p);
}

//==========================================================
// <T>增加一个纹理。</T>
//
// @method
// @param p:texture:FG3dTexture 纹理
//==========================================================
function FE3dRenderable_pushTexture(p){
   var o = this;
   var s = o._textures;
   if(!s){
      s = o._textures = new TDictionary();
   }
   s.set(p._name, p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FE3dRenderable_textures(){
   return this._textures;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
function FE3dRenderable_update(p){
   var o = this;
   // 计算矩阵
   var m = o._calculateMatrix;
   m.assign(o._matrix);
   // 计算显示矩阵
   var d = o._drawable;
   if(d){
      m.append(d.currentMatrix());
   }
   // 计算显示矩阵
   var d = o._display;
   if(d){
      m.append(d.currentMatrix());
   }
   // 接收数据
   var c = o._currentMatrix.attachData(m.data());
   if(c && p){
      p.change();
   }
}

//==========================================================
// <T>移除处理。</T>
//
// @method
//==========================================================
function FE3dRenderable_remove(){
   var o = this;
   var d = o._display;
   if(d){
      d.removeRenderable(o);
      o._display = null;
   }
}

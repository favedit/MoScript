//==========================================================
// <T>资源模型管理器。</T>
// <P>http://{server}:{port}/cloud.content.model.wv?code={code}&version={version}</P>
//
// @author maocy
// @history 150128
//==========================================================
function FE3sModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._models           = null;
   o._meshs            = null;
   o._skeletons        = null;
   o._animations       = null;
   //..........................................................
   // @method
   o.construct         = FE3sModelConsole_construct;
   // @method
   o.findModel         = FE3sModelConsole_findModel;
   o.models            = FE3sModelConsole_models;
   o.findMesh          = FE3sModelConsole_findMesh;
   o.meshs             = FE3sModelConsole_meshs;
   o.findSkeleton      = FE3sModelConsole_findSkeleton;
   o.skeletons         = FE3sModelConsole_skeletons;
   o.findAnimation     = FE3sModelConsole_findAnimation;
   o.animations        = FE3sModelConsole_animations;
   // @method
   o.unserialMesh      = FE3sModelConsole_unserialMesh;
   o.unserialSkeleton  = FE3sModelConsole_unserialSkeleton;
   o.unserialAnimation = FE3sModelConsole_unserialAnimation;
   o.load              = FE3sModelConsole_load;
   // @method
   o.dispose           = FE3sModelConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置变量
   o._models = new TDictionary();
   o._meshs = new TDictionary();
   o._skeletons = new TDictionary();
   o._animations = new TDictionary();
   // 注册资源类型
   var rc = RConsole.find(FResourceConsole);

   var rp = RClass.create(FResourcePipeline);

   var rt = RClass.create(FResourceType);
   rt.setCode('resource3d.model');
   rt._pipeline = rp;

   rc.registerType(rt);
   //rc.factory().register('resource3d.model', FE3sModel);
}

//==========================================================
// <T>根据唯一编号查找模型。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sModel 模型
//==========================================================
function FE3sModelConsole_findModel(p){
   return this._models.get(p);
}

//==========================================================
// <T>获得模型字典。</T>
//
// @method
// @return TDictionary 模型字典
//==========================================================
function FE3sModelConsole_models(){
   return this._models;
}

//==========================================================
// <T>根据唯一编号查找网格。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sMesh 网格
//==========================================================
function FE3sModelConsole_findMesh(p){
   return this._meshs.get(p);
}

//==========================================================
// <T>获得网格字典。</T>
//
// @method
// @return TDictionary 网格字典
//==========================================================
function FE3sModelConsole_meshs(){
   return this._meshs;
}

//==========================================================
// <T>根据唯一编号查找骨骼。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sSkeleton 骨骼
//==========================================================
function FE3sModelConsole_findSkeleton(p){
   return this._skeletons.get(p);
}

//==========================================================
// <T>获得骨骼字典。</T>
//
// @method
// @return TDictionary 骨骼字典
//==========================================================
function FE3sModelConsole_skeletons(){
   return this._skeletons;
}

//==========================================================
// <T>根据唯一编号查找动画。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sAnimation 动画
//==========================================================
function FE3sModelConsole_findAnimation(p){
   return this._animations.get(p);
}

//==========================================================
// <T>获得动画字典。</T>
//
// @method
// @return TDictionary 动画字典
//==========================================================
function FE3sModelConsole_animations(){
   return this._animations;
}

//==========================================================
// <T>反序列化网格。</T>
//
// @method
// @param p:input:FByteStream 数据流
// @return FE3sMesh 网格
//==========================================================
function FE3sModelConsole_unserialMesh(p){
   var o = this;
   var r = RClass.create(FE3sModelMesh);
   r.unserialize(p);
   o._meshs.set(r.guid(), r);
   return r;
}

//==========================================================
// <T>反序列化骨骼。</T>
//
// @method
// @param p:input:FByteStream 数据流
// @return FE3sSkeleton 骨骼
//==========================================================
function FE3sModelConsole_unserialSkeleton(p){
   var o = this;
   var r = RClass.create(FE3sSkeleton);
   r.unserialize(p);
   o._skeletons.set(r.guid(), r);
   return r;
}

//==========================================================
// <T>反序列化动画。</T>
//
// @method
// @param m:model:FEs3Model 模型
// @param p:input:FByteStream 数据流
// @return FE3sAnimation 动画
//==========================================================
function FE3sModelConsole_unserialAnimation(m, p){
   var o = this;
   var r = RClass.create(FE3sAnimation);
   r._model = m;
   r.unserialize(p);
   o._animations.set(r.guid(), r);
   return r;
}

//==========================================================
// <T>加载指定代码的模型资源。</T>
//
// @param pg:guid:String 唯一编号
// @return 处理结果
//==========================================================
function FE3sModelConsole_load(p){
   var o = this;
   var s = o._models;
   var r = s.get(p);
   if(r){
      return r;
   }
   // 生成地址
   var v = RConsole.find(FE3sVendorConsole).find('model');
   v.set('guid', p);
   var u = v.makeUrl();
   // 创建模型资源
   r = RClass.create(FE3sModel);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   // 存储模型
   s.set(p, r);
   return r;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3sModelConsole_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}

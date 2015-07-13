//==========================================================
// <T>资源模型管理器。</T>
// <P>http://{server}:{port}/cloud.content.model.wv?code={code}&version={version}</P>
//
// @author maocy
// @history 150128
//==========================================================
MO.FE3sModelConsole = function FE3sModelConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._models           = MO.Class.register(o, new MO.AGetter('_models'));
   o._meshs            = MO.Class.register(o, new MO.AGetter('_meshs'));
   o._skeletons        = MO.Class.register(o, new MO.AGetter('_skeletons'));
   o._animations       = MO.Class.register(o, new MO.AGetter('_animations'));
   //..........................................................
   // @method
   o.construct         = MO.FE3sModelConsole_construct;
   // @method
   o.findModel         = MO.FE3sModelConsole_findModel;
   o.findMesh          = MO.FE3sModelConsole_findMesh;
   o.findSkeleton      = MO.FE3sModelConsole_findSkeleton;
   o.findAnimation     = MO.FE3sModelConsole_findAnimation;
   // @method
   o.unserialMesh      = MO.FE3sModelConsole_unserialMesh;
   o.unserialSkeleton  = MO.FE3sModelConsole_unserialSkeleton;
   o.unserialAnimation = MO.FE3sModelConsole_unserialAnimation;
   o.load              = MO.FE3sModelConsole_load;
   // @method
   o.dispose           = MO.FE3sModelConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sModelConsole_construct = function FE3sModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置变量
   o._models = new MO.TDictionary();
   o._meshs = new MO.TDictionary();
   o._skeletons = new MO.TDictionary();
   o._animations = new MO.TDictionary();
   // 注册资源类型
   var rc = MO.Console.find(MO.FResourceConsole);
   var rp = MO.Class.create(MO.FResourcePipeline);
   var rt = MO.Class.create(MO.FResourceType);
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
MO.FE3sModelConsole_findModel = function FE3sModelConsole_findModel(p){
   return this._models.get(p);
}

//==========================================================
// <T>根据唯一编号查找网格。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sMesh 网格
//==========================================================
MO.FE3sModelConsole_findMesh = function FE3sModelConsole_findMesh(p){
   return this._meshs.get(p);
}

//==========================================================
// <T>根据唯一编号查找骨骼。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sSkeleton 骨骼
//==========================================================
MO.FE3sModelConsole_findSkeleton = function FE3sModelConsole_findSkeleton(p){
   return this._skeletons.get(p);
}

//==========================================================
// <T>根据唯一编号查找动画。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sAnimation 动画
//==========================================================
MO.FE3sModelConsole_findAnimation = function FE3sModelConsole_findAnimation(p){
   return this._animations.get(p);
}

//==========================================================
// <T>反序列化网格。</T>
//
// @method
// @param p:input:FByteStream 数据流
// @return FE3sMesh 网格
//==========================================================
MO.FE3sModelConsole_unserialMesh = function FE3sModelConsole_unserialMesh(p){
   var o = this;
   var r = MO.Class.create(MO.FE3sModelMesh);
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
MO.FE3sModelConsole_unserialSkeleton = function FE3sModelConsole_unserialSkeleton(p){
   var o = this;
   var r = MO.Class.create(MO.FE3sSkeleton);
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
MO.FE3sModelConsole_unserialAnimation = function FE3sModelConsole_unserialAnimation(m, p){
   var o = this;
   var r = MO.Class.create(MO.FE3sAnimation);
   r._model = m;
   r.unserialize(p);
   o._animations.set(r.guid(), r);
   return r;
}

//==========================================================
// <T>加载指定代码的模型资源。</T>
//
// @param guid:String 唯一编号
// @return 处理结果
//==========================================================
MO.FE3sModelConsole_load = function FE3sModelConsole_load(guid){
   var o = this;
   var models = o._models;
   // 查找模型
   var model = models.get(guid);
   if(model){
      return model;
   }
   // 生成地址
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('model');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   // 创建模型资源
   model = MO.Class.create(MO.FE3sModel);
   model.setGuid(guid);
   model.setVendor(vendor);
   model.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(model);
   // 存储模型
   models.set(guid, model);
   return model;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sModelConsole_dispose = function FE3sModelConsole_dispose(){
   var o = this;
   o._materials = MO.Lang.Object.free(o._materials);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}

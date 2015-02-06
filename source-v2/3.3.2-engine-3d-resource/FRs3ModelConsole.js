//==========================================================
// <T>资源模型管理器。</T>
// <P>http://{server}:{port}/cloud.content.model.wv?code={code}&version={version}</P>
//
// @author maocy
// @history 150128
//==========================================================
function FRs3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._models          = null;
   o._meshs           = null;
   o._skeletons       = null;
   // @attribute
   o._dataUrl         = '/cloud.content.model.wv'
   //..........................................................
   // @method
   o.construct        = FRs3ModelConsole_construct;
   // @method
   o.findModel        = FRs3ModelConsole_findModel;
   o.models           = FRs3ModelConsole_models;
   o.findMesh         = FRs3ModelConsole_findMesh;
   o.meshs            = FRs3ModelConsole_meshs;
   o.findSkeleton     = FRs3ModelConsole_findSkeleton;
   o.skeletons        = FRs3ModelConsole_skeletons;
   // @method
   o.unserialMesh     = FRs3ModelConsole_unserialMesh;
   o.unserialSkeleton = FRs3ModelConsole_unserialSkeleton;
   o.load             = FRs3ModelConsole_load;
   // @method
   o.dispose          = FRs3ModelConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3ModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
   o._meshs = new TDictionary();
   o._skeletons = new TDictionary();
}

//==========================================================
// <T>根据唯一编号查找模型。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FRs3Model 模型
//==========================================================
function FRs3ModelConsole_findModel(p){
   return this._models.get(p);
}

//==========================================================
// <T>获得模型字典。</T>
//
// @method
// @return TDictionary 模型字典
//==========================================================
function FRs3ModelConsole_models(){
   return this._models;
}

//==========================================================
// <T>根据唯一编号查找网格。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FRs3Mesh 网格
//==========================================================
function FRs3ModelConsole_findMesh(p){
   return this._meshs.get(p);
}

//==========================================================
// <T>获得网格字典。</T>
//
// @method
// @return TDictionary 网格字典
//==========================================================
function FRs3ModelConsole_meshs(){
   return this._meshs;
}

//==========================================================
// <T>根据唯一编号查找骨骼。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FRs3Skeleton 骨骼
//==========================================================
function FRs3ModelConsole_findSkeleton(p){
   return this._skeletons.get(p);
}

//==========================================================
// <T>获得骨骼字典。</T>
//
// @method
// @return TDictionary 骨骼字典
//==========================================================
function FRs3ModelConsole_skeletons(){
   return this._skeletons;
}

//==========================================================
// <T>反序列化网格。</T>
//
// @method
// @param p:input:FByteStream 数据流
// @return FRs3Mesh 网格
//==========================================================
function FRs3ModelConsole_unserialMesh(p){
   var o = this;
   var m = RClass.create(FRs3Mesh);
   m.unserialize(p);
   o._meshs.set(m.guid(), m);
   return m;
}

//==========================================================
// <T>反序列化骨骼。</T>
//
// @method
// @param p:input:FByteStream 数据流
// @return FRs3Skeleton 骨骼
//==========================================================
function FRs3ModelConsole_unserialSkeleton(p){
   var o = this;
   var k = RClass.create(FRs3Skeleton);
   k.unserialize(p);
   o._skeletons.set(k.guid(), k);
   return k;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param c:code:String 代码
// @param v:version:String 版本
// @return 处理结果
//==========================================================
function FRs3ModelConsole_load(c, v){
   var o = this;
   var ms = o._models;
   var m = ms.get(c);
   if(m == null){
      // 生成地址
      var u = RBrowser.hostPath(o._dataUrl + '?code=' + c + '&version=' + RString.nvl(v) + '&date=' + RDate.format());
      // 创建模型
      m = RClass.create(FRs3Model);
      m.load(u);
      ms.set(c, m);
   }
   return m;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FRs3ModelConsole_dispose(){
   var o = this;
   o._materials = null;
   // 父处理
   o.__base.FDisplay.dispose.call(o);
}

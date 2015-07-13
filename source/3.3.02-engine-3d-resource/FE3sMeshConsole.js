//==========================================================
// <T>资源网格管理器。</T>
//
// @class
// @author maocy
// @history 150325
//==========================================================
MO.FE3sMeshConsole = function FE3sMeshConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._venderCode = 'mesh';
   o._serviceUrl = '/cloud.content.mesh.ws'
   o._dataUrl    = '/cloud.content.mesh.wv'
   // @attribute
   o._meshs      = MO.Class.register(o, new MO.AGetter('_meshs'));
   //..........................................................
   // @method
   o.construct   = MO.FE3sMeshConsole_construct;
   // @method
   o.find        = MO.FE3sMeshConsole_find;
   // @method
   o.loadByGuid  = MO.FE3sMeshConsole_loadByGuid;
   o.loadByCode  = MO.FE3sMeshConsole_loadByCode;
   // @method
   o.dispose     = MO.FE3sMeshConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sMeshConsole_construct = function FE3sMeshConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置变量
   o._meshs = new MO.TDictionary();
}

//==========================================================
// <T>根据唯一编号查找网格。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sMesh 网格
//==========================================================
MO.FE3sMeshConsole_find = function FE3sMeshConsole_find(p){
   return this._meshs.get(p);
}

//==========================================================
// <T>根据唯一编号加载网格资源。</T>
//
// @param p:guid:String 唯一编号
// @return 网格资源
//==========================================================
MO.FE3sMeshConsole_loadByGuid = function FE3sMeshConsole_loadByGuid(p){
   var o = this;
   var s = o._meshs;
   var r = s.get(p);
   if(r){
      return r;
   }
   // 生成地址
   var v = MO.Console.find(MO.FE3sVendorConsole).find(o._venderCode);
   v.set('guid', p);
   var u = v.makeUrl();
   // 创建模型资源
   r = MO.Class.create(MO.FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   MO.Console.find(MO.FResourceConsole).load(r);
   // 存储模型
   s.set(p, r);
   return r;
}

//==========================================================
// <T>根据代码加载网格资源。</T>
//
// @param p:guid:String 唯一编号
// @return 网格资源
//==========================================================
MO.FE3sMeshConsole_loadByCode = function FE3sMeshConsole_loadByCode(p){
   var o = this;
   var s = o._meshs;
   var r = s.get(p);
   if(r){
      return r;
   }
   // 生成地址
   var v = MO.Console.find(MO.FE3sVendorConsole).find(o._venderCode);
   v.set('code', p);
   var u = v.makeUrl();
   // 创建模型资源
   r = MO.Class.create(MO.FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   MO.Console.find(MO.FResourceConsole).load(r);
   // 存储模型
   s.set(p, r);
   return r;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sMeshConsole_dispose = function FE3sMeshConsole_dispose(){
   var o = this;
   o._meshs = MO.Lang.Object.free(o._meshs);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}

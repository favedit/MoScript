//==========================================================
// <T>资源网格管理器。</T>
//
// @class
// @author maocy
// @history 150325
//==========================================================
function FE3sMeshConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._venderCode = 'mesh';
   o._serviceUrl = '/cloud.content.mesh.ws'
   o._dataUrl    = '/cloud.content.mesh.wv'
   // @attribute
   o._meshs      = null;
   //..........................................................
   // @method
   o.construct   = FE3sMeshConsole_construct;
   // @method
   o.find        = FE3sMeshConsole_find;
   o.meshs       = FE3sMeshConsole_meshs;
   // @method
   o.loadByGuid  = FE3sMeshConsole_loadByGuid;
   o.loadByCode  = FE3sMeshConsole_loadByCode;
   o.update      = FE3sMeshConsole_update;
   // @method
   o.dispose     = FE3sMeshConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sMeshConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置变量
   o._meshs = new TDictionary();
}

//==========================================================
// <T>根据唯一编号查找网格。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3sMesh 网格
//==========================================================
function FE3sMeshConsole_find(p){
   return this._meshs.get(p);
}

//==========================================================
// <T>获得网格字典。</T>
//
// @method
// @return TDictionary 网格字典
//==========================================================
function FE3sMeshConsole_meshs(){
   return this._meshs;
}

//==========================================================
// <T>根据唯一编号加载网格资源。</T>
//
// @param p:guid:String 唯一编号
// @return 网格资源
//==========================================================
function FE3sMeshConsole_loadByGuid(p){
   var o = this;
   var s = o._meshs;
   var r = s.get(p);
   if(r){
      return r;
   }
   // 生成地址
   var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
   v.set('guid', p);
   var u = v.makeUrl();
   // 创建模型资源
   r = RClass.create(FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
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
function FE3sMeshConsole_loadByCode(p){
   var o = this;
   var s = o._meshs;
   var r = s.get(p);
   if(r){
      return r;
   }
   // 生成地址
   var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
   v.set('code', p);
   var u = v.makeUrl();
   // 创建模型资源
   r = RClass.create(FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   // 存储模型
   s.set(p, r);
   return r;
}

//==========================================================
// <T>更新处理。</T>
//
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sMeshConsole_update(p){
   var o = this;
   // 生成地址
   var u = RBrowser.hostPath(o._serviceUrl + '?action=update&date=' + RDate.format());
   // 发送数据
   var xc = RConsole.find(FXmlConsole);
   var r = xc.send(u, p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3sMeshConsole_dispose(){
   var o = this;
   o._meshs = RObject.free(o._meshs);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}

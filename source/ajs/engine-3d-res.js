function FRs3Geometry(o){
   o = RClass.inherits(this, o, FObject);
   o._optionInstanced = false;
   o._instanceCount   = 0;
   o._materialCode    = null;
   o._vertexCount     = 0;
   o._indexCount      = 0;
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._boneIds         = null;
   o._track           = null;
   o.construct        = FRs3Geometry_construct;
   o.findVertexBuffer = FRs3Geometry_findVertexBuffer;
   o.vertexBuffers    = FRs3Geometry_vertexBuffers;
   o.indexBuffer      = FRs3Geometry_indexBuffer;
   o.unserialize      = FRs3Geometry_unserialize;
   return o;
}
function FRs3Geometry_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRs3Geometry_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
}
function FRs3Geometry_vertexBuffers(){
   return this._vertexBuffers;
}
function FRs3Geometry_indexBuffer(){
   return this._indexBuffer;
}
function FRs3Geometry_unserialize(p){
   var o = this;
   o._optionInstanced = p.readBoolean();
   o._instanceCount = p.readInt8();
   o._materialCode = p.readString();
   o._vertexCount = p.readInt32();
   var vc = p.readInt8();
   for(var n = 0; n < vc; n++){
      var vb = RClass.create(FRs3VertexBuffer);
      vb._vertexCount = o._vertexCount;
      vb.unserialize(p)
      o._vertexBuffers.push(vb);
   }
   var ib = o._indexBuffer = RClass.create(FRs3IndexBuffer);
   ib.unserialize(p);
}
function FRs3IndexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   o._geometry    = null;
   o._count       = null;
   o._strideCd    = EG3dIndexStride.Unknown;
   o._memory      = null;
   o._data        = null;
   o.count        = FRs3IndexBuffer_count;
   o.strideCd     = FRs3IndexBuffer_strideCd;
   o.memory       = FRs3IndexBuffer_memory;
   o.data         = FRs3IndexBuffer_data;
   o.unserialize  = FRs3IndexBuffer_unserialize;
   return o;
}
function FRs3IndexBuffer_count(){
   return this._count;
}
function FRs3IndexBuffer_strideCd(){
   return this._strideCd;
}
function FRs3IndexBuffer_memory(){
   return this._memory;
}
function FRs3IndexBuffer_data(){
   return this._data;
}
function FRs3IndexBuffer_unserialize(p){
   var o = this;
   var c = o._count = p.readInt32();
   var sc = o._strideCd = p.readInt8();
   if(sc == EG3dIndexStride.Uint16){
      o._memory = new ArrayBuffer(2 * c);
      var d = o._data = new Uint16Array(o._memory);
      for(var i = 0; i < c; i++){
         d[i] = p.readUint16();
      }
   }else if(sc == EG3dIndexStride.Uint16){
      o._memory = new ArrayBuffer(4 * c);
      var d = o._data = new Uint16Array(o._memory);
      for(var i = 0; i < c; i++){
         d[i] = p.readUint32();
      }
   }else{
      throw new TError('Unknown stride type. (stride_cd={1})', sc);
   }
}
function FRs3Material(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   o.construct   = FRs3Material_construct;
   o.geometrys   = FRs3Material_geometrys;
   o.unserialize = FRs3Material_unserialize;
   return o;
}
function FRs3Material_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._geometrys = new TObjects();
}
function FRs3Material_geometrys(){
   return this._geometrys;
}
function FRs3Material_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var gc = p.readInt16();
   for(var n = 0; n < gc; n++){
      var g = RClass.create(FRs3Geometry);
      g.unserialize(p);
      o._geometrys.push(g);
   }
}
function FRs3MaterialTexture(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._name       = null;
   o._skeleton   = null;
   o._animation  = null;
   o.construct   = FRs3MaterialTexture_construct;
   o.geometrys   = FRs3MaterialTexture_geometrys;
   o.unserialize = FRs3MaterialTexture_unserialize;
   return o;
}
function FRs3MaterialTexture_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._geometrys = new TObjects();
}
function FRs3MaterialTexture_geometrys(){
   return this._geometrys;
}
function FRs3MaterialTexture_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var gc = p.readInt16();
   for(var n = 0; n < gc; n++){
      var g = RClass.create(FRs3Geometry);
      g.unserialize(p);
      o._geometrys.push(g);
   }
}
function FRs3Model(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   o.construct   = FRs3Model_construct;
   o.geometrys   = FRs3Model_geometrys;
   o.unserialize = FRs3Model_unserialize;
   return o;
}
function FRs3Model_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._geometrys = new TObjects();
}
function FRs3Model_geometrys(){
   return this._geometrys;
}
function FRs3Model_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var gc = p.readInt16();
   for(var n = 0; n < gc; n++){
      var g = RClass.create(FRs3Geometry);
      g.unserialize(p);
      o._geometrys.push(g);
   }
}
function FRs3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._models   = null;
   o.construct = FRs3ModelConsole_construct;
   o.load      = FRs3ModelConsole_load;
   return o;
}
function FRs3ModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
}
function FRs3ModelConsole_load(p){
   var o = this;
}
function FRs3Resource(o){
   o = RClass.inherits(this, o, FResource);
   o._contentLength = 0;
   o.unserialize    = FRs3Resource_unserialize;
   return o;
}
function FRs3Resource_unserialize(p){
   this._name = p.readString();
}
function FRs3Scene(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   o.construct   = FRs3Scene_construct;
   o.geometrys   = FRs3Scene_geometrys;
   o.unserialize = FRs3Scene_unserialize;
   return o;
}
function FRs3Scene_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._geometrys = new TObjects();
}
function FRs3Scene_geometrys(){
   return this._geometrys;
}
function FRs3Scene_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var gc = p.readInt16();
   for(var n = 0; n < gc; n++){
      var g = RClass.create(FRs3Geometry);
      g.unserialize(p);
      o._geometrys.push(g);
   }
}
function FRs3Template(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   o.construct   = FRs3Template_construct;
   o.geometrys   = FRs3Template_geometrys;
   o.unserialize = FRs3Template_unserialize;
   return o;
}
function FRs3Template_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._geometrys = new TObjects();
}
function FRs3Template_geometrys(){
   return this._geometrys;
}
function FRs3Template_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var gc = p.readInt16();
   for(var n = 0; n < gc; n++){
      var g = RClass.create(FRs3Geometry);
      g.unserialize(p);
      o._geometrys.push(g);
   }
}
function FRs3Theme(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._materials  = null;
   o.onLoad      = FRs3Theme_onLoad;
   o.load        = FRs3Theme_load;
   o.unserialize = FRs3Theme_unserialize;
   return o;
}
function FRs3Theme_onLoad(p){
   p = asdf;
}
function FRs3Theme_unserialize(p){
   this._name = p.readString();
   var hc = RClass.create(FHttpConnection);
   hc._asynchronous = true;
   hc.lsnsLoad.register(o, o.onDataLoad);
   hc.send(u);
}
function FRs3Theme_load(u){
   var hc = RClass.create(FHttpConnection);
   hc._asynchronous = true;
   hc.lsnsLoad.register(o, o.onDataLoad);
   hc.send(u);
}
function FRs3ThemeConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._themes   = null;
   o._path     = '/assets/theme/'
   o.construct = FRs3ThemeConsole_construct;
   o.load      = FRs3ThemeConsole_load;
   return o;
}
function FRs3ThemeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FRs3ThemeConsole_load(p){
   var o = this;
   var m = o._themes.get(p);
   if(m == null){
      var u = RBrowser.contextPath() + o._path + p + '.ser';
      alert(u);
      m = RClass.create(FRs3Theme);
      m.load(u);
      o._themes.set(p, m);
   }
   return m;
}
function FRs3VertexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   o._geometry    = null;
   o._name        = null;
   o._formatCd    = EG3dAttributeFormat.Unknown;
   o._vertexCount = 0;
   o._stride      = 0;
   o._data        = null;
   o.name         = FRs3VertexBuffer_name;
   o.formatCd     = FRs3VertexBuffer_formatCd;
   o.unserialize  = FRs3VertexBuffer_unserialize;
   o.dispose      = FRs3VertexBuffer_dispose;
   return o;
}
function FRs3VertexBuffer_name(){
   return this._name;
}
function FRs3VertexBuffer_formatCd(){
   return this._formatCd;
}
function FRs3VertexBuffer_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._formatCd = p.readInt8();
   o._stride = p.readInt8();
   var c = o._vertexCount;
   var t = o._stride * c;
   o._data = new ArrayBuffer(t);
   p.readBytes(o._data, 0, t);
}
function FRs3VertexBuffer_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
   o._geometry = null;
   o._name = null;
   o._formatCd = null;
   o._vertexCount = null;
   o._stride = null;
   o._data = null;
}

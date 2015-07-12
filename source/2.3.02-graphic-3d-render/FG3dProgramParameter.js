//==========================================================
// <T>渲染程序参数。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dProgramParameter = function FG3dProgramParameter(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute 名称
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   // @attribute 关联名称
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   // @attribute 格式
   o._formatCd   = MO.EG3dParameterFormat.Unknown;
   // @attribute 关联名称
   o._define     = MO.Class.register(o, new MO.AGetter('_define'));
   // @attribute 使用标志
   o._statusUsed = false;
   // @attribute 插槽
   o._slot       = null;
   // @attribute 大小
   o._size       = 0;
   // @attribute 缓冲
   o._buffer     = null;
   // @attribute 内存
   o._memory     = null;
   //..........................................................
   // @method
   o.attachData  = MO.FG3dProgramParameter_attachData;
   o.loadConfig  = MO.FG3dProgramParameter_loadConfig;
   // @method
   o.dispose     = MO.FG3dProgramParameter_dispose;
   return o;
}

//==========================================================
// <T>接收数据，返回是否发生变更。</T>
//
// @method
// @param value:Object 数据
// @return Boolean 是否变更
//==========================================================
MO.FG3dProgramParameter_attachData = function FG3dProgramParameter_attachData(value){
   var o = this;
   var result = false;
   // 检查参数类型
   var clazz = value.constructor;
   if(clazz == MO.SMatrix3d){
      // 矩阵数据
      var memory = o._memory;
      if(!memory){
         memory = o._memory = new Float32Array(16);
      }
      result = MO.Lang.Float.attach(memory, value._data, 16);
   }else if(clazz == Float32Array){
      // 浮点数据
      var length = value.length;
      var memory = o._memory;
      if(!memory){
         memory = o._memory = new Float32Array(length);
      }
      result = MO.Lang.Float.attach(memory, value, length);
   }else{
      throw new MO.TError(o, 'Unknown data type.');
   }
   return result;
}

//==========================================================
// <T>从配置节点钟加载信息。</T>
//
// @method
// @param xconfig:TNode 配置节点
//==========================================================
MO.FG3dProgramParameter_loadConfig = function FG3dProgramParameter_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._formatCd = MO.Lang.Enum.encode(MO.EG3dParameterFormat, xconfig.get('format'));
   o._define = xconfig.get('define');
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FG3dProgramParameter_dispose = function FG3dProgramParameter_dispose(){
   var o = this;
   o._slot = null;
   o._memory = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}

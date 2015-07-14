//==========================================================
// <T>渲染材质控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
MO.FE3rMaterialConsole = function FE3rMaterialConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd   = MO.EScope.Local;
   // @attribute
   o._materials = null;
   //..........................................................
   // @method
   o.construct  = MO.FE3rMaterialConsole_construct;
   // @method
   o.load       = MO.FE3rMaterialConsole_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rMaterialConsole_construct = function FE3rMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._materials = new MO.TDictionary();
}

//==========================================================
// <T>加载一个渲染模型。</T>
//
// @method
// @param context:FG3dContext 环境
// @param guid:String 唯一编号
// @return FRenderModel 渲染模型
//==========================================================
MO.FE3rMaterialConsole_load = function FE3rMaterialConsole_load(context, guid){
   var o = this;
   // 检查参数
   if(!context){
      throw new MO.TError('Graphics context is empty');
   }
   if(!guid){
      throw new MO.TError('Material guid is empty');
   }
   // 查找材质
   var material = o._materials.get(guid);
   if(material){
      return material;
   }
   // 获得路径
   var resource = MO.Console.find(MO.FE3sMaterialConsole).find(guid);
   // 创建材质
   material = MO.Class.create(MO.FE3rMaterial);
   material.linkGraphicContext(context);
   material.loadResource(resource);
   material.load();
   o._materials.set(guid, material);
   return material;
}

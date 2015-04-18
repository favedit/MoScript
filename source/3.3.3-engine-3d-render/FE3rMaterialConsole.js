//==========================================================
// <T>渲染材质控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FE3rMaterialConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd   = EScope.Local;
   // @attribute
   o._materials = null;
   //..........................................................
   // @method
   o.construct  = FE3rMaterialConsole_construct;
   // @method
   o.load       = FE3rMaterialConsole_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._materials = new TDictionary();
}

//==========================================================
// <T>加载一个渲染模型。</T>
//
// @method
// @param context:FG3dContext 环境
// @param guid:String 唯一编号
// @return FRenderModel 渲染模型
//==========================================================
function FE3rMaterialConsole_load(context, guid){
   var o = this;
   // 检查参数
   if(!context){
      throw new TError('Graphics context is empty');
   }
   if(!guid){
      throw new TError('Material guid is empty');
   }
   // 查找材质
   var material = o._materials.get(guid);
   if(material){
      return material;
   }
   // 获得路径
   var resource = RConsole.find(FE3sMaterialConsole).find(guid);
   // 创建材质
   material = RClass.create(FE3rMaterial);
   material.linkGraphicContext(context);
   material.loadResource(resource);
   material.load();
   o._materials.set(guid, material);
   return material;
}

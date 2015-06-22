with(MO){
   //==========================================================
   // <T>技术管理器。</T>
   //
   // @author maocy
   // @history 150107
   //==========================================================
   MO.FG3dTechniqueConsole = function FG3dTechniqueConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd    = EScope.Local;
      o._techniques = null;
      //..........................................................
      // @method
      o.construct   = FG3dTechniqueConsole_construct;
      o.techniques  = FG3dTechniqueConsole_techniques;
      o.find        = FG3dTechniqueConsole_find;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dTechniqueConsole_construct = function FG3dTechniqueConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 设置变量
      o._techniques = new TDictionary();
   }

   //==========================================================
   // <T>获得技术字典。</T>
   //
   // @method
   // @return TDictionary 技术字典
   //==========================================================
   MO.FG3dTechniqueConsole_techniques = function FG3dTechniqueConsole_techniques(){
      return this._techniques;
   }

   //==========================================================
   // <T>根据类名称或对象获得技术器。</T>
   //
   // @method
   // @param context:FG3dContext 环境对象
   // @param clazz:Function 类对象
   // @return FG3dTechnique 效果器
   //==========================================================
   MO.FG3dTechniqueConsole_find = function FG3dTechniqueConsole_find(context, clazz){
      var o = this;
      // 获得环境
      if(!RClass.isClass(context, FGraphicContext)){
         context = context.graphicContext();
      }
      if(!RClass.isClass(context, FGraphicContext)){
         throw new TError(o, 'Unknown context.');
      }
      // 查找技术
      var code = context.hashCode() + '|' + RClass.name(clazz);
      var techniques = o._techniques;
      var technique = techniques.get(code);
      if(!technique){
         // 创建技术
         technique = RClass.create(clazz);
         technique.linkGraphicContext(context);
         technique.setup();
         var techniqueCode = technique.code();
         // 设置过程集合
         var passes = technique.passes();
         var passCount = passes.count();
         for(var i = 0; i < passCount; i++){
            var pass = passes.at(i);
            var passCode = pass.code();
            pass.setFullCode(techniqueCode + '.' + passCode);
         }
         // 存储技术
         techniques.set(code, technique);
      }
      return technique;
   }
}

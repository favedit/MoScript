//==========================================================
// <T>资源模板。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FE3sTemplate(o){
   o = RClass.inherits(this, o, FE3sResource);
   //..........................................................
   // @attribute
   o._materialGroups = null;
   o._themes         = null;
   o._displays       = null;
   // @attribute
   o._activeTheme    = null;
   //..........................................................
   // @method
   o.materialGroups  = FE3sTemplate_materialGroups;
   o.themes          = FE3sTemplate_themes;
   o.displays        = FE3sTemplate_displays;
   // @method
   o.unserialize     = FE3sTemplate_unserialize;
   return o;
}

//==========================================================
// <T>获得材质组字典。</T>
//
// @method
// @return TDictionary 材质组字典
//==========================================================
function FE3sTemplate_materialGroups(){
   return this._materialGroups;
}

//==========================================================
// <T>获得主题集合。</T>
//
// @method
// @return 
//==========================================================
function FE3sTemplate_themes(){
   return this._themes;
}

//==========================================================
// <T>获得显示集合。</T>
//
// @method
// @return 
//==========================================================
function FE3sTemplate_displays(){
   return this._displays;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sTemplate_unserialize(p){
   // 读取父信息
   var o = this;
   // 父处理
   o.__base.FE3sResource.unserialize.call(o, p);
   // 读取材质组集合
   var mc = RConsole.find(FE3sMaterialConsole);
   var c = p.readUint16();
   if(c > 0){
      var s = o._materialGroups = new TDictionary();
      for(var i = 0; i < c; i++){
         // 创建材质组
         var g = mc.unserializeGroup(p);
         s.set(g.guid(), g);
      }
   }
   // 读取主题集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._themes = new TObjects();
      for(var i = 0; i < c; i++){
         // 创建主题
         var t = RClass.create(FE3sTemplateTheme);
         t.unserialize(p);
         s.push(t);
         // 设置激活的主题
         if(o._activeTheme == null){
            o._activeTheme = t;
         }
      }
   }
   // 读取显示集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FE3sDisplay);
         d._template = o;
         d.unserialize(p);
         s.push(d);
      }
   }
}

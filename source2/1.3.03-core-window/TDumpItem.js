with(MO){
   //===========================================================
   // <T>运行信息项目。</T>
   //
   // @tool
   // @author maocy
   // @version 141229
   //===========================================================
   MO.TDumpItem = function TDumpItem(){
      var o = this;
      //..........................................................
      // @attribute
      o.hParent      = null;
      o.hPanel       = null;
      o.hDocument    = null;
      o.hTable       = null;
      o.hText        = null;
      o.hRow         = null;
      o.link         = null;
      o.level        = 0;
      o.caption      = null;
      o.children     = new Array();
      o.items        = new Array();
      o.loaded       = false;
      o.innerDisplay = false;
      o.display      = false;
      //..........................................................
      // @method
      o.create       = TDumpItem_create;
      o.push         = TDumpItem_push;
      o.innerShow    = TDumpItem_innerShow;
      o.show         = TDumpItem_show;
      return o;
   }

   //===========================================================
   // <T>创建子项目。</T>
   //
   // @return TDumpItem 子项目
   //===========================================================
   MO.TDumpItem_create = function TDumpItem_create(){
      var o = this;
      var r = o.children[o.children.length] = new TDumpItem();
      return r;
   }

   //===========================================================
   // <T>增加一个子项目。</T>
   //
   // @return v:item:TDumpItem 子项目
   //===========================================================
   MO.TDumpItem_push = function TDumpItem_push(v){
      var o = this;
      o.items[o.items.length] = v;
   }

   //===========================================================
   // <T>内部显示处理。</T>
   //
   // @return v:display:Boolean 是否显示
   //===========================================================
   MO.TDumpItem_innerShow = function TDumpItem_innerShow(v){
      var o = this;
      // 设置项目集合
      var c = o.items.length;
      for(var n = 0; n < c; n++){
         var tr = o.items[n];
         RHtml.visibleSet(tr, v);
      }
      // 设置子节点集合
      var c = o.children.length;
      for(var n = 0; n < c; n++){
         var d = o.children[n];
         RHtml.visibleSet(d.hRow, v);
         if(v){
            d.show(d.innerDisplay);
         }else{
            d.innerDisplay = d.display;
            d.show(false);
         }
      }
   }

   //===========================================================
   // <T>显示处理。</T>
   //
   // @return v:display:Boolean 是否显示
   //===========================================================
   MO.TDumpItem_show = function TDumpItem_show(v){
      var o = this;
      o.display = v;
      var label = RString.repeat('   ', o.level-1) + (v ? ' -' : ' +') + ' ' + o.caption;
      o.hText.innerHTML = RHtml.toHtml(label);
      o.innerShow(v);
   }
}

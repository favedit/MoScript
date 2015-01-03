// ============================================================
// FCellIcon
// ============================================================
function FCellIcon(o){
   o = RClass.inherits(this, o, FCellEditControl);
   // Html
   o.hEdit  = null;
   // Method
   o.build  = FCellIcon_build;
   o.get    = FCellIcon_get;
   o.set    = FCellIcon_set;
   o.select = FCellIcon_select;
   return o;
}
//------------------------------------------------------------
function FCellIcon_build(){
   var o = this;
   var c = o.column;
   var h = o.base.FCellIconable.build.call(o);
   var he = o.hEdit = RBuilder.append(h, 'INPUT', o.style('Editor'));
   he.link = this;
   he.onfocus = c.ohEditFocus;
   he.onblur = c.ohEditBlur;
   he.onkeydown = c.ohEditKdown;
   he.onkeypress = c.ohEditKpress;
   he.onkeyup = c.ohEditKup;
   he.onchange = c.ohEditChanged;
   if(c.width){
      o.hEdit.style.width = c.width-2;
   }
   return h;
}
//------------------------------------------------------------
function FCellIcon_get(){
   return this.hEdit.value;
}
//------------------------------------------------------------
function FCellIcon_set(v){
   this.hEdit.value = v;
}
//------------------------------------------------------------
function FCellIcon_select(v){
   var o = this;
   var h = o.base.FCellIconable.select.call(o, v);
   o.hEdit.className = v ? o.style('EditorSelect') : o.style('Editor');
}
// ------------------------------------------------------------

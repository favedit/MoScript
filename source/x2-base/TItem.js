// ============================================================
// TItem
// ============================================================
function TItem(value, label){
   var o = this;
   // Attribute
   o.label = label;
   o.value = value;
   o.icon  = null;
   // Method
   o.loadConfig = TItem_loadConfig;
   o.saveConfig = TItem_saveConfig;
   return o;
}
// ------------------------------------------------------------
function TItem_loadConfig(config){
   this.label = config.get('label');
   this.value = config.get('value');
   this.icon  = config.get('icon');
}
// ------------------------------------------------------------
function TItem_saveConfig(config){
   config.set('label', this.label);
   config.set('value', this.value);
   config.set('icon',  this.icon);
}
// ------------------------------------------------------------

//============================================================
// TMessage
//============================================================
function TMessage(){
   var o = this;
   //..........................................................
   // @property
   o.typeCd      = EMessage.None;
   o.attrType    = null;
   o.message     = null;
   o.description = null;
   o.redirect    = null;
   //..........................................................
   // @method
   o.loadConfig = TMessage_loadConfig;
   o.saveConfig = TMessage_saveConfig;
   o.icon       = TMessage_icon;
   return o;
}

//===========================================================
//
//===========================================================
function TMessage_loadConfig(config){
   var o = this;
   o.typeCd      = RString.toLower(config.name);
   o.message     = config.nvl('message');
   o.attrType    = config.nvl('type');
   o.redirect    = config.nvl('redirect');
   var desc = config.nvl('description');
   o.description = desc.replace(/\\n/g, '\n');
}

//===========================================================
//
//===========================================================
function TMessage_saveConfig(config){
   var o = this;
   config.name = o.typeCd;
   config.set('message', o.message);
   config.set('description', o.description);
}

//===========================================================
//
//===========================================================
function TMessage_icon(){
   return 'sys.msg.' + this.typeCd;
}


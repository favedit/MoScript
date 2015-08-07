//==========================================================
// <T>环境信息控制台。</T>
//
// @console
// @author maocy
// @version 150319
//==========================================================
MO.FDuiEnvironmentConsole = function FDuiEnvironmentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o.scope       = MO.EScope.Local;
   o.environment = null;
   //..........................................................
   // @method
   o.connect     = MO.FDuiEnvironmentConsole_connect;
   o.build       = MO.FDuiEnvironmentConsole_build;
   o.buildValue  = MO.FDuiEnvironmentConsole_buildValue;
   o.load        = MO.FDuiEnvironmentConsole_load;
   o.xml         = MO.FDuiEnvironmentConsole_xml;
   return o;
}

//==========================================================
// <T>获得环境信息。</T>
//
// @method
//==========================================================
MO.FDuiEnvironmentConsole_connect = function FDuiEnvironmentConsole_connect(){
   //var xData = window.xEnvironment;
   //if(xData){
   //   this.environment = RXml.makeNode(xData);
   //}
}

// ------------------------------------------------------------
MO.FDuiEnvironmentConsole_build = function FDuiEnvironmentConsole_build(config){
   var o = this;
   if(!o.environment){
      o.connect()
   }
   if(o.environment){
      var node = config.create('Environment');
      node.attributes().append(this.environment.attributes());
   }
}

// ------------------------------------------------------------
MO.FDuiEnvironmentConsole_buildValue = function FDuiEnvironmentConsole_buildValue(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      var env = RHtml.get('_environment');
      if(env){
         env.value = this.environment.xml();
      }
   }
}

//==========================================================
// <T>环境信息控制台。</T>
//
// @console
// @author maocy
// @version 150319
//==========================================================
MO.FDuiEnvironmentConsole_load = function FDuiEnvironmentConsole_load(p){
   this.environment = RXml.makeNode(p);
}

// ------------------------------------------------------------
MO.FDuiEnvironmentConsole_xml = function FDuiEnvironmentConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}

// ============================================================
// FEnvConsole
// ============================================================
function FEnvConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope       = EScope.Page;
   o.environment = null;
   // Method
   o.connect     = FEnvConsole_connect;
   o.build       = FEnvConsole_build;
   o.buildValue  = FEnvConsole_buildValue;
   o.xml         = FEnvConsole_xml;
   return o;
}
// ------------------------------------------------------------
function FEnvConsole_connect(){
   var xData = RHtml.get('xEnvironment');
   if(xData){
      this.environment = RXml.makeNode(xData);
   }
}
// ------------------------------------------------------------
function FEnvConsole_build(config){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      var node = config.create('Environment');
      node.attributes().append(this.environment.attributes());
   }
}
// ------------------------------------------------------------
function FEnvConsole_buildValue(){
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
// ------------------------------------------------------------
function FEnvConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
// ------------------------------------------------------------

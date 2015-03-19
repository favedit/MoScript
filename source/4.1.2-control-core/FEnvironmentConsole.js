//==========================================================
// <T>环境信息控制台。</T>
//
// @console
// @author maocy
// @version 150319
//==========================================================
function FEnvironmentConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o.scope       = EScope.Local;
   o.environment = null;
   //..........................................................
   // @method
   o.connect     = FEnvironmentConsole_connect;
   o.build       = FEnvironmentConsole_build;
   o.buildValue  = FEnvironmentConsole_buildValue;
   o.load        = FEnvironmentConsole_load;
   o.xml         = FEnvironmentConsole_xml;
   return o;
}

//==========================================================
// <T>获得环境信息。</T>
//
// @method
//==========================================================
function FEnvironmentConsole_connect(){
   return;
   var xData = window.xEnvironment;
   if(xData){
      this.environment = RXml.makeNode(xData);
   }
}

// ------------------------------------------------------------
function FEnvironmentConsole_build(config){
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
function FEnvironmentConsole_buildValue(){
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
function FEnvironmentConsole_load(p){
   this.environment = RXml.makeNode(p);
}

// ------------------------------------------------------------
function FEnvironmentConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}

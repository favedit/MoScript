with(MO){
   //==========================================================
   // <T>环境信息控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150319
   //==========================================================
   MO.FUiEnvironmentConsole = function FUiEnvironmentConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o.scope       = EScope.Local;
      o.environment = null;
      //..........................................................
      // @method
      o.connect     = FUiEnvironmentConsole_connect;
      o.build       = FUiEnvironmentConsole_build;
      o.buildValue  = FUiEnvironmentConsole_buildValue;
      o.load        = FUiEnvironmentConsole_load;
      o.xml         = FUiEnvironmentConsole_xml;
      return o;
   }

   //==========================================================
   // <T>获得环境信息。</T>
   //
   // @method
   //==========================================================
   MO.FUiEnvironmentConsole_connect = function FUiEnvironmentConsole_connect(){
      //var xData = window.xEnvironment;
      //if(xData){
      //   this.environment = RXml.makeNode(xData);
      //}
   }

   // ------------------------------------------------------------
   MO.FUiEnvironmentConsole_build = function FUiEnvironmentConsole_build(config){
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
   MO.FUiEnvironmentConsole_buildValue = function FUiEnvironmentConsole_buildValue(){
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
   MO.FUiEnvironmentConsole_load = function FUiEnvironmentConsole_load(p){
      this.environment = RXml.makeNode(p);
   }

   // ------------------------------------------------------------
   MO.FUiEnvironmentConsole_xml = function FUiEnvironmentConsole_xml(){
      if(!this.environment){
         this.connect()
      }
      if(this.environment){
         return this.environment.xml();
      }
      return null;
   }
}

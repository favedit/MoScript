//==========================================================
// <T>资源模板管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FE3sSceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scenes     = null;
   o._serviceUrl = '/cloud.content.scene.ws'
   o._dataUrl    = '/cloud.content.scene.wv'
   //..........................................................
   // @method
   o.construct   = FE3sSceneConsole_construct;
   o.load        = FE3sSceneConsole_load;
   o.update      = FE3sSceneConsole_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new TDictionary();
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneConsole_load(p){
   var o = this;
   var s = o._scenes;
   var r = s.get(p);
   if(r == null){
      // 生成地址
      var u = RBrowser.hostPath(o._dataUrl + '?code=' + p + '&date=' + RDate.format());
      // 创建主题
      r = RClass.create(FE3sScene);
      r.load(u);
      s.set(p, r);
   }
   return r;
}

//==========================================================
// <T>更新处理。</T>
//
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sSceneConsole_update(p){
   var o = this;
   // 生成地址
   var u = RBrowser.hostPath(o._serviceUrl + '?action=update&date=' + RDate.format());
   // 发送数据
   var xc = RConsole.find(FXmlConsole);
   var r = xc.send(u, p);
}

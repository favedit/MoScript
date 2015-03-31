//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsResourceImportDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   //..........................................................
   // @property
   o._frameName            = 'design3d.resource.ImportDialog';
   //..........................................................
   // @attribute
   o._resourceTypeCd       = 'private';
   // @attribute
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsResourceImportDialog_onBuilded;
   // @event
   o.onConfirmLoad         = FDsResourceImportDialog_onConfirmLoad;
   o.onConfirmClick        = FDsResourceImportDialog_onConfirmClick;
   o.onCancelClick         = FDsResourceImportDialog_onCancelClick;
   //..........................................................
   // @method
   o.construct             = FDsResourceImportDialog_construct;
   // @method
   o.dispose               = FDsResourceImportDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceImportDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsResourceImportDialog_onConfirmLoad(event){
   var o = this;
   var frame = o._workspace._searchContent;
   frame.serviceResearch();
   // 隐藏窗口
   o.hide();
   // 隐藏窗口
   RWindow.enable();
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsResourceImportDialog_onConfirmClick(event){
   var o = this;
   // 画面禁止操作
   RWindow.disable();
   // 获得参数
   var code = o._controlCode.get();
   var label = o._controlLabel.get();
   // 发送数据请求
   var file = o._controlFile._hInput.files[0];
   var reader = new FileReader(); 
   reader.onloadstart = function() { 
       console.log("onloadstart"); 
      //document.getElementById("bytesTotal").textContent = file.size; 
   } 
    reader.onprogress = function(p) { 
      console.log("onprogress"); 
      //document.getElementById("bytesRead").textContent = p.loaded; 
   } 
   reader.onload = function(){
      console.log('Load file complete');
   }
   reader.onloadend = function(){
      if(reader.error){
         console.log(reader.error); 
      }else{
          var xhr = new XMLHttpRequest(); 
          xhr.open('POST', '/cloud.content.mesh.wv?do=importData&guid=1&code=2&data_length=' + file.size + '&file_name=' + file.name); 
          //xhr.open('POST', '/resource3d/mesh/Mesh.wa?do=importData&guid=1&data_length=' + file.size + '&file_name=' + file.name); 
          xhr.overrideMimeType("application/octet-stream"); 
          //xhr.sendAsBinary(reader.result); 
          xhr.send(reader.result); 
          xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
               if (xhr.status == 200){
                  console.log("upload complete");
                  console.log("response: " + xhr.responseText);
               }
            }
         }
      }
   }
   //reader.readAsBinaryString(file);
   reader.readAsArrayBuffer(file);
   
   // 发送数据请求
   //var project = RClass.create(FDrProject);
   //project.setCode(code);
   //project.setLabel(label);
   // 发送请求处理
   //var connection = RConsole.find(FDrProjectConsole).doCreate(project);
   //connection.addLoadListener(o, o.onConfirmLoad);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsResourceImportDialog_onCancelClick(event){
   this.hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourceImportDialog_construct(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceImportDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.dispose.call(o);
}

@CLS

@SET JS_HOME=%cd%
@SET PJ_HOME=%JS_HOME%\..\..

@SET JAVA_PATH=%JS_HOME%\..\library\jdom-2.0.5.jar;%JS_HOME%\..\library\mo-common.jar;%JS_HOME%\..\library\mo-utility.jar

@REM ============================================================
@SET JAVA_BUILDER=org.mo.util.javascript.FJsFileBuilder
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_BUILDER% %JS_HOME%

@REM ============================================================
@COPY /Y %JS_HOME%\9.1.01-context\*.js %JS_HOME%\ajs\

@REM COPY /Y %JS_HOME%\ajs\*.js %PJ_HOME%\MoCloud\mp-cloud-design\webroot\ajs

@REM COPY /Y %JS_HOME%\ajs\lzma.js        %PJ_HOME%\MoCloud\mp-cloud-content\webroot\engine\ajs\lzma.js
@REM COPY /Y %JS_HOME%\ajs\lzma_worker.js %PJ_HOME%\MoCloud\mp-cloud-content\webroot\engine\ajs\lzma_worker.js
@REM COPY /Y %JS_HOME%\ajs\mo.js          %PJ_HOME%\MoCloud\mp-cloud-content\webroot\engine\ajs\mo.js
@REM COPY /Y %JS_HOME%\ajs\me.js          %PJ_HOME%\MoCloud\mp-cloud-content\webroot\engine\ajs\mo-engine.js
@REM COPY /Y %JS_HOME%\ajs\demo.js        %PJ_HOME%\MoCloud\mp-cloud-content\webroot\engine\ajs\mo-demo.js

@COPY /Y %JS_HOME%\ajs\lzma.js        %JS_HOME%\eai-release\ajs\lzma.js
@COPY /Y %JS_HOME%\ajs\lzma_worker.js %JS_HOME%\eai-release\ajs\lzma_worker.js
@COPY /Y %JS_HOME%\ajs\me.js          %JS_HOME%\eai-release\ajs\me.js
@COPY /Y %JS_HOME%\ajs\eai.js         %JS_HOME%\eai-release\ajs\eai.js
@COPY /Y %JS_HOME%\ajs\context_cn.js  %JS_HOME%\eai-release\ajs\context_cn.js

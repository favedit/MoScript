@CLS

@SET JS_HOME=%cd%
@SET PJ_HOME=%JS_HOME%\..\..
@SET PJ_EAI=%PJ_HOME%\MoCloud\mp-eai-content\webroot

@SET JAVA_PATH=%JS_HOME%\..\library\jdom-2.0.5.jar;%JS_HOME%\..\library\mo-common.jar;%JS_HOME%\..\library\mo-utility.jar

@REM ============================================================
@SET JAVA_BUILDER=org.mo.util.javascript.FJsFileBuilder
@"%JAVA_HOME%\bin\java.exe" -Xms256m -Xmx512m -cp %JAVA_PATH% %JAVA_BUILDER% %JS_HOME% release

@REM ============================================================
@COPY /Y %JS_HOME%\9.1.01-context\*.js %JS_HOME%\ajs\

@REM @"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\md5.js  --js_output_file ajs\release\md5.js
@REM @"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\lzma_worker.js  --js_output_file ajs\release\lzma_worker.js
@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\mc.js  --js_output_file ajs\release\mc.js
@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\mo.js  --js_output_file ajs\release\mo.js
@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\me.js  --js_output_file ajs\release\me.js
@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\eai.js --js_output_file ajs\release\eai.js

@XCOPY /E /Y %JS_HOME%\ars\eai        %PJ_EAI%\ars\eai
@XCOPY /E /Y %JS_HOME%\ars\shader     %PJ_EAI%\ars\shader

@COPY /Y %JS_HOME%\ajs\extension.js   %PJ_EAI%\ajs\extension.js
@COPY /Y %JS_HOME%\ajs\release\me.js  %PJ_EAI%\ajs\me.js
@COPY /Y %JS_HOME%\ajs\release\mo.js  %PJ_EAI%\ajs\mo.js
@COPY /Y %JS_HOME%\ajs\release\eai.js %PJ_EAI%\ajs\eai.js
@COPY /Y %JS_HOME%\ajs\context_cn.js  %PJ_EAI%\ajs\context_cn.js

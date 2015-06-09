@CLS

@SET JS_HOME=%cd%

@SET JAVA_PATH=%JS_HOME%\..\library\jdom-2.0.5.jar;%JS_HOME%\..\library\mo-common.jar;%JS_HOME%\..\library\mo-utility.jar

@REM ============================================================
@SET JAVA_BUILDER=org.mo.util.javascript.FJsFileBuilder
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_BUILDER% %JS_HOME%

@REM ============================================================
@REM COPY /Y %JS_HOME%\9.1.01-context\*.js %JS_HOME%\ajs\

@REM "%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\lzma.js --js_output_file ajs\release\lzma.js
@REM "%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\lzma_worker.js --js_output_file ajs\release\lzma_worker.js

"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\mo.js  --js_output_file ajs\release\mo.js
"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\me.js  --js_output_file ajs\release\me.js
"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\eai.js --js_output_file ajs\release\eai.js

@REM COPY /Y E:\Microbject\MoScript\source\ajs\release\* E:\Microbject\MoCloud\mp-cloud-content\webroot\engine\ajs\

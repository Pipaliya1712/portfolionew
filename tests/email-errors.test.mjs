import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require=createRequire(import.meta.url);
const ts=require('typescript');
const compile=file=>ts.transpileModule(readFileSync(new URL(file,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const validation={};vm.runInNewContext(compile('../src/lib/contact-validation.ts'),{exports:validation});
const compiled=compile('../src/app/api/send-email/route.ts');
function app(env={},failure){
  const exports={};const logs=[];const sent=[];
  vm.runInNewContext(compiled,{exports,process:{env},console:{error:(...args)=>logs.push(args)},require:name=>{
    if(name==='next/server')return{NextResponse:{json:(body,options)=>Response.json(body,options)}};
    if(name==='@/lib/contact-validation')return validation;
    if(name==='nodemailer')return{__esModule:true,default:{createTransport:()=>({sendMail:async data=>{sent.push(data);if(failure)throw failure;}})}};
    throw new Error('Unexpected import');
  }});
  return {logs,sent,post:()=>exports.POST(new Request('http://localhost/api/send-email',{method:'POST',body:JSON.stringify({name:'Local Test',email:'visitor@example.invalid',subject:'AI engineering',message:'A synthetic local validation test. No message should leave the test process.',consent:'yes'})}))};
}
test('missing production email settings have a specific code and do not contact SMTP',async()=>{
  for(const env of [{},{EMAIL_USER:'owner@example.invalid'},{EMAIL_USER:' ',EMAIL_PASSWORD:'private-test-password'}]){
    const testApp=app(env);const response=await testApp.post();assert.equal(response.status,503);assert.equal((await response.json()).code,'EMAIL_NOT_CONFIGURED');assert.equal(testApp.sent.length,0);assert.equal(testApp.logs[0][0],'[contact] Email configuration missing');assert.ok(!JSON.stringify(testApp.logs).includes('private-test-password'));
  }
});
test('SMTP authentication and network failures are distinguished without logging messages or credentials',async()=>{
  for(const [reason,category] of [['EAUTH','EMAIL_AUTH_FAILED'],['ETIMEDOUT','EMAIL_CONNECTION_FAILED'],['ESOCKET','EMAIL_CONNECTION_FAILED'],['EMESSAGE','EMAIL_SEND_FAILED']]){
    const testApp=app({EMAIL_USER:'owner@example.invalid',EMAIL_PASSWORD:'private-test-password'},Object.assign(new Error('private-test-password visitor@example.invalid private message'),{code:reason,responseCode:535}));
    const response=await testApp.post();const body=await response.json();assert.equal(response.status,503);assert.equal(body.code,category);assert.equal(testApp.logs[0][1].reason,reason);assert.equal(testApp.logs[0][1].smtpStatus,535);assert.ok(!JSON.stringify([body,testApp.logs]).includes('private-test-password'));assert.ok(!JSON.stringify(testApp.logs).includes('visitor@example.invalid'));
  }
});
test('successful delivery still targets the configured owner and keeps the visitor as reply-to',async()=>{
  const testApp=app({EMAIL_USER:'owner@example.invalid',EMAIL_PASSWORD:'private-test-password'});const response=await testApp.post();assert.equal(response.status,200);assert.equal((await response.json()).success,true);assert.equal(testApp.sent[0].to,'owner@example.invalid');assert.equal(testApp.sent[0].replyTo.address,'visitor@example.invalid');assert.equal(testApp.logs.length,0);
});

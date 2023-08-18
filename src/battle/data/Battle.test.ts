import { Battle } from "./Battle";

export function around(...args) {
    return (_target, name, descriptor) => {
      // 获取value，其实就是request函数
      const oldValue = descriptor.value;
      // 将value重新赋值一个函数
      descriptor.value = async function () {
        const callback = args[1];
        const callbackBefore = args[0];
        // tslint:disable-next-line: no-console
        console.log(`Calling ${name} with`, args);
        await callbackBefore(this, oldValue, ...args[0]);
        // 将原本的函数执行一下,apply改变this的指向
        const val = await oldValue.apply(this, args);
        let result = val;
        //for (const callback of args) {
        //  result = (await callback(this, result, ...args)) || result
        //}
        result = (await callback(this, result, ...args[1])) || result
        return result;
      };

      return descriptor;
    }
  }

export function logBefore(target: any, data: any, ...args){
    // target 是 Test对应实例对象
    // data 是每次函数调用返回的结果，第一次接收的是 request 函数返回的值，默认值
    // args 是request函数的参数
    cc.log("logBefore:",data); 
    cc.log("logBefore:",target);

    let foo: Battle = Object.assign(new Battle(), target);
    cc.log("foo.curWaveIndex:",foo.curWaveIndex);

    //const config: SceneConfig = Config.getConfig(SceneConfig).get(Global.userData.curBattleLevel);
    //cc.log("config.factor06:",config.factor06);

  }

  
export function logAfter(target: any, data: any, ...args){
   // 同上，此处data理论上是components返回的值，若components无返回值，则是request返回的默认值
    cc.log("logAfter:",data);

    let foo: Battle = Object.assign(new Battle(), target);
    cc.log("foo.curWaveIndex:",foo.curWaveIndex);

    const config: SceneConfig = Config.getConfig(SceneConfig).get(Global.userData.curBattleLevel);
    

      if(foo.curWaveIndex <= config.factor06 || foo.curWaveIndex > config.factor07){
        if(data != config.factor08){
          cc.log("testcase1 success");
        }
      } 

  }
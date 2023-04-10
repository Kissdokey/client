//包装两个fetch函数，post_fetch用于携带数据的请求，比如修改用户信息，新建用户等，get_fetch请求用于请求数据，参数用querry携带即可；
//post_fetch用application/json的方式传输，两个函数都需要设置credentials:'include'，以便可以携带cookie信息
//每一个fetch函数都用.then进行所有情况的异常处理，如果网络问题导致的异样，会调用then的第二个回调函数展示，其他情况用户都会
//返还一个promise对象，respnseData来await接收这个数据，这个数据再用JSON.parse进行解析，内容就是服务端返回的数据了，
//服务端也进行了异样处理，返回的数据会有code属性，标识数据状态，0代表OK，-1代表服务端的问题，-2代表用户的问题
//根据code的值给予用户不同的反馈信息
async function post_fetch(url:any,formdata:any) {
    const res = await fetch(url, {
      method: "POST", 
      body: JSON.stringify(formdata),
      mode:'no-cors',
      credentials:'include',
      headers: {
          'content-type': 'application/json'
      }
    });
    return res.text();   
  }
async function get_fetch(url:any) {
    const res = await fetch(url, {
      method: "GET", 
      mode:'no-cors',
      credentials:'include'
    });
    return res.text();
  }
  export {get_fetch};
  export {post_fetch};
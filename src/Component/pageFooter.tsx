//Component目录下的三大组件是主界面App下的三大组成部分，header是最上方的页眉部分，pageFooter是下方的分页器，content是中间展示用户信息的部分，row是每一行的内容
//该组件传入很多个参数，原因很简单，第一页用户数据是在content申请的，其他数据申请比如第二页数据是通过分页器决定的，所以必须要在这里申请数据
//但是数据的状态还在父组件content中，以此要将state的set函数传入；number是总的数据量用于分页数，value是搜索关键字
//该关键字只能是单关键字，将该关键字抛给后端，后端遍历所有数据的属性查看是否包含该字串，包含就返回该数据，以此实现单关键词的模糊搜索
import { message, PaginationProps } from 'antd';
import { Pagination } from 'antd';
import React, { useState } from 'react';
import { delCookie } from '../tools/cookie';
import { get_fetch } from '../fetch';

export default  function Pagenate(props:{setUserData0:any,setUserData1:any;setUserData2:any;setUserData3:any;setUserData4:any;number:number;setNumber:any;value:any } ) {
  let responseData;
  const{setUserData0,setUserData1,setUserData2,setUserData3,setUserData4,number,setNumber,value}= props;
  const [current, setCurrent] = useState(1);
  const onChange: PaginationProps['onChange'] = (page,pageSize) => {
    get_fetch("/user?page="+page+"&number="+pageSize+"&value="+value).then(
      async (res) => {
        //在这里用if-else处理respond-body的不同返回值，如果有state属性代表肯定出错，比如获取数据已经被删除等等，再在下面处理或者跳转到指定出错界面；
        
         responseData= await res;
        responseData = JSON.parse(responseData);
        if (responseData.code === -1) {
          console.log(responseData.msg);
          //跳转到错误页面
          message.error(responseData.msg);
          setTimeout(() => {
            window.location.href = "/error";
          }, 2000);
        }
        //这里出错只能是用户登陆状态出错，所以跳转到登陆界面->将store更新,如果有cookie那一定是出错的，可能原因是服务端那边session数据更新，需要删掉
        else if (responseData.code === -2) {
          message.error(responseData.msg);
          setTimeout(() => {
            if (document.cookie.indexOf("isLoging") !== -1) {
              delCookie("isLoging");
            }
            window.location.href = "/error";
          }, 2000);
        } else { 
          setNumber(responseData.length);
          setUserData0(JSON.stringify(responseData.data[0]));
          setUserData1(JSON.stringify(responseData.data[1]));
          setUserData2(JSON.stringify(responseData.data[2]));
          setUserData3(JSON.stringify(responseData.data[3]));
          setUserData4(JSON.stringify(responseData.data[4]));
        }
      },
      (rej) => {
        message.error("网络故障或者或请求被阻止！");
        console.log("网络故障或者或请求被阻止！");
        //跳转到出错界面；
      }
    );
    setCurrent(page);
  };
//通过style将分页器固定在屏幕右下角，current是当前页，total是总数据量，defaultPageSiza是每页数据量
  return <Pagination className="pageFooter" style={{position:"absolute"}} current={current} onChange={onChange} total={number}  defaultPageSize={5} hideOnSinglePage={true} />;
};


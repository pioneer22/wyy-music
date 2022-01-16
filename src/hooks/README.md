useReducer: 
  useState的一种替代方案，并不能替代Redux。
  1. state的处理逻辑比较复杂， 可以通过useReducer来对其进行拆分；
  2. 此次修改的state需要依赖之前的state。

  reducer/xx.js
  export function xxReducer(state, action){
    switch(action.type){
      case xxx:
        return {...state, yyy: state.yyy};
      default: 
        return state;
    }
  }

  页面使用
  import {xxReducer} from './reducer/xx'
  const [state,dispatch] = useReducer(xxReducer, {yyy: 123})
  调用:
  dispatch({type: xxx})

useCallback：
  进行性能的优化
  1. useCallback会返回一个函数的memoized（记忆的）值。
  2. 在依赖不变的情况下，多次定义的时候，返回的值是相同的；
  3. useCallback最主要用于性能渲染的地方应该是和memo结合起来，决定子组件是否需要重新渲染；

  import {memo} from 'react';
  const xxx = memo((props)=>{
    return <button onClick={props.methods}>memo</button>
  });

useMemo: 
  进行性能优化
  1. useMemo会返回一个函数的memoized（记忆的）值。
  2. 在依赖不变的情况下，多次定义的时候，返回的值是相同的；

  import {useState, useMemo, memo} from 'react';
  const [num, setNum] = useState(5);
  const Sum = useMemo(()=>{
    let total = 0;
    for(let i=0;i < num; i++;){
      total += i;
    }
    return total;
  }, [num]);

  useMemo也可以用于子组件的性能优化。
  const ShowSum = memo((props) => {
     return <h1>Sum: {props.Sum}</h1>
  })

  <ShowSum Sum={Sum} />

useRef: 
  useRef返回一个ref对象，返回的ref对象在组件的整个生命周期保持不变。
  常用ref的两种用法：
  1. 引入DOM（或者组件，但是需要是class组件）元素；
  2. 保存一个数据，这个对象在整个生命周期中可以保存不变；

  引入DOM
  import {useRef} from 'react';
  const inputRef = useRef();
  const handleInput = () => {
    inputRef.current.focus();
  }
  
  <>
    <input type="text" ref={inputRef} />
    <button onClick={e=>handleInput()}></button>
  </>

  使用ref保存上一次的某一个值
  1. useRef可以想象成在ref对象中保存了一个.current的可变盒子。
  2. useRef在组件重新渲染时，返回的依然是之前的ref对象，但是current是可以修改的；

  import {useRef, useEffect, useState} from 'react';

  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(()=>{
    countRef.current = count
  }, [count]) 

  <>
    <p>上回值: {countRef.current}</p>
    <p>当前值: {count}</p>
    <button onClick={e => setCount(count+1)}>+1</button>
  </>

useImperativeHandle:
  forwardRef:
  1. 通过forwardRef可以将ref转发到子组件；
  2. 子组件拿到父组件中创建的ref，绑定到自己的某一个元素中；

  import {useRef, forwardRef} from 'react';
  
  const FRInput = forwardRef((props, ref)=>{
    return <input type="text" ref={ref} />
  });
  const inputRef = useRef();

  <>
    <FRInput ref={inputRef} />
    <button onClick={e => inputRef.current.focus()}>聚焦</button>
  </>

  以上使用出现问题:
  1. 子组件的DOM直接暴露给父组件, 父组件拿到DOM后可以进行任意操作。
  2. 只希望父组件可以操作的focus, 其它并不希望随意操作。

  通过useImperativeHandle可以只暴露固定的操作：
  1. 通过useImperativeHandle的Hook, 将传入的ref和useImperativeHandle第二个参数返回的对象绑定到一起。
  2. 在父组件中, 使用inputRef.current时, 实际上使用的是返回的对象。
  3. 如: 调用了focus函数, 甚至可以调用 printHook函数。

  import React, {useRef, forwardRef, useImperativeHandle } from 'react';
  const FRInput = forwardRef((props, ref)=>{
    // 创建组件内部的ref
    const inputRef = useRef();
    useImperativeHandle(ref, ()=>({
      focus: ()=>{
        inputRef.current.focus();
      },
      printHook: ()=>{
        let {log} = console
        log('print hook!')
      }
    }));
    // 这里绑定的是组件内部的inputRef
    return <input type="text" ref={inputRef} />
  });

  const inputRef = useRef();
  <>
    <FRInput ref={inputRef} />
    <button onClick={e => inputRef.current.focus()}>聚焦</button>
    <button onClick={e => inputRef.current.printHook()}>Hook</button>
  </>

useLayoutEffect:
  1. useEffect会在渲染的内容更新到DOM上后执行，不会阻塞DOM的更新;
  2. useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新;

  const [count, setCount] = useState(0);
  useLayoutEffect(()=>{
    if(count === 0){
      setCount(Math.random()*1000)
    }
  }, [count])

自定义hook
自定义Hook本质上只是一种函数代码逻辑的抽取。
函数以特殊的方式命名，以 use 开头即可。

// 获取滚动位置
function useScrollPosition(){
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    }
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, [])
  return scrollPosition;
}


Redux Hooks
useSelector:
  将state映射到组件中。
  1. 参数一：将state映射到需要的数据中
  2. 参数二：可以进行比较来决定是否组件重新渲染；

  使用react-redux中给我们提供的 shallowEqual 避免不必要的重新渲染
  import { shallowEqual, useSelector, useDispatch } from 'react-redux'
  const { mydata, mydata1, counter } = useSelector(state=>({
    mydata: state.mydata,
    mydata1: state.mydata1
  }), shallowEqual) 

useDispatch：
  直接获取dispatch函数，之后在组件中直接使用
  const dispatch = useDispatch()
  <button onClick={e => dispatch(subAction(1))}>-1</button>

  通过useStore来获取当前的store对象
  const store = useStore();

  组件中可以使用store
  store.getState();
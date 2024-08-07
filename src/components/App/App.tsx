import React, { useState } from 'react';
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import ImgJpg from '@/assets/avatar.jpg';
import Cat from '@/assets/cat.png';
import Telegram from '@/assets/telegram.svg'
// TREE SHAKING
  function TODO(a: number) {
    console.log(a);
  }
export const App = () => {
  const [counter, setCounter] = useState<number>(0);

  const increment = () => setCounter((prev) => prev + 1);
  TODO(121212)
  
  // if (__PLATFORM__ === 'mobile') {
  //   return <div>ISMOBILE</div>;
  // }
  // if(__PLATFORM__ === 'desktop') {
  //   return <div>ISDESKTOP</div>;
  // }
      
  return (
    <div>
      <h1>PLATFORM={__PLATFORM__}</h1>
      <Link to={'/about'}>About</Link>
      <br />
      <Link to={'/shop'}>Shop</Link>
      <h1 className={classes.value}>{counter}</h1>
      <button className={classes.button} onClick={increment}>
        Click
      </button>
      <div>
        <img width={100} src={Cat} />
        <img width={100} src={ImgJpg} />
        {Cat}
      </div>
      <div>
        <Telegram style={{ color: 'red' }} width={50} height={50} />
      </div>
      {/* Outlet - встривание дочерного роута */}
      <Outlet />
    </div>
  );
};

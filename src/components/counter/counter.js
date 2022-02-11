import React, { useEffect, useState } from "react";
import {decrement, increment, reset} from '../../../redux/actions/counterActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Counter() {
    
    const counter = useSelector((state) => state.counter),
          dispatch = useDispatch();
    
    return (
        <>
            <h1>Counter</h1>
            <button onClick={() => dispatch(increment())}>Increase</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
            <button onClick={() => dispatch(decrement())}>Decrease</button>
            <p>{counter}</p>
        </>
    )

}
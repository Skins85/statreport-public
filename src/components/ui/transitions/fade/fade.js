import React from 'react';
import { Transition } from 'react-transition-group';

export default function Fade() {
    const duration = 300;
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 }
    }
    return (
        ''
    )
}
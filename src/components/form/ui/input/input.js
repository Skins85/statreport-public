import React from 'react';

const input = (props) => {

    const labelEl = 
        props.labelRequired 
            ? props.inputType === 'checkbox' 
                ? <label 
                    for={props.inputId}
                    type='checkbox'
                >
                    {props.labelText}
                </label> 
                : <label for={props.inputName}>{props.labelText}</label>
            : null
        
    const inputEl =
        <input 
            class={props.className}
            type={props.inputType ? props.inputType: 'text'}
            id={props.inputId}
            maxlength={props.inputMaxLength}
            size={props.inputSize}
            value={props.inputValue}
            placeholder={props.placeholderText} 
            name={props.inputName} 
            checked={props.checked}
            onChange={props.onChange}
            disabled={props.inputDisabled}
            onFocus={(e) => e.target.placeholder = ''} 
            onBlur={(e) => e.target.placeholder = props.placeholderText}
        >
            {props.children}
        </input>
        
    // Switch order of input element and label depending on input type
    let output;
    props.inputType === 'checkbox' 
        ? output = (
            <>
                {inputEl}
                {labelEl}
            </>
            ) 
        : output = (
            <>
                {labelEl}
                {inputEl}
            </>
    );
        
    return <>{output}</>

}

export default input;
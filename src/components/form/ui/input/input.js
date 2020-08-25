import React from 'react';

const input = (props) => {
    return (
        <React.Fragment>
            {props.labelRequired ? <label for={props.inputName}>{props.labelText}</label> : null}
            <input 
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
            >
                {props.children}
            </input>
        </React.Fragment>
    )
}

export default input;
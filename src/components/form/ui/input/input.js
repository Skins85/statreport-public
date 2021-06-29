import React from 'react';

const input = (props) => {
    return (
        <React.Fragment>
            {props.labelRequired 
                ? props.inputType === 'checkbox' 
                    ? <label for={props.inputId}>{props.labelText}</label> 
                    : <label for={props.inputName}>{props.labelText}</label>
                : null}
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
        </React.Fragment>
    )
}

export default input;
import React from 'react';

const select = (props) => {
    return (
        <React.Fragment>
            {props.labelRequired ? <label for={props.labelTarget}>{props.labelText}</label> : null}
            <select 
                className={props.className}
                id={props.selectId}
                name={props.selectName} 
                onChange={props.onChange}
                disabled={props.selectDisabled}
            >
                {props.children}
            </select>
        </React.Fragment>
    )
}

export default select;
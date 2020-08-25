import React from 'react';

const AddResultsComplete = (props) => {
    return (
        <React.Fragment>
            <h1>Add result confirmation</h1>
            <p>Your data has been successfully added.</p>
            <p><a href='./add-results'>Add another result</a></p>
        </React.Fragment>
    )
}

export default AddResultsComplete;
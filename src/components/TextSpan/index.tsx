import React from 'react';

const TextSpan = (props: any) => {
    return (
        <>
            <span>
                {props.label}
                <b> {props.value} </b>
            </span>
        </>
    );
};

export default TextSpan;

import React from 'react';

const TextSpan = (props: any) => {
    return (
        <>
            <div style={props.style}>
                {props.label}&nbsp;
                <span style={{ fontWeight: "bold", color: props?.color, fontSize: props?.fS, marginLeft: props?.ml }}>{props.value}</span>
            </div>
        </>
    );
};

export default TextSpan;

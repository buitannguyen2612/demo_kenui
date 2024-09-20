import React from 'react';

interface MyComponentProps {
    isTrue: boolean;        // Another prop besides children
    children: React.ReactNode;
    falseValue: string | null;
    styleString?: string
}

const UseCondition: React.FC<MyComponentProps> = ({ isTrue, children, falseValue, styleString }) => {
    return (
        <>
            {
                isTrue ? <>{children}</> : falseValue !== null ? <div className={`${styleString}`}>{falseValue}</div> : falseValue
            }
        </>
    );
};

export default UseCondition;
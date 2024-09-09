import React from 'react';

interface MyComponentProps {
    isOpent: boolean;        // Another prop besides children
    children: React.ReactNode;
}

const UseCondition: React.FC<MyComponentProps> = ({ isOpent, children }) => {
    return (
        <>
            {
                isOpent ? { children } : null
            }
        </>
    );
};

export default UseCondition;
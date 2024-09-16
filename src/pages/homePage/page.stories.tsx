import type { Meta } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';
import HomePage from './page';
//todo: fix the layout when we have usecontext
export default {
    title: 'Page/TodoList',
    argTypes: {}

} as Meta


export const Default = () => {
    return (
        <div className='w-[80rem] h-auto'>
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        </div>
    )
}


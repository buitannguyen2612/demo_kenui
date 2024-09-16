import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { withRouter } from 'storybook-addon-remix-react-router';
import Login from './page';

const meta = {
    title: 'Page/Login',
    component: Login,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    decorators: [withRouter],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        onClick: fn()
    },

} satisfies Meta<typeof Login>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
};

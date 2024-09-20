import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';
import UserManage from './page';

const meta = {
    title: 'AdminPage/UserManage',
    component: UserManage,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    decorators: [withRouter],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
    },

} satisfies Meta<typeof UserManage>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
};

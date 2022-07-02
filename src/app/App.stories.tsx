import React from "react";
import {action} from "@storybook/addon-actions";
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

const changeCallback = action("Value changed");


export const AppBaseExample = (props: any) => {
    return <App/>
}
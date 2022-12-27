import React from "react";
import {action} from "@storybook/addon-actions";
import {App} from "./App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}

const changeCallback = action("Value changed");


export const AppBaseExample = (props: any) => {
    return <App demo={true}/>
}
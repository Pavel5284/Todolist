import React from "react";
import {action} from "@storybook/addon-actions";
import {AppWithRedux} from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

const changeCallback = action("Value changed");


export const AppWithReduxBaseExample = (props: any) => {
    return <AppWithRedux/>
}
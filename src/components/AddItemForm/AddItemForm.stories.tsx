import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

const callback = action("Button 'add' was pressed inside the form");

export const AddItemFormExample = (props: any) => {
    return <AddItemForm addItem={callback} />
}
export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemForm addItem={callback} disabled={true}/>
}
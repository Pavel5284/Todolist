import React, {ChangeEvent} from "react";

type UniversalCheckBoxPropsType={
    callback:(checkedValue:boolean)=>void
    checked:boolean
}
export const UniversalCheckBox=(props:UniversalCheckBoxPropsType)=>{
    const onChangeHandler=(event:ChangeEvent<HTMLInputElement> )=>{
        props.callback(event.currentTarget.checked)
    }
    return(
    <input type="checkbox" onChange={onChangeHandler} checked={props.checked}/>
    )
}
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../utils/types";
import {useActions} from "../../utils/redux-utils";
import {appActions} from "../../features/CommonActions/App";

/*const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});*/

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbars() {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    const {setAppError} = useActions(appActions)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAppError({error:null})
    };

    const isOpen = error !== null

    return (
            <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" >
                    {error}
                </Alert>
            </Snackbar>
    );
}

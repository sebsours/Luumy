import { Alert, Collapse, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useContext } from "react"
import { SessionExpiredContext } from "../pages/UserList";

interface SessionExpiredProps
{
    open:boolean;
}

export default function SessionExpired(props: SessionExpiredProps)
{
    const {openSessionExpired, toggleSessionExpired} = useContext(SessionExpiredContext);
    return (
        
        <Collapse in={openSessionExpired}>
            <Alert severity="info" className="w-4/6 sm:w-2/5 absolute ml-auto mr-auto left-0 right-0 text-center top-3"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => toggleSessionExpired(false)}>
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }>
                You are not logged in. Click <strong className="text-accent"><a href="/">here</a></strong> to log in.
            </Alert>
        </Collapse>
    )
}
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "360px",
        borderRadius: 10,
        overflowY: "auto",
        maxHeight: 500,
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down('md')]: {
            width: "260px",
        },
    },
}));
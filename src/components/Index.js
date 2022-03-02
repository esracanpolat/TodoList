import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, Checkbox, TableRow } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, deleteTodo, editTodo } from '../Redux/action/action';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "360px",
        borderRadius: 10,
        backgroundColor: theme.palette.background.paper,
    },
}));
const Index = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const dispatch = useDispatch();
    const Todos = useSelector((state) => state.todoReducer).Todo;

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            if (value.status == false) { dispatch(editTodo({ id: value.id, status: true, task: value.task })); }
            newChecked.push(value);
        } else {
            if (value.status == true) {
                dispatch(editTodo({ id: value.id, status: false, task: value.task }));
            } newChecked.splice(currentIndex, 1);

        }
        setChecked(newChecked);
    };
    function handleDelete(id) {
        dispatch(deleteTodo(id))
    };
    function EditableTask(e, value) {
        dispatch(editTodo({ id: value.id, status: value.status, task: e.target.outerText }))
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "gray", position: "absolute", height: "100vh", width: "100vw", bottom: 0, left: 0, right: 0, top: 0 }}>
            <div style={{ width: "60vw" }}>
                <div style={{ marginBottom: 10 }}>
                    <Formik
                        initialValues={{ name: "" }}
                        onSubmit={async (values) => {
                            const uuid = Math.floor(Math.random() * 100);
                            dispatch(createTodo({ id: Todos.includes(uuid) == false ? uuid : Math.floor(Math.random() * 100), task: values.name, status: false }))
                        }}
                    >
                        <Form>
                            <div style={{ display: "inline-flex" }}>
                                <div>
                                    <Field name="name" type="text" style={{ height: 35, width: "50vw", borderRadius: 5 }} />
                                </div>
                                <div>
                                    <Button style={{ marginLeft: 20 }} type="submit" variant="contained" color="primary"> Add </Button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
                {Todos.length > 0 &&
                    <List className={classes.root} style={{ overflowX: "scroll" }}>
                        {Todos.map((value) => {
                            const labelId = value.id;
                            return (
                                <div>
                                    <ListItem key={value} role={undefined} >
                                        <div style={{ width: "10%" }}>
                                            <ListItemIcon dense button onClick={handleToggle(value)}>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                        </div>
                                        <div style={{ width: "40%" }}>
                                            <ListItemText id={labelId} primary={value.task} contentEditable={true} onBlur={(e) => EditableTask(e, value)} />
                                        </div>
                                        <div style={{ width: "40%" }}>
                                            <ListItemText id={labelId} primary={value.status == false ? "tamamlanmamış" : " tamamlanmış"} />
                                        </div>
                                        <div>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="comments">
                                                    <DeleteIcon style={{ color: "red" }} onClick={() => handleDelete(value.id)} />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </div>
                                    </ListItem>
                                </div>
                            );
                        })}
                    </List>}
            </div>
        </div>
    );
}

export default Index;

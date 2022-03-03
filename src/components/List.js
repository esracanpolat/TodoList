import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Checkbox, Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { deleteTodo, editTodo } from '../Redux/action/action';
import { useStyles } from '../assests/styles';
import { useDispatch, useSelector } from 'react-redux';
import { taskData } from "../data/task";
const TodoList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    var Todos = useSelector((state) => state.todoReducer).Todo;
    const [checked, setChecked] = useState([]);
    const [succesEditHandle, setSuccesEditHandle] = useState(false);
    const [errorEditHandle, setErrorEditHandle] = useState(false)

    useEffect(() => {
        taskData.map((value) => {
            dispatch(editTodo({ id: value.id, status: value.status, task: value.task }))
            value.status == true ? checked.push(value) : checked.splice(value)
        });
    }, []);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);

        if (currentIndex == -1) {
            if (value.status == false) {
                dispatch(editTodo({ id: value.id, status: true, task: value.task }));
            }

        } else {
            if (value.status == true) {
                dispatch(editTodo({ id: value.id, status: false, task: value.task }));
            }
        }
    };


    function handleDelete(id) {
        new Promise((resolve, reject) => {
            dispatch(deleteTodo(id))
            resolve();
        }).then(() => {
            setSuccesEditHandle(true);
            setTimeout(() => {
                setSuccesEditHandle(false);
            }, 2000);
        })
            .catch(() => {
                setErrorEditHandle(true)
                setTimeout(() => {
                    setErrorEditHandle(false);
                }, 2000);
            })

    };

    function EditableTask(e, value) {
        new Promise((resolve, reject) => {
            dispatch(editTodo({ id: value.id, status: value.status, task: e.target.outerText }))
            resolve();
        })
            .then(() => {
                setSuccesEditHandle(true);
                setTimeout(() => {
                    setSuccesEditHandle(false);
                }, 2000);
            })
            .catch(() => {
                setErrorEditHandle(true)
                setTimeout(() => {
                    setErrorEditHandle(false);
                }, 2000);
            })

    }


    return (<>

        <List className={classes.root}
            sx={{
                width: '100%',
                maxWidth: 260,
                bgcolor: 'background.paper',
                position: 'relative',
                overflowX: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
            }}
            dm={{
                width: '100%',
                maxWidth: 260,
                bgcolor: 'background.paper',
                position: 'relative',
                overflowX: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
            }}
        >
            {Todos.map((value) => {
                console.log(value, "value");
                const labelId = value.id;
                return (
                    <div style={{ width: "auto" }}>
                        <ListItem key={value} role={undefined} >
                            <div style={{ width: "10%" }}>
                                <ListItemIcon dense button onClick={handleToggle(value)}>
                                    <Checkbox
                                        edge="start"
                                        checked={value.status}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                            </div>
                            <div style={{ width: "50%" }}>
                                <ListItemText id={labelId} primary={value.status == false ? value.task : <p style={{ textDecoration: "line-through" }}>{value.task}</p>} contentEditable={true} onBlur={(e) => EditableTask(e, value)} />
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
        </List>
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={succesEditHandle}
            onRequestClose={() => setSuccesEditHandle(false)}
            transitionDuration={{ enter: 1000, exit: 5000 }}
            message="İşlemi başarılı"
        />
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={errorEditHandle}
            onRequestClose={() => setErrorEditHandle(false)}
            transitionDuration={{ enter: 1000, exit: 5000 }}
            message="İşlemi başarısız"
        />
    </>);
}

export default TodoList;

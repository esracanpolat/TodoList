import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Checkbox } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteTodo, editTodo } from '../Redux/action/action';
import { useStyles } from '../assests/styles';
import { useDispatch, useSelector } from 'react-redux';
import { taskData } from "../data/task";
const TodoList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    var Todos = useSelector((state) => state.todoReducer).Todo;
    const [checked, setChecked] = React.useState([0]);
    useEffect(() => {
        debugger;
        taskData.map((value) => dispatch(editTodo({ id: value.id, status: value.status, task: value.task })));
    }, []);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            if (value.status == false) {
                dispatch(editTodo({ id: value.id, status: true, task: value.task }));
            }
            debugger;
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

    console.log(Todos, "Todos");
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
                const labelId = value.id;
                return (
                    <div style={{ width: "auto" }}>
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

    </>);
}

export default TodoList;

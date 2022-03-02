import React from 'react';
import { Button } from '@material-ui/core';
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../Redux/action/action';
import '../assests/Index.scss';
import TodoList from './List';
const Index = () => {


    const dispatch = useDispatch();
    const Todos = useSelector((state) => state.todoReducer).Todo;


    return (
        <div className="appContanier">
            <div>
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
                <TodoList />
            </div>
        </div>
    );
}

export default Index;

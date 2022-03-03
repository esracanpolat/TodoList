import React, { useState } from 'react';
import { Button, Snackbar } from '@material-ui/core';
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../Redux/action/action';
import '../assests/Index.scss';
import TodoList from './List';

const Index = () => {
    const dispatch = useDispatch();
    const Todos = useSelector((state) => state.todoReducer).Todo;
    const [succesEditHandle, setSuccesEditHandle] = useState(false);
    const [errorEditHandle, setErrorEditHandle] = useState(false)

    return (
        <div className="appContanier">
            <div>
                <div style={{ marginBottom: 10 }} >
                    <Formik
                        initialValues={{ name: "" }}
                        onSubmit={async (values) => {
                            const uuid = Math.floor(Math.random() * 100);
                            new Promise((resolve, reject) => {
                                dispatch(createTodo({ id: Todos.includes(uuid) == false ? uuid : Math.floor(Math.random() * 100), task: values.name, status: false }))
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
                <TodoList succesEditHandle={succesEditHandle} errorEditHandle={errorEditHandle} setSuccesEditHandle={setSuccesEditHandle} setErrorEditHandle={setErrorEditHandle} />
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={succesEditHandle}
                onRequestClose={() => setSuccesEditHandle(false)}
                transitionDuration={{ enter: 1000, exit: 5000 }}
                message="Ekleme İşlemi başarılı"
            />
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={errorEditHandle}
                onRequestClose={() => setErrorEditHandle(false)}
                transitionDuration={{ enter: 1000, exit: 5000 }}
                message="Ekleme İşlemi başarısız"
            />
        </div>
    );
}

export default Index;

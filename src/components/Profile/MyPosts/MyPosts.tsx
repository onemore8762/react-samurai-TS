import React from 'react';
import s from './MyPosts.module.css';
import {Posts} from "./Posts/Posts";

import TextArea from "antd/es/input/TextArea";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {AddPostAC} from "../../../redux/profile-reducer";
import {Form, Formik} from "formik";
import {Button} from "antd";


type FormDataType = {
    newPostText: string
}


export const MyPosts: React.FC = React.memo(() => {
        const posts = useAppSelector(state => state.profilePage.posts)
        const dispatch = useAppDispatch()
        const onSubmit = (FormData: FormDataType) => {
            dispatch(AddPostAC(FormData.newPostText))
        }
        return (
            <div className={s.postsBlock}>
                <h2>MyPosts</h2>
                <Formik
                    initialValues={{newPostText: ''}}
                    onSubmit={(values,formikHelpers) => {
                        onSubmit(values)
                        formikHelpers.setFieldValue('newPostText', '')
                    }}
                >
                    {({setFieldValue, getFieldProps, submitForm}) => (
                        <Form>
                            <TextArea
                                value={getFieldProps('newPostText').value}
                                onChange={(e) => setFieldValue('newPostText', e.target.value)}
                                placeholder="Controlled autosize"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                            <Button onClick={submitForm} style={{marginTop: 15}}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
                <div className={s.posts}>
                    {posts.map(el => {
                        return <Posts key={el.id} message={el.message} like={el.likesCount}/>
                    })}

                </div>
            </div>

        );
    }
)



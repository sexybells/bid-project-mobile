import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { postMethod } from "@/src/network/method";

type ValueItem = {
    email: string;
    password: string;
    password_confirmation: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
};

export default function RegisterScreen() {
    const [showPassword, setShowPassword] = useState(false);

    const initialValues: ValueItem = {
        email: '',
        password: '',
        password_confirmation: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
    };

    const validateSchema = Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        password: Yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required('Mật khẩu là bắt buộc'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
            .required('Xác nhận mật khẩu là bắt buộc'),
        firstName: Yup.string().required('First name là bắt buộc'),
        lastName: Yup.string().required('Last name là bắt buộc'),
        phoneNumber: Yup.string().required('Số điện thoại là bắt buộc'),
    });

    const handleSubmit = async (values: ValueItem) => {
        await postMethod('/api/auth/register', values).then((res) => {
            console.log(res);
        })
    };

    return (
        <View style={styles.container}>
            <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={handleSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.form}>

                        {/* EMAIL */}
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập email"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                        />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        {/* PASSWORD */}
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.inputPassword}
                                placeholder="Nhập mật khẩu"
                                secureTextEntry={!showPassword}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'}</Text>
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        {/* CONFIRM PASSWORD */}
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry
                            value={values.password_confirmation}
                            onChangeText={handleChange('password_confirmation')}
                            onBlur={handleBlur('password_confirmation')}
                        />
                        {touched.password_confirmation && errors.password_confirmation && (
                            <Text style={styles.error}>{errors.password_confirmation}</Text>
                        )}

                        {/* FIRST NAME */}
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập First Name"
                            value={values.firstName}
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                        />
                        {touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

                        {/* LAST NAME */}
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập Last Name"
                            value={values.lastName}
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                        />
                        {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

                        {/* PHONE */}
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập số điện thoại"
                            value={values.phoneNumber}
                            onChangeText={handleChange('phoneNumber')}
                            onBlur={handleBlur('phoneNumber')}
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                            <Text style={styles.error}>{errors.phoneNumber}</Text>
                        )}

                        {/* SUBMIT */}
                        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Register</Text>
                        </TouchableOpacity>

                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    form: {
        width: '100%',
    },
    label: {
        marginTop: 14,
        marginBottom: 4,
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        alignItems: 'center',
        paddingRight: 10,
    },
    inputPassword: {
        flex: 1,
        padding: 12,
        fontSize: 16,
    },
    showText: {
        fontSize: 14,
        color: '#007BFF',
    },
    submitBtn: {
        backgroundColor: '#007BFF',
        padding: 14,
        borderRadius: 8,
        marginTop: 28,
    },
    submitText: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 3,
    },
});

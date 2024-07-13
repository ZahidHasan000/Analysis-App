import dayjs from "dayjs";
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { 
    Card, 
    Link, 
    Container, 
    Typography, 
    Box, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Stack, 
    TextField, 
    IconButton, 
    InputAdornment 
} from '@mui/material';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/Iconify';
import DateTimePicker from '../../components/DateTimePicker';
import UserDataService from "../../services/UserDataService";


const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 800,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));



export default function CreateUserForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const minDob = dayjs().subtract(18, "year").format("YYYY-MM-DD");
    const [role, setRole] = useState('user');
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    // name,
    // email,
    // password,
    // city,
    // state,
    // country,
    // occupation,
    // phoneNumber,
    // transactions,
    // role,

    const UserSchema = Yup.object().shape({
        name: Yup.string().min(5, 'Too Short!').max(50, 'Too Long!').required('First name required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
            .min(8, "Password must have at least 8 characters")
            .matches(/[0-9]/, "Must have a number")
            .matches(/[a-z]/, "Must have atleast one lowercase")
            .matches(/[A-Z]/, "Must have atleast one Uppercase")
            .matches(/[!@#$%^&*]/, "Must have atleast one special character"),
        confirmPassword: Yup.string().required("Please re-type your password").oneOf([Yup.ref("password"), null], "Passwords does not match"),
        dob: Yup.date().max(minDob, "Must be more than 18 years of age")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            dob: minDob,
            city: '',
            state: '',
            country: '',
            occupation: '',
            phoneNumber: '',
            role: 'user'
        },
        validationSchema: UserSchema,
        onSubmit: (values) => {
            console.log(values);
            UserDataService.create(values)
                .then((res) => {
                    console.log('Created User successfully.');
                    navigate('/dashboard', { replace: true });
                }).catch(e => {
                    setSubmitting(false);
                    formik.setFieldError('email', 'You are already registered');
                    console.log(e);
                });
        }
    });
    const { 
        values, 
        errors, 
        touched, 
        handleChange, 
        handleBlur, 
        handleSubmit, 
        isSubmitting, 
        setSubmitting, 
        getFieldProps 
    } = formik;

    return (
        <Container>
            <ContentStyle>
                <Typography variant="h4" gutterBottom>
                    Creating a new user
                </Typography>

                <Typography sx={{ color: 'text.secondary', mb: 5 }}>Welcome to use our solution</Typography>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                autoComplete="fullname"
                                type="text"
                                label="Full Name"
                                {...getFieldProps('name')}
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <TextField
                                fullWidth
                                autoComplete="username"
                                type="email"
                                label="Email address"
                                {...getFieldProps('email')}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="role-select-label" margin="dense" variant="outlined" {...getFieldProps('role')} value={role}
                                        error={Boolean(touched.role && errors.role)}
                                    >Select Role</InputLabel>
                                    <Select
                                        labelId="role-select-label"
                                        id="role-select"
                                        {...getFieldProps('role')}
                                        value={role}
                                        label="Select Role"
                                        onChange={handleRoleChange}
                                    >
                                        <MenuItem value={"user"}>User</MenuItem>
                                        <MenuItem value={"admin"}>Admin</MenuItem>
                                        <MenuItem value={"superadmin"}>Super Admin</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <DateTimePicker
                                        name="dob"
                                        label="Date of Birth"
                                        {...getFieldProps('dob')}
                                        error={Boolean(touched.dob && errors.dob)}
                                    />
                                </FormControl>
                            </Stack>
                            <TextField
                                fullWidth
                                autoComplete="current-password"
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                {...getFieldProps('password')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                            <TextField
                                fullWidth
                                autoComplete="current-password"
                                type={showPassword ? 'text' : 'password'}
                                label="Confirm Password"
                                {...getFieldProps('confirmPassword')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                            />

                            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                                Save Details
                            </LoadingButton>
                        </Stack>
                    </Form>
                </FormikProvider>
            </ContentStyle>
        </Container>

    );
}
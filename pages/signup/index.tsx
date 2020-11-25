import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useStyles} from "./style";
import {Copyright} from "@material-ui/icons";
import {PasswordRegex} from "../../src/constants/regex";
import * as Yup from "yup";
import {post} from "../../src/utils/api";
import {setItem} from "../../src/utils/common";
import {addUser} from "../../src/store/state/user";
import {useAppDispatch} from "../../src/store";
import {useRouter} from "next/router";
import {useFormik} from "formik";

const validationSchema = Yup.object({
	email: Yup.string()
		.required("Email is required")
		.email("Invalid email address"),
	password: Yup.string()
		.required("Password is required")
		.min(8, "Password is too short, it must contain at least 8 characters")
		.matches(PasswordRegex, {
			message:
				"Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol",
		}),
});

const initialValues = { firstName: '', lastName: '', email: '', password: '' }

export default function SignUp() {
	const classes = useStyles();
	const dispatch = useAppDispatch()
	const router = useRouter()

	const onSubmit = async (creds, actions) => {
		actions.setSubmitting(true)
		const data: any =  await post('/signup', creds)
		if (data.token) {
			setItem('token', data.token)
			setItem('user', creds.email)
			dispatch(addUser({ email: creds.email }))
			router.push('/profile')
		}
		actions.setSubmitting(false)
	}

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit
	})

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={formik.handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								{...formik.getFieldProps('firstName')}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								{...formik.getFieldProps('lastName')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								{...formik.getFieldProps('email')}
								error={!!formik.errors.email}
								helperText={formik.errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								{...formik.getFieldProps('password')}
								error={!!formik.errors.password}
								helperText={formik.errors.password}
							/>
						</Grid>
						{/*<Grid item xs={12}>*/}
						{/*	<FormControlLabel*/}
						{/*		control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
						{/*		label="I want to receive inspiration, marketing promotions and updates via email."*/}
						{/*	/>*/}
						{/*</Grid>*/}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/signin" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}

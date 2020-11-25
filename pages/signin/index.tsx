import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useFormik } from "formik";
import * as Yup from "yup";
import {PasswordRegex} from "../../src/constants/regex";
import { post } from "../../src/utils/api";
import {useAppDispatch} from "../../src/store";
import { addUser } from '../../src/store/state/user'
import {useStyles} from "./style";
import {setItem} from "../../src/utils/common";
import {useRouter} from "next/router";
import {Copyright} from "@material-ui/icons";
import {Link} from "@material-ui/core";

const initialValues = { email: '', password: '' }

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

export default function SignIn() {
	const classes = useStyles();
	const dispatch = useAppDispatch()
	const router = useRouter()

	const onSubmit = async (creds, actions) => {
		actions.setSubmitting(true)
		const data: any =  await post('/login', creds)
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
		<Grid container component="main" className={classes.root}>
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} onSubmit={formik.handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							{...formik.getFieldProps('email')}
							error={!!formik.errors.email}
							helperText={formik.errors.email}
						/>
						<TextField
							variant="outlined"
							margin="normal"
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
						{/*<FormControlLabel*/}
						{/*	control={<Checkbox value="remember" color="primary" />}*/}
						{/*	label="Remember me"*/}
						{/*/>*/}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container>
							{/*<Grid item xs>*/}
							{/*	<Link href="#" variant="body2">*/}
							{/*		Forgot password?*/}
							{/*	</Link>*/}
							{/*</Grid>*/}
							<Grid item>
								<Link href="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	)
}
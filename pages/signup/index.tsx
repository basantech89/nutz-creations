import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
import {RootState, useAppDispatch} from "../../src/store";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {CircularProgress, Snackbar} from "@material-ui/core";
import MuiAlert, {AlertProps, Color} from "@material-ui/lab/Alert";

declare interface IFeedback {
	message: string
	variant: Color
}

const validationSchema = Yup.object({
	firstName: Yup.string().required(),
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

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp() {
	const classes = useStyles();
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { status, error } = useSelector((state: RootState) => state.common)

	const [feedback, setFeedback] = React.useState<IFeedback>({ message: '', variant: 'success' })
	const [open, setOpen] = React.useState(false);
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const onSubmit = async (creds, actions) => {
		actions.setSubmitting(true)
		const { success, data, error }: any =  await post('/user', {
			first_name: creds.firstName,
			last_name: creds.lastName,
			email: creds.email,
			password: creds.password
		})

		const user = { email: creds.email, firstName: creds.firstName, lastName: creds.lastName }
		if (success) {
			setItem('token', data.token)
			setItem('user', user)
			router.push('/signin')
		} else {
			handleClick()
			setFeedback({ message: error.message, variant: 'error' })
		}
		actions.setSubmitting(false)
	}

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit
	})

	if (status === 'resolved' || status === 'idle') {
		return (
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} onSubmit={formik.handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									name="firstName"
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									{...formik.getFieldProps('firstName')}
									error={!!formik.errors.firstName && !!formik.touched.firstName}
									helperText={!!formik.touched.firstName && formik.errors.firstName}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
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
									{...formik.getFieldProps('email')}
									error={!!formik.errors.email && !!formik.touched.email}
									helperText={!!formik.touched.email && formik.errors.email}
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
									{...formik.getFieldProps('password')}
									error={!!formik.errors.password && !!formik.touched.password}
									helperText={!!formik.touched.password && formik.errors.password}
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
					<Copyright/>
				</Box>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity={feedback.variant}>
						{feedback.message}
					</Alert>
				</Snackbar>
			</Container>
		)
	} else if (status === 'pending') {
		return <CircularProgress />
	} else if (status === 'rejected') {
		throw new Error(error.message)
	} else {
		return <Typography variant='h2'> Signup Page </Typography>
	}
}

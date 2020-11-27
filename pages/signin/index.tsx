import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useFormik } from "formik";
import * as Yup from "yup";
import {PasswordRegex} from "../../src/constants/regex";
import { post } from "../../src/utils/api";
import {RootState, useAppDispatch} from "../../src/store";
import { addUser } from '../../src/store/state/user'
import {setItem} from "../../src/utils/common";
import {useRouter} from "next/router";
import {Copyright} from "@material-ui/icons";
import {CircularProgress, Link, Snackbar} from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		height: 'calc(100vh - 64px)',
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

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

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignIn() {
	const classes = useStyles();
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { status, error } = useSelector((state: RootState) => state.common)

	const [submitError, setSubmitError] = React.useState('')
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
		const { success, error, data }: any =  await post('/api/login', creds)
		if (success) {
			const user = { email: data.email, firstName: data.firstName, lastName: data.lastName }
			setItem('token', data.token)
			setItem('user', user)
			dispatch(addUser(user))
			router.push('/profile')
		} else {
			handleClick()
			setSubmitError(error)
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
			<Grid container component="main" className={classes.root}>
				<Grid item xs={false} sm={4} md={7} className={classes.image}/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon/>
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
								error={!!formik.touched.email && !!formik.errors.email}
								helperText={!!formik.touched.email && formik.errors.email}
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
								error={!!formik.touched.password && !!formik.errors.password}
								helperText={!!formik.touched.password && formik.errors.password}
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
								<Copyright/>
							</Box>
						</form>
					</div>
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="error">
							{submitError}
						</Alert>
					</Snackbar>
				</Grid>
			</Grid>
		)
	} else if (status === 'pending') {
		return <CircularProgress />
	} else if (status === 'rejected') {
		throw new Error(error.message)
	} else {
		return <Typography variant='h2'> Signin Page </Typography>
	}
}
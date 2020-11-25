import React from 'react'
import { useErrorFallbackStyles } from './style'
import { Typography } from '@material-ui/core'
import {FallbackProps} from "react-error-boundary";

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
	const classes = useErrorFallbackStyles()

	if (error) {
		return (
			<div>
				There was an error:{' '}
				<Typography variant='h1'>
					<pre className={classes.errorMess}> {error.message} </pre>
				</Typography>
			</div>
		)
	}

	return null
}

export default ErrorFallback

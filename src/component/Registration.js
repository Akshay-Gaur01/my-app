import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	TextField,
	Button,
	Grid,
	Box,
	InputAdornment,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RegistrationForm = () => {
	const [filledFields, setFilledFields] = useState({
		fullName: false,
		address: false,
		city: false,
		state: false,
		phoneNumber: false,
		dateOfBirth: false,
		gender: false,
		email: false,
	});

	const handleBlur = (e) => {
		const { name, value } = e.target;
		setFilledFields((prev) => ({
			...prev,
			[name]: !!value,
		}));
	};
	const handleOnfocus = (e) => {
		const { name, value } = e.target;
		setFilledFields((prev) => ({
			...prev,
			[name]: prev.name,
		}));
	};

	const formik = useFormik({
		initialValues: {
			fullName: "",
			address: "",
			city: "",
			state: "",
			phoneNumber: "",
			dateOfBirth: "",
			gender: "",
			email: "",
		},
		validationSchema: Yup.object({
			fullName: Yup.string()
				.matches(/^[a-zA-Z\s]+$/, "Invalid name")
				.required("Required field."),
			address: Yup.string().required(
				"Invalid Address.Please select from suggestions."
			),
			// city: Yup.string().required("Required field."),
			// state: Yup.string().required("Required field."),
			phoneNumber: Yup.string()
				.matches(/^\d{10}$/, "Invalid phone number.")
				.required("Required field."),
			dateOfBirth: Yup.date().required("Required field."),
			gender: Yup.string().required("Required field."),
			email: Yup.string().email("Invalid email address").required("Required"),
		}),
		onSubmit: (values) => {
			console.log(values);
			console.log(JSON.stringify(values, null, 2));
		},
	});

	const renderInputField = (id, name, label, placeholder) => {
		const hasError = formik.touched[name] && formik.errors[name];
		return (
			<Grid item xs={12}>
				<TextField
					type={name == "phoneNumber" ? "number" : ""}
					variant={name == "email" ? "outlined" : "filled"}
					fullWidth
					size={name == "email" ? "small" : "normal"}
					id={id}
					name={name}
					disabled={id == "city" ? true : id == "state" ? true : false}
					focused={hasError}
					label={hasError ? formik.errors[name] : label}
					value={formik.values[name]}
					placeholder={placeholder}
					onChange={formik.handleChange}
					onBlur={handleBlur}
					onFocus={handleOnfocus}
					color="success"
					style={{
						borderRadius: name == "gender" ? "0 0 0.4rem 0.4rem" : 0,
						margin: "0 0 0.05rem 0",
					}}
					InputLabelProps={{
						style: {
							fontSize: "0.85rem",
							fontWeight: "400",
							display: `${filledFields[name] ? "none" : ""}`,
							color: hasError ? "red" : "", // Change label color to red if there's an error
						},
					}}
					error={hasError}
					InputProps={{
						style: {
							fontSize: "0.9rem", // Adjust the font size here
							background: hasError ? "#fef1f2" : "#ffffff",
							borderRadius:
								name == "gender"
									? "0 0 0.4rem 0.4rem"
									: name == "email"
									? "0.4rem"
									: 0,
							textAlign: filledFields[name] ? "center" : "left",
							// outline: id == "email" ? "" : "1px solid #d1d5da",
						},
						endAdornment: (
							<InputAdornment position="end">
								{filledFields[name] ? (
									<CheckIcon color="success" />
								) : (
									<EditIcon color={hasError && "error"} />
								)}
							</InputAdornment>
						),
					}}
					sx={{
						"& .MuiFilledInput-root": {
							"&:before": {
								borderBottom: "none",
							},
						},
						"& .MuiFilledInput-root": {
							"&:after": {
								borderBottom: hasError && "none",
							},
						},
					}}
				/>
			</Grid>
		);
	};

	return (
		<Grid container item xs={12} backgroundColor={"#f3f6f8"}>
			<Grid item xs={6}>
				<img
					src="/assets/banner_1.png"
					style={{ height: "96vh", width: "48vw" }}
					alt=""
				/>
			</Grid>
			<Grid
				item
				xs={6}
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
					<img src="assets/logo.svg" style={{ height: "1.4rem" }} alt="err" />
					<Button
						type="submit"
						sx={{
							backgroundColor: "#ffffff",
							color: "#19ba9c",
							fontSize: "0.7rem",
							border: "2px solid #19ba9c", // Set the border color
							"&:hover": {
								backgroundColor: "#f0f0f0", // A slightly darker shade for the hover effect
							},
						}}
					>
						How it works
					</Button>
				</Box>
				<p
					style={{
						fontSize: "3.2rem",
						margin: "0.7rem",
						fontWeight: "400",
					}}
				>
					Sign up
				</p>
				<form onSubmit={formik.handleSubmit}>
					<Grid
						spacing={0}
						style={{
							maxWidth: "20rem",
						}}
					>
						<Grid
							container
							style={{
								boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
								border: "1px solid grey",
								borderRadius: "0.4rem",
							}}
						>
							<Grid item xs={12}>
								<Box
									style={{
										display: "flex",
										justifyContent: "flex-start",
										alignItems: "center",
										paddingLeft: "0.6rem",
										borderBottom: "1px solid grey",
										backgroundColor: "#ffffff",
										borderRadius: "0.4rem 0.4rem 0 0",
									}}
								>
									<img
										src="assets/icon.svg"
										style={{ height: "1.4rem" }}
										alt={"err"}
									/>
									<p
										style={{
											fontFamily: "sans-serif",
											fontWeight: "300",
											fontSize: "1.4rem",
										}}
									>
										Your information
									</p>
								</Box>
							</Grid>
							{renderInputField("fullName", "fullName", "Full Name")}
							{renderInputField(
								"address",
								"address",
								`Street address (eg.${"1 Elm Way"})`
							)}
							<Grid item xs={6}>
								{renderInputField("city", "city", "City")}
							</Grid>
							<Grid item xs={6}>
								{renderInputField("state", "state", "State")}
							</Grid>
							{renderInputField(
								"phoneNumber",
								"phoneNumber",
								"Mobile Number",
								"(000) 000-0000"
							)}
							{renderInputField(
								"dateOfBirth",
								"dateOfBirth",
								"Date of birth",
								"MM/DD/YYYY"
							)}
							{renderInputField("gender", "gender", "Gender")}
						</Grid>
						<Grid item xs={12} style={{ margin: "2rem 0" }}>
							{renderInputField("email", "email", "Email")}
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								fullWidth
								type="submit"
								sx={{
									backgroundColor: "#2b3648",
									color: "#fff",
									"&:hover": {
										backgroundColor: "#1f2836", // A slightly darker shade for the hover effect
									},
								}}
							>
								<img
									src="assets/messageBox.svg"
									style={{ height: "1.4rem", filter: "invert(1)" }}
									alt="err"
								/>
								Continue with email
							</Button>
							<Accordion
								sx={{
									border: "none",
									backgroundColor: "transparent",
									boxShadow: "none",
									"&:before": {
										display: "none", // Remove the before pseudo-element that adds a border
									},
								}}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1-content"
									id="panel1-header"
									sx={{
										backgroundColor: "transparent", // Ensure the summary has a transparent background
									}}
								>
									<Typography>
										<span
											style={{
												fontFamily: "sans-serif",
												fontWeight: "300",
												fontSize: "0.89rem",
												textAlign: "center",
											}}
										>
											By signing up, I agree to the{" "}
											<span style={{ color: "#19ba9c" }}>Offer Terms</span>
										</span>
									</Typography>
								</AccordionSummary>
								<AccordionDetails
									sx={{
										backgroundColor: "transparent", // Ensure the details have a transparent background
									}}
								>
									<Typography
										textAlign={"center"}
										fontSize={"0.64rem"}
										fontWeight={"600"}
									>
										I agree to the Offer Terms and understand I am creating a
										<br />
										Sharecare account . I agree to the Sharecare Privacy
										<br /> Policy, Terms, and, if applicable to me, the Privacy
										Notice
										<br /> for California Residents. I consent to Sharecare’s
										<br /> processing of any health information I may provide,
										for
										<br /> the purposes listed in the Privacy Policy. I agree to
										<br /> receive emails, offers, alerts, and other notices. I
										<br /> understand that I can opt-out of marketing
										<br /> communications at any time.
									</Typography>
								</AccordionDetails>
							</Accordion>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};

export default RegistrationForm;

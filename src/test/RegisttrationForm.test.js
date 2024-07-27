import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegistrationForm from "../component/Registration";

describe("RegistrationForm Component", () => {
	test("renders the form with all fields", () => {
		render(<RegistrationForm />);

		expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Street address/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Date of birth/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
	});

	test("validates required fields", async () => {
		render(<RegistrationForm />);

		fireEvent.blur(screen.getByLabelText(/Full Name/i));
		fireEvent.blur(screen.getByLabelText(/Street address/i));
		fireEvent.blur(screen.getByLabelText(/Mobile Number/i));
		fireEvent.blur(screen.getByLabelText(/Date of birth/i));
		fireEvent.blur(screen.getByLabelText(/Gender/i));
		fireEvent.blur(screen.getByLabelText(/Email/i));

		expect(await screen.findByText(/Required field/i)).toBeInTheDocument();
	});

	test("validates email format", async () => {
		render(<RegistrationForm />);

		fireEvent.change(screen.getByLabelText(/Email/i), {
			target: { value: "invalid-email" },
		});
		fireEvent.blur(screen.getByLabelText(/Email/i));

		expect(
			await screen.findByText(/Invalid email address/i)
		).toBeInTheDocument();
	});

	test("validates phone number format", async () => {
		render(<RegistrationForm />);

		fireEvent.change(screen.getByLabelText(/Mobile Number/i), {
			target: { value: "123" },
		});
		fireEvent.blur(screen.getByLabelText(/Mobile Number/i));

		expect(
			await screen.findByText(/Invalid phone number/i)
		).toBeInTheDocument();
	});

	test("submits the form with valid data", async () => {
		render(<RegistrationForm />);

		fireEvent.change(screen.getByLabelText(/Full Name/i), {
			target: { value: "John Doe" },
		});
		fireEvent.change(screen.getByLabelText(/Street address/i), {
			target: { value: "123 Main St" },
		});
		fireEvent.change(screen.getByLabelText(/City/i), {
			target: { value: "Metropolis" },
		});
		fireEvent.change(screen.getByLabelText(/State/i), {
			target: { value: "NY" },
		});
		fireEvent.change(screen.getByLabelText(/Mobile Number/i), {
			target: { value: "1234567890" },
		});
		fireEvent.change(screen.getByLabelText(/Date of birth/i), {
			target: { value: "2000-01-01" },
		});
		fireEvent.change(screen.getByLabelText(/Gender/i), {
			target: { value: "Male" },
		});
		fireEvent.change(screen.getByLabelText(/Email/i), {
			target: { value: "john.doe@example.com" },
		});

		fireEvent.submit(
			screen.getByRole("button", { name: /Continue with email/i })
		);

		// Add assertions to check for form submission behavior
	});

	// Add more test cases as needed
});

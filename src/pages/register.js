// pages/index.js
import Head from "next/head";
import RegistrationForm from "../component/Registration";

export default function Home() {
	return (
		<>
			<Head>
				<title>Sharecare Registration</title>
			</Head>
			<RegistrationForm />
		</>
	);
}

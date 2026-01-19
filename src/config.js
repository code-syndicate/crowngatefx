const config = {
	appName: "CrownGate FX",
	description:
		"CrownGate FX is a premium cryptocurrency broker. With a focus on security and simplicity, CrownGate FX allows you to buy and sell Bitcoin and other cryptocurrencies instantly and easily.",

	apiUrl: import.meta.env.PUBLIC_API_URL || "http://localhost:4321/api",

	authCookieKey: "AUTH_USER_ECCENTRIC",
	apiEndpoints: {
		createUser: "/users",
		logIn: "/sign-in",
		changePassword: "/change-password",
		resetPassword: "/reset-password",
		getUserByEmail: "/users",
		notifications: "/notifications",
		withdraw: "/withdraw",
		admin: "/admin",
		adminWithdraw: "/admin/withdraw",
		adminTopup: "/admin/topup",
		adminApprove: "/admin/approve",
		adminDecline: "/admin/decline",
	},
};

export default config;

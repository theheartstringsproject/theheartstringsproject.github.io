
export const stripeErrorTypes = {
	// Failure to connect to Stripe's API.
	API_CONNECTION_ERROR: 'api_connection_error',
	// API errors cover any other type of problem (e.g., a temporary problem with Stripe's servers) and are extremely uncommon.
	API_ERROR: 'api_error',
	// Failure to properly authenticate yourself in the request.
	AUTHENTICATION_ERROR: 'authentication_error',
	// Card errors are the most common type of error you should expect to handle. They result when the user enters a card that can't be charged for some reason.
	CARD_ERROR: 'card_error',
	// Invalid request errors arise when your request has invalid parameters.
	INVALID_REQUEST_ERROR: 'invalid_request_error',
	// Too many requests hit the API too quickly.
	RATE_LIMIT_ERROR: 'rate_limit_error'
}

export const stripeErrorCodes = {
	// The card number is not a valid credit card number.
	INVALID_NUMBER: 'invalid_number',
	// The card's expiration month is invalid.
	INVALID_EXPIRY_MONTH: 'invalid_expiry_month',
	// The card's expiration year is invalid.
	INVALID_EXPIRY_YEAR: 'invalid_expiry_year',
	// The card's security code is invalid.
	INVALID_CVC: 'invalid_cvc',
	// The card number is incorrect.
	INCORRECT_NUMBER: 'incorrect_number',
	// The card has expired.
	EXPIRED_CARD: 'expired_card',
	// The card's security code is incorrect.
	INCORRECT_CVC: 'incorrect_cvc',
	// The card's zip code failed validation.
	INCORRECT_ZIP: 'incorrect_zip',
	// The card was declined.
	CARD_DECLINED: 'card_declined',
	// There is no card on a customer that is being charged.
	MISSING: 'missing',
	// An error occurred while processing the card.
	PROCESSING_ERROR: 'processing_error'
}
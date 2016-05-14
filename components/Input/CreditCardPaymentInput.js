import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import InlineSVG from 'svg-inline-react'
import DonationCreditCardNumberInput from '../../containers/DonationCreditCardNumberInput'
import DonationCreditCardExpirationDateInput from '../../containers/DonationCreditCardExpirationDateInput'
import DonationCreditCardSecurityCodeInput from '../../containers/DonationCreditCardSecurityCodeInput'
import * as inputStates from '../../constants/InputStates'
import * as paymentFormStates from '../../constants/PaymentFormStates'
import './input.css'
import './credit-card-payment-input.css'
import { spring, Motion } from 'react-motion'

const ERROR_ICON = 'warning'

const CreditCardPaymentInput = React.createClass({

	componentDidMount: function() {

		// Focus on the correct field
		// switch ( this.props.payment.formStatescurrentField ) {
		// 	case paymentFormStates.CARD_NUMBER:
		// 		ReactDOM.findDOMNode( this.cardNumberInput ).focus()
		// 		break
		// 	case paymentFormStates.EXPIRATION_DATE:
		// 		ReactDOM.findDOMNode( this.expirationDateInput ).focus()
		// 		break
		// 	case paymentFormStates.SECURITY_CODE:
		// 		ReactDOM.findDOMNode( this.securityCodeInput ).focus()
		// 		break
		// 	default:
		// 		ReactDOM.findDOMNode( this.cardNumberInput ).focus()
		// }
	},

	getFieldStyles: function() {
		let currentField = this.props.payment.formState.currentField

		// Set default styles
		let styles = {
			cardNumberFieldWidth: 200,
			cardNumberFieldLeftPosition: 0,
			otherFieldsWidth: 2,
		}

		// It's possible that the card number ghosts are currently in the DOM,
		// but haven't been rendered yet in the context of this component.
		// As a result, we need to check whether they actually exist outside of REACT,
		// and potentially use their sizes directly until the REACT ref is available.
		let cardNumberGhostWidth = this.cardNumberGhost ? this.cardNumberGhost.scrollWidth : this.props.payment.formState.cardNumberGhostWidth
		let abbreviatedCardNumberGhostWidth = this.abbreviatedCardNumberGhost ? this.abbreviatedCardNumberGhost.scrollWidth : this.props.payment.formState.abbreviatedCardNumberGhostWidth
		let fieldsWidth = this.fields ? this.fields.scrollWidth : this.props.payment.formState.fieldsWidth
		
		// Only set styles different from default
		// if we're not in credit card number mode
		if ( currentField !== paymentFormStates.CARD_NUMBER ) {
			if ( cardNumberGhostWidth ) {
				styles.cardNumberFieldWidth = cardNumberGhostWidth
			}
			if ( fieldsWidth && abbreviatedCardNumberGhostWidth ) {
				styles.otherFieldsWidth = ( (fieldsWidth - abbreviatedCardNumberGhostWidth) / 2) - 16
			}

			if ( cardNumberGhostWidth && abbreviatedCardNumberGhostWidth ) {
				styles.cardNumberFieldLeftPosition = -(cardNumberGhostWidth - abbreviatedCardNumberGhostWidth) + 16 // Always add 8 because this trails the last character added by the user
			}
		}
			
		return styles

	},

	getCardNumber: function() {
		let number = ''

		if ( this.cardNumberInput && this.cardNumberInput.getWrappedInstance().field ) {
			number = this.cardNumberInput.getWrappedInstance().field.value()
		}

		return number
	},

	getAbbreviatedCardNumber: function() {
		// let number = ''

		// if ( this.cardNumberInput && this.cardNumberInput.getWrappedInstance().field ) {
		// 	let field = this.cardNumberInput.getWrappedInstance().field
		// 	number = field.cardType() === 'amex' ? field.value().slice( -5 ) : field.value().slice( -4 )
		// }

		// return number

		return  this.props.payment.cardNumber.type === 'amex' ?
				this.props.payment.cardNumber.value.slice( -5 ) :
				this.props.payment.cardNumber.value.slice( -4 )
	},

	render: function() {
		// let creditCardNumberInputWidthWhenCurrentField = this.originalCreditCardInputWidth ? this.originalCreditCardInputWidth : 180
		let { cardNumberFieldWidth, cardNumberFieldLeftPosition, otherFieldsWidth } = this.getFieldStyles()
		let style = {
			cardNumberFieldWidth: spring( cardNumberFieldWidth ),
			otherFieldsWidth: spring( otherFieldsWidth ),
			cardNumberFieldLeftPosition: spring( cardNumberFieldLeftPosition )
		}

		// Check whether we should render in an error state
		let icon = this.props.icon,
			errorClass = ''
		if ( this.props.payment.cardNumber.status === inputStates.INVALID ||
			 this.props.payment.cardNumber.status === inputStates.EXPIRED ||
			 this.props.payment.cardNumber.status === inputStates.INCORRECT ||
			 this.props.payment.cardNumber.status === inputStates.DECLINED ||
			 this.props.payment.expirationDate.status === inputStates.INVALID ||
			 this.props.payment.securityCode.status === inputStates.INVALID ||
			 this.props.payment.securityCode.status === inputStates.INCORRECT )
		{

			icon = ERROR_ICON
			errorClass = 'Error'
		}

		return (
			<div className={`Input CreditCardPaymentInput ${this.props.payment.formState.currentField} ${errorClass}`}>
				<InlineSVG src={require(`svg-inline!../../icons/${icon}.svg`)} />
				<div className="fields-container">
					<Motion style={style}>
					{interpolatedStyle => {
						return (
							<div    className={paymentFormStates.FIELDS_CLASS}
									key='fields'
									ref={(ref) => this.fields = ref}
							>
								<div    className={paymentFormStates.ABBREVIATED_CARD_NUMBER_GHOST_CLASS}
										ref={(ref) => this.abbreviatedCardNumberGhost = ref}>
											{this.getAbbreviatedCardNumber()}
								</div>
								<div    className={paymentFormStates.CARD_NUMBER_GHOST_CLASS}
										ref={(ref) => this.cardNumberGhost = ref}>
											{/*this.getCardNumber()*/ this.props.payment.cardNumber.value}
								</div>
								<DonationCreditCardNumberInput
									style={{
										width: interpolatedStyle.cardNumberFieldWidth + 'px',
										marginLeft: interpolatedStyle.cardNumberFieldLeftPosition + 'px'
									}}
									cardNumber={this.props.payment.cardNumber}
									ref={(ref) => this.cardNumberInput = ref}
									onShouldMoveToExpirationDateField={() => ReactDOM.findDOMNode( this.expirationDateInput ).focus()}
								/>
								<DonationCreditCardExpirationDateInput
									expirationDate={this.props.payment.expirationDate}
									style={{
										width: interpolatedStyle.otherFieldsWidth + 'px'
									}}
									ref={(ref) => this.expirationDateInput = ref}
									onShouldMoveToSecurityCodeField={() => ReactDOM.findDOMNode( this.securityCodeInput ).focus()}
								/>
								<DonationCreditCardSecurityCodeInput
									securityCode={this.props.payment.securityCode}
									style={{
										width: interpolatedStyle.otherFieldsWidth + 'px'
									}}
									ref={(ref) => this.securityCodeInput = ref}
								/>
							</div>
						)
					}}
					</Motion>
				</div>
			</div>
		)
	}
})

export default CreditCardPaymentInput
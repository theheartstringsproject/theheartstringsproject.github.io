import React, { PropTypes } from 'react'
import FieldKit from 'field-kit';
import ReactDOM from 'react-dom'
import InlineSVG from 'svg-inline-react'
import DonationCreditCardNumberInput from '../../containers/DonationCreditCardNumberInput'
import DonationCreditCardExpirationDateInput from '../../containers/DonationCreditCardExpirationDateInput'
import DonationCreditCardSecurityCodeInput from '../../containers/DonationCreditCardSecurityCodeInput'
import './input.css'
import './credit-card-payment-input.css'
import { spring, Motion } from 'react-motion'

const CreditCardPaymentInput = React.createClass({

	getFieldStyles: function() {
		let currentField = this.props.payment.currentField

		// Set default styles
		let styles = {
			cardNumberFieldWidth: 200,
			cardNumberFieldLeftPosition: 0,
			otherFieldsWidth: 2,
		}

		// Only set styles different from default
		// if we're not in credit card number mode
		if ( currentField !== 'CreditCardNumber' ) {
			if ( this.cardNumberGhost ) {
				styles.cardNumberFieldWidth = this.cardNumberGhost.scrollWidth
			}
			if ( this.fields && this.abbreviatedCardNumberGhost) {
				styles.otherFieldsWidth = ( (this.fields.scrollWidth - this.abbreviatedCardNumberGhost.scrollWidth) / 2) - 16
			}

			if ( this.cardNumberGhost && this.abbreviatedCardNumberGhost) {
				styles.cardNumberFieldLeftPosition = -(this.cardNumberGhost.scrollWidth - this.abbreviatedCardNumberGhost.scrollWidth) + 16 // Always add 8 because this trails the last character added by the user
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
		let number = ''

		if ( this.cardNumberInput && this.cardNumberInput.getWrappedInstance().field ) {
			let field = this.cardNumberInput.getWrappedInstance().field
			number = field.cardType() === 'amex' ? field.value().slice( -5 ) : field.value().slice( -4 )
		}

		return number
	},

	render: function() {
		// let creditCardNumberInputWidthWhenCurrentField = this.originalCreditCardInputWidth ? this.originalCreditCardInputWidth : 180
		let { cardNumberFieldWidth, cardNumberFieldLeftPosition, otherFieldsWidth } = this.getFieldStyles()
		let style = {
			cardNumberFieldWidth: spring( cardNumberFieldWidth ),
			otherFieldsWidth: spring( otherFieldsWidth ),
			cardNumberFieldLeftPosition: spring( cardNumberFieldLeftPosition )
		}

		return (
			<div className={`Input CreditCardPaymentInput ${this.props.payment.currentField}`}>
				<InlineSVG src={require(`svg-inline!../../icons/${this.props.icon}.svg`)} />
				<div className="fields-container">
					<Motion style={style}>
					{interpolatedStyle => {
						return (
							<div    className="fields"
									key='fields'
									ref={(ref) => this.fields = ref}
							>
								<div    className='AbbreviatedCardNumberGhost'
										ref={(ref) => this.abbreviatedCardNumberGhost = ref}>
											{this.getAbbreviatedCardNumber()}
								</div>
								<div    className='CardNumberGhost'
										ref={(ref) => this.cardNumberGhost = ref}>
											{this.getCardNumber()}
								</div>
								<DonationCreditCardNumberInput
									style={{
										width: interpolatedStyle.cardNumberFieldWidth + 'px',
										marginLeft: interpolatedStyle.cardNumberFieldLeftPosition + 'px'
									}}
									cardNumber={this.props.payment.cardNumber}
									ref={(ref) => this.cardNumberInput = ref}
								/>
								<DonationCreditCardExpirationDateInput
									expirationDate={this.props.payment.expirationDate}
									style={{
										width: interpolatedStyle.otherFieldsWidth + 'px'
									}}
									ref={(ref) => this.expirationDateInput = ref}
								/>
								<DonationCreditCardSecurityCodeInput
										securityCode={this.props.payment.securityCode}
										style={{
											width: interpolatedStyle.otherFieldsWidth + 'px'
										}}
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
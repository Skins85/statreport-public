import CookieConsent from 'react-cookie-consent';
import React from 'react';

export default function CookieNotice() { 

    // Ensure cookie consent button text always reads as defined
    const consentBtn = document.querySelector('#rcc-confirm-button');
    if (consentBtn) {
        consentBtn.innerHTML = 'I agree';
    };

    return (
        <React.Fragment>
            <CookieConsent
                location="bottom"
                buttonText="I agree"
                cookieName="StatReport cookie"
                expires={1}
            >
                <p>This website uses cookies to enhance the user experience. <a href='./cookies'>Find out more</a></p>
            </CookieConsent>
        </React.Fragment>
    )
    
}
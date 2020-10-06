import React from 'react'

export interface IFormErrors {
    formErrors: { [key: string]: string }
}

export const FormErrors: React.FunctionComponent<IFormErrors> = ({ formErrors }) =>
    <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <p key={i}>{formErrors[fieldName]}</p>
                )
            } else {
                return '';
            }
        })}
    </div>
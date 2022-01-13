import React, { useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import './ProgressSpinner.css';
const ProgressSpinnerComp = () => {

    return (
        <ProgressSpinner className="progressSpinnerCss" strokeWidth="1" animationDuration=".5s"/>
    );
}
export default ProgressSpinnerComp;
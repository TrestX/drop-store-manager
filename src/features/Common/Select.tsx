import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
const DropdownSelect = ({options,defaultValue,setSelectedOption}:{options:any,defaultValue:any,setSelectedOption:any}) => {
    const logOut =(e:any)=>{
        if(e && e['name']==='Log out'){
            sessionStorage.clear()
            window.location.href="/"
        }
    }
    return (
        <div>
            <div className="card">
                <Dropdown options={options} optionLabel="name" placeholder="Admin" onChange={(e)=>{logOut(e.value)}} />
            </div>
        </div>
    );
}
export default DropdownSelect;
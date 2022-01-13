import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import '../shopScreen/Dropdown.css';

const DropdownComp = ({sellers,setSellerID}:{sellers:any,setSellerID:any}) => {
    const [selectedSeller, setSelectedSeller] = useState<any>(null);
    const onSellerChange = (e: {value: any}) => {
        if(e['target']!==undefined && e['target']['value'] !==undefined && e['target']['value']['user_id'] !== undefined){
            setSellerID(e['target']['value']['user_id'])
        }
        setSelectedSeller(e.value);
    }
    const selectedSellerTemplate = (option: any, props: { placeholder: string }) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    {/*<img alt={option.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target['src'] = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />*/}
                    <div>{option.name}</div>
                </div>
            );
        }
        return (
            <span>
                {props.placeholder}
            </span>
        );
    }
    const sellerOptionTemplate = (option: any) => {
        return (
            <div className="country-item">
                {/*<img alt={option.id} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target['src'] = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />*/}
                <div>{option.name}</div>
            </div>
        );
    }


    return (
        <div className="dropdown-demo">
                <Dropdown value={selectedSeller} options={sellers.data} onChange={onSellerChange} optionLabel="email" filter showClear filterBy="email" placeholder="Select a Delivery Person"
                    valueTemplate={selectedSellerTemplate} itemTemplate={sellerOptionTemplate} />
        </div>
    );
}
export default DropdownComp
import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import './Dropdown.css';

const DropdownComp = ({sv,sellers,setSellerID}:{sv:any,sellers:any,setSellerID:any}) => {
    const [selectedSeller, setSelectedSeller] = useState<any>();
    const onSellerChange = (e: {value: any}) => {
        if(e['target']!==undefined && e['target']['value'] !==undefined && e['target']['value']['user_id'] !== undefined){
            console.log(e['target']['value']);
            setSellerID(e['target']['value']);
        }
        setSelectedSeller(e.value);
    }
    const selectedSellerTemplate = (option: any, props: { placeholder: string }) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    {/*<img alt={option.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target['src'] = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />*/}
                    <div>{option.shop_name}</div>
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
                <div>{option.shop_name}</div>
            </div>
        );
    }


    return (
        <div className="dropdown-demo">{console.log(sellers.data)}
                <Dropdown value={selectedSeller} options={sellers.data} onChange={onSellerChange} optionLabel="email" filter showClear filterBy="email" placeholder={sv?sv:"Select a Shop"}
                    valueTemplate={selectedSellerTemplate} itemTemplate={sellerOptionTemplate} />
        </div>
    );
}
export default DropdownComp
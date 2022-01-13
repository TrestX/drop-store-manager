import React, { useEffect, useState, useRef } from 'react';
import { GMap } from 'primereact/gmap';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { loadGoogleMaps, removeGoogleMaps } from './GoogleMaps';

const GMapComp = ({latitude,longitude}:{latitude:any,longitude:any}) => {

    const [googleMapsReady, setGoogleMapsReady] = useState(false);
    const [overlays, setOverlays] = useState<any>(null);
    const toast:any = useRef(null);
    useEffect(() => {
        loadGoogleMaps(() => {
            setGoogleMapsReady(true);
        });
        return () => {
            removeGoogleMaps();
        }
    },[])
    const onMapReady = (event) => {
        setOverlays(
            [
                new google.maps.Marker({position: {lat: latitude, lng: longitude}, title:"Address"}),
            ]
        );
    }
    const options = {
        center: {lat: latitude, lng: longitude},
        zoom: 6
    };

    return (
        <div>
            <Toast ref={toast}></Toast>

            {
                googleMapsReady && (
                    <div className="card">
                        <GMap overlays={overlays} options={options} style={{width: '100%', minHeight: '157px'}} onMapReady={onMapReady}/>
                    </div>
                )
            }
        </div>
    );
}

export default GMapComp;
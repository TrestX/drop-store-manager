import React, { useEffect, useState, useRef } from 'react';
import { GMap } from 'primereact/gmap';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { loadGoogleMaps, removeGoogleMaps } from './GoogleMaps';

const GMaps = ({lat,long,setLat,setLong}:{lat:any,long:any,setLat:any,setLong:any}) => {

    const [googleMapsReady, setGoogleMapsReady] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [markerTitle, setMarkerTitle] = useState('');
    const [draggableMarker, setDraggableMarker] = useState(false);
    const [overlays, setOverlays] = useState<any[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<any>();

    const toast:any = useRef(null);

    useEffect(() => {
        loadGoogleMaps(() => {
            setGoogleMapsReady(true);
        });

        return () => {
            removeGoogleMaps();
        }
    },[])

    const onMapClick = (event) => {
        setDialogVisible(true);
        setSelectedPosition(event.latLng)
    }

    const handleDragEnd = (event) => {
        toast['current'].show({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
    }

    const addMarker = () => {
        let newMarker = new google.maps.Marker({
                            position: {
                                lat: selectedPosition.lat(),
                                lng: selectedPosition.lng()
                            },
                            title: markerTitle,
                            draggable: draggableMarker
                        });
        setLat(selectedPosition.lat())
        setLong(selectedPosition.lng())
        setOverlays([...overlays, newMarker]);
        setDialogVisible(false);
        setDraggableMarker(false);
        setMarkerTitle('');
    }
    let markers:google.maps.Marker[] = []
    const onMapReady = (event) => {

        let marker2 = new google.maps.Marker({animation: google.maps.Animation.DROP,position: {lat: lat, lng: long}, title:"Coordinates"});
        markers.push( marker2);
        setOverlays(
                markers
        );
    }

    const options = {
        center: {lat: lat, lng: long},
        zoom: 9
    };

    const footer = <div>
        <Button label="Yes" icon="pi pi-check" onClick={addMarker} />
        <Button label="No" icon="pi pi-times" onClick={()=>setDialogVisible(false)} />
    </div>;

    return (
        <div>
            <Toast ref={toast}></Toast>

            {
                googleMapsReady && (
                    <div className="card">
                        <GMap overlays={overlays} options={options} style={{width: '100%', minHeight: '320px'}} onMapReady={onMapReady}
                            onMapClick={onMapClick} onOverlayDragEnd={handleDragEnd} />
                    </div>
                )
            }

            <Dialog header="New Location" visible={dialogVisible} modal footer={footer} onHide={()=>setDialogVisible(false)}>
                <div className="p-grid p-fluid">
                    <div className="p-col-2" style={{paddingTop:'.75em'}}><label htmlFor="title">Label</label></div>
                    <div className="p-col-10"><InputText type="text" id="title" value={markerTitle} onChange={(e) => setMarkerTitle(e.target.value)} /></div>

                    <div className="p-col-2" style={{paddingTop:'.75em'}}>Lat</div>
                    <div className="p-col-10"><InputText readOnly value={selectedPosition ? selectedPosition.lat() : ''} /></div>

                    <div className="p-col-2" style={{paddingTop:'.75em'}}>Lng</div>
                    <div className="p-col-10"><InputText readOnly value={selectedPosition ? selectedPosition.lng() : ''} /></div>

                    <div className="p-col-2" style={{paddingTop:'.75em'}}><label htmlFor="drg">Drag</label></div>
                    <div className="p-col-10"><Checkbox checked={draggableMarker} onChange={(event) => setDraggableMarker(event.checked)}/></div>
                </div>
            </Dialog>
        </div>
    );
}
export default GMaps
import React, { useEffect, useState, useRef } from 'react';
import { GMap } from 'primereact/gmap';
import { Toast } from 'primereact/toast';
import { loadGoogleMaps, removeGoogleMaps } from '../UsersScreen/GoogleMaps';

const GMapComp = ({list,l2}:{list:any,l2:any}) => {

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
    let markers:google.maps.Marker[] = []
    function toggleBounce(mar:any) {

        if (mar.getAnimation() !== null) {
            mar.setAnimation(null);
        } else {
            mar.setAnimation(google.maps.Animation.DROP);
        }
    }
    function openInfo(mar:any,info:any) {
        const map = mar.getMap();
        info.open({
            anchor: mar,
            map,
            shouldFocus: false,
          });
    }
    
    const onMapReady = (event) => {
        list.map((item)=>{
            const contentString =
            '<div class="row">' +
                '<div class="column" style="margin-left:20px">'+
                    `<img src=${item.shop_logo} width=100 height=70 style="object-fit:contain;border-radius:10px;marginleft:20px"/>` +
                '</div>' +
                '<div class="column" style="margin-left:30px">'+
                    `<h1 id="firstHeading" class="firstHeading" style="font-size:12px">${item.shop_name}</h1>` +
                    '<div id="bodyContent">' +
                        `<h5 style="font-size:9px"><b>Address:</b> ${item.address}</h5>` +
                        `<h5 style="font-size:9px">${item.city}, ${item.state}, ${item.country} ${item.pin}</h5>` +
                        `<h5 style="font-size:9px"><b>Current status:</b> ${item.shop_status}</h5>` +
                        `<h5 style="font-size:9px"><b>Description:</b> ${item.shop_description}</h5>` +
                        `<h5 style="font-size:9px"><b>Current deal:</b> ${item.deal?item.deal:"no deal"}</h5>` +
                        `<h5 style="font-size:9px"><b>Seller contact:</b> ${item.sellerEmail}</h5>` +
                        `<h5 style="font-size:9px"><b>Shop type:</b> ${item.type}</h5>` +
                        `<h5 style="font-size:9px"><b>Shop timing:</b> ${item.timing}</h5>`+
                    '</div>'+
                '</div>'+
            "</div>";
            let infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 2000,
            });
            let urrl = 'https://img.icons8.com/emoji/48/000000/convenience-store.png';
            if (item.type=="Grocery Store"){
                urrl = 'https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-store-building-wanicon-flat-wanicon.png'
            }
            if (item.type=="Restaurant"){
                urrl = 'https://img.icons8.com/external-ddara-flat-ddara/64/000000/external-food-store-music-fest-ddara-flat-ddara.png'
            }
            let marker2 = new google.maps.Marker({animation: google.maps.Animation.DROP,position: {lat: item.geo_location.coordinates[0], lng: item.geo_location.coordinates[1]}, title:"Shop", icon:{url:urrl,anchor: new google.maps.Point(17, 46),scaledSize: new google.maps.Size(37, 37)}});
            marker2.addListener("click", ()=>{toggleBounce(marker2);openInfo(marker2,infowindow)});
            markers.push( marker2);
        })
        if (l2!=null && l2.length>0){
            console.log(l2)
            l2.map((item)=>{
                console.log(item);
                const contentString =
                '<div class="row">' +
                    '<div class="column" style="margin-left:20px">'+
                        `<img src=${item.shopDetails.shop_logo} width=100 height=70 style="object-fit:contain;border-radius:10px;marginleft:20px"/>` +
                    '</div>' +
                    '<div class="column" style="margin-left:30px">'+
                        `<h1 id="firstHeading" class="firstHeading" style="font-size:12px">${item.shopDetails.shop_name}</h1>` +
                        '<div id="bodyContent">' +
                            `<h5 style="font-size:9px"><b>Shop Address:</b> ${item.shopDetails.address}</h5>` +
                            `<h5 style="font-size:9px">${item.shopDetails.city}, ${item.shopDetails.state}, ${item.shopDetails.country} ${item.shopDetails.pin}</h5>` +
                            `<h5 style="font-size:9px"><b>Current status:</b> ${item.shopDetails.shop_status}</h5>` +
                            `<h5 style="font-size:9px"><b>Description:</b> ${item.shopDetails.shop_description}</h5>` +
                            `<h5 style="font-size:9px"><b>Current deal:</b> ${item.shopDetails.deal?item.shopDetails.deal:"no deal"}</h5>` +
                            `<h5 style="font-size:9px"><b>Seller contact:</b> ${item.shopDetails.sellerEmail}</h5>` +
                            `<h5 style="font-size:9px"><b>Shop type:</b> ${item.shopDetails.type}</h5>` +
                            `<h5 style="font-size:9px"><b>Shop timing:</b> ${item.shopDetails.timing}</h5>`+
                        '</div>'+
                    '</div>'+
                    '<div class="column" style="margin-left:30px">'+
                    `<h1 id="firstHeading" class="firstHeading" style="font-size:12px">${item.deliveryDetails.name}</h1>` +
                    '<div id="bodyContent">' +
                        `<h5 style="font-size:9px"><b>Shop Address:</b> ${item.deliveryDetails.address.address}</h5>` +
                        `<h5 style="font-size:9px">${item.deliveryDetails.address.city}, ${item.deliveryDetails.address.state}, ${item.deliveryDetails.address.country} ${item.deliveryDetails.address.pin}</h5>` +
                        `<h5 style="font-size:9px"><b>Phone number:</b> ${item.deliveryDetails.phone}</h5>` +
                        `<h5 style="font-size:9px"><b>Email:</b> ${item.deliveryDetails.email}</h5>` +
                        `<h5 style="font-size:9px"><b>Coupon code:</b> ${item.coupon_code?item.coupon_code:"no coupon code"}</h5>` +
                        `<h5 style="font-size:9px"><b>Payment method:</b> ${item.payment_method}</h5>` +
                        `<h5 style="font-size:9px"><b>Order status:</b> ${item.orderStatus}</h5>` +
                    '</div>'+
                '</div>'+
                "</div>";
                let infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 2000,
                });
                let urrl = 'https://img.icons8.com/color/50/000000/checked-truck.png';
                if (item.orderStatus=="Ordered"){
                    urrl = 'https://img.icons8.com/color/48/000000/food-bar.png'
                }
                if (item.orderStatus=="Accepted"){
                    urrl = 'https://img.icons8.com/cotton/50/000000/take-away-food.png'
                }
                if (item.orderStatus=="Ready"){
                    urrl = 'https://img.icons8.com/cotton/50/000000/take-away-food.png'
                }
                let marker2 = new google.maps.Marker({animation: google.maps.Animation.DROP,position: {lat: item.deliveryDetails.address.geo_location.coordinates[0], lng: item.deliveryDetails.address.geo_location.coordinates[1]}, title:"Orders", icon:{url:urrl,anchor: new google.maps.Point(17, 46),scaledSize: new google.maps.Size(37, 37)}});
                marker2.addListener("click", ()=>{toggleBounce(marker2);openInfo(marker2,infowindow)});
                markers.push( marker2);
            })
        }
        setOverlays(
                markers
        );
    }
    const options = {
        center: {lat: list[0].geo_location.coordinates[0], lng: list[0].geo_location.coordinates[1]},
        zoom: 9
    };

    return (
        <div>
            <Toast ref={toast}></Toast>

            {
                googleMapsReady && (
                    <div className="card">
                        <GMap overlays={overlays} options={options} style={{width: '100%', minHeight: '620px'}} onMapReady={onMapReady}
                               />
                    </div>
                )
            }
        </div>
    );
}

export default GMapComp;
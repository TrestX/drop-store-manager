import React from 'react';
import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import {useState} from 'react';
import { Button } from 'primereact/button';
import { Card,Row,Col } from 'react-bootstrap';
import './chart.css';
const MLineCharts = ({label1,label2,color1,color2,data1,data2}:{label1:any,label2:any,color1:any,color2:any,data1:any,data2:any}) => {
    
    
    const basicData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: label1,
                data: data1,
                fill: true,
                borderColor: '#42A5F5',
                backgroundColor: color1,
                tension: .4
            },
            {
                label: label2,
                data: data2,
                fill: true,
                borderColor: '#FFA726',
                backgroundColor: color2,
                tension: .4
            }
        ]
    };

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            basicOptions
        }
    }

    const { basicOptions } = getLightTheme();
    const [dates0, setDates0] = useState<Date | Date[] | undefined | any>([new Date(new Date().getFullYear(), new Date().getMonth(), 1),new Date()]);
    return (
        <div>
            <Card className="card" style={{minHeight:"100%"}}>
                <Card.Header style={{backgroundColor:'white'}}>
<Row>
    <Col md={7}>
    <h1 style={{color:"#fe385c",fontSize:'21px',fontWeight:800,textAlign:"left",paddingTop:'15px'}}>{label1.split(" ")[1]}</h1>
    </Col>
    <Col md={5} >
    <Calendar id="range" value={dates0} onChange={(e) => {setDates0(e.value)}} selectionMode="range" readOnlyInput placeholder="Select Dates" showIcon style={{marginRight:"10px",width:"227px",marginBottom:"5px",marginTop:"10px",marginLeft:"auto",color:'#fe385c'}}/>
        </Col>
</Row>
                
                
                
                </Card.Header>
                <Chart type="line" style={{padding:"30px"}} data={basicData} options={basicOptions} />
            </Card>
        </div>
    )
}

export default MLineCharts;
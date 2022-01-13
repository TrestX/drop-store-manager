import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Card, Row, Col } from 'react-bootstrap';
import { Divider } from 'primereact/divider';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
const OptionLC = ({opts}:{opts:any}) => {

    const [cn,setCN]=useState('')
    const [n,setN]=useState('')
    const [cp,setCP] = useState(0)
    const [cl,setCL] = useState<any>([])
    const [valuesC, setValuesC] = useState<any>([
        <>
          <Row style={{marginTop:"30px"}}>
            <Col xs={6} sm={6} md={4} lg={4}>
              <label className="customLabel"></label>
            </Col>
            <Col>
              <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
                  <label className="customLabel">Name</label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <InputText
                    className="customFields"
                    placeholder="Name"
                    onChange={(e)=>{setCN(e.target.value)}}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
          <Col xs={6} sm={6} md={4} lg={4}>
              <label className="customLabel"></label>
            </Col>
            <Col>
              <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
              <label className="customLabel">Price</label>
            </Col>
            <Col xs={12} sm={12} md={9} lg={9}>
              <InputNumber
                inputId="minmax"
                className="customFields"
                placeholder="Price"
                mode="decimal"
                min={0}
                max={100000}
                onChange={(e)=>{setCP(e.value)}}
              />
            </Col>
              </Row>
            </Col>
    
          </Row>
        </>,
      ]);
    const addChoice = () => {
        if (valuesC.length>20){
            return
        }
    
        if (cn == '' || cp == 0){
            return 
        }else{
          const ndl = [...cl]
          ndl.push({"name":cn,"price":cp})
          const newArrayList:any = [];
          ndl.forEach(obj => {
              if (!newArrayList.some(o => o.range=== obj.range)) {
                newArrayList.push({...obj});
              }
            });
        opts(newArrayList);
          setCL(newArrayList)
          setCN('')
          setN('')
          setCP(0)
        }
      const v = (
        <>
          <Row style={{marginTop:"30px"}}>
            <Col xs={6} sm={6} md={4} lg={4}>
              <label className="customLabel"></label>
            </Col>
            <Col>
              <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
                  <label className="customLabel">Name</label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <InputText
                    className="customFields"
                    placeholder="Name"
                    onChange={(e)=>{setCN(e.target.value)}}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
          <Col xs={6} sm={6} md={4} lg={4}>
              <label className="customLabel"></label>
            </Col>
            <Col>
              <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
              <label className="customLabel">Price</label>
            </Col>
            <Col xs={12} sm={12} md={9} lg={9}>
              <InputNumber
                inputId="minmax"
                className="customFields"
                placeholder="Price"
                mode="decimal"
                min={0}
                max={100000}
                onChange={(e)=>{setCP(e.value)}}
              />
            </Col>
              </Row>
            </Col>
    
          </Row>
        </>
      );
    
      const newList = [...valuesC];
      newList.push(v);
      setValuesC(newList);
    };
    
    const removeChoice = () =>{
    
        if (valuesC.length<2){
              return
          }
          setCN(cl[cl.length-1]['name'])
          setCP(cl[cl.length-1]['price'])
        const newList = [...valuesC];
        newList.pop();
        setValuesC(newList);
    
      }
    return (
        <>
      <Row style={{justifyContent:'right'}}>
        <Col xs={12} sm={12} md={8} lg={8} style->
          <Button icon="pi pi-plus" className="p-button-rounded p-button-info p-button-outlined" onClick={addChoice} />
          <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" onClick={removeChoice} style={{marginLeft:"20px"}}/>
        </Col>
      </Row>
        {valuesC.map((data) => {
            return data;
          })}
        </>
    );
}
export default OptionLC;

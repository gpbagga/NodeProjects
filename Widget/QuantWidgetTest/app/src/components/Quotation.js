// import React, {useRef, useState} from "react";
import '../assets/css/App.css';
export default function Quotation() {
    const xTopRef = React.useRef()
    const tableHeadingRef = React.useRef()
    const tableRowRef = React.useRef()
    const totalStuffRef = React.useRef()
    const n = 60

    const [pagesStartingIndex, setPagesStartingIndex] = React.useState([])

    const tableData= new Array(n).fill().map((_,i)=> {
        return({
            sno: i+1,
            desc: 'abc',
            quantity: 13,
            rate: 200,
            amount: 300
        })
    })

    React.useEffect(() => {
      const topStuffHeight = xTopRef.current.clientHeight 
      const tableHeaderHeight = tableHeadingRef.current.clientHeight
      const tableRowHeight = tableRowRef.current.clientHeight + 1  // 1 is added for border which is of 1px
      const totalStuffHeight = totalStuffRef.current.clientHeight 
      console.log('hello sdas', topStuffHeight,tableHeaderHeight,tableRowHeight, totalStuffHeight )
      
      // size of a4 sheet taken: 1123
      const hDash = 873-topStuffHeight - tableHeaderHeight
      if( (n*tableRowHeight) > hDash){
        const firstPageN = Math.floor(hDash/tableRowHeight)
        // const secondPageN = n - firstPageN
        console.log(firstPageN)
        setPagesStartingIndex([0, firstPageN])
      }else{
        setPagesStartingIndex([0])
      }  

        
    },[])
    // },[xTopRef.current, xTopRef.current?xTopRef.current.clientHeight: 0])
    return (
        <div className="quotation"   
        >
            <div
            className="topStuff"
            ref={xTopRef}
                
            >
                <div 
                className="content" style={{ width: "96%", margin: "10px", position: "relative" }}>

                    <div className="data" style={{ width: "100%", float: "left", display: "flex" }}>

                        <div className="dataleft" style={{ float: "left", width: "72%" }}>
                            <p style={{ marginBottom: "0px", fontSize: "16px" }}> Data Science Company - Quant</p>
                            <p style={{ marginTop: "0px", fontSize: "12px" }}>VAT No.: 310101280600003</p>
                        </div>

                        <div className="sales-order" style={{ float: "right", width: "50%" }}>
                            <h1 style={{ color: "#464c9a", marginBottom: "0px", width: "100%", marginTop: "0px", textAlign: "right" }}>Quotation</h1>
                            <p style={{ margin: "0px", textAlign: "right", width: "100%", fontsize: "12px" }}><span style={{ textAlign: "center" }}></span></p>
                        </div>
                    </div>
                </div>
                <div className="bill" style={{ width: "98%", float: "left" }}>
                    <div className="bill-left" style={{ width: "60%", display: "block", float: "left", marginTop: "20px", paddingLeft: "10px", marginBottom: "20px" }}>
                        <p style={{ margin: "0px" }}>Bill To:</p>
                        <h5 style={{ margin: "0px" }}></h5>
                        <h5 style={{ margin: "0px" }}><span style={{ fontSize: "12px", fontWeight: "400" }}></span></h5>
                        <p style={{ margin: "0px", fontSize: "12px" }}></p>
                        <h5 style={{ margin: "0px" }}><span style={{ fontSize: "12px", fontWeight: "400" }}></span></h5>
                        <div><span style={{ fontSize: "12px" }}></span></div>
                    </div>
                    <div className="shipment" style={{ float: "right", width: "40%", display: "grid" }}>
                        <div style={{ display: "flex", float: "right", width: "100%", height: "30px" }}><span style={{ width: "80%", textAlign: "right" }}>
                            <font size="2">Order Date: </font>
                        </span><span style={{ paddingLeft: "10px", width: "43%", textAlign: "right" }}>
                                <font size="2"></font>
                            </span></div>
                        <div style={{ display: "flex", float: "right", width: "100%", height: "30px" }}><span style={{ width: "80%", textAlign: "right" }}>
                            <font size="2">Expected Shipment Date: </font>
                        </span><span style={{ paddingLeft: "10px", width: "43%", textAlign: "right" }}></span></div>
                        <div style={{ display: "flex", float: "right", width: "100%", height: "30px" }}><span style={{ width: "80%", textAlign: "right" }}>
                            <font size="2">Ref#: </font>
                        </span><span style={{ paddingLeft: "10px", width: "43%", textAlign: "right" }}></span></div>
                        <div style={{ display: "flex", float: "right", width: "100%", height: "30px" }}><span style={{ width: "80%", textAlign: "right" }}>
                            <font size="2">Delivery Method: </font>
                        </span><span style={{ paddingLeft: "10px", width: "43%", textAlign: "right" }}>
                                <font size="2"></font>
                            </span></div>

                    </div>
                </div>
            </div>
            <div className="product" style={{width: "97%", float: "left", paddingLeft: "10px" }}>

                <table style={{ width: "100%", tableLayout: "fixed", borderSpacing: "0", borderCollapse: "collapse" }}>
                    <thead 
                    ref={tableHeadingRef}
                    style={{ background: "#464c9a", color: "white" }}>
                        <tr style={{ height: "26px", border: "none" }}>
                            <th style={{ fontSize: "14px", fontWeight: "500", width: "7%" }}>#</th>
                            <th style={{ fontSize: "14px", fontWeight: "500", width: "42%" }}>Items & Description</th>
                            <th style={{ fontSize: "14px", fontWeight: "500", width: "12%" }}>Quantity</th>
                            <th style={{ fontSize: "14px", fontWeight: "500", width: "12%" }}>Rate</th>
                            <th style={{ fontSize: "14px", fontWeight: "500", width: "15%" }}>Amount</th>
                        </tr>
                    </thead>

                    {/* {pagesStartingIndex.length === 0 ? ( */}
                    {true ? (
                        <tbody id="subform_1" className="OrderedItems">

                            {tableData.map((item, index) => (
                                <tr 
                                key={index}
                                ref={tableRowRef}
                                style={{ borderBottom: "1px solid grey" }}>
                                    <td style={{ textAlign: "center", padding: "7px" }}>
                                        <font size="2" face="sans-serif"><span style={{ backgroundColor: "rgb(255, 255, 255)" }}>{item.sno}</span></font>
                                    </td>
                                    <td style={{ textAlign: "center", padding: "7px" }}><span style={{ fontSize: "12px" }}>{item.desc}</span></td>
                                    <td style={{ textAlign: "center", padding: "7px" }}>
                                        <font size="2"></font><span style={{ fontSize: "12px" }}>{item.quantity}</span>
                                    </td>
                                    <td style={{ textAlign: "center", padding: "7px" }}>
                                        <font size="2">{item.rate}</font>
                                    </td>
                                    <td style={{ textAlign: "center", fontSize: "12px", padding: "7px" }}>{item.amount}
                                    </td>
                                </tr>
                                
                            ))}
                        </tbody>
                    ):(
                        pagesStartingIndex.map((startingIndex, i)=> (
                            <tbody 
                            // className={i>0 ? "pageBreak": "firstPage"} 
                            // className="pageBreak"
                            >

                                {tableData.slice(startingIndex, i + 1 === pagesStartingIndex.length ? tableData.length: pagesStartingIndex[i+1] ).map((item, index) => (
                                    <tr 
                                    key={index}
                                    ref={tableRowRef}
                                    style={{ borderBottom: "1px solid grey" }}>
                                        <td style={{ textAlign: "center", padding: "7px" }}>
                                            <font size="2" face="sans-serif"><span style={{ backgroundColor: "rgb(255, 255, 255)" }}>{item.sno}</span></font>
                                        </td>
                                        <td style={{ textAlign: "center", padding: "7px" }}><span style={{ fontSize: "12px" }}>{item.desc}</span></td>
                                        <td style={{ textAlign: "center", padding: "7px" }}>
                                            <font size="2"></font><span style={{ fontSize: "12px" }}>{item.quantity}</span>
                                        </td>
                                        <td style={{ textAlign: "center", padding: "7px" }}>
                                            <font size="2">{item.rate}</font>
                                        </td>
                                        <td style={{ textAlign: "center", fontSize: "12px", padding: "7px" }}>{item.amount}
                                        </td>
                                    </tr>
                                    
                                ))}
                            </tbody>
                        ))

                    )}
                        

                </table>
            </div>
            
            <div
            className="total"
            ref={totalStuffRef}
            style={{ float: "right", width: "30%", paddingTop: "40px", display: "flow-root", height: "88px" }}>
                <div style={{ display: "flex", float: "right", width: "100%", height: "30px" }}><span style={{ width: "49%", textAlign: "right" }}>Sub Total: </span><span
                    style={{ paddingLeft: "10px", paddingRight: "10px", width: "43%", textAlign: "right" }}>
                    <font size="2"></font>
                </span></div>
                <div style={{ float: "right", width: "100%", height: "30px", marginTop: "6px" }}><span
                    style={{ width: "49%", textAlign: "right" }}><b>Total: </b></span><span
                        style={{ paddingLeft: "10px", paddingRight: "10px", width: "43%", textAlign: "right" }}><b
                            style={{ fontFamily: "sans-serif", backgroundColor: "rgb(255, 255, 255)" }}>
                            <font size="2"></font>
                        </b></span>
                </div>
            </div>
        
            <div className="tax" style={{ float: "left", width: "100%", display: "flow-root" }}>
                <p style={{ float: "left", width: "100%" }}>Tax Summary</p>
                <table style={{ width: "100%", tableLayout: "fixed", borderSpacing: "0", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#464c9a", color: "white" }}>
                        <tr style={{ height: "26px", border: "none" }}>
                            <th
                                style={{ fontSize: "14px", fontWeight: "500", width: "55%", textAlign: "left", padding: "10px" }}>
                                Tax Details</th>
                            <th
                                style={{ fontSize: "14px", fontWeight: "500", width: "55%", textAlign: "right", padding: "10px" }}>
                                Taxable Amount (SAR)</th>
                            <th
                                style={{ fontSize: "14px", fontWeight: "500", width: "55%", textAlign: "right", padding: "10px" }}>
                                Tax Amount (SAR)</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr style={{ borderBottom: "1px solid grey" }}>
                            <td style={{ textAlign: "left", fontSize: "12px", padding: "10px" }}>#</td>
                            <td style={{ textAlign: "right", padding: "10px" }}>
                                <font size="2"></font>
                            </td>
                            <td style={{ textAlign: "right", padding: "10px" }}><span
                                style={{ fontFamily: "sans-serif", backgroundColor: "rgb(255, 255, 255)" }}>
                                <font size="2"></font>
                            </span></td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid grey" }}>
                            <td style={{ textAlign: "left", fontSize: "13px", padding: "10px", fontWeight: "800" }}>
                                Total</td>
                            <td style={{ textAlign: "right", fontSize: "12px", padding: "7px" }}></td>
                            <td style={{ textAlign: "right", padding: "7px" }}>
                                <font size="2"></font>
                            </td>
                        </tr>
                    </tbody>
                </table>




            </div>
            <div className="notes" style={{ width: "100%", float: "left", paddingLeft: "10px", display: "flow-root" }}>
                <h5 style={{ marginBottom: "0px" }}>Notes</h5>
                <p style={{ fontSize: "12px" }}>Thank you for your provided value to Quant and we look forward to
                    a fruitful engagement.</p>
            </div>
            <div className="t_and_c" style={{ width: "100%", float: "left", paddingLeft: "10px", display: "flow-root" }}>
                <h5 style={{ marginBottom: "0px" }}>Terms & Conditions </h5>
                <p style={{ fontSize: "12px" }}>1- One-year warranty on ductwork.<br />
                    2- One-year warranty for on-premise visits to provide the services in case any
                    maintenance is required or any air leaking from the ducts.<br />
                    3- 75% after signing the purchase order and the remaining after delivering the complete
                    services.
                </p>
            </div>

            {/* <div className='pageBreak' style={{display:'flow_root', float:'left'}} >
                abc
            </div> */}

        </div>
    )
}
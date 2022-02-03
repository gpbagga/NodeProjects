// import React, {useRef, useState} from "react";
// import '../assets/css/App.css';
// export default function Quotation() {
function Quotation() {
  const xTopRef = React.useRef()
    const tableHeadingRef = React.useRef()
    const tableRowRef = React.useRef()
    const totalStuffRef = React.useRef()
    const taxDiv = React.useRef()
    const lastWordsDiv = React.useRef()
    const n = 85

    const [pagesStartingIndex, setPagesStartingIndex] = React.useState([])

    const [taxPageBreak, setTaxPageBreak] = React.useState(false);
    const [lastWordsBreak, setLastWordsBreak] = React.useState(false);

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
      const taxDivHeight = taxDiv.current.clientHeight
      const lastWordsHeight = lastWordsDiv.current.clientHeight
      console.log('hello sdas', taxDivHeight, lastWordsHeight )
      
      // size of a4 sheet taken: 1123
      const h = 873   // 1123 - 250
      const hDash = h-topStuffHeight - tableHeaderHeight
      let remainingHeight
      if( (n*tableRowHeight) > hDash){
        const firstPageN = Math.floor(hDash/tableRowHeight)
        
        // console.log(firstPageN)
        const arr = [0]
        arr.push(firstPageN)
        let nextN = n - firstPageN
        const x = Math.floor(h/tableRowHeight)
        let nextElement
        while(nextN*tableRowHeight > h){
          nextElement = x + arr[arr.length - 1]
          arr.push(nextElement)
          nextN = n - nextElement
        }
        setPagesStartingIndex([...arr])

        remainingHeight = h - nextN*tableRowHeight
      }else{
        setPagesStartingIndex([0])
        remainingHeight = hDash - n*tableRowHeight
      } 

      if(taxDivHeight + lastWordsHeight > remainingHeight){
        if(taxDivHeight > remainingHeight){
          setTaxPageBreak(true)
        }else{
          setLastWordsBreak(true)
        }
      }

        
    },[])
    // },[xTopRef.current, xTopRef.current?xTopRef.current.clientHeight: 0])
  return (
    <div className="quotation"   
    style={{
      paddingLeft:"10px",
      paddingRight: "10px"
    }}
    >
      <div
      className="topStuff"
      ref={xTopRef}
          
      >
        <div 
        className="content" style={{ width: "96%", margin: "10px", position: "relative" }}>

            <div className="data" style={{ width: "100%", 
            float: "left", 
            display: "flex" }}>

                <div className="dataleft" style={{
                   float: "left", 
                   width: "72%" }}>
                    <p style={{ marginBottom: "0px", fontSize: "16px" }}> Data Science Company - Quant</p>
                    <p style={{ marginTop: "0px", fontSize: "12px" }}>VAT No.: 310101280600003</p>
                </div>

                <div className="sales-order" style={{ 
                  float: "right", 
                  width: "50%" }}>
                    <h1 style={{ color: "#464c9a", marginBottom: "0px", width: "100%", marginTop: "0px", textAlign: "right" }}>Quotation</h1>
                    <p style={{ margin: "0px", textAlign: "right", width: "100%", fontsize: "12px" }}><span style={{ textAlign: "center" }}></span></p>
                </div>
            </div>
        </div>
        <div className="bill" style={{ width: "98%", 
        float: "left" 
        }}>
            <div className="bill-left" style={{ width: "60%", 
            display: "block", 
            float: "left", 
            marginTop: "20px", paddingLeft: "10px", marginBottom: "20px" }}>
                <p style={{ margin: "0px" }}>Bill To:</p>
                <h5 style={{ margin: "0px" }}></h5>
                <h5 style={{ margin: "0px" }}><span style={{ fontSize: "12px", fontWeight: "400" }}></span></h5>
                <p style={{ margin: "0px", fontSize: "12px" }}></p>
                <h5 style={{ margin: "0px" }}><span style={{ fontSize: "12px", fontWeight: "400" }}></span></h5>
                <div><span style={{ fontSize: "12px" }}></span></div>
            </div>
            <div className="shipment" style={{ 
              float: "right", 
              width: "40%", display: "grid" }}>
                <div style={{ 
                  display: "flex", float: "right", 
                  width: "100%", height: "30px" }}><span style={{ width: "80%", textAlign: "right" }}>
                    <font size="2">Order Date: </font>
                </span><span style={{ paddingLeft: "10px", width: "43%", textAlign: "right" }}>
                        <font size="2"></font>
                    </span></div>
                <div style={{ 
                  display: "flex", float: "right",
                   width: "100%", height: "30px" }}><span style={{ width: "80%", textAlign: "right" }}>
                    <font size="2">Expected Shipment Date: </font>
                </span><span style={{ paddingLeft: "10px", width: "43%", textAlign: "right" }}></span></div>
                <div style={{ 
                  display: "flex", float: "right", 
                  width: "100%", height: "30px" }}><span style={{ width: "80%", textAlign: "right" }}>
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
      <div>
          {pagesStartingIndex.length === 0 ? (
            <table className="table" style={{ width: "100%", 
            // tableLayout: "fixed", 
            borderSpacing: "0", borderCollapse: "collapse" }}>
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
                <tbody style={{pageBreakInside:'auto'}} id="subform_1" className="OrderedItems">
  
                  {tableData.map((item, index) => (
                      <tr 
                      key={index}
                      className="tablerow"
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
            </table>
                
          ):(
            pagesStartingIndex.map((startingIndex, i)=> {
              if(i === 0){
                return(
                  <table 
                  key={i}
                  className="table" style={{ width: "100%", 
                  borderSpacing: "0", borderCollapse: "collapse" }}>
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
                      <tbody style={{pageBreakInside:'auto'}} id="subform_1" className="OrderedItems">
        
                        {tableData.slice(0, i + 1 === pagesStartingIndex.length ? tableData.length: pagesStartingIndex[i+1] ).map((item, index) => (
                            <tr 
                            key={index}
                            className="tablerow"
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
                  </table>
                )
              }

              return(
                <table 
                key={i}
                className="product_table" style={{ width: "100%", 
                borderSpacing: "0", borderCollapse: "collapse" }}>
                    
                    <tbody id="subform_1" className="OrderedItems">
      
                      {tableData.slice(startingIndex, i + 1 === pagesStartingIndex.length ? tableData.length: pagesStartingIndex[i+1] ).map((item, index) => (
                          <tr 
                          key={index}
                          className="tablerow"
                          ref={tableRowRef}
                          style={{ borderBottom: "1px solid grey" }}>
                              <td style={{ textAlign: "center", padding: "7px", width:'7%' }}>
                                  <font size="2" face="sans-serif"><span style={{ backgroundColor: "rgb(255, 255, 255)" }}>{item.sno}</span></font>
                              </td>
                              <td style={{ textAlign: "center", padding: "7px", width:'42%'  }}><span style={{ fontSize: "12px" }}>{item.desc}</span></td>
                              <td style={{ textAlign: "center", padding: "7px", width:'12%'  }}>
                                  <font size="2"></font><span style={{ fontSize: "12px" }}>{item.quantity}</span>
                              </td>
                              <td style={{ textAlign: "center", padding: "7px", width:'12%'  }}>
                                  <font size="2">{item.rate}</font>
                              </td>
                              <td style={{ textAlign: "center", fontSize: "12px", padding: "7px", width:'15%'  }}>{item.amount}
                              </td>
                          </tr>
                          
                      ))}
                    </tbody>
                </table>
              )
            })
          )} 
      </div>
      
      <div
      className="total"
      ref={totalStuffRef}
      style={{ 
        textAlign:'right',
        width: "100%", 
        paddingTop: "40px",
        // height: "88px" 
      }}>
          
            <div 
            style={{ 
              // display: "flex", float: "right", 
              // width: "100%", 
              height: "30px" 
            }}>
              <span style={{textAlign: "right" }}>Sub Total: </span>
              <span
                style={{ paddingLeft: "10px", paddingRight: "10px", width: "43%", textAlign: "right" }}>
                <font size="2">dasdasd dasda asdasd</font>
              </span>
            </div>
            <div 
            style={{ 
              // float: "right", 
              // width: "100%", 
              height: "30px", 
              marginTop: "6px" }}>
                <span
                style={{textAlign: "right" }}><b>Total: </b>
                </span>
                <span
                  style={{ paddingLeft: "10px", paddingRight: "10px", width: "43%", textAlign: "right" }}
                >
                  <b
                  style={{ fontFamily: "sans-serif", backgroundColor: "rgb(255, 255, 255)" }}>
                        <font size="2">sdasdas</font>
                  </b>
                </span>
            </div>
          
      </div>

      <div 
      ref={taxDiv}
      className={"tax"+ (taxPageBreak?(" product_table"): "")} 
      style={{ 
        // float: "left", 
        width: "100%", display: "flow-root" }}>
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
      <div
      ref={lastWordsDiv}
      className={lastWordsBreak ? "product_table":""}
      >
        <div className="notes" style={{ width: "100%", 
        // float: "left", 
        paddingLeft: "10px", display: "flow-root" }}>
            <h5 style={{ marginBottom: "0px" }}>Notes</h5>
            <p style={{ fontSize: "12px" }}>Thank you for your provided value to Quant and we look forward to
                a fruitful engagement.</p>
        </div>
        <div className="t_and_c" style={{ width: "100%", 
        // float: "left", 
        paddingLeft: "10px", display: "flow-root" }}>
            <h5 style={{ marginBottom: "0px" }}>Terms & Conditions </h5>
            <p style={{ fontSize: "12px" }}>1- One-year warranty on ductwork.<br />
                2- One-year warranty for on-premise visits to provide the services in case any
                maintenance is required or any air leaking from the ducts.<br />
                3- 75% after signing the purchase order and the remaining after delivering the complete
                services.
            </p>
        </div>
      </div>


    </div>
  )
}

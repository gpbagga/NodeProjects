var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// import React, {useRef, useState} from "react";
import '../assets/css/App.css';
export default function Quotation() {
    var xTopRef = React.useRef();
    var tableHeadingRef = React.useRef();
    var tableRowRef = React.useRef();
    var totalStuffRef = React.useRef();
    var n = 60;

    var _React$useState = React.useState([]),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        pagesStartingIndex = _React$useState2[0],
        setPagesStartingIndex = _React$useState2[1];

    var tableData = new Array(n).fill().map(function (_, i) {
        return {
            sno: i + 1,
            desc: 'abc',
            quantity: 13,
            rate: 200,
            amount: 300
        };
    });

    React.useEffect(function () {
        var topStuffHeight = xTopRef.current.clientHeight;
        var tableHeaderHeight = tableHeadingRef.current.clientHeight;
        var tableRowHeight = tableRowRef.current.clientHeight + 1; // 1 is added for border which is of 1px
        var totalStuffHeight = totalStuffRef.current.clientHeight;
        console.log('hello sdas', topStuffHeight, tableHeaderHeight, tableRowHeight, totalStuffHeight);

        // size of a4 sheet taken: 1123
        var hDash = 873 - topStuffHeight - tableHeaderHeight;
        if (n * tableRowHeight > hDash) {
            var firstPageN = Math.floor(hDash / tableRowHeight);
            // const secondPageN = n - firstPageN
            console.log(firstPageN);
            setPagesStartingIndex([0, firstPageN]);
        } else {
            setPagesStartingIndex([0]);
        }
    }, []);
    // },[xTopRef.current, xTopRef.current?xTopRef.current.clientHeight: 0])
    return React.createElement(
        'div',
        { className: 'quotation'
        },
        React.createElement(
            'div',
            {
                className: 'topStuff',
                ref: xTopRef

            },
            React.createElement(
                'div',
                {
                    className: 'content', style: { width: "96%", margin: "10px", position: "relative" } },
                React.createElement(
                    'div',
                    { className: 'data', style: { width: "100%", float: "left", display: "flex" } },
                    React.createElement(
                        'div',
                        { className: 'dataleft', style: { float: "left", width: "72%" } },
                        React.createElement(
                            'p',
                            { style: { marginBottom: "0px", fontSize: "16px" } },
                            ' Data Science Company - Quant'
                        ),
                        React.createElement(
                            'p',
                            { style: { marginTop: "0px", fontSize: "12px" } },
                            'VAT No.: 310101280600003'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'sales-order', style: { float: "right", width: "50%" } },
                        React.createElement(
                            'h1',
                            { style: { color: "#464c9a", marginBottom: "0px", width: "100%", marginTop: "0px", textAlign: "right" } },
                            'Quotation'
                        ),
                        React.createElement(
                            'p',
                            { style: { margin: "0px", textAlign: "right", width: "100%", fontsize: "12px" } },
                            React.createElement('span', { style: { textAlign: "center" } })
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'bill', style: { width: "98%", float: "left" } },
                React.createElement(
                    'div',
                    { className: 'bill-left', style: { width: "60%", display: "block", float: "left", marginTop: "20px", paddingLeft: "10px", marginBottom: "20px" } },
                    React.createElement(
                        'p',
                        { style: { margin: "0px" } },
                        'Bill To:'
                    ),
                    React.createElement('h5', { style: { margin: "0px" } }),
                    React.createElement(
                        'h5',
                        { style: { margin: "0px" } },
                        React.createElement('span', { style: { fontSize: "12px", fontWeight: "400" } })
                    ),
                    React.createElement('p', { style: { margin: "0px", fontSize: "12px" } }),
                    React.createElement(
                        'h5',
                        { style: { margin: "0px" } },
                        React.createElement('span', { style: { fontSize: "12px", fontWeight: "400" } })
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement('span', { style: { fontSize: "12px" } })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'shipment', style: { float: "right", width: "40%", display: "grid" } },
                    React.createElement(
                        'div',
                        { style: { display: "flex", float: "right", width: "100%", height: "30px" } },
                        React.createElement(
                            'span',
                            { style: { width: "80%", textAlign: "right" } },
                            React.createElement(
                                'font',
                                { size: '2' },
                                'Order Date: '
                            )
                        ),
                        React.createElement(
                            'span',
                            { style: { paddingLeft: "10px", width: "43%", textAlign: "right" } },
                            React.createElement('font', { size: '2' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { display: "flex", float: "right", width: "100%", height: "30px" } },
                        React.createElement(
                            'span',
                            { style: { width: "80%", textAlign: "right" } },
                            React.createElement(
                                'font',
                                { size: '2' },
                                'Expected Shipment Date: '
                            )
                        ),
                        React.createElement('span', { style: { paddingLeft: "10px", width: "43%", textAlign: "right" } })
                    ),
                    React.createElement(
                        'div',
                        { style: { display: "flex", float: "right", width: "100%", height: "30px" } },
                        React.createElement(
                            'span',
                            { style: { width: "80%", textAlign: "right" } },
                            React.createElement(
                                'font',
                                { size: '2' },
                                'Ref#: '
                            )
                        ),
                        React.createElement('span', { style: { paddingLeft: "10px", width: "43%", textAlign: "right" } })
                    ),
                    React.createElement(
                        'div',
                        { style: { display: "flex", float: "right", width: "100%", height: "30px" } },
                        React.createElement(
                            'span',
                            { style: { width: "80%", textAlign: "right" } },
                            React.createElement(
                                'font',
                                { size: '2' },
                                'Delivery Method: '
                            )
                        ),
                        React.createElement(
                            'span',
                            { style: { paddingLeft: "10px", width: "43%", textAlign: "right" } },
                            React.createElement('font', { size: '2' })
                        )
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'product', style: { width: "97%", float: "left", paddingLeft: "10px" } },
            React.createElement(
                'table',
                { style: { width: "100%", tableLayout: "fixed", borderSpacing: "0", borderCollapse: "collapse" } },
                React.createElement(
                    'thead',
                    {
                        ref: tableHeadingRef,
                        style: { background: "#464c9a", color: "white" } },
                    React.createElement(
                        'tr',
                        { style: { height: "26px", border: "none" } },
                        React.createElement(
                            'th',
                            { style: { fontSize: "14px", fontWeight: "500", width: "7%" } },
                            '#'
                        ),
                        React.createElement(
                            'th',
                            { style: { fontSize: "14px", fontWeight: "500", width: "42%" } },
                            'Items & Description'
                        ),
                        React.createElement(
                            'th',
                            { style: { fontSize: "14px", fontWeight: "500", width: "12%" } },
                            'Quantity'
                        ),
                        React.createElement(
                            'th',
                            { style: { fontSize: "14px", fontWeight: "500", width: "12%" } },
                            'Rate'
                        ),
                        React.createElement(
                            'th',
                            { style: { fontSize: "14px", fontWeight: "500", width: "15%" } },
                            'Amount'
                        )
                    )
                ),
                true ? React.createElement(
                    'tbody',
                    { id: 'subform_1', className: 'OrderedItems' },
                    tableData.map(function (item, index) {
                        return React.createElement(
                            'tr',
                            {
                                key: index,
                                ref: tableRowRef,
                                style: { borderBottom: "1px solid grey" } },
                            React.createElement(
                                'td',
                                { style: { textAlign: "center", padding: "7px" } },
                                React.createElement(
                                    'font',
                                    { size: '2', face: 'sans-serif' },
                                    React.createElement(
                                        'span',
                                        { style: { backgroundColor: "rgb(255, 255, 255)" } },
                                        item.sno
                                    )
                                )
                            ),
                            React.createElement(
                                'td',
                                { style: { textAlign: "center", padding: "7px" } },
                                React.createElement(
                                    'span',
                                    { style: { fontSize: "12px" } },
                                    item.desc
                                )
                            ),
                            React.createElement(
                                'td',
                                { style: { textAlign: "center", padding: "7px" } },
                                React.createElement('font', { size: '2' }),
                                React.createElement(
                                    'span',
                                    { style: { fontSize: "12px" } },
                                    item.quantity
                                )
                            ),
                            React.createElement(
                                'td',
                                { style: { textAlign: "center", padding: "7px" } },
                                React.createElement(
                                    'font',
                                    { size: '2' },
                                    item.rate
                                )
                            ),
                            React.createElement(
                                'td',
                                { style: { textAlign: "center", fontSize: "12px", padding: "7px" } },
                                item.amount
                            )
                        );
                    })
                ) : pagesStartingIndex.map(function (startingIndex, i) {
                    return React.createElement(
                        'tbody',
                        null,
                        tableData.slice(startingIndex, i + 1 === pagesStartingIndex.length ? tableData.length : pagesStartingIndex[i + 1]).map(function (item, index) {
                            return React.createElement(
                                'tr',
                                {
                                    key: index,
                                    ref: tableRowRef,
                                    style: { borderBottom: "1px solid grey" } },
                                React.createElement(
                                    'td',
                                    { style: { textAlign: "center", padding: "7px" } },
                                    React.createElement(
                                        'font',
                                        { size: '2', face: 'sans-serif' },
                                        React.createElement(
                                            'span',
                                            { style: { backgroundColor: "rgb(255, 255, 255)" } },
                                            item.sno
                                        )
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    { style: { textAlign: "center", padding: "7px" } },
                                    React.createElement(
                                        'span',
                                        { style: { fontSize: "12px" } },
                                        item.desc
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    { style: { textAlign: "center", padding: "7px" } },
                                    React.createElement('font', { size: '2' }),
                                    React.createElement(
                                        'span',
                                        { style: { fontSize: "12px" } },
                                        item.quantity
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    { style: { textAlign: "center", padding: "7px" } },
                                    React.createElement(
                                        'font',
                                        { size: '2' },
                                        item.rate
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    { style: { textAlign: "center", fontSize: "12px", padding: "7px" } },
                                    item.amount
                                )
                            );
                        })
                    );
                })
            )
        ),
        React.createElement(
            'div',
            {
                className: 'total',
                ref: totalStuffRef,
                style: { float: "right", width: "30%", paddingTop: "40px", display: "flow-root", height: "88px" } },
            React.createElement(
                'div',
                { style: { display: "flex", float: "right", width: "100%", height: "30px" } },
                React.createElement(
                    'span',
                    { style: { width: "49%", textAlign: "right" } },
                    'Sub Total: '
                ),
                React.createElement(
                    'span',
                    {
                        style: { paddingLeft: "10px", paddingRight: "10px", width: "43%", textAlign: "right" } },
                    React.createElement('font', { size: '2' })
                )
            ),
            React.createElement(
                'div',
                { style: { float: "right", width: "100%", height: "30px", marginTop: "6px" } },
                React.createElement(
                    'span',
                    {
                        style: { width: "49%", textAlign: "right" } },
                    React.createElement(
                        'b',
                        null,
                        'Total: '
                    )
                ),
                React.createElement(
                    'span',
                    {
                        style: { paddingLeft: "10px", paddingRight: "10px", width: "43%", textAlign: "right" } },
                    React.createElement(
                        'b',
                        {
                            style: { fontFamily: "sans-serif", backgroundColor: "rgb(255, 255, 255)" } },
                        React.createElement('font', { size: '2' })
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'tax', style: { float: "left", width: "100%", display: "flow-root" } },
            React.createElement(
                'p',
                { style: { float: "left", width: "100%" } },
                'Tax Summary'
            ),
            React.createElement(
                'table',
                { style: { width: "100%", tableLayout: "fixed", borderSpacing: "0", borderCollapse: "collapse" } },
                React.createElement(
                    'thead',
                    { style: { background: "#464c9a", color: "white" } },
                    React.createElement(
                        'tr',
                        { style: { height: "26px", border: "none" } },
                        React.createElement(
                            'th',
                            {
                                style: { fontSize: "14px", fontWeight: "500", width: "55%", textAlign: "left", padding: "10px" } },
                            'Tax Details'
                        ),
                        React.createElement(
                            'th',
                            {
                                style: { fontSize: "14px", fontWeight: "500", width: "55%", textAlign: "right", padding: "10px" } },
                            'Taxable Amount (SAR)'
                        ),
                        React.createElement(
                            'th',
                            {
                                style: { fontSize: "14px", fontWeight: "500", width: "55%", textAlign: "right", padding: "10px" } },
                            'Tax Amount (SAR)'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        { style: { borderBottom: "1px solid grey" } },
                        React.createElement(
                            'td',
                            { style: { textAlign: "left", fontSize: "12px", padding: "10px" } },
                            '#'
                        ),
                        React.createElement(
                            'td',
                            { style: { textAlign: "right", padding: "10px" } },
                            React.createElement('font', { size: '2' })
                        ),
                        React.createElement(
                            'td',
                            { style: { textAlign: "right", padding: "10px" } },
                            React.createElement(
                                'span',
                                {
                                    style: { fontFamily: "sans-serif", backgroundColor: "rgb(255, 255, 255)" } },
                                React.createElement('font', { size: '2' })
                            )
                        )
                    ),
                    React.createElement(
                        'tr',
                        { style: { borderBottom: "1px solid grey" } },
                        React.createElement(
                            'td',
                            { style: { textAlign: "left", fontSize: "13px", padding: "10px", fontWeight: "800" } },
                            'Total'
                        ),
                        React.createElement('td', { style: { textAlign: "right", fontSize: "12px", padding: "7px" } }),
                        React.createElement(
                            'td',
                            { style: { textAlign: "right", padding: "7px" } },
                            React.createElement('font', { size: '2' })
                        )
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'notes', style: { width: "100%", float: "left", paddingLeft: "10px", display: "flow-root" } },
            React.createElement(
                'h5',
                { style: { marginBottom: "0px" } },
                'Notes'
            ),
            React.createElement(
                'p',
                { style: { fontSize: "12px" } },
                'Thank you for your provided value to Quant and we look forward to a fruitful engagement.'
            )
        ),
        React.createElement(
            'div',
            { className: 't_and_c', style: { width: "100%", float: "left", paddingLeft: "10px", display: "flow-root" } },
            React.createElement(
                'h5',
                { style: { marginBottom: "0px" } },
                'Terms & Conditions '
            ),
            React.createElement(
                'p',
                { style: { fontSize: "12px" } },
                '1- One-year warranty on ductwork.',
                React.createElement('br', null),
                '2- One-year warranty for on-premise visits to provide the services in case any maintenance is required or any air leaking from the ducts.',
                React.createElement('br', null),
                '3- 75% after signing the purchase order and the remaining after delivering the complete services.'
            )
        )
    );
}
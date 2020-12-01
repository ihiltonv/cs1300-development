import React from 'react';
import {Row, Col, Space} from 'antd';
import Plant from './Plant'

const sortPlants = (items, sortBy) => {
    let sortFunc = undefined
    if (sortBy === "alphabetical") {
        sortFunc = (a, b) => (a["common_name"] > b["common_name"]) ? 1 : -1
    } else if (sortBy === "price lh") {
        sortFunc = (a, b) => (a["price"] - b["price"])
    } else if (sortBy === "price hl") {
        sortFunc = (a, b) => (b["price"] - a["price"])
    } else {
        sortFunc = (a, b) => (a["year"] - b["year"])
    }
    return [...items].sort(sortFunc)
}

function SortedTable(props) {
    const num_cols = 4
    const {itemsUnsorted, sortBy, addCartItem, familySelected, genusSelected} = props
    let i = 0
    let grid = []
    let items = sortPlants(itemsUnsorted, sortBy)
    if (familySelected.length > 0) {
        items = items.filter(i => familySelected.includes(i["family"]))
    }
    if (genusSelected.length > 0) {
        items = items.filter(i => genusSelected.includes(i["genus"]))
    }
    while (i < items.length) {
        let row = []
        for (let c = 0; c < num_cols; c++) {
            if (i < items.length) {
                if (items.length < num_cols) {
                    row.push(<Col className="gutter-row" flex={"auto"}>
                        <Plant data={items[i]}
                               isInCart={false}
                               buttonFunc={addCartItem}/>
                    </Col>)
                } else {
                    row.push(<Col className="gutter-row" span={24 / num_cols}>
                        <Plant data={items[i]}
                               isInCart={false}
                               buttonFunc={addCartItem}/>
                    </Col>)
                }
            }
            i++
        }
        grid.push(<Row gutter={32} justify={"start"}>{row}</Row>)
    }
    grid = <Space direction='vertical' size="middle">{grid}</Space>
    return (grid)
}

export default SortedTable
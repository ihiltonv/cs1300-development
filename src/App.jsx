import React from 'react';
import './App.css';
import { plant_data } from './data.jsx'
import {PageHeader, Menu, Select, Row, Col, Space, Layout, Empty, Typography, Button} from 'antd';
import Plant from './Plant'
import SortedTable from "./SortedTable";

const {SubMenu} = Menu
const {Option} = Select
const { Header, Footer, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;


class App extends React.Component {
nbv
    constructor(props) {
        super(props);
        this.state = {
            num_cols: 3,
            items: plant_data,
            filteredItems: plant_data,
            cartItems: [],
            cartCost: 0,
            sortBy: "alphabetical",
            familyOptions: Array.from(new Set(plant_data.map((i) => i["family"]))),
            familySelected: [],
            genusOptions: Array.from(new Set(plant_data.map((i) => i["genus"]))),
            genusSelected: []
        }
    }

    renderCart = () => {
        let items = this.state.cartItems
        let grid = []
        for (let i = 0; i < items.length; i++) {
            grid.push(
                <Row gutter={32}><Col className="gutter-row" span={24 / this.state.num_cols}>
                    <Plant data={items[i]}
                           isInCart={true}
                           buttonFunc={this.removeCartItems}/>
                </Col></Row>
            )
        }
        return grid
    }

    addCartItem = (cartItem) => {
        let newFiltered = this.state.filteredItems.filter((i) => i !== cartItem)
        let newCart = [...this.state.cartItems]
        newCart.push(cartItem)
        const newCost = Math.round((this.state.cartCost + cartItem["price"] + Number.EPSILON) * 100) / 100
        this.setState({
            cartItems: newCart,
            cartCost: newCost,
            filteredItems: newFiltered
        })
    }

    removeCartItems = (cartItem) => {
        let newCart = this.state.cartItems.filter((i) => i !== cartItem)
        let newFiltered = [...this.state.filteredItems]
        newFiltered.push(cartItem)
        const newCost = Math.round((this.state.cartCost - cartItem["price"] + Number.EPSILON) * 100) / 100
        this.setState({
            cartItems: newCart,
            cartCost: newCost,
            filteredItems: newFiltered
        })
    }

    handleGenusChange = (newItem) => {
        this.setState({
            genusSelected: newItem
        })
    }

    handleFamilyChange = (newItem) => {
        this.setState({
            familySelected: newItem
        })
    }

    handleSortChange = (newSort) => {
        this.setState({
            sortBy: newSort
        })
    }

  render () {
        let cartGrid = this.renderCart()
        const genusItems = []
        for (let i = 0; i < this.state.genusOptions.length; i++) {
            genusItems.push(<Option key={this.state.genusOptions[i]}>{this.state.genusOptions[i]}</Option>)
        }
        const familyItems = []
        for (let i = 0; i < this.state.familyOptions.length; i++) {
          familyItems.push(<Option key={this.state.familyOptions[i]}>{this.state.familyOptions[i]}</Option>)
        }

        return (
            <div className="App">
                <PageHeader className="site-header" title="The Plant Shop" />
                <Layout>
                    <Content className={"main-content"}>
                        <Row gutter={32} justify={"start"}>
                            <Col className="gutter-row" span={24 / this.state.num_cols}>
                                <Paragraph>Sort by &nbsp;
                                    <Select className="selection" defaultValue={"alphabetical"} onChange={this.handleSortChange}>
                                        <Option value={"alphabetical"}>a-z</Option>
                                        <Option value={"price lh"}>price low-high</Option>
                                        <Option value={"price hl"}>price high-low</Option>
                                        <Option value={"year"}>year</Option>
                                    </Select>
                                </Paragraph>
                            </Col>
                            <Col className="gutter-row" span={24 / this.state.num_cols}>
                                <Select
                                    mode="multiple"
                                    placeholder="Filter by family"
                                    onChange={this.handleFamilyChange}
                                    style={{ width: '340px' }}
                                    allowClear
                                >
                                    {familyItems}
                                </Select>
                            </Col>
                            <Col className="gutter-row" span={24 / this.state.num_cols}>
                                <Select
                                    mode="multiple"
                                    placeholder="Filter by genus"
                                    onChange={this.handleGenusChange}
                                    style={{ width: '340px' }}
                                    allowClear
                                >
                                    {genusItems}
                                </Select>
                            </Col>
                        </Row>

                        <SortedTable itemsUnsorted={this.state.filteredItems}
                                     sortBy={this.state.sortBy}
                                     addCartItem={this.addCartItem}
                                     familySelected={this.state.familySelected}
                                     genusSelected={this.state.genusSelected}/>
                    </Content>
                    <Sider theme={"light"} width={250} className={"cart"}>
                        <Title level={2}>Cart - ${this.state.cartCost}</Title>
                        <div className={"cart-body"}>
                            {cartGrid}
                        </div>
                    </Sider>
                </Layout>
            </div>
    );
  }
}

export default App;

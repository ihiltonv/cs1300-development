import React from 'react';
import './Plant.css';
import { Typography, Image, Card, Button } from 'antd';

const { Title, Paragraph } = Typography;

class Plant extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Card hoverable
                  className="plant-card"
                  title={this.props.data["common_name"]}
                  cover={<img className="plant-img" src={this.props.data["image_url"]} />} >
                <Paragraph>Genus: {this.props.data["genus"]}</Paragraph>
                <Paragraph>Family: {this.props.data["family"]}</Paragraph>
                <Paragraph>Year: {this.props.data["year"]}</Paragraph>
                <Paragraph>${this.props.data["price"]}</Paragraph>
                <Button type="primary" onClick={() => this.props.buttonFunc(this.props.data)}>{this.props.isInCart ? "Remove from cart" : "Add to cart"}</Button>
            </Card>
        )
    }
}

export default Plant
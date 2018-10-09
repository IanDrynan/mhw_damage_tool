import React, { Component } from 'react';
import weapons from '../../data/weapons';
import {AutoComplete, Select} from 'antd';

const Option = Select.Option

//needs state to have a controlled input
class SearchBar extends Component{
    
    state = {
        value: "",
    }
    
    weaponList = weapons.map((weapon, index) => {
        return <Option key={index} value={weapon.name}>{weapon.name}</Option>
    })
    render(){
        const blank = this.state.value.trim() === ""
        return(
            <AutoComplete 
                dataSource={blank ? null: this.weaponList}
                filterOption={(inputValue, option) => {
                    return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) === 0
                }}
                placeholder="Search for weapon"
                onChange={inputValue => this.setState({value: inputValue})}
                onSelect={(inputValue, option) => {
                    this.props.onSelectWeapon(weapons[option.key])
                }}
                value={this.state.value}
                style={{width: '100%'}}
            />
        )
    }
}

export default SearchBar
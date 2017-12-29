import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Picker} from 'react-native';

export default class MyPicker extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selected: ''
        };
      }

    render() {
        const {value, onChange, options} = this.props;

        return (
            <View>
                <Text>{value}</Text>
                <Picker onValueChange={(selected)=>{
                            this.setState({selected:selected});
                            onChange(selected);}}
                        selectedValue={this.state.selected}>
                    {
                        options.map(option=>
                            <Picker.Item label={option} value={option} />
                        )
                    }
                </Picker>
            </View>
        );
    }
}

MyPicker.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
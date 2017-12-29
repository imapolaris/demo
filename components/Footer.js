import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';

export default class Footer extends Component{
    renderFilter = (filter, name)=> {
        if (filter === this.props.filter)
            return name;
        return (
            <Text onPress={()=>this.props.onFilterChange(filter)}>{name}</Text>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Show</Text>
                <Text>{' '}</Text>
                <Text>{this.renderFilter('SHOW_ALL', 'All')}</Text>
                <Text>{' '}</Text>
                <Text>{this.renderFilter('SHOW_COMPLETED', 'Completed')}</Text>
                <Text>{' '}</Text>
                <Text>{this.renderFilter('SHOW_ACTIVE', 'Active')}</Text>
                <Text>.</Text>
            </View>
        );
    }
}

Footer.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent: 'space-between'
    }
});
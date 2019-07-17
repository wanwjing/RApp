//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { TopBotField } from '../component/TopBotField';

// create a component
export class RecipeDetailScreen extends Component {


    static navigationOptions = ({ navigation }) =>
        ({
            title: 'Recipe App',
            headerStyle: {
                backgroundColor: '#D81B60',
            },
            headerRight: (
                <Button
                    onPress={navigation.state.params.handleSave}
                    title="Save"
                    color="#fff"
                />
            ),
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        });


    constructor(props) {
        super(props)

        var recipeBean = props.navigation.getParam('recipeBean', null)

        if (recipeBean != null && recipeBean != "") {
            this.state =
                {
                    name: recipeBean.name,
                    desc: recipeBean.desc,
                    ingredient: recipeBean.ingredient,
                    step: recipeBean.step,
                    imgPath : recipeBean.imgPath,
                    recipeBean: recipeBean
                }
        }

    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this.callBacktoListScreen.bind(this) });
    }

    callBacktoListScreen() {

        var recipeBean = this.state.recipeBean
        recipeBean.name = this.state.name
        recipeBean.desc = this.state.desc
        recipeBean.ingredient = this.state.ingredient
        recipeBean.step = this.state.step

        const navigation = this.props.navigation
        console.log(recipeBean)
        navigation.getParam('callBackFromSaveScreen')(recipeBean);
        navigation.navigate("RecipeListScreen")
    }

    render() {
        return (
            <View style={{ width : "100%" ,height : "100%", flexDirection: 'column' }}>

                <Image source= {this.state.imgPath} style={{ justifyContent: 'center', alignItems: 'center'}}/>

                <View style={{ flexDirection: 'column' }}>
                    <TopBotField title='Name' value={this.state.name} onChangeText={(text) => {
                        this.setState({ name: text })
                    }} />
                    <TopBotField title='Description' value={this.state.desc} onChangeText={(text) => {
                        this.setState({ desc: text })
                    }} />
                    <TopBotField title='Ingredient' value={this.state.ingredient} onChangeText={(text) => {
                        this.setState({ ingredient: text })
                    }} />
                    <TopBotField title='Step' value={this.state.step} onChangeText={(text) => {
                        this.setState({ step: text })
                    }} />
                </View>
            </View>
        );
    }
}



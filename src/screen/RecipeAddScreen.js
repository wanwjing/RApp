//import liraries
import React, { Component } from 'react';
import { View, Button, ImageBackground } from 'react-native';
import { TopBotField } from '../component/TopBotField';
import ImagePicker from 'react-native-image-picker';
import {ReceptType} from '../model/ReceptType';


// create a component
export class RecipeAddScreen extends Component {

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
                    backgroundColor = "transparent"
                />
            ),
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        });


    constructor(props) {
        super(props)

        // var r = ReceptType

        this.state =
            {
                name: "",
                desc: "",
                ingredient: "",
                step: "",
                imgPath: require('../assets/burger.png'),
                type: "",
                recipeType : ['1','2']
            }

    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this.callBacktoListScreen.bind(this) });
    }
    callBacktoListScreen() {
        var recipeBean = {
            name: this.state.name,
            desc: this.state.desc,
            ingredient: this.state.ingredient,
            type: this.state.type,
            step: this.state.step
        }

        const navigation = this.props.navigation
        navigation.getParam('callBackFromAddScreen')(recipeBean);
        navigation.navigate("RecipeListScreen")
    }

    onOpenGallery() {
        const options = {
            quality: 1.0,
            maxWidth: 200,
            maxHeight: 300,
            storageOptions: {
                skipBackup: true,
            },
        };

        // Open Image Library:
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log("dsdsdsdsd");
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log("setState");
                this.setState({
                    imgPath: source,
                });
            }
        });
    }


    render() {

        console.log(this.state.imgPath)
        return (
            <View style={{ width: "100%", height: "100%", flexDirection: 'column' }}>
                <Button title="add img" onPress={() => this.onOpenGallery()} />
                <ImageBackground source={this.state.imgPath} style={{ justifyContent: 'center', alignItems: 'center' }} />
                <View style={{ backgroundColor: '#fff', flexDirection: 'column' }}>
                    {/* <Text>Type</Text>
                    <Picker selectedValue={this.state.type} >
                        {serviceItems}
                    </Picker> */}
                    <TopBotField title='Name' onChangeText={(text) => {
                        this.setState({ name: text })
                    }} />
                    <TopBotField title='Description' onChangeText={(text) => {
                        this.setState({ desc: text })
                    }} />
                    <TopBotField title='Ingredient' onChangeText={(text) => {
                        this.setState({ ingredient: text })
                    }} />
                    <TopBotField title='Step' onChangeText={(text) => {
                        this.setState({ step: text })
                    }} />

                </View>

            </View>

        );
    }




}





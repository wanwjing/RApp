//import liraries
import React, { Component } from 'react';
import { View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native';
import { RecipeBean } from '../model/RecipeBean'
import { AsyncStorageUtil } from '../util/asyncStorageUtil';
import { Constants } from '../util/Constants';


// create a component
export class RecipeListScreen extends Component {

    static navigationOptions = ({ navigation }) =>
    ({
        title: 'Recipe App',
        headerStyle: {
            backgroundColor: '#D81B60',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    });


    constructor(props) {
        super(props)
        this.state = {
                recipeBeans: []
            }

    }
    componentDidMount() {
        this.isFirstTime()
    }
    

    addScreen() {
        console.log("callBacktoListScreen")
        const { navigate } = this.props.navigation;
        navigate('RecipeAddScreen', {
            callBackFromAddScreen: this.callBackFromAddScreen.bind(this),
        });
    }



    isFirstTime() {
        console.log("isssfirst")
        return AsyncStorageUtil.getLocalStorage(Constants.FIRST_TIME)
            .then((res) => {
                console.log("isssfirst", res)
                let result = false;
                let value = res;

                if (value == null) {
                    result = true;
                }
                if(result){
                    if (this.state.recipeBeans == "") {

                        this.setState({
                            recipeBeans: RecipeBean // default value
                        })
            
                        this.storeDataFromLocal()
                        this.setFirstTime(false)
                    }
                }else{
                    this.retrieveDataFromLocal()
                }
                
                return result;
            })
            .catch((err) => {
                return true;
            });
    }

    callBackFromAddScreen(item) {
        var recipeBeans = []
        recipeBeans = this.state.recipeBeans
        recipeBeans.push(item)
        this.setState({recipeBeans})
        console.log("callBackFromAddScreen")
        console.log(item)
        this.storeDataFromLocal()
    }
    callBackFromSaveScreen(item) {
        var recipeBeans = []
        recipeBeans = this.state.recipeBeans
        console.log("===>"+recipeBeans)
        for(let [index, value] of recipeBeans.entries()) {
           if(item.id === value.id){
                recipeBeans[index] = item
           }
        }
        console.log("<==="+recipeBeans)
        this.setState({recipeBeans})
        console.log("callBackFromSaveScreen")
        console.log(item)
        this.storeDataFromLocal()
    }

    setFirstTime(isFirst) {
        return AsyncStorageUtil.setLocalStorage(Constants.FIRST_TIME, isFirst)
    }

    async retrieveDataFromLocal() {
        let data = await AsyncStorageUtil.getLocalStorage("cacheData")
        console.log(data)
        if (data != "") {
            this.setState({ recipeBeans: data })
        }
    }

    storeDataFromLocal() {
        AsyncStorageUtil.setLocalStorage("cacheData", this.state.recipeBeans)
    }

 

    onClickMe(item) {
        const { navigate } = this.props.navigation;
        navigate('RecipeDetailScreen', {
            callBackFromSaveScreen: this.callBackFromSaveScreen.bind(this),
            recipeBean: item
        });
    }


    render() {
    
        return (

            <View width = "100%" height = "100%" >
                <Button title="Add" style={{position: 'absolute'}} onPress={()=>this.addScreen()}/>
            <FlatList
                ItemSeparatorComponent={this.renderSeparator}
                data={this.state.recipeBeans}
                extraData={this.state} 
                renderItem={({ item, index }) =>
                    <View style={{ padding: 5, marginBottom: 5, backgroundColor: '#transparent' }}>
                        <TouchableOpacity onPress={() => this.onClickMe(item)}
                            style={{ flexDirection: 'row', height: 100, padding: 5, marginBottom: 5, backgroundColor: '#fff' }}>
                            {/* image */}
                            <Image style={{ margin: 5, width: 80, height: 80 }} source={item.imgPath} />
                            {/* red line */}
                            {console.log(item.name)}
                            {console.log(item.desc)}
                            <View style={{ width: "100%", height: "100%", flexDirection: 'column', flex: 1 }} >
                                <Text style={{ flex: 1, fontSize: 12, color: 'grey', fontWeight: "bold" }}>{item.name}</Text>
                                <Text style={{ flex: 1, fontSize: 10, color: 'grey' }}>{item.desc}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            />
            
              </View>
        );
    }
}



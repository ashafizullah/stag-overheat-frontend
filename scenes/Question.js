import React, {Component} from 'react';
import {
    Header, Title, Container, Content, Left, Body, Right,
    ListItem, Text, Icon, Button, Input, Item
} from 'native-base';
import {ListView, View, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native';

@observer
export default class Question extends Component{

    constructor(){
        super();
        this.state = {
            displaySearchBar: false, //state to show n hide searchBar
            search: "" //search form field value
        }
    }

    renderHeader(){
        const {title} = this.props;

        let header = (
            <Header>
                <Left/>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.setState({displaySearchBar: true})}>
                        <Icon name="search" style={{color: '#0098ff'}}/>
                    </Button>
                    <Button transparent onPress={() => Actions.QuestionAdd()}>
                        <Icon name="add-circle" style={{color: '#0098ff'}}/>
                    </Button>
                </Right>
            </Header>
        );

        if(this.state.displaySearchBar){
            header = (
                <View style={{flexDirection:'row', backgroundColor:'#3f51b5'}}>
                    <View style={{width:Dimensions.get('window').width-100}}>
                        <Item style={{marginLeft:20, marginBottom:3}}>
                            <Icon name="search" style={{color:'#fff'}}/>
                            <Input
                                placeholder="Search"
                                onChangeText={(text) => this.setState({search: text})}
                                value={this.state.search}
                                style={{color:'#fff'}}
                            />
                        </Item>
                    </View>
                    <View style={{width:100, justifyContent: 'center'}}>
                        <Button transparent onPress={() => this.handleSearch()}>
                            <Text style={{color:'#fff'}}>Search</Text>
                        </Button>
                    </View>
                </View>
            )
        }

        return header;
    }

    handleGotoQuestionDetail(rowData){
        //find answers using API
        this.props.store.findAnswers(rowData.id);
        Actions.QuestionDetail({question: rowData});
    }

    renderRow(rowData){
        return(
            <ListItem onPress={() => this.handleGotoQuestionDetail(rowData)}>
                <Body>
                    <Text>{rowData.author}</Text>
                    <Text note>{rowData.title}</Text>
                </Body>
                <Right>
                    <Icon name="arrow-forward" style={{color: "#0098ff"}}/>
                </Right>
            </ListItem>
        );
    }

    handleSearch(){
        //get search value from search form
        const {search} = this.state;

        //call store method search
        this.props.store.search(search);

        //hide searchBar and clear search
        this.setState({displaySearchBar: false});
    }

    render(){
        const {dataSource} = this.props.store;
        return(
            <Container>
                {this.renderHeader()}

                <Content>
                    <ListView
                        dataSource={dataSource}
                        renderRow={this.renderRow.bind(this)}
                        enableEmptySections={true}
                    />
                </Content>
            </Container>
        );
    }
}

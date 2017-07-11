import React, {Component} from 'react';
import{
    Header, Title, Container, Content, Left, Body, Right, Text, Icon,
    Button, Form, Item, Input, Label
} from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class AnswerAdd extends Component{
    constructor(){
        super();
        this.state = {
            text: "",
        };
    }

    renderHeader(){
        const {title} = this.props;
        return(
            <Header>
                <Left>
                    <Button transparent onPress={() => Actions.pop()}>
                        <Icon name="arrow-back" style={{color: '#0098ff'}}/>
                    </Button>
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.handleSave()}>
                        <Text style={{color: '#0098ff'}}>Save</Text>
                    </Button>
                </Right>
            </Header>
        )
    }

    handleSave(){
        //get questionId from props
        const {questionId} = this.props;

        //save data to db with Store
        this.props.store.addAnswer(questionId, this.state);

        //clear the form
        this.setState({text: ""});

        //back to main page
        Actions.pop();
    }

    render(){
        return(
            <Container>
                {this.renderHeader()}
                <Content>
                    <Form>
                        <Item floatingLabel last>
                            <Label>Text</Label>
                            <Input
                                onChangeText={(text) => this.setState({text: text})}
                                value={this.state.text}
                                multiline={true}
                                numberOfLines={10}
                                style={{height: 200, marginTop: 20}}
                            />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}

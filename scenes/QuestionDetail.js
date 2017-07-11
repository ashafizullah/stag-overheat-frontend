import React, {Component} from 'react';
import {Header, Left, Right, Button, Body, Title, Container, Content,
        Text, Icon, Card, CardItem, Thumbnail, Footer} from 'native-base';
import {ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native';
import moment from 'moment';

@observer
export default class QuestionDetail extends Component{

    constructor(){
        super();
    }

    componentWillMount(){
        this.props.store.question = this.props.question;
    }

    renderHeader(){
        const {title} = this.props;
        const questionId = this.props.question.id;
        return(
            <Header>
                <Left>
                    <Button transparent onPress={()=>Actions.pop()}>
                        <Icon name="arrow-back" style={{color: '#057ce4'}}/>
                    </Button>
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => Actions.AnswerAdd({questionId: questionId})}>
                        <Icon name="add" style={{color: "#057ce4"}}/>
                        <Text>Answer</Text>
                    </Button>
                </Right>
            </Header>
        )
    }

    voteUp(){
        const {id, vote} = this.props.store.question;
        this.props.store.update(id, {vote: vote + 1});
    }

    voteDown(){
        const {id, vote} = this.props.store.question;
        this.props.store.update(id, {vote: vote - 1});
    }

    renderAnswerRow(rowData){
        return(
            <Card>
                <CardItem bordered>
                    <Body>
                        <Text note>Someone, on {moment(new Date()).format("DD/MM/YYYY")}</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            {rowData.text}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }

    render(){
        const {title, author, description, createdAt, vote} = this.props.store.question;
        /*
            Kode di atas bisa ditulis juga sebagai berikut:
            1. const title = this.props.question.title;
            2. const author = this.props.question.author;
        */
        return(
            <Container>
                {this.renderHeader()}
                <Content>
                    <Card>
                        <CardItem bordered>
                            <Left>
                                <Icon name="help-circle"/>
                                <Body>
                                    <Text>{title}</Text>
                                    <Text note>{author}, on {moment(createdAt).format("DD/MM/YYYY")}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    {description}
                                </Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Icon active name="arrow-up" onPress={()=> this.voteUp()}/>
                                </Button>
                                <Text>{vote}</Text>
                                <Button transparent>
                                    <Icon active name="arrow-down" onPress={()=> this.voteDown()}/>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
                <Footer style={{height: 320, backgroundColor:'#fff'}}>
                    <ListView
                        dataSource={this.props.store.dataSourceAnswers}
                        renderRow={this.renderAnswerRow.bind(this)}
                        enableEmptySections={true}
                    />
                </Footer>
            </Container>
        );
    }
}

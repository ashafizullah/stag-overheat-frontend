import {observable} from 'mobx';
import {ListView} from 'react-native';
import Rest from 'fetch-on-rest';

class QuestionStore{

    @observable dataSource;
    @observable question = {};
    @observable dataSourceAnswers;

    constructor(){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows([]);
        const dsAnswer = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSourceAnswers = dsAnswer.cloneWithRows([]);
        this.api = new Rest("http://10.0.3.2:8000/api/v1/");
        this.refresh();
    }

    add(doc){
        this.api.post('question', doc);
    }

    refresh(){
        const self = this;
        this.api.get('question').then(function(response){
            self.dataSource = self.dataSource.cloneWithRows(response);
        });
    }

    update(id, doc){
        const self = this;
        this.api.put('question/'+ id, doc).then(function(){
            self.findOne(id);
        });
    }

    findOne(id){
        const self = this;
        this.api.get('question/'+ id).then(function(response){
            self.question = response;
        });
    }

    search(search){
        //initiate this to self variable
        const self = this;

        //call api http://localhost:8000/question?search=search
        //then set the response to dataSource to refresh it reactively
        this.api.get('question', {search: search}).then(function(response){
            self.dataSource = self.dataSource.cloneWithRows(response);
        });
    }

    //add answer to answer table with questionID as first param, and doc as second
    addAnswer(questionId, doc){
        const self = this;
        this.api.post('question/'+ questionId + '/answers', doc).then(function(response){
            self.findAnswers(questionId);
        });
    }

    //get all answers from question by questionId
    findAnswers(questionId){
        const self = this;
        //call api GET http://localhost:8000/api/v1/question/{questionId}/answers
        this.api.get('question/'+ questionId + '/answers').then(function(response){
            //fill dataSourceAnswers reactively using its response
            self.dataSourceAnswers = self.dataSourceAnswers.cloneWithRows(response);
        });
    }
}

const questionStore = new QuestionStore();
export default questionStore;

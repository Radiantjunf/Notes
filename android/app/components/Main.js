import React from 'react';
import Note from './Note';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    RecyclerViewBackedScrollView,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

export default class Main extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
        }
        this.db = openDatabase(
            {
                name:'notes.db',
                createFromLocation:1
            },
                this.succesccToOpenDB,
                this.failToOpenDB,
            
        );    
        this.ViewUse()       
    }

    succesccToOpenDB(){
        alert('success')
    }
    failToOpenDB(err){
        console.log(err)
    }

    render(){
        
        let notes = this.state.noteArray.map((val,id) => {
            return <Note key={id} val={val}
            deleteMethod={ ()=> this.deleteNote(id,val.dbid)}
            editMethod ={ () => this.editNote(id,val.dbid)} />
        });

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>- NOTAS -</Text>
                </View> 
                
                <ScrollView style={styles.ScrollContainer}>
                    {notes}
                </ScrollView>

                <View style={styles.footer}>
                    <TextInput style={styles.textInput} 
                    onChangeText={(noteText)=> this.setState({noteText})}
                    value={this.state.noteText}
                    placeholder={'>nota'} 
                    placeholderTextColor='white' 
                    underlineColorAndroid = 'transparent'>
                    </TextInput>
                </View>

                <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
               
            </View>
        );
    }

    addNote = e => {
        if (this.state.noteText) {
          let d = new Date();
          var newNote = {
            date: d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(),
            note: this.state.noteText
          };
          this.InsertNoteDb(newNote);
          this.GetNoteId(newNote)
        }
    };
    CreateNote(item){
        const newNote = {
            dbid: item["Id"],
            date: item["Date"],
            note: item["Texto"]
        };
        //console.log(newNote)
        return newNote;
    }


    

    CreateNoteWithId(item,id){
        const newNote = {
            dbid: id,
            date: item.date,
            note: item.note
        };
        //console.log(newNote)
        return newNote;
    }

    GetNoteId(note){
        this.db.transaction((tx) => {
            tx.executeSql(
              'SELECT Id FROM notes where Texto = ? and Date = ?',
              [note.note,note.date],
              (tx, results) => {
                var len = results.rows.length;
                console.log('len', len);
                if (len > 0) {
                    var newNote = this.CreateNoteWithId(note,results.rows.item(0)["Id"])
                    this.setState({
                        noteArray: [...this.state.noteArray, newNote],
                        noteText: ""
                    });
                  return results.rows.item(0)["Id"]
                } else {
                    console.log('No user found');
                }
              },
            );
        });
    }


    deleteNote(key,id){
        this.DeleteNoteDb(id)
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray})
    }

    editNote(key, id){
        this.DeleteNoteDb(id)
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray})

        if (this.state.noteText) {
            let d = new Date();
            var newNote = {
              date: d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(),
              note: this.state.noteText
            };
            this.InsertNoteDb(newNote);
            this.GetNoteId(newNote)
          }
    }

    DeleteNoteDb(id){
        this.db.transaction((tx) => {
            tx.executeSql(
              'DELETE FROM  notes where Id=?',
              [id],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    console.log('Note deleted successfully');
                } else {
                    console.log('Note Id Not Valid');
                }
              },
            );
          });
    }

    ViewUse(){  
          this.db.transaction((tx) => {
            tx.executeSql('SELECT Id,Date,Texto FROM notes',
            [],
            (tx, results) => {      
              for (let i = 0; i < results.rows.length; ++i)    
                this.setState({
                    noteArray: [...this.state.noteArray, this.CreateNote(results.rows.item(i))],
                    noteText: ""
                });          
            });
          });   
    }

    InsertNoteDb(note){
        console.log("inserted");
        this.db.transaction((tx) => {
            tx.executeSql('INSERT INTO notes (Date,Texto) VALUES (?,?)',
              [note.date,note.note],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    console.log('Registration Sucessfull')
                } else console.log('Registration Failed');
              },
            );
        });

    }

    



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#282923"
    },
    header:{
        backgroundColor:'#ff9800',
        alignItems:'center',
        justifyContent: 'center',
        borderBottomWidth:10,
        borderBottomColor:'#6d6e6a'
    },
    headerText:{
        color:'#f8f8dc',
        fontSize:20,
        padding:26
    },
    Scrollcontainer:{
        flex:1,
        marginBottom:100,
    },
    footer:{
        position: 'absolute',
        bottom: 0,
        left :0,
        right:0,
        zIndex:10
    },
    textInput :{
        alignSelf: 'stretch',
        color:'#fff',
        padding:20,
        backgroundColor:'#252525',
        borderTopWidth :2,
        borderTopColor:'#6d6e6a',  
        fontSize:18,
    },
    addButton :{
        position:'absolute'
        ,zIndex:11,
        right:20,
        bottom:90,
        backgroundColor:'#ff9800',
        width:90,
        height:90,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        elevation: 8,
    },
    addButtonText : {
        color: '#f8f8dc',
        fontSize:24,
    }
});

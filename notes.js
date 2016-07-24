var User = React.createClass({
    render: function() {
        return (
            <div className="note"> {this.props.children} </div>
        );
    }
});


var UsersGrid = React.createClass({
    
    

        render: function() {
        return (
            <div className="notes-grid">
                {
                  this.props.notes.map(function(note){
                        return (
                            <User
                                key={note.id}>
                                {note.name}
                            </User>
                        );
                    })
                }
            </div>
        );
    }   
});

var UserEditor = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        };
    },
    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleNoteAdd: function() {
        var newNote = {
            name: this.state.text,
            id: Date.now()
        };
        this.props.onNoteAdd(newNote);
    },

      render: function() {
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows="10"
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <br />
                <button className="add-button" onclick={this.hadleNoteAdd}>Add</button>
            </div>
        );
    }       
});

var UsersApp = React.createClass({
    getInitialState: function() {
        return {
            notes: [
            {
                id:0,
                name: "Ivan",
            },
            {
                id:1,
                name: "Ira",
            },
            {
                id:2,
                name: "Vasya",
            },
            {
                id:3,
                name: "Anya",
            }

        ]
        };
    },
    
    handleNoteAdd: function(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    },

    render: function() {
        return (
            <div className="note-app"> 
                UsersApp
                <UserEditor onNoteAdd={this.handleNoteAdd} />
                <UsersGrid notes={this.state.notes}/>
            </div>
        );
    }   
});

ReactDOM.render(
    <UsersApp />,
    document.getElementById('mount-point')
);